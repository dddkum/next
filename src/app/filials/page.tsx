"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFilials, addFilial, deleteFilial } from "./actions";
import { Button } from "@/shared/ui/button";

interface Filial {
    id: number;
    name: string;
    location: string;
}

export default function FilialsPage() {
    const queryClient = useQueryClient();

    const {
        data: filials,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["filials"],
        queryFn: getFilials,
    });

    const addMutation = useMutation({
        mutationFn: addFilial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["filials"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteFilial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["filials"] });
        },
    });

    const handleAddFilial = async (name: string, location: string) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("location", location);

        addMutation.mutate(formData);
    };

    const handleDeleteFilial = async (id: number) => {
        deleteMutation.mutate(id);
    };

    if (isLoading) return <p>Загрузка...</p>;
    if (error instanceof Error) return <p>Ошибка: {error.message}</p>;

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Филиалы</h1>

            <div className="mb-4 space-y-2">
                <Button
                    onClick={() => handleAddFilial("Новый филиал", "Москва")}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Добавить филиал
                </Button>
            </div>

            <ul>
                {filials?.map((filial) => (
                    <li
                        key={filial.id}
                        className="flex justify-between items-center py-1 border-b"
                    >
                        <span>
                            {filial.name} ({filial.location})
                        </span>
                        <Button
                            onClick={() => handleDeleteFilial(filial.id)}
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
