import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "@src/modules/auth/constants/token-names";

export async function POST() {
	try {
		cookies().delete(ACCESS_TOKEN_NAME);
		cookies().delete(REFRESH_TOKEN_NAME);

		return NextResponse.json({ message: "Socessu" });
	} catch (err: any) {
		return NextResponse.json({ error: "Unexpected error", errors: err }, { status: 500 });
	}
}
