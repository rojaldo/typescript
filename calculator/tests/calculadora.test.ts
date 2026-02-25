import "mocha";
import { expect } from "chai";

// Funciones a probar
function sumar(a: number, b: number): number {
  return a + b;
}

function restar(a: number, b: number): number {
  return a - b;
}

// Suite de tests
describe("Calculadora", () => {
  describe("Suma", () => {
    it("debería sumar dos números positivos", () => {
      const resultado = sumar(5, 3);
      expect(resultado).to.equal(8);
      expect(resultado).to.be.a("number");
      expect(resultado).to.be.greaterThan(0);
    });

    it("debería sumar números negativos", () => {
      const resultado = sumar(-5, -3);
      expect(resultado).to.equal(-8);
      expect(resultado).to.be.a("number");
      expect(resultado).to.be.lessThan(0);
    });

    it("debería sumar positivo con negativo", () => {
      const resultado = sumar(5, -3);
      expect(resultado).to.equal(2);
      expect(resultado).to.be.a("number");
    });
  });

  describe("Resta", () => {
    it("debería restar dos números", () => {
      const resultado = restar(5, 3);
      expect(resultado).to.equal(2);
    });

    it("debería manejar restas negativas", () => {
      const resultado = restar(3, 5);
      expect(resultado).to.equal(-2);
    });
  });
});