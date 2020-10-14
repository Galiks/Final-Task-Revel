

export class CCreateEmployeeWindow{
    constructor(){

    }

    init(employeeModel, refreshDatatable){
        this.employeeModel = employeeModel
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

            var form = $$("createForm");
            if (!form.validate()){
                webix.message("Email имеет неверный формат!")
                $$("createForm").clear()
                return
            }
            let values = this.fetch("createForm")
            if (this.isEmptyString(values.firstname, values.lastname, values.position, values.email, values.phone)) {
                webix.message("Один из параметров оказался пустым!")
                return
            }
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