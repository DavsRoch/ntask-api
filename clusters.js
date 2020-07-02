import cluster from "cluster";
import os from "os";

const CPUS = os.cpus();
    if(cluster.isMaster) {
        CPUS.forEach(() => cluster.fork())
        cluster.on("listening", worker => {
            console.log("Cluster %d conectado", worker.process.pid);
        });
        cluster.on("disconnect", worker => {
            console.log("Cluster %d desconectado", worker.process.pid);
        });
        cluster.on("exit", worker => {
            console.log("Cluster %d saiu do ar", worker.proces.pid);
            cluster.fork();
            // garante que um novo cluster inicie se o antigo morrer
        });
    } else {
        require("./index")
    }

    // verifica se o cluster é master. se sim >> (verificação necessária para não repetir o processo para os filhos)
    // conta quantos nucleos de processamento existem e
    // cluster.fork() instancia um processo filho (cluster slave) de acordo com esse número
