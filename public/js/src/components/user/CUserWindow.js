import { EmployeeModel } from "../../models/EmployeeModel.js";
import { User } from "../../models/entities/User.js";
import { UserModel } from "./../../models/UserModel.js";
import { UserWindowView } from "./UserWindowView.js";

export class CUserWindow{
    constructor(){
        this.userModel = new UserModel()
        this.currentUser = new User();
        this.userWindowView = new UserWindowView()
        this.employeeModel = new EmployeeModel()
    }

    init(refreshDatatable){
        this.refreshDatatable = refreshDatatable
        this.main = $$("main")     
    }

    deleteWindow(user){
        webix.ui(this.userWindowView.viewDeleteWindow(user))
        this.deleteWindowID = $$("deleteWindow")
        this.attachEventOnDeleteWindow(user)
    }

    attachEventOnDeleteWindow(user){
        $$("deleteWindowClose").attachEvent("onItemClick", () => {
            this.deleteWindowID.close()
            this.main.enable()     
        })

        this.deleteWindowID.attachEvent("onHide", ()=> {
            this.deleteWindowID.close()
            this.main.enable()
        })

        $$("deleteWindowButtonYes").attachEvent("onItemClick", () =>{
            this.userModel.deleteUser(user.ID).then(()=>{
                this.refreshDatatable()
                this.deleteWindowID.close()
                this.main.enable()
            })
        })
        $$("deleteWindowButtonNo").attachEvent("onItemClick", () =>{
            this.deleteWindowID.close()
            this.main.enable()
        })

        this.deleteWindowID.show()
        this.main.disable()
    }

    updateWindow(user){
        webix.ui(this.userWindowView.viewUpdateWindow())
        this.updateWindowID = $$("updateWindow")
        this.updateForm = $$("updateForm")
        this.attachEventOnUpdateWindow(user)
    }

    attachEventOnUpdateWindow(user){
        this.parse(user)

        $$("updateWindowButton").attachEvent("onItemClick", async ()=>{
            if (!this.updateForm.validate()){
                webix.message("Проверьте поля!")
                return
            }
            let values = this.fetch()
            let user = new User(values.ID, values.login, "", values.role, null, null)
            await this.userModel.updateUser(user)
            this.refreshDatatable()
            this.updateWindowID.close()
            this.main.enable() 
        })

        if (!this.updateForm.validate()){
            webix.message("Проверьте поля!")
            return
        }

        $$("updateWindowClose").attachEvent("onItemClick", ()=>{
            this.updateWindowID.close()
            this.main.enable()    
        })

        this.updateWindowID.attachEvent("onHide", ()=> {
            this.updateWindowID.close()
            this.main.enable()
        })

        this.updateWindowID.show()
        this.main.disable()
    }

    changePasswordWindow(user){
        webix.ui(this.userWindowView.viewChangePasswordWindow())
        this.changePasswordWindowID = $$("changePasswordWindow")
        this.changePasswordForm = $$("changePasswordForm")
        this.attachEventOnChangePasswordWindow(user)
    }

    attachEventOnChangePasswordWindow(user){
        this.changePasswordForm.setValues(user)
        $$("changePasswordWindowButton").attachEvent("onItemClick", async ()=>{
            if (!this.changePasswordForm.validate()){
                webix.message("Проверьте поля!")
                return
            }
            let values = this.changePasswordForm.getValues()
            if (values.password != values.repeatPassword){
                webix.message("Проверьте поля!")
                return
            }
            let user = new User(values.ID, "", values.password, "", null, null)
            await this.userModel.updateUser(user)
            this.refreshDatatable()
            this.changePasswordWindowID.close()
            this.main.enable() 
        })

        $$("changePasswordWindowClose").attachEvent("onItemClick", ()=>{
            this.changePasswordWindowID.close()
            this.main.enable()    
        })

        this.changePasswordWindowID.attachEvent("onHide", ()=> {
            this.changePasswordWindowID.close()
            this.main.enable()
        })

        this.changePasswordWindowID.show()
        this.main.disable()
    }

    aboutWindow(user){
        webix.ui(this.userWindowView.viewAboutWindow(user))
        this.aboutWindowID = $$("aboutWindow")
        this.attachEventOnAboutWindow()
    }

    attachEventOnAboutWindow(){
        $$("aboutWindowClose").attachEvent("onItemClick", ()=>{
            this.aboutWindowID.close()
            this.main.enable()    
        })

        this.aboutWindowID.attachEvent("onHide", ()=> {
            this.aboutWindowID.close()
            this.main.enable()
        })

        this.aboutWindowID.show()
        this.main.disable()
    }

    async setUserToEmployee(user){
        webix.ui(this.userWindowView.viewSetUserToEmployee(user))
        this.setUserWindowID = $$("setUserWindow")
        await this.attachEventOnSetUserWindow(user)
    }

    async attachEventOnSetUserWindow(user){
        let employees = await this.employeeModel.getEmloyeesWithoutUser()
        let employeeOption = []
        employees.forEach((employee)=>{
            employeeOption.push({id:employee.ID, value:employee.lastname + ' ' + employee.firstname + ' ' + employee.patronymic})
        })
        $$("employeesSelect").define("options", employeeOption);
        $$("employeesSelect").refresh();

        $$("setUserWindowButton").attachEvent("onItemClick", async ()=>{
            let employeeID = $$("employeesSelect").getValue()
            let employee = await this.employeeModel.getEmployeeByID(employeeID)
            employee.id_user = user.ID
            await this.employeeModel.updateEmployee(employee)
            this.setUserWindowID.close()
            this.main.enable()
        })

        $$("setUserWindowClose").attachEvent("onItemClick", ()=>{
            this.setUserWindowID.close()
            this.main.enable()    
        })

        this.setUserWindowID.attachEvent("onHide", ()=> {
            this.setUserWindowID.close()
            this.main.enable()
        })

        this.setUserWindowID.show()
        this.main.disable()
    }

    fetch(){
        return this.updateForm.getValues()
    }

    parse(value){
        this.updateForm.setValues(value)
    }
}