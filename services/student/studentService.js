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
exports.studentService = void 0;
class studentService {
    constructor(StudentRepository, bycrpt) {
        this.StudentRepository = StudentRepository;
        this.bycrpt = bycrpt;
        this.StudentRepository = StudentRepository;
    }
    // create student service
    createStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const ifexistingStudent = yield this.StudentRepository.findByEmail(student.email);
            if (ifexistingStudent) {
                // throw new Error("A student with this email already exists.")
                return "A student with this email already exists";
            }
            const hashPassword = yield this.bycrpt.hashPassword(student.password);
            student.password = hashPassword;
            return yield this.StudentRepository.createStudent(student);
        });
    }
    //update student service
    updateStudent(_id, student) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentExist = yield this.StudentRepository.findById(_id);
            if (!studentExist) {
                throw new Error("student not exist");
            }
            return this.StudentRepository.updateStudent(_id, student);
        });
    }
    //login student
    loginStudent(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentData = yield this.StudentRepository.findByEmail(email);
            if (!studentData) {
                throw new Error("user not exist");
            }
            const matchPassword = yield this.bycrpt.comparePassword(password, studentData.password);
            console.log(matchPassword);
            if (!matchPassword) {
                throw new Error("Invalid password");
            }
            return studentData;
        });
    }
}
exports.studentService = studentService;
