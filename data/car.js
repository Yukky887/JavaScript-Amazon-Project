class Car {
    brand;
    model;
    speed;
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }  

    displayInfo() {
        console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h`)
    }

    go() {
        if (this.speed <= 0 || this.speed >= 200) return

        this.speed += 5;
    }

    break() {
        if (this.speed <= 0) return
        
        this.speed -= 5;
    }
}



const car = new Car("Bmw", 'e34')
const car2 = new Car("Toyota", "Corolla")
car.go();
car.go();
car.go();
car.go();
car.go();
car.go();
car.go();
car.go();
car.displayInfo();
