import http from "../http-common";

class UserService {
    login(username, password) {
        return http.post(`/login?username=${username}?password=${password}`);
    }
    logout() {
        return http.get('/logout');
    }
}

export default new UserService();