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

	setstate(id, state) {
		return http.put(`/repo?id=${id}&state=${state}`);
	}
	changestate(id) {
		return http.put(`/repo?id=${id}`);
	}

	delete(id) {
		return http.delete(`/repo/${id}`);
	}

	countBorrowed() {
		return http.get(`/repo/countBorrowed`);
	}
	countAll() {
		return http.get(`/repo/count`);
	}
}

export default new BookInLibService();