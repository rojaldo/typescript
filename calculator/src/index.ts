import { log } from "node:console";

// fetch("https://api.chucknorris.io/jokes/rando")
// .then((response) => response.json().then((data) => log(data))
// )
// .catch((error) => log(error));

// convert fetch to observable using rxjs from function
import { from, Observable, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
export const observer = {
    next: (data: unknown) => log('Data: ' + JSON.stringify(data)),
    error: (error: unknown) => log('Error: ' + error)
};
export const myObservable = fromFetch("https://api.chucknorris.io/jokes/random").pipe(
    // switchMap to convert the response to json
    switchMap((response) => from(response.json()))
);

myObservable.subscribe(observer);