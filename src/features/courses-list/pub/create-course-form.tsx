"use client";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { createCourseAction } from "@/features/courses-list/actions";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

const createCourseSchema = z.object({
    name: z.string(),
    description: z.string(),
});

export function CreateCourseForm({
    className,
    revalidatePagePath,
}: {
    className: string;
    revalidatePagePath: string;
}) {
    const [isCreateTransition, startCreateTransition] = useTransition();
    const form = useForm({
        resolver: zodResolver(createCourseSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    startCreateTransition(async () => {
                        await createCourseAction(data, revalidatePagePath);
                    });
                })}
                className={cn(className, "space-y-8")}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Название</FormLabel>
                            <FormControl>
                                <Input placeholder="Название..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Описание</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Описание..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isCreateTransition}>
                    Добавить
                </Button>
            </form>
        </Form>
    );
}
