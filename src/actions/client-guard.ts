"use client";

import { getAccessTokenFromClient } from "@src/config/get-access-token-from-client";
import { decodeJwt } from "@src/modules/auth/utils/decodeJwt";
import { RedirectType, redirect } from "next/navigation";
import { TToken } from "./server-guard";

type TGuardProps = string[] | string[][];

export async function guard(permittedRoles: TGuardProps) {
    try {
        const accesstoken = getAccessTokenFromClient();
        if (!accesstoken) redirect("/auth/login", RedirectType.replace);

        const decodedToken = decodeJwt<TToken>(accesstoken);

        const userRoles = decodedToken.roles ?? [];
        const parsedPermittedRoles = permittedRoles.flat();

        var canAccess = parsedPermittedRoles.some((r) => userRoles.includes(r));

        if (canAccess || permittedRoles.length == 0) return;
    } catch (error) {
        console.error(error);   
        redirect("/auth/login", RedirectType.replace);
    }

    redirect("/auth/login", RedirectType.replace);
}