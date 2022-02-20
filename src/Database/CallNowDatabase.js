import SQLite from "react-native-sqlite-storage"; 
SQLite.DEBUG(true); 
SQLite.enablePromise(true);

const database_name = "ReactNativeSQLite.db"; //Nome do banco de dados
const database_version = "1.0"; //Versão do banco de dados
const database_displayname = "SQLite React Offline Database"; //Nome de exibição do banco de dados
const database_size = 200000; //tamanho do banco de dados

export default class CallNowDatabase {

    Conectar() {  
        let db;
        return new Promise((resolve) => {    
                console.log("Checando a integridade do plugin ...");    
                SQLite.echoTest().then(() => {        
                    console.log("Integridade Ok ...");        
                    console.log("Abrindo Banco de Dados ...");        
                    SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
                        db = DB;            
                        console.log("Banco de dados Aberto");            
                        db.executeSql('SELECT 1 FROM CallNow LIMIT 1').then(() => {
                            console.log("O banco de dados está pronto ... Executando Consulta SQL ...");
                        }).catch((error) =>{
                            console.log("Erro Recebido: ", error);
                            console.log("O Banco de dados não está pronto ... Criando Dados");
                            db.transaction((tx) => {
                                tx.executeSql('CREATE TABLE IF NOT EXISTS CallNow (id INTEGER PRIMARY KEY AUTOINCREMENT, solicitante TEXT, telefone TEXT, categoria TEXT, objeto TEXT, descricao TEXT, status TEXT)');
                            }).then(() => {
                                console.log("Tabela criada com Sucesso");                
                            }).catch(error => {                    
                                console.log(error);                
                            });            
                        });            
                    resolve(db);          
                }).catch(error => {           
                    console.log(error);          
                });      
            }).catch(error => {        
                console.log("echoTest Falhou - plugin não funcional");      
            });    
        }); 
    }; 
    
    Desconectar(db) {  
        if (db) {    
            console.log("Fechando Banco de Dados");    
            db.close().then(status => {        
                console.log("Banco de dados Desconectado!!");      
            }).catch(error => {        
                this.errorCB(error);      
            });  
        } else {    
            console.log("A conexão com o banco não está aberta");  
        } 
    };

    Listar() {  
        return new Promise((resolve) => {    
                const lista = [];    
                this.Conectar().then((db) => {      
                    db.transaction((tx) => {     
                        //Query SQL para listar os dados da tabela   
                        tx.executeSql('SELECT * FROM CallNow', []).then(([tx,results]) => {          
                        console.log("Consulta completa");          
                        var len = results.rows.length;          
                        for (let i = 0; i < len; i++) {            
                            let row = results.rows.item(i);            
                            const {id, solicitante, telefone, categoria, objeto, descricao, status  } = row;
                            lista.push({id, solicitante, telefone, categoria, objeto, descricao, status });
                        }
                        console.log(lista);          
                        resolve(lista);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    BuscarPorId(id) {  
        console.log(id);  
        return new Promise((resolve) => {    
            this.Conector().then((db) => {      
                db.transaction((tx) => {   
                    //Query SQL para buscar as informações do produto     
                    tx.executeSql('SELECT * FROM CallNow WHERE id = ?', [id]).then(([tx,results]) => {          
                      console.log(results);         
                      if(results.rows.length > 0) {            
                          let row = results.rows.item(0);            
                          resolve(row);          
                      }        
                  });      
                }).then((result) => {        
                    this.Desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }

    Inserir(item) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {     
                    //Query SQL para inserir um novo produto   
                    tx.executeSql('INSERT INTO CallNow (solicitante, telefone, categoria, objeto, descricao, status) VALUES (?, ?, ?, ?, ?, ?)', [item.solicitante, item.telefone, item.categoria, item.objeto, item.descricao, item.status]).then(([tx, results]) => { 
                        resolve(results);        
                    });      
                }).then((result) => {        
                    this.Desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }

    Atualizar(item) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {
                    //Query SQL para atualizar um dado no banco        
                    tx.executeSql('UPDATE CallNow SET status = "Resolvido" WHERE id = ?', [item.id]).then(([tx, results]) => {          
                    resolve(results);        
                });      
            }).then((result) => {        
                  this.Desconectar(db);      
                }).catch((err) => {        
                  console.log(err);      
                });    
            }).catch((err) => {     
                console.log(err);    
            });  
        });  
    } 
    
   /* trocaSituacao(item) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {
                    //Query SQL para atualizar um dado no banco        
                    tx.executeSql('UPDATE CallNow SET status = "Resolvido" WHERE id = ?', [item.id]).then(([tx, results]) => {          
                    resolve(results);        
                });      
            }).then((result) => {        
                  this.Desconectar(db);      
                }).catch((err) => {        
                  console.log(err);      
                });    
            }).catch((err) => {     
                console.log(err);    
            });  
        });  
    }   */ 


    Remover(id) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {    
                    //Query SQL para deletar um item da base de dados    
                    tx.executeSql('DELETE FROM CallNow WHERE Id = ?', [id]).then(([tx, results]) => {          
                        console.log(results);          
                        resolve(results);        
                    });      
                }).then((result) => {        
                    this.Desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }

}