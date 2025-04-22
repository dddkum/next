"use client";

import { useEffect, useState } from "react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function WorkersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    useEffect(() => {
        fetch("/api/workers", { method: "GET" })
            .then((res) => res.json())
            .then(setUsers);
    }, []);

    const addUser = async () => {
        const res = await fetch("/api/workers", {
            method: "POST",
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            const newUser = await res.json();
            setUsers((prev) => [...prev, newUser]);
            setForm({ name: "", email: "", password: "" });
        }
    };

    const deleteUser = async (id: number) => {
        await fetch(`/api/workers?id=${id}`, { method: "DELETE" });
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Сотрудники</h1>

            <div className="mb-4 space-y-2">
                <Input
                    type="text"
                    placeholder="Имя"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border p-2 rounded"
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                />
                <Input
                    type="password"
                    placeholder="Пароль"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                />
                <Button
                    type="submit"
                    onClick={addUser}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Добавить
                </Button>
            </div>

            <ul>
                {users.map((user) => (
                    <li
                        key={user.id}
                        className="flex justify-between items-center py-1 border-b"
                    >
                        <span>
                            {user.name} ({user.email})
                        </span>
                        <Button
                            onClick={() => deleteUser(user.id)}
                            className="text-red-500"
                        >
                            Удалить
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
