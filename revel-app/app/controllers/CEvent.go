package controllers

import (
	"encoding/json"
	"fmt"
	"revel-app/app/models/entities"
	"revel-app/app/models/providers"
	"strconv"
	"time"

	"github.com/revel/revel"
)

//EventJSON структура для конвертации
type EventJSON struct {
	ID        int64  `json:"ID"`
	Theme     string `json:"theme"`
	Beginning string `json:"beginning"`
	Status    string `json:"status"`
}

//OutputID пока что заглушка
type OutputID struct {
	IDEntity int64 `json:"IDEntity"`
	IDEvent  int64 `json:"IDEvent"`
}

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
	//event := &entities.Event{}
	eventJSON := &EventJSON{}

	err := json.Unmarshal(controller.Params.JSON, eventJSON)
	if err != nil {
		fmt.Println("Unmarshalling: ", err)
		return nil
	}
	normalTime, err := time.Parse(time.RFC3339, eventJSON.Beginning+":00Z")
	event := &entities.Event{
		ID:        eventJSON.ID,
		Theme:     eventJSON.Theme,
		Beginning: normalTime,
		Status:    eventJSON.Status}

	fmt.Println("Try create event: ", event)
	controller.eventProvider = &providers.PEvent{}
	result, err := controller.eventProvider.CreateEvent(event)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	fmt.Println("Create result: ", result)
	return controller.RenderJSON(result)
}

//UpdateEvent метод изменения мероприятия
func (controller *CEvent) UpdateEvent() revel.Result {
	eventJSON := &EventJSON{}
	err := json.Unmarshal(controller.Params.JSON, eventJSON)
	if err != nil {
		fmt.Println("Unmarshalling: ", err)
		return nil
	}
	normalTime, err := time.Parse(`"`+time.RFC3339+`"`, string(eventJSON.Beginning))

	event := &entities.Event{
		ID:        eventJSON.ID,
		Theme:     eventJSON.Theme,
		Beginning: normalTime,
		Status:    eventJSON.Status}

	controller.eventProvider = &providers.PEvent{}
	result, err := controller.eventProvider.UpdateEvent(event)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return controller.RenderJSON(result)
}

//DeleteEvent метод удаления мероприятия
func (controller *CEvent) DeleteEvent() revel.Result {
	id, _ := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	controller.eventProvider = &providers.PEvent{}
	err := controller.eventProvider.DeleteEvent(id)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return controller.Render()
}

//CreateLinkEmployeeToEvent метод создания свяязи между сотрудником и мероприятием
func (controller *CEvent) CreateLinkEmployeeToEvent() revel.Result {
	outputID := &OutputID{}
	err := json.Unmarshal(controller.Params.JSON, outputID)
	if err != nil {
		fmt.Println("Unmarshalling: ", err)
		return nil
	}

	fmt.Println(outputID)

	fmt.Println("CONTROLLER. EventID: ", outputID.IDEvent)
	fmt.Println("CONTROLLER. EmployeeID: ", outputID.IDEntity)

	controller.eventProvider = &providers.PEvent{}
	err = controller.eventProvider.CreateLinkEmployeeToEvent(outputID.IDEntity, outputID.IDEvent)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return controller.Render()
}

//CreateLinkCandidateToEvent метод создания связи между кандидатом и мероприятием
func (controller *CEvent) CreateLinkCandidateToEvent() revel.Result {
	outputID := &OutputID{}
	err := json.Unmarshal(controller.Params.JSON, outputID)
	if err != nil {
		fmt.Println("Unmarshalling: ", err)
		return nil
	}

	fmt.Println("CONTROLLER. EventID: ", outputID.IDEvent)
	fmt.Println("CONTROLLER. EmployeeID: ", outputID.IDEntity)

	controller.eventProvider = &providers.PEvent{}
	err = controller.eventProvider.CreateLinkCandidateToEvent(outputID.IDEntity, outputID.IDEvent)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return controller.Render()
}

//DeleteEmployeesFromEvent метод удаления сотрудников из мероприятия
func (controller *CEvent) DeleteEmployeesFromEvent() revel.Result {
	id, _ := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	controller.eventProvider = &providers.PEvent{}
	err := controller.eventProvider.DeleteEmployeesFromEvent(id)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return controller.Render()
}

// DeleteCandidatesFromEvent метод удаления связи между кандидатами и мероприятием
func (controller *CEvent) DeleteCandidatesFromEvent() revel.Result {
	id, _ := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	controller.eventProvider = &providers.PEvent{}
	err := controller.eventProvider.DeleteCandidatesFromEvent(id)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return controller.Render()
}
