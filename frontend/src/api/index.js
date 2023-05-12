import config from './config.js'

const { API_ENDPOINT, REQUEST_ERROR, setValueByStatusCode } = config

const request = async (url) => {
  try {
    const result = await fetch(url)
    if(result.status === 200) {
      return result.json()
    } else  {
      throw (REQUEST_ERROR[result.status])
    }
  } catch(error) {
    alert(error.message)
    setValueByStatusCode(error.errorCode)
  }
}

const api = {
  fetchCats: keyword => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&limit=20`);
  },
  fetchNextPage: (keyword, page) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&limit=20&page=${page}`);
  },
  fetchCatDetail: id => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
  fetchRandomCats: async () => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/random50`);
    return await res.json();
  }
};

export default api