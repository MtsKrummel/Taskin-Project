import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

function LoginPage(){

    const {
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm()

    //Funciones y estados de AuthContext.jsx
    const {signin, isAuthenticated, errors: signinErrors} = useAuth()

    const navigate = useNavigate()

    //Estados
    const [fadeout, setFadeout] = useState(false);

    //Verificar usuario autorizado
    useEffect(() => {
        if(isAuthenticated) navigate('/')
    },[isAuthenticated])

    //Animación de error para signin
    useEffect(() => {
        if (signinErrors.length > 0) {
            const timeout = setTimeout(() => {
                setFadeout(true);
            }, 4000); // Empieza el desvanecimiento después de 4 segundos
            setFadeout(false)
            return () => clearTimeout(timeout);
        }
    }, [signinErrors]);



    const onSubmit = handleSubmit((data) => {
        signin(data)
    })

    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md animate-fade-down'>

                {
                    signinErrors.map((error, i) => (
                        <div 
                            className={`bg-red-500 p-2 text-white text-center m-2 ${fadeout ? 'animate-fade-out' : 'animate-fade-down'}`}
                            key={i}
                        >
                            {error}
                        </div>
                    ))
                }

                <h1 className='text-2xl font-bold'>Login</h1>

                <form onSubmit={onSubmit}>
                
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

                    <button type="submit" className=' bg-blue-800 rounded-md p-2 hover:bg-blue-900 transition-all'>
                        Login
                    </button>
                </form>

                <p className="flex gap-x-2 justify-between mt-10">
                    ¿No tienes una cuenta? 
                        <Link 
                        to="/register"
                        className="text-sky-500 "
                        >
                            Registrarse
                        </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage