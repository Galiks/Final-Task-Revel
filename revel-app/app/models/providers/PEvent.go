package providers

import (
	"revel-app/app/models/entities"
	"revel-app/app/models/mappers"
)

//PEvent провайдер контроллера мероприятия
type PEvent struct {
	eventMapper *mappers.MEvent
}

//GetEvents метод получения мероприятий
func (e *PEvent) GetEvents() (es []*entities.Event, err error) {
	return e.eventMapper.SelectAll()
}

//GetEventByID метод получения мероприятия по ID
func (e *PEvent) GetEventByID(ID int64) (en *entities.Event, err error) {
	return e.eventMapper.SelectByID(ID)
}

//CreateEvent метод создния мероприятия
func (e *PEvent) CreateEvent(event *entities.Event) (en *entities.Event, err error) {
	return e.eventMapper.Insert(event)
}

//UpdateEvent метод изменения мероприятия
func (e *PEvent) UpdateEvent(event *entities.Event) (en *entities.Event, err error) {
	return e.eventMapper.Update(event)
}

//DeleteEvent метод удаления мероприятия по ID
func (e *PEvent) DeleteEvent(ID int64) (err error) {
	return e.eventMapper.Delete(ID)
}

//SetCandidateStatusToFinishedEvent метод для обновления статуса кандидата в таблице связи между кандидатом и мероприятием
func (e *PEvent) SetCandidateStatusToFinishedEvent(IDcandidate int64, IDevent int64) error {
	return e.eventMapper.UpdateCandidateStatusToFinishedEvent(IDcandidate, IDevent)
}

//CreateLinkEmployeeToEvent метод создания связи между сотрудником и мероприятием
func (e *PEvent) CreateLinkEmployeeToEvent(IDEmployee int64, IDEvent int64) (err error) {
	return e.eventMapper.InsertEmployeeToEvent(IDEmployee, IDEvent)
}

//DeleteEmployeesFromEvent метод удаления всех сотрудников из мероприятия
func (e *PEvent) DeleteEmployeesFromEvent(IDEvent int64) (err error) {
	return e.eventMapper.DeleteEmployeesFromEvent(IDEvent)
}

//CreateLinkCandidateToEvent связывание кандидата и мероприятия
func (e *PEvent) CreateLinkCandidateToEvent(IDcandidate int64, IDevent int64) (err error) {
	return e.eventMapper.InsertCandidateToEvent(IDcandidate, IDevent)
}

//DeleteCandidatesFromEvent удаляет всех кандидатов из мероприятия
func (e *PEvent) DeleteCandidatesFromEvent(IDEvent int64) (err error) {
	return e.eventMapper.DeleteCandidatesFromEvent(IDEvent)
}
