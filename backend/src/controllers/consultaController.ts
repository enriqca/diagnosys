import { listaConsultas, listaConsultasGeral } from "@services/medicoService";
import {Router} from "express";

const router = Router();

router.get('/consulta', listaConsultasGeral)

export default router;