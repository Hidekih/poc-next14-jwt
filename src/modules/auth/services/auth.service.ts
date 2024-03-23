import { localApi } from "@src/config/api";

class AuthService {
	async login(params: {
		email: string;
		password: string;
	}): Promise<{
		accessToken: string;
		refreshToken: string;
	}> {
		const response = await localApi.post("/auth/login", params);

		return response.data;
	}

	async refreshToken(): Promise<{
		accesstoken: string;
	}> {
		const response = await localApi.post("/auth/refresh-token");

		return response.data;
	}
	
	async logout(): Promise<void> {
		await localApi.post("/auth/logout");
	}

	
	async getAccessToken(): Promise<{
		accesstoken: string;
	}> {
		const response = await localApi.get("/auth/get-access-token");

		return response.data;
	}
}

export const authService = new AuthService();
