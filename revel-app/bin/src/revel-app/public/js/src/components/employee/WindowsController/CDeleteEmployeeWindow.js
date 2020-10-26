import { EmployeeModel } from "../../../models/EmployeeModel.js"

export class CDeleteEmployeeWindow{
    constructor(){

    }

    init(employee, refreshDatatable){
        this.employeeModel = new EmployeeModel()
        this.refreshDatatable = refreshDatatable

        this.window = $$("deleteWindow")
        this.main = $$("main")

        this.attachEmployeeOnDeleteWindow(employee)
    }

    attachEmployeeOnDeleteWindow(employee){
        $$("deleteWindowClose").attachEvent("onItemClick", () => {
            this.window.close()
            this.main.enable()     
        })

        this.window.attachEvent("onHide", ()=> {
            this.window.close()
            this.main.enable()
        })

        $$("deleteWindowButtonYes").attachEvent("onItemClick", () =>{
            this.employeeModel.deleteEmployee(employee.ID).then(()=>{
                this.window.close()
                this.main.enable()
                this.refreshDatatable()
            })
        })
        $$("deleteWindowButtonNo").attachEvent("onItemClick", () =>{
            this.window.close()
            this.main.enable()
        })

        this.window.show()
        this.main.disable()
    }
}