import {observer, myObservable} from "../src/index";
// import mocha and chai for testing
import { describe, it } from "mocha";
import { expect } from "chai";

describe('Observable Test', () => {
    let myObserver: any;

    beforeEach(() => {
        myObservable.subscribe(observer);
        myObserver = observer;
    });

    afterEach(() => {
        myObserver.next = () => {};
        myObserver.error = () => {};
    });

    it('should fetch a random joke from the API', (done) => {
        myObserver.next = (data: any) => {
            try {
                expect(data).to.have.property('value');
                expect(data.value).to.be.a('string');
                done();
            } catch (error) {                done(error);
        
        };
        myObserver.error = (error: any) => {
            done(error);
        };
  }});


      it('value is not an empty string when status is 200', (done) => {
        myObserver.next = (data: any) => {
            try {
              // check 200 status code
                expect(data).to.have.property('value');
                expect(data.value).to.be.a('string').that.is.not.empty;
                done();
            } catch (error) {
                done(error);
            }
        };
        myObserver.error = (error: any) => {
            done(error);
        };
      });
});