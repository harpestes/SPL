function sum(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function isEven(num) {
    return num % 2 === 0;
}

function isOdd(num) {
    return !isEven(num);
}

function greet(name) {
    return `Hello, ${name}!`;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = numbers.filter(isEven);
const odds = numbers.filter(isOdd);
const doubled = numbers.map(n => multiply(n, 2));

console.log(evens);
console.log(odds);
console.log(doubled);

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    greet() {
        console.log(greet(this.firstName));
    }
};

person.greet();

function updateAge(p, newAge) {
    p.age = newAge;
}

updateAge(person, 31);
console.log(person);

class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    speak() {
        console.log(`${this.name} makes a sound.`);
    }

    getAge() {
        return this.age;
    }

    setAge(age) {
        this.age = age;
    }
}

class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks.`);
    }
}

const dog = new Dog("Buddy", 3);
dog.speak();
dog.setAge(4);
console.log(dog.getAge());

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncOperation() {
    console.log("Starting async operation...");

    await delay(100);

    console.log("Async operation finished.");
}

asyncOperation();

const items = [
    { id: 1, name: "item1", price: 100 },
    { id: 2, name: "item2", price: 200 },
    { id: 3, name: "item3", price: 300 },
];

const totalCost = items.reduce((total, item) => total + item.price, 0);
console.log(`Total cost: ${totalCost}`);

const itemNames = items.map(item => item.name);
console.log(itemNames);

function add(x) {
    return function(y) {
        return x + y;
    };
}

const add5 = add(5);
console.log(add5(10)); // 15

function processArray(arr, fn) {
    return arr.map(fn);
}

const squaredNumbers = processArray(numbers, n => n * n);
console.log(squaredNumbers);

function factorial(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

console.log(factorial(5));

const { firstName, lastName } = person;
console.log(`First Name: ${firstName}, Last Name: ${lastName}`);

const extendedPerson = { ...person, location: "Earth" };
console.log(extendedPerson);

function printAll(...args) {
    args.forEach(arg => console.log(arg));
}

printAll(1, 2, 3, 4, 5);

function greetUser(name = "Guest") {
    console.log(`Hello, ${name}`);
}

greetUser();
greetUser("Alice");

const templateLiteralExample = `Sum of 2 and 3 is ${sum(2, 3)}`;
console.log(templateLiteralExample);

const [first, second, ...rest] = numbers;
console.log(first);
console.log(second);
console.log(rest);

const isAdult = person.age > 18 || "Not an adult";
console.log(isAdult);

const user = null;
const defaultUser = user ?? "Anonymous";
console.log(defaultUser);

const accessLevel = person.age > 18 ? "Adult" : "Child";
console.log(accessLevel);

function getDay(day) {
    switch(day) {
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        default: return "Invalid day";
    }
}

console.log(getDay(1));

for (let i = 0; i < 5; i++) {
    console.log(i);
}

let count = 0;
while (count < 5) {
    console.log(count);
    count++;
}

let num = 0;
do {
    console.log(num);
    num++;
} while (num < 5);

const addArrow = (a, b) => a + b;
console.log(addArrow(3, 4));

const jsonData = JSON.stringify(person);
console.log(jsonData);

const parsedData = JSON.parse(jsonData);
console.log(parsedData);