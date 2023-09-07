import { Request, Response, Router } from "express";
import CreateProductUseCase from "../../../usecases/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecases/product/list/list.product.usecase";

export const productRouter = Router();

productRouter.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());
    try {
        const { name, price } = req.body;
        const productDto = {
            name,
            price
        };
        const output = await usecase.execute(productDto);
        return res.send(output);
    } catch (err) {
        return res.status(500).send(err);
    }
});

productRouter.get("/", async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());
    try {
        const output = await usecase.execute({});
        return res.status(200).send(output);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});