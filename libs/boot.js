// evita que o servidor inicie duas vezes em ambiente de testes.
import https from "https";
import fs from "fs";

module.exports = app => {
    if(process.env.NODE_ENV !== "test") {
        const credentials = {
          key: fs.readFileSync("14676821_ntask.key", "utf8"),
          cert: fs.readFileSync("14676821_ntask.cert", "utf8") /*certificado ssl*/
        };
        app.db.sequelize.sync().done(() => { // sincroniza as tabelas do banco de dados
            https.createServer(credentials, app)
            .listen(app.get("port"), () => {
                console.log(`NTask API - porta ${app.get("port")}`);
            });
        });
    }
};
