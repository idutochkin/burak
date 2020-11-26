const API_URL = "https://generous-tuesday.labado.bizml.ru/api/v1"

function request(url = '', method = 'GET', data = {}, ) {
  const params = {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  }

  if(method !== "GET"){
    params.body = JSON.stringify(data)
  }
  return fetch(`${API_URL}/${url}`, params)
    .then(function (response) {
        return response.json();
    }).catch(function (error) {
        console.log(error)
    });
}