class FloatingPointQuantityException extends Error {
    constructor(quantity: number){
        super(`Quantity ${quantity} is not an integer`)
    }
}

class NonPositiveQuantityException extends Error {
    constructor(quantity: number){
        super(`Quantity ${quantity} is not strictly positive`)
    }
}

class ItemQuantity {
    private constructor (
        private readonly _value: number
    ) {}

    public static createFrom(quantity: number) {
        if (!Number.isInteger(quantity)) {
            throw new FloatingPointQuantityException(quantity)
        }

        if (quantity < 0) {
            throw new NonPositiveQuantityException(quantity)
        }

        return new ItemQuantity(quantity)
    }
}

class Item {
    private constructor (
        private readonly _sku: string,
        private readonly _quantity: ItemQuantity
    ) {}

    public static create(sku: string, quantity: ItemQuantity){
        return new Item(sku, quantity)
    }
}

class OrderService {
    // ...

    removeItem (order: Order, item: Item) {
        order.removeItem(item)
        
        this.stockService.removeItem(order.id, item)
        this.warehouseService.removeItem(order.id, item)
    }
}

class Order {
    // ...

    removeItem (item: Item) {
        item.quantity = 0
    }
}