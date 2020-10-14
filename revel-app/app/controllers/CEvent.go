package controllers

import (
	"fmt"
	"revel-app/app/models/entities"
	"revel-app/app/models/providers"

	"github.com/revel/revel"
)

//CEvent контроллер для мероприятий
type CEvent struct {
	*revel.Controller
	eventProvider *providers.PEvent
}

// //Before интерцептор BEFOR контроллера CEvent
// func (controller *CEvent) Before() (result revel.Result, rc CEvent) {
// 	return nil, *controller
// }

// //After интерцептор AFTER контроллера CEvent
// func (controller *CEvent) After() (result revel.Result, rc CEvent) {
// 	return nil, *controller
// }

//GetEvents метод получения всех мероприятий
func (controller *CEvent) GetEvents() revel.Result {
	//var Events []*entities.Event = controller.EventProvider.GetEvents()
	controller.eventProvider = &providers.PEvent{}
	events, err := controller.eventProvider.GetEvents()
	if err != nil {
		fmt.Println(err)
	}
	return controller.RenderJSON(events)
}

//GetEventByID метод получения мероприятия по ID
func (controller *CEvent) GetEventByID(ID int64) revel.Result {
	controller.eventProvider = &providers.PEvent{}
	event, err := controller.eventProvider.GetEventByID(ID)
	if err != nil {
		fmt.Println(err)
	}
	return controller.RenderJSON(event)
}

//CreateEvent метод создания мероприятия
func (controller *CEvent) CreateEvent() revel.Result {
	return nil
}

//UpdateEvent метод изменения мероприятия
func (controller *CEvent) UpdateEvent() revel.Result {
	return nil
}

//DeleteEvent метод удаления мероприятия
func (controller *CEvent) DeleteEvent() revel.Result {
	return nil
}

//Метод для взятия параметров из метода POST
func (controller *CEvent) fetchPost() (e entities.Event, err error) {
	return
}
