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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
process.stdin.resume();
app.get("/", (req, res) => {
    res.status(200);
    res.send("Hello world");
});
app.get("/healthz", (req, res) => {
    res.status(200);
    res.send("Health check");
});
app.get("/environments", (req, res) => {
    res.status(200);
    res.send("Show all environment");
});
app.post("/environments", (0, express_validator_1.body)('environment').isString().trim().notEmpty(), (0, express_validator_1.body)('stack').isString().trim().notEmpty(), (0, express_validator_1.body)('config').isObject().optional(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.status(200).end();
}));
app.delete("/environments/:name", (req, res) => {
    console.log("Delete environment");
});
const server = app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Recive SIGTERM');
    });
});
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Recive SIGINT');
    });
});
