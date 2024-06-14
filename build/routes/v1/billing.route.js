"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const billing_controller_1 = require("../../controllers/billing.controller");
const router = express_1.default.Router();
router.post("/b/create", billing_controller_1.createBillingController);
router.get("/b/get/all", billing_controller_1.getAllBillingController);
router.get("/b/get/:id", billing_controller_1.getBillingByIdController);
router.put("/b/update/:id", billing_controller_1.updateBillingController);
router.delete("/b/delete/:id", billing_controller_1.deleteBillingController);
exports.default = router;
