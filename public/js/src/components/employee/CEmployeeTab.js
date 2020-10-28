import { EmployeeModel } from "../../models/EmployeeModel.js";
import { CUserPopup } from "../user/CUserPopup.js";
import { CEmployeeWindow} from "./CEmployeeWindow.js";
import { EmployeeTabView } from "./EmployeeTabView.js";
import { CUserTab, USER_ACTION } from "../user/CUserTab.js";

export class CEmployeeTab{

    constructor(){
        this.employeeWindowController = new CEmployeeWindow()
        this.employeeTabView = new EmployeeTabView()
        this.userTabController = new CUserTab()
        this.employeeModel = new EmployeeModel()
    }

    /**
     * Метод для инициализации
     */
    init(){
        this.datatable = $$("employees")
        this.cmenu = $$("employeecmenu")

        this.refreshDatatable()

        this.employeeWindowController.init(()=>{this.refreshDatatable()})
        this.attachEvent()
    }

    /**
     * Метод обновляет данные в таблице employees
     */
    refreshDatatable(){
        this.cmenu = $$("employeecmenu")
        this.employeeModel.getEmloyees().then(async (data)=>{
            this.cmenu.clearAll()
            if (data.length == 0) {
                let cmenuOption = await getCmenuOptionForEmptyDatatable.call(this)
                this.cmenu.define("data", cmenuOption)
                this.cmenu.refresh()
            }else{
                let cmenuOption = await getCmenuOptionForDatatable.call(this);
                this.cmenu.define("data", cmenuOption)
                this.cmenu.refresh()
                refreshDatatableData(data);
            }
        })

        /**
         * Метод для обновления данных в таблице employees
         * @param {Array} data массив данных
         * @param {this} controller контекст контроллера
         */
        function refreshDatatableData(data) {
            let datatable = $$("employees")
            datatable.clearAll();
            datatable.parse(data);
            datatable.refresh();
        }

        async function getCmenuOptionForDatatable() {
            let role = await getCurrentUserRole.call(this)
            if (role == "Пользователь"){
                return USER_ACTION.user.employees
            }
            else if (role == "Модератор"){
                return USER_ACTION.moderator.employees
            }
            else if (role == "Администратор"){
                return USER_ACTION.admin.employees
            }
            else{
                return USER_ACTION.empty.emptys
            }
        }     

        async function getCmenuOptionForEmptyDatatable() {
            let role = await getCurrentUserRole.call(this)
            if (role == "Пользователь"){
                return USER_ACTION.user.emptys
            }
            else if (role == "Модератор"){
                return USER_ACTION.moderator.emptys
            }
            else if (role == "Администратор"){
                return USER_ACTION.admin.emptys
            }
            else{
                return USER_ACTION.empty.emptys
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
            let employee = item.getItem(itemID)
            if (this.getItem(id).value == "Добавить"){   
                controller.employeeWindowController.createWindow()
            }
            else{
                if (!employee){
                    webix.message("Нельзя выполнить данную функцию на пустом поле!")
                    return
                }
                if (this.getItem(id).value == "Удалить"){
                    controller.employeeWindowController.deleteWindow(employee)
                }
                else if (this.getItem(id).value == "Изменить"){
                    controller.employeeWindowController.updateWindow(employee)          
                }
                else if (this.getItem(id).value == "Подробнее"){
                    controller.employeeWindowController.aboutWindow(employee)
                }   
            }        
          });
    }
}