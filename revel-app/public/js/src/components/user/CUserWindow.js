import { User } from "../../models/entities/User.js";
import { UserModel } from "./../../models/UserModel.js";
import { UserWindow } from "./UserWindowView.js";

export class CUserWindow{
    constructor(){
        this.userModel = new UserModel()
        this.currentUser = new User();
    }

    init(refreshDatatable){
        this.refreshDatatable = refreshDatatable
    }

    deleteWindow(employee){
        webix.ui(this.employeeWindowView.viewDeleteWindow(employee))
        //this.deleteWindowController.init(employee, this.employeeModel, () => {this.refreshDatatable()})
    }

    updateWindow(employee){
        webix.ui(this.employeeWindowView.viewUpdateWindow())
        //this.updateWindowController.init(employee, this.employeeModel, ()=>{this.refreshDatatable()})
    }

    aboutWindow(employee){
        webix.ui(this.employeeWindowView.viewAboutWindow(employee))
        //this.aboutWindowController.init(this.employeeModel, ()=>{this.refreshDatatable()})
    }
}