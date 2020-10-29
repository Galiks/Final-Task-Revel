import { CEventWindow } from "./CEventWindow.js";
import { EventTabView } from "./EventTabView.js";
import { EventModel } from "../../models/EventModel.js";
import { EmployeeModel } from "../../models/EmployeeModel.js";
import { CandidateModel } from "../../models/CandidateModel.js";
import { CUserTab, USER_ACTION } from "../user/CUserTab.js";

export class CEventTab{
    constructor(){
        this.eventTabView = new EventTabView()
        this.eventWindowController = new CEventWindow()
        this.userTabController = new CUserTab()
        this.eventModel = new EventModel()
        this.employeeModel = new EmployeeModel()
        this.candidateModel = new CandidateModel()
    }

    /**
     * Метод для инициализации
     */
    init(){
        this.eventWindowController.init((datatableName) => this.refreshDatatable(datatableName))

        this.datatable = $$("events")
        this.cmenu = $$("eventcmenu")

        this.attachEvent()

        this.refreshDatatable("events")
    }

    /**
     * Метод обновляет данные в указанной таблице
     * @param {string} datatableName имя таблицы
     */
    refreshDatatable(datatableName){
        this.cmenu = $$("eventcmenu")
        let getData;
        if (datatableName == "events") {
            getData = this.eventModel.getEvents()
        }
        else if(datatableName == "candidates"){
            getData = this.candidateModel.getCandidates()
        }
        else if (datatableName == "employees"){
            getData = this.employeeModel.getEmloyees()
        }
        else {
            return
        }
        getData.then(async (data)=>{
            this.cmenu.clearAll()
            if (data.length == 0) {
                let cmenuOption = await getCmenuOptionForEmptyDatatable.call(this);
                this.cmenu.define("data", cmenuOption)
                let empty = [new Object]
                refreshDatatableData(datatableName, empty)
            }
            else{
                let cmenuOption = await getCmenuOptionForDatatable.call(this);
                this.cmenu.define("data", cmenuOption)
                refreshDatatableData(datatableName, data);
            }
            this.cmenu.refresh()
        })

        /**
         * Метод для обновления данных в указанной таблице
         * @param {string} datatableName имя таблицы
         * @param {Array} data массив данных
         */
        function refreshDatatableData(datatableName, data) {
            $$(datatableName).clearAll()
            $$(datatableName).parse(data)
            $$(datatableName).refresh()
        }

        async function getCmenuOptionForDatatable() {
            let role = await getCurrentUserRole.call(this)
            if (role == "Пользователь") {
                return USER_ACTION.user.events;
            }
            else if (role == "Модератор") {
                return USER_ACTION.moderator.events;
            }
            else if (role == "Администратор") {
                return USER_ACTION.admin.events;
            }
            else {
                return USER_ACTION.empty.emptys;
            }
        }     

        async function getCmenuOptionForEmptyDatatable() {
            let role = await getCurrentUserRole.call(this)
            if (role == "Пользователь") {
                return USER_ACTION.user.emptyEvents;
            }
            else if (role == "Модератор") {
                return USER_ACTION.moderator.emptys;
            }
            else if (role == "Администратор") {
                return USER_ACTION.admin.emptys;
            }
            else {
                return USER_ACTION.empty.emptys;
            }
        }
        
        async function getCurrentUserRole() {
            let user = await this.userTabController.getCurrentUser();
            if (user == undefined) {
                return "Нет роли";
            } else {
                return user.role;
            }
        }
    }


    /**
     * Метод для отрисовки главного элемента мероприятий
     * @returns конфигурация WEBIX 
     */
    config(){
        return this.eventTabView.view()
    }

    /**
     * Метод для привыязки событий
     */
    attachEvent(){
        this.cmenu.attachTo(this.datatable);
        this.attachEventToContextMenu(this)
    }

    /**
     * Метод для привязки событий к контекстному меню
     * @param {this} controller контекст класса CEventTab
     */
    attachEventToContextMenu(controller){
        this.cmenu.attachEvent("onItemClick", function(id){
            let context = this.getContext();
            let item = context.obj;
            let itemID = context.id;
            let event = item.getItem(itemID)
            if (this.getItem(id).value == "Добавить"){             
                controller.eventWindowController.createWindow()
            }
            else{
                if (!event){
                    webix.message("Нельзя выполнить данную функцию на пустом поле!")
                    return
                }
                if (this.getItem(id).value == "Удалить"){
                    controller.eventWindowController.deleteWindow(event)        
                }
                else if (this.getItem(id).value == "Изменить"){
                    controller.eventWindowController.updateWindow(event)
                }
                else if (this.getItem(id).value == "Подробнее"){
                    controller.eventWindowController.aboutWindow(event)
                }
                else if (this.getItem(id).value == "В архив"){
                    controller.eventWindowController.finishWindow(event)
                }  
            }
        })
    }
}