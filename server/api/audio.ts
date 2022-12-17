import * as cheerio from 'cheerio'
import { getAudioBase64 } from 'google-tts-api'
import { writeFileSync } from 'node:fs'

export default defineEventHandler(async (event) => {
  const { path } = getQuery(event)

  if (!path) return { error: 'no path specified' }

  const data: string = await $fetch(`${path.toString()}`)

  const $ = cheerio.load(data)

  $('#content-body *').each(function () {
    $(this).prepend(' ')
    $(this).append(' ')
  })

  const text = $('#content-body').text().replace(/\s\s+/g, ' ').trim()

  const splitText = splitParagraph(text)

  const options = {
    lang: 'en',
    slow: false,
    host: 'https://translate.google.com',
    // splitPunct: '.,?',
  }

  const parts = await Promise.all(
    splitText.map((shortText) => getAudioBase64(shortText, options))
  )

  writeFileSync(
    `./public/audio${path}.mp3`,
    Buffer.from(parts.join(''), 'base64')
  )

  return {
    path,
    text,
    splitText: splitText.map((s) => ({ s, length: s.length })),
  }
})

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
