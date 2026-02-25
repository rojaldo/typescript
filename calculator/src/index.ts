// ejemplo de promise

import { log } from "node:console";

const myPromise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true; // Cambia esto a false para simular un error
        if (success) {
            resolve("¡La operación fue exitosa!");
        } else {
            reject("Ocurrió un error.");
        }
    }, 2000);
});

// myPromise
//     .then((message) => {
//         console.log(message);
//     })
//     .catch((error) => {
//         console.error(error);
//     });


// async/await

async function asyncFunction(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("¡La operación asíncrona fue exitosa!");
        }, 2000);
    });
}

async function main() {
    try {
        const result = await asyncFunction();
        console.log('hola');
        console.log(result);
    } catch (error) {
        console.error("Ocurrió un error:", error);
    }
}

// main();

// ejemplo de rxjs

import { Observable, Observer } from 'rxjs';

var observable = new Observable( (subscriber) => {
        subscriber.next("My First Observable")
        subscriber.next("Another value")
        subscriber.complete()
   }
);

let myObserver: Observer<any> = {
    next: (val) => { console.log(val) },
    error: (err) => { console.log(err) },
    complete: () => { console.log("complete") }
}
observable.subscribe(myObserver);


import { of } from 'rxjs';
import { map, reduce, filter } from 'rxjs/operators';

let test1 = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
let case1 = test1.pipe(
   filter(x => x % 2 === 0),
   reduce((acc, item) => acc + item, 0)
)

case1.subscribe(x => console.log(x));
