import { manager } from '~~/server/contentful'
import { marked } from 'marked'
import { getAudioBase64 } from 'google-tts-api'
import { Readable } from 'node:stream'
import lodash from 'lodash'
import { writeFileSync } from 'node:fs'

const { escape, unescape } = lodash

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const { save } = getQuery(event)

  const locale = 'en-US'

  let entry, asset
  const space = await manager.getSpace(process.env.CONTENTFUL_SPACE_ID!)
  const env = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT!)
  entry = await env.getEntry(id)

  //
  const plainText = markdownToPlainText(
    entry.fields.body?.[locale]?.toString() || ''
  )

  const { stream, buffer } = await getAudioReadableStreamOfText(plainText)

  if (save) {
    writeFileSync(
      `./public/${entry.fields.title[locale]
        .toLowerCase()
        .replace(/[^\w]+/g, '-')}.mp3`,
      buffer
    )
  }

  if (!entry.fields.updateAudio) {
    return { entry, plainText }
  }

  const upload = await env.createUpload({
    file: stream,
  })

  const file = {
    [locale]: {
      contentType: 'audio/mpeg',
      fileName: `${entry.fields.title[locale]
        .toLowerCase()
        .replace(/[^\w]+/g, '-')}.mp3`,
      uploadFrom: {
        sys: {
          type: 'Link',
          linkType: 'Upload',
          id: upload.sys.id,
        },
      },
    },
  }

  if (entry.fields.audio?.[locale]?.sys?.id) {
    asset = await env.getAsset(entry.fields.audio[locale].sys.id)
    asset.fields.file = file
    asset = await asset.update()
  } else {
    asset = await env.createAsset({
      fields: {
        title: {
          [locale]: entry.fields.title[locale],
        },
        file,
      },
    })
  }

  asset = await asset.processForAllLocales()
  asset = await asset.publish()

  entry.fields.updateAudio = { [locale]: false }
  entry.fields.audio = {
    [locale]: {
      sys: {
        type: 'Link',
        linkType: 'Asset',
        id: asset.sys.id,
      },
    },
  }

  entry = await entry.update()
  await entry.publish()

  return { entry, asset, plainText }
})

/**
 *
 */

function markdownToPlainText(md: string): string {
  const block = (text: string) => text + '\n\n'
  const escapeBlock = (text: string) => escape(text) + '\n\n'
  const line = (text: string) => text + '. \n'
  const inline = (text: string) => text
  const newline = () => '\n'
  const empty = () => ''

  marked.use({
    renderer: {
      code: escapeBlock,
      blockquote: block,
      html: empty,
      heading: block,
      hr: empty,
      list: (text) => block(text.trim()),
      listitem: line,
      checkbox: empty,
      paragraph: block,
      table: empty,
      tablerow: empty,
      tablecell: empty,
      // Inline elements
      strong: inline,
      em: inline,
      codespan: inline,
      br: newline,
      del: inline,
      link: (_0, _1, text) => text,
      image: empty,
      text: inline,
    },
  })

  const plainText = marked(md.replace(/\r?\n|\r/g, '.'))

  return unescape(
    plainText
      .replace(/\s\s+/g, ' ')
      .replaceAll(' - ', '.')
      .replace(/[\(\)]/g, '.')
      .replace(/\.{2,}/g, '.')
  )
}

async function getAudioReadableStreamOfText(plainText: string): Promise<{
  buffer: Buffer
  stream: Readable
}> {
  const splitText = splitParagraph(plainText)

  const options = {
    lang: 'en',
    slow: false,
    host: 'https://translate.google.com',
    // splitPunct: '.,?',
  }

  const parts = await Promise.all(
    splitText.map((shortText) => getAudioBase64(shortText, options))
  )

  const buffer = Buffer.from(parts.join(''), 'base64')
  const stream = Readable.from(buffer)
  return { buffer, stream }
}

function splitParagraph(paragraph: string): string[] {
  const results = []

  // Split the paragraph into sentences at the end of each sentence
  const sentences = paragraph.match(/[^.]+[.!?]/g)
  if (!sentences?.length) return []

  for (const sentence of sentences) {
    if (sentence.length <= 200) {
      results.push(sentence)
    } else {
      results.push(...splitSentence(sentence))
    }
  }

  return results
}

function splitSentence(sentence: string): string[] {
  const segments = []
  let currentSegment = ''

  // Split the sentence into an array of fragments
  const fragments = sentence.split(/[,()-]/)

  // Iterate through the array of fragments
  for (const fragment of fragments) {
    // If adding the current fragment to the current segment would make it too long, push the current segment to the segments array and start a new one
    if (currentSegment.length + fragment.length > 200) {
      segments.push(currentSegment)
      currentSegment = ''
    }

    // Add the current fragment to the current segment
    currentSegment += fragment + ' '
  }

  // Push the final segment to the segments array
  segments.push(currentSegment)

  return segments
}
