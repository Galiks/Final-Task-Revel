import { CandidateModel } from "../../../models/CandidateModel.js"
import { EmployeeModel } from "../../../models/EmployeeModel.js"
import { EventModel } from "../../../models/EventModel.js"
import { CANDIDATE_STATUS } from "../../candidate/CCandidateWindow.js"
import { EVENT_STATUS } from "../CEventWindow.js"
import { EventWindowView } from "../EventWindowView.js"

export class CAboutEventWindow{
    constructor(){

    }

    init(event, refreshDatatable){
        this.eventModel = new EventModel()
        this.employeeModel = new EmployeeModel()
        this.candidateModel = new CandidateModel()
        this.eventWindowView = new EventWindowView()

        this.refreshDatatable = refreshDatatable
        this.aboutWindow = $$("aboutWindow")
        this.mainTab = $$("main")
        this.candidatesAbout = $$("candidatesAbout")
        this.cmenu = $$("candidatesDatatableCmenu")

        this.attachEventOnAboutWindow(event, this)
    }

    /**
     * Метод возвращает объект из массива сотрудников и массива кандидатов
     * @param {Event} event объект класса Event
     */
    async setEmployeesAndCandidatesToEvent(event) {
        let employees = await this.eventModel.getEmployeesByEvent(Number(event.ID))
        let candidates = await this.eventModel.getCandidatesByEvent(Number(event.ID))
                
        $$("employeesAbout").parse(employees);
        $$("candidatesAbout").parse(candidates);

        this.aboutWindow.show();
        this.mainTab.disable();
        
    }

    /**
     * Метод для привязки событий к окну информации о мероприятии
     */
    attachEventOnAboutWindow(event, controller){

        this.cmenu.attachTo(this.candidatesAbout);

        this.aboutWindow.attachEvent("onHide", ()=> {
            this.aboutWindow.close()
            this.mainTab.enable()
        })

        $$("aboutWindowClose").attachEvent("onItemClick", ()=>{
            this.aboutWindow.close()
            this.mainTab.enable()
        });

        this.setEmployeesAndCandidatesToEvent(event)

        this.cmenu.attachEvent("onItemClick", function(id){
            let context = this.getContext();
            let item = context.obj;
            let itemID = context.id;
            let candidate = item.getItem(itemID)
            if (this.getItem(id).value == "Сменить статус"){             
                webix.ui(controller.eventWindowView.viewChangeStatusWindow(candidate))

                let changeStatusWindow = $$("changeStatusWindow")

                if (event.status == EVENT_STATUS.planned){
                    $$("changeStatusOption").define("options", [CANDIDATE_STATUS.showUp, CANDIDATE_STATUS.dontShowUp])
                }
                else if (event.status == EVENT_STATUS.finished){
                    $$("changeStatusOption").define("options", [CANDIDATE_STATUS.success, CANDIDATE_STATUS.unsuccess])
                }

                changeStatusWindow.attachEvent("onHide", ()=> {
                    changeStatusWindow.close()
                    controller.aboutWindow.enable()
                })

                $$("changeStatusWindowButton").attachEvent("onItemClick", ()=>{
                    let status = $$("changeStatusOption").getValue()
                    candidate.status = status
                    controller.candidateModel.updateCandidate(candidate).then((updatingCandidate)=>{
                        let data = controller.eventModel.getCandidatesByEvent(Number(event.ID))
                        $$("candidatesAbout").clearAll()
                        $$("candidatesAbout").parse(data)
                        $$("candidatesAbout").refresh()
                        controller.refreshDatatable("candidates")
                        changeStatusWindow.close()
                        controller.aboutWindow.enable()
                    })
                })
        
                $$("changeStatusWindowClose").attachEvent("onItemClick", ()=>{
                    changeStatusWindow.close()
                    controller.aboutWindow.enable()
                });
                
                $$("changeStatusWindow").show()
                controller.aboutWindow.disable()
            }
        })
    }
}