import { WritableSignal } from "@angular/core";
import { CacheEvent } from "./cache-event";
import { CacheException } from "./cache-exception";
import { CacheTransaction } from "./cache-transaction";
import { Indentifiable } from "./indentifiable";
import { Queue } from "./queue";

export class GenericCache<T extends Indentifiable> {

    private cache = new Map<string, T>()
    private operations = new Queue<CacheTransaction<T>>()
    private cacheInit: () => T[]
    private name: string
    private rebuilding: boolean = false
    private draining: boolean = false

    constructor(name: string, cacheInit: () => T[]) {
        this.name = name
        this.cacheInit = cacheInit
        this.buildCache()
    }

    private buildCache() {
        this.fill(this.cacheInit())
    }

    private clearCache() {
        this.cache = new Map<string, T>()
    }

    private rebuildCache() {
        this.rebuilding = true
        this.clearCache()
        this.operations.clear()
        this.buildCache()
        this.rebuilding = false
        this.drainQueue()
    }

    //CRUD

    private create(object: T): void {
        if (this.cache.get(object.getId()) !== undefined)
            throw new CacheException(`Cannot add the object: ${object} to cache because it already exists`)

        this.cache.set(object.getId(), object)
    }

    private read(id: string): T {
        const out = this.cache.get(id)
        if (out === undefined)
            throw new CacheException(`The object of id: ${id} does not exist`)

        return out
    }

    private update(object: T): void {
        const cacheObject = this.cache.get(object.getId())
        if (cacheObject === undefined)
            throw new CacheException(`The object: ${object} does not exist`)

        this.cache.set(object.getId(), object)
    }

    private delete(id: string): T {
        const cacheObject = this.cache.get(id)
        if (cacheObject === undefined)
            throw new CacheException(`The object of id: ${id} does not exist`)

        this.cache.delete(id)
        return cacheObject;
    }

    private fill(objects: T[]) {
        objects.forEach((object) => this.create(object))
    }

    //Queue

    queueCreate(object: T) {
        this.operations.enqueue(new CacheTransaction<T>(CacheEvent.CREATE, object))
    }

    queueRead(id: string, output: WritableSignal<T>) {
        this.operations.enqueue(new CacheTransaction<T>(CacheEvent.READ, id, output))
        this.drainQueue()
    }

    queueUpdate(object: T) {
        this.operations.enqueue(new CacheTransaction<T>(CacheEvent.UPDATE, object))
    }

    queueDelete(id: string, output: WritableSignal<T>) {
        this.operations.enqueue(new CacheTransaction<T>(CacheEvent.DELETE, id, output))
        this.drainQueue()
    }

    private drainQueue() {
        if (this.rebuilding === true) {
            console.warn("Cache is rebuilding, the drain is deferred until the end of the rebuild")
            return
        }

        if (this.draining) return;

        this.draining = true;
        try {
            while (!this.operations.isEmpty())
                this.doTransaction();
        } finally {
            this.draining = false;
        }
    }

    private doTransaction() {
        if (this.operations.isEmpty())
            throw new CacheException("The Queue is empty")

        const currentTransaction = this.operations.dequeue()!
        try {
            switch (currentTransaction.type) {
                case CacheEvent.CREATE:
                    this.create(currentTransaction.body as T)
                    break;
                case CacheEvent.READ:
                    if (!currentTransaction.result)
                        throw new CacheException("No return signal specified")

                    currentTransaction.result.set(this.read(currentTransaction.body as string))
                    break;
                case CacheEvent.UPDATE:
                    this.update(currentTransaction.body as T)
                    break;
                case CacheEvent.DELETE:
                    if (!currentTransaction.result)
                        throw new CacheException("No return signal specified")

                    currentTransaction.result!.set(this.delete(currentTransaction.body as string))
                    break;
            }

            console.log(`${currentTransaction} has been applied`)

        } catch (error) {
            console.error(error)
            console.error(`Desync happened at ${this.name}\nrebuilding ...`)
            this.rebuildCache()
        }
    }
}