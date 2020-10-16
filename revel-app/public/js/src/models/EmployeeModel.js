import {Employee} from './entities/Employee.js'

export class EmployeeModel{
    
    constructor(){
        
    }

    /**
     * Метод возвращает список сотрудников в виде массива
     * @returns список сотрдуников в виде массива
     */
    async getEmloyees() {
        let request = await fetch(`/employee/all`)
        let response = await request.json()

        return new Promise((resolve, reject)=>{
            let employees = []
            for (const item of response) {
                let employee = new Employee(item.ID, item.firstname, item.lastname, item.patronymic, item.position, item.email, item.phone, item.id_user)
                employees.push(employee)
            }
            resolve(employees)
        })
    }

    /**
     * Метод возвращает данные о сотрудниках в формате {ID, VALUE}, где
     * ID - ID,
     * VALUE - position + lastname + firstname + patronymic
     * @returns {Array} Массив объектов {ID, VALUE}
     */
    getEmployeesLikeIDValue(){
        return new Promise((resolve, reject)=>{
            let result = []
            this.getEmloyees().then((employees) =>{
                employees.forEach(employee => {
                    result.push({id:employee.ID, value:employee.position + ' ' + employee.lastname + ' ' + employee.firstname + ' ' + employee.patronymic})
                });
                resolve(result)
            })
        })
    }

    /**
     * Метод возвращает сотрудника по его ID
     * @param {number} id ID сотрудника
     * @returns сотрудника
     */
    async getEmployeeByID(id) {
        let request = await fetch(`employee/${id}`)
        let response = await request.json()
        if (response.Err != null){
            webix.message("ОШИБКА");
            return
        }

        return new Promise((resolve, reject)=>{
            let employees = []
            for (const item of response) {
                let employee = new Employee(item.ID, item.firstname, item.lastname, item.patronymic, item.position, item.email, item.phone, item.id_user)
                employees.push(employee)
            }
            resolve(employees)
        })
    }

    /**
     * Метод создаёт сотрудника по заданным параметрам
     * @param {{ id: number; firstname: string; lastname: string; patronymic: string; position: string; email: string; phone: string; id_user: number; }} employee объект класса Employee
     * @returns нового сотрудника
     */
    async createEmployee(employee) {
        let request = await fetch(`/employee`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                firstname: employee.firstname,
                lastname: employee.lastname,
                patronymic: employee.patronymic,
                position: employee.position,
                email: employee.email,
                phone: employee.phone,
                id_user: employee.id_user
            })
        })
        if (request.status != 200){
            webix.message("ОШИБКА");
            return
        }
        

        return new Promise((resolve, reject)=>{
            resolve(request.json())
        })
    }

    /**
     * Метод обновляет сотрудника по заданным параметрам
     * @param {Employee} employee объект класса Employee
     * @returns сотрудника
     */
    async updateEmployee(employee){
        let request = await fetch(`/employee/${employee.ID}`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                ID:employee.ID,
                firstname: employee.firstname,
                lastname: employee.lastname,
                patronymic: employee.patronymic,
                position: employee.position,
                email: employee.email,
                phone: employee.phone,
                id_user: employee.id_user
            })
        })
        if (request.status != 200){
            webix.message("ОШИБКА");
            return
        }

        return new Promise((resolve, reject)=>{
            resolve(request.json())
        })
    }

    /**
     * Метод удаляет сотрудника по его ID
     * @param {number} id ID сотрудника
     */
    async deleteEmployee(id){
        let request = await fetch(`/employee/${id}`, {
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

        return new Promise((resolve, reject)=>{
            resolve()
        })
    }
}