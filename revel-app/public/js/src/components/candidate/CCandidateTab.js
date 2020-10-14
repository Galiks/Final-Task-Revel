import { CCandidateWindow } from "./CCandidateWindow.js";
import { CandidateTabView } from "./CandidateTabView.js";
import { CandidateModel } from "../../models/CandidateModel.js";

export class CCandidateTab{
    constructor(){
        this.candidateWindowController = new CCandidateWindow()
        this.candidateTabView = new CandidateTabView()
    }

    /**
     * Метод для инициализации
     */
    init(){

        this.cmenu = $$("candidatecmenu")
        this.datatable = $$("candidates")

        this.candidateModel = new CandidateModel()

        this.candidateWindowController.init(this.candidateModel, ()=>{this.refreshDatatable()})
        this.attachEvent()

        this.refreshDatatable()
    }

     /**
     * Метод обновляет данные в таблице candidates
     */
    refreshDatatable(){
        this.candidateModel.getCandidates().then((data)=>{
            if (data.length == 0) {
                this.cmenu.clearAll()
                this.cmenu.define("data", ["Добавить"])
                this.cmenu.refresh()
                let empty = [new Object]
                this.refreshDatatableData(empty)
            }else{
                this.cmenu.clearAll()
                this.cmenu.define("data", ["Добавить","Удалить", "Изменить", { $template:"Separator" },"Подробнее"])
                this.cmenu.refresh()
                this.refreshDatatableData(data);
            }
        })
    }

    /**
     * Метод для обновления данных в таблице candidates
     * @param {Array} data массив данных
     */
    refreshDatatableData(data) {
        this.datatable.clearAll();
        this.datatable.parse(data);
        this.datatable.refresh();
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