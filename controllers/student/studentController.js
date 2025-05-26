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
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = void 0;
class studentController {
    constructor(StudentService) {
        this.StudentService = StudentService;
    }
    createStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = req.body;
                const createNewstudent = yield this.StudentService.createStudent(student);
                console.log(createNewstudent);
                if (typeof createNewstudent === 'string') {
                    res.status(400).json({ message: createNewstudent });
                    return;
                }
                res.status(200).json({ message: "student registration is success" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = req.body;
                if (!student._id) {
                    res.status(400).json({ message: "Student ID is required" });
                    return;
                }
                const studentUpdate = yield this.StudentService.updateStudent(student._id, student);
                if (!studentUpdate) {
                    res.status(404).json({ message: "Student not found" });
                }
                else {
                    res.status(200).json({ message: "Student updated successfully", data: studentUpdate });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    loginStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = req.body;
                const studentLogin = yield this.StudentService.loginStudent(student.email, student.password);
                if (!student) {
                    res.json({ message: "Invalid input" });
                    return;
                }
                res.status(200).json({ message: "login successfully", studentLogin: studentLogin });
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.studentController = studentController;
