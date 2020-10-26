package controllers

import (
	"encoding/json"
	"fmt"
	"revel-app/app/helpers"
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

//Before интерцептор BEFOR контроллера CEmployee
func (controller *CEmployee) Before() revel.Result {
	var path = controller.Request.GetPath()
	if path == "/employee/all" {
		return nil
	}
	var (
		cache helpers.ICache // экземпляр кэша
		err   error          // ошибка в ходе выполнения функции
	)

	// инициализация кэша
	cache, err = helpers.GetCache()
	if err != nil {
		revel.AppLog.Errorf("CCandidate.Before : helpers.GetCache, %s\n", err)
		return controller.RenderJSON(err)
	}

	// Проверка существования токена сервера для пользователя
	if _, ok := cache.TokenIsActualBySID(controller.Session.ID()); !ok {
		// return controller.Redirect((*CError).Unauthorized)
		return controller.Redirect((*CError).Unauthorized)
	}

	return nil
}

// //After интерцептор AFTER контроллера CEmployee
// func (controller *CEmployee) After() (result revel.Result, rc CEmployee) {
// 	return nil, *controller
// }

//GetEmployees метод получения всех сотрудников
func (controller *CEmployee) GetEmployees() revel.Result {
	controller.employeeProvider = &providers.PEmployee{}
	employees, err := controller.employeeProvider.GetEmployees()
	if err != nil {
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(employees)
}

//GetEmployeeByID метод получения сотрудника по ID
func (controller *CEmployee) GetEmployeeByID() revel.Result {
	id, err := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	if err != nil {
		fmt.Println("CEmployee.GetEmployeeByID : strconv.ParseInt error : ", err)
		revel.AppLog.Errorf("CEmployee.GetEmployeeByID : strconv.ParseInt, %s\n", err)
		return controller.RenderJSON(err)
	}
	controller.employeeProvider = &providers.PEmployee{}
	employee, err := controller.employeeProvider.GetEmployeeByID(id)
	if err != nil {
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(employee)
}

//GetEmployeesByEvent метод получения сотрудников по ID мероприятия
func (controller *CEmployee) GetEmployeesByEvent() revel.Result {
	id, err := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	if err != nil {
		fmt.Println("CEmployee.GetEmployeesByEvent : strconv.ParseInt error : ", err)
		revel.AppLog.Errorf("CEmployee.GetEmployeesByEvent : strconv.ParseInt, %s\n", err)
		return controller.RenderJSON(err)
	}
	controller.employeeProvider = &providers.PEmployee{}
	employees, err := controller.employeeProvider.GetEmployeesByEventID(id)
	if err != nil {
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(employees)
}

//CreateEmployee метод создания сотрудника
func (controller *CEmployee) CreateEmployee() revel.Result {
	employee := &entities.Employee{}
	err := json.Unmarshal(controller.Params.JSON, employee)
	if err != nil {
		fmt.Println("CEmployee.CreateEmployee : json.Unmarshal error : ", err)
		revel.AppLog.Errorf("CEmployee.CreateEmployee : json.Unmarshal, %s\n", err)
		return controller.RenderJSON(err)
	}
	controller.employeeProvider = &providers.PEmployee{}
	result, err := controller.employeeProvider.CreateEmployee(employee)
	if err != nil {
		return controller.RenderJSON(err)
	}

	return controller.RenderJSON(result)
}

//UpdateEmployee метод изменения сотрудника
func (controller *CEmployee) UpdateEmployee() revel.Result {
	employee := &entities.Employee{}
	err := json.Unmarshal(controller.Params.JSON, employee)
	if err != nil {
		fmt.Println("CEmployee.UpdateEmployee : json.Unmarshal error : ", err)
		revel.AppLog.Errorf("CEmployee.UpdateEmployee : json.Unmarshal, %s\n", err)
		return controller.RenderJSON(err)
	}
	controller.employeeProvider = &providers.PEmployee{}
	result, err := controller.employeeProvider.UpdateEmployee(employee)
	if err != nil {
		return controller.RenderJSON(err)
	}

	return controller.RenderJSON(result)
}

//DeleteEmployee метод удаления сотрудника
func (controller *CEmployee) DeleteEmployee() revel.Result {
	id, err := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	if err != nil {
		fmt.Println("CEmployee.DeleteEmployee : strconv.ParseInt error : ", err)
		revel.AppLog.Errorf("CEmployee.DeleteEmployee : strconv.ParseInt, %s\n", err)
		return controller.RenderJSON(err)
	}
	controller.employeeProvider = &providers.PEmployee{}
	err = controller.employeeProvider.DeleteEmployee(id)
	if err != nil {
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(nil)
}
