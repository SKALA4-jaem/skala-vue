import axios from 'axios'

const translationApi = axios.create({
  baseURL: 'https://api.mymemory.translated.net',
  timeout: 10000,
})

export const translateToKorean = async (englishText) => {
  const response = await translationApi.get('/get', {
    params: {
      q: englishText,
      langpair: 'en|ko',
    },
  })

  const translatedText = response.data.responseData?.translatedText

  if (!translatedText) {
    throw new Error('번역 결과가 없습니다.')
  }

  return translatedText
}
