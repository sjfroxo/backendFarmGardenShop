import Router from 'express';
import AuthController from "../Auth/AuthController.js";
import { check } from "express-validator";

const authRouter = new Router();

authRouter.post('/registration',  [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min: 4, max: 10})
], AuthController.registration);
authRouter.post('/login', AuthController.login);
authRouter.get('/users', AuthController.getUsers);



export default authRouter;