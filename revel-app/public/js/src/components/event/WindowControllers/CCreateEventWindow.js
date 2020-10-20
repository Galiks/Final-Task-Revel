import { EVENT_STATUS } from "./../CEventWindow.js";
import { CANDIDATE_STATUS } from "./../../candidate/CCandidateWindow.js";

export class CCreateEventWindow{
    constructor(){
        
    }

    init(eventModel, refreshDatatable, updateCandidateStatus){
        this.eventModel = eventModel
        this.refreshDatatable = refreshDatatable
        this.updateCandidateStatus = updateCandidateStatus
        this.createWindow = $$("createWindow")
        this.createWindowButton = $$("createWindowButton")
        this.createForm = $$("createForm")
        this.mainTab = $$("main")

        this.attachEventOnCreateWindow()
    }

    /**
     * Метод для привязки событий к окну создания мероприятия
     */
    attachEventOnCreateWindow(){

        this.createWindow.attachEvent("onHide", ()=> {
            this.createWindow.close()
            this.mainTab.enable()
        })

        this.createWindow.attachEvent("onDestruct", ()=>{
            this.refreshDatatable("events")
        })

        $$("createWindowClose").attachEvent("onItemClick", ()=>{
            this.createWindow.close()
            this.mainTab.enable()
        })

        $$("createWindowButton").attachEvent("onItemClick", ()=>{
            if (!this.createForm.validate()) {
                webix.message("Один из параметров оказался пустым!")
                return
            }

            // if (this.isEmptyString(values.theme, values.beginning, values.status)) {
            //     webix.message("Один из параметров оказался пустым!")
            //     return
            // }

            let values = this.fetch()
            let employees = $$("employeesMultiselect").getValue()
            let candidates = $$("candidatesMultiselect").getValue()
            this.eventModel.createEvent(values).then((newEvent)=>{
                employees.split(',').forEach((employee)=>{
                    this.eventModel.setEmployeeToEvent(employee, newEvent.ID)
                })

                candidates.split(',').forEach(elem => {
                    this.eventModel.setCandidateToEvent(elem, newEvent.ID)
                })

                this.updateCandidateStatus(newEvent.ID, CANDIDATE_STATUS.invite)
            })

            this.createWindow.close()
            this.mainTab.enable()
        })

        this.createWindow.show()
        this.mainTab.disable()
    }

    /**
     * Метод возвращает данные с формы
     * @returns данные с формы
     */
    fetch(){
        return this.createForm.getValues()
    }

    /**
     * Метод для заполнение формы данными
     * @param {*} values значения
     */
    parse(values){
        this.createForm.setValues(values)
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