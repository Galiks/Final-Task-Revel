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
	fmt.Println("GetEvents()")
	controller.eventProvider = &providers.PEvent{}
	events, err := controller.eventProvider.GetEvents()
	if err != nil {
		fmt.Println(err)
	}
	return controller.RenderJSON(events)
}

//GetEventByID метод получения мероприятия по ID
func (controller *CEvent) GetEventByID(ID int64) revel.Result {
	fmt.Println("GetEventByID(ID int64): ", ID)
	controller.eventProvider = &providers.PEvent{}
	event, err := controller.eventProvider.GetEventByID(ID)
	if err != nil {
		fmt.Println(err)
	}
	return controller.RenderJSON(event)
}

//CreateEvent метод создания мероприятия
func (controller *CEvent) CreateEvent() revel.Result {
	fmt.Println("CreateEvent()")
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
	fmt.Println("UpdateEvent()")
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
	fmt.Println("DeleteEvent()")
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
	IDEvent, _ := strconv.ParseInt(controller.Params.Get("eventID"), 10, 64)
	IDEmployee, _ := strconv.ParseInt(controller.Params.Get("employeeID"), 10, 64)
	fmt.Println("CreateLinkEmployeeToEvent IDEvent: ", IDEvent, " IDEmployee: ", IDEmployee)

	controller.eventProvider = &providers.PEvent{}
	err := controller.eventProvider.CreateLinkEmployeeToEvent(IDEmployee, IDEvent)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return controller.Render()
}

//CreateLinkCandidateToEvent метод создания связи между кандидатом и мероприятием
func (controller *CEvent) CreateLinkCandidateToEvent() revel.Result {
	IDEvent, _ := strconv.ParseInt(controller.Params.Get("eventID"), 10, 64)
	IDCandidate, _ := strconv.ParseInt(controller.Params.Get("candidateID"), 10, 64)
	fmt.Println("CreateLinkEmployeeToEvent IDEvent: ", IDEvent, " IDCndidate: ", IDCandidate)

	controller.eventProvider = &providers.PEvent{}
	err := controller.eventProvider.CreateLinkCandidateToEvent(IDCandidate, IDEvent)
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
	fmt.Println("DeleteEmployeesFromEvent ID: ", id)
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
	fmt.Println("DeleteCandidatesFromEvent ID: ", id)
	controller.eventProvider = &providers.PEvent{}
	err := controller.eventProvider.DeleteCandidatesFromEvent(id)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return controller.Render()
}
