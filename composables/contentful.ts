import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { Document } from '@contentful/rich-text-types'
import { marked } from 'marked'

export const useContentfulJsonToHtml = (body: Document | undefined) => {
  if (!body) return null

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        return `<img src="${node.data.target.fields.file.url}" />`
      },
    },
  }
  return documentToHtmlString(body, options)
}

export const useMarkdown = (body: string) => marked.parse(body)
