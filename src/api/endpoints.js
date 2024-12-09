const BASE_URL = 'http://localhost:3001/api';

const apiUrl = {
  getAccessToken: `${BASE_URL}/v1/getAccessToken`,
  getAllMatches: `${BASE_URL}/v1/getAllMatches`,
  getVersion: `${BASE_URL}/version`,
  flagApi: 'https://flagsapi.codeaid.io/'
};

export default apiUrl;