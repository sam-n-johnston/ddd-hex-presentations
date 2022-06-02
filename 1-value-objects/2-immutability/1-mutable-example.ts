type Item = {
    sku: string;
    quantity: number;
}

class OrderService {
    // ...

    removeItem (order: Order, item:  Item) {
        if (item.quantity < 0) throw new Error('invalid!')

        order.removeItem(item)
        
        // Item CAN be changed
        this.stockService.unreserveItem(order.id, item)
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
