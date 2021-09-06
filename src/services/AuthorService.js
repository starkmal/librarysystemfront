import http from "../http-common";

class AuthorService {
	get(id) {
		return http.get(`/author/${id}`);
	}

	getByName(name) {
		return http.get(`/author?name=${name}`);
	}

	getbooks(id) {
		return http.get(`/author/${id}/books`);
	}

	create(data) {
		return http.post(`/author`, data);
	}

	update(id, data) {
		return http.put(`/author/${id}`, data);
	}

	delete(id) {
		return http.delete(`/author/${id}`);
	}
}

export default new AuthorService();