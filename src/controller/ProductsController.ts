import { Request, Response } from 'express';
import { CreateProductService } from '../services/CreateProductService';
import { DeleteProductService } from '../services/DeleteProductService';
import { ListProductService } from '../services/ListProductService';
import { ShowProductService } from '../services/ShowProductService';
import { UpdateProductService } from '../services/UpdateProductService';

export default class ProductController {
  public async createProduct(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return res.json(product);
  }
  public async listProducts(req: Request, res: Response): Promise<Response> {
    const listProducts = new ListProductService();

    const products = await listProducts.execute();

    return res.json(products);
  }

  public async showProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ id });

    return res.json(product);
  }

  public async updateProduct(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const { id } = req.params;
    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    return res.json(product);
  }

  public async deleteProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteProduct = new DeleteProductService();

    const product = await deleteProduct.execute({ id });
    return res.json([]);
  }
}
