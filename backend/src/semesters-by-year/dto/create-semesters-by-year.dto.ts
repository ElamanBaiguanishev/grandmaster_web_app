export class CreateSemestersByYearDto {
    name: string;  // Название семестра

    yearId: number;  // Год, к которому относится семестр

    courseId: number;  // ID курса (связанная сущность)
}
