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

    public add(quantity: Quantity): Quantity {
        return new ItemQuantity(quantity._value + this._value);
    }
}