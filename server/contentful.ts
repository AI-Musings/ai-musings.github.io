import contentful from 'contentful'
import contentfulManagement from 'contentful-management'
import { DocumentNode, print } from 'graphql'
import { Query } from '~~/types/contentful'

export const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT!,
})

export const manager = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

export const endpoint = `https://api.contentful.com/spaces/${process.env
  .CONTENTFUL_SPACE_ID!}`

export const uploadEndpoint = `https://upload.contentful.com/spaces/${process
  .env.CONTENTFUL_SPACE_ID!}/uploads`

export const fetchHeaders = {
  Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_TOKEN!}`,
}

export const graphql = async (options: {
  query: DocumentNode | string
  variables?: Record<string, any>
}) => {
  let { query, variables } = options

  query = typeof query !== 'string' ? print(query) : query

  const { data } = await $fetch<{ data: Query }>(
    `https://graphql.contentful.com/content/v1/spaces/${process.env
      .CONTENTFUL_SPACE_ID!}/environments/${process.env
      .CONTENTFUL_ENVIRONMENT!}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN!}`,
      },
      body: JSON.stringify({ query, variables }),
    }
  )

  return data
}
