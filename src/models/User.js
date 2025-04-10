import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

import { config } from "../config/config.js";

export const userRole = {
    Admin: "Admin",
    User: "User"
};

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"],
        trim: true,
        maxlength: [50, 'El nombre no puede tener más de 50 caracteres']
    },
    lastName: {
        type: String,
        required: [true, "El Apellido es requerido"],
        trim: true,
        maxlength: [50, "El apellido no puede tener más de 50 caracteres"]
    },
    dob: {
        type: Date,
        required: [true, "La fecha de nacimiento es requerida"]
    },
    phone: {
        type: String,
        required: [true, "El número telefónico es requerido"],
        trim: true,
        match: [/^\d{10,15}$/, 'Por favor, introduce un número de teléfono válido']
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es requerido"],
        unique: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, introduce una dirección de correo electrónico válida']
    },
    username: {
        type: String,
        unique: true,
        required: [true, "El nombre de usuario es requerido"],
        minlength: [5, "El nombre de usuario debe tener al menos 5 caracteres"]
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    role: {
        type: String,
        enum: {
            values: Object.values(userRole),
            message: "{VALUE} no es un rol válido"
        }
    },
    enabled: {
        type: Boolean,
        required: true,
        default: true
    },
    imageUrl: {
        type: String,
        default: "https://imgs.search.brave.com/oa78EHs9PgwVEO6XrLIXpGBXSIFNJzLWgQSgzwhVxMk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzJjL2Ji/LzBlLzJjYmIwZWU2/YzFjNTViMTA0MTY0/MjEyOGM5MDJkYWRk/LmpwZw"
    },
    userId: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// 🔹 Virtual para obtener el nombre completo
userSchema.virtual("fullName").get(function () {
    return `${this.name} ${this.lastName}`;
});

// 🔹 Middleware para encriptar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); 

    try {
        const saltRounds = parseInt(config.saltWorkFactor) || 10; 
        const salt = await bcrypt.genSalt(saltRounds); 
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// 🔹 Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        throw new Error("Error al comparar contraseñas");
    }
};

const User = model("User", userSchema);

export default User;
