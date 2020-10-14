export class CAboutEmployeeWindow{
    constructor(){

    }

    init(employeeModel, refreshDatatable){
        this.employeeModel = employeeModel
        this.refreshDatatable = refreshDatatable

        this.window = $$("aboutWindow")
        this.main = $$("main")

        this.attachEmployeeOnAboutWindow()
    }

    attachEmployeeOnAboutWindow(){
        $$("aboutWindowClose").attachEvent("onItemClick", ()=>{
            this.window.close()
            this.main.enable()    
        })

        this.window.attachEvent("onHide", ()=> {
            this.window.close()
            this.main.enable()
        })

        this.window.show()
        this.main.disable()
    }
}