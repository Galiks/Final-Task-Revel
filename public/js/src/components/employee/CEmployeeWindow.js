import { EmployeeModel } from '../../models/EmployeeModel.js';
import { EmployeeWindowView } from './EmployeeWindowView.js'
import { CAboutEmployeeWindow } from './WindowsController/CAboutEmployeeWindow.js';
import { CCreateEmployeeWindow } from './WindowsController/CCreateEmployeeWindow.js';
import { CDeleteEmployeeWindow } from './WindowsController/CDeleteEmployeeWindow.js';
import { CUpdateEmployeeWindow } from './WindowsController/CUpdateEmployeeWindow.js';

export class CEmployeeWindow{
    constructor(){
        this.employeeWindowView = new EmployeeWindowView()
    }

    /**
     * Метод для инициализации
     */
    init( refreshDatatable){
        this.refreshDatatable = refreshDatatable

        this.createWindowController = new CCreateEmployeeWindow()
        this.updateWindowController = new CUpdateEmployeeWindow()
        this.deleteWindowController = new CDeleteEmployeeWindow()
        this.aboutWindowController = new CAboutEmployeeWindow()
    }

    createWindow(){
        webix.ui(this.employeeWindowView.viewCreateWindow())
        this.createWindowController.init(()=>{this.refreshDatatable()})
    }

    deleteWindow(employee){
        webix.ui(this.employeeWindowView.viewDeleteWindow(employee))
        this.deleteWindowController.init(employee,() => {this.refreshDatatable()})
    }

    updateWindow(employee){
        webix.ui(this.employeeWindowView.viewUpdateWindow())
        this.updateWindowController.init(employee, ()=>{this.refreshDatatable()})
    }

    aboutWindow(employee){
        webix.ui(this.employeeWindowView.viewAboutWindow(employee))
        this.aboutWindowController.init(()=>{this.refreshDatatable()})
    }
}