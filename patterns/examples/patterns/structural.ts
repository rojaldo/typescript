// examples/patterns/structural.ts
// Estructurales: Adapter, Facade, Bridge, Composite, Decorator, Proxy, Flyweight

// Adapter
class OldPaymentService { payInCents(cents:number){ return `paid ${cents}c` } }
interface NewPaymentClient { pay(amount:number): string }
class PaymentAdapter implements NewPaymentClient { constructor(private adaptee = new OldPaymentService()){} pay(amount:number){ return this.adaptee.payInCents(Math.round(amount*100)) } }

// Facade
class Auth { signIn(u:string,p:string){ return `token:${u}` } }
class DB { save(k:string,v:any){ return `saved:${k}` } }
class LoggerSvc { info(m:string){ console.log('LOG',m) } }
class AppFacade { constructor(private auth=new Auth(), private db=new DB(), private log=new LoggerSvc()){} async register(username:string,password:string){ const token = this.auth.signIn(username,password); this.db.save('user',{username}); this.log.info('registered'); return token } }

// Bridge
interface Device { isOn(): boolean; turnOn(): void; turnOff(): void }
class Tv implements Device { private on = false; isOn(){ return this.on } turnOn(){ this.on = true } turnOff(){ this.on = false } }
class RemoteControl { constructor(protected device: Device){} toggle(){ if (this.device.isOn()) this.device.turnOff(); else this.device.turnOn() } }

// Composite
interface Component { getPrice(): number; print(indent?:string): void }
class Item implements Component { constructor(private name:string, private price:number){} getPrice(){ return this.price } print(i=''){ console.log(i+this.name, this.price) } }
class Box implements Component { private children: Component[] = []; constructor(private name:string){} add(c: Component){ this.children.push(c) } getPrice(){ return this.children.reduce((s,c)=>s+c.getPrice(),0) } print(i=''){ console.log(i+this.name); this.children.forEach(c=>c.print(i+'  ')) } }

// Decorator
interface Notifier { send(msg:string): Promise<void> }
class EmailNotifier implements Notifier { async send(m:string){ console.log('email:',m) } }
class NotifierDecorator implements Notifier { constructor(protected inner: Notifier){} async send(m:string){ await this.inner.send(m) } }
class LoggingNotifier extends NotifierDecorator { async send(m:string){ console.log('before'); await super.send(m); console.log('after') } }

// Proxy
class RemoteService { async fetch(id:number){ console.log('fetch remote', id); return { id, value: Math.random() } } }
class CacheProxy { private cache = new Map<number, any>(); constructor(private svc = new RemoteService()){} async fetch(id:number){ if (this.cache.has(id)) return this.cache.get(id); const v = await this.svc.fetch(id); this.cache.set(id, v); return v } }

// Flyweight
class CharFlyweight { constructor(public char:string){} render(fontSize:number, color:string){ return `${this.char}@${fontSize}/${color}` } }
class FlyweightFactory { private pool = new Map<string, CharFlyweight>(); get(char:string){ if (!this.pool.has(char)) this.pool.set(char, new CharFlyweight(char)); return this.pool.get(char)! } }

// Demo
if (typeof require !== 'undefined' && require.main === module) {
  const adapter = new PaymentAdapter(); console.log(adapter.pay(12.34))
  const facade = new AppFacade(); facade.register('u','p').then(t=>console.log('tok',t))
  const remote = new RemoteControl(new Tv()); remote.toggle(); console.log('tv on? ', (new Tv()).isOn())
  const box = new Box('root'); box.add(new Item('pen',1.2)); const inner = new Box('inner'); inner.add(new Item('book',12)); box.add(inner); box.print(); console.log('total', box.getPrice())
  (async()=>{ const n = new LoggingNotifier(new EmailNotifier()); await n.send('hi'); const p = new CacheProxy(); console.log(await p.fetch(1)); console.log(await p.fetch(1)) })()
}

export { PaymentAdapter, AppFacade, RemoteControl, Tv, Box, Item, Notifier, EmailNotifier, LoggingNotifier, CacheProxy, FlyweightFactory };
