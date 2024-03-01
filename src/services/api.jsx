import axios from 'axios';

//colocando todas as rotas em um arquivo
const BASE_URL = 'https://7dev-code-test.lcc7.online/api/v1';

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function login(body) {
  const promise = axios.post(`${BASE_URL}/token`, body);

  return promise;
}



const api = {
    createConfig,
    login }

export default api;