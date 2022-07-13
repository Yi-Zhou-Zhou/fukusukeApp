import jwt_decode from 'jwt-decode';

const verifyUser = () => {
    const user_token = localStorage.getItem('token')
    if (!user_token){
        return ""
    }
    else return jwt_decode(user_token).role
}

export default verifyUser;