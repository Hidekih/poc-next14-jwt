import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { publicApi } from "@src/config/api";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "@src/modules/auth/constants/token-names";

export type TJWTTokens = {
	accesstoken: string;
	refreshtoken: string;
}

export async function POST(request: Request) {
	const body = await request.json()
	
	try {
		// TODO ? Block third party request ?

		const { email, password } = body;

		const { data } = await publicApi.post<TJWTTokens>(`/authenticate`, {
			email,
			password,
		});

		const { accesstoken, refreshtoken } = data;

		// Improve error message
		if (!accesstoken || !refreshtoken) return NextResponse.json({ error: "Missing tokens" }, { status: 500 });

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

		return NextResponse.json({ ok: true });
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

		return NextResponse.json(
			{ message: "Unexpected error", ptMessage: "Erro inesperado", error: JSON.stringify(err) },
			{ status: 500 },
		);
	}
}
