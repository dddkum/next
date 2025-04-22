"use server";

import prisma from "@/shared/lib/prisma";

export async function getFilials() {
    return await prisma.filial.findMany();
}

// Добавить новый филиал
export async function addFilial(formData: FormData) {
    const name = formData.get("name") as string;
    const location = formData.get("location") as string;

    await prisma.filial.create({
        data: {
            name,
            location,
        },
    });
}

// Удалить филиал по ID
export async function deleteFilial(id: number) {
    await prisma.filial.delete({ where: { id } });
}
