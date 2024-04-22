export const BASE_URI = "http://127.0.0.1:8080" //TODO : 배포후 환경에 따른 분기 설정 (로컬/실서버)
const API_VERSION = "v1";
export const API_QUIZ_BASE = `${BASE_URI}/api/${API_VERSION}/quizzes`;
export const API_USERS_LOGIN = `${BASE_URI}/api/${API_VERSION}/users/login`;
export const API_USERS_JOIN = `${BASE_URI}/api/${API_VERSION}/users/join`;