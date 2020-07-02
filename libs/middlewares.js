import bodyParser from "body-parser"
import express from "express"
import cors from "cors";
import morgan from "morgan"
import logger from "./logger"
import compression from "compression"
import helmet from "helmet"

module.exports = app => {
    app.set("port", 3000);
    app.set("json spaces", 4); // retorna um json mais amigável
    app.use(morgan("common", {
        stream: {
            write: (message) => {
                logger.info(message) // envia os logs para o modulo logger
            }
        }
    }));
    app.use(helmet());
    app.use(cors({
        origin: ["http://localhost:3001"], // só aceita requisições desse endereço
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-type", "Authorization"]
    }
   ));
    app.use(compression()); //comprime os arquivos ficar mais leve
    app.use(bodyParser.json());
    app.use(app.auth.initialize());
    app.use((req, res, next) => {
        //middleware de pré-execução das rotas
        delete req.body.id; //exclui o id do req.body para não sorescrever o id de uma tarefa
        next();
    });
    app.use(express.static("public")); // habilitar o servidor de arquivos estáticos do express
};
