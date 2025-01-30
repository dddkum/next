"use server";
import { revalidatePath } from "next/cache";
import { coursesRepository } from "@/features/courses-list/courses.repository";

export const createCourseAction = async (
    command: CreateCourseListElementCommand,
    revalidatePagePath: string,
) => {
    await coursesRepository.createCourseElement(command);
    revalidatePath(revalidatePagePath);
};
