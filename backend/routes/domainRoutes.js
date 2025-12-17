import express from "express";
import {addDomain, getAllDomains, updateDomain, deleteDomain} from "../controllers/domainController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/addDomain",protect,adminOnly, addDomain);
router.get("/getAllDomains",protect,adminOnly, getAllDomains);
router.put("/updateDomain/:id",protect,adminOnly, updateDomain);
router.delete("/deleteDomain/:id",protect,adminOnly, deleteDomain);


export default router;
