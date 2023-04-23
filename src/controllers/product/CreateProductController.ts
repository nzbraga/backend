import { Request, Response } from "express";
import { CreateProtuctService } from "../../services/product/CreateProtuctService";

class CreateProtuctController{
    async handle(req: Request, res: Response){
        const { name, price, description, category_id } = req.body;

        if(!req.file){
            throw new Error('error upload file')
        }else{
            const { originalname, filename: banner} = req.file;
            
            const createProtuctService = new CreateProtuctService()

            const product = await createProtuctService.execute({
                name, price, description, banner, category_id
            })
            
            return res.json(product)
            
        }
    }
}


export { CreateProtuctController }