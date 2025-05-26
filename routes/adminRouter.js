"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
class adminRouter {
    constructor(adminController) {
        this.adminController = adminController;
        this.adminController = adminController;
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/login", (req, res) => {
            this.adminController.adminLogin(req, res);
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.adminRouter = adminRouter;
