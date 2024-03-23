"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { authService } from "../services/auth.service";
import { privateApi } from "@src/config/api";

export const LoginForm = () => {
    const { register, handleSubmit } = useForm<{ email: string; password: string; }>();
    
    const onSubmit: SubmitHandler<{ email: string; password: string; }> = async (data) => {
        try {
            const response = await authService.login(data);
            console.log(response);
        } catch (err: any) {
            console.error(err.message)
        }
    } 

    const handleFetchPrivateRoute = async () => {
        const res = await privateApi.get("/documents");
        // console.log(res);
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
