import { Request, Response } from 'express';
import { CreateCustomerService } from '../services/CreateCustomerService';
import { DeleteCustomerService } from '../services/DeleteCustomerService';
import { ListCustomerService } from '../services/ListCustomerService';
import { ShowCustomerService } from '../services/ShowCustomerService';
import { UpdateCustomerService } from '../services/UpdateCustomerService';

export default class CustomerController {
  public async createCustomer(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const createCustomer = new CreateCustomerService();

    const customer = await createCustomer.execute({
      name,
      email,
    });

    return res.json(customer);
  }

  public async listCustomer(req: Request, res: Response): Promise<Response> {
    const listCustomer = new ListCustomerService();

    const customers = await listCustomer.execute();

    return res.json(customers);
  }

  public async showCustomer(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showCustomer = new ShowCustomerService();

    const customer = await showCustomer.execute({ id });

    return res.json(customer);
  }

  public async updateCustomer(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const { id } = req.params;
    const updateCustomer = new UpdateCustomerService();

    const customer = await updateCustomer.execute({
      id,
      name,
      email,
    });

    return res.json(customer);
  }

  public async deleteCustomer(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteCustomer = new DeleteCustomerService();

    const customer = await deleteCustomer.execute({ id });
    return res.json([]);
  }
}
