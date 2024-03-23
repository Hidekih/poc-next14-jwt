"use client";

import { privateApi } from "@src/config/api";

export const Buttao = () => {
    const clients = async () => {
        const response = await privateApi.get("/acceptanceTerm");
        console.log(response)
    }
    
    return (
        <button onClick={clients}>Client request</button>
    );
}