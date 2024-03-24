"use server";

import { cookies } from "next/headers";
import { decodeJwt } from "../utils/decodeJwt";
import { ACCESS_TOKEN_NAME } from "@src/modules/auth/constants/token-names";

type TAuthUser = Record<string, unknown>;

export const getAuthUser = async (): Promise<TAuthUser | null> => {
    const accessToken = cookies().get(ACCESS_TOKEN_NAME)?.value;
    if (!accessToken) return null;

    const decodedToken = decodeJwt<Record<string, unknown>>(accessToken);
    
    return {
        name: "Jon Doe",
        roles: decodedToken.roles,
    } as TAuthUser;
};