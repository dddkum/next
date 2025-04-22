import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Создание филиалов
    const branch1 = await prisma.branch.create({
        data: {
            name: "Центральный офис",
            location: "Москва",
        },
    });

    const branch2 = await prisma.branch.create({
        data: {
            name: "Филиал СПб",
            location: "Санкт-Петербург",
        },
    });

    // Создание команд
    const team1 = await prisma.team.create({
        data: {
            name: "Отдел продаж",
            branchId: branch1.id,
        },
    });

    const team2 = await prisma.team.create({
        data: {
            name: "Технический отдел",
            branchId: branch2.id,
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
                branchId: branch1.id,
            },
            {
                amount: 87000,
                branchId: branch2.id,
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
