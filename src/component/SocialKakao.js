import {BASE_URI} from "../constants/ApiEndpoint";

const SocialKakao = () => {
    const Rest_api_key = '7f4f0eb4fb9ca5dc05eb0f926eaf7e03' //REST API KEY
    const redirect_uri = `${BASE_URI}:3000/kakao-login` //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = () => {
        window.location.href = kakaoURL
    }
    return (
        <>
            <img
                className="mx-auto mt-5 cursor-pointer"
                src="/kakao_login_medium_narrow.png"
                alt="카카오 로그인 버튼"
                onClick={handleLogin}
            />
        </>
    )
}
export default SocialKakao;
