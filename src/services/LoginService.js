import http from "../http-common";

class LoginService {
	Login(username,password){
		return http.post(`/login?username=${username}&password=${password}`)
	}
	Logout(){
		return http.get(`logout`)
	}
}


export default new LoginService();