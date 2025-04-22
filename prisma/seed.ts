import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Создание филиалов
    const filial1 = await prisma.filial.create({
        data: {
            name: "Центральный офис",
            location: "Москва",
        },
    });

    const filial2 = await prisma.filial.create({
        data: {
            name: "Филиал СПб",
            location: "Санкт-Петербург",
        },
    });

    // Создание команд
    const team1 = await prisma.team.create({
        data: {
            name: "Отдел продаж",
            filialId: filial1.id,
        },
    });

    const team2 = await prisma.team.create({
        data: {
            name: "Технический отдел",
            filialId: filial2.id,
        },
    });

    // Создание пользователей
    await prisma.user.createMany({
        data: [
            {
                name: "Иван Иванов",
                email: "ivan@example.com",
                password: "password123",
                role: Role.ADMIN,
                teamId: team1.id,
            },
            {
                name: "Анна Смирнова",
                email: "anna@example.com",
                password: "password123",
                role: Role.USER,
                teamId: team1.id,
            },
            {
                name: "Петр Кузнецов",
                email: "petr@example.com",
                password: "password123",
                role: Role.USER,
                teamId: team2.id,
            },
        ],
    });

    // Создание продаж
    await prisma.sale.createMany({
        data: [
            {
                amount: 150000,
                filialId: filial1.id,
            },
            {
                amount: 87000,
                filialId: filial1.id,
            },
        ],
    });

    console.log("🌱 Seed data has been inserted!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
