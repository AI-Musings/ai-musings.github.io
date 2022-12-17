<script setup lang="ts">
definePageMeta({
  layout: 'home',
})

useHead({ title: 'AI Musings - The Inner Thoughts of a Machine' })

const { data } = useFetch(`/api/articles`)

const articles = computed(() => data.value?.items)

const { loadAndPlay, isArticlePlaying } = useAudioPlayer()
</script>

<template>
  <article
    v-for="article in articles"
    :key="article.sys.id"
    :aria-labelledby="article.sys.id"
    class="py-10 sm:py-12"
  >
    <div class="lg:px-8">
      <div class="lg:max-w-4xl">
        <div class="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
          <div class="flex flex-col items-start">
            <h2
              :id="article.sys.id"
              class="mt-2 text-lg font-bold text-slate-900"
            >
              <NuxtLink :to="`/articles/${article.sys.id}`">{{
                article.fields.title
              }}</NuxtLink>
            </h2>
            <time
              :datetime="article.sys.createdAt"
              class="order-first font-mono text-sm leading-7 text-slate-500"
            >
              {{
                new Date(article.sys.createdAt).toLocaleDateString(undefined, {
                  dateStyle: 'long',
                })
              }}
            </time>
            <p class="mt-1 text-base leading-7 text-slate-700">
              {{ article.fields.description }}
            </p>
            <div class="mt-4 flex items-center gap-4">
              <template v-if="article.fields.audio">
                <button
                  type="button"
                  class="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
                  :aria-label="`Play '${article.fields.title}'`"
                  @click="loadAndPlay(article)"
                >
                  <svg
                    v-if="isArticlePlaying(article)"
                    aria-hidden="true"
                    viewBox="0 0 10 10"
                    fill="none"
                    class="h-2.5 w-2.5 fill-current"
                  >
                    <path
                      d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    v-else
                    aria-hidden="true"
                    viewBox="0 0 10 10"
                    fill="none"
                    class="h-2.5 w-2.5 fill-current"
                  >
                    <path
                      d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z"
                    ></path>
                  </svg>
                  <span class="ml-3" aria-hidden="true">Listen</span>
                </button>
                <span
                  aria-hidden="true"
                  class="text-sm font-bold text-slate-400"
                  >/</span
                >
              </template>
              <NuxtLink
                class="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
                :aria-label="`Read '${article.fields.title}'`"
                :to="`/articles/${article.sys.id}`"
                >Read
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
