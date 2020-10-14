import { CANDIDATE_STATUS } from '../components/candidate/CCandidateWindow.js'
import {Candidate} from './entities/Candidate.js'

export class CandidateModel{
    constructor(){
        this.candidates = new Map()

        this.candidates.set(Number(1), new Candidate(1, "ivan", "ivanov", "ivanovich", "email@email.com", "888888", CANDIDATE_STATUS.empty))
        this.candidates.set(Number(2), new Candidate(2, "ivan2", "ivanov2", "ivanovich2", "222email@email.com", "22888888", CANDIDATE_STATUS.empty))
    }

    /**
     * Метод возвращает последний индекс коллекции
     * @returns последний индекс коллекции
     */
    getLastID(){
        if (this.candidates.size == 0) {
            return 0
        }
        else{
            let keys = Array.from(this.candidates.keys());
            return Math.max.apply(null, keys)
        }
    }

    /**
     * Метод возвращает список кандиидатов в виде массива
     * @returns список кандидата в виде массива
     */
    getCandidates(){
        return new Promise((resolve, refect) =>{ 
            resolve(Array.from(this.candidates.values()))
        })
    }

    /**
     * Метод возвращает кандидата по ID
     * @param {number} id ID кандидата
     * @returns кандидата
     */
    getCandidateByID(id){
        return new Promise((resolve, reject) => {
            resolve(this.candidates.get(Number(id)))
        })
    }

    /**
     * Метод возвращает данные о кандидатах в формате {ID, VALUE}, где
     * ID - ID,
     * VALUE - lastname + firstname + patronymic
     * @returns {Array} Массив объектов {ID, VALUE}
     */
    getCandidatesLikeIDValue(){
        return new Promise((resolve, reject) =>{
            let result = []
            this.candidates.forEach(e => {
                result.push({id:e.ID, value:e.lastname + ' ' + e.firstname + ' ' + e.patronymic})
            });
            resolve(result)
        })
    }

    /**
     * Метод создаёт кандидата по заданным параметрам
     * @param {{ id: number; firstname: string; lastname: string; patronymic: string; email: string; phone: string; id_candidates_status: number; }} candidate объект класса Candidate
     * @returns кандидата
     */
    createCandidate(candidate){

        return new Promise((resolve, reject) => {
            let id = this.getLastID() + 1
            let newCandidate = new Candidate(id, candidate.firstname, candidate.lastname, candidate.patronymic, 
                candidate.email, candidate.phone, candidate.status)
            this.candidates.set(id, newCandidate)

            resolve(newCandidate)
        })
    }

    /**
     * Метод обновляет кандидата по заданным параметрам
     * @param {{ id: number; firstname: string; lastname: string; patronymic: string; email: string; phone: string; id_candidates_status: number; }} candidate объект класса Candidate
     * @returns кандидата
     */
    updateCandidate(candidate){
        return new Promise((resolve, reject) => {
            this.getCandidateByID(candidate.ID).then((updatingCandidate)=>{
                if (updatingCandidate != null) {
                    this.candidates.set(updatingCandidate.ID, new Candidate(
                        updatingCandidate.ID, candidate.firstname, candidate.lastname, 
                        candidate.patronymic, candidate.email, candidate.phone, candidate.status))
                    resolve(candidate) 
                }
            })
        })
    }

    /**
     * Метод обновляет статус кандидата
     * @param {number} candidateID ID кандидата
     * @param {CANDIDATE_STATUS} status новый статус
     * @returns кандидата
     */
    updateCandidateStatus(candidateID, status){
        return new Promise((resolve, reject) => {
            this.getCandidateByID(candidateID).then((candidate) => {
                if (candidate != null) {
                    candidate.status = status
                    this.candidates.set(candidate.ID, candidate)
                    console.log(this.candidates)
                    resolve(candidate)   
                }
            })
        })
    }

    /**
     * Метод удаляет кандидата по ID
     * @param {number} id ID кандидата
     */
    deleteCandidate(id){
        return new Promise((resolve, reject)=>{
            this.getCandidateByID(id).then((deletingCandidate)=>{
                if (deletingCandidate != null) {
                    this.candidates.delete(Number(id))
                    resolve()      
                }
            })
        })
    }
}