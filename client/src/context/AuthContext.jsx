import { createContext, useState, useContext, useEffect} from "react";
import { loginRequest, registerRequest } from "../API/auth";

export const AuthContext = createContext()

//Hook que nos trae todos los datos
export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

//Provee las funciones y estados 
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [isRegisted, setIsRegisted] = useState(false)

    const signup = async(user) =>{
        try {
            const res = await registerRequest(user)
            setUser(res.data)
            // setIsAuthenticated(true)
            setIsRegisted(true)
        } catch (error) {
            console.log(error.response)
            setErrors(error.response.data)
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response)
            setErrors(error.response.data)
        }
    }

    useEffect(() => {
        if(errors.length > 0){
            // setTimeout es un "timer" y es peligroso tener timers en React porque puede consumir muchos recursos, asi que vamos a guardarlo en una const timer
            const timer = setTimeout(()=>{
                setErrors([])
            }, 5000)
            //Quitamos/limpiamos el timeout cuando se deje se usar(por ejemplo el usuario paso a otra página)
            return () => clearTimeout(timer)
        }
    }, [errors])

    //En value podemos ponerle cualquier valor, pero por lo general se le pasa un objeto {} porque vamos a estar compartiendo varios datos

    //Ahora ya tengo un contexto en donde todos los componentes que estén adentro {children} van a poder llamar, tanto el dato del usuario como la función signup para hacer peticiones 
    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            user,
            isAuthenticated,
            isRegisted,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}