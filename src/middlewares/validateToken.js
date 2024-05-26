import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

//estas con los 3 parametros que debe tener un middleware. next: Si el usuario está autenticado, se llama a next() para continuar con el procesamiento de la solicitud. En lugar de que retorne una respuesta al cliente le digo a la apliacación que continue porque hay otra función despues de esta, si no le paso next detengo el procedimiento y evito que ejecute el controlador de la ruta.
//En este caso si hay Token continua, si no, responde un mensaje "NO ESTAS AUTORIZADO"
export const authRequired = (req, res, next) => {

    const { token } = req.cookies

    if(!token) return res.status(401).json({ message: 'No token, authorization denied' });

    jwt.verify(token, TOKEN_SECRET, (err, user)=>{
        if(err) return res.status(403).json({ message: 'Invalid token' })

        console.log(user)
        //Esto significa que del usuario que estoy decodificando, voy a estar guardando todo dentro de req.user, que es la petición que nos llegó y lo guardo ahí porque el todas las rutas tienen request -> login = async (req, res){}, si yo guardo los datos en "req" significa que cuando llame a req.user van a poder acceder al dato que ya se habia guardado el token.
        req.user = user


        next();

    })
}