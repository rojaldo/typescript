import { describe, it, expect, vi } from 'vitest'
import { Calculator, Add, Mul, EventBus, Store, AddCommand, Invoker, Range, Lamp, OffState, CsvProcessor, Editor } from '../../examples/patterns/behavioral'

describe('Behavioral patterns', () => {
  it('Strategy add and mul', () => {
    const calc = new Calculator(new Add())
    expect(calc.run(2,3)).toBe(5)
    calc.setStrategy(new Mul())
    expect(calc.run(2,3)).toBe(6)
  })

  it('EventBus triggers handlers and off works', () => {
    const bus = new EventBus()
    const handler = vi.fn()
    const off = bus.on('x', handler)
    bus.emit('x', 1)
    expect(handler).toHaveBeenCalledWith(1)
    off()
    bus.emit('x', 2)
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('Command supports undo', () => {
    const s = new Store()
    const inv = new Invoker()
    inv.execute(new AddCommand(s,'a'))
    inv.execute(new AddCommand(s,'b'))
    expect(s.list()).toEqual(['a','b'])
    inv.undo()
    expect(s.list()).toEqual(['a'])
  })

  it('Iterator Range produces sequence', () => {
    expect([...new Range(1,3)]).toEqual([1,2,3])
  })

  it('State transitions do not throw', () => {
    const lamp = new Lamp(new OffState(undefined as any))
    lamp.setState(new OffState(lamp))
    lamp.press()
    lamp.press()
    expect(true).toBeTruthy()
  })

  it('Template Method processes without error', () => {
    new CsvProcessor().process()
    expect(true).toBeTruthy()
  })

  it('Memento saves and restores state', () => {
    const e = new Editor(); e.write('hello'); const m = e.save(); e.write(' world'); expect(e.read()).toBe('hello world'); e.restore(m); expect(e.read()).toBe('hello')
  })
})