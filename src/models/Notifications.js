import { Schema, model } from "mongoose";

export const notificationsSchema = new Schema({
    userId: {
        type: String,
        required: [true, "El id del usuario es requerido"]
    },
    description: {
        type: String,
        required: true,
        default: "Han tocado a tu puerta"
    },
    isRead: {
        type: Boolean,
        required: true,
        default: false
    },
    imageUrl: {
        type: String,
        default: "http://imagen.com/img.png"
    }
}, {
    timestamps: true,
    versionKey: false
})


const Notifications = model("Notifications", notificationsSchema)


export default Notifications;