const API_ENDPOINT =
  "http://localhost:4001";

const api = {
  fetchCats: async keyword => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}&limit=10`);
    return await res.json();
  },
  fetchNextPage: async (keyword, page) => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`);
    return await res.json();
  },
  fetchCatDetail: async id => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
    return await res.json();
  },
  fetchRandomCats: async () => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/random50`);
    return await res.json();
  }
};