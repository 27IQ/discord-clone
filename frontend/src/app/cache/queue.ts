export class Queue<T> {
    private items: Record<number, T> = {};
    private head = 0;
    private tail = 0;

    enqueue(item: T): void {
        this.items[this.tail] = item;
        this.tail++;
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) return undefined;

        const item = this.items[this.head];
        delete this.items[this.head];
        this.head++;
        return item;
    }

    peek(): T | undefined {
        return this.items[this.head];
    }

    isEmpty(): boolean {
        return this.tail === this.head;
    }

    size(): number {
        return this.tail - this.head;
    }

    clear(): void {
        this.items = {};
        this.head = 0;
        this.tail = 0;
    }
}
