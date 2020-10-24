import { User } from "../../models/entities/User.js"


export class UserWindow{
    constructor(){

    }

    loginView(){

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

    registerView(){
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

    aboutUserView(user){
      let aboutUser = {
        view:"popup",
        id:"userPopup",
        body:{ 
          rows:[
            { 
              "elements": [
              { "label": "Информация", "type": "label" },
              { "label": "Логин", "type": "text", "value": user.login },
              { "label": "Последний визит", "type":"text", "value": user.lastVisited, "labelWidth":150 },
              { "label": "Роль", "type":"text", "value": user.role}
            ],
              "view": "property"
            },
            { view:"button", label:"Выход", id:"logoutButton"}
          ]
        }
      }

      return aboutUser
    }
}