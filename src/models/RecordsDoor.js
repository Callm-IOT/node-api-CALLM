import { Schema, model } from "mongoose";

const recordsDoorSchema = new Schema({
    isOpen: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false
})
    
const RecordsDoor = model("RecordsDoor", recordsDoorSchema);

export default RecordsDoor;