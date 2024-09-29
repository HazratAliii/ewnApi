"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gitSchema = new mongoose_1.Schema({
    handle: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
}, { timestamps: true });
const Git = (0, mongoose_1.model)("Git", gitSchema);
exports.default = Git;
