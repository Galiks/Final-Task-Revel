import { User } from "../../models/entities/User.js";
import { UserModel } from "./../../models/UserModel.js";
import { UserWindow } from "./UserWindowView.js";

export class CUserWindow{
    constructor(){
        this.userWindow = new UserWindow()
        this.userModel = new UserModel()
        this.currentUser = new User();
    }

    init(){
        this.loginWindow()
        this.registerWindow()
    }

    attachEventLoginWindow(){
        $$("loginPopupButton").attachEvent("onItemClick", ()=>{
            $$("loginButton").disable()
            $$("registerButton").disable()
            $$("userIcon").disable()

            let values = this.fetch("loginForm")

            if(values.login == "admin" && values.password == "admin"){
                this.currentUser = new User(0, "admin", "admin", null, new Date())
                $$("loginButton").disable()
                $$("registerButton").disable()
                $$("userIcon").enable()
                this.aboutWindow()
            }
            else{
                this.userModel.getUserByLoginAndPassword(values.login, values.password).then((user)=>{
                    if (user != null) {
                        this.currentUser = user
                        $$("loginButton").disable()
                        $$("registerButton").disable()
                        $$("userIcon").enable()
                        this.aboutWindow()
                    }
                    else{
                        $$("loginButton").enable()
                        $$("registerButton").enable()
                        $$("userIcon").enable()
                    }
                })
            }
            
        })
    }

    attachEventRegisterWindow(){
        $$("registerPopupButton").attachEvent("onItemClick", ()=>{

            $$("loginButton").disable()
            $$("registerButton").disable()
            $$("userIcon").disable()

            const values = this.fetch("registerForm")
            if (values.password != values.repeatPassword) {
                webix.message("Пароли не совпадают!")
                $$("registerForm").clear()
            }
            else{
                this.userModel.createUser(values).then((user) =>{
                    $$("loginButton").enable()
                    $$("registerButton").enable()
                    $$("userIcon").enable()
                })
            }
        })
    }

    attachEventAboutWindow(){
        $$("userIcon").define("popup", "userPopup")
        $$("userIcon").refresh()

        $$("logoutButton").attachEvent("onItemClick", ()=>{

            $$("loginButton").disable()
            $$("registerButton").disable()
            $$("userIcon").disable()

            this.currentUser.lastVisited = new Date()

            this.userModel.updateUser(this.currentUser).then((updatingUser) =>{
                this.currentUser = null
                $$("userIcon").disable()
                $$("loginButton").enable()
                $$("registerButton").enable()
            })
        })
    }

    loginWindow(){
        webix.ui(this.userWindow.loginView())

        this.attachEventLoginWindow()
    }

    registerWindow(){
        webix.ui(this.userWindow.registerView())

        this.attachEventRegisterWindow()
    }

    aboutWindow(){
        webix.ui(this.userWindow.aboutUserView(this.currentUser))

        this.attachEventAboutWindow()
    }

    /**
     * Метод возвращает данные с формы
     * @param {string} formName имя формы
     * @returns данные с формы
     */
    fetch(formName){
        return $$(formName).getValues()
    }

    /**
     * Метод для заполнение формы данными
     * @param {string} formName имя формы
     * @param {*} values значения
     */
    parse(formName, values){
        $$(formName).setValues(values)
    }
}