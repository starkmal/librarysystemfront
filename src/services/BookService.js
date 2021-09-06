import http from "../http-common";

class BookService {
	getAll(params) {
		return http.get("/search", {params});
	}

	get(isbn) {
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

	searchByTitle(title) {
		return http.get(`/book?title=${title}`);
	}
	searchByIsbn(isbn) {
		return http.get(`/book?isbn=${isbn}`);
	}
	searchByAuthor(author) {
		return http.get(`/book?author=${author}`);
	}
}

export default new BookService();