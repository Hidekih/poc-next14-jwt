'use server';

import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { RedirectType } from "next/dist/client/components/redirect";

import { ACCESS_TOKEN_NAME } from "@src/modules/auth/constants/token-names";
import { decodeJwt } from "@src/modules/auth/utils/decodeJwt";

type TGuardProps = string[] | string[][];

export type TToken = {
	email: string;
	roles: string[];
	exp: number;
	sub: string;
};

export async function guard(permittedRoles: TGuardProps) {
    try {
        const accessToken = cookies().get(ACCESS_TOKEN_NAME)?.value;
        if (!accessToken) redirect("/auth/login", RedirectType.replace);

        const decodedToken = decodeJwt<TToken>(accessToken);

        const userRoles = decodedToken.roles ?? [];
        const parsedPermittedRoles = permittedRoles.flat();

        var canAccess = parsedPermittedRoles.some((r) => userRoles.includes(r));

        if (!canAccess && permittedRoles.length == 0) redirect("/auth/login", RedirectType.replace);
    } catch (error) {
        console.error(error);   
        redirect("/auth/login", RedirectType.replace);
    }
}