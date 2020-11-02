import { EventWindowView } from "./EventWindowView.js";
import { Event } from "./../../models/entities/Event.js";
import { EventModel } from "../../models/EventModel.js";
import { EmployeeModel } from "../../models/EmployeeModel.js";
import { CandidateModel } from "../../models/CandidateModel.js";
import { CANDIDATE_STATUS } from "../candidate/CCandidateWindow.js";
import { CCreateEventWindow } from "./WindowControllers/CCreateEventWindow.js";
import { CAboutEventWindow } from "./WindowControllers/CAboutEventWindow.js";
import { CUpdateEventWindow } from "./WindowControllers/CUpdateEventWindow.js";
import { CDeleteEventWindow } from "./WindowControllers/CDeleteEventWindow.js";
import { CFinishEventWindow } from "./WindowControllers/CFinishEventWindow.js";

export class CEventWindow{
    constructor(){
        
    }

    /**
     * 
     * @param {function} refreshTable функция для обновления таблицы
     */
    init(refreshTable){

        this.refreshDatatable = refreshTable
        this.eventModel = new EventModel()

        this.eventWindowView = new EventWindowView()
        this.employeeModel = new EmployeeModel()
        this.candidateModel = new CandidateModel()

        this.createWindowController = new CCreateEventWindow();
        this.updateWindowController = new CUpdateEventWindow()
        this.deleteWindowController = new CDeleteEventWindow()
        this.aboutWindowController = new CAboutEventWindow();
        this.finishWindowController = new CFinishEventWindow();
    }

    /**
     * Метод устанавливает значения для свойства options
     * @param {boolean} all выбирать всех или нет
     * @param {number} eventID ID мероприятия
     */
    async setMultiselectOptions(all, eventID) {
        let employeeOption = await this.employeeModel.getEmployeesLikeIDValue()
        $$("employeesMultiselect").define("options", employeeOption);
        $$("employeesMultiselect").refresh();
        let candidatesOption = []
        if(all){
            let candidatesByEvent = await this.eventModel.getCandidatesByEvent(Number(eventID))
            candidatesByEvent.forEach((candidate)=>{
                candidatesOption.push({id:candidate.ID, value:candidate.lastname + ' ' + candidate.firstname + ' ' + candidate.patronymic})
            })

            let freeCandidates = await this.candidateModel.getFreeCandidate()
            freeCandidates.forEach((candidate)=>{
                candidatesOption.push({id:candidate.ID, value:candidate.lastname + ' ' + candidate.firstname + ' ' + candidate.patronymic})
            })
        }else{
            let freeCandidates = await this.candidateModel.getFreeCandidate()
            freeCandidates.forEach((candidate)=>{
                candidatesOption.push({id:candidate.ID, value:candidate.lastname + ' ' + candidate.firstname + ' ' + candidate.patronymic})
            })
        }

        $$("candidatesMultiselect").define("options", candidatesOption);
        $$("candidatesMultiselect").refresh();
    }

    /**
     * Метод устанавливает значения для свойства value
     * @param {number} eventID номер мероприятия
     */
    async setMultiselectValue(eventID) {
        let employees = await this.eventModel.getEmployeeIDByEventIDLikeString(eventID)
        $$("employeesMultiselect").setValue(employees);

        let candidates = await this.eventModel.getCandidateIDByEventIDLikeString(eventID)
        $$("candidatesMultiselect").setValue(candidates);
    }

    /**
     * Метод вызывает окно для создания мероприятия
     */
    createWindow(){
        webix.ui(this.eventWindowView.viewCreateWindow())     
        this.createWindowController.init((datatableName) => {
            this.refreshDatatable(datatableName)
        },
        (eventID, status)=>{
            this.updateCandidateStatus(eventID, status)
        })
        this.setMultiselectOptions(false);   
    }
    
    /**
     * Метод вызывает окно для обновления данных мероприятия
     * @param {Event} event объект класса Event
     */
    updateWindow(event){
        webix.ui(this.eventWindowView.viewUpdateWindow(event))
        this.updateWindowController.init(event, (datatableName) => {
            this.refreshDatatable(datatableName)
        }, 
        (eventID, status)=>{
            this.updateCandidateStatus(eventID, status)
        })
        this.setMultiselectValue(event.ID);
        //нужны все!
        this.setMultiselectOptions(true, event.ID)
    }

    /**
     * Метод вызывает окно для удаления мероприятия
     * @param {Event} event объект класса Event
     */
    deleteWindow(event){
        webix.ui(this.eventWindowView.viewDeleteWindow(event))

        this.deleteWindowController.init(event, (datatableName) => {
            this.refreshDatatable(datatableName)
        })
    }

    /**
     * Метод вызывает окно с информацией о мероприятии
     * @param {Event} event объект класса Event
     */
    aboutWindow(event){
        webix.ui(this.eventWindowView.viewAboutWindow(event))

        this.aboutWindowController.init(event, (datatableName) => {this.refreshDatatable(datatableName)})
    }

    /**
     * Метод вызывает окно для завершения мероприятия
     * @param {Event} event объект класса Event
     * @param {number[]} candidates массив из ID кандидатов 
     */
    finishWindow(event){

        webix.ui(this.eventWindowView.viewFinishWindow(event))
        
        this.finishWindowController.init(event, (datatableName)=>{this.refreshDatatable(datatableName)}, (eventID, status)=>{this.updateCandidateStatus(eventID, status)})
    }

    /**
     * Метод обновляет статус кандидата
     * @param {Number} eventID ID мероприятия
     * @param {CANDIDATE_STATUS} status статус кандидата
     */
    updateCandidateStatus(eventID, status) {
        this.eventModel.getCandidatesByEvent(Number(eventID)).then((candidates)=>{
            return candidates
        }).then((candidates)=>{
            for (let index = 0; index < candidates.length; index++) {
                const candidate = candidates[index];
                this.candidateModel.updateCandidateStatus(candidate, status).then(()=>{
                    
                })
            }
            candidates.forEach(element => {
                this.candidateModel.updateCandidateStatus(element, status).then((result)=>{
                    return result
                })
            });
            this.refreshDatatable("candidates")
        })
    }
}

/**
 * Константа для хранения состояний мероприятия
 */
export const EVENT_STATUS = {
    planned: "Запланировано",
    inProgress: "В процессе",
    finished: "Закончено",
    archive: "Архив"
}