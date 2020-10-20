import { User } from "./entities/User.js";

export class UserModel{
    constructor(){
        this.users = new Map()
        this.users.set(1, new User(1, "admin", "admin", null, new Date()))
    }

    /**
     * Метод возвращает пользователя по ID
     * @param {number} id 
     * @returns пользователь
     */
    getUserById(id){
        return new Promise((resolve, reject) =>{
            resolve(this.users.get(id))
        })
    }

    /**
     * Метод возвращает пользователя, если логин и пароль совпадают
     * @param {string} login логин пользователя
     * @param {string} password пароль пользователя
     */
    getUserByLoginAndPassword(login, password){
        return new Promise((resolve, reject)=>{
            let users = Array.from(this.users.values())
            users.forEach(user => {
                if (user.login == login && user.password == password) {
                    resolve(user)
                }
            });
        })
    }

    /**
     * Метод создаёт пользователя по заданным параметрам
     * @param {{login: string; password: string; userPhoto: Blob; lastVisited: Date}} user 
     * @returns пользователь
     */
    createUser(user){
        return new Promise((resolve, reject)=>{
            let id = this.users.size + 1
            let newUser = new User(id, user.login, user.password, user.userPhoto, user.lastVisited)
            this.users.set(id, newUser)

            resolve(newUser)
        })
    }

    /**
     * Метод обновляет пользователя по заданным параметрам
     * @param {{login: string; password: string; userPhoto: Blob; lastVisited: Date}} user 
     * @returns пользователь
     */
     updateUser(user){
        return new Promise((resolve, reject)=>{
            this.getUesrById(user.id).then((updatingUser)=>{
                if (updatingUser != null) {
                    this.users.set(user.id, user)
                    resolve(user)
                }
            })
        })
    }

    /**
     * Метод удаляет пользователя по ID
     * @param {number} id 
     */
     deleteUser(id){
        return new Promise((resolve, reject)=>{
            this.getUesrById(id).then((deletingUser)=>{
                if (deletingUser != null) {
                    this.users.delete(id)
                    resolve()
                }
            })
        })
    }
}