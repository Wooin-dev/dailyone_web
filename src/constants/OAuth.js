import {API_VERSION, BASE_API_URI} from "./ApiEndpoint";

export const KAKAO_CLIENT_ID = "7f4f0eb4fb9ca5dc05eb0f926eaf7e03";
// export const KAKAO_REDIRECT_URI = process.env.REACT_APP_API_BASE_URI + "/api/v1/social-login/kakao/callback";
export const KAKAO_REDIRECT_URI = "http://localhost:3000/kakao-login";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
export const KAKAO_LOGIN_URL = `${BASE_API_URI}/api/${API_VERSION}/social-login/kakao/callback`;
