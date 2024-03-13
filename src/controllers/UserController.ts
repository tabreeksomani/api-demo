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

export default class UserController {
    create(args: SignupArgs): Promise<string> {
       

        return UserModel.create(args)
            .then(() => 'User created')
            .catch(err => {
                console.error('Error creating user:', err);
                return 'Error creating user';
            });
    }

    login(args: LoginArgs): Promise<string> {
        return UserModel.get(args.email)
            .then(user => {
                if (user) {
                    // Here you should check the user's password
                    return 'User logged in';
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