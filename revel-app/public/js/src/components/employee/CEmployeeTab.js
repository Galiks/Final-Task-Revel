import { EmployeeModel } from "../../models/EmployeeModel.js";
import { CEmployeeWindow} from "./CEmployeeWindow.js";
import { EmployeeTabView } from "./EmployeeTabView.js";

export class CEmployeeTab{

    constructor(){
        this.employeeWindowController = new CEmployeeWindow()
        this.employeeTabView = new EmployeeTabView()
    }

    /**
     * Метод для инициализации
     */
    init(){
        this.datatable = $$("employees")
        this.cmenu = $$("employeecmenu")

        this.employeeModel = new EmployeeModel()

        this.refreshDatatable()

        this.employeeWindowController.init(this.employeeModel, ()=>{this.refreshDatatable()})
        this.attachEvent()
    }

    /**
     * Метод обновляет данные в таблице employees
     */
    refreshDatatable(){
        this.employeeModel.getEmloyees().then((data)=>{
            if (data.length == 0) {
                this.cmenu.clearAll()
                this.cmenu.define("data", ["Добавить"])
                this.cmenu.refresh()
                let empty = [new Object]
                refreshDatatableData(empty, this)
            }else{
                this.cmenu.clearAll()
                this.cmenu.define("data", ["Добавить","Удалить", "Изменить", { $template:"Separator" },"Подробнее"])
                this.cmenu.refresh()
                refreshDatatableData(data, this);
            }
        })

        /**
         * Метод для обновления данных в таблице employees
         * @param {Array} data массив данных
         * @param {this} controller контекст контроллера
         */
        function refreshDatatableData(data, controller) {
            controller.datatable.clearAll();
            controller.datatable.parse(data);
            controller.datatable.refresh();
        }
    }

    /**
     * Метод отрисовывает главный элемент сотрудников
     * @returns конфигурация WEBIX
     */
    config(){
        return this.employeeTabView.view()
    }

    /**
     * Метод для привязки событий
     */
    attachEvent(){
        this.cmenu.attachTo(this.datatable);
        this.attachEventWindowHandler(this)
    }

    /**
     * Метод для привязки событий к контекстному меню
     * @param {this} controller контекст класса CEmployeeTab
     */
    attachEventWindowHandler(controller){
        this.cmenu.attachEvent("onItemClick", function(id) {
            let context = this.getContext();
            let item = context.obj;
            let itemID = context.id;
            let element = item.getItem(itemID)
            if (this.getItem(id).value == "Добавить"){   
                controller.employeeWindowController.createWindow()
            }
            else if (this.getItem(id).value == "Удалить"){
                controller.employeeWindowController.deleteWindow(element)
            }
            else if (this.getItem(id).value == "Изменить"){
                controller.employeeWindowController.updateWindow(element)          
            }
            else if (this.getItem(id).value == "Подробнее"){
                controller.employeeWindowController.aboutWindow(element)
            }           
          });
    }
}