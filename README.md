# JS Chat

Its a SPA using JS that calls REST services.  This SPA will be a simple Chat application. This chat application is a single chat forum, all users see the same list of messages, including messages posted before they logged in.


## Goals and Requirements
- Write RESTful services using express
- Call RESTful services in front end JS using fetch
- Practice maintaining persistent state on the server and using services to load and update client state
- Practice using browser based JS to maintain and update state, and use that state to render updates to the HTML
- Practice using RESTful services for authentication/authorization
- Write a basic polling feature to check the server for updates and update client state
  - Not using websockets or long polling, just a simple time-based loop

### Requirement Overview

- Write an express server that will serve static assets and RESTful services
- Load a static HTML page as the SPA from your express server
  - This means there should be only one single html page!
- The HTML will load a static JS file bundled and transpiled with webpack and babel
- The SPA will require a user to login to view/use the chat
  - The SPA will determine (using a service call) on load if the user is already logged in. Users that are already logged in are not required to login again.
- A logged in user will see a list of messages, a list of currently logged in users, and will be able to send messages
- Every message will identify which user sent it
- Every 5 seconds (roughly) the client side will check to see if there are new messages and/or if the list of currently logged in users has changed
  - Do NOT rewrite the HTML for the input form when you get polling results (a user typing a message will be interrupted and the message-in-progress will be lost!)
    - Hint: have a smaller render function that covers the users and the messages, but doesn't rewrite the form that gathers the input
- A user can logout and return to the login screen
  - This removes that session from the list of currently logged in users
  - A given user might be logged in more than once at the same time (using multiple browsers or different browser profiles here, more often on phone/desktop in reality)!  Make sure the username only shows up once in the list of users regardless of how many simultaneous sessions they have, and that the username only leaves the list of currently logged in user when all sessions are logged out of
  - Because we are only counting explicit "logout" actions, this app will consider a user that left the app (closing the tab or navigating to another page) as still "logged in"
- Multiple users can be logged in at once (use different browsers or different browser profiles to do this yourself) and can send and see messages from one another

### Visual Requirements

You have wide discretion on the appearance of the chat, but:
- You must have SOME styling provided by CSS
- There must be no horizontal scrolling at normal desktop screen sizes (>800px width) and with usernames of up to 20 characters
- You may have min- or max-widths for the chat area, but it must not be set to the same fixed width for all users regardless of their window
- The list of users should be visually distinct from the list of messages
- There should be good whitespace, colors, and legibility throughout to promote usability
- The app should strive for usability 
  - Example: It should be convenient to send new messages, the polling should not "interrupt" a message that is in the middle of being typed
- You must have a loading indicator (text, image, and/or CSS) for:
  - When the page is loading and the SPA does not yet know if the user is "logged in" or not
  - When the user logs in and the initial list of users/list of messages are being loaded
- You may have loading indicators for other situations or not, your choice
- Service calls that generated unexpected errors should inform the user
  - Example: GET /session can return 401 if the user is not logged in.  This is expected, and will impact what is shown (login form or chat) but will not trigger a specific message to the user.  However, a 400 response when trying to login is NOT the expected response, and will trigger a message displayed on-screen in the app to the user)

### Security Requirements

- There should not be any password involved at all
- User "dog" will be rejected with a 403 error on login (we use this check instead of checking for password)
- Services that require authorization should respond with the appropriate Status Codes (401, 403) if the request does not have a valid sid cookie value
- You should allowlist to sanitize the username
  - Hint: This MUST be done on the server-side.  Client-side can prevent "bad" usernames or must handle if the server returns an error.
- There is no requirement to sanitize messages, BUT you should think about what would be required to prevent injection attacks and how you would do so.
- All service calls that return lists of users or lists of messages require authorization
- The services must never trust the user input to decide which user is sending a message (That is, the username will not be input for service calls to send messages - instead, use the sid to find what username that session belongs to and use that).

### Quality Requirements

- You must follow the best practices outlined in the course so far for JS, CSS, HTML, services, and file structures
- The services must follow the REST requirements
- The service urls should be in an `/api/` path
- The service urls should have a version in their path
- Use Semantic HTML as much as you can
- Use Semantic CSS/HTML class names using kebab-case
  - Semantic BEM-style names are permitted

