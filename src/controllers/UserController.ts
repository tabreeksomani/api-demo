interface SignupArgs {
    name: string;
    password: string;
    email: string;
    role: string;
}

interface LoginArgs {
    email: string;
    password: string;
}
import UserModel from '../models/UserModel'; // Assuming UserModel is in the same directory
import { hashPassword, comparePassword } from "../auth";


export default class UserController {
    async create(args: SignupArgs): Promise<string> {
        const hashedPassword = await hashPassword(args.password) as string;
        args.password = hashedPassword
        return UserModel.create(args)
            .then(() => 'User created')
            .catch(err => {
                console.error('Error creating user:', err);
                return 'Error creating user';
            });
    }
    async login(args: LoginArgs): Promise<string> {
        return UserModel.get(args.email)
            .then(async (user) => {
                if (user) {
                    const valid = await comparePassword(args.password, user.password);
                    if (valid) {
                        return 'User logged in';
                    } else {
                        return 'Invalid password';
                    }
                } else {
                    return 'User not found';
                }
            })
            .catch(err => {
                console.error('Error logging in user:', err);
                return 'Error logging in user';
            });
    }

    // ... rest of your UserController code ...
}