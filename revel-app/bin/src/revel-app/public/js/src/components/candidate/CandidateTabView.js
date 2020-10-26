import { USER_ACTION } from "../user/CUserTab.js";
import { Candidate } from "./../../models/entities/Candidate.js";

export class CandidateTabView{
    constructor(){

    }

    /**
     * 
     * @param {Candidate[]} candidates 
     */
    view(){

        let contextmenu = {
            view:"contextmenu",
            id:"candidatecmenu",
            // data:["Добавить","Удалить", "Изменить",{ $template:"Separator" },"Подробнее"]
            data:USER_ACTION.emptyDatatableForEmpty
        }

        webix.ui(contextmenu)

        return {
            "columns": [
                { "id": "ID", "header":"Номер", "sort":"number", "fillspace": true,},
                { "id": "firstname", "header": "Имя",  "fillspace": true},
                { "id": "lastname", "header": "Фамилия",  "fillspace": true},
                { "id": "patronymic", "header": "Отчество", "fillspace": true },
                { "id": "email", "header": "Email", "fillspace": true},
                { "id": "phone", "header": "Телефон", "fillspace": true, "format":"1-11"},
                { "id": "status", "header": "Статус", "fillspace": true}
            ],
            "view": "datatable",
            "height": 0,
            "select": true,
            "id": "candidates",
            "onContext":{}
        }
    }
}