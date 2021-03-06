import http from "../http-common";

class BorrowService {
	getRecent() {
		return http.get(`/borrow/recent`);
	}
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

	countToday() {
		return http.get(`/borrow/count`);
	}
}

export default new BorrowService();