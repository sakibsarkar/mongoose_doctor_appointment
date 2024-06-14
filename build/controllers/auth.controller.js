"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.forgotPasswordController = exports.signinController = exports.activationController = exports.registerCustomerController = exports.checkEmailController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorhandler_1 = __importDefault(require("../utils/errorhandler"));
const jwtToken_1 = __importDefault(require("../utils/jwtToken"));
const patient_model_1 = __importDefault(require("../models/patient.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
// import shopModel from "../models/shop.model";
// Register Account
const checkEmailController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new errorhandler_1.default(errors.array()[0].msg, 422);
        }
        const existingEmail = yield patient_model_1.default.findOne({ email });
        if (existingEmail) {
            return res.json({
                success: true,
                exist: true,
                message: "Email checked",
            });
        }
        return res.json({
            success: true,
            exist: false,
            message: "Email checked",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.checkEmailController = checkEmailController;
// Register customer Account
const registerCustomerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        console.log("sss", req.body);
        if (!errors.isEmpty()) {
            throw new errorhandler_1.default(errors.array()[0].msg, 422);
        }
        const existingEmail = yield user_model_1.default.findOne({ email });
        if (existingEmail) {
            throw new errorhandler_1.default("This email is already used!", 400);
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield user_model_1.default.create({
            email,
            name,
            password: hashedPassword,
        });
        const token = (0, jwtToken_1.default)(user, "7d");
        const userWithoutPassword = user.toObject();
        const { password: _ } = userWithoutPassword, userResponse = __rest(userWithoutPassword, ["password"]);
        return res.json({
            success: true,
            message: "Account created success",
            token,
            user: userResponse,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.registerCustomerController = registerCustomerController;
// Activation by Verify Email
const activationController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        if (!token) {
            return res.json({ message: "Error: Token missing." });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return res.json({
            success: true,
            message: "Signup success",
            token: "",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.activationController = activationController;
// Login customer Account
const signinController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new errorhandler_1.default(errors.array()[0].msg, 422);
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            throw new errorhandler_1.default("Email is not registered", 400);
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new errorhandler_1.default("Password is not match", 400);
        }
        const token = (0, jwtToken_1.default)(user, "7d");
        const userWithoutPassword = user.toObject();
        const { password: _ } = userWithoutPassword, userResponse = __rest(userWithoutPassword, ["password"]);
        return res.json({
            success: true,
            message: "Signin success",
            token,
            user: userResponse,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signinController = signinController;
// Forgot Password
const forgotPasswordController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new errorhandler_1.default(errors.array()[0].msg, 422);
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            throw new errorhandler_1.default("User with that email does not exist", 400);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.forgotPasswordController = forgotPasswordController;
// Reset Password
const resetPasswordController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new errorhandler_1.default(errors.array()[0].msg, 422);
        }
        return res.json({ message: "Password reset successful" });
    }
    catch (error) {
        next(error);
    }
});
exports.resetPasswordController = resetPasswordController;
