"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcryptService {
    hashPassword(password) {
        return bcrypt_1.default.hash(password, 10);
    }
    comparePassword(password, password2) {
        return bcrypt_1.default.compare(password, password2);
    }
}
exports.BcryptService = BcryptService;
