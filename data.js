const axios = require('axios');
 ( async() => {
const options = {
  method: 'GET',
  url: 'https://zozor54-whois-lookup-v1.p.rapidapi.com/',
  params: {
    domain: 'sendrank.com',
    format: 'json',
    _forceRefresh: '0'
  },
  headers: {
    'X-RapidAPI-Key': '8786114865msha4a1b52488116a1p1a1863jsn0e7f79b0fe2d',
    'X-RapidAPI-Host': 'zozor54-whois-lookup-v1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data.register);
} catch (error) {
	console.error(error);
}
 })();