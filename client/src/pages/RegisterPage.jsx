//useForm proporciona una forma eficiente y fácil de manejar la validación y el seguimiento del estado de los formularios en aplicaciones React.

//register devuelve un objeto que contiene los atributos necesarios para que React Hook Form funcione correctamente con el campo de entrada, como el nombre del campo y las reglas de validación
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

function RegisterPage(){

    const { 
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm()

    const { signup, isRegisted, errors: registerErrors } = useAuth()

    const navigate = useNavigate()

    //Estados
    const [fadeout, setFadeout] = useState(false);

    useEffect(() => {
        if(isRegisted) navigate('/login')
    }, [isRegisted])

    //Animación de error
    useEffect(() => {
        if (registerErrors.length > 0) {
            const timeout = setTimeout(() => {
                setFadeout(true);
            }, 4000); // Empieza el desvanecimiento después de 4 segundos
            setFadeout(false)
            return () => clearTimeout(timeout);
        }
    }, [registerErrors]);

    const onSubmit = handleSubmit(async(values) => {
        signup(values)
    })

    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md animate-fade-down'>
            {
                registerErrors.map((error, i) => (
                        <div 
                            className={`bg-red-500 p-2 text-white text-center m-2 ${fadeout ? 'animate-fade-out' : 'animate-fade-down'}`}
                            key={i}
                        >
                            {error}
                        </div>
                ))
            }
            
            <h1 className='text-2xl font-bold'>Register</h1>

            <form onSubmit={onSubmit}>
                <input type="text" placeholder='Username'
                    {...register('username', {required: true})}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />

                {
                    errors.username && (
                        <p className='text-red-500'>
                            Username is required
                        </p>
                    )
                }

                <input type="email" placeholder='email'
                    {...register('email', {required: true})}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />

                {
                    errors.email && (
                        <p className='text-red-500'>
                            Email is required
                        </p>
                    )
                }

                <input type="password" placeholder='password'
                    {...register('password', {required: true})}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />

                {
                    errors.password && (
                        <p className='text-red-500'>
                            Password is required
                        </p>
                    )
                }

                <button type="submit" className=' bg-blue-800 rounded-md p-2 hover:bg-blue-900 transition-all'>Register</button>
            </form>

            <p className="flex gap-x-2 justify-between mt-10">
                ¿Ya tienes una cuenta? 
                    <Link 
                    to="/login"
                    className="text-sky-500 "
                    >
                        Iniciar sesión
                </Link>
            </p>

            </div>
        </div>
    )
}

export default RegisterPage