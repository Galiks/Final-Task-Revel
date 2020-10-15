import { CEventTab } from "./event/CEventTab.js";
import { CEmployeeTab } from "./employee/CEmployeeTab.js";
import { CCandidateTab } from "./candidate/CCandidateTab.js";
import { CUserWindow } from "./user/CUserWindow.js";

export class Index{
    constructor(){
        this.eventTab = new CEventTab()

        this.employeeTab = new CEmployeeTab()

        this.candidateTab = new CCandidateTab()

        this.userWindow = new CUserWindow()
    }

    init(){
      this.employeeTab.init()
      this.candidateTab.init()
      this.eventTab.init()
      this.userWindow.init()
    }

    run(){

        let employees = this.employeeTab.config()
        let candidates = this.candidateTab.config()
        let eventsConfig = this.eventTab.config() 

        // popup:"userPopup"

        let userWindow = {
            "rows": [
                { "icon": "wxi-user", "view": "icon", "width":150, id:"userIcon" },
                {cols : [
                  { "label": "Вход", "view": "button", "width":150, "id":"loginButton", popup:"loginPopup"},
                  { "label": "Регистрация", "view":"button", "width":150, "id":"registerButton", popup:"registerPopup"}
                ]}
            ]
        }

        let tabbarHeader = {
            borderless:true, view:"tabbar", id:"tabbar", value:"listView", multiview:true, options:[
              { value:'Мероприятия', id:'events'},
              { value:'Сотрудники', id:'employees'},
              { value:'Кандидаты', id:'candidates'}
            ]
        }

        let tabbar = {
            rows:[
              {
                id:"main",
                type:"clean",
                rows:[
                    {cols: [
                        tabbarHeader,
                        userWindow,
                    ]},
                  {
                    cells:[
                     eventsConfig,
                     employees,
                     candidates
                    ]
                  }
                ]
              }
            ]
        }

        let loginPopup =  {
          view:"popup",
          id:"loginPopup",
          body:{ 
            view:"form", id:"loginForm", width:200, elements:[
              {view:"text", label:"Логин", name:"login", placeholder:"Логин", align:"center", required:true},
              {view:"text", label:"Пароль", type:"password", name:"password", placeholder:"Пароль", align:"center", required:true},
              {view:"button", label:"Войти"}
            ]
          }
      }

      webix.ui(tabbar)

      this.init()
    }
}

webix.ready( ()=>{
    let start = new Index()
    start.run()

})