import { ReactiveData } from "./reactive-data"
import { Signal } from "@angular/core"

export class GenericCache<D, T extends ReactiveData<D>,> {

    private map: Map<string, T>

    constructor() {
        this.map = new Map()
    }

    public register(object: T): void {
        if (object.getId() === undefined) {
            console.error(`the id of a registered object cannot be undefined`)
            return
        }

        if (this.contains(object.getId())) {
            console.log(`object of id: ${object.getId()} already exists`)
            return
        }

        object.initialise()
        this.map.set(object.getId(), object)
        console.log(`object of id: ${object.getId()} was successfully initialised`)
    }

    public drop(id: string) {
        this.map.delete(id)
    }

    public get(id: string): T | undefined {
        const currentObject = this.map.get(id)

        return currentObject;
    }

    public getSignal(id: string): Signal<D> | undefined {
        const currentObject = this.map.get(id)

        if (!currentObject)
            return undefined

        return currentObject.getData();
    }

    public contains(id: string): boolean {
        const currentObject = this.map.get(id)
        return currentObject != undefined
    }

    public getAllSignals(): Signal<D>[] {

        const out: Signal<D>[] = []

        for (const entry of this.map.entries()) {
            out.push(entry[1].getData())
        }

        return out
    }
}
