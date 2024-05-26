import { useAuth } from '../context/AuthContext'
import AuthenticatedView from './AuthenticatedView/AuthenticatedView'
import UnauthenticatedView from './UnauthenticatedView/UnauthenticatedView'

function NavBar(){

    const { isAuthenticated } = useAuth()

    return(
        <nav className="flex justify-between items-center bg-gray-800 p-4">
            <h1 className="text-white text-xl font-bold">Taskin Project</h1>
            {/* LA VISTA SI NO ESTA AUTENTICADO */}
            {
                !isAuthenticated && (
                    <UnauthenticatedView/>
                )
            }
            
            {/* LA VISTA SI ESTA AUTENTICADO */}
            {
                isAuthenticated && (

                    <AuthenticatedView />

                    // <div>
                    //     <div className='flex gap-x-10 justify-end'>
                    //         <p>HOME</p>
                    //         <p>PROYECTOS</p>
                    //         <p>CONTACTO</p>
                    //     </div>
    
                    //     <div className='flex flex-col'>
                    //         <img className='h-8 w-8 rounded-full bg-gray-50' src='images (1).jfif'/>
                    //     </div>
                    // </div>
                )
            }

        </nav>
    )
}
export default NavBar