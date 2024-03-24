"use client";

import { getDocuments } from "@src/modules/auth/services/test.service";

export const Buttao = () => {
    const clients = async () => {
        const response = await getDocuments();
    }
    
    return (
        <button onClick={clients}>Client request</button>
    );
}