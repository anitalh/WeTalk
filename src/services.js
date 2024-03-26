// Function to make a fetch request
function makeFetchRequest(url, options) {
  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => Promise.reject(error),
          () => Promise.reject({
            error: 'bad-response'
          }));
      }
      return response.json().catch(() => Promise.reject({
        error: 'bad-json'
      }));
    })
    .catch(error => {
      if (error.error) {
        return Promise.reject(error);
      }
      return Promise.reject({
        error: 'network-error'
      });
    });
}

// Function to perform user login
export function userLogin(username) {
  return makeFetchRequest('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username
    }),
  });
}

// Function to retrieve session data
export function getSession() {
  return makeFetchRequest('/api/session/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
  });
}

// Function to retrieve user data
export function getUsers() {
  return makeFetchRequest('/api/users/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
  });
}

// Function to retrieve messages
export function getMessages() {
  return makeFetchRequest('/api/message/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
  });
}

// Function to post a new message
export function postMessages(msg, imagePath) {
  return makeFetchRequest('/api/message/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      msg,
      imagePath
    }),
  });
}

// Function to perform user logout
export function logout() {
  return makeFetchRequest('/api/session/', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
  });
}