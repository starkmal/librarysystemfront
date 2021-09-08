import http from "../http-common";

class BorrowService {
	getAll(params) {
		return http.get("/borrow/search", {params});
	}

	async get(id) {
		return http.get(`/borrow/${id}`);
	}

	create(data) {
		return http.post("/borrow", data);
	}

	update(data) {
		return http.put(`/borrow`, data);
	}

	delete(id) {
		return http.delete(`/borrow/${id}`);
	}

}

export default new BorrowService();