import http from "../http-common";

class BookInLibService {
	get(id) {
		return http.get(`/repo/${id}`);
	}

	create(data) {
		return http.post("/repo", data);
	}

	update(id, data) {
		return http.put(`/repo/${id}`, data);
	}

	delete(id) {
		return http.delete(`/repo/${id}`);
	}
}

export default new BookInLibService();