export class User{
    /**
     * 
     * @param {number} id 
     * @param {string} login 
     * @param {string} password 
     * @param {string} role
     * @param {Blob} userPhoto 
     * @param {Date} lastVisited 
     */
    constructor(id, login, password, role, userPhoto, lastVisited){
        this.ID = id
        this.login = login
        this.password = password
        this.role = role,
        this.userPhoto = userPhoto
        this.lastVisited = lastVisited
    }
}