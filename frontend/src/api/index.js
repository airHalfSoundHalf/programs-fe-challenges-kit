const API_ENDPOINT =
  "http://localhost:4001"

  const REQUEST_ERROR = {
    504: {errorCode: 504, message: `${504}: 통신지연으로 서버요청 실패입니다.`},
    500: {errorCode: 500, message: `${500}: 서버요청 실패입니다.`},
    400: {errorCode: 400, message: `${400}: 잘못된 요청입니다.`}
  }

  const setValueByStatusCode = (errorCode) => {
		switch (errorCode) {
			case 504:
				return {data: null}
			case 500:
				return {data: null}
			case 400:
				return {data: {}}
		}
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
        setValueByStatusCode(error.errorCode)
      }
    }

const api = {
  fetchCats: keyword => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&limit=10`);
  },
  fetchNextPage: (keyword, page) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&limit=10&page=${page}`);
  },
  fetchCatDetail: id => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
  fetchRandomCats: async () => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/random50`);
    return await res.json();
  }
};