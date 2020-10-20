import { Employee } from "./../../models/entities/Employee.js";

export class EmployeeTabView{

    
    view(){
        let contextmenu = {
            view:"contextmenu",
            id:"employeecmenu",
            data:["Добавить","Удалить", "Изменить",{ $template:"Separator" },"Подробнее"]
        }

        webix.ui(contextmenu)

        return {
            "columns": [
                { "id": "ID", "header":"Номер", "fillspace": true},
                { "id": "firstname", "header": "Имя", "fillspace": true },
                { "id": "lastname", "header": "Фамилия", "fillspace": true},
                { "id": "patronymic", "header": "Отчество", "fillspace": true },
                { "id": "position", "header": "Должность", "fillspace": true },
                { "id": "email", "header": "Email", "fillspace": true },
                { "id": "phone", "header": "Телефон", "fillspace": true }
            ],
            "view": "datatable",
            "height": 0,
            "select": true,
            "id": "employees",
            "onContext":{}
        }
    }
}