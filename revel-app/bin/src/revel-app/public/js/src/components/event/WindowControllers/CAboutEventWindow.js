import { CandidateModel } from "../../../models/CandidateModel.js"
import { EmployeeModel } from "../../../models/EmployeeModel.js"
import { EventModel } from "../../../models/EventModel.js"

export class CAboutEventWindow{
    constructor(){

    }

    init(event){
        this.eventModel = new EventModel()
        this.employeeModel = new EmployeeModel()
        this.candidateModel = new CandidateModel()

        this.aboutWindow = $$("aboutWindow")
        this.mainTab = $$("main")

        this.attachEventOnAboutWindow(event)
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

        $$("aboutWindow").show();
        $$("main").disable();
        
    }

    /**
     * Метод для привязки событий к окну информации о мероприятии
     */
    attachEventOnAboutWindow(event){
        this.aboutWindow.attachEvent("onHide", ()=> {
            this.aboutWindow.close()
            this.mainTab.enable()
        })

        $$("aboutWindowClose").attachEvent("onItemClick", ()=>{
            this.aboutWindow.close()
            this.mainTab.enable()
        });

        this.setEmployeesAndCandidatesToEvent(event)
    }
}