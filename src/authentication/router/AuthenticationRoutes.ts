import KakaoRedirection from "@/authentication/redirection/kakao/KakaoRedirection,vue"

const authenticationRoutes = [
    {
        path: '/kakao_oauth/Kakao-access-token',
        name: 'KakaoRedirection',
        component: KakaoRedirection
    },
]

export default authenticationRoutes