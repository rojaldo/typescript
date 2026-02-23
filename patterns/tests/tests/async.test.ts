import { describe, it, expect, vi } from 'vitest'
import { AsyncEventBus, retry, CircuitBreaker, WorkerPool, runSaga, idempotent } from '../../examples/patterns/async'

describe('Async patterns', () => {
  it('AsyncEventBus calls handlers', async () => {
    const bus = new AsyncEventBus()
    const handler = vi.fn(async (x:number)=>x)
    bus.on('job', handler)
    await bus.emit('job', 1)
    expect(handler).toHaveBeenCalledWith(1)
  })

  it('retry succeeds after transient failures', async () => {
    let attempts = 0
    const fn = async () => { attempts++; if (attempts < 2) throw new Error('fail'); return 'ok' }
    const res = await retry(fn, 3, 10)
    expect(res).toBe('ok')
    expect(attempts).toBe(2)
  })

  it('CircuitBreaker opens after threshold', async () => {
    const cb = new CircuitBreaker(2, 1000)
    const bad = async () => { throw new Error('boom') }
    await expect(cb.exec(bad)).rejects.toThrow()
    await expect(cb.exec(bad)).rejects.toThrow()
    await expect(cb.exec(bad)).rejects.toThrow('circuit open')
  })

  it('WorkerPool runs jobs and returns results', async () => {
    const pool = new WorkerPool(2)
    const results = await Promise.all([1,2,3].map(i=>pool.run(()=>new Promise(r=>setTimeout(()=>r(i), 10)))))
    expect(results).toEqual([1,2,3])
  })

  it('runSaga compensates on failure', async () => {
    let compensated = false
    const steps = [
      { action: async ()=>1, compensate: async ()=>{ compensated = true } },
      { action: async ()=>{ throw new Error('fail') }, compensate: async ()=>{ /* noop */ } }
    ]
    await expect(runSaga(steps)).rejects.toThrow()
    expect(compensated).toBe(true)
  })

  it('idempotent caches concurrent calls', async () => {
    let calls = 0
    const svc = async (id:number)=>{ calls++; await new Promise(r=>setTimeout(r,5)); return id }
    const idemp = idempotent(svc)
    const [a,b] = await Promise.all([idemp(1), idemp(1)])
    expect(a).toEqual(b)
    expect(calls).toBe(1)
  })
})