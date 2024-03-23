import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { ACCESS_TOKEN_NAME } from "@src/modules/auth/constants/token-names";

export type TJWTTokens = {
	accesstoken: string;
	refreshtoken: string;
}

export async function GET() {
	try {
		const storagedAccessToken = cookies().get(ACCESS_TOKEN_NAME)?.value;

		if (!storagedAccessToken) throw new Error("Invalid credentials");

		return NextResponse.json({ accesstoken: storagedAccessToken });
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
