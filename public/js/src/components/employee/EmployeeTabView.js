import { USER_ACTION } from "../user/CUserTab.js";

export class EmployeeTabView{

    
    view(){
        let contextmenu = {
            view:"contextmenu",
            id:"employeecmenu",
            data:USER_ACTION.emptyDatatableForEmpty
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
                { "id": "phone", "header": "Телефон", "fillspace": true, "format":"1-11" }
            ],
            "view": "datatable",
            "height": 0,
            "select": true,
            "id": "employees",
            onContext:{
                webix_view:function(e, id){
                   id = this.locate(e.target|| e.srcElement);
                   if(!id){
                       $$("employeecmenu").setContext({ obj:webix.$$(e)});
                       $$("employeecmenu").show(e);
                       webix.html.preventEvent(e);
                   }
               }
            }
        }
    }
}