import { Router } from "express";
import { privateRoute } from "../config/passport";
import { Auth } from "../middlewares/auth";
import * as ApiController from "../controllers/apiController";
import * as UserPreposto from "../controllers/userPrepostoController"; //
import * as Processo from "../controllers/processoController"; //

const router = Router();

router.post("/register", ApiController.register);
router.post("/login", ApiController.login);

router.post(
  "/cadastro/preposto",
  Auth.private,
  UserPreposto.registerUserPreposto
);

router.get("/usuarios", Auth.private, UserPreposto.getUserPrepostoData);
router.delete("/usuarios/:iduserPreposto", UserPreposto.deleteUserPreposto);

router.post("/cadastro/processo", Auth.private, Processo.registerProcesso);
router.get("/processos", Auth.private, Processo.getProcessos);
router.delete("/processos/:id", Processo.deleteProcesso);

router.get("/profile", Auth.private, ApiController.getProfile);

router.put("/updateProfile", Auth.private, ApiController.updateProfile);


export default router;
