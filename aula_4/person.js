function Person(firstName, lastName){
    this.firstName = firstName,
    this.lastName = lastName
}
Person.prototype.greet = function(){
    console.log("Hello " + this.firstName + " " + this.lastName + "! Idade: " + this.age);
    Person.prototype.age = undefined;
}

var josue = new Person("Josue", "Ferreira");
josue.age = 19;
josue.greet();

var josefina = new Person("Josefina", "Couves");
josefina.age = 69;
josefina.greet();

console.log(josue.__proto__);
console.log(josefina.__proto__);
console.log(__proto__);
console.log(josue.__proto__==josefina.__proto__)