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

    async getCurrentUser(){
        return await this.userModel.getCurrentUser()
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
     * @param {this} controller контекст класса CUserTab
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
            else if (this.getItem(id).value == "Сменить пароль"){
                controller.userWindowController.changePasswordWindow(user)
            }
            else if (this.getItem(id).value == "Назначить сотрудника"){
                controller.userWindowController.setUserToEmployee(user)
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
        this.userModel.getUsers().then(async (data)=>{
            this.cmenu.clearAll()
            if (data.length == 0) {
                let cmenuOption = await getCmenuOptionForEmptyDatatable.call(this)
                this.cmenu.define("data", cmenuOption)
                let empty = [new Object]
                refreshDatatableData(empty, this)
            }else{
                let cmenuOption = await getCmenuOptionForDatatable.call(this);
                this.cmenu.define("data", cmenuOption)
                refreshDatatableData(data, this);
            }
            this.cmenu.refresh()
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

        async function getCmenuOptionForDatatable() {
            let role = await getCurrentUserRole.call(this)
            if (role == "Пользователь"){
                return USER_ACTION.user.emptys
            }
            else if (role == "Модератор"){
                return USER_ACTION.moderator.users
            }
            else if (role == "Администратор"){
                return USER_ACTION.admin.users
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
            let user = await this.getCurrentUser();
            if (user == undefined) {
                return "Нет роли";
            } else {
                return user.role;
            }
        }
    }
}

export const USER_ROLE = {
    empty: "Нет роли",
    user: "Пользователь",
    moderator: "Модератор",
    admin: "Администратор"
}

export const USER_ACTION = {
    empty: {
        emptys: null,
        events: ["Подробнее"],
        employees: ["Подробнее"],
        candidates: ["Подробнее"]
    },
    user: {
        emptys: null,
        emptyEvents: ["Добавить"],
        events: ["Добавить", "Изменить", "В архив",{ $template:"Separator" },"Подробнее"],
        employees: ["Добавить", { $template:"Separator" },"Подробнее"],
        candidates: ["Добавить", { $template:"Separator" },"Подробнее"],
    },
    moderator: {
        emptys: ["Добавить"],
        events: ["Добавить","Удалить", "Изменить", "В архив",{ $template:"Separator" },"Подробнее"],
        employees: ["Добавить", "Изменить",{ $template:"Separator" },"Подробнее"],
        candidates: ["Добавить", "Изменить",{ $template:"Separator" },"Подробнее"],
        users: ["Изменить",{ $template:"Separator" },"Подробнее"] 
    },
    admin: {
        emptys: ["Добавить"],
        events: ["Добавить","Удалить", "Изменить", "В архив",{ $template:"Separator" },"Подробнее"],
        employees: ["Добавить","Удалить", "Изменить",{ $template:"Separator" },"Подробнее"],
        candidates: ["Добавить","Удалить", "Изменить",{ $template:"Separator" },"Подробнее"],
        users: ["Удалить", "Изменить", "Сменить пароль", "Назначить сотрудника",{ $template:"Separator" },"Подробнее"]
    }
}