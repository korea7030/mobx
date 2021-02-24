import { observable, when } from "mobx";

const demoSchool = {
  "id": 1,
  "name": "Udemy",
  "courses": [
    {
      "id": 1,
      "name": "MobX And React",
      "students": [
        {
          "id": 1,
          "name": "JaeHyun Lee",
        }
      ]
    }
  ]
}

const badPractice = observable(demoSchool);

console.log(badPractice);

// Good Practice - object들을 핸들링 할 수 있게 class 형태로 data class 생성
class Student {
    id: number;
    @observable
    name: string;

    constructor(student: Student) {
        this.id = student.id;
        this.name = student.name;

        when(
            () => this.name !== null,
            () => console.log(this.name, 'Easy To log Each Student Name')
        );
    }
}


class School {
    id: number;
    @observable
    name: string;
    @observable
    courses: Course[];

    constructor(school: School) {
        this.id = school.id;
        this.name = school.name;

        this.courses = school.courses.map(course => new Course(course));
    }
}

class Course {
    id: number;
    @observable
    name: string;
    @observable
    students: Student[];

    constructor(course: Course) {
        this.id = course.id;
        this.name = course.name;

        this.students = course.students.map(student => new Student(student));
    }
}


const goodPractice = new School(demoSchool);

console.log(goodPractice, 'We Have Control Of All The objects');