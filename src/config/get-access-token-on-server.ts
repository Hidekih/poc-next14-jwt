"use server";

import { ACCESS_TOKEN_NAME } from "@src/modules/auth/constants/token-names";
import { cookies } from "next/headers";

export const getAccessTokenOnServer = async (): Promise<string | undefined> => {
    const accessToken = cookies().get(ACCESS_TOKEN_NAME)?.value;
    return accessToken;
}