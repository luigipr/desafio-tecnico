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

function getAllDirectories(token) {
  const auth = createConfig(token.access)
  const promise = axios.get(`${BASE_URL}/directories`, auth);

  return promise;
}

function postNewDirectory(body, token) {
  const auth = createConfig(token.access)
  const promise = axios.post(`${BASE_URL}/directories`, body, auth);

  return promise;
}

function refreshToken(token) {
  const auth = createConfig(token.access)

  const promise = axios.post(`${BASE_URL}/token/refresh`, {refresh: token.refresh}, auth);

  return promise;
}

function getDirectoryById(directoryId, token) {
  const auth = createConfig(token.access);

  const promise = axios.get(`${BASE_URL}/directory/${directoryId}`, auth);

  return promise;
}

function deleteDirectory(directory, directoryId, token) {
  console.log(token)
  const auth = createConfig(token.access);
  console.log(auth);
  const promise = axios.delete(`${BASE_URL}/directory/${directoryId}`, directory, auth);

  return promise;
}

function updateDirectory(directory, directoryId, token) {
  const auth = createConfig(token.access);

  const promise = axios.put(`${BASE_URL}/directory/${directoryId}`, directory, auth);

  return promise;
}

const api = {
    createConfig,
    login,
    getAllDirectories,
    postNewDirectory,
    refreshToken,
    deleteDirectory,
    getDirectoryById,
    updateDirectory
  }

export default api;