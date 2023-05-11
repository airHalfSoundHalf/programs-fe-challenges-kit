const API_ENDPOINT =
  "http://localhost:4001"

  const REQUEST_ERROR = {
    500: {message: '500: 서버 요청 실패입니다.'},
    504: {message: '504: 통신지연으로 요청 실패입니다.'}
  }

  const request = async (url) => {
      try {
        const result = await fetch(url)
        if(result.status === 200) {
          return result.json()
        } else {
          throw REQUEST_ERROR[result.status]
        }
      } catch(error) {
        alert(error.message)
        return {data: null}
      }
    }

const api = {
  fetchCats: keyword => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&limit=10`);
  },
  fetchNextPage: (keyword, page) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`);
  },
  fetchCatDetail: id => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
  fetchRandomCats: async () => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/random50`);
    return await res.json();
  }
};