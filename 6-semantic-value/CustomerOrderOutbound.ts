export class CustomerOrderOutbound {
    // ...

    public static ship (
        public readonly shipmentId: string,
        public readonly parcelId: string,
        public readonly trackingId: string
    ) {
        // ...
    }
    
    public static ship (
        public readonly shipmentId: ShipmentId,
        public readonly parcelId: ParcelId,
        public readonly trackingId: TrackingId
    ) {
        // ...
    }
}