import { EmployeeModel } from "../../../models/EmployeeModel.js"


export class CCreateEmployeeWindow{
    constructor(){

    }

    init(refreshDatatable){
        this.employeeModel = new EmployeeModel()
        this.refreshDatatable = refreshDatatable

        this.window = $$("createWindow")
        this.main = $$("main")
        this.form = $$("createForm")

        this.attachEmployeeOnCreateWindow()
    }

    attachEmployeeOnCreateWindow(){
        $$("createWindowClose").attachEvent("onItemClick", ()=>{
            this.window.close()
            this.main.enable()
        })

        this.window.attachEvent("onHide", ()=> {
            this.window.close()
            this.main.enable()
        })

        $$("createWindowButton").attachEvent("onItemClick", ()=>{
            if (!this.form.validate()){
                webix.message("Проверьте поля!")
                return
            }
            let values = this.fetch()
            this.employeeModel.createEmployee(values).then(()=>{
                this.refreshDatatable()
                this.window.close()
                this.main.enable()
            })
        })

        this.window.show()
        this.main.disable()
    }


    /**
     * Метод возвращает данные с формы
     * @returns данные с формы
     */
    fetch(){
        return this.form.getValues()
    }

    /**
     * Метод для заполнение формы данными
     * @param {*} values значения
     */
    parse(values){
        this.form.setValues(values)
    }

    /**
     * Метод для проверки строк на пустоту
     * @returns true/false
     */
    isEmptyString(){
        for (let index = 0; index < arguments.length; index++) {
            const element = arguments[index];
            if (element.trim() == ''){
                return true
            }
        }
        return false
    }
}