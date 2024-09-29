"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
    res.status(200).json({ message: "Up and Running" });
});
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use((0, express_session_1.default)({
    secret: "sdlfksldfjlkjflsjdflksjad",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Use 'true' in production (requires HTTPS)
        maxAge: 24 * 60 * 60 * 1000,
    },
}));
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/users", users_routes_1.default);
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
    .catch((e) => {
    console.log(e);
});
