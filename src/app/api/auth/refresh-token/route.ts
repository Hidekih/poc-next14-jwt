import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { publicApi } from "@src/config/api";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "@src/modules/auth/constants/token-names";

export type TJWTTokens = {
	accesstoken: string;
	refreshtoken: string;
}

export async function POST() {
	try {
		const storagedRefreshToken = cookies().get(REFRESH_TOKEN_NAME)?.value;

		if (!storagedRefreshToken) throw new Error("Invalid credentials");

		const { data } = await publicApi.post<TJWTTokens>("/refresh-token", { token: storagedRefreshToken });
		const { accesstoken, refreshtoken } = data;
		if (!accesstoken || !refreshtoken) throw new Error("Invalid credentials");

		cookies().set({
			name: ACCESS_TOKEN_NAME,
			value: accesstoken,
			path: "/",
			secure: true,
			sameSite: "strict",
			maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
			// domain: env.app.environment === "development" ? undefined : env.app.cookie_domain,
		} as ResponseCookie);
		
		cookies().set({
			name: REFRESH_TOKEN_NAME,
			value: refreshtoken,
			path: "/",
			secure: true,
			httpOnly: true,
			sameSite: "strict",
			maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
			// domain: env.app.environment === "development" ? undefined : env.app.cookie_domain,
		} as ResponseCookie);

		return NextResponse.json({ accesstoken });
	} catch (err: any) {
		if (err?.response?.status === 401) {
			return NextResponse.json(
				{
					message: "Invalid credentials",
					ptMessage: "Credenciais inválidas",
				},
				{ status: 401 },
			);
		}

		cookies().delete("access");
		cookies().delete("refresh");

		return NextResponse.json(
			{ message: "Unexpected error", ptMessage: "Erro inesperado", error: err },
			{ status: 500 },
		);
	}
}
