const uuid = require('uuid').v4;

const sessions = {};
const userImageMap = {};

// Function to add a new session
function addSession(username) {
  const sid = uuid();
  
  if (!userImageMap[username]) {
    const imageIndex = Math.floor(Math.random() * 9) + 1;
    userImageMap[username] = `./images/memoji${imageIndex}.png`;
  }
  
  const imagePath = userImageMap[username];

  sessions[sid] = {
    username,
    imagePath
  };
  
  return sid;
}

// Function to retrieve username from session ID
function getSessionUser(sid) {
  return sessions[sid]?.username;
}

// Function to delete a session
function deleteSession(sid) {
  delete sessions[sid];
}

// Function to retrieve list of active users
function getUsers() {
  let users = [];
  let addedUsernames = {};
  const keys = Object.keys(sessions);

  keys.forEach(item => {
      if (sessions[item]['username']) {
          let username = sessions[item]['username'];
          let image = sessions[item]['imagePath'];       
          let isOnline = true; 

          if (!addedUsernames[username]) {
              users.push({ username, image, isOnline });
              addedUsernames[username] = true; 
          }
      }
  });
  return users;
}

// Function to retrieve image of the users
function getSessionImage(sid) {
  return sessions[sid]?.imagePath;
}


module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  getUsers,
  getSessionImage
};
