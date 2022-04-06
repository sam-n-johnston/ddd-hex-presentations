class Item {
    private constructor (
        private readonly _sku: string,
        private readonly _quantity: number
    ) {}

    public static create(sku: string, quantity: number){
        return new Item(sku, quantity)
    }
}

class OrderService {
    // ...

    removeItem (order: Order, item:  Item) {
        if (item.quantity < 0) throw new Error('invalid!')

        order.removeItem(item)
        
        // Item CANNOT be changed
        this.stockService.removeItem(order.id, item)
        this.warehouseService.removeItem(order.id, item)
    }
}

class Order {
    // ...

    removeItem (item: Item) {
        if (item.quantity <= 0) throw new Error('Item is not valid')

        item.quantity = 0
    }
}