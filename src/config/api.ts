import axios, { AxiosInstance } from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { env } from "./env";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "@src/modules/auth/constants/token-names";
import { refreshToken } from "@src/modules/auth/services/auth.service";

const setInterceptor = (axios: AxiosInstance) => {
	axios.interceptors.request.use(async (config) => {
		const accesstoken = cookies().get(ACCESS_TOKEN_NAME)?.value;
		if (accesstoken) config.headers["Authorization"] = `Bearer ${accesstoken}`;

		return config;
	});

	axios.interceptors.response.use(
		(response) => response,
		async (error) => {
			const previousRequest = error.config;
			const isError401 = error.response?.status === 401;

			if (isError401) {
				try {
					const refreshtoken = cookies().get(REFRESH_TOKEN_NAME)?.value;
					const { accesstoken: newAccesstoken } = await refreshToken(refreshtoken!);
					previousRequest.headers["Authorization"] = `Bearer ${newAccesstoken}`;

					return axios(previousRequest);
				} catch (err: any) {
					cookies().delete(ACCESS_TOKEN_NAME);
					cookies().delete(REFRESH_TOKEN_NAME);
					redirect("/");
				}
			}

			return error;
		},
	);

	return axios;
};

const axiosInstance = axios.create({ baseURL: env.api.base_url });

export const publicApi = axios.create({ baseURL: env.api.base_url });
export const privateApi = setInterceptor(axiosInstance);
