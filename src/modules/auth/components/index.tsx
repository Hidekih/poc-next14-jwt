"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { authenticate } from "../services/auth.service";
import { getDocuments } from "../services/test.service";

export const LoginForm = () => {
    const { register, handleSubmit } = useForm<{ email: string; password: string; }>();
    
    const onSubmit: SubmitHandler<{ email: string; password: string; }> = async (data) => {
        try {
            const response = await authenticate(data);
            console.log(response);
        } catch (err: any) {
            console.error(err.message)
        }
    } 

    const handleFetchPrivateRoute = async () => {
        try {
            await getDocuments();
        } catch (err: any) {
            console.error(err.message)
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "480px" }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "24px", width: "480px" }}>
                <input {...register("email")} placeholder="Email" />

                <input type="password" {...register("password")} placeholder="Senha" />

                <button type="submit">Entrar</button>
            </form>

            <button type="button" onClick={handleFetchPrivateRoute}>Fetch private route</button>
        </div>
    )
};
