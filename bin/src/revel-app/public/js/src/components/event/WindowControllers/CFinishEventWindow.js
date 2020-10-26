import { EVENT_STATUS } from "./../CEventWindow.js";
import { CANDIDATE_STATUS } from "./../../candidate/CCandidateWindow.js";
import { EventModel } from "../../../models/EventModel.js";
import { CandidateModel } from "../../../models/CandidateModel.js";

export class CFinishEventWindow{
    constructor(){
        
    }

    async init(event, refreshDatatable, updateCandidateStatus){
        this.eventModel = new EventModel()
        this.candidateModel = new CandidateModel()
        this.refreshDatatable = refreshDatatable
        this.updateCandidateStatus = updateCandidateStatus

        this.finishWindow = $$("finishWindow")
        this.mainTab = $$("main")

        this.attachEventOnFinishWindow(event)

        this.candidates = await this.getCandidatesToFinishWindow(event)
    }

    /**
     * Метод для привязки событий к окну завершения мероприятия
     * @param {Event} event объект класса Event
     * @param {Candidate[]} candidates массив объекто класса Candidate
     */
    async attachEventOnFinishWindow(event){

        $$("finishWindowButton").attachEvent("onItemClick", ()=>{
            this.finishEvent(event, this.candidates)
        });

        this.finishWindow.attachEvent("onDestruct", () => {
            this.refreshDatatable("events");
        });

        this.finishWindow.attachEvent("onHide", ()=> {
            this.finishWindow.close()
            this.mainTab.enable()
        })

        $$("finishWindowClose").attachEvent("onItemClick", ()=>{
            this.finishWindow.close()
            this.mainTab.enable()
        });

        this.finishWindow.show();
        this.mainTab.disable();
    }

    /**
     * Метод для завершения мероприятия
     * @param {Event} event объект класса Event
     * @param {Candidate[]} candidates массив объектов класса Candidate
     */
    async finishEvent(event, candidates) {
        let flagOnCandidateStatus = true;
        if ($$("finishWindowButton").isEnabled()) {
            if (event.status == EVENT_STATUS.finished) {
                flagOnCandidateStatus = isValidCandidateStatus(candidates);
                
                //Если кандидат "не явился", то "не успешно"
                if (flagOnCandidateStatus) {
                    event.status = EVENT_STATUS.archive;
                    event.beginning = event.beginning.replace(" ", "T")
                    let updatingEvent = await this.eventModel.updateEvent(event)
                                        
                    for (let index = 0; index < candidates.length; index++) {
                        const candidate = candidates[index];
                        await this.eventModel.updateCandidateStatusToFinishedEvent(candidate.ID, updatingEvent.ID)
                    }
                    this.updateCandidateStatus(updatingEvent.ID, CANDIDATE_STATUS.empty)
                    this.refreshDatatable("events");
                    this.finishWindow.close()
                    this.mainTab.enable()
                }
                else {
                    webix.message("Условие не выполнилось: кандидаты не завершили мероприятие");
                    return
                }
            }
            else {
                webix.message("Мероприятие не закончено!")
                return
                // $$("finishWindowButton").disable();
            }
        }
    }

    /**
     * Метод для добавления данных в окно
     * @param {Event} event event объект класса Event
     */
    async getCandidatesToFinishWindow(event){
        let IDs = await this.eventModel.getCandidateIDByEventID(event.ID)
        let candidates = []
        for (let index = 0; index < IDs.length; index++) {
            const id = IDs[index];
            let candidate = await this.candidateModel.getCandidateByID(id)
            candidates.push(candidate)
        }
        $$("finishCandidates").parse(candidates)
        return candidates
    }
}

function isValidCandidateStatus(candidates) {
    let result = candidates.every(element => {
        //if ((element.status != CANDIDATE_STATUS.success && element.status != CANDIDATE_STATUS.unsuccess) && element.status != CANDIDATE_STATUS.empty) {
        if (element.status != CANDIDATE_STATUS.success && element.status != CANDIDATE_STATUS.unsuccess && element.status != CANDIDATE_STATUS.empty) {
            webix.message("Статусы кандидатов должны быть: Успешно, Не успешно или Не назначен");
            return true;
        }
    });
    if (result){
        return false
    }else{
        return true
    }
}
