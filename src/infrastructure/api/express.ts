import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import { customerRouter } from "./routes/customer.route";
import { productRouter } from "./routes/product.route";
import ProductModel from "../product/repository/sequelize/product.model";

export const app: Express = express();
app.use(express.json());
app.use("/customer", customerRouter);
app.use("/product", productRouter);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    });
    await sequelize.addModels([CustomerModel]);
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
}
setupDb();