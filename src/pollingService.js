let intervalUser, intervalMsg;

// Function to start polling users
export function startPollingUsers(fetchFunction, interval = 5000) {
    stopPollingUsers();
    intervalUser = setInterval(fetchFunction, interval);
}

// Function to stop polling users
export function stopPollingUsers() {
    if (intervalUser) clearInterval(intervalUser);
}

// Function to start polling messages
export function startPollingMessages(fetchFunction, interval = 5000) {
    stopPollingMessages();
    intervalMsg = setInterval(fetchFunction, interval);
}

// Function to stop polling messages
export function stopPollingMessages() {
    if (intervalMsg) clearInterval(intervalMsg);
}