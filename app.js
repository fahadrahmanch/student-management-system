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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const studentRouter_1 = require("./routes/studentRouter");
const studentController_1 = require("./controllers/student/studentController");
const studentService_1 = require("./services/student/studentService");
const adminService_1 = require("./services/admin/adminService");
const studentRepository_1 = require("./repositories/student/studentRepository");
const adminRepository_1 = require("./repositories/admin/adminRepository");
const bycrpt_1 = require("./utils/bycrpt");
const adminController_1 = require("./controllers/admin/adminController");
const adminRouter_1 = require("./routes/adminRouter");
class app {
    constructor() {
        this.app = (0, express_1.default)();
        this.setMiddlewares();
        this.setUserRouter();
        this.adminRouter();
    }
    setMiddlewares() {
        console.log("setMiddlewares");
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    loadDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = new db_1.connectDB();
            yield db.connect();
        });
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadDatabase();
            this.app.listen(3000, () => {
                console.log("server is running");
            });
        });
    }
    injectStudent() {
        const bycrpt = new bycrpt_1.BcryptService();
        const StudentRepository = new studentRepository_1.studentRepository();
        const StudentService = new studentService_1.studentService(StudentRepository, bycrpt);
        const student = new studentController_1.studentController(StudentService);
        // const studentService=new studentService()
        return student;
    }
    setUserRouter() {
        return __awaiter(this, void 0, void 0, function* () {
            const injectStudentController = this.injectStudent();
            const studentRouter = new studentRouter_1.StudentRouter(injectStudentController);
            this.app.use('/student', studentRouter.getRouter());
        });
    }
    injectAdmin() {
        const bycrpt = new bycrpt_1.BcryptService();
        const AdminRepository = new adminRepository_1.adminRepository();
        const AdminServices = new adminService_1.adminServices(AdminRepository, bycrpt);
        const AdminController = new adminController_1.adminController(AdminServices);
        return AdminController;
    }
    adminRouter() {
        return __awaiter(this, void 0, void 0, function* () {
            const injectAdmin = yield this.injectAdmin();
            const AdminRouter = new adminRouter_1.adminRouter(injectAdmin);
            this.app.use('/admin', AdminRouter.getRouter());
        });
    }
}
exports.app = app;
let App = new app();
App.listen();
