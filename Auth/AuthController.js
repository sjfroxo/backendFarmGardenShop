import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, SECRET, {expiresIn: "24h"});
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации"}, errors);
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if (candidate) {
                return res.status(400).json({message: "Уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"});
            const user = await new User({username, password: hashPassword, roles: [userRole]});
            await user.save();
            return res.json({message: "Пользователь зарегистрирован"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Reg error"});
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username}).populate("roles");
            console.log(user);
            if (!user) {
                res.status(400).json({message: `Пользователь ${username} не найден`});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                res.status(400).json({message: "Введен неверный пароль"});
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({token, user});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Log error"});
        }
    }

    async getUsers(req, res) {
        try {

            res.json("server work");
        } catch (e) {

        }
    }
}

export default new authController();