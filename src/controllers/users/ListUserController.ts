import { Request, Response } from "express";
import { ListByCategoryService } from '../../services/product/ListByCategoryService';

class ListByCategoryController{
    async handle( req: Request, res: Response){
        const id = req.query.id as string;

        const listByCategory = new ListByCategoryService();

        const product = await listByCategory.execute({
            id
        });

        return res.json(product);
    }
}

export { ListByCategoryController }