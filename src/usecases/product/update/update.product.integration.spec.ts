import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";
import { InputUpdateProductDto } from "./update.product.dto";

describe("Test create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        product.changeName("Product 1.1");
        product.changePrice(20);

        const input: InputUpdateProductDto = {
            id: product.id,
            name: product.name,
            price: product.price,
        };

        const output = await useCase.execute(input);

        expect(output.id).toBe(product.id);
        expect(output.name).toBe(product.name);
        expect(output.price).toBe(product.price);
    });
});