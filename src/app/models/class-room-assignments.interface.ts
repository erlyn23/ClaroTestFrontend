import { ClassRoom } from "./class-room.interface";
import { Student } from "./student.interface";
import { Teacher } from "./teacher.interface";

export interface ClassRoomAssignments{
    id: number;
    teacherId: number;
    studentId: number;
    classRoomId: number;
    dayOfWeekId: number;
    dayOfWeekName?: string;
    startHour: string;
    endHour: string;

    teacher?: Teacher;
    student?: Student;
    classRoom?: ClassRoom;
}