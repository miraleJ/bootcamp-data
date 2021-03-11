'use strict';

class Person {
    constructor(_id, _firstName, _lastName, _age = 0, _city = "", _gender = undefined, _hobby = "") {
        this.id = _id;
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.age = _age;
        this.city = _city;
        this.gender = _gender;
        this.hobby = _hobby;
    }
}