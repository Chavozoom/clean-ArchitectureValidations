import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import UpdateCustomerUseCase from "./update.customer.usecase";


describe("Test update customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);

        const customer = CustomerFactory.createWithAddress(
            "John Doe",
            new Address("Street 1", 1, "12345", "City")
        );

        await customerRepository.create(customer);

        const newAddress = new Address(
            "Street 2 updated",
            2,
            "12345 updated",
            "City updated"
        );

        customer.changeAddress(newAddress);

        customer.changeName("Joana Doe");

        const input = {
            id: customer.id,
            name: customer.name,
            address: customer.Address,
        };

        const output = await useCase.execute(input);

        expect(output.id).toEqual(input.id);
        expect(output.name).toEqual(input.name);
        expect(output.address.city).toEqual(input.address.city);
        expect(output.address.street).toEqual(input.address.street);
        expect(output.address.number).toEqual(input.address.number);
        expect(output.address.zip).toEqual(input.address.zip);
    });
});