package mappers

import (
	"database/sql"
	"revel-app/app/models/entities"
)

//MCandidate маппер кандидатов
type MCandidate struct {
	db *sql.DB
}

//Init метод инициализации маппера MCandidate
func (m *MCandidate) Init(db *sql.DB) {
	m.db = db
}

//SelectAll получение всех кандидатов
func (m *MCandidate) SelectAll() (cs []*entities.Candidate, err error) {
	return
}

//SelectByEventID получение кандидатов, связанных с мероприятием
func (m *MCandidate) SelectByEventID(IDEvent int64) (cs []*entities.Candidate, err error) {
	return
}

//SelectByID получение кандидата по ID
func (m *MCandidate) SelectByID(ID int64) (c *entities.Candidate, err error) {
	return
}

//Insert добавление кандидата
func (m *MCandidate) Insert(candidate entities.Candidate) (c *entities.Candidate, err error) {
	return
}

//InsertCandidateToEvent связывание кандидата и мероприятия
func (m *MCandidate) InsertCandidateToEvent(IDcandidate int64, IDevent int64) (err error) {
	return
}

//Update изменение кандидата
func (m *MCandidate) Update(candidate entities.Candidate) (c *entities.Candidate, err error) {
	return
}

//DeleteCandidatesFromEvent удаляет всех кандидатов из мероприятия
func (m *MCandidate) DeleteCandidatesFromEvent(IDEvent int64) (err error) {
	return
}

//Delete удаление кандидата
func (m *MCandidate) Delete(ID int64) (err error) {
	return
}
