import { describe, it, expect } from 'vitest'
import { ConcreteParserFactory, PizzaBuilder, Shape, Logger } from '../../examples/patterns/creational'

describe('Creational patterns', () => {
  it('FactoryMethod parses json and csv', () => {
    const factory = new ConcreteParserFactory()
    expect(factory.parse('json','{"a":1}')).toEqual({ a: 1 })
    expect(factory.parse('csv','a,b\n1,2')).toEqual([['a','b'],['1','2']])
  })

  it('Builder constructs pizza', () => {
    const p = new PizzaBuilder().setDough('thin').setSauce('tomato').addTopping('cheese').build()
    expect(p.toppings).toContain('cheese')
    expect(p.dough).toBe('thin')
  })

  it('Prototype clone creates separate instance', () => {
    const s1 = new Shape(1,2,'red')
    const s2 = s1.clone()
    s2.x = 99
    expect(s1.x).toBe(1)
    expect(s2.x).toBe(99)
    expect(s1).not.toBe(s2)
  })

  it('Singleton returns same instance', () => {
    const a = Logger.instance
    const b = Logger.instance
    expect(a).toBe(b)
  })
})