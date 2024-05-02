export const BASE_URI = process.env.REACT_APP_API_BASE_URI
const API_VERSION = "v1";

// USERS
export const API_USERS_LOGIN = `${BASE_URI}/api/${API_VERSION}/users/login`;
export const API_USERS_JOIN = `${BASE_URI}/api/${API_VERSION}/users/join`;
export const API_USERS_MYINFO = `${BASE_URI}/api/${API_VERSION}/users/myinfo`;


// GOALS
export const API_GOALS_CREATE = `${BASE_URI}/api/${API_VERSION}/goals`;
export const API_GOALS_MY_DELETE = `${BASE_URI}/api/${API_VERSION}/goals/my`;
export const API_GOALS_MY = `${BASE_URI}/api/${API_VERSION}/goals/my`;

//
export const API_GOALS_DONE = (goalId) =>{return `${BASE_URI}/api/${API_VERSION}/goals/${goalId}/done`};
