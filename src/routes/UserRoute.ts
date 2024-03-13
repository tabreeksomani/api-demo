import express, { Request, Response } from 'express';
import UserController from '../controllers/UserController';

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
        res.status(500).send(error);
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

export default router;