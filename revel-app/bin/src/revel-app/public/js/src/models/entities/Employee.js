export class Employee{
    /**
     * 
     * @param {number} id 
     * @param {string} firstname 
     * @param {string} lastname 
     * @param {string} patronymic 
     * @param {string} position 
     * @param {string} email 
     * @param {string} phone 
     * @param {number} id_user 
     */
    constructor(id, firstname, lastname, patronymic, position, email, phone, id_user){
        this.ID = id
        this.firstname = firstname
        this.lastname = lastname
        this.patronymic = patronymic
        this.position = position
        this.email = email
        this.phone = phone
        this.id_user = id_user
    }
}