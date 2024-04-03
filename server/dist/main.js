import express from 'express';
import dotenv from 'dotenv';
import productsRouter from './routers/productsRouter.js';
import usersRouter from './routers/user2Router.js';
import cors from 'cors';
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("static"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/api', productsRouter);
app.use('/auth', usersRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
//# sourceMappingURL=main.js.map