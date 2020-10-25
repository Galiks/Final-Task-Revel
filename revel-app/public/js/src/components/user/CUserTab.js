import { UserModel } from "./../../models/UserModel.js";
import { CUserWindow } from "./CUserWindow.js";
import { UserTabView } from "./UserTabView.js";

export class CUserTab{
    constructor(){
        this.userModel = new UserModel()
        this.userTabView = new UserTabView()
        this.userWindowController = new CUserWindow()
    }

    init(){
        this.addComponents()
        this.datatable = $$("users")
        this.cmenu = $$("usercmenu")
        this.refreshDatatable()
        this.attachEvent()
        this.userWindowController.init(()=>this.refreshDatatable())
    }

    config(){
        return this.userTabView.view()
    }

    addComponents(){
        $$("tabbar").addOption({ value:'Пользователи', id:'users'}, true)
        let users = this.config()
        $$("maincells").addView(users)
    }

    removeComponents(){
        $$("tabbar").removeOption('users')
        $$("maincells").removeView('users')
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
     * @param {CUserTab} controller контекст класса CUserTab
     */
    attachEventToContextMenu(controller){
        this.cmenu.attachEvent("onItemClick", function(id){
            let context = this.getContext();
            let item = context.obj;
            let itemID = context.id;
            let user = item.getItem(itemID)
            if (this.getItem(id).value == "Удалить"){
                controller.userWindowController.deleteWindow(user)       
            }
            else if (this.getItem(id).value == "Изменить"){
                controller.userWindowController.updateWindow(user)
            }
            else if (this.getItem(id).value == "Подробнее"){
                controller.userWindowController.aboutWindow(user)
            }
        })
    }

     /**
     * Метод обновляет данные в таблице users
     */
    refreshDatatable(){
        this.userModel.getUsers().then((data)=>{
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
         * Метод для обновления данных в таблице users
         * @param {Array} data массив данных
         * @param {this} controller контекст контроллера CUserTab 
         */
        function refreshDatatableData(data, controller) {
            controller.datatable.clearAll();
            controller.datatable.parse(data);
            controller.datatable.refresh();
        }
    }
}

export const USER_ROLE = {
    empty: "Нет роли",
    user: "Пользователь",
    moderator: "Модератор",
    admin: "Admin"
}