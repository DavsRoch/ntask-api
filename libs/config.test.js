module.exports = {
    database: "ntask_test", //nome da base
    username: "", //meu nome de usuário
    password: "", // minha senha
    params: {
        dialect: "sqlite",
        storage: "ntask.sqlite", //aonde vão ser gravadas as tabelas
        logging: false, // desabilita os logs do sql para não gerar um report de testes confusp
        define: {
            underscored: true
        }
    },
    jwtSecret: "NTASK_TEST",
    jwtSession: {session: false}
};
