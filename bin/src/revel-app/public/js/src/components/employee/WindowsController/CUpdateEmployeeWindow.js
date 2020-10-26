import { EmployeeModel } from "../../../models/EmployeeModel.js"

export class CUpdateEmployeeWindow{
    constructor(){

    }

    init(employee, refreshDatatable){
        this.employeeModel = new EmployeeModel()
        this.refreshDatatable = refreshDatatable

        this.window = $$("updateWindow")
        this.main = $$("main")
        this.form = $$("updateForm")

        this.attachEmployeeOnUpdateWindow(employee)
    }

    attachEmployeeOnUpdateWindow(employee){

        this.parse(employee)

        $$("updateWindowClose").attachEvent("onItemClick", ()=>{
            this.window.close()
            this.main.enable()
        });

        this.window.attachEvent("onHide", ()=> {
            this.window.close()
            this.main.enable()
        })

        $$("updateWindowButton").attachEvent("onItemClick", ()=>{

            if (!this.form.validate()){
                webix.message("Проверьте поля!")
                return
            }

            let values = this.fetch()
            this.employeeModel.updateEmployee(values).then(()=>{
                this.window.close()
                this.main.enable()   
                this.refreshDatatable()
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
}