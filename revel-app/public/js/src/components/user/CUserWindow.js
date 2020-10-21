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
        this.loginButton = $$("loginButton")
        this.registerButton = $$("registerButton")
        this.userIcon = $$("userIcon")
    }

    attachEventLoginWindow(){
        $$("loginPopupButton").attachEvent("onItemClick", ()=>{
            this.loginButton.disable()
            this.registerButton.disable()
            this.userIcon.disable()

            let values = this.fetch("loginForm")

            
            this.userModel.getUserByLoginAndPassword(values.login, values.password).then((user)=>{
                if (user != null) {
                    this.currentUser = user
                    this.loginButton.disable()
                    this.registerButton.disable()
                    this.userIcon.enable()
                    this.aboutWindow()
                }
                else{
                    this.loginButton.enable()
                    this.registerButton.enable()
                    this.userIcon.enable()
                }
            })
            
            
        })
    }

    attachEventRegisterWindow(){
        $$("registerPopupButton").attachEvent("onItemClick", ()=>{

            this.loginButton.disable()
            this.registerButton.disable()
            this.userIcon.disable()

            const values = this.fetch("registerForm")
            if (values.password != values.repeatPassword) {
                webix.message("Пароли не совпадают!")
                $$("registerForm").clear()
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

    attachEventAboutWindow(){
        this.userIcon.define("popup", "userPopup")
        this.userIcon.refresh()

        $$("logoutButton").attachEvent("onItemClick", ()=>{

            this.loginButton.disable()
            this.registerButton.disable()
            this.userIcon.disable()

            this.currentUser.lastVisited = new Date()

            this.userModel.updateUser(this.currentUser).then((updatingUser) =>{
                this.currentUser = null
                this.userIcon.disable()
                this.loginButton.enable()
                this.registerButton.enable()
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


export const USER_ROLE = {
    user: "Пользователь",
    moderator: "Модератор",
    admin: "Admin"
}