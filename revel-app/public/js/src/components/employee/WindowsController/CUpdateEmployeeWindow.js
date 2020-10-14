export class CUpdateEmployeeWindow{
    constructor(){

    }

    init(employee, employeeModel, refreshDatatable){
        this.employeeModel = employeeModel
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

            var form = $$("updateForm");
            if (!form.validate()){
                webix.message("Email имеет неверный формат!")
                $$("updateForm").clear()
                return
            }

            let values = this.fetch("updateForm")
            if (this.isEmptyString(values.firstname, values.lastname, values.patronymic, values.position, values.email, values.phone)) {
                webix.message("Один из параметров оказался пустым!")
                $$("updateForm").clear()
                return
            }
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