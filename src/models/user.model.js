import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
}, {
    timestamps: true
})

//Cuando creamos el esquema estamos definiendo un objeto de lo que queremos validar, pero esto NO nos permite hacer consultas a la base de datos. Con este esquema le estamos diciendo a mongobd cómo debe lucir la tabla User, pero cuando queramos hacer consultas como crear o actualizar, necesitamos metodos para poder interactuar con la base de datos.

//Mongodb luego va a pluralizar 'User' --> 'Users'
export default mongoose.model('User', userSchema)