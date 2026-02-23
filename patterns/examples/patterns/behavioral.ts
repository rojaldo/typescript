// examples/patterns/behavioral.ts
// Comportamiento: Strategy, Observer, Command, Iterator, State, Template Method, Chain, Mediator, Visitor, Memento

// Strategy
interface Strategy { execute(a:number,b:number): number }
class Add implements Strategy { execute(a:number,b:number){ return a+b } }
class Mul implements Strategy { execute(a:number,b:number){ return a*b } }
class Calculator { constructor(private s:Strategy){} setStrategy(s:Strategy){ this.s = s } run(a:number,b:number){ return this.s.execute(a,b) } }

// Observer
type Handler = (...args:any[])=>void
class EventBus { private subs = new Map<string, Handler[]>(); on(evt:string,h:Handler){ const a = this.subs.get(evt) ?? []; a.push(h); this.subs.set(evt,a); return ()=>this.off(evt,h) } off(evt:string,h:Handler){ const arr = this.subs.get(evt) ?? []; this.subs.set(evt, arr.filter(x=>x!==h)) } emit(evt:string,...args:any[]){ (this.subs.get(evt) ?? []).forEach(h=>h(...args)) } }

// Command
interface Command { execute(): void; undo?(): void }
class Store { private items: string[] = []; add(i:string){ this.items.push(i) } remove(i:string){ this.items = this.items.filter(x=>x!==i) } list(){ return [...this.items] } }
class AddCommand implements Command { constructor(private store:Store, private item:string){} execute(){ this.store.add(this.item) } undo(){ this.store.remove(this.item) } }
class Invoker { private history: Command[] = []; execute(c:Command){ c.execute(); this.history.push(c) } undo(){ const c = this.history.pop(); if (c && c.undo) c.undo() } }

// Iterator
class Range implements Iterable<number> { constructor(private s:number, private e:number){} *[Symbol.iterator](){ for(let i=this.s;i<=this.e;i++) yield i } }

// State
interface State { press(): void }
class OnState implements State { constructor(private lamp: Lamp){} press(){ console.log('turning off'); this.lamp.setState(new OffState(this.lamp)) } }
class OffState implements State { constructor(private lamp: Lamp){} press(){ console.log('turning on'); this.lamp.setState(new OnState(this.lamp)) } }
class Lamp { constructor(private state: State = new OffState(undefined as any)) { this.state = state } setState(s: State){ this.state = s } press(){ this.state.press() } }

// Template Method
abstract class DataProcessor { process(){ this.read(); this.transform(); this.save() } protected abstract read(): void; protected abstract transform(): void; protected abstract save(): void }
class CsvProcessor extends DataProcessor { protected read(){ console.log('read csv') } protected transform(){ console.log('transform csv') } protected save(){ console.log('save csv') } }

// Chain of Responsibility
class Handler { constructor(public next?: Handler){} handle(request: number){ if (this.next) return this.next.handle(request); return null } }
class DivisibleByTwo extends Handler { handle(r:number){ if (r%2===0) return 'two'; return super.handle(r) } }
class DivisibleByThree extends Handler { handle(r:number){ if (r%3===0) return 'three'; return super.handle(r) } }

// Mediator
class ChatRoom { private users = new Map<string, Participant>(); register(p: Participant){ this.users.set(p.name, p); p.room = this } send(from:string, to:string, msg:string){ const u = this.users.get(to); if (u) u.receive(from,msg) } }
class Participant { room?: ChatRoom; constructor(public name: string){} send(to:string,msg:string){ this.room?.send(this.name,to,msg) } receive(from:string,msg:string){ console.log(`${this.name} got '${msg}' from ${from}`) } }

// Visitor
interface Element { accept(v: any): void }
class NodeA implements Element { constructor(public value:string){} accept(v:any){ v.visitNodeA(this) } }
class NodeB implements Element { constructor(public num:number){} accept(v:any){ v.visitNodeB(this) } }
class RenderVisitor { visitNodeA(n:NodeA){ console.log('A', n.value) } visitNodeB(n:NodeB){ console.log('B', n.num) } }

// Memento
class Memento { constructor(public state: string){} }
class Editor { private state = ''; write(s:string){ this.state += s } save(){ return new Memento(this.state) } restore(m:Memento){ this.state = m.state } read(){ return this.state } }

// Demo
if (typeof require !== 'undefined' && require.main === module) {
  const calc = new Calculator(new Add()); console.log(calc.run(2,3)); calc.setStrategy(new Mul()); console.log(calc.run(2,3))
  const bus = new EventBus(); const off = bus.on('m', (x:any)=>console.log('m',x)); bus.emit('m', 1); off()
  const s = new Store(); const inv = new Invoker(); inv.execute(new AddCommand(s,'a')); inv.execute(new AddCommand(s,'b')); console.log(s.list()); inv.undo(); console.log(s.list())
  for (const n of new Range(1,3)) console.log('range', n)
  const lamp = new Lamp(new OffState(undefined as any)); lamp.setState(new OffState(lamp)); lamp.press(); lamp.press()
  new CsvProcessor().process()
  const chain = new DivisibleByTwo(new DivisibleByThree()); console.log(chain.handle(9))
  const room = new ChatRoom(); const a = new Participant('a'); const b = new Participant('b'); room.register(a); room.register(b); a.send('b','hi')
  const nodes: Element[] = [new NodeA('x'), new NodeB(2)]; const rv = new RenderVisitor(); nodes.forEach(n=>n.accept(rv))
  const e = new Editor(); e.write('hello'); const m = e.save(); e.write(' world'); console.log(e.read()); e.restore(m); console.log(e.read())
}

export { Calculator, Add, Mul, EventBus, Store, AddCommand, Invoker, Range, Lamp, OnState, OffState, CsvProcessor, DivisibleByTwo, DivisibleByThree, ChatRoom, Participant, NodeA, NodeB, RenderVisitor, Editor, Memento };
