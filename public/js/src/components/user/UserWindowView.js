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
          "id": "updateForm",
          "rows": [
            { "view": "text", "label": "Номер", "name": "ID", "type": "number", "readonly": true, labelWidth: labelWidth, hidden: true },
            { "view": "text", "label": "Логин", "name": "login", "type": "text", required:true, labelWidth: labelWidth },
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

    viewChangePasswordWindow(){
      let labelWidth = 100

        const body = {
          "autoheight": false,
          "view": "form",
          "id": "changePasswordForm",
          "rows": [
            { "view": "text", "label": "Номер", "name": "ID", "type": "number", "readonly": true, labelWidth: labelWidth, hidden: true },
            { "view": "text", "label": "Пароль", "name": "password", "type": "password", required:true, labelWidth: labelWidth },
            { "view": "text", "label": "Повторите пароль", "name": "repeatPassword", "type": "password", required:true, labelWidth: labelWidth },
            { "view": "button", "css": "webix_primary", "label": "Изменить", "id": "changePasswordWindowButton" }
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
                  { view:"label", label: "Окно смены пароля" },
                  { view:"button", label: 'Close', id:"changePasswordWindowClose" , width: 100, align: 'right'}
                ]
          },
          position:"center",
          body:body,
          close: true,
          id: "changePasswordWindow"
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
                        { "label": "Хотите удалить?", "type": "label" },
                        { "label": "Логин", "view": "text", "value": user.login,labelWidth: labelWidth, readonly:true },
                        { "label": "Роль", "view":"text", "value": user.role,labelWidth: labelWidth, readonly:true },
                        { "label": "Дата входа", "view":"text", "value": String(user.lastVisited),labelWidth: labelWidth, readonly:true },
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
                { "label": "Логин", "view": "text", "value": user.login, labelWidth: labelWidth, readonly:true },
                { "label": "Роль", "view":"text", "value": user.role, labelWidth: labelWidth, readonly:true },
                { "label": "Последний визит", "view":"text", "value": String(user.lastVisited), "labelWidth": labelWidth, readonly:true },
              ],
              "view": "property"
            },
            close: true,
            id: "aboutWindow",
          }

          return aboutWindow
    }

    viewSetUserToEmployee(user){
      let labelWidth = 250

      let employeesView = {
        "options": [],
        "label": "Сотрудники",
        labelWidth: 90,
        "id":"employeesSelect",
        "view": "select",
        "height": 40
      }

      let setUserWindow = {
          view:"window",
          move:true,
          resize: true,
          height:300,
          width:300,
          head:{
              view:"toolbar", cols:[
                  { view:"label", label: "Окно назначения" },
                  { view:"button", label: 'Close', id:"setUserWindowClose" , width: 100, align: 'right'}
                ]
          },
          position:"center",
          body:{
            rows:[
            {"elements": [
              { "label": "Информация", "type": "label" },
              { "label": "Логин", "view": "text", "value": user.login, labelWidth: labelWidth, readonly:true },
              { "label": "Роль", "view":"text", "value": user.role, labelWidth: labelWidth, readonly:true },
              { "label": "Последний визит", "view":"text", "value": String(user.lastVisited), "labelWidth": labelWidth, readonly:true },
            ],
            "view": "property"},
            employeesView,
            { "view": "button", "css": "webix_primary", "label": "Назначить", "id": "setUserWindowButton" }
          ]
          },
          close: true,
          id: "setUserWindow",
      }

      return setUserWindow
    }
}