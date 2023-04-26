import axios from "axios";
import store from "../redux/store";
import { setLoader } from "../redux/loaderSlice";
export class AxiosService {
   baseUrl = "https://us-central1-gmach-9e20b.cloudfunctions.net/api/api/v1";
   client

  constructor() {
    this.configAxiosInstance();
  }

   configAxiosInstance() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        withCredentials: true,
      },
    };

    this.client = axios.create(config);
    let that = this;
    store.dispatch(setLoader(true));
    this.client.interceptors.request.use(
      async function (config) {
        config.headers.Accept = "application/json";
        return config;
      },
      function (error) {
        store.dispatch(setLoader(false));
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        console.log("Intercepting the response before sending it", response);
        store.dispatch(setLoader(false));
        return response;
      },
      (error) => {
        store.dispatch(setLoader(false));
        console.log("Response  Error: ", error);
        return Promise.reject(
          (error && error?.response?.data?.errorMessage) ||
            error?.response?.data?.message
        );
      }
    );
    return this.client;
  }

 getClient() {
    return this.client;
  }
}
