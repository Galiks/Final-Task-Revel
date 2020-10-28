import { Candidate } from "./../../models/entities/Candidate.js";
import { CANDIDATE_STATUS } from "./CCandidateWindow.js";

export class CandidateWindowView{
    constructor(){

    }

    /**
     * Создаёт конфиг WEBIX для отображения окна создания кандидата
     * @returns  Конфиг окна для создания кандидата
     */
    viewCreateWindow(){

      let labelWidth = 90

      let elements = [
        { "view": "text", "label": "Фамилия", "name": "lastname", "type":"text", required:true, labelWidth:labelWidth },
        { "view": "text", "label": "Имя", "name": "firstname", "type":"text", required:true, labelWidth:labelWidth },
        { "view": "text", "label": "Отчество", "name": "patronymic", "type":"text", labelWidth:labelWidth },
        { "view": "text", "label": "Email", "name": "email", "type":"text", required:true, labelWidth:labelWidth },
        { "view": "text", "label": "Телефон", "name": "phone", "type":"text", required:true, labelWidth:labelWidth, pattern:{ mask:"# ###-###-##-##", allow:/[0-9]/g} },
        { "view":"select", "label":"Статус", labelWidth:labelWidth, "name":"status", "options":[
          CANDIDATE_STATUS.empty,
          CANDIDATE_STATUS.invite,
          CANDIDATE_STATUS.showUp,
          CANDIDATE_STATUS.dontShowUp,
          CANDIDATE_STATUS.wait,
          CANDIDATE_STATUS.success,
          CANDIDATE_STATUS.unsuccess
      ] },
        { "view": "button", "css": "webix_primary", "label": "Создать", "id":"createWindowButton" }
      ]

      let createWindow = {
          view:"window",
          height:400,
          width:300,
          rules:{
            "email":webix.rules.isEmail,
          },
          move:true,
          resize: true,
          head:{
              view:"toolbar", cols:[
                  { view:"label", label: "Окно создания" },
                  { view:"button", label: 'Close', id:"createWindowClose" , width: 100, align: 'right'}
                ]
          },
          position:"center",
          body:{
            "id":"createForm",
            "autoheight": false,
            "view": "form",
            rules:{
              "email":webix.rules.isEmail,
            },
            "elements": elements
          },
          close: true,
          id: "createWindow"
        }
        return createWindow;
    }

    /**
     * Создаёт конфиг WEBIX для отображения окна удаления кандидата
     * @param {Candidate} candidate 
     * @returns Конфиг окна удаления кандидата
     */
    viewDeleteWindow(candidate){
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
                      { "label": "Хотите удалить?", "type": "label", readonly:true },
                      { "label": "ФИО", "view": "text", "value": candidate.lastname + " " + candidate.firstname + " " + candidate.patronymic, readonly:true },
                      { "label": "Email", "view":"text", "value": candidate.email, readonly:true },
                      { "label": "Телефон", "view":"text", "value": candidate.phone, readonly:true },
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
     * Создаёт конфиг WEBIX для отображения окна обновления кандидата
     * @returns Конфиг окна обновления кандидата
     */
    viewUpdateWindow(){
        let labelWidth = 90
        
        let body = {
          "autoheight": false,
          "view": "form",
          "id":"updateForm",
          "rows": [
            { "view":"text", "label":"Номер", "name":"ID", "type":"number", "readonly":true, hidden:true},
            { "view": "text", "label": "Фамилия", "name": "lastname", "type":"text", required:true, labelWidth:labelWidth },
            { "view": "text", "label": "Имя", "name": "firstname", "type":"text", required:true, labelWidth:labelWidth },
            { "view": "text", "label": "Отчество", "name": "patronymic", "type":"text", labelWidth:labelWidth },
            { "view": "text", "label": "Email", "name": "email", "type":"text", required:true, labelWidth:labelWidth },
            { "view": "text", "label": "Телефон", "name": "phone", "type":"text", required:true, labelWidth:labelWidth, pattern:{ mask:"# ###-###-##-##", allow:/[0-9]/g} },
            { "view":"select", "label":"Статус", labelWidth:labelWidth, "name":"status", "options":[
              CANDIDATE_STATUS.empty,
              CANDIDATE_STATUS.invite,
              CANDIDATE_STATUS.showUp,
              CANDIDATE_STATUS.dontShowUp,
              CANDIDATE_STATUS.wait,
              CANDIDATE_STATUS.success,
              CANDIDATE_STATUS.unsuccess
            ] },
            { "view": "button", "css": "webix_primary", "label": "Изменить", "id":"updateWindowButton" }
          ]
        }

        let updateWindow = {
          view:"window",
          move:true,
          resize: true,
          height:450,
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

    /**
       * Создаёт конфиг WEBIX для отображения окна информации о кандидате
       * @param {Candidate} candidate 
       * @returns Конфиг окна информации о кандидате
       */
    viewAboutWindow(candidate){
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
              { "label": "Информация", "type": "label"},
              { "label": "ФИО", "view": "text", "value": candidate.lastname + " " + candidate.firstname + " " + candidate.patronymic, readonly:true },
              { "label": "Email", "view":"text", "value": candidate.email, readonly:true },
              { "label": "Телефон", "view":"text", "value": candidate.phone, readonly:true },
              { "label": "Статус", "view":"text", value: candidate.status, readonly:true}
            ],
            "view": "property"
          },
          close: true,
          id: "aboutWindow",
        }

        return aboutWindow
    }
}