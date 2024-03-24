"use server";

import { privateApi } from "@src/config/api";

export async function getDocuments(): Promise<{ accesstoken: string; }> {
	const response = await privateApi.get("/documents");

	return response.data;
}