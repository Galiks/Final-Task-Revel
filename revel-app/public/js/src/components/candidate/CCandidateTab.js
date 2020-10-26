import { CCandidateWindow } from "./CCandidateWindow.js";
import { CandidateTabView } from "./CandidateTabView.js";
import { CandidateModel } from "../../models/CandidateModel.js";
import { CUserPopup } from "../user/CUserPopup.js";
import { CUserTab, USER_ACTION } from "../user/CUserTab.js";

export class CCandidateTab{
    constructor(){
        this.candidateWindowController = new CCandidateWindow()
        this.candidateTabView = new CandidateTabView()
        this.userTabController = new CUserTab()
        this.candidateModel = new CandidateModel()
    }

    /**
     * Метод для инициализации
     */
    init(){

        this.cmenu = $$("candidatecmenu")
        this.datatable = $$("candidates")

        this.candidateWindowController.init(()=>{this.refreshDatatable()})
        this.attachEvent()

        this.refreshDatatable()
    }

     /**
     * Метод обновляет данные в таблице candidates
     */
    refreshDatatable(){
        this.candidateModel.getCandidates().then(async (data)=>{
            let user = await this.userTabController.getCurrentUser();
            let role = ""
            if  (user == undefined){
                role = "Нет роли"
            }else{
                role = user.role
            }
            if (data.length == 0) {
                this.cmenu.clearAll()
                if (role == "Пользователь"){
                    this.cmenuOption = USER_ACTION.user.emptys
                }
                else if (role == "Модератор"){
                    this.cmenuOption = USER_ACTION.moderator.emptys
                }
                else if (role == "Администратор"){
                    this.cmenuOption = USER_ACTION.admin.emptys
                }
                else{
                    this.cmenuOption = USER_ACTION.empty.emptys
                }
                this.cmenu.define("data", this.cmenuOption)
                this.cmenu.refresh()
                let empty = [new Object]
                refreshDatatableData(empty, this)
            }else{
                this.cmenu.clearAll()
                if (role == "Пользователь"){
                    this.cmenuOption = USER_ACTION.user.candidates
                }
                else if (role == "Модератор"){
                    this.cmenuOption = USER_ACTION.moderator.candidates
                }
                else if (role == "Администратор"){
                    this.cmenuOption = USER_ACTION.admin.candidates
                }
                else{
                    this.cmenuOption = USER_ACTION.empty.emptys
                }
                this.cmenu.define("data", this.cmenuOption)
                this.cmenu.refresh()
                refreshDatatableData(data, this);
            }
        })

        /**
         * Метод для обновления данных в таблице candidates
         * @param {Array} data массив данных
         */
        function refreshDatatableData(data, controller) {
            controller.datatable.clearAll();
            controller.datatable.parse(data);
            controller.datatable.refresh();
        }
    }

    /**
     * Метод для отображения главного окна кандидатов
     * @returns конфигурация WEBIX
     */
    config(){
        return this.candidateTabView.view()
    }

    /**
     * Метод для привязки событий
     */
    attachEvent(){
        this.cmenu.attachTo(this.datatable);

        this.attachEventWindowHandler(this)
    }

    /**
     * Метод для привязки событий к контекстному меню кандидатов
     * @param {this} controller 
     */
    attachEventWindowHandler(controller){
        $$("candidatecmenu").attachEvent("onItemClick", function(id) {
            let context = this.getContext();
            let item = context.obj;
            let itemID = context.id;
            let candidate = item.getItem(itemID)
            if (this.getItem(id).value == "Добавить"){   
                controller.candidateWindowController.createWindow()
            }
            else if (this.getItem(id).value == "Удалить"){
                controller.candidateWindowController.deleteWindow(candidate)
            }
            else if (this.getItem(id).value == "Изменить"){
                controller.candidateWindowController.updateWindow(candidate)          
            }
            else if (this.getItem(id).value == "Подробнее"){
                controller.candidateWindowController.aboutWindow(candidate)
            }           
          });
    }
}