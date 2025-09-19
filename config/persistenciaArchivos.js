import {MongoClient} from "mongodb";

const uri ="mongodb://localhost:27017";
const cliente = new MongoClient(uri);
const dbName =  "edgarEnLaNube";

export async function conectar(){
    try{
        await cliente.connect();
        console.log("Conexión exitosa con MongoDB");
        return cliente.db(dbName)
    }catch(error){
        console.log("Error de conexión con MongoDb", error);
    }
}

export async function cerrarConexion(){
    try {
        await cliente.close();
        console.log("Conexión cerrada exitosamente");
    } catch (error) {
        console.log("Error al cerrar la conexión con MongoDB", error);  
    }
}