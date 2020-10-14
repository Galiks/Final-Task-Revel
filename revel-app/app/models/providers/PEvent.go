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
func (e *PEvent) GetEvents() (es []entities.Event, err error) {
	e.eventMapper = &mappers.MEvent{}
	return e.eventMapper.SelectAll()
}

//GetEventByID метод получения мероприятия по ID
func (e *PEvent) GetEventByID(ID int64) (en *entities.Event, err error) {
	return e.eventMapper.SelectByID(ID)
}

//CreateEvent метод создния мероприятия
func (e *PEvent) CreateEvent(event entities.Event) (en *entities.Event, err error) {
	return e.eventMapper.Insert(event)
}

//UpdateEvent метод изменения мероприятия
func (e *PEvent) UpdateEvent(event entities.Event) (en *entities.Event, err error) {
	return e.eventMapper.Update(event)
}

//DeleteEvent метод удаления мероприятия по ID
func (e *PEvent) DeleteEvent(ID int64) (err error) {
	return e.eventMapper.Delete(ID)
}
