// Value object validation is out of scope of this presentation
class OutboundItem {
    private constructor(
        private readonly _sku: string,
        private readonly _quantity: number
    ) {}

    public static create(sku: string, quantity: number) {
        return new OutboundItem(sku, quantity);
    }

    get sku() {
        return this._sku;
    }

    get quantity() {
        return this._quantity;
    }
}

class Outbound {
    private constructor(
        private readonly id: string,
        private readonly items: OutboundItem[],
        private state: string
    ) {}

    /**
     * Based on business nomenclature, a released outbound means
     * that it's available in the WMS and can now be picked
     */
    public static release(id: string, items: OutboundItem[]): Outbound {
        return new Outbound(id, items, 'RELEASED');
    }

    public addItem(item: OutboundItem): void {
        if (this.state !== 'RELEASED') {
            throw new CannotChangeItemsInCurrentStateException(
                this.state,
                item
            );
        }

        // validate that the item doesn't exist

        this.items.push(item);
    }

    public removeItem(item: OutboundItem): void {
        if (this.state !== 'RELEASED') {
            throw new CannotChangeItemsInCurrentStateException(
                this.state,
                item
            );
        }

        const index = this.items.findIndex((value) => item.sku === value.sku);

        if (index === -1) {
            throw new ItemDoesNotExistException(this.id, item);
        }

        this.items.slice(index, 1);
    }

    /**
     * Based on business nomenclature, when the first item
     * is picked, the outbound has started being processed
     * and the outbound cannot be changed anymore.
     */
    public startProcessing(): void {
        if (this.state !== 'RELEASED') {
            throw new InvalidTransitionException(this.state, 'PROCESSING');
        }

        this.state = 'PROCESSING';
    }

    public complete() {
        this.state = 'COMPELTED';
    }
}

class ItemDoesNotExistException extends Error {
    constructor(id: string, item: OutboundItem) {
        super(
            `Item with SKU ${item.sku} does not exist in outbound with id ${id}`
        );
    }
}

class CannotChangeItemsInCurrentStateException extends Error {
    constructor(state: string, item: OutboundItem) {
        super(
            `Unable to modify items because the outbound is in state ${state}`
        );
    }
}

class InvalidTransitionException extends Error {
    constructor(currentState: string, newState: string) {
        super(`Cannot transition from ${currentState} to ${newState}`);
    }
}
