"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");

    const handleLogin = async () => {
        document.cookie = `auth_token=123456; path=/;`;
        router.push("/dashboard");
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-3xl font-bold">Вход</h1>
            <input
                className="border px-4 py-2 rounded"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleLogin}
            >
                Войти
            </button>
        </main>
    );
}
