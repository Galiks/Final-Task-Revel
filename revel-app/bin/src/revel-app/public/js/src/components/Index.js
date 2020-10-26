import { CEventTab } from "./event/CEventTab.js";
import { CEmployeeTab } from "./employee/CEmployeeTab.js";
import { CCandidateTab } from "./candidate/CCandidateTab.js";
import { CUserPopup } from "./user/CUserPopup.js";

export class Index{
    constructor(){
        this.eventTab = new CEventTab()
        this.employeeTab = new CEmployeeTab()
        this.candidateTab = new CCandidateTab()
        this.userPopup = new CUserPopup()

        // this.userWindow = new CUserWindow()
        // this.userTab = new CUserTab()
    }

    init(){
      this.employeeTab.init()
      this.candidateTab.init()
      this.eventTab.init()
      this.userPopup.init()
      // this.userWindow.init()
      // this.userTab.init()
    }

    run(){

        let employees = this.employeeTab.config()
        let candidates = this.candidateTab.config()
        let events = this.eventTab.config() 

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

        let tabbarOption = [
          { value:'Мероприятия', id:'events'},
          { value:'Сотрудники', id:'employees'},
          { value:'Кандидаты', id:'candidates'}
        ]

        let cells = [
          employees,
          candidates,
          events
        ]        

        let tabbarHeader = {
            borderless:true, view:"tabbar", id:"tabbar", value:"listView", multiview:true, options:tabbarOption
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
                    id:"maincells",
                    cells:cells
                  }
                ]
              }
            ]
        }

      webix.ui(tabbar)

      this.init()
    }
}

webix.ready( ()=>{
    let start = new Index()
    start.run()

})