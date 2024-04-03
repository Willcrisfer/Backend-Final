import { validationResult } from "express-validator";
import fileService from "../utils/fileService.js";
import jsonFileReader from "../utils/jsonFileReader.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const usersPath = "./src/data/users.json";
class UserController {
    getAllUsers(req, res) {
        const users = jsonFileReader.readFileJson(usersPath);
        return res.json(users);
    }
    ;
    getUserById(req, res) {
        const userId = parseInt(req.params.id);
        const users = jsonFileReader.readFileJson(usersPath);
        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        return res.json(user);
    }
    ;
    registerUser(req, res) {
        var _a, _b;
        const { name, email, password, role } = req.body;
        const users = jsonFileReader.readFileJson(usersPath);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const foundUser = users.find(user => user.email === req.body.email);
        if (foundUser) {
            return res.status(400).json({ error: 'User already exists.' });
        }
        let avatar = "default.jpg";
        if ((_a = req.files) === null || _a === void 0 ? void 0 : _a.avatar) {
            avatar = fileService.save((_b = req.files) === null || _b === void 0 ? void 0 : _b.avatar);
        }
        const newUser = {
            id: users.length + 1,
            name,
            email,
            password: bcrypt.hashSync(password, 7),
            avatar,
            role
        };
        users.push(newUser);
        const token = jwt.sign({ id: newUser.id }, String(SECRET_KEY));
        jsonFileReader.writeFileJson(usersPath, users);
        return res.status(201).json({ user: newUser, accessToken: token });
    }
    ;
    updateuser(req, res) {
    }
    ;
    deleteuser(req, res) {
    }
    ;
}
export default new UserController;
//# sourceMappingURL=UserController.js.map