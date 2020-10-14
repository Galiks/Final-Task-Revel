import { CANDIDATE_STATUS } from "../../components/candidate/CCandidateWindow.js";

export class Candidate{
    /**
     * @param {number} id 
     * @param {string} firstname 
     * @param {string} lastname 
     * @param {string} patronymic 
     * @param {string} email 
     * @param {string} phone 
     * @param {CANDIDATE_STATUS} status
     * @param {number} id_user
     */
    constructor(id, firstname, lastname, patronymic, email, phone, status, id_user){
        this.ID = id;
        this.firstname = firstname
        this.lastname = lastname
        this.patronymic = patronymic
        this.email = email
        this.phone = phone
        this.status = status,
        this.id_user = id_user
    }
}