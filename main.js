"use strict";
let professors = [];
let courses = [];
let schedule = [];
let classrooms = [];
class ItemAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
    }
}
class ItemDoesNotExistError extends Error {
    constructor(message) {
        super(message);
    }
}
class ConflictOccuredError extends Error {
    constructor(message) {
        super(message);
    }
}
function addProfessor(professor) {
    const existingProfessor = professors.find(p => p.id === professor.id);
    if (existingProfessor) {
        throw new ItemAlreadyExistsError(`Professor with ID ${existingProfessor.id} already exists: ${existingProfessor.name}, ${existingProfessor.department}`);
    }
    professors.push(professor);
}
function addLesson(lesson) {
    const conflict = validateLesson(lesson);
    if (conflict) {
        throw new ConflictOccuredError(`Cannot add lesson: ${conflict.type} for lesson on ${conflict.lessonDetails.dayOfWeek} at ${conflict.lessonDetails.timeSlot}`);
    }
    schedule.push(lesson);
    return true;
}
function addCourse(course) {
    const existingCourse = courses.find(c => c.id === course.id);
    if (existingCourse) {
        throw new ItemAlreadyExistsError(`Course with ID ${existingCourse.id} already exists`);
    }
    courses.push(course);
}
function addClassroom(classroom) {
    const existingClassroom = classrooms.find(c => c.number === classroom.number);
    if (existingClassroom) {
        throw new ItemAlreadyExistsError(`Course with number ${existingClassroom.number} already exists`);
    }
    classrooms.push(classroom);
}
function findAvailableClassrooms(timeSlot, dayOfWeek) {
    const occupiedClassrooms = schedule
        .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
        .map(lesson => lesson.classroomNumber);
    return classrooms
        .filter(classroom => !occupiedClassrooms.some(occupiedClassroom => occupiedClassroom === classroom.number))
        .map(classroom => classroom.number);
}
function getProfessorSchedule(professorId) {
    return schedule.filter(lesson => lesson.professorId === professorId);
}
function validateLesson(lesson) {
    const existingClassroom = classrooms.find(classroom => classroom.number === lesson.classroomNumber);
    if (!existingClassroom) {
        throw new ItemDoesNotExistError(`Cannot add lesson (classroom ${lesson.classroomNumber} does not exist).`);
    }
    const existingCourse = courses.find(course => course.id === lesson.courseId);
    if (!existingCourse) {
        throw new ItemDoesNotExistError(`Cannot add lesson (course with ID ${lesson.courseId} does not exist).`);
    }
    const existingProfessor = professors.find(professor => professor.id === lesson.professorId);
    if (!existingProfessor) {
        return { type: "ProfessorConflict", lessonDetails: lesson };
    }
    const classroomConflict = schedule.find(existingLesson => existingLesson === lesson);
    if (classroomConflict) {
        return { type: "ClassroomConflict", lessonDetails: classroomConflict };
    }
    const professorConflict = schedule.find(existingLesson => existingLesson === lesson);
    if (professorConflict) {
        return { type: "ProfessorConflict", lessonDetails: professorConflict };
    }
    return null;
}
function getClassroomUtilization(classroomNumber) {
    // We have 5 timeSlots according to our alias type TimeSlot and 5 work days according to our alias type DayOfWeek
    const timeSlots = 5;
    const days = 5;
    const totalSlots = days * timeSlots;
    const existingClassroom = schedule.find(lesson => lesson.classroomNumber === classroomNumber);
    if (!existingClassroom) {
        throw new ItemDoesNotExistError(`Classroom ${classroomNumber} does not exist.`);
    }
    const occupiedSlots = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;
    //Calculating percentage of classroom usage based on number of lessons in this classroom during the week
    return (occupiedSlots / totalSlots) * 100;
}
function getMostPopularCourseType() {
    const typeCounts = {
        Lecture: 0,
        Seminar: 0,
        Lab: 0,
        Practice: 0
    };
    //Calculating count of each type of lesson
    schedule.forEach(lesson => {
        const course = courses.find(c => c.id === lesson.courseId);
        if (course) {
            typeCounts[course.type]++;
        }
    });
    let mostPopularType = "Lecture";
    let maxCount = typeCounts.Lecture;
    if (typeCounts.Seminar > maxCount) {
        mostPopularType = "Seminar";
        maxCount = typeCounts.Seminar;
    }
    else if (typeCounts.Lab > maxCount) {
        mostPopularType = "Lab";
        maxCount = typeCounts.Lab;
    }
    else if (typeCounts.Practice > maxCount) {
        mostPopularType = "Practice";
    }
    return mostPopularType;
}
function reassignClassroom(lessonId, newClassroomNumber) {
    const lesson = schedule.find(l => l.id === lessonId);
    if (!lesson) {
        throw new ItemDoesNotExistError(`Lesson with id ${lessonId} not found`);
    }
    const classroom = classrooms.find(c => c.number === newClassroomNumber);
    if (!classroom) {
        throw new ItemDoesNotExistError(`Classroom with number ${newClassroomNumber} not found`);
    }
    lesson.classroomNumber = newClassroomNumber;
    return true;
}
function cancelLesson(lessonId) {
    const lessonIndex = schedule.findIndex(l => l.id === lessonId);
    if (lessonIndex !== -1) {
        schedule.splice(lessonIndex, 1);
    }
    else {
        throw new ItemDoesNotExistError(`Lesson with id ${lessonId} not found`);
    }
}
