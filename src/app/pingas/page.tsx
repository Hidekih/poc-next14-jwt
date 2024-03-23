import { privateApi } from "@src/config/api";
import { Buttao } from "./buttao";

export default async function Pingas() {
    const response = await privateApi.get("/acceptanceTerm");


    const clients = async () => {
        "use client";

        const response = await privateApi.get("/acceptanceTerm");
        console.log(response)
    }
    
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            Pingas
            
            <Buttao />
        </main>
    );
}
