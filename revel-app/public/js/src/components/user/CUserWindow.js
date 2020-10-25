import { User } from "../../models/entities/User.js";
import { UserModel } from "./../../models/UserModel.js";
import { UserWindowView } from "./UserWindowView.js";

export class CUserWindow{
    constructor(){
        this.userModel = new UserModel()
        this.currentUser = new User();
        this.userWindowView = new UserWindowView()
    }

    init(refreshDatatable){
        this.refreshDatatable = refreshDatatable

        this.main = $$("main")
        
        
        
    }

    deleteWindow(user){
        webix.ui(this.userWindowView.viewDeleteWindow(user))
        this.deleteWindowID = $$("deleteWindow")
        //this.deleteWindowController.init(employee, this.employeeModel, () => {this.refreshDatatable()})
    }

    updateWindow(){
        webix.ui(this.userWindowView.viewUpdateWindow())
        this.updateWindowID = $$("updateWindow")
        //this.updateWindowController.init(employee, this.employeeModel, ()=>{this.refreshDatatable()})
    }

    aboutWindow(user){
        webix.ui(this.userWindowView.viewAboutWindow(user))
        this.aboutWindowID = $$("aboutWindow")
        this.attachToEventAboutWindow()
    }

    attachToEventAboutWindow(){
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
}