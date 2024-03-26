import {
  userLogin,
  getUsers,
  getSession,
  getMessages,
  postMessages,
  logout
} from './services';
import {
  renderLogin,
  renderUserList,
  renderHome,
  renderMsgList
} from './view';
import {
  startPollingUsers,
  startPollingMessages
}
from './pollingService';
import {
  getSessionData,
  setSessionData,
  setUsersData,
  getUsersData
} from './state';


const rootEl = document.querySelector('#container');
const loading = document.querySelector('.loading');

// Initialize the application
function initializeApp() {
  rootEl.addEventListener('click', handleRootClick);
  checkUserSession();
}

// Event handler for root clicks
function handleRootClick(e) {
  if (e.target.classList.contains('login-button')) {
    const username = document.querySelector('.login-input').value;
    getUserLogin(username);
  } else if (e.target.classList.contains('logout-button')) {
    getLogout();
  } else if (e.target.classList.contains('send-msg')) {
    sendMessages();
  }
}

// Handle login logic
function getUserLogin(username) {
  userLogin(username)
    .then(res => {
      document.querySelector('.login-msg').innerText = '';
      welcomeHome(res);
    })
    .catch(error => {
      document.querySelector('.login-msg').innerText = error.error;
    });
}

// Handle logout logic
function getLogout() {
  logout().then(() => renderLogin(rootEl));
}

// Send message
function sendMessages() {
  const inputEl = document.querySelector('.input-msg');
  const msg = inputEl.value;
  if (!msg) return;
  const {
    imagePath
  } = getSessionData();
  postMessages(msg, imagePath).then(() => {
    inputEl.value = '';
    getAllMessages(true);
    restartIntervalForMessages();
  });
}

// user home after successful login
function welcomeHome(user) {
  setSessionData(user);
  renderHome(rootEl, getSessionData());
  fetchInitialData();
  addEnterKeySendEvent();
}

// / Add event listener for sending messages on "Enter" key press
function addEnterKeySendEvent() {
  const inputMsg = document.querySelector('.input-msg');
  const sendMsgButton = document.querySelector('.send-msg');

  if (inputMsg && sendMsgButton) {
    inputMsg.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessages();
      }
    });
  }
}

// Fetch initial data for users and messages
function fetchInitialData() {
  getAllUsers();
  getAllMessages(true);
  restartIntervalForUsers();
  restartIntervalForMessages();
}

// Retrieve all users
function getAllUsers() {
  toggleLoading('.user-loading', true);
  getUsers().then(res => {
    setUsersData(res.users);
    renderUserList(getUsersData());
  }).finally(() => toggleLoading('.user-loading', false));
}

// Retrieve all messages
function getAllMessages(scroll) {
  toggleLoading('.msg-loading', true);
  getMessages().then(res => {
    renderMsgList(res.msgList, getUsersData());
    if (scroll) scrollToBottom(document.querySelector('.msg-list'));
  }).finally(() => toggleLoading('.msg-loading', false));
}

// Toggle loading indicator
function toggleLoading(selector, show) {
  const element = document.querySelector(selector);
  element.hidden = !show;
}

// Restart polling for users
function restartIntervalForUsers() {
  startPollingUsers(getAllUsers);
}

// Restart polling for messages
function restartIntervalForMessages() {
  startPollingMessages(() => getAllMessages(false));
}

// Scroll to the bottom of a target element
function scrollToBottom(target) {
  target.scrollTop = target.scrollHeight;
}

// Check user session
function checkUserSession() {
  getSession()
    .then(res => {
      setSessionData(res);
      welcomeHome(res);
    })
    .catch(() => {
      renderLogin(rootEl);
    })
    .finally(() => {
      document.querySelector('.loading').hidden = true;
    });
}

// Start the application
initializeApp();