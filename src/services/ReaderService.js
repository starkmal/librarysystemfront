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

    // 待添加
    searchByName(name) {
        return http.get(`/reader?name=${name}`);
    }

    searchByPhone(phone) {
        return http.get(`/reader?phone=${phone}`);
    }

    searchByCredit(credit) {
        return http.get(`/reader?credit=${credit}`);
    }
}

export default new ReaderService();