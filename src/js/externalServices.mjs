const baseUrl = import.meta.env.VITE_SERVER_URL;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const clientSecret = import.meta.env.VITE_AUTHO_CLIENT_SECRET;
const tokenUrl = import.meta.env.VITE_AUTH0_TOKEN_URL;

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseUrl +`/${category}`);
  const data = await convertToJson(response);
  return data;
}

export async function findProductById(id) {
  const response = await fetch(baseUrl + `/${id}`);
  const product = await convertToJson(response);
  return product;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseUrl + "/checkout/", options).then(convertToJson);
}

export async function loginRequest() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  };
  try {
    const response = await fetch(baseUrl + "/login", options);
    if (!response.ok) {
          throw new Error('Network response was not ok');
      }
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching Data:', error);
  };
}

export async function getAccountById(id) {
  const response = await fetch(baseUrl + `/login/${id}`);
  const account = await convertToJson(response);
  return account;
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    // the server will reject our request if we don't include the Authorization header with a valid token!
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(baseUrl + "/orders", options).then(convertToJson);
  return response;
}