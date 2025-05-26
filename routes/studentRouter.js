"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRouter = void 0;
const express_1 = __importDefault(require("express"));
class StudentRouter {
    constructor(StudentController) {
        this.StudentController = StudentController;
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/register', (req, res) => {
            this.StudentController.createStudent(req, res);
        });
        this.router.post('/update', (req, res) => {
            this.StudentController.updateStudent(req, res);
        });
        this.router.post('/login', (req, res) => {
            this.StudentController.loginStudent(req, res);
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.StudentRouter = StudentRouter;
