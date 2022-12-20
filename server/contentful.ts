import contentful from 'contentful'
import contentfulManagement from 'contentful-management'

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
