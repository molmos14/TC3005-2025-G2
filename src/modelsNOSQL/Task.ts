import Table from "./Table";
import attribute from 'dynamode/decorators';
import TableManager from "dynamode/table";

class Task extends Table {
    private static GeneralManager = new TableManager(Table, {
        tableName: "Task",
        partitionKey: "pk",
        sortKey: "sk",
    });
    private static _TaskManager = Task.GeneralManager.entityManager(Task);

    @attribute.string()
    description: string;

    @attribute.string()
    status: string;

    constructor(props: { pk: string; sk: string; description: string; status: string }) {
        super(props);
        this.description = props.description;
        this.status = props.status;
    }

    public static async init() {
        try {
            await Task.GeneralManager.createTable();
            console.log("Tabla Task creada");
        } catch (error) {
            console.error("Error al crear la tabla", error);
        }
    }

    public static get TaskManager() {
        return Task._TaskManager;
    }
}

//Task.init()
export default Task;