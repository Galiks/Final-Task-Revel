import { Employee } from "./../../models/entities/Employee.js";

export class EmployeeWindowView{
    constructor(){
    }

    /**
     * Создаёт конфиг WEBIX для отображения окна создания сотрудника
     * @returns  Конфиг окна для создания сотрудника
     */
    viewCreateWindow(){
      let labelWidth = 100

        let createWindow = {
            view:"window",
            height:400,
            width:300,
            head:{
                view:"toolbar", cols:[
                    { view:"label", label: "Окно создания" },
                    { view:"button", label: 'Close', id:"createWindowClose" , width: 100, align: 'right'}
                  ]
            },
            position:"center",
            body:{
              "autoheight": false,
              "id":"createForm",
              "view": "form",
              rules:{
                "email":webix.rules.isEmail,
              },
              "rows": [
                { "view": "text", "label": "Фамилия", "name": "lastname", "type":"text", required:true, labelWidth:labelWidth, },
                { "view": "text", "label": "Имя", "name": "firstname", "type":"text", required:true, labelWidth:labelWidth },
                { "view": "text", "label": "Отчество", "name": "patronymic", "type":"text", labelWidth:labelWidth},
                { "view": "text", "label": "Должность", "name": "position", "type":"text", required:true, labelWidth:labelWidth },
                { "view": "text", "label": "Email", "name": "email", "type":"text", required:true, labelWidth:labelWidth},
                { "view": "text", "label": "Телефон", "name": "phone", "type":"text", required:true, pattern:{ mask:"# ### ### ## ##", allow:/[0-9]/g}, labelWidth:labelWidth },
                { "view": "button", "css": "webix_primary", "label": "Создать", "id":"createWindowButton" },
              ]
            },
            close: true,
            id: "createWindow"
          }
          return createWindow;
        }

        /**
         * Создаёт конфиг WEBIX для отображения окна удаления сотрудника
         * @param {Employee} employee 
         * @returns Конфиг окна удаления сотрудника
         */
        viewDeleteWindow(employee){
          let deleteWindow = {
            view:"window",
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
                        { "label": "Информация", "type": "label" },
                        { "label": "ФИО", "type": "text", "value": employee.lastname + " " + employee.firstname + " " + employee.patronymic },
                        { "label": "Должность", "type":"text", "value": employee.position },
                        { "label": "Email", "type":"text", "value": employee.email },
                        { "label": "Телефон", "type":"text", "value": employee.phone },
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

        /**
         * 
         * @returns
         */
        viewUpdateWindow(){

          let labelWidth = 100

          let updateWindow = {
            view:"window",
            height:400,
            width:300,
            head:{
                view:"toolbar", cols:[
                    { view:"label", label: "Окно изменения" },
                    { view:"button", label: 'Close', id:"updateWindowClose" , width: 100, align: 'right'}
                  ]
            },
            position:"center",
            body:{
              "autoheight": false,
              "view": "form",
              rules:{
                "email":webix.rules.isEmail,
              },
              "id":"updateForm",
              "rows": [
                { "view":"text", "label":"Номер", "name":"ID", "type":"number", "readonly":true, labelWidth:labelWidth, hidden:true},
                { "view": "text", "label": "Фамилия", "name": "lastname", "type":"text", labelWidth:labelWidth },
                { "view": "text", "label": "Имя", "name": "firstname", "type":"text", labelWidth:labelWidth },
                { "view": "text", "label": "Отчество", "name": "patronymic", "type":"text", labelWidth:labelWidth },
                { "view": "text", "label": "Должность", "name": "position", "type":"text", labelWidth:labelWidth },
                { "view": "text", "label": "Email", "name": "email", "type":"text", labelWidth:labelWidth },
                { "view": "text", "label": "Телефон", "name": "phone", "type":"text", pattern:{ mask:"# ### ### ## ##", allow:/[0-9]/g}, labelWidth:labelWidth  },
                { "view": "button", "css": "webix_primary", "label": "Изменить", "id":"updateWindowButton" }
              ]
            },
            close: true,
            id: "updateWindow"
          }

          return updateWindow
        }

        viewAboutWindow(employee){
          let aboutWindow = {
            view:"window",
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
                { "label": "ФИО", "type": "text", "value": employee.lastname + " " + employee.firstname + " " + employee.patronymic },
                { "label": "Должность", "type":"text", "value": employee.position },
                { "label": "Email", "type":"text", "value": employee.email },
                { "label": "Телефон", "type":"text", "value": employee.phone },
              ],
              "view": "property"
            },
            close: true,
            id: "aboutWindow",
          }

          return aboutWindow
        }
}