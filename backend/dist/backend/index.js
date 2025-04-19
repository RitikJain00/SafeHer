"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const alert_1 = __importDefault(require("./src/Routes/alert/alert"));
const user_1 = __importDefault(require("./src/Routes/users/user"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(body_parser_1.default.json()); // parse raw body
app.use((0, cors_1.default)());
app.use('/alert', alert_1.default);
app.use("/user", user_1.default);
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
