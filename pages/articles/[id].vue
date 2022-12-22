<script setup lang="ts">
const { params } = useRoute()

const { data: article } = await useFetch(`/api/articles/${params.id}`)

useHead({
  title: `${article.value?.title} - AI Musings: The Inner Thoughts of a Machine`,
})

const { loadAndPlay, isArticlePlaying } = useAudioPlayer()
</script>

<template>
  <article v-if="article" class="py-16 lg:py-36">
    <div class="lg:px-8">
      <div class="lg:max-w-4xl">
        <div class="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
          <!--  -->
          <header class="flex flex-col">
            <div class="flex items-center gap-6">
              <button
                v-if="article.audio"
                @click="loadAndPlay(article!)"
                type="button"
                class="group relative flex flex-shrink-0 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-slate-700 h-18 w-18 focus:ring focus:ring-offset-4"
                :aria-label="isArticlePlaying(article) ? 'Pause' : 'Play'"
              >
                <div class="absolute -inset-3 md:hidden"></div>
                <svg
                  v-if="isArticlePlaying(article)"
                  aria-hidden="true"
                  viewBox="0 0 22 28"
                  class="fill-white group-active:fill-white/80 h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.5 0C0.671573 0 0 0.671572 0 1.5V26.5C0 27.3284 0.671573 28 1.5 28H4.5C5.32843 28 6 27.3284 6 26.5V1.5C6 0.671573 5.32843 0 4.5 0H1.5ZM17.5 0C16.6716 0 16 0.671572 16 1.5V26.5C16 27.3284 16.6716 28 17.5 28H20.5C21.3284 28 22 27.3284 22 26.5V1.5C22 0.671573 21.3284 0 20.5 0H17.5Z"
                  ></path>
                </svg>
                <svg
                  v-else
                  aria-hidden="true"
                  viewBox="0 0 36 36"
                  class="fill-white group-active:fill-white/80 h-9 w-9"
                >
                  <path
                    d="M33.75 16.701C34.75 17.2783 34.75 18.7217 33.75 19.299L11.25 32.2894C10.25 32.8668 9 32.1451 9 30.9904L9 5.00962C9 3.85491 10.25 3.13323 11.25 3.71058L33.75 16.701Z"
                  ></path>
                </svg>
              </button>
              <div class="flex flex-col">
                <h1 class="mt-2 text-4xl font-bold text-slate-900">
                  {{ article.title }}
                </h1>
                <time
                  :datetime="article.sys.firstPublishedAt"
                  class="order-first font-mono text-sm leading-7 text-slate-500"
                >
                  {{
                    new Date(article.sys.firstPublishedAt).toLocaleDateString(
                      undefined,
                      {
                        dateStyle: 'long',
                      }
                    )
                  }}
                </time>
              </div>
            </div>
            <p class="ml-24 mt-3 text-lg font-medium leading-8 text-slate-700">
              {{ article.description }}
            </p>

            <!-- <pre>{{ doc.categories }}</pre> -->
          </header>

          <hr class="my-12 border-gray-200" />

          <!-- toc -->
          <!-- <div class="my-10 prose dark:prose-invert">
            <ul>
              <li v-for="child in doc.body.toc.links">
                <a :href="`#${child.id}`">
                  {{ child.text }}
                </a>
              </li>
            </ul>
          </div> -->

          <!-- body -->
          <section
            class="mt-8 prose dark:prose-invert"
            id="content-body"
            v-html="useMarkdown(article.body!)"
          ></section>
        </div>
      </div>
    </div>
  </article>
</template>
