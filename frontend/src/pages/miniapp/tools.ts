import { IGroup } from "../../types/group/group";
import { ITask } from "../../types/task/task";
import { ILesson } from "../../types/lesson/lesson";

export function filterLessons(group: IGroup | null, selectedOption: string): ILesson[] | null {
    if (!group) return null;

    switch (selectedOption) {
        case "alltask":
            return group.lessons

        case "allkr":
            return group.lessons.map(lesson => ({
                ...lesson,
                tasks: lesson.tasks!.filter((task: ITask) => task.type.trim().toLowerCase() !== "экзамен") // Возвращает уроки с заданиями, исключая экзамены
            }));

        case "allexam":
            return group.lessons.map(lesson => ({
                ...lesson,
                tasks: lesson.tasks!.filter((task: ITask) => {
                    const taskTypeNormalized = task.type.trim().toLowerCase();
                    return taskTypeNormalized === "экзамен"; // Возвращает уроки только с заданиями типа "экзамен"
                }),
            }));

        case "choisetask":
            return null; // Возвращает null для выбранного варианта

        default:
            return null; // Возвращает null для нераспознанного значения
    }
};
