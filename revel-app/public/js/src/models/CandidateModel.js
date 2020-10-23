import { CANDIDATE_STATUS } from '../components/candidate/CCandidateWindow.js'
import {Candidate} from './entities/Candidate.js'

export class CandidateModel{
    constructor(){

    }

    /**
     * Метод возвращает список кандиидатов в виде массива
     * @returns список кандидата в виде массива
     */
    async getCandidates(){
        let request = await fetch(`/candidate/all`)
        if (request.status != 200){
            webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
            return
        }

        let response = await request.json()
        
        if (response != null) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }

        return new Promise((resolve, reject)=>{
            let candidates = []
            if (response != null) {
                for (const item of response) {
                    let candidate = new Candidate(item.ID, item.firstname, item.lastname, item.patronymic, item.email, item.phone, item.status)
                    candidates.push(candidate)
                }
            }
            resolve(candidates)
        })
    }

    /**
     * Метод возвращает кандидата по ID
     * @param {number} id ID кандидата
     * @returns кандидата
     */
    async getCandidateByID(id){
        let request = await fetch(`/candidate/${id}`)
        if (request.status != 200){
            webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
            return
        }

        let response = await request.json()
        if (response != null) {
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
     * Метод возвращает данные о кандидатах в формате {ID, VALUE}, где
     * ID - ID,
     * VALUE - lastname + firstname + patronymic
     * @returns {Array} Массив объектов {ID, VALUE}
     */
    getCandidatesLikeIDValue(){
        return new Promise((resolve, reject)=>{
            let result = []
            this.getFreeCandidate().then((candidates) =>{
                candidates.forEach(candidate => {
                    result.push({id:candidate.ID, value:candidate.lastname + ' ' + candidate.firstname + ' ' + candidate.patronymic})
                });
                resolve(result)
            })
        })
    }

    /**
     * Метод возвращает кандидатов, которые ещё не были назначены на мероприятие
     * @returns {Candidate[]} массив кандидатов
     */
    async getFreeCandidate(){
        let request = await fetch(`/candidate/all/free`)
        if (request.status != 200){
            webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
            return
        }

        let response = await request.json()
        
        if (response != null) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }

        return new Promise((resolve, reject)=>{
            let candidates = []
            if (response != null) {
                for (const item of response) {
                    let candidate = new Candidate(item.ID, item.firstname, item.lastname, item.patronymic, item.email, item.phone, item.status)
                    candidates.push(candidate)
                }
            }
            resolve(candidates)
        })
    }

    /**
     * Метод создаёт кандидата по заданным параметрам
     * @param {{ id: number; firstname: string; lastname: string; patronymic: string; email: string; phone: string; id_candidates_status: number; }} candidate объект класса Candidate
     * @returns кандидата
     */
    async createCandidate(candidate){
        let request = await fetch(`/candidate`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                firstname: candidate.firstname,
                lastname: candidate.lastname,
                patronymic: candidate.patronymic,
                email: candidate.email,
                phone: candidate.phone,
                status:candidate.status
            })
        })
        if (request.status != 200){
            webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
            return
        }

        let response = await request.json()
        if (response != null) {
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
     * Метод обновляет кандидата по заданным параметрам
     * @param {{ id: number; firstname: string; lastname: string; patronymic: string; email: string; phone: string; id_candidates_status: number; }} candidate объект класса Candidate
     * @returns кандидата
     */
    async updateCandidate(candidate){
        let request = await fetch(`/candidate/${candidate.ID}`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                ID:Number(candidate.ID),
                firstname: candidate.firstname,
                lastname: candidate.lastname,
                patronymic: candidate.patronymic,
                email: candidate.email,
                phone: candidate.phone,
                status:candidate.status
            })
        })
        if (request.status != 200){
            webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
            return
        }

        let response = await request.json()
        if (response != null) {
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
     * Метод обновляет статус кандидата
     * @param {number} candidate кандидат
     * @param {CANDIDATE_STATUS} status новый статус
     * @returns кандидата
     */
    async updateCandidateStatus(candidate, status){
        candidate.status = status
        return this.updateCandidate(candidate).then((updatingCandidate)=>{
            return updatingCandidate
        })
    }

    /**
     * Метод удаляет кандидата по ID
     * @param {number} id ID кандидата
     */
    async deleteCandidate(id){
        let request = await fetch(`/candidate/${id}`, {
            method: 'DELETE'
        })
        if (request.status != 200){
            webix.message("ОШИБКА: " + request.status + " : " + request.statusText);
            return
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