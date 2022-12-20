import { graphql } from '~~/server/contentful'
import { gql } from 'graphql-tag'

export default defineEventHandler(async (event) => {
  const query = gql`
    query {
      articleCollection(order: sys_firstPublishedAt_DESC) {
        items {
          sys {
            id
            firstPublishedAt
          }
          title
          description
          audio {
            url
            size
          }
        }
      }
    }
  `

  const { articleCollection } = await graphql({ query })

  return articleCollection
})
