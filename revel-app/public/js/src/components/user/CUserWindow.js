import { User } from "../../models/entities/User.js";
import { UserModel } from "./../../models/UserModel.js";
import { UserWindow } from "./UserWindowView.js";

export class CUserWindow{
    constructor(){
        this.userWindow = new UserWindow()
        this.userModel = new UserModel()
        this.currentUser = new User();
    }

    async init(){
        this.loginWindow()
        this.registerWindow()
        this.loginButton = $$("loginButton")
        this.registerButton = $$("registerButton")
        this.userIcon = $$("userIcon")
        this.form = {
            login: $$("loginForm"),
            register: $$("registerForm")
        }

        let check = await this.userModel.check()
        if (check != false){
            this.currentUser = await this.userModel.getCurrentUser()
            this.aboutWindow()
        }
    }



    attachEventLoginWindow(){
        $$("loginPopupButton").attachEvent("onItemClick", async ()=>{
            this.loginButton.disable()
            this.registerButton.disable()
            this.userIcon.disable()

            let values = this.form.login.getValues()

            let result = await this.userModel.login(values.login, values.password)
            if (result != false) {
                this.currentUser = await this.userModel.getCurrentUser()
                this.userIcon.enable()
                this.aboutWindow()
            } else {
                this.loginButton.enable()
                this.registerButton.enable()
                this.userIcon.enable()
            }
        })
    }

    attachEventRegisterWindow(){
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

    attachEventAboutWindow(){
        this.loginButton.disable()
        this.registerButton.disable()
        this.userIcon.define("popup", "userPopup")
        this.userIcon.refresh()

        $$("logoutButton").attachEvent("onItemClick", async ()=>{

            this.loginButton.disable()
            this.registerButton.disable()
            this.userIcon.disable()

            this.currentUser.lastVisited = new Date()

            await this.userModel.updateUser(this.currentUser)
            await this.userModel.logout()

            this.currentUser = null

            this.userIcon.disable()
            this.loginButton.enable()
            this.registerButton.enable()
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
}


export const USER_ROLE = {
    user: "Пользователь",
    moderator: "Модератор",
    admin: "Admin"
}