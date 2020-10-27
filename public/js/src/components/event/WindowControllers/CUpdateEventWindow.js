import { EVENT_STATUS } from "./../CEventWindow.js";
import { CANDIDATE_STATUS } from "./../../candidate/CCandidateWindow.js";
import { EventModel } from "../../../models/EventModel.js";
import { CandidateModel } from "../../../models/CandidateModel.js";

export class CUpdateEventWindow{
    constructor(){

    }

    init(event, refreshDatatable, updateCandidateStatus){
        this.eventModel = new EventModel()
        this.candidateModel = new CandidateModel()
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

        if (event.status == EVENT_STATUS.planned){
            $$("statusOption").define("options", [EVENT_STATUS.planned, EVENT_STATUS.inProgress])
        }
        else if (event.status == EVENT_STATUS.inProgress){
            $$("statusOption").define("options", [EVENT_STATUS.inProgress, EVENT_STATUS.finished])
        }
        else if (event.status == EVENT_STATUS.finished){
            $$("statusOption").define("options", [EVENT_STATUS.finished])
        }

        this.parse(event)



        $$("updateWindowButton").attachEvent("onItemClick", async ()=>{
            if (!this.updateForm.validate()) {
                webix.message("Один из параметров оказался пустым!")
                return
            }
            let values = this.fetch()

            if (values.status == EVENT_STATUS.inProgress){
                let candidates = await this.eventModel.getCandidatesByEvent(Number(values.ID))
                if(!isValidCandidateSttus(candidates)){
                    return
                }
            }


            let employees = $$("employeesMultiselect").getValue()
            let candidates = $$("candidatesMultiselect").getValue()
            let updatingEvent = await this.eventModel.updateEvent(values)
            await this.eventModel.updateCandidateEvent(candidates, updatingEvent.ID)
            await this.eventModel.updateEmployeeEvent(employees, updatingEvent.ID)

            if (updatingEvent.status == EVENT_STATUS.planned) {
                this.updateCandidateStatus(updatingEvent.ID, CANDIDATE_STATUS.invite);
            }
            else if (updatingEvent.status == EVENT_STATUS.finished) {
                let candidatesByEvent = await this.eventModel.getCandidatesByEvent(updatingEvent.ID)
                candidatesByEvent.forEach(candidate => {
                    if (candidate.status == CANDIDATE_STATUS.dontShowUp) {
                        candidate.status = CANDIDATE_STATUS.dontShowUp
                        this.candidateModel.updateCandidate(candidate)
                    }else if (candidate.status == CANDIDATE_STATUS.showUp) {
                        candidate.status = CANDIDATE_STATUS.wait
                        this.candidateModel.updateCandidate(candidate)
                    }
                });
                this.refreshDatatable("candidates")
                // this.updateCandidateStatus(updatingEvent.ID, CANDIDATE_STATUS.wait)
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

function isValidCandidateSttus(candidates) {
    let result = candidates.every(element => {
        if (element.status != CANDIDATE_STATUS.showUp && element.status != CANDIDATE_STATUS.dontShowUp) {
            webix.message("Статусы кандидатов должны быть: Явился или Не явился");
            return true;
        }
    });
    if (result){
        return false
    }else{
        return true
    }
}
