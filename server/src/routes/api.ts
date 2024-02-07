import { Router } from "express";
import { Auth} from "../middlewares/auth";
import {checkPermission} from "../middlewares/permissions";
import * as ApiController from "../controllers/apiController";
import * as UserPreposto from "../controllers/userPrepostoController"; //
import * as Processo from "../controllers/processoController"; //

const router = Router();


router.post("/register", ApiController.register);
router.post("/login", ApiController.login);

router.post(
  "/cadastro/preposto",
  Auth.private,
  checkPermission(["Master", "Operador"]),
  UserPreposto.registerUserPreposto
);


router.delete("/usuarios/:iduserPreposto", UserPreposto.deleteUserPreposto);
router.get("/usuarios", Auth.private,checkPermission(["Master", "Operador"]), UserPreposto.getUserPrepostoData);


router.post("/cadastro/processo", Auth.private, checkPermission(["Master", "Operador"]), Processo.registerProcesso);
router.delete("/processos/:id", Auth.private, checkPermission(["Master", "Operador"]), Processo.deleteProcesso);
router.get("/processos", Auth.private, Processo.getProcessos);


router.get("/profile", Auth.private, ApiController.getProfile);

router.put("/updateProfile", Auth.private, checkPermission(["Master", "Operador"]), ApiController.updateProfile);


export default router;
