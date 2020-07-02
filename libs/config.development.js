module.exports = {
    database: "ntask2",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "ntask.sqlite",
        logging: (sql) => {
          logger.info(`[$(new Date()}] ${sql}`)
        },
        define: {
            underscored: true
        }
    },
    jwtSecret: "Nta$K-AP1",
    jwtSession: {session: false}

};
