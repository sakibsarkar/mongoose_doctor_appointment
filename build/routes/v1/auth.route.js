"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../../controllers/auth.controller");
const router = express_1.default.Router();
router.post("/u/exist", auth_controller_1.checkEmailController);
router.post("/register", auth_controller_1.registerCustomerController);
router.post("/login", auth_controller_1.signinController);
router.post("/activation", auth_controller_1.activationController);
router.put("/forgotpassword", auth_controller_1.forgotPasswordController);
router.put("/resetpassword", auth_controller_1.resetPasswordController);
exports.default = router;
