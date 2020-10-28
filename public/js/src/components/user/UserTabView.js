export class UserTabView{
    constructor(){

    }


    view(){
        let contextmenu = {
            view:"contextmenu",
            id:"usercmenu",
            data : ["Удалить", "Изменить", "Сменить пароль",{ $template:"Separator" },"Подробнее"]
        }

        webix.ui(contextmenu)   

        return {
            "header":{
                "label":"HEADER"
            },
            "columns": [
                { "id": "ID", "header": "Номер", "sort": "number" },
                { "id": "login", "header": "Логин", "fillspace": true},
                { "id": "lastVisited", "header": "Последний визит", "fillspace":true },
                { "id": "role", "header": "Роль", "fillspace":true }
            ],
            "view": "datatable",
            "id":"users",
            "select":true,
        }
    }
}