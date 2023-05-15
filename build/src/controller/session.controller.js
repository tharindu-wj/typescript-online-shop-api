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
exports.deleteSessionHandler = exports.getUserSessionsHandler = exports.createUserSessionHandler = void 0;
const config_1 = __importDefault(require("config"));
const user_service_1 = require("../service/user.service");
const session_service_1 = require("../service/session.service");
const jwt_1 = require("../utils/jwt");
function createUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate the user's password
        const user = yield (0, user_service_1.validatePassword)(req.body);
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }
        // create a session
        const session = yield (0, session_service_1.createSession)(user._id, req.get("user-agent") || "");
        // create an access token
        const accessToken = (0, jwt_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), "accessTokenPrivateKey", { expiresIn: config_1.default.get("accessTokenTtl") } // 15 minutes,
        );
        // create a refresh token
        //TODO:: Use refreshTokenPrivateKey
        const refreshToken = (0, jwt_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), "accessTokenPrivateKey", { expiresIn: config_1.default.get("refreshTokenTtl") } // 1 year
        );
        // return access and refresh tokens
        return res.send({ accessToken, refreshToken });
    });
}
exports.createUserSessionHandler = createUserSessionHandler;
function getUserSessionsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const sessions = yield (0, session_service_1.findSessions)({ user: userId, valid: true });
        return res.send(sessions);
    });
}
exports.getUserSessionsHandler = getUserSessionsHandler;
function deleteSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = res.locals.user.session;
        yield (0, session_service_1.updateSession)({ _id: sessionId }, { valid: false });
        return res.send({
            accessToken: null,
            refreshToken: null,
        });
    });
}
exports.deleteSessionHandler = deleteSessionHandler;
