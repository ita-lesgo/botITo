export enum Level {
  itinha = 1,
  senpai,
}

export enum Gender {
  male,
  female,
}

export interface Teacher {
  name: string;
  gender: Gender;
}

export interface Lesson {
  name: string;
  teacher: Teacher;
}
