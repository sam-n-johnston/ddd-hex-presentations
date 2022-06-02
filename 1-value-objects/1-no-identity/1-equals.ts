class ItemQuantity {
    private constructor (
        private readonly _value: number
    ) {}

    public static createFrom(quantity: number) {
        return new ItemQuantity(quantity)
    }

    public equals(quantity: Quantity): boolean {
        return quantity._value === this._value;
    }
}