import { User } from "../../models/entities/User.js"

export class UserPopupView{

    constructor(){

    }

    loginPopupView(){
        let loginPopup =  {
            view:"popup",
            id:"loginPopup",
            body:{ 
              view:"form", id:"loginForm", width:200, elements:[
                {view:"text", label:"Логин", name:"login", placeholder:"Логин", align:"center", required:true},
                {view:"text", label:"Пароль", type:"password", name:"password", placeholder:"Пароль", align:"center", required:true},
                {view:"button", label:"Войти", id:"loginPopupButton"}
              ]
            }
        }

        return loginPopup
    }

    registerPopupView(){
        let registerPopup = {
            view:"popup",
            id:"registerPopup",
            body:{ 
              view:"form", id:"registerForm", elements:[
                {view:"text", label:"Логин", width:370, "labelWidth":150, name:"login", placeholder:"Логин", align:"left", required:true},
                {view:"text", label:"Пароль", type:"password", "labelWidth":150, name:"password", placeholder:"Пароль", align:"left", required:true},
                {view:"text", label:"Повторите пароль", "labelWidth":150, type:"password", name:"repeatPassword", placeholder:"Повторите пароль", align:"left", required:true},
                {view:"button", label:"Зарегистрироваться", id:"registerPopupButton"}
              ]
            }
        }
        return registerPopup
    }

    /**
     * 
     * @param {User} user информация о пользователе 
     */
    aboutPopupView(user){
      let aboutUser = {
        view:"popup",
        id:"userPopup",
        body:{ 
          rows:[
            { 
              "elements": [
              { "label": "Информация", "type": "label" },
              { "label": "Логин", labelWidth:150, "view": "text", "value": user.login, readonly:true },
              { "label": "Дата входа", labelWidth:150, "view":"text", "value": user.lastVisited, readonly:true },
              { "label": "Роль", labelWidth:150, "view":"text", "value": user.role, readonly:true}
            ],
              "view": "property",
              width:250
            },
            { view:"button", label:"Выход", id:"logoutButton"}
          ]
        }
      }

      return aboutUser
    }
}