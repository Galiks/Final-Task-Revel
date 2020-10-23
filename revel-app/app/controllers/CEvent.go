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
	event := &entities.Event{}

	err := json.Unmarshal(controller.Params.JSON, event)
	if err != nil {
		fmt.Println("CEvent.CreateEvent : json.Unmarshal error : ", err)
		revel.AppLog.Errorf("CEvent.CreateEvent : json.Unmarshal, %s\n", err)
		return controller.RenderJSON(err)
	}
	event.Beginning, err = time.Parse(time.RFC3339, event.Beginning.String()+":00Z")
	if err != nil {
		fmt.Println("CEvent.CreateEventt : time.Parse error : ", err)
		revel.AppLog.Errorf("CEvent.CreateEvent : time.Parse, %s\n", err)
		return controller.RenderJSON(err)
	}

	fmt.Println("Try create event: ", event)
	controller.eventProvider = &providers.PEvent{}
	result, err := controller.eventProvider.CreateEvent(event)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	fmt.Println("Create result: ", result)
	return controller.RenderJSON(result)
}

//UpdateEvent метод изменения мероприятия
func (controller *CEvent) UpdateEvent() revel.Result {
	fmt.Println("UpdateEvent()")
	event := &entities.Event{}
	err := json.Unmarshal(controller.Params.JSON, event)
	if err != nil {
		fmt.Println("CEvent.UpdateEvent : json.Unmarshal error : ", err)
		revel.AppLog.Errorf("CEvent.UpdateEvent : json.Unmarshal, %s\n", err)
		return controller.RenderJSON(err)
	}
	event.Beginning, err = time.Parse(time.RFC3339, event.Beginning.String()+":00Z")
	if err != nil {
		fmt.Println("CEvent.UpdateEvent : time.Parse error : ", err)
		revel.AppLog.Errorf("CEvent.UpdateEvent : time.Parse, %s\n", err)
		return controller.RenderJSON(err)
	}

	controller.eventProvider = &providers.PEvent{}
	result, err := controller.eventProvider.UpdateEvent(event)
	if err != nil {

		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(result)
}

//DeleteEvent метод удаления мероприятия
func (controller *CEvent) DeleteEvent() revel.Result {
	fmt.Println("DeleteEvent")
	id, err := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	if err != nil {
		fmt.Println("CEvent.DeleteEvent : strconv.ParseInt error : ", err)
		revel.AppLog.Errorf("CEvent.DeleteEvent : strconv.ParseInt, %s\n", err)
		return controller.RenderJSON(err)
	}
	controller.eventProvider = &providers.PEvent{}
	err = controller.eventProvider.DeleteEvent(id)
	if err != nil {
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(nil)
}

//SetCandidateStatusToFinishedEvent метод для обновления статуса кандидата в таблице связи между кандидатом и мероприятием
func (controller *CEvent) SetCandidateStatusToFinishedEvent() revel.Result {
	fmt.Println("SetCandidateStatusToFinishedEvent")
	IDEvent, err := strconv.ParseInt(controller.Params.Get("eventID"), 10, 64)
	if err != nil {
		fmt.Println("CEvent.SetCandidateStatusToFinishedEvent : strconv.ParseInt(eventID) error : ", err)
		revel.AppLog.Errorf("CEvent.SetCandidateStatusToFinishedEvent : strconv.ParseInt(eventID), %s\n", err)
		return controller.RenderJSON(err)
	}
	IDCandidate, err := strconv.ParseInt(controller.Params.Get("candidateID"), 10, 64)
	if err != nil {
		fmt.Println("CEvent.SetCandidateStatusToFinishedEvent : strconv.ParseInt(candidateID) error : ", err)
		revel.AppLog.Errorf("CEvent.SetCandidateStatusToFinishedEvent : strconv.ParseInt(candidateID), %s\n", err)
		return controller.RenderJSON(err)
	}

	fmt.Println("SetCandidateStatusToFinishedEvent: IDCandidate: ", IDCandidate, " IDEvent: ", IDEvent)

	controller.eventProvider = &providers.PEvent{}
	err = controller.eventProvider.SetCandidateStatusToFinishedEvent(IDCandidate, IDEvent)
	if err != nil {
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(nil)
}

//CreateLinkEmployeeToEvent метод создания свяязи между сотрудником и мероприятием
func (controller *CEvent) CreateLinkEmployeeToEvent() revel.Result {
	IDEvent, err := strconv.ParseInt(controller.Params.Get("eventID"), 10, 64)
	if err != nil {
		fmt.Println("CEvent.CreateLinkEmployeeToEvent : strconv.ParseInt(eventID) error : ", err)
		revel.AppLog.Errorf("CEvent.CreateLinkEmployeeToEvent : strconv.ParseInt(eventID), %s\n", err)
		return controller.RenderJSON(err)
	}
	IDEmployee, err := strconv.ParseInt(controller.Params.Get("employeeID"), 10, 64)
	if err != nil {
		fmt.Println("CEvent.CreateLinkEmployeeToEvent : strconv.ParseInt(employeeID) error : ", err)
		revel.AppLog.Errorf("CEvent.CreateLinkEmployeeToEvent : strconv.ParseInt(employeeID), %s\n", err)
		return controller.RenderJSON(err)
	}
	fmt.Println("CreateLinkEmployeeToEvent IDEvent: ", IDEvent, " IDEmployee: ", IDEmployee)

	controller.eventProvider = &providers.PEvent{}
	err = controller.eventProvider.CreateLinkEmployeeToEvent(IDEmployee, IDEvent)
	if err != nil {
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(nil)
}

//CreateLinkCandidateToEvent метод создания связи между кандидатом и мероприятием
func (controller *CEvent) CreateLinkCandidateToEvent() revel.Result {
	IDEvent, err := strconv.ParseInt(controller.Params.Get("eventID"), 10, 64)
	if err != nil {
		fmt.Println("CEvent.SetCandidateStatusToFinishedEvent : strconv.ParseInt(eventID) error : ", err)
		revel.AppLog.Errorf("CEvent.SetCandidateStatusToFinishedEvent : strconv.ParseInt(eventID), %s\n", err)
		return controller.RenderJSON(err)
	}
	IDCandidate, err := strconv.ParseInt(controller.Params.Get("candidateID"), 10, 64)
	if err != nil {
		fmt.Println("CEvent.SetCandidateStatusToFinishedEvent : strconv.ParseInt(candidateID) error : ", err)
		revel.AppLog.Errorf("CEvent.SetCandidateStatusToFinishedEvent : strconv.ParseInt(candidateID), %s\n", err)
		return controller.RenderJSON(err)
	}
	fmt.Println("CreateLinkCandidateToEvent IDEvent: ", IDEvent, " IDCndidate: ", IDCandidate)

	controller.eventProvider = &providers.PEvent{}
	err = controller.eventProvider.CreateLinkCandidateToEvent(IDCandidate, IDEvent)
	if err != nil {
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(nil)
}

//DeleteEmployeesFromEvent метод удаления сотрудников из мероприятия
func (controller *CEvent) DeleteEmployeesFromEvent() revel.Result {
	id, err := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	if err != nil {
		fmt.Println("CEvent.DeleteEmployeesFromEvent : strconv.ParseInt error : ", err)
		revel.AppLog.Errorf("CEvent.DeleteEmployeesFromEvent : strconv.ParseInt, %s\n", err)
		return controller.RenderJSON(err)
	}
	controller.eventProvider = &providers.PEvent{}
	fmt.Println("DeleteEmployeesFromEvent ID: ", id)
	err = controller.eventProvider.DeleteEmployeesFromEvent(id)
	if err != nil {
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(nil)
}

// DeleteCandidatesFromEvent метод удаления связи между кандидатами и мероприятием
func (controller *CEvent) DeleteCandidatesFromEvent() revel.Result {
	id, err := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	if err != nil {
		fmt.Println("CEvent.DeleteCandidatesFromEvent : strconv.ParseInt error : ", err)
		revel.AppLog.Errorf("CEvent.DeleteCandidatesFromEvent : strconv.ParseInt, %s\n", err)
		return controller.RenderJSON(err)
	}
	fmt.Println("DeleteCandidatesFromEvent ID: ", id)
	controller.eventProvider = &providers.PEvent{}
	err = controller.eventProvider.DeleteCandidatesFromEvent(id)
	if err != nil {
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(nil)
}
