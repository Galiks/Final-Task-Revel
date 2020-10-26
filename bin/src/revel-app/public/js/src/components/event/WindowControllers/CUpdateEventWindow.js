import { EVENT_STATUS } from "./../CEventWindow.js";
import { CANDIDATE_STATUS } from "./../../candidate/CCandidateWindow.js";
import { EventModel } from "../../../models/EventModel.js";

export class CUpdateEventWindow{
    constructor(){
        
    }

    init(event, refreshDatatable, updateCandidateStatus){
        this.eventModel = new EventModel()
        this.refreshDatatable = refreshDatatable
        this.updateCandidateStatus = updateCandidateStatus

        this.updateWindow = $$("updateWindow")
        this.updateWindowButton = $$("updateWindowButton")
        this.updateForm = $$("updateForm")
        this.mainTab = $$("main")

        this.attachEventOnUpdateWindow(event)
    }

    /**
     * Метод для привязки событий к окну обновления мероприятия
     * @param {Event} event объект класса Event
     */
    attachEventOnUpdateWindow(event){

        this.updateWindow.attachEvent("onHide", ()=> {
            this.updateWindow.close()
            this.mainTab.enable()
            
        })

        this.updateWindow.attachEvent("onDestruct", ()=>{
            this.refreshDatatable("events")
        })

        $$("updateWindowClose").attachEvent("onItemClick", ()=>{
            this.updateWindow.close()
            this.mainTab.enable()    
        });

        this.parse(event)

        $$("updateWindowButton").attachEvent("onItemClick", async ()=>{
            if (!this.updateForm.validate()) {
                webix.message("Один из параметров оказался пустым!")
                return
            }
            let values = this.fetch()
            let employees = $$("employeesMultiselect").getValue()
            let candidates = $$("candidatesMultiselect").getValue()

            let updatingEvent = await this.eventModel.updateEvent(values)
            await this.eventModel.updateCandidateEvent(candidates, updatingEvent.ID)
            await this.eventModel.updateEmployeeEvent(employees, updatingEvent.ID)
                if (updatingEvent.status == EVENT_STATUS.planned) {
                    this.updateCandidateStatus(updatingEvent.ID, CANDIDATE_STATUS.invite);
                }
                else if (updatingEvent.status == EVENT_STATUS.finished) {
                    this.updateCandidateStatus(updatingEvent.ID, CANDIDATE_STATUS.wait)
                }

                this.updateWindow.close()
                this.mainTab.enable()
        })

        this.updateWindow.show()
        this.mainTab.disable()
    }

    /**
     * Метод возвращает данные с формы
     * @returns данные с формы
     */
    fetch(){
        return this.updateForm.getValues()
    }

    /**
     * Метод для заполнение формы данными
     * @param {*} values значения
     */
    parse(values){
        values.beginning = values.beginning.replace(" ", "T")
        this.updateForm.setValues(values)
    }
}