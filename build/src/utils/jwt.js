"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
function signJwt(object, keyName, options) {
    const signingKey = Buffer.from(config_1.default.get(keyName), "base64").toString("ascii");
    // TODO:: Use RSA keys
    return jsonwebtoken_1.default.sign(object, "asdf1234", Object.assign({}, (options && options)));
}
exports.signJwt = signJwt;
function verifyJwt(token, keyName) {
    const publicKey = Buffer.from(config_1.default.get(keyName), "base64").toString("ascii");
    try {
        // TODO:: Use RSA keys
        const decoded = jsonwebtoken_1.default.verify(token, "asdf1234");
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (e) {
        console.error(e);
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null,
        };
    }
}
exports.verifyJwt = verifyJwt;
