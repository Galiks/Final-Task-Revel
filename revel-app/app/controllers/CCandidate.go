package controllers

import (
	"fmt"
	"revel-app/app/helpers"
	"revel-app/app/models/providers"

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
	//var Candidates []*entities.Candidate = controller.CandidateProvider.GetCandidates()
	return nil
}

//GetCandidateByID метод получения кандидатов по ID
func (controller *CCandidate) GetCandidateByID() revel.Result {
	return nil
}

//GetCanadidatesByEvent метод получения кандидатов по ID мероприятия
func (controller *CCandidate) GetCanadidatesByEvent() revel.Result {
	return nil
}

//CreateCandidate метод создания кандидатов
func (controller *CCandidate) CreateCandidate() revel.Result {
	return nil
}

//UpdateCandidate метод изменения кандидатов
func (controller *CCandidate) UpdateCandidate() revel.Result {
	return nil
}

//DeleteCandidate метод удаления кандидатов
func (controller *CCandidate) DeleteCandidate() revel.Result {
	return nil
}
