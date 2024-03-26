/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pollingService.js":
/*!*******************************!*\
  !*** ./src/pollingService.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startPollingMessages: () => (/* binding */ startPollingMessages),
/* harmony export */   startPollingUsers: () => (/* binding */ startPollingUsers),
/* harmony export */   stopPollingMessages: () => (/* binding */ stopPollingMessages),
/* harmony export */   stopPollingUsers: () => (/* binding */ stopPollingUsers)
/* harmony export */ });
var intervalUser, intervalMsg;

// Function to start polling users
function startPollingUsers(fetchFunction) {
  var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
  stopPollingUsers();
  intervalUser = setInterval(fetchFunction, interval);
}

// Function to stop polling users
function stopPollingUsers() {
  if (intervalUser) clearInterval(intervalUser);
}

// Function to start polling messages
function startPollingMessages(fetchFunction) {
  var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
  stopPollingMessages();
  intervalMsg = setInterval(fetchFunction, interval);
}

// Function to stop polling messages
function stopPollingMessages() {
  if (intervalMsg) clearInterval(intervalMsg);
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMessages: () => (/* binding */ getMessages),
/* harmony export */   getSession: () => (/* binding */ getSession),
/* harmony export */   getUsers: () => (/* binding */ getUsers),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   postMessages: () => (/* binding */ postMessages),
/* harmony export */   userLogin: () => (/* binding */ userLogin)
/* harmony export */ });
// Function to make a fetch request
function makeFetchRequest(url, options) {
  return fetch(url, options).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (error) {
        return Promise.reject(error);
      }, function () {
        return Promise.reject({
          error: 'bad-response'
        });
      });
    }
    return response.json()["catch"](function () {
      return Promise.reject({
        error: 'bad-json'
      });
    });
  })["catch"](function (error) {
    if (error.error) {
      return Promise.reject(error);
    }
    return Promise.reject({
      error: 'network-error'
    });
  });
}

// Function to perform user login
function userLogin(username) {
  return makeFetchRequest('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  });
}

// Function to retrieve session data
function getSession() {
  return makeFetchRequest('/api/session/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  });
}

// Function to retrieve user data
function getUsers() {
  return makeFetchRequest('/api/users/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  });
}

// Function to retrieve messages
function getMessages() {
  return makeFetchRequest('/api/message/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  });
}

// Function to post a new message
function postMessages(msg, imagePath) {
  return makeFetchRequest('/api/message/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      msg: msg,
      imagePath: imagePath
    })
  });
}

// Function to perform user logout
function logout() {
  return makeFetchRequest('/api/session/', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSessionData: () => (/* binding */ getSessionData),
/* harmony export */   getUsersData: () => (/* binding */ getUsersData),
/* harmony export */   setSessionData: () => (/* binding */ setSessionData),
/* harmony export */   setUsersData: () => (/* binding */ setUsersData)
/* harmony export */ });
// Initial state object containing session data and user list
var state = {
  sessionData: {
    username: null,
    image: null
  },
  users: []
};

// Function to set session data in the state
function setSessionData(user) {
  state.sessionData.username = user.username;
  state.sessionData.image = user.image;
}

// Function to retrieve session data from the state
function getSessionData() {
  return state.sessionData;
}

// Function to set user data in the state
function setUsersData(users) {
  state.users = users;
}

// Function to retrieve user data from the state
function getUsersData() {
  return state.users;
}

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderHome: () => (/* binding */ renderHome),
/* harmony export */   renderLogin: () => (/* binding */ renderLogin),
/* harmony export */   renderMsgList: () => (/* binding */ renderMsgList),
/* harmony export */   renderUserList: () => (/* binding */ renderUserList)
/* harmony export */ });
function renderLogin(rootEl) {
  rootEl.innerHTML = "\n    <header class=\"page-header\"><h2>Welcome!</h2></header>\n    <main class=\"main\">\n      <div class=\"login-panel\">\n        <p class=\"login-text\">Please Login!</p>\n        <div class=\"login-form\">\n          <label>\n              Username:\n              <input class=\"login-input\" type=\"text\" name=\"username\"  placeholder=\"Enter your username\" required>\n          </label>\n          <button class=\"login-button\">\n            Login\n          </button>\n          <span class=\"login-msg\"></span>\n        </div>\n      </div>\n    </main>\n  ";
}
function renderHome(rootEl, user) {
  rootEl.innerHTML = "\n    <header class=\"page-header\">\n      <h2>\n        Welcome ".concat(user.username, "!\n      </h2>\n      <button class=\"logout-button\">\n        Logout\n      </button>\n    </header>\n    <main class=\"main\">\n      <div class=\"chat\">\n        <div class=\"users\">\n            <ul class=\"user-list\">\n            </ul>\n            <div class=\"user-loading\">\n          </div>\n        </div>\n        <div class=\"message\">\n          <div class=\"chat-header\">\n            <img src=\"./images/logo.png\" alt=\"We Talk Logo\" class=\"chat-logo\"/> \n              WeTalk!\n            </div>\n            <ul class=\"msg-list\"></ul>\n            <div class=\"msg-input\">\n                <input class=\"input-msg\" placeholder=\"Enter your message\"/>\n                <button class=\"send-msg\">\n                  Send\n                </button>\n            </div>\n            <div class=\"msg-loading\">\n            </div>\n        </div>\n      </div>\n    </main>\n  ");
}
function renderUserList(users) {
  var userList = document.querySelector('.user-list');
  userList.innerHTML = users.map(function (user) {
    var imagePath = user.image;
    var onlineDot = user.isOnline ? '<span class="online-dot"></span>' : '';
    return "\n      <li class=\"user-list-item ".concat(user.isOnline ? 'user-online' : '', "\">\n        <img src=\"").concat(imagePath, "\" alt=\"User image\" class=\"user-image\"/>\n        <div class=\"user-info\">\n        <span class=\"user-name\">\n          ").concat(user.username, "\n        </span>\n        <span class=\"online-dot\"></span>\n        </div>\n      </li>\n    ");
  }).join("");
}
function renderMsgList(messages) {
  var msgList = document.querySelector('.msg-list');
  msgList.innerHTML = messages.map(function (message) {
    return "\n    <li class=\"msg-list-item\">\n        <div class=\"msg-header\">\n        <img src=\"".concat(message.imagePath, "\" alt=\"Avatar\" class=\"user-avatar\">\n            <p class=\"msg-user\">\n              ").concat(message.username, "\n            </p>\n            <span class=\"msg-time\">\n              ").concat(message.time, "\n            </span>\n        </div>\n        <p class=\"msg-text\">\n          ").concat(message.message.replace(/</g, '&lt;').replace(/>/g, '&gt;'), "\n        </p>\n    </li>\n    ");
  }).join("");
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");
/* harmony import */ var _pollingService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pollingService */ "./src/pollingService.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state */ "./src/state.js");




var rootEl = document.querySelector('#container');
var loading = document.querySelector('.loading');

// Initialize the application
function initializeApp() {
  rootEl.addEventListener('click', handleRootClick);
  checkUserSession();
}

// Event handler for root clicks
function handleRootClick(e) {
  if (e.target.classList.contains('login-button')) {
    var username = document.querySelector('.login-input').value;
    getUserLogin(username);
  } else if (e.target.classList.contains('logout-button')) {
    getLogout();
  } else if (e.target.classList.contains('send-msg')) {
    sendMessages();
  }
}

// Handle login logic
function getUserLogin(username) {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.userLogin)(username).then(function (res) {
    document.querySelector('.login-msg').innerText = '';
    welcomeHome(res);
  })["catch"](function (error) {
    document.querySelector('.login-msg').innerText = error.error;
  });
}

// Handle logout logic
function getLogout() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.logout)().then(function () {
    return (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderLogin)(rootEl);
  });
}

// Send message
function sendMessages() {
  var inputEl = document.querySelector('.input-msg');
  var msg = inputEl.value;
  if (!msg) return;
  var _getSessionData = (0,_state__WEBPACK_IMPORTED_MODULE_3__.getSessionData)(),
    imagePath = _getSessionData.imagePath;
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.postMessages)(msg, imagePath).then(function () {
    inputEl.value = '';
    getAllMessages(true);
    restartIntervalForMessages();
  });
}

// user home after successful login
function welcomeHome(user) {
  (0,_state__WEBPACK_IMPORTED_MODULE_3__.setSessionData)(user);
  (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderHome)(rootEl, (0,_state__WEBPACK_IMPORTED_MODULE_3__.getSessionData)());
  fetchInitialData();
  addEnterKeySendEvent();
}

// / Add event listener for sending messages on "Enter" key press
function addEnterKeySendEvent() {
  var inputMsg = document.querySelector('.input-msg');
  var sendMsgButton = document.querySelector('.send-msg');
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
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.getUsers)().then(function (res) {
    (0,_state__WEBPACK_IMPORTED_MODULE_3__.setUsersData)(res.users);
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderUserList)((0,_state__WEBPACK_IMPORTED_MODULE_3__.getUsersData)());
  })["finally"](function () {
    return toggleLoading('.user-loading', false);
  });
}

// Retrieve all messages
function getAllMessages(scroll) {
  toggleLoading('.msg-loading', true);
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.getMessages)().then(function (res) {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderMsgList)(res.msgList, (0,_state__WEBPACK_IMPORTED_MODULE_3__.getUsersData)());
    if (scroll) scrollToBottom(document.querySelector('.msg-list'));
  })["finally"](function () {
    return toggleLoading('.msg-loading', false);
  });
}

// Toggle loading indicator
function toggleLoading(selector, show) {
  var element = document.querySelector(selector);
  element.hidden = !show;
}

// Restart polling for users
function restartIntervalForUsers() {
  (0,_pollingService__WEBPACK_IMPORTED_MODULE_2__.startPollingUsers)(getAllUsers);
}

// Restart polling for messages
function restartIntervalForMessages() {
  (0,_pollingService__WEBPACK_IMPORTED_MODULE_2__.startPollingMessages)(function () {
    return getAllMessages(false);
  });
}

// Scroll to the bottom of a target element
function scrollToBottom(target) {
  target.scrollTop = target.scrollHeight;
}

// Check user session
function checkUserSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.getSession)().then(function (res) {
    (0,_state__WEBPACK_IMPORTED_MODULE_3__.setSessionData)(res);
    welcomeHome(res);
  })["catch"](function () {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderLogin)(rootEl);
  })["finally"](function () {
    document.querySelector('.loading').hidden = true;
  });
}

// Start the application
initializeApp();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map