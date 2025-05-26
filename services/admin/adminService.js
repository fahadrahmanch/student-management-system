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
exports.adminServices = void 0;
class adminServices {
    constructor(adminRepository, bycrpt) {
        this.adminRepository = adminRepository;
        this.bycrpt = bycrpt;
        this.adminRepository = adminRepository;
    }
    adminLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.adminRepository.findByEmail(email);
            if (!admin) {
                throw new Error("Admin account with this email does not exist.");
            }
            const matchPassword = yield this.bycrpt.comparePassword(password, admin.password);
            if (!matchPassword) {
                throw new Error("Invalid Password");
            }
            if (admin.role != 'admin') {
                throw new Error("Access denied. You are not authorized as an admin.");
            }
            return admin;
        });
    }
}
exports.adminServices = adminServices;
