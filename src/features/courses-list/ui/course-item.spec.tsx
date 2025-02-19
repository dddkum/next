import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CourseItem } from "@/features/courses-list/ui/course-item";

describe("course item", () => {
    const onDelete = jest.fn();
    it("should call delete on click", async () => {
        render(
            <CourseItem
                course={{ id: "1", description: "descr", name: "name" }}
                onDelete={onDelete}
            />,
        );

        await userEvent.click(screen.getByText("Удалить"));

        expect(onDelete).toHaveBeenCalled();
    });
});
