export interface IGroup {
    id: number
    name: string
    semester: ISemester
}

export interface ISemester {
    id: number
    name: string
    course: ICourse
}

export interface ICourse {
    id: number;
    name: string;
    studyMode?: IStudyMode;
}

export interface IStudyMode {
    id: number;
    name: string;
    courses?: ICourse[];
}

export interface ILesson {
    id: number
    name: string
}