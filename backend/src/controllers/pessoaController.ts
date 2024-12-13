import {Router} from "express";
import {criaPessoa, buscaPessoa, deletaPessoa, listaPessoas} from "@services/pessoaService";

const router = Router();

router.post("/pessoa", criaPessoa);
router.get("/pessoa", listaPessoas);
router.get("/pessoa/:id", buscaPessoa);
router.delete("/pessoa/:id", deletaPessoa);

export default router;
