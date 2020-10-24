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
    async attachEventOnCreateWindow(){

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

        $$("createWindowButton").attachEvent("onItemClick", async ()=>{
            if (!this.createForm.validate()) {
                webix.message("Один из параметров оказался пустым!")
                return
            }

            let values = this.fetch()
            let employees = $$("employeesMultiselect").getValue().split(',')
            if (employees.length == 0 || employees.length > 3 || employees[0] == ""){
                webix.message("Число сотрудников должно быть от 1 до 3!")
                return
            }
            let candidates = $$("candidatesMultiselect").getValue().split(',')

            let newEvent = await this.eventModel.createEvent(values)

            for (let index = 0; index < employees.length; index++) {
                const id = employees[index];
                await this.eventModel.setEmployeeToEvent(id, newEvent.ID)
            }

            for (let index = 0; index < candidates.length; index++) {
                const id = candidates[index];
                await this.eventModel.setCandidateToEvent(id, newEvent.ID)
            }

            this.updateCandidateStatus(newEvent.ID, CANDIDATE_STATUS.invite)

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