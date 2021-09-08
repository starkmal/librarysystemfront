import http from "../http-common";

class BookService {
	getTop() {
		return http.get(`/book/top`);
	}

	getAll(params) {
		return http.get("/book/search", {params});
	}

	async get(isbn) {
		return http.get(`/book/${isbn}`);
	}

	create(data) {
		return http.post("/book", data);
	}

	update(isbn, data) {
		return http.put(`/book/${isbn}`, data);
	}

	delete(id) {
		return http.delete(`/book/${id}`);
	}
}

export default new BookService();