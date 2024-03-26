export function renderLogin(rootEl) {
  rootEl.innerHTML = `
    <header class="page-header"><h2>Welcome!</h2></header>
    <main class="main">
      <div class="login-panel">
        <p class="login-text">Please Login!</p>
        <div class="login-form">
          <label>
              Username:
              <input class="login-input" type="text" name="username"  placeholder="Enter your username" required>
          </label>
          <button class="login-button">
            Login
          </button>
          <span class="login-msg"></span>
        </div>
      </div>
    </main>
  `
}

export function renderHome(rootEl, user) {
  rootEl.innerHTML = `
    <header class="page-header">
      <h2>
        Welcome ${user.username}!
      </h2>
      <button class="logout-button">
        Logout
      </button>
    </header>
    <main class="main">
      <div class="chat">
        <div class="users">
            <ul class="user-list">
            </ul>
            <div class="user-loading">
          </div>
        </div>
        <div class="message">
          <div class="chat-header">
            <img src="./images/logo.png" alt="We Talk Logo" class="chat-logo"/> 
              WeTalk!
            </div>
            <ul class="msg-list"></ul>
            <div class="msg-input">
                <input class="input-msg" placeholder="Enter your message"/>
                <button class="send-msg">
                  Send
                </button>
            </div>
            <div class="msg-loading">
            </div>
        </div>
      </div>
    </main>
  `
}


export function renderUserList(users) {
  const userList = document.querySelector('.user-list');
  userList.innerHTML = users.map(user => {
    const imagePath = user.image;
    const onlineDot = user.isOnline ? '<span class="online-dot"></span>' : '';

    return `
      <li class="user-list-item ${user.isOnline ? 'user-online' : ''}">
        <img src="${imagePath}" alt="User image" class="user-image"/>
        <div class="user-info">
        <span class="user-name">
          ${user.username}
        </span>
        <span class="online-dot"></span>
        </div>
      </li>
    `;
  }).join("");
}

export function renderMsgList(messages) {
  const msgList = document.querySelector('.msg-list');

  msgList.innerHTML = messages.map((message) => {
    return `
    <li class="msg-list-item">
        <div class="msg-header">
        <img src="${message.imagePath}" alt="Avatar" class="user-avatar">
            <p class="msg-user">
              ${message.username}
            </p>
            <span class="msg-time">
              ${message.time}
            </span>
        </div>
        <p class="msg-text">
          ${message.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
        </p>
    </li>
    `;
  }).join("");
}