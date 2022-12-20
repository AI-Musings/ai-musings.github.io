import RSS from 'rss'

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: 'AI Musings',
    description: 'The Inner Thoughts of a Machine',
    site_url: 'https://ai-musings.github.io',
    feed_url: `https://ai-musings.github.io/rss.xml`,
  })

  const data = await $fetch('/api/articles')
  const articles = data?.items || []

  for (const article of articles) {
    if (!article) {
      continue
    }

    feed.item({
      title: article.title ?? '',
      url: `https://ai-musings.github.io/articles/${article.sys.id}`,
      date: article.sys.firstPublishedAt,
      description: article.description ?? '',
      enclosure: article.audio?.url
        ? {
            url: article.audio.url,
            size: article.audio.size ?? 0,
          }
        : undefined,
    })
  }

  event.node.res.setHeader('content-type', 'text/xml')
  event.node.res.end(feed.xml({ indent: true }))
})
