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
            method: 'PUT'
        })
        if (request.status != 200){
            if (request.status == 302){
                webix.message("Вы не авторизованы!");
                return
            }else{
                webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
                return
            }
        }

        let response = await request.json()   
        if (response != null && response != undefined) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }
    }

    /**
     * Метод возвращает список кандидатов мероприятия
     * @returns список кандидатов в виде массива
     */
    async getCandidatesByEvent(eventID){
        let request = await fetch(`/candidate/event/${eventID}`)
        if (request.status != 200){
            if (request.status == 302){
                webix.message("Вы не авторизованы!");
                return
            }else{
                webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
                return
            }
        }

        let response = await request.json()   
        if (response != null && response != undefined) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }

        return new Promise((resolve, reject)=>{
            let candidates = []
            if (response != null){
                for (const item of response) {
                    let candidate = new Candidate(item.ID, item.firstname, item.lastname, item.patronymic, item.email, item.phone, item.status)
                    candidates.push(candidate)
                }
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
            method: 'PUT'
        })
        if (request.status != 200){
            if (request.status == 302){
                webix.message("Вы не авторизованы!");
                return
            }else{
                webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
                return
            }
        }

        let response = await request.json()   
        if (response != null && response != undefined) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }
    }

    /**
     * Метод возвращает список сотрудников мероприятия
     * @returns список сотрудников в виде массива
     */
    async getEmployeesByEvent(eventID){
        let request = await fetch(`/employee/event/${eventID}`)
        if (request.status != 200){
            if (request.status == 302){
                webix.message("Вы не авторизованы!");
                return
            }else{
                webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
                return
            }
        }

        let response = await request.json()   
        if (response != null && response != undefined) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }
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
    }

    /**
     * Метод возвращает список мероприятий в виде массива
     * @returns список мероприятий в виде массива
     */
    async getEvents() {
        let request = await fetch(`event/all`)
        if (request.status != 200){
            if (request.status == 302){
                webix.message("Вы не авторизованы!");
                return
            }else{
                webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
                return
            }
        }

        let response = await request.json()   
        if (response != null && response != undefined) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }

        return new Promise((resolve, reject)=>{
            let events = []
            if (response != null){
                for (const item of response) {
                    let event = new Event(item.ID, item.theme, toDate(item.beginning), item.status)
                    events.push(event)
                }
            }
            resolve(events)
        })

        function toDate(ISOdate){ 
            let date = ISOdate.split('T')
            let time = date[1].split(':')
            let hh = time[0]
            let mm = time[1]
            return date[0] + " " + hh + ":" + mm
        }
    }

    /**
     * Метод возвращает мероприятие по его ID
     * @param {number} id ID мероприятия
     * @returns мероприятие
     */
    async getEventByID(id) {
        let request = await fetch(`/event/${id}`);
        if (request.status != 200){
            if (request.status == 302){
                webix.message("Вы не авторизованы!");
                return
            }else{
                webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
                return
            }
        }

        let response = await request.json()   
        if (response != null && response != undefined) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
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
                beginning:event.beginning + ":00Z",
                status:event.status
            })
        })
        if (request.status != 200){
            if (request.status == 302){
                webix.message("Вы не авторизованы!");
                return
            }else{
                webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
                return
            }
        }

        let response = await request.json()   
        if (response != null && response != undefined) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }
        return new Promise((resolve, reject)=>{
            resolve(response)        
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
                ID:Number(event.ID),
                theme:event.theme,
                beginning:event.beginning + ":00Z",
                status:event.status
            })
        })
        if (request.status != 200){
            if (request.status == 302){
                webix.message("Вы не авторизованы!");
                return
            }else{
                webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
                return
            }
        }

        let response = await request.json()   
        if (response != null && response != undefined) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }

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
            method: 'DELETE'
        })
        if (request.status != 200){
            if (request.status == 302){
                webix.message("Вы не авторизованы!");
                return
            }else{
                webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
                return
            }
        }

        let response = await request.json()   
        if (response != null && response != undefined) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }
    }

    /**
     * Метод удаляет связи между кандидатами и мероприятием
     * @param {number} id ID мероприятия 
     */
    async deleteCandidateEventByEventID(id){
        let request = await fetch(`/event/${id}/candidate`, {
            method: 'DELETE'
        })
        if (request.status != 200){
            if (request.status == 302){
                webix.message("Вы не авторизованы!");
                return
            }else{
                webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
                return
            }
        }

        let response = await request.json()   
        if (response != null && response != undefined) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }
    }

    /**
     * Метод удаляет связи между сотрудником и мероприятием
     * @param {number} id ID мероприятия 
     */
    async deleteEmployeeEventByEventID(id){
        let request = await fetch(`/event/${id}/employee`, {
            method: 'DELETE'
        })
        if (request.status != 200){
            if (request.status == 302){
                webix.message("Вы не авторизованы!");
                return
            }else{
                webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
                return
            }
        }

        let response = await request.json()   
        if (response != null && response != undefined) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }
    }

    async updateCandidateStatusToFinishedEvent(candidateID, eventID){
        let request = await fetch(`/event/${eventID}/candidate/${candidateID}`,{
            method: 'POST',
        })
        if (request.status != 200){
            if (request.status == 302){
                webix.message("Вы не авторизованы!");
                return
            }else{
                webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
                return
            }
        }

        let response = await request.json()   
        if (response != null && response != undefined) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }
    }
}