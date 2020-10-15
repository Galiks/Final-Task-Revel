package providers

import (
	"revel-app/app/models/entities"
	"revel-app/app/models/mappers"
)

//PEmployee провайдер контроллера сотрудника
type PEmployee struct {
	employeeMapper *mappers.MEmployee
}

//GetEmployees метод получения всех сотрудников
func (p *PEmployee) GetEmployees() (es []*entities.Employee, err error) {
	return p.employeeMapper.SelectAll()
}

//GetEmployeeByID метод получения сотрудника по ID
func (p *PEmployee) GetEmployeeByID(ID int64) (e *entities.Employee, err error) {
	return p.employeeMapper.SelectByID(ID)
}

//GetEmployeesByEventID метод получения сотрудников, связанных с мероприятием
func (p *PEmployee) GetEmployeesByEventID(ID int64) (es []*entities.Employee, err error) {
	return p.employeeMapper.SelectByEventID(ID)
}

//CreateEmployee метод создания сотрудника
func (p *PEmployee) CreateEmployee(employee *entities.Employee) (e *entities.Employee, err error) {
	return p.employeeMapper.Insert(employee)
}

//UpdateEmployee метод изменения сотрудника
func (p *PEmployee) UpdateEmployee(employee *entities.Employee) (e *entities.Employee, err error) {
	return p.employeeMapper.Update(employee)
}

//DeleteEmployee метод удаления сотрудника по ID
func (p *PEmployee) DeleteEmployee(IDEmployee int64) (err error) {
	return p.employeeMapper.Delete(IDEmployee)
}
