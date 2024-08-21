# Features
These features make TypeScript classes more powerful and expressive compared to standard JavaScript classes.
We'll see them one by one.
### 1. Type Annotations
- Type Safety: TypeScript allows you to specify types for properties and methods, catching errors at compile time.
```
class Person {
	name: string; // Type annotation for the property
	age: number;

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}

	greet(): void {
		console.log(`Hello, my name is ${this.name}`);
	}
}
```
	
### 2. Access Modifiers
- Encapsulation: TypeScript provides public, private, and protected access modifiers to control the visibility of class members.
```
class Car {
  public brand: string;
  private speed: number = 0; // Private property

  constructor(brand: string) {
    this.brand = brand;
  }

  public accelerate(amount: number): void {
    this.speed += amount;
  }

  private brake(): void { // Private method
    this.speed = 0;
  }
}
```

### 3. Abstract Classes
- Abstract Classes: TypeScript supports abstract classes which cannot be instantiated and can define abstract methods that must be implemented by derived classes.
```
abstract class Animal {
  abstract makeSound(): void; // Abstract method

  move(): void {
    console.log('Moving...');
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log('Bark');
  }
}
```

### 4. Interfaces and Implements
- Interfaces: TypeScript allows classes to implement interfaces, ensuring they adhere to a specific contract.
```
interface Flyable {
  fly(): void;
}

class Bird implements Flyable {
  fly(): void {
    console.log('Flying...');
  }
}
```

### 5. Generics
- Generics: TypeScript supports generics, enabling classes to work with different data types while maintaining type safety.
```
class Box<T> {
  private contents: T;

  constructor(contents: T) {
    this.contents = contents;
  }

  getContents(): T {
    return this.contents;
  }
}

const stringBox = new Box<string>('Hello');
```