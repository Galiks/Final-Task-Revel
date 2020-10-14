import { EVENT_STATUS } from "./../CEventWindow.js";
import { CANDIDATE_STATUS } from "./../../candidate/CCandidateWindow.js";

export class CUpdateEventWindow{
    constructor(){
        
    }

    init(event, eventModel, refreshDatatable, updateCandidateStatus){
        this.eventModel = eventModel
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

        $$("updateWindowButton").attachEvent("onItemClick", ()=>{
            let values = this.fetch()
            if (this.isEmptyString(values.theme, values.beginning, values.status)) {
                webix.message("Один из параметров оказался пустым!")
                return
            }
            let employees = $$("employeesMultiselect").getValue()
            let candidates = $$("candidatesMultiselect").getValue()
            this.eventModel.updateEvent(values).then((updatingEvent) =>{
                if (updatingEvent.status == EVENT_STATUS.planned) {
                    this.updateCandidateStatus(updatingEvent.ID, CANDIDATE_STATUS.invite);
                }
                else if (updatingEvent.status == EVENT_STATUS.finished) {
                    this.updateCandidateStatus(updatingEvent.ID, CANDIDATE_STATUS.wait)
                }
            })

            this.eventModel.updateCandidateEvent(candidates, event.ID).then(()=>{
                this.refreshDatatable("events");
            })
            this.eventModel.updateEmployeeEvent(employees, event.ID).then(()=>{
                this.refreshDatatable("events");
            })

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
        this.updateForm.setValues(values)
    }

    /**
     * Метод для проверки строк на пустоту
     * @returns true/false
     */
    isEmptyString(){
        for (let index = 0; index < arguments.length; index++) {
            const element = arguments[index];
            if (element.trim() == ''){
                return true
            }
        }
        return false
    }
}