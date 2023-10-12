import { Request, Response } from 'express';

class SampleController {
  public sayHello(req: Request, res: Response): void {
    res.json({ message: 'Hello from the controller!' });
  }
}

export default SampleController;
