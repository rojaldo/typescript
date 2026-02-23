class CarComposite {
    private components: CarComponent[] = [];

    addComponent(component: CarComponent): void {
        this.components.push(component);
    }

    removeComponent(component: CarComponent): void {
        const index = this.components.indexOf(component);
        if (index !== -1) {
            this.components.splice(index, 1);
        }
    }

    display(): void {
        console.log("Car Composite:");
        this.components.forEach(component => component.display());
    }
}

interface CarComponent {
    display(): void;
}

class CombustionEngine implements CarComponent {
    display(): void {
        console.log("Engine");
    }
}

class ElectricEngine implements CarComponent {
    display(): void {
        console.log("Electric Engine");
    }
}

class Battery implements CarComponent {
    display(): void {
        console.log("Battery");
    }
}

class Gearbox implements CarComponent {
    display(): void {
        console.log("Gearbox");
    }
}

class Wheel implements CarComponent {
    display(): void {
        console.log("Wheel");
    }
}

// Example usage
const car = new CarComposite();
car.addComponent(new ElectricEngine());
car.addComponent(new Battery());
car.addComponent(new Wheel());
car.addComponent(new Wheel());
car.addComponent(new Wheel());
car.addComponent(new Wheel());