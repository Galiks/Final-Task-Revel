package controllers

import (
	"revel-app/app/models/entities"
	"revel-app/app/models/providers"

	"github.com/revel/revel"
)

//CEmployee контроллер для сотрудников
type CEmployee struct {
	*revel.Controller
	employeeProvider *providers.PEmployee
}

// //Before интерцептор BEFOR контроллера CEmployee
// func (controller *CEmployee) Before() (result revel.Result, rc CEmployee) {
// 	return nil, *controller
// }

// //After интерцептор AFTER контроллера CEmployee
// func (controller *CEmployee) After() (result revel.Result, rc CEmployee) {
// 	return nil, *controller
// }

//GetEmployees метод получения всех сотрудников
func (controller *CEmployee) GetEmployees() revel.Result {
	//var employees []*entities.Employee = controller.employeeProvider.GetEmployees()

	return nil
}

//GetEmployeeByID метод получения сотрудника по ID
func (controller *CEmployee) GetEmployeeByID() revel.Result {
	return nil
}

//GetEmployeesByEvent метод получения сотрудников по ID мероприятия
func (controller *CEmployee) GetEmployeesByEvent() revel.Result {
	return nil
}

//CreateEmployee метод создания сотрудника
func (controller *CEmployee) CreateEmployee() revel.Result {
	return nil
}

//CreateLinkToEvent метод создания свяязи между сотрудником и мероприятием
func (controller *CEmployee) CreateLinkToEvent() revel.Result {
	return nil
}

//UpdateEmployee метод изменения сотрудника
func (controller *CEmployee) UpdateEmployee() revel.Result {
	return nil
}

//DeleteEmployee метод удаления сотрудника
func (controller *CEmployee) DeleteEmployee() revel.Result {
	return nil
}

//DeleteEmployeesFromEvent метод удаления сотрудников из мероприятия
func (controller *CEmployee) DeleteEmployeesFromEvent() revel.Result {
	return nil
}

func (controller *CEmployee) fetchPost() (e entities.Employee, err error) {
	return
}
