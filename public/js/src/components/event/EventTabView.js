import { USER_ACTION } from "../user/CUserTab.js"

export class EventTabView{
    constructor(){
        
    }
    /**
     * 
     */
    view(){

        let contextmenu = {
            view:"contextmenu",
            id:"eventcmenu",
            data : USER_ACTION.emptyDatatableForEmpty
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
            onContext:{
                webix_view:function(e, id){
                   id = this.locate(e.target|| e.srcElement);
                   if(!id){
                       $$("eventcmenu").setContext({ obj:webix.$$(e)});
                       $$("eventcmenu").show(e);
                       webix.html.preventEvent(e);
                   }
               }
            }
        }
    }
}