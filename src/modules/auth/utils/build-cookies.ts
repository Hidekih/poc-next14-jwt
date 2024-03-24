import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "../constants/token-names"

export const buildCookie = {
	accesstoken: (accesstoken: string): ResponseCookie => {
		return {
			name: ACCESS_TOKEN_NAME,
			value: accesstoken,
			path: "/",
			secure: true,
            httpOnly: true,
			sameSite: "strict",
			maxAge: 1000 * 60 * 60, // 1 hour
		};
	},
	refreshToken: (refreshtoken: string): ResponseCookie => {
		return {
			name: REFRESH_TOKEN_NAME,
			value: refreshtoken,
			path: "/",
			secure: true,
			httpOnly: true,
			sameSite: "strict",
			maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
		};
	},
};
