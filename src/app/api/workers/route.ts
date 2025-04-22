import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import prisma from "@/shared/lib/prisma";

// получение всех работников
export async function GET() {
    try {
        const workers = await prisma.user.findMany({
            include: {
                team: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return NextResponse.json(workers);
    } catch (error) {
        return NextResponse.json(
            { error: "Ошибка при получении работников" },
            { status: 500 },
        );
    }
}

// добавление работника
export async function POST(req: Request) {
    const data = await req.json();

    try {
        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role || Role.USER,
                teamId: data.teamId ?? null,
            },
        });
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Ошибка при добавлении работника" },
            { status: 400 },
        );
    }
}

// удаление работника по ID
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    if (!id) {
        return NextResponse.json({ error: "ID не указан" }, { status: 400 });
    }

    try {
        await prisma.user.delete({ where: { id } });
        return NextResponse.json({ message: "Удалено" });
    } catch (error) {
        return NextResponse.json(
            { error: "Ошибка при удалении" },
            { status: 500 },
        );
    }
}
