import { useMediaControls } from '@vueuse/core'
import { Article } from '~~/types/contentful'

const audioRef = ref()
const audioSrc = ref('')

const controls = useMediaControls(audioRef, {
  src: audioSrc,
})

const article = ref<Article>()

const playBackSpeeds = [0.5, 1, 1.5, 2]

export const useAudioPlayer = () => {
  const progressPercent = computed(
    () => `${(controls.currentTime.value / controls.duration.value) * 100}%`
  )

  const loadAndPlay = async (_article: Article) => {
    const src = _article.audio?.url

    if (!src) return

    if (src === audioSrc.value) {
      return (controls.playing.value = !controls.playing.value)
    }

    article.value = _article

    controls.playing.value = false
    await (audioSrc.value = src)
    controls.playing.value = true
  }

  const isArticlePlaying = (_article: Article) =>
    article.value?.sys.id === _article.sys.id && controls.playing.value

  const backTen = () => (controls.currentTime.value -= 10)
  const forwardTen = () => (controls.currentTime.value += 10)

  const cyclePlaybackSpeed = () => {
    const currentIndex = playBackSpeeds.indexOf(controls.rate.value)
    const nextIndex =
      currentIndex + 1 === playBackSpeeds.length ? 0 : currentIndex + 1
    controls.rate.value = playBackSpeeds[nextIndex]
  }

  return {
    audioSrc,
    audioRef,
    controls,
    progressPercent,
    loadAndPlay,
    isArticlePlaying,
    article,
    backTen,
    forwardTen,
    cyclePlaybackSpeed,
  }
}
