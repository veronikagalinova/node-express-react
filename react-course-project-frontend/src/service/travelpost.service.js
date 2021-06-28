import http from "../http-common";

class TravelPostDataService {
    getAll() {
      return http.get("http://localhost:8081/api/travelposts");
    }
  
    get(id) {
      return http.get(`/travelposts/${id}`);
    }
  
    create(data) {
      return http.post("/travelposts", data);
    }
  
    update(id, data) {
      return http.put(`/travelposts/${id}`, data);
    }
  
    delete(id) {
      return http.delete(`/travelposts/${id}`);
    }
  
    deleteAll() {
      return http.delete(`/travelposts`);
    }
  
    findByTitle(title) {
      return http.get(`/travelposts?title=${title}`);
    }
  }
  
  export default new TravelPostDataService();