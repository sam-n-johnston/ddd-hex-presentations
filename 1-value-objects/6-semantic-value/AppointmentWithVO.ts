
class EmailAddress {
    private constructor (
        private readonly _string
    ) {}

    
}

export class Appointment {
    // ...

    public static schedule(
        // ...
        public readonly emailAddress: string,
        public readonly phoneNumber: string,
        public readonly date: string,
        public readonly duration: string
    ) {
        // ...
    }
}
