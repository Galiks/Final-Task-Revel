import { EVENT_STATUS } from '../components/event/CEventWindow.js';
import { Candidate } from './entities/Candidate.js';
import { Event } from './entities/Event.js';
import { Employee } from "./entities/Employee.js";

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
                IDEntity : Number(candidateID),
                IDEvent: Number(eventID)
            })
        })
        if (request.status != 200){
            webix.message("ОШИБКА");
        }
    }

    /**
     * Метод возвращает список кандидатов мероприятия
     * @returns список кандидатов в виде массива
     */
    async getCandidatesByEvent(eventID){
        let request = await fetch(`/candidate/event/${eventID}`)
        let response = await request.json()
        return new Promise((resolve, reject)=>{
            if (response != null){
                let candidates = []
                for (const item of response) {
                    let candidate = new Candidate(item.ID, item.firstname, item.lastname, item.patronymic, item.email, item.phone, item.status)
                    candidates.push(candidate)
                }
                resolve(candidates)
            }
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
                IDEntity : Number(employeeID),
                IDEvent: Number(eventID)
            })
        })
        if (request.status != 200){
            webix.message("ОШИБКА");
        }
    }

    /**
     * Метод возвращает список сотрудников мероприятия
     * @returns список сотрудников в виде массива
     */
    async getEmployeesByEvent(eventID){
        let request = await fetch(`/employee/event/${eventID}`)
        let response = await request.json()
        return new Promise((resolve, reject)=>{
            let employees = []
            if (response != null){
                for (const item of response) {
                    let employee = new Employee(item.ID, item.firstname, item.lastname, item.patronymic, item.position, item.email, item.phone, item.id_user)
                    employees.push(employee)
                }
            }
            resolve(employees)
        })
    }


    /**
     * Метод возвращает ID кандидатов определённого мероприятия в виде массива
     * @param {number} eventID ID мероприятия
     * @returns список ID кандидатов в виде массива
     */
    async getCandidateIDByEventID(eventID){ 
        return this.getCandidatesByEvent(eventID).then((candidates)=>{
                let result = []
                candidates.forEach((candidate)=>{
                    result.push(candidate.ID)
                })
                return result
            })
    }

    /**
     * Метод возвращает ID сотрудников определённого мероприятия в виде массива
     * @param {number} eventID ID мероприятия
     * @returns список ID кандидатов в виде массива 
     */
    async getEmployeeIDByEventID(eventID){         
        return this.getEmployeesByEvent(eventID).then((employees)=>{
                let result = []
                employees.forEach((employee)=>{
                    result.push(employee.ID)
                })
                return result
            })
    }

    /**
     * Метод возвращает ID сотрудников определённого мероприятия в виде строки
     * @param {number} eventID ID мероприятия
     * @returns список ID сотрудников в виде строки
     */
    async getEmployeeIDByEventIDLikeString(eventID){
        return this.getEmployeeIDByEventID(eventID).then((employees)=>{
            return String(employees)
        })
    }

    /**
     * Метод возвращает ID кандидатов определённого мероприятия в виде строки
     * @param {number} eventID ID мероприятия
     * @returns список ID кандидатов в виде строки
     */
    async getCandidateIDByEventIDLikeString(eventID){
        let candidates = await this.getCandidateIDByEventID(eventID)
        return String(candidates)
    }

    /**
     * Метод обновляет связь между кандидатом и мероприятием
     * @param {number} candidateIDs ID кандидата
     * @param {number} eventID ID мероприятия
     */
    async updateCandidateEvent(candidateIDs, eventID){
        await this.deleteCandidateEventByEventID(eventID)
        let IDs = candidateIDs.split(',')

        for (let index = 0; index < IDs.length; index++) {
            const id = IDs[index];
            await this.setCandidateToEvent(Number(id), Number(eventID))
        }

        // candidateIDs.split(',').forEach((id)=>{
        //     await this.setCandidateToEvent(Number(id), Number(eventID))
        // })
    }

    /**
     * Метод обновляет связь между сотрудников и мероприятием
     * @param {number} employeeIDs ID сотрудника
     * @param {number} eventID ID мероприятия 
     */
    async updateEmployeeEvent(employeeIDs, eventID){
        await this.deleteEmployeeEventByEventID(eventID)
        let IDs = employeeIDs.split(',')

        for (let index = 0; index < IDs.length; index++) {
            const id = IDs[index];
            await this.setEmployeeToEvent(Number(id), Number(eventID))
        }


        // employeeIDs.split(',').forEach((id)=>{
        //     await this.setEmployeeToEvent(Number(id), Number(eventID))
        // })
    }

    /**
     * Метод возвращает список мероприятий в виде массива
     * @returns список мероприятий в виде массива
     */
    async getEvents() {
        let request = await fetch(`event/all`)
        let response = await request.json()

        return new Promise((resolve, reject)=>{
            let events = []
            if (response != null){
                for (const item of response) {
                    let event = new Event(item.ID, item.theme, item.beginning, item.status)
                    events.push(event)
                }
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
        let response = request.json()
        if (request.status != 200){
            webix.message("ОШИБКА");
            return
        }
        else{
            //let response = request.json()
            return new Promise((resolve, reject)=>{
                //let event = new Event(response.ID, response.theme, response.beginning, response.status)
                resolve(response)
            })
        }
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
                ID:Number(event.ID),
                theme:event.theme,
                beginning:event.beginning,
                status:event.status
            })
        })
        if (request.status != 200){
            webix.message("ОШИБКА");
            return
        }
        let response = request.json()

        return new Promise((resolve, reject)=>{
            resolve(response)
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
        }
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
    }
}