import { describe, it, expect, vi } from 'vitest'
import { PaymentAdapter, AppFacade, Box, Item, Notifier, EmailNotifier, LoggingNotifier, CacheProxy, FlyweightFactory } from '../../examples/patterns/structural'

describe('Structural patterns', () => {
  it('Adapter converts amount to cents', () => {
    const adapter = new PaymentAdapter()
    expect(adapter.pay(12.34)).toBe('paid 1234c')
  })

  it('Facade.register returns token', async () => {
    const app = new AppFacade()
    const token = await app.register('u','p')
    expect(token).toBe('token:u')
  })

  it('Composite computes total price', () => {
    const box = new Box('root')
    box.add(new Item('pen',1.2))
    const inner = new Box('inner')
    inner.add(new Item('book',12))
    box.add(inner)
    expect(box.getPrice()).toBeCloseTo(13.2)
  })

  it('Decorator calls inner send', async () => {
    const mock = { send: vi.fn(async (m:string) => undefined) } as unknown as Notifier
    const decorated = new LoggingNotifier(mock)
    await decorated.send('hey')
    expect(mock.send).toHaveBeenCalledWith('hey')
  })

  it('Proxy caches results', async () => {
    const proxy = new CacheProxy()
    const first = await proxy.fetch(1)
    const second = await proxy.fetch(1)
    expect(first).toEqual(second)
  })

  it('Flyweight returns same instance for same key', () => {
    const f = new FlyweightFactory()
    expect(f.get('a')).toBe(f.get('a'))
  })
})