import prismaClient from "../../prisma";

interface ProductRequest{
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

class CreateProtuctService{

    async execute( {name, price, description, banner, category_id}: ProductRequest){

        const product = await prismaClient.product.create({
            data:{
                name,
                price,
                description,                          
                banner,
                category_id,
            }});
        
        return product;
        
        
    }
}


export { CreateProtuctService }