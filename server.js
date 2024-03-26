const express = require('express');
const cookieParser = require('cookie-parser');

const sessions = require('./sessions');
const users = require('./users');
const messages = require('./messages');


const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({
      error: 'auth-missing'
    });
    return;
  }
  res.json({
    username
  });
});

app.post('/api/session', (req, res) => {
  const {
    username
  } = req.body;

  if (!users.isValidUsername(username)) {
    res.status(400).json({
      error: 'username-invalid'
    });
    return;
  }

  if (username === 'dog') {
    res.status(403).json({
      error: 'auth-insufficient'
    });
    return;
  }

  const sid = sessions.addSession(username);

  res.cookie('sid', sid);
  res.json({
    username
  });
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (sid) {
    res.clearCookie('sid');
  }

  if (username) {
    sessions.deleteSession(sid);
  }

  res.json({
    wasLoggedIn: !!username
  })
});

app.get('/api/users', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({
      error: 'auth-missing'
    });
    return;
  }
  const users = sessions.getUsers();
  res.json({
    users
  });
});

app.post('/api/message', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  const imagePath = sid ? sessions.getSessionImage(sid) : '';
  if (!sid || !username) {
    res.status(401).json({
      error: 'auth-missing'
    });
    return;
  }

  const {
    msg
  } = req.body;

  if (msg == null || msg === '') {
    res.status(400).json({
      error: 'required-message'
    });
    return;
  }

  messages.msgs(username, msg, imagePath);
  res.json({
    msg
  });
});

app.get('/api/message', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({
      error: 'auth-missing'
    });
    return;
  }
  const msgList = messages.getMsgs();
  res.json({
    msgList
  });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));