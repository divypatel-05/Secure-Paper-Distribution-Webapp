import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            trim: true,
        },
        year: {
            type: Number,
            required: true,
        },
        semester: {
            type: Number,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        subjectcode: {
            type: String,
            required: true,
            trim: true,
        },
        branch: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const Paper = mongoose.model("Paper", paperSchema);

export { Paper };
