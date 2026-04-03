import { Router } from "express";
import mapelController from "../controllers/mapel_controller.js";

const router = Router();

router.get("/", mapelController.getAll);
router.get("/:id", mapelController.getById);
router.post("/", mapelController.create);
router.put("/:id", mapelController.update);
router.delete("/:id", mapelController.remove);

export default router;