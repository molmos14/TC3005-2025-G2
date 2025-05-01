import Table  from "./Table";
import attribute from 'dynamode/decorators';
import TableManager from "dynamode/table";

class User extends Table {
    private static GeneralManager = new TableManager(Table, {
        tableName: 'User',
        partitionKey: 'pk',
        sortKey: 'sk',
    });
    private static _UserManager = User.GeneralManager.entityManager(User);

    //Definir atributos de la tabla
    @attribute.string()
    name: string;

    @attribute.number()
    activeYear: number;

    constructor(props: {pk: string, sk: string, name: string, activeYear: number}) {
        super(props);
        this.name = props.name;
        this.activeYear = props.activeYear;
    }

    //Método para guardar crear la tabla en AWS
    public static async init(){
        try{
            await User.GeneralManager.createTable();
            console.log("Tabla User creada");
        }catch (error){
            console.error("Error al crear la tabla", error);
        }
    }

    //Getters
    public static get UserManager() {
        return User._UserManager;
    }

    //Run once
}

User.init()
export default User;