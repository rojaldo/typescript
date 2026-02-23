// examples/patterns/creational.ts
// Creacionales: Factory Method, Abstract Factory, Builder, Prototype, Singleton

// Factory Method
interface Parser { parse(input: string): any }
class JsonParser implements Parser { parse(input: string){ return JSON.parse(input) } }
class CsvParser implements Parser { parse(input: string){ return input.split(/\n/).map(r => r.split(',')) } }
abstract class ParserFactory { abstract createParser(type: string): Parser; parse(type: string, input: string) { return this.createParser(type).parse(input) } }
class ConcreteParserFactory extends ParserFactory { createParser(type: string){ if (type==='json') return new JsonParser(); if (type==='csv') return new CsvParser(); throw new Error('unknown') } }

// Abstract Factory
interface Button { render(): string }
interface Checkbox { render(): string }
interface UIFactory { createButton(): Button; createCheckbox(): Checkbox }
class MacButton implements Button { render(){ return '<MacButton/>' } }
class MacCheckbox implements Checkbox { render(){ return '<MacCheckbox/>' } }
class MacFactory implements UIFactory { createButton(){ return new MacButton() } createCheckbox(){ return new MacCheckbox() } }
class WinButton implements Button { render(){ return '<WinButton/>' } }
class WinCheckbox implements Checkbox { render(){ return '<WinCheckbox/>' } }
class WinFactory implements UIFactory { createButton(){ return new WinButton() } createCheckbox(){ return new WinCheckbox() } }

// Builder
class Pizza { dough=''; sauce=''; toppings: string[] = [] }
class PizzaBuilder { private pizza = new Pizza(); setDough(d:string){ this.pizza.dough = d; return this } setSauce(s:string){ this.pizza.sauce = s; return this } addTopping(t:string){ this.pizza.toppings.push(t); return this } build(){ const p = this.pizza; this.pizza = new Pizza(); return p } }

// Prototype
class Shape { constructor(public x:number, public y:number, public color:string){} clone(){ return new Shape(this.x, this.y, this.color) } }

// Singleton
class Logger { private static _instance: Logger | null = null; private constructor(private prefix='[app]'){} static get instance(){ if (!this._instance) this._instance = new Logger(); return this._instance } log(msg:string){ console.log(`${this.prefix} ${msg}`) } }

// Demo usage
if (typeof require !== 'undefined' && require.main === module) {
  const factory = new ConcreteParserFactory(); console.log(factory.parse('json','{"a":1}'))
  const ui1 = new MacFactory(); console.log(ui1.createButton().render())
  const pizza = new PizzaBuilder().setDough('thin').setSauce('tomato').addTopping('mozzarella').build(); console.log(pizza)
  const s1 = new Shape(1,2,'blue'); const s2 = s1.clone(); console.log(s1, s2)
  Logger.instance.log('singleton test')
}

export { ConcreteParserFactory, PizzaBuilder, Pizza, Shape, Logger };
