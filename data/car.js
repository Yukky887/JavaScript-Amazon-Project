class Car {
    brand;
    model;
    speed;
    isTrunkOpen;
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
        this.speed = 0;
        this.isTrunkOpen = false;
    }  
    
    openTrunk() {
        if (this.isTrunkOpen || this.speed > 0) return
       
        this.isTrunkOpen = true;
    }
    
    closeTrunk() {
        if (!this.isTrunkOpen || this.speed > 0) return
        
        this.isTrunkOpen = false;
    }

    go() {
        if (this.speed < 0 || this.speed >= 200 || this.isTrunkOpen) return
        
        this.speed += 5;
    }
    
    break() {
        if (this.speed <= 0) return
        
        this.speed -= 5;
    }
    
    displayInfo() {
        console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h, Trunk is ${this.isTrunkOpen ? 'open' : 'closed'}`);
    }
}

class SportCar extends Car {

    constructor(brand, model) {
        super(brand, model);
    }

    go() {
        if (this.speed < 0 || this.speed >= 300) return

        this.speed += 20;
    }
}



const car = new Car("Bmw", 'e34')
const sportCar = new SportCar("Porsche", "911-GT3")
car.openTrunk();
car.displayInfo();

sportCar.go();
sportCar.go();
sportCar.go();
sportCar.go();
sportCar.go();
sportCar.go();
sportCar.go();
sportCar.go();
sportCar.go();
sportCar.go();
sportCar.go();
sportCar.go();
sportCar.go();
sportCar.go();
sportCar.go();
sportCar.go();

sportCar.displayInfo();