"use server";

import { cookies } from "next/headers";

import { publicApi } from "@src/config/api";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "../constants/token-names";
import { buildCookie } from "../utils/build-cookies";

export async function authenticate(params: {
	email: string;
	password: string;
}): Promise<{ accesstoken: string; }> {
	const response = await publicApi.post<{ accesstoken: string; refreshtoken: string }>("/authenticate", params);

	const accesstoken = response.data.accesstoken;
	const refreshtoken = response.data.accesstoken;

	cookies().set(buildCookie.accesstoken(accesstoken));
	cookies().set(buildCookie.refreshToken(refreshtoken));

	return { accesstoken };
}

export async function refreshToken(token: string): Promise<{
	accesstoken: string;
}> {
	const response = await publicApi.post<{ accesstoken: string; refreshtoken: string }>("/refresh-token", { token });

	const accesstoken = response.data.accesstoken;
	const refreshtoken = response.data.refreshtoken;

	cookies().set(buildCookie.accesstoken(accesstoken));
	cookies().set(buildCookie.refreshToken(refreshtoken));

	return { accesstoken };
}

export async function logout(): Promise<void> {
	await publicApi.post("/auth/logout");
	cookies().delete(ACCESS_TOKEN_NAME);
	cookies().delete(REFRESH_TOKEN_NAME);
}
