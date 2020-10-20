import { EVENT_STATUS } from "./../CEventWindow.js";
import { CANDIDATE_STATUS } from "./../../candidate/CCandidateWindow.js";

export class CFinishEventWindow{
    constructor(){
        
    }

    async init(event, eventModel, candidateModel, refreshDatatable, updateCandidateStatus){
        this.eventModel = eventModel,
        this.candidateModel = candidateModel
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
    finishEvent(event, candidates) {
        let flagOnCandidateStatus = true;
        if ($$("finishWindowButton").isEnabled()) {
            if (event.status == EVENT_STATUS.finished) {

                candidates.every(element => {
                    if (element.status != CANDIDATE_STATUS.wait && element.status != CANDIDATE_STATUS.dontShowUp) {
                        $$("finishWindowButton").disable();
                        flagOnCandidateStatus = false;
                        return false;
                    }
                });
                
                //Если кандидат не "явился", то "не успешно"
                if (flagOnCandidateStatus) {
                    event.status = EVENT_STATUS.archive;
                    this.eventModel.updateEvent(event).then((updatingEvent) => {
                        this.refreshDatatable("events");
                        this.updateCandidateStatus(updatingEvent.ID, CANDIDATE_STATUS.empty)
                        this.finishWindow.close()
                        this.mainTab.enable()
                    });
                }
                else {
                    webix.message("Условие не выполнилось: кандидаты не завершили мероприятие");
                }
            }
            else {
                $$("finishWindowButton").disable();
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