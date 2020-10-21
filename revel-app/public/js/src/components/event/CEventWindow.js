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
     * Метод для инициализации
     * @param {EventModel} eventModel объект класса EventModel
     */
    init(eventModel, refreshTable){

        this.refreshDatatable = refreshTable
        this.eventModel = eventModel

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
     */
    async setMultiselectOptions() {
        let result = await this.employeeModel.getEmployeesLikeIDValue()
        $$("employeesMultiselect").define("options", result);
        $$("employeesMultiselect").refresh();
        
        this.candidateModel.getCandidatesLikeIDValue().then((result) => {
            $$("candidatesMultiselect").define("options", result);
            $$("candidatesMultiselect").refresh();
        });
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

        // let employeesMultiselectValue = this.eventModel.getEmployeeIDByEventIDLikeString(eventID);
        // employeesMultiselectValue.then((value) => {
        //     $$("employeesMultiselect").setValue(value);
        // });
        // let candidatesMultiselectValue = this.eventModel.getCandidateIDByEventIDLikeString(eventID);
        // candidatesMultiselectValue.then((value) => {
        //     $$("candidatesMultiselect").setValue(value);
        // });
    }

    /**
     * Метод вызывает окно для создания мероприятия
     */
    createWindow(){
        webix.ui(this.eventWindowView.viewCreateWindow())     
        this.createWindowController.init(this.eventModel, (datatableName) => {
            this.refreshDatatable(datatableName)
        },
        (eventID, status)=>{
            this.updateCandidateStatus(eventID, status)
        })
        this.setMultiselectOptions();   
    }
    
    /**
     * Метод вызывает окно для обновления данных мероприятия
     * @param {Event} event объект класса Event
     */
    updateWindow(event){
        webix.ui(this.eventWindowView.viewUpdateWindow(event))
        this.updateWindowController.init(event, this.eventModel, (datatableName) => {
            this.refreshDatatable(datatableName)
        }, 
        (eventID, status)=>{
            this.updateCandidateStatus(eventID, status)
        })
        this.setMultiselectValue(event.ID);
        this.setMultiselectOptions()
    }

    /**
     * Метод вызывает окно для удаления мероприятия
     * @param {Event} event объект класса Event
     */
    deleteWindow(event){
        webix.ui(this.eventWindowView.viewDeleteWindow(event))

        this.deleteWindowController.init(event, this.eventModel, (datatableName) => {
            this.refreshDatatable(datatableName)
        })
    }

    /**
     * Метод вызывает окно с информацией о мероприятии
     * @param {Event} event объект класса Event
     */
    aboutWindow(event){
        webix.ui(this.eventWindowView.viewAboutWindow(event))

        this.aboutWindowController.init(event, this.eventModel, this.employeeModel, this.candidateModel)
    }

    /**
     * Метод вызывает окно для завершения мероприятия
     * @param {Event} event объект класса Event
     * @param {number[]} candidates массив из ID кандидатов 
     */
    finishWindow(event){

        webix.ui(this.eventWindowView.viewFinishWindow(event))
        
        this.finishWindowController.init(event, this.eventModel, this.candidateModel, (datatableName)=>{this.refreshDatatable(datatableName)}, (eventID, status)=>{this.updateCandidateStatus(eventID, status)})
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