import http from "@/http-common";

class userDataService {
  logIn(username, password) {
    return http.post("/api/v1/account/login", {
      login: username,
      password: password,
    });
  }
  getInfo() {
    return http.get("/api/v1/account/info");
  }
}

export default new userDataService();
