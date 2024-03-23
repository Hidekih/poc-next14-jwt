import { ACCESS_TOKEN_NAME } from "@src/modules/auth/constants/token-names";
import cookie from "cookie";

export const getAccessTokenFromClient = () => {
	const accesstoken = cookie.parse(window.document.cookie)[ACCESS_TOKEN_NAME];
	return accesstoken ?? undefined;
};