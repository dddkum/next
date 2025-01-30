import { dbClient } from "@/shared/lib/db";
import { cache } from "react";

class CoursesRepository {
    getCoursesList = cache(
        (): Promise<CourseListElement[]> => dbClient.course.findMany(),
    );

    createCourseElement = async (
        command: CreateCourseListElementCommand,
    ): Promise<CourseListElement> => {
        return dbClient.course.create({
            data: command,
        });
    };

    deleteCourseElement = async (command: DeleteCourseListElementCommand) => {
        return dbClient.course.delete({
            where: { id: command.id },
        });
    };
}

export const coursesRepository = new CoursesRepository();
