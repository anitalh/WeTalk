// Initial state object containing session data and user list
let state = {
    sessionData: {
        username: null,
        image: null,
    },
    users: []
};

// Function to set session data in the state
export function setSessionData(user) {
    state.sessionData.username = user.username;
    state.sessionData.image = user.image;
}

// Function to retrieve session data from the state
export function getSessionData() {
    return state.sessionData;
}

// Function to set user data in the state
export function setUsersData(users) {
    state.users = users;
}

// Function to retrieve user data from the state
export function getUsersData() {
    return state.users;
}