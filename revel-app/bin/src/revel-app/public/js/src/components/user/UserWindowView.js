import { User } from "../../models/entities/User.js"
import { USER_ROLE } from "./CUserTab.js";


export class UserWindowView{
    constructor(){

    }

    viewUpdateWindow(){
        let labelWidth = 100

        const body = {
          "autoheight": false,
          "view": "form",
          rules: {
            "email": webix.rules.isEmail,
          },
          "id": "updateForm",
          "rows": [
            { "view": "text", "label": "Номер", "name": "ID", "type": "number", "readonly": true, labelWidth: labelWidth, hidden: true },
            { "view": "text", "label": "Логин", "name": "login", "type": "text", required:true, labelWidth: labelWidth },
            { "view": "text", "label": "Пароль", "name": "password", "type": "text", required:true, labelWidth: labelWidth },
            { view:"select", label:"Роль", name:"role", options:[
                USER_ROLE.user,
                USER_ROLE.moderator,
                USER_ROLE.admin
              ] 
            },
            { "view": "button", "css": "webix_primary", "label": "Изменить", "id": "updateWindowButton" }
          ]
        };

        let updateWindow = {
          view:"window",
          height:400,
          move:true,
          resize: true,
          width:300,
          head:{
              view:"toolbar", cols:[
                  { view:"label", label: "Окно изменения" },
                  { view:"button", label: 'Close', id:"updateWindowClose" , width: 100, align: 'right'}
                ]
          },
          position:"center",
          body:body,
          close: true,
          id: "updateWindow"
        }

        return updateWindow
    }

    viewDeleteWindow(user){
        let labelWidth = 100

        let deleteWindow = {
            view:"window",
            move:true,
            resize: true,
            height: 300,
            width: 300,
            head:{
                view:"toolbar", cols:[
                    { view:"label", label: "Окно удаления" },
                    { view:"button", label: 'Close', id:"deleteWindowClose" , width: 100, align: 'right'}
                  ]
            },
            position:"center",
            body:{
              "rows": [
                {
                    "elements": [
                        { "label": "Информация", "type": "label",labelWidth: labelWidth },
                        { "label": "Фото", "type":"text", "value":  user.userPhoto,labelWidth: labelWidth},
                        { "label": "Логин", "type": "text", "value": user.login,labelWidth: labelWidth },
                        { "label": "Роль", "type":"text", "value": user.role,labelWidth: labelWidth },
                        { "label": "Последний визит", "type":"text", "value": user.lastVisites,labelWidth: labelWidth },
                      ],
                      "view": "property"
                },
                {
                  "cols": [
                    { "label": "Да", "view": "button", id:"deleteWindowButtonYes" },
                    { "label": "Нет", "view": "button", id:"deleteWindowButtonNo" }
                  ]
                }
              ]
            },
            close: true,
            id: "deleteWindow"
          }
          return deleteWindow
    }

    viewAboutWindow(user){
        let labelWidth = 250

        let aboutWindow = {
            view:"window",
            move:true,
            resize: true,
            height:300,
            width:300,
            head:{
                view:"toolbar", cols:[
                    { view:"label", label: "Окно информации" },
                    { view:"button", label: 'Close', id:"aboutWindowClose" , width: 100, align: 'right'}
                  ]
            },
            position:"center",
            body:{
              "elements": [
                { "label": "Информация", "type": "label" },
                { "label": "Логин", "type": "text", "value": user.login, labelWidth: labelWidth },
                { "label": "Роль", "type":"text", "value": user.role, labelWidth: labelWidth },
                { "label": "Последний визит", "type":"text", "value": String(user.lastVisited), labelWidth: labelWidth },
                { "label": "Фото", "type":"text", "value":  user.userPhoto, labelWidth: labelWidth},
              ],
              "view": "property"
            },
            close: true,
            id: "aboutWindow",
          }

          return aboutWindow
    }
}