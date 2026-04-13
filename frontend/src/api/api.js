import axios from "axios";
import { clearAccessToken, getAccessToken, setAccessToken } from "./tokenService";

const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true, // needed for refresh token cookie
});

//REQUEST INTERCEPTOR (attach access token)
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

//RESPONSE INTERCEPTOR (handle token expiry)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        //if token expired (401) → refresh it
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const res = await api.post(
                    "/auth/refresh-token",
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = res.data.accessToken;

                //store new token in memory
                setAccessToken(newAccessToken);

                //attach new token and retry original request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (err) {
                clearAccessToken();
                console.log("Session expired. Please login again.");
            }
        }

        return Promise.reject(error);
    }
);

export default api;