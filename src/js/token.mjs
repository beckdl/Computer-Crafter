const env = import.meta.env;
async function getToken() {
  try {
      const response = await fetch('https://dev-0o2a64jccu2dayz1.us.auth0.com/oauth/token', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          "client_id":"kGEnwcr5NASWMqif1dJxgl9cFw80icLX",
          "client_secret":"__FQcjiVG6gmSIADxuQJuwyul3iS23upcF7bc_aE38Nk-gD8xaAPXZgWsurEmvCH",
          "audience":"https://backend-computer-api.onrender.com",
          "grant_type":"client_credentials"
        }),
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.error('Error fetching token:', error);
  }
};

export { getToken };