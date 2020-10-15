import { EVENT_STATUS } from '../components/event/CEventWindow.js';
import {Event} from './entities/Event.js';

export class EventModel{

    constructor(){

    }

    /**
     * Метод устанавливает связь между кандидатом и мероприятием
     * @param {number} candidateID ID кандидата
     * @param {number} eventID ID мероприятия
     */
    setCandidateToEvent(candidateID, eventID){
        return new Promise((resolve, reject)=>{
            this.candidateEvent.push({candidateID:Number(candidateID), eventID: Number(eventID)})
            resolve()
        })
    }

    /**
     * Метод возвращает список кандидатов мероприятия
     * @returns список кандидатов в виде массива
     */
    getCandidatesByEvent(eventID){
        return new Promise((resolve, reject)=>{
            resolve(this.candidateEvent)
        })
    }

    /**
     * Метод устанавливает связь между сотрудником и мероприятием
     * @param {number} employeeID ID сотрудника
     * @param {number} eventID ID мероприятия
     */
    async setEmployeeToEvent(employeeID, eventID){
        let request = await fetch(`/employee/${employeeID}/event/${eventID}`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                IDEmployee : employeeID,
                IDEvent: eventID
            })
        })
        if (request.status != 200){
            webix.message("ОШИБКА");
            return
        }
        return new Promise((resolve, reject)=>{
            resolve()
        })
    }

    /**
     * Метод возвращает список сотрудников мероприятия
     * @returns список сотрудников в виде массива
     */
    getEmployeesByEvent(eventID){
        let request = await fetch(`/employee/event/${eventID}`)

        return new Promise((resolve, reject)=>{
            resolve(this.employeeEvent)
        })
    }

    /**
     * Метод возвращает ID сотрудников определённого мероприятия в виде строки
     * @param {number} eventID ID мероприятия
     * @returns список ID сотрудников в виде строки
     */
    getEmployeeIDByEventIDLikeString(eventID){
        return new Promise((resolve, reject)=>{
            this.getEmployeeIDByEventID(eventID).then((employees) =>{
                resolve(String(Array.from(employees)))
            })
        })
    }

    /**
     * Метод возвращает ID кандидатов определённого мероприятия в виде строки
     * @param {number} eventID ID мероприятия
     * @returns список ID кандидатов в виде строки
     */
    getCandidateIDByEventIDLikeString(eventID){
        return new Promise((resolve, reject)=>{
            this.getCandidateIDByEventID(eventID).then((candidates) =>{
                resolve(String(Array.from(candidates)))
            })
        })
    }

    /**
     * Метод возвращает ID кандидатов определённого мероприятия в виде массива
     * @param {number} eventID ID мероприятия
     * @returns список ID кандидатов в виде массива
     */
    getCandidateIDByEventID(eventID){
        return new Promise((resolve, reject)=>{
            let result = []
            let candidates = this.candidateEvent.filter(element => element.eventID == eventID)
            candidates.forEach(element =>{
                result.push(element.candidateID)
            })
            resolve(result)
        })
    }

    /**
     * Метод возвращает ID сотрудников определённого мероприятия в виде массива
     * @param {number} eventID ID мероприятия
     * @returns список ID кандидатов в виде массива 
     */
    getEmployeeIDByEventID(eventID){
        return new Promise((resolve, reject)=>{
            let result = []
            let employees = this.employeeEvent.filter(element => element.eventID == eventID)
            employees.forEach(element =>{
                result.push(element.employeeID)
            })
            resolve(result)
        })
    }

    /**
     * Метод обновляет связь между кандидатом и мероприятием
     * @param {number} candidateIDs ID кандидата
     * @param {number} eventID ID мероприятия
     */
    updateCandidateEvent(candidateIDs, eventID){
        return new Promise((resolve, reject)=>{
            this.candidateEvent = this.candidateEvent.filter(element => element.eventID != eventID)
            candidateIDs.split(',').forEach(element => {
                this.setCandidateToEvent(element, eventID).then(()=>{

                })
            })
            resolve()
        })
    }

    /**
     * Метод обновляет связь между сотрудников и мероприятием
     * @param {number} employeeIDs ID сотрудника
     * @param {number} eventID ID мероприятия 
     */
    updateEmployeeEvent(employeeIDs, eventID){
        return new Promise((resolve, reject)=>{
            this.employeeEvent = this.employeeEvent.filter(element => element.eventID != eventID)
            employeeIDs.split(',').forEach(element => {
                this.setEmployeeToEvent(element, eventID).then(()=>{

                })
            })
            resolve()
        })
    }

    /**
     Метод возвращает последний номер коллекции
     * @returns последний номер коллекции
     */
    getLastID(){
        if (this.events.size == 0) {
            return 0
        }
        else{
            let keys = Array.from(this.events.keys());
            return Math.max.apply(null, keys)
        }
    }

    /**
     * Метод возвращает список мероприятий в виде массива
     * @returns список мероприятий в виде массива
     */
    async getEvents() {
        let request = await fetch(`event/all`)
        let response = await request.json()
        if (response.Err != null){
            webix.message("ОШИБКА");
            return
        }

        return new Promise((resolve, reject)=>{
            let events = []
            for (const item of response) {
                let event = new Event(item.ID, item.theme, item.beginning, item.status)
                events.push(event)
            }
            resolve(events)
        })
    }

    /**
     * Метод возвращает мероприятие по его ID
     * @param {number} id ID мероприятия
     * @returns мероприятие
     */
    async getEventByID(id) {
        let request = await fetch(`/event/${id}`);
        let response = await request.json()
        if (response.Err != null){
            webix.message("ОШИБКА");
            return
        }

        return new Promise((resolve, reject)=>{
            resolve(response)
        })
    }

    /**
     * Метод создаёт мероприятие по заданным параметрам
     * @param {{ID: number; theme: string; beginning: Date; status: EVENT_STATUS}} event объект класса Event
     * @returns мероприятие
     */
    createEvent(event) {
        return new Promise((resolve, reject)=>{
            let id = this.getLastID() + 1
            let newEvent = new Event(id, event.theme, event.beginning, event.status)
            this.events.set(id, newEvent)

            resolve(newEvent)
        })
    }

    /**
     * Метод обновляет мероприятие по заданным параметрам
     * @param {Event} event объект класса Event
     * @returns мероприятие
     */
    updateEvent(event) {
        return new Promise((resolve, reject)=>{
            this.getEventByID(event.ID).then((updatingEvent) =>{
                if (updatingEvent != null) {
                    this.events.set(event.ID, event)
                    resolve(event)
                }
            })
        })
    }

    /**
     * Метод удаляет мероприятие по ID
     * @param {number} id ID мероприятия
     */
    deleteEvent(id) {
        return new Promise((resolve, reject)=>{
            this.getEventByID(id).then((deletingEvent)=>{
                if (deletingEvent != null) {
                    this.events.delete(id)
                    this.deleteCandidateEventByEventID(id).then(()=>{})
                    this.deleteEmployeeEventByEventID(id).then(()=>{})
                    resolve()   
                }
            })
        })
    }

    /**
     * Метод удаляет связи между кандидатами и мероприятием
     * @param {number} eventID ID мероприятия 
     */
    deleteCandidateEventByEventID(eventID){
        return new Promise((resolve, reject)=>{
            for (let index = 0; index < this.candidateEvent.length; index++) {
                const element = this.candidateEvent[index];
                if (element.eventID == eventID){
                    this.candidateEvent.splice(index, 1)
                }
            }
            resolve()
        })
    }

    /**
     * Метод удаляет связи между сотрудником и мероприятием
     * @param {number} eventID ID мероприятия 
     */
    deleteEmployeeEventByEventID(eventID){
        return new Promise((resolve, reject)=>{
            for (let index = 0; index < this.employeeEvent.length; index++) {
                const element = this.employeeEvent[index];
                if (element.eventID == eventID){
                    this.employeeEvent.splice(index, 1)
                }
            }
            resolve()
        })
    }
}