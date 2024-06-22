export const BASE_URI = process.env.REACT_APP_API_BASE_URI
export const API_VERSION = "v1";

// USERS
export const API_USERS_LOGIN = `${BASE_URI}/api/${API_VERSION}/users/login`;
export const API_USERS_JOIN = `${BASE_URI}/api/${API_VERSION}/users/join`;
export const API_USERS_MYINFO = `${BASE_URI}/api/${API_VERSION}/users/myinfo`;


// GOALS
export const API_GOALS_CREATE = `${BASE_URI}/api/${API_VERSION}/goals`;
export const API_GOALS_MY_DELETE = `${BASE_URI}/api/${API_VERSION}/goals/my`;
export const API_GOALS_MY = `${BASE_URI}/api/${API_VERSION}/goals/my`;
export const API_GOALS_GENERATE_SIMPLE = `${BASE_URI}/api/${API_VERSION}/goals/generate-simple`;

// PROMISE-GOAL
export const API_PROMISE_GOALS_MY = `${BASE_URI}/api/${API_VERSION}/promise-goals/my`;
export const API_PROMISE_GOALS_MY_DELETE = `${BASE_URI}/api/${API_VERSION}/promise-goals/my`;
export const API_PROMISE_GOALS_DELETE = `${BASE_URI}/api/${API_VERSION}/promise-goals`;
export const API_PROMISE_GOALS_FINISH = `${BASE_URI}/api/${API_VERSION}/promise-goals/finish`;

//DONE
export const API_DONE_CLICK = `${BASE_URI}/api/${API_VERSION}/done`;
export const API_DONE_DATE = `${BASE_URI}/api/${API_VERSION}/done/date`;
export const API_DONE_MONTH = `${BASE_URI}/api/${API_VERSION}/done/month`;

//SUPER-DONE
export const API_SUPER_DONE_CLICK = `${BASE_URI}/api/${API_VERSION}/super-done`;
export const API_SUPER_DONE_DATE = `${BASE_URI}/api/${API_VERSION}/super-done/date`;
export const API_SUPER_DONE_MONTH = `${BASE_URI}/api/${API_VERSION}/super-done/month`;
