const config = {
    locations: {
        fulfillmentCenters: ['EUFC', 'MD'],
        nonFulfillmentCenters: ['MS', 'MP'],
    },
};

class NonExistantLocationException extends Error {
    constructor(location: string) {
        super(
            `Location "${location}" is not a valid source. Valid sources are [${JSON.stringify(
                [
                    ...config.locations.fulfillmentCenters,
                    ...config.locations.nonFulfillmentCenters,
                ]
            )}]`
        );
    }
}

export class Location {
    private constructor(private readonly _location: string) {}

    public static create(location: string): Location {
        if (
            !config.locations.fulfillmentCenters.includes(location) &&
            !config.locations.nonFulfillmentCenters.includes(location)
        ) {
            throw new NonExistantLocationException(location);
        }

        return new Location(location);
    }

    public isFulfillmentCenter(): boolean {
        return config.locations.fulfillmentCenters.includes(this._location);
    }

    public equals(location: Location): boolean {
        return location._location === this._location;
    }

    public toString(): string {
        return this._location;
    }
}

class IdenticalOriginAndDestinationRouteException extends Error {
    constructor(origin: Location, destination: Location) {
        super(
            `Route is invalid because both origin and destination are ${origin.toString()}`
        );
    }
}

class InterFulfillmentCenterRouteException extends Error {
    constructor(origin: Location, destination: Location) {
        super(
            `Route cannot be between 2 fulfillment centers; Origin: ${origin.toString()} & destination: ${destination.toString()}`
        );
    }
}

export class Route {
    private constructor(
        private readonly _origin: Location,
        private readonly _destination: Location
    ) {}

    public static create(origin: Location, destination: Location): Location {
        if (origin.equals(destination)) {
            throw new IdenticalOriginAndDestinationRouteException(
                origin,
                destination
            );
        }

        if (origin.isFulfillmentCenter() && destination.isFulfillmentCenter()) {
            throw new InterFulfillmentCenterRouteException(origin, destination);
        }

        return new Route(origin, destination);
    }
}
