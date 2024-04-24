export const BASE_URI = "http://127.0.0.1:8080" //TODO : 배포후 환경에 따른 분기 설정 (로컬/실서버)
const API_VERSION = "v1";

// USERS
export const API_USERS_LOGIN = `${BASE_URI}/api/${API_VERSION}/users/login`;
export const API_USERS_JOIN = `${BASE_URI}/api/${API_VERSION}/users/join`;


// GOALS
export const API_GOALS_CREATE = `${BASE_URI}/api/${API_VERSION}/goals`;
export const API_GOALS_MY = `${BASE_URI}/api/${API_VERSION}/goals/my`;
