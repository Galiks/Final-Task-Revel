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

//CCandidate контроллер для кандидатов
type CCandidate struct {
	*revel.Controller
	candidateProvider *providers.PCandidate
}

//Before интерцептор BEFOR контроллера CCandidate для открытия соединения с БД
func (controller *CCandidate) Before() revel.Result {
	// connector, err := helpers.GetConnector()
	// if err != nil {
	// 	fmt.Println(err)
	// 	panic(err)
	// }
	// db, err := connector.GetDBConnection()
	// if err != nil {
	// 	fmt.Println(err)
	// 	panic(err)
	// }
	// controller.candidateProvider = new(providers.PCandidate)
	// controller.candidateProvider.Init(db)

	return nil
}

//After интерцептор AFTER контроллера CCandidate
// func (controller *CCandidate) After() revel.Result {
// 	return nil, *controller
// }

//Finally интерцептор FINALLY контроллера CCandidate для закрытия соединения с БД
func (controller *CCandidate) Finally() revel.Result {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println(err)
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	db.Close()

	return nil
}

//GetCandidates метод получения всех кандидатов
func (controller *CCandidate) GetCandidates() revel.Result {
	controller.candidateProvider = &providers.PCandidate{}
	candidates, err := controller.candidateProvider.GetCandidates()
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(candidates)
}

//GetCandidateByID метод получения кандидатов по ID
func (controller *CCandidate) GetCandidateByID() revel.Result {
	id, _ := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	controller.candidateProvider = &providers.PCandidate{}
	candidate, err := controller.candidateProvider.GetCandidateByID(id)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(candidate)
}

//GetCandidatesByEvent метод получения кандидатов по ID мероприятия
func (controller *CCandidate) GetCandidatesByEvent() revel.Result {
	id, _ := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	fmt.Println("GetCandidatesByEvent ID: ", id)
	controller.candidateProvider = &providers.PCandidate{}
	candidates, err := controller.candidateProvider.GetCandidatesByEventID(id)
	fmt.Println(&candidates)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(candidates)
}

//CreateCandidate метод создания кандидатов
func (controller *CCandidate) CreateCandidate() revel.Result {
	candidate := &entities.Candidate{}
	err := json.Unmarshal(controller.Params.JSON, candidate)
	if err != nil {
		fmt.Println("Unmarshalling: ", err)
		return controller.RenderJSON(err)
	}
	controller.candidateProvider = &providers.PCandidate{}
	result, err := controller.candidateProvider.CreateCandidate(candidate)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(result)
}

//UpdateCandidate метод изменения кандидатов
func (controller *CCandidate) UpdateCandidate() revel.Result {
	candidate := &entities.Candidate{}
	err := json.Unmarshal(controller.Params.JSON, candidate)
	if err != nil {
		fmt.Println("Unmarshalling: ", err)
		return controller.RenderJSON(err)
	}
	controller.candidateProvider = &providers.PCandidate{}
	result, err := controller.candidateProvider.UpdateCandidate(candidate)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(result)
}

//DeleteCandidate метод удаления кандидатов
func (controller *CCandidate) DeleteCandidate() revel.Result {
	id, _ := strconv.ParseInt(controller.Params.Get("id"), 10, 64)
	fmt.Println(id)
	controller.candidateProvider = &providers.PCandidate{}
	err := controller.candidateProvider.DeleteCandidate(id)
	if err != nil {
		fmt.Println(err)
		return controller.RenderJSON(err)
	}
	return controller.RenderJSON(nil)
}
