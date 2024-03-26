const messages = [];

// Adjusted function to include user image URL
const msgs = (username, message, imagePath) => {
  const date = new Date();
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const time = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} ` +
    `${String(hours).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')} ${ampm}`;

  // Add message to the messages array, now including the username and image
  messages.push({
    username,
    message,
    time,
    imagePath
  });
};

const getMsgs = () => messages;

module.exports = {
  msgs,
  getMsgs
};