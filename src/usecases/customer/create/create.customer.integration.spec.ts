import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CreateCustomerUseCase from "./create.customer.usecase";
import { InputCreateCustomerDto } from "./create.customer.dto";
import { Sequelize } from "sequelize-typescript";

describe("Test create customer use case", () => {
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

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const input: InputCreateCustomerDto = {
            name: "John",
            address: {
                street: "Street",
                number: 123,
                city: "City",
                zip: "12345"
            }
        };

        const output = await usecase.execute(input);
        const foundCustomer = await customerRepository.find(output.id);

        expect(foundCustomer.name).toEqual(output.name);
        expect(foundCustomer.Address.street).toEqual(output.address.street);
        expect(foundCustomer.Address.number).toEqual(output.address.number);
        expect(foundCustomer.Address.zip).toEqual(output.address.zip);
        expect(foundCustomer.Address.city).toEqual(output.address.city);
    });
});