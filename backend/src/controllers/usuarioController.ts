import {Router} from "express";
import { criaUsuario, buscaUsuario, deletaUsuario, listaUsuarios,
        listaReceitas, listaConsultas, atualizaUsuario, logarUsuario } from "@services/usuarioService";


const router = Router();

router.post("/usuario", criaUsuario);
router.post("/logar", logarUsuario);
router.get("/usuario", listaUsuarios);
router.get("/usuario/:id", buscaUsuario);
router.put("/usuario/:id", atualizaUsuario);
router.delete("/usuario/:id", deletaUsuario);
router.get("/usuario/:id/receita", listaReceitas);
router.get("/usuario/:id/consulta", listaConsultas);

export default router;