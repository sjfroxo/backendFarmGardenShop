import Router from "express";
import cardRouter from "./cardRouter.js";
import authRouter from "./authRouter.js";

const router = new Router();

router.use('/cards', cardRouter);
router.use('/auth', authRouter);

export default router;
