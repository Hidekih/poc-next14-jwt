import axios, { AxiosInstance } from "axios";

import { env } from "./env";
import { authService } from "@src/modules/auth/services/auth.service";
import { getAccessTokenOnServer } from "./get-access-token-on-server";
import { getAccessTokenFromClient } from "./get-access-token-from-client";

const setRefreshTokenInterceptor = (axios: AxiosInstance) => {
	axios.interceptors.request.use(async (config) => {
		const isServerSide = typeof window === "undefined";
		
		if (isServerSide) {
			const accesstoken = await getAccessTokenOnServer();
			if (!accesstoken) return config;
			config.headers["Authorization"] = `Bearer ${accesstoken}`;
		};
		
		if (!isServerSide) {
			const accesstoken = getAccessTokenFromClient();
			if (!accesstoken) return config;
			config.headers["Authorization"] = `Bearer ${accesstoken}`;
		}

		return config;
	});

	axios.interceptors.response.use(
		(response) => response,
		async (error) => {	
			const previousRequest = error.config;

			const isError401 = error?.message?.includes("401") || error.response?.status === 401;

			if (isError401 && !previousRequest.sent) {
				previousRequest.sent = true;

				const { accesstoken: newAccesstoken } = await authService.refreshToken();

				previousRequest.headers["Authorization"] = `Bearer ${newAccesstoken}`;

				return axios(previousRequest);
			}

			return error;
		},
	);

	return axios;
};

const axiosInstance = axios.create({ baseURL: env.api.base_url });

const publicApi = axios.create({ baseURL: env.api.base_url });
const localApi = axios.create({ baseURL: "/api" });
const privateApi = setRefreshTokenInterceptor(axiosInstance);

export { publicApi, localApi, privateApi };