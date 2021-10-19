const url = process.env.REACT_APP_CHATAPP_BACKEND_BASE_URL;

export const callAPI = async (endpoint, method, headers, body) => {
  const response = await fetch(`${url}/api${endpoint}`, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  });

  return response;
};
