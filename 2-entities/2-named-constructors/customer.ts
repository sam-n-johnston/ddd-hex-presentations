class Customer {
    private constructor(private readonly email: string) {}

    public static register(email: string): Customer {
        return new Customer(email);
    }
}
