import { GenericCache } from "./generic-cache";
import { ReactiveData } from "./reactive-data";

export abstract class GenericCacheService<D, T extends ReactiveData<D>> {

    protected resolveGate!: () => void;
    private gate = new Promise<void>((resolve) => {
        this.resolveGate = resolve;
    });

    protected cache: GenericCache<D, T>;

    public constructor() {
        this.cache = new GenericCache<D, T>();
    }

    protected abstract initialise(): void

    public async getCache(): Promise<GenericCache<D, T>> {
        await this.gate;
        return this.cache;
    }
}
