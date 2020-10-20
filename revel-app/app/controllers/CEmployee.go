package controllers

import (
	"encoding/json"
	"fmt"
	"revel-app/app/models/entities"
	"revel-app/app/models/providers"
	"strconv"

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
	controller.employeeProvider = &providers.PEmployee{}
	employees, err := controller.employeeProvider.GetEmployees()
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(employees)
}

//GetEmployeeByID метод получения сотрудника по ID
func (controller *CEmployee) GetEmployeeByID() revel.Result {
	id, _ := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	controller.employeeProvider = &providers.PEmployee{}
	employee, err := controller.employeeProvider.GetEmployeeByID(id)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(employee)
}

//GetEmployeesByEvent метод получения сотрудников по ID мероприятия
func (controller *CEmployee) GetEmployeesByEvent() revel.Result {
	id, _ := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	fmt.Println("GetEmployeesByEvent ID: ", id)
	controller.employeeProvider = &providers.PEmployee{}
	employees, err := controller.employeeProvider.GetEmployeesByEventID(id)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(employees)
}

//CreateEmployee метод создания сотрудника
func (controller *CEmployee) CreateEmployee() revel.Result {
	employee := &entities.Employee{}
	err := json.Unmarshal(controller.Params.JSON, employee)
	if err != nil {
		fmt.Println("Unmarshalling: ", err)
		return controller.RenderJSON(err)
	}
	controller.employeeProvider = &providers.PEmployee{}
	result, err := controller.employeeProvider.CreateEmployee(employee)

	return controller.RenderJSON(result)
}

//UpdateEmployee метод изменения сотрудника
func (controller *CEmployee) UpdateEmployee() revel.Result {
	employee := &entities.Employee{}
	err := json.Unmarshal(controller.Params.JSON, employee)
	if err != nil {
		fmt.Println("Unmarshalling: ", err)
		return controller.RenderJSON(err)
	}
	controller.employeeProvider = &providers.PEmployee{}
	result, err := controller.employeeProvider.UpdateEmployee(employee)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}

	return controller.RenderJSON(result)
}

//DeleteEmployee метод удаления сотрудника
func (controller *CEmployee) DeleteEmployee() revel.Result {
	id, _ := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	fmt.Println(id)
	controller.employeeProvider = &providers.PEmployee{}
	err := controller.employeeProvider.DeleteEmployee(id)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(nil)
}
