export class User{
    /**
     * 
     * @param {number} id 
     * @param {string} login 
     * @param {string} password 
     * @param {Blob} userPhoto 
     * @param {Date} lastVisited 
     */
    constructor(id, login, password, userPhoto, lastVisited){
        this.ID = id
        this.login = login
        this.password = password
        this.userPhoto = userPhoto
        this.lastVisited = lastVisited
    }
}