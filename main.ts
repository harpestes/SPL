enum StudentStatus {
    Active = "Active",
    Academic_Leave = "Academic_Leave",
    Graduated = "Graduated",
    Expelled = "Expelled"
}

enum CourseType {
    Mandatory = "Mandatory",
    Optional = "Optional",
    Special = "Special"
}

enum Semester {
    First = "First",
    Second = "Second"
}

enum GradeValue {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2
}

enum Faculty {
    Computer_Science = "Computer_Science",
    Economics = "Economics",
    Law = "Law",
    Engineering = "Engineering"
}

interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

interface Grade {
    studentId: number;
    courseId: number;
    grade: GradeValue;
    date: Date;
    semester: Semester;
}

class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: Grade[] = [];
    private courseRegistrations: Map<number, Set<number>> = new Map();

    /**
     * Реєструє нового студента в системі.
     * @param student - Об'єкт студента без ID.
     * @returns Новий студент з унікальним ID.
     */
    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = { id: this.students.length + 1, ...student };
        this.students.push(newStudent);
        return newStudent;
    }

    /**
     * Реєструє студента на курс.
     * @param studentId - ID студента.
     * @param courseId - ID курсу.
     * @throws Помилка, якщо студент або курс не знайдені, студент з іншого факультету, або курс заповнений.
     */
    registerForCourse(studentId: number, courseId: number): void {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);

        if (!student || !course) {
            throw new Error("Invalid student or course ID");
        }

        if (student.faculty !== course.faculty) {
            throw new Error("Student cannot register for a course outside their faculty");
        }

        const registeredStudents = this.courseRegistrations.get(courseId) || new Set();

        if (registeredStudents.size >= course.maxStudents) {
            throw new Error("Course is full");
        }

        registeredStudents.add(studentId);
        this.courseRegistrations.set(courseId, registeredStudents);
    }

    /**
     * Встановлює оцінку студенту за курс.
     * @param studentId - ID студента.
     * @param courseId - ID курсу.
     * @param grade - Значення оцінки.
     * @throws Помилка, якщо курс не знайдено або студент не зареєстрований на курс.
     */
    setGrade(studentId: number, courseId: number, grade: GradeValue): void {
        const course = this.courses.find(c => c.id === courseId);
        if (!course) {
            throw new Error("Course not found");
        }

        const registeredStudents = this.courseRegistrations.get(courseId);

        if (!registeredStudents || !registeredStudents.has(studentId)) {
            throw new Error("Student is not registered for this course");
        }

        this.grades.push({
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: course.semester
        });
    }

    /**
     * Оновлює навчальний статус студента.
     * @param studentId - ID студента.
     * @param newStatus - Новий статус студента.
     * @throws Помилка, якщо студента не знайдено або його статус - Graduated або Expelled.
     */
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);
        if (!student) {
            throw new Error("Student not found");
        }

        if (student.status === StudentStatus.Graduated || student.status === StudentStatus.Expelled) {
            throw new Error("Cannot change the status of graduated or expelled students");
        }

        student.status = newStatus;
    }

    /**
     * Повертає список студентів, які навчаються на заданому факультеті.
     * @param faculty - Назва факультету.
     * @returns Масив студентів факультету.
     */
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    /**
     * Повертає всі оцінки для заданого студента.
     * @param studentId - ID студента.
     * @returns Масив оцінок студента.
     */
    getStudentGrades(studentId: number): Grade[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    /**
     * Повертає доступні курси для факультету у визначеному семестрі.
     * @param faculty - Назва факультету.
     * @param semester - Семестр.
     * @returns Масив курсів.
     */
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }

    /**
     * Обчислює середній бал студента.
     * @param studentId - ID студента.
     * @returns Середній бал.
     * @throws Помилка, якщо для студента не знайдено оцінок.
     */
    calculateAverageGrade(studentId: number): number {
        const studentGrades = this.getStudentGrades(studentId);
        if (studentGrades.length === 0) {
            throw new Error("No grades found for the student");
        }

        const total = studentGrades.reduce((sum, g) => sum + g.grade, 0);
        return total / studentGrades.length;
    }

    /**
     * Повертає список студентів-відмінників на факультеті.
     * @param faculty - Назва факультету.
     * @returns Масив студентів у яких середній бал >= 4.5.
     */
    getHonorsStudents(faculty: Faculty): Student[] {
        return this.students.filter(student => {
            if (student.faculty !== faculty) return false;

            const grades = this.getStudentGrades(student.id);
            if (grades.length === 0) return false;

            const average = this.calculateAverageGrade(student.id);
            return Math.round(average) === GradeValue.Excellent;
        });
    }
}

// Demo
const ums = new UniversityManagementSystem();

const student1 = ums.enrollStudent({
    fullName: "Andrew",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date("2022-09-01"),
    groupNumber: "CS101"
});

const student2 = ums.enrollStudent({
    fullName: "Max",
    faculty: Faculty.Engineering,
    year: 2,
    status: StudentStatus.Active,
    enrollmentDate: new Date("2021-09-01"),
    groupNumber: "ENG201"
});

const course1: Course = {
    id: 1,
    name: "Introduction to Programming",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 30
};

const course2: Course = {
    id: 2,
    name: "Advanced Engineering Mathematics",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.Second,
    faculty: Faculty.Engineering,
    maxStudents: 25
};

ums["courses"].push(course1, course2);

ums.registerForCourse(student1.id, course1.id);
ums.registerForCourse(student2.id, course2.id);

ums.setGrade(student1.id, course1.id, GradeValue.Excellent);
ums.setGrade(student2.id, course2.id, GradeValue.Good);

ums.updateStudentStatus(student1.id, StudentStatus.Academic_Leave);

console.log("Students in Computer Science:", ums.getStudentsByFaculty(Faculty.Computer_Science));

console.log("Grades for Andrew:", ums.getStudentGrades(student1.id));

console.log("Available courses at Engineering faculty at second semester", ums.getAvailableCourses(Faculty.Engineering, Semester.Second))

console.log("Average grade for Max:", ums.calculateAverageGrade(student2.id));

console.log("Honors students in Computer Science:", ums.getHonorsStudents(Faculty.Computer_Science));