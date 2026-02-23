// examples/patterns/async.ts
// Asíncronos: EventBus, Retry, Circuit Breaker, WorkerPool, Throttle/Debounce, Saga, Idempotency

// Async EventBus
type AsyncHandler = (...args:any[])=>Promise<void>|void
class AsyncEventBus { private subs = new Map<string, AsyncHandler[]>(); on(evt:string,h:AsyncHandler){ const a = this.subs.get(evt) ?? []; a.push(h); this.subs.set(evt,a); return ()=>this.off(evt,h) } off(evt:string,h:AsyncHandler){ const arr = this.subs.get(evt) ?? []; this.subs.set(evt, arr.filter(x=>x!==h)) } async emit(evt:string,...args:any[]){ const list = this.subs.get(evt) ?? []; await Promise.all(list.map(h=>Promise.resolve(h(...args)))) } }

// Retry
async function retry<T>(fn: ()=>Promise<T>, retries = 3, delay = 100){ try { return await fn() } catch (err) { if (retries <= 0) throw err; await new Promise(r=>setTimeout(r,delay)); return retry(fn, retries-1, delay*2) } }

// Circuit Breaker
type Fn<T> = ()=>Promise<T>
class CircuitBreaker { private failures = 0; private state:'CLOSED'|'OPEN'|'HALF' = 'CLOSED'; private nextAttempt = 0; constructor(private threshold = 3, private timeout = 1000){} async exec<T>(fn: Fn<T>){ if (this.state === 'OPEN' && Date.now() < this.nextAttempt) throw new Error('circuit open'); try { const res = await fn(); this.success(); return res } catch (err) { this.fail(); throw err } } private success(){ this.failures = 0; this.state = 'CLOSED' } private fail(){ this.failures++; if (this.failures >= this.threshold){ this.state = 'OPEN'; this.nextAttempt = Date.now() + this.timeout } } }

// WorkerPool
class WorkerPool { private active = 0; private queue: (()=>void)[] = []; constructor(private concurrency = 2){} run<T>(job: ()=>Promise<T>): Promise<T>{ return new Promise((resolve,reject)=>{ const runJob = () => { this.active++; job().then(r=>{ resolve(r); this.finish(); }).catch(err=>{ reject(err); this.finish(); }) } if (this.active < this.concurrency) runJob(); else this.queue.push(runJob) }) } private finish(){ this.active--; const next = this.queue.shift(); if (next) next() } }

// Debounce / Throttle
function debounce<T extends (...args:any[])=>any>(fn:T, wait=100){ let t:any; return (...args:any[])=>{ clearTimeout(t); t = setTimeout(()=>fn(...args), wait) } }
function throttle<T extends (...args:any[])=>any>(fn:T, limit=100){ let last = 0; return (...args:any[])=>{ const now = Date.now(); if (now - last >= limit){ last = now; fn(...args) } } }

// Saga (simplificado)
type Step = { action: ()=>Promise<any>, compensate?: (res:any)=>Promise<void> }
async function runSaga(steps: Step[]){ const results: any[] = []; for (const s of steps){ try { const r = await s.action(); results.push(r) } catch (err) { for (let i = results.length-1; i>=0; i--){ const comp = steps[i].compensate; if (comp) await comp(results[i]) } throw err } } return results }

// Idempotency wrapper
function idempotent<K,T>(fn:(k:K)=>Promise<T>){ const cache = new Map<K, Promise<T>>(); return (k:K)=>{ if (!cache.has(k)) cache.set(k, fn(k)); return cache.get(k)! } }

// Demo
if (typeof require !== 'undefined' && require.main === module) {
  (async ()=>{
    const bus = new AsyncEventBus(); bus.on('job', async (i)=>{ await new Promise(r=>setTimeout(r,20)); console.log('job', i) }); await bus.emit('job', 1)
    let tries = 0; const f = async ()=>{ tries++; if (tries < 2) throw new Error('err'); return 'ok' }
    console.log(await retry(f, 3, 50))
    const cb = new CircuitBreaker(2, 200); try{ await cb.exec(async ()=>{ throw new Error('boom') }) } catch(e){ console.log('cb failed') }
    const pool = new WorkerPool(2); await Promise.all([1,2,3].map(i=>pool.run(()=>new Promise(r=>setTimeout(()=>{ console.log('done',i); r(i) }, 50)))))
    const d = debounce((x:number)=>console.log('deb', x), 50); d(1); d(2); d(3)
    try { await runSaga([{ action: async ()=>{ console.log('s1'); return 1 }, compensate: async ()=>console.log('c1') }, { action: async ()=>{ console.log('s2'); throw new Error('fail') }, compensate: async ()=>console.log('c2') }]) } catch(e){ console.log('saga rolled back') }
    const srv = async (id:number)=>{ await new Promise(r=>setTimeout(r,10)); return { id } }
    const idemp = idempotent(srv); console.log(await Promise.all([idemp(1), idemp(1)]))
  })()
}

export { AsyncEventBus, retry, CircuitBreaker, WorkerPool, debounce, throttle, runSaga, idempotent };
