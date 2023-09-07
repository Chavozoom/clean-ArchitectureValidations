import { Request, Response, Router } from "express";
import CreateCustomerUseCase from "../../../usecases/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecases/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";

export const customerRouter = Router();

customerRouter.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip,
            },
        };
        const output = await usecase.execute(customerDto);
        return res.send(output);
    } catch (err) {
        return res.status(500).send(err);
    }
});

customerRouter.get("/", async (req: Request, res: Response) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    try {
        const output = await usecase.execute({});
        return res.status(200).send(output);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});