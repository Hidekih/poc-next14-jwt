
import { getDocuments } from "@src/modules/auth/services/test.service";
import { Buttao } from "./buttao";

export default async function Pingas() {
    const response = getDocuments();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            Pingas
            
            <Buttao />
        </main>
    );
}
