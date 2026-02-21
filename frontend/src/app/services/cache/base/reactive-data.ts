import { Identifiable } from "./identifiable";
import { Signal } from "@angular/core";
import { Initialisable } from "./initialisable";

export interface ReactiveData<T> extends Identifiable, Initialisable {
    getData(): Signal<T>
}
