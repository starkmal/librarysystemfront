import http from "../http-common";

class BookService {
	getAll(params) {
		return http.get("/borrow/search", {params});
	}

	async get(id) {
		return http.get(`/borrow/${id}`);
	}

	create(data) {
		return http.post("/borrow", data);
	}

	update(id, data) {
		return http.put(`/borrow/${id}`, data);
	}

	delete(id) {
		return http.delete(`/borrow/${id}`);
	}

}

export default new BookService();