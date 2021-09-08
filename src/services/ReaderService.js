import http from "../http-common";

class ReaderService {
    getAll(params) {
        return http.get("/reader/search", {params});
    }

    get(id) {
        return http.get(`/reader/${id}`);
    }

    create(data) {
        return http.post("/reader", data);
    }

    update(id, data) {
        return http.put(`/reader/${id}`, data);
    }

    delete(id) {
        return http.delete(`/reader/${id}`);
    }

    getByName(name) {
        return http.get(`/reader?name=${name}`);
    }

    getByPhone(phone) {
        return http.get(`/reader?phone=${phone}`);
    }

    countAll() {
        return http.get(`/reader/count`);
    }
}

export default new ReaderService();