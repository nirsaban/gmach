import { AxiosInstance } from "axios";
import { AxiosService } from "./axiosService";
import store from "../redux/store";
const state = store.getState();

export class ApiServices {
  httpClient;

  constructor() {
    this.httpClient = new AxiosService().getClient();
  }

   async createUser(data) {
    try {
      const response = await this.httpClient.post("/users", { ...data });

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createUsers(data) {
    try {
      const response = await this.httpClient.post("/users/multiple", { ...data });

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

   async getUsers() {
    try {
      const response = await this.httpClient.get("/users");

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

   async sendSms(data) {
    try {
      const response = await this.httpClient.post("/users/sendsms", {
        ...data,
      });

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
