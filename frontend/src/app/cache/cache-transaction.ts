import { WritableSignal } from "@angular/core";
import { CacheEvent } from "./cache-event";
import { Indentifiable } from "./indentifiable";

export class CacheTransaction<T extends Indentifiable> {
    type: CacheEvent
    body: string | T
    result: WritableSignal<T> | undefined

    constructor(type: CacheEvent, body: string | T, result?: WritableSignal<T>) {
        this.type = type
        this.body = body
        this.result = result
    }
}
