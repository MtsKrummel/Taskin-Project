import express from "express";
import morgan from "morgan"; //Ver en tiempo real las peticiones
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import workSpaceRoutes from './routes/workspace.routes.js'
import cookieParser from "cookie-parser"; //middleware 
import cors from 'cors'

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', workSpaceRoutes);

export default app; 