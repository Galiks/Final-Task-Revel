import { User } from "./entities/User.js";

export class UserModel{
    constructor(){
    }

    /**
     * Метод возвращает пользователя по ID
     * @param {number} id 
     * @returns пользователь
     */
    async getUserById(id){
        let request = await fetch(`/user/${id}`)
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
        
        if (response != null) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }

        return new Promise((resolve, reject)=>{
            let user = new User(response.ID, response.login, response.password, response.role, response.userPhoto, this.toDate(response.lastVisited))
            resolve(user)
        })
    }

    async getUsers(){
        let request = await fetch(`/user/all`)
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
        
        if (response != null) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }

        return new Promise((resolve, reject)=>{
            let users = []
            if (response != null) {
                for (const item of response) {
                    let user = new User(item.ID, item.login, item.password, item.role, item.userPhoto, this.toDate(item.lastVisited))
                    users.push(user)
                }
            }
            resolve(users)
        })
    }

    toDate(ISOdate){ 
        let date = ISOdate.split('T')
        let time = date[1].split(':')
        let hh = time[0]
        let mm = time[1]
        return date[0] + " " + hh + ":" + mm
    }

    /**
     * Метод возвращает пользователя, если логин и пароль совпадают
     * @param {string} login логин пользователя
     * @param {string} password пароль пользователя
     */
    async login(login, password){
        //let user = new User(0, login, password, "", null, null)
        let request = await fetch(`/user/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                ID: 0,
                login: login,
                password: password,
                role: "",
                userPhoto: null,
                lastVisited: null
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

    async logout(){
        let request = await fetch(`/user/auth/logout`)
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
        if (response != null) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }
    }

    async check(){
        let request = await fetch(`/user/auth/check`, {
            method: "POST"
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

    async getCurrentUser(){
        let request = await fetch(`/user/auth/current`)

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
        if (response != null) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }

        return new Promise((resolve, reject)=>{
            let user = new User(response.ID, response.login, response.password, response.role, response.userPhoto, this.toDate(response.lastVisited))
            resolve(user)
        })
    }

    /**
     * Метод создаёт пользователя по заданным параметрам
     * @param {{login: string; password: string; userPhoto: Blob; lastVisited: Date, role: string}} user 
     * @returns пользователь
     */
    async createUser(user){
        let request = await fetch(`/user`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                login: user.login,
                password: user.password,
                userPhoto: user.userPhoto,
                lastVisited: user.lastVisited,
                role: user.role
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
     * Метод обновляет пользователя по заданным параметрам
     * @param {{login: string; password: string; userPhoto: Blob; lastVisited: Date}} user 
     * @returns пользователь
     */
    async updateUser(user){
        let request = await fetch(`/user/${user.ID}`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                ID: Number(user.ID),
                login: user.login,
                password: user.password,
                userPhoto: user.userPhoto,
                lastVisited: user.lastVisited,
                role: user.role
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
        if (response != null) {
            if (response.Severity == "ОШИБКА") {
                webix.message(response.Message)
                return
            }
        }

        return new Promise((resolve, reject)=>{
            let user = new User(response.ID, response.login, response.password, response.role, response.userPhoto, response.lastVisited)
            resolve(user)
        })
    }

    /**
     * Метод удаляет пользователя по ID
     * @param {number} id 
     */
    async deleteUser(id){
        let request = await fetch(`/user/${id}`, {
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

    toDate(ISOdate){ 
        let date = ISOdate.split('T')
        let time = date[1].split(':')
        let hh = time[0]
        let mm = time[1]


        return date[0] + " " + hh + ":" + mm
    }
}