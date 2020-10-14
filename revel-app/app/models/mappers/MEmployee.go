package mappers

import (
	"database/sql"
	"revel-app/app/models/entities"
)

//MEmployee маппер сотрудников
type MEmployee struct {
	db *sql.DB
}

//SelectAll получение всех сотрудников
func (m *MEmployee) SelectAll() (es []*entities.Employee, err error) {
	return
}

//SelectByEventID получение сотрудников, связанных с мероприятием
func (m *MEmployee) SelectByEventID(IDEvent int64) (es []*entities.Employee, err error) {
	return
}

//SelectByID получение сотрудников по ID
func (m *MEmployee) SelectByID(ID int64) (e *entities.Employee, err error) {
	return
}

//Insert добавление сотрудников
func (m *MEmployee) Insert(Employee entities.Employee) (e *entities.Employee, err error) {
	return
}

//InsertEmployeeToEvent связывание сотрудника и мероприятия
func (m *MEmployee) InsertEmployeeToEvent(IDEmloyee int64, IDEvent int64) (err error) {
	return
}

//Update изменение сотрудника
func (m *MEmployee) Update(Employee entities.Employee) (e *entities.Employee, err error) {
	return
}

//DeleteEmployeesFromEvent удаляет всех сотрудников из мероприятия
func (m *MEmployee) DeleteEmployeesFromEvent(IDEvent int64) (err error) {
	return
}

//Delete удаление сотрудника
func (m *MEmployee) Delete(ID int64) (err error) {
	return
}
