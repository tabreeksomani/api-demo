import express, { Request, Response } from 'express';
import UserController from '../controllers/UserController';
import { authorize } from '../auth';

const router = express.Router();
const userController = new UserController();


router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
router.post('/signup', async (req: Request, res: Response) => {
    try {
        const result = await userController.create(req.body);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send("User already exists");
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        const result = await userController.login(req.body);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});



router.get("/restricted", authorize("admin"), (req: any, res: Response) => {  
    /*
      FOR FUTURE REFERENCE:
      -> When using authorize middleware, we can use req.auth to get content from token
    */
  
      console.log(req.auth)
    res
      .status(200)
      .send(
        `Authorized user ID: ${req.auth.userId} and role: ${req.auth.role}`
      );
  });

  router.get("/access", authorize("user"), (req: any, res: Response) => {  
    /*
      FOR FUTURE REFERENCE:
      -> When using authorize middleware, we can use req.auth to get content from token
    */
  
      console.log(req.auth)
    res
      .status(200)
      .send(
        `Authorized user ID: ${req.auth.userId} and role: ${req.auth.role}`
      );
  });

export default router;