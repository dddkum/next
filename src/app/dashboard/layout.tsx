import { ReactNode } from "react";

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="min-h-screen flex">
            <aside className="w-60 bg-gray-100 p-4">Сайдбар</aside>
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
