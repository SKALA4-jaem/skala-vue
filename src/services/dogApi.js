import axios from 'axios'

const dogApi = axios.create({
  baseURL: 'https://dog.ceo/api',
  timeout: 10000,
})

export const fetchRandomDog = async () => {
  const response = await dogApi.get('/breeds/image/random')
  return response.data.message
}
