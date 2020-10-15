import { EVENT_STATUS } from '../components/event/CEventWindow.js';
import { Candidate } from './entities/Candidate.js';
import {Event} from './entities/Event.js';

export class EventModel{

    constructor(){

    }

    /**
     * Метод устанавливает связь между кандидатом и мероприятием
     * @param {number} candidateID ID кандидата
     * @param {number} eventID ID мероприятия
     */
    async setCandidateToEvent(candidateID, eventID){
        let request = await fetch(`/event/${eventID}/candidate/${candidateID}`,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                IDEntity : candidateID,
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
     * Метод возвращает список кандидатов мероприятия
     * @returns список кандидатов в виде массива
     */
    async getCandidatesByEvent(eventID){
        let request = await fetch(`/candidate/event/${eventID} `)
        let response = await request.json()
        if (response.Err != null){
            webix.message("ОШИБКА");
            return
        }
        return new Promise((resolve, reject)=>{
            let candidates = []
            for (const item of response) {
                let candidate = new Candidate(item.ID, item.firstname, item.lastname, item.patronymic, item.email, item.phone, item.status)
                candidates.push(candidate)
            }
            resolve(candidates)
        })
    }

    /**
     * Метод устанавливает связь между сотрудником и мероприятием
     * @param {number} employeeID ID сотрудника
     * @param {number} eventID ID мероприятия
     */
    async setEmployeeToEvent(employeeID, eventID){
        let request = await fetch(`/event/${eventID}/employee/${employeeID}`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                IDEntity : employeeID,
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
    async getEmployeesByEvent(eventID){
        let request = await fetch(`/employee/event/${eventID}`)
        let response = await request.json()
        if (response.Err != null){
            webix.message("ОШИБКА");
            return
        }
        return new Promise((resolve, reject)=>{
            let employees = []
            for (const item of response) {
                let employee = new Employee(item.ID, item.firstname, item.lastname, item.patronymic, item.position, item.email, item.phone, item.id_user)
                employees.push(employee)
            }
            resolve(employees)
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
            this.getCandidatesByEvent(eventID).then((candidates)=>{
                candidates.forEach((candidate)=>{
                    result.push(candidate.ID)
                })
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
            this.getEmployeesByEvent(eventID).then((employees)=>{
                employees.forEach((employee)=>{
                    result.push(employee.ID)
                })
            })
            resolve(result)
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
                resolve(String(employees))
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
                resolve(String(candidates))
            })
        })
    }

    /**
     * Метод обновляет связь между кандидатом и мероприятием
     * @param {number} candidateIDs ID кандидата
     * @param {number} eventID ID мероприятия
     */
    updateCandidateEvent(candidateIDs, eventID){     
        return new Promise((resolve, reject)=>{
           Promise.all([
               this.deleteCandidateEventByEventID(eventID),

               candidateIDs.split(',').forEach(id =>{
                    this.setCandidateToEvent(id, eventID)
               })
           ]).then(()=>{
               resolve()
           })

        })

         // this.candidateEvent = this.candidateEvent.filter(element => element.eventID != eventID)
            // candidateIDs.split(',').forEach(element => {
            //     this.setCandidateToEvent(element, eventID).then(()=>{
            //         resolve()
            //     })
            // })
    }

    /**
     * Метод обновляет связь между сотрудников и мероприятием
     * @param {number} employeeIDs ID сотрудника
     * @param {number} eventID ID мероприятия 
     */
    updateEmployeeEvent(employeeIDs, eventID){
        return new Promise((resolve, reject)=>{
            Promise.all([
                this.deleteEmployeeEventByEventID(eventID),

                employeeIDs.split(',').forEach(id=>{
                    this.setEmployeeToEvent(id, eventID)
                })
            ]).then(()=>{
                resolve()
            })
        })

        // this.employeeEvent = this.employeeEvent.filter(element => element.eventID != eventID)
            // employeeIDs.split(',').forEach(element => {
            //     this.setEmployeeToEvent(element, eventID).then(()=>{

            //     })
            // })
            // resolve()
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
    async createEvent(event) {
        let request = await fetch(`/event`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                theme:event.theme,
                beginning:event.beginning,
                status:event.status
            })
        })
        if (request.status != 200){
            webix.message("ОШИБКА");
            return
        }

        return new Promise((resolve, reject)=>{
            resolve(request.json())
        })
    }

    /**
     * Метод обновляет мероприятие по заданным параметрам
     * @param {Event} event объект класса Event
     * @returns мероприятие
     */
    async updateEvent(event) {
        let request = await fetch(`/event/${event.ID}`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                ID:event.ID,
                theme:event.theme,
                beginning:event.beginning,
                status:event.status
            })
        })
        if (request.status != 200){
            webix.message("ОШИБКА");
            return
        }

        return new Promise((resolve, reject)=>{
            resolve(request.json())
        })
    }

    /**
     * Метод удаляет мероприятие по ID
     * @param {number} id ID мероприятия
     */
    async deleteEvent(id) {
        let request = await fetch(`/event/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                
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
     * Метод удаляет связи между кандидатами и мероприятием
     * @param {number} id ID мероприятия 
     */
    async deleteCandidateEventByEventID(id){
        let request = await fetch(`/event/${id}/candidate`, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                
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
     * Метод удаляет связи между сотрудником и мероприятием
     * @param {number} id ID мероприятия 
     */
    async deleteEmployeeEventByEventID(id){
        let request = await fetch(`/event/${id}/employee`, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                
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
}