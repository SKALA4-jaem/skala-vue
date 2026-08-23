import axios from 'axios'

const dogFactApi = axios.create({
  baseURL: 'https://dogapi.dog/api/v2',
  timeout: 10000,
})

export const fetchRandomDogFact = async () => {
  const response = await dogFactApi.get('/facts')
  return response.data.data[0].attributes.body
}
