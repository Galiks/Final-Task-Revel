import { Event } from './../../models/entities/Event.js';

export class EventTabView{
    constructor(){
        
    }
    /**
     * 
     * @param {Event[]} events
     */
    view(){

        let contextmenu = {
            view:"contextmenu",
            id:"eventcmenu",
            data : ["Добавить","Удалить", "Изменить", "Завершить",{ $template:"Separator" },"Подробнее"]
        }

        webix.ui(contextmenu)   

        return {
            "header":{
                "label":"HEADER"
            },
            "columns": [
                { "id": "ID", "header": "Номер", "sort": "number" },
                { "id": "theme", "header": "Тема", "fillspace": true, "sort": "string" },
                { "id": "beginning", "header": "Начало", "fillspace":true, },
                { "id": "status", "header": ["Статус", {content:"selectFilter"}], "fillspace":true, "sort": "number" }
            ],
            "view": "datatable",
            "id":"events",
            "select":true,
        }
    }
}