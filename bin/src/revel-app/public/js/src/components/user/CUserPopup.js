import { UserModel } from "../../models/UserModel.js";
import { CCandidateTab } from "../candidate/CCandidateTab.js";
import { CEmployeeTab } from "../employee/CEmployeeTab.js";
import { CEventTab } from "../event/CEventTab.js";
import { CUserTab, USER_ACTION } from "./CUserTab.js";
import { UserPopupView } from "./UserPopupView.js";

export class CUserPopup{
    constructor(){
        this.userPopupView = new UserPopupView()
        this.userTabController = new CUserTab()
        this.userModel = new UserModel()
        this.eventTabController = new CEventTab()
        this.employeeTabController = new CEmployeeTab()
        this.candidateTabController = new CCandidateTab()
    }

    async init(){
        this.loginPopup()
        this.registerPopup()
        this.loginButton = $$("loginButton")
        this.registerButton = $$("registerButton")
        this.userIcon = $$("userIcon")
        this.form = {
            login: $$("loginForm"),
            register: $$("registerForm")
        }

        await this.check();
    }

    async check() {
        let check = await this.userModel.check();
        if (check != false) {
            this.currentUser = await this.userTabController.getCurrentUser();
            this.aboutPopup();
            if (this.currentUser.role == "Модератор" || this.currentUser.role == "Администратор"){
                this.userTabController.init()
            }
        }
    }

    /**
     * Метод обновляет все таблицы
     */
    refreshDatatablesCmenus(){
        this.eventTabController.refreshDatatable("events")
        this.employeeTabController.refreshDatatable()
        this.candidateTabController.refreshDatatable()
        if (this.currentUser != null) {
            if (this.currentUser.role == "Модератор" || this.currentUser.role == "Администратор"){
                this.userTabController.refreshDatatable()
            }
        }
    }

    attachEventLoginPopup(){
        $$("loginPopupButton").attachEvent("onItemClick", async ()=>{
            this.loginButton.disable()
            this.registerButton.disable()
            this.userIcon.disable()

            let values = this.form.login.getValues()

            let result = await this.userModel.login(values.login, values.password)
            if (result == false) {
                falseAuth(this)
                return
            } else {
                let user = await this.userModel.getCurrentUser()
                if (user != undefined) {
                    this.currentUser = user
                    this.userIcon.enable()
                    this.aboutPopup()
                    if (this.currentUser.role == "Модератор" || this.currentUser.role == "Администратор"){
                        this.userTabController.init()
                    }
                }
                else{
                    falseAuth(this)
                }
            }

            this.refreshDatatablesCmenus()

            function falseAuth(controller){
                controller.loginButton.enable()
                controller.registerButton.enable()
                controller.userIcon.enable()
                webix.message("Ошибка. Неправильный логин или пароль!")
            }

        
        })
    }

    attachEventRegisterPopup(){
        $$("registerPopupButton").attachEvent("onItemClick", ()=>{

            this.loginButton.disable()
            this.registerButton.disable()
            this.userIcon.disable()

            const values = this.form.register.getValues()
            if (values.password != values.repeatPassword) {
                webix.message("Пароли не совпадают!")
                this.form.register.clear()
            }
            else{
                this.userModel.createUser(values).then((user) =>{
                    this.loginButton.enable()
                    this.registerButton.enable()
                    this.userIcon.enable()
                })
            }
        })
    }

    attachEventAboutPopup(){
        this.loginButton.disable()
        this.registerButton.disable()
        this.userIcon.define("popup", "userPopup")
        this.userIcon.refresh()

        $$("logoutButton").attachEvent("onItemClick", async ()=>{

            this.loginButton.disable()
            this.registerButton.disable()
            this.userIcon.disable()

            this.currentUser.lastVisited = new Date()
            await this.userModel.logout()

            this.currentUser = null

            this.userIcon.disable()
            this.loginButton.enable()
            this.registerButton.enable()

            this.userTabController.removeComponents()

            this.refreshDatatablesCmenus()
        })
    }

    loginPopup(){
        webix.ui(this.userPopupView.loginPopupView())

        this.attachEventLoginPopup()
    }

    registerPopup(){
        webix.ui(this.userPopupView.registerPopupView())

        this.attachEventRegisterPopup()
    }

    aboutPopup(){
        webix.ui(this.userPopupView.aboutPopupView(this.currentUser))
        this.attachEventAboutPopup()
    }
}
