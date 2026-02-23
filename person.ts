export enum PersonTypes {
    Student,
    Teacher,
    Admin
}

export abstract class Person {

    constructor(public name: string, public age: number, public type: PersonTypes) {}
}

export class MyPerson extends Person {

    constructor(public name: string, public age: number, public type: PersonTypes) {
        super(name, age, type);
    }
}

export const myFunction = (): Person => {
    return new MyPerson("John Doe", 20, PersonTypes.Student);
}

export const result = myFunction();


export class Node<T> {
    constructor(public value: T, public next?: Node<any>) {}
}

export default {
    Person,
    PersonTypes,
    MyPerson,
    myFunction,
    result,
    Node
}