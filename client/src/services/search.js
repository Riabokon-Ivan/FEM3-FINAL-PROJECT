import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export default function search(searchedValue) {
  const searchItem = {
    query: searchedValue
  };

  return axios
    .post('/products/search', searchItem)
    .then((response) => response.data)
    .catch((error) => error)
}
