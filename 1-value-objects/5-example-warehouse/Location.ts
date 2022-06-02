enum Locations {
    // We're not dealing with Warehouses, only locations
    MD = 'MD',
    EUDC = 'EUDC',
    NGDC = 'NGDC',
}

enum OrderFulfillmentLocations {
    MD = 'MD',
    EUDC = 'EUDC',
}

export class Location {
    protected constructor(readonly _value: string) {}

    public static createFromString(value: string): Location {
        if (!(value in Locations)) {
            throw new InvalidLocationException(value + ' is not a valid location');
        }
        return new this(value);
    }

    public equals(newLocation: Location): boolean {
        return this._value === newLocation.toString();
    }

    public isOrderFulfillnentLocation(): boolean {
        return this._value in OrderFulfillmentLocations;
    }

    // Replaces the checks https://github.com/Groupe-Atallah/dm-warehouse-ddd/blob/81ea2c7234f8d6c3ca135e7ee211293d6315f9f3/src/inbound/domain/model/InventorySQSMessage.ts#L29
    public isCanadianLocation(): boolean {
        return this._value !== Locations.EUDC;
    }

    public isBelgiumLocation(): boolean {
        return this._value === Locations.EUDC;
    }

    public toString(): string {
        return this._value;
    }
}
