package mappers

import (
	"database/sql"
	"fmt"
	"revel-app/app/helpers"
	"revel-app/app/models/entities"

	"github.com/revel/revel"
)

//CandidateSQL структура для конвертации в Candidate
type CandidateSQL struct {
	ID          int64   `json:"ID"`
	Firstname   string  `json:"firstname"`
	Lastname    string  `json:"lastname"`
	Patronymic  *string `json:"patronymic"`
	Position    string  `json:"position"`
	Email       string  `json:"email"`
	Phone       string  `json:"phone"`
	Status      string  `json:"status"`
	FinalStatus *string `json:"finalStatus"`
}

//ToCandidate метод конвентирует CandidateSQL в Candidate
func (e CandidateSQL) ToCandidate() entities.Candidate {
	var (
		patronymic string
		status     string
	)

	if e.Patronymic == nil {
		patronymic = ""
	} else {
		patronymic = *e.Patronymic
	}

	if e.FinalStatus == nil {
		status = e.Status
	} else {
		status = *e.FinalStatus
	}

	return entities.Candidate{
		ID:         e.ID,
		Firstname:  e.Firstname,
		Lastname:   e.Lastname,
		Patronymic: patronymic,
		Email:      e.Email,
		Phone:      e.Phone,
		Status:     status}
}

//ToCandidateSQL метод конвентирует Candidate в CandidateSQL
func ToCandidateSQL(e entities.Candidate) CandidateSQL {

	var patronymic *string = &e.Patronymic
	return CandidateSQL{
		ID:         e.ID,
		Firstname:  e.Firstname,
		Lastname:   e.Lastname,
		Patronymic: patronymic,
		Email:      e.Email,
		Phone:      e.Phone,
		Status:     e.Status}
}

//MCandidate маппер кандидатов
type MCandidate struct {
	db *sql.DB
}

//SelectAll получение всех кандидатов
func (m *MCandidate) SelectAll() (cs []*entities.Candidate, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MCandidate.SelectAll : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MCandidate.SelectAll : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MCandidate.SelectAll : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MCandidate.SelectAll : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	query := `SELECT c.id, "Firstname", "Lastname", "Patronymic", "Email", "Phone", cs."Status"
	FROM public."Candidate" as c
	JOIN public."CandidatesStatus" as cs ON c."id_candidatesStatus" = cs.id`

	rows, err := db.Query(query)
	if err != nil {
		fmt.Println("MCandidate.SelectAll : db.Query error : ", err)
		revel.AppLog.Errorf("MCandidate.SelectAll : db.Query, %s\n", err)
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		p := CandidateSQL{}
		err := rows.Scan(&p.ID, &p.Firstname, &p.Lastname, &p.Patronymic, &p.Email, &p.Phone, &p.Status)
		if err != nil {
			fmt.Println("MCandidate.SelectAll : rows.Scan error : ", err)
			revel.AppLog.Errorf("MCandidate.SelectAll : rows.Scan, %s\n", err)
		}
		candidate := p.ToCandidate()
		cs = append(cs, &candidate)
	}

	return cs, nil
}

//SelectByEventID получение кандидатов, связанных с мероприятием
func (m *MCandidate) SelectByEventID(IDEvent int64) (cs []*entities.Candidate, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MCandidate.SelectByEventID : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MCandidate.SelectByEventID : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MCandidate.SelectByEventID : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MCandidate.SelectByEventID : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	query := `SELECT c.id, "Firstname", "Lastname", "Patronymic", "Email", "Phone", cs."Status", ce."candidatesStatusValue"
	FROM public."Candidate" as c
	JOIN public."CandidateEvent" as ce ON c.id = ce.id_candidate
	JOIN public."CandidatesStatus" as cs ON c."id_candidatesStatus" = cs.id
	WHERE ce."id_event" = $1`

	rows, err := db.Query(query, IDEvent)
	if err != nil {
		fmt.Println("MCandidate.SelectByEventID : db.Query error : ", err)
		revel.AppLog.Errorf("MCandidate.SelectByEventID : db.Query, %s\n", err)
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		p := CandidateSQL{}
		fmt.Println("SelectCandidatesByEventID: ", rows)
		err := rows.Scan(&p.ID, &p.Firstname, &p.Lastname, &p.Patronymic, &p.Email, &p.Phone, &p.Status, &p.FinalStatus)
		if err != nil {
			fmt.Println("MCandidate.SelectByEventID : rows.Scan error : ", err)
			revel.AppLog.Errorf("MCandidate.SelectByEventID : rows.Scan, %s\n", err)
		}

		candidate := p.ToCandidate()

		cs = append(cs, &candidate)
	}

	return cs, nil
}

//SelectFreeCandidates получение кандидатов, не назначенных на мероприятие
func (m *MCandidate) SelectFreeCandidates() (cs []*entities.Candidate, err error) {

	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MCandidate.SelectFreeCandidates : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MCandidate.SelectFreeCandidates : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MCandidate.SelectFreeCandidates : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MCandidate.SelectFreeCandidates : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	query := `SELECT * 
	FROM public."Candidate" as c
	WHERE c.id not in (SELECT id_candidate
						FROM public."CandidateEvent"
						WHERE "candidatesStatusValue" is null);`

	rows, err := db.Query(query)
	if err != nil {

	}

	defer rows.Close()

	for rows.Next() {
		p := CandidateSQL{}
		err := rows.Scan(&p.ID, &p.Firstname, &p.Lastname, &p.Patronymic, &p.Email, &p.Phone, &p.Status)
		if err != nil {
			fmt.Println("MCandidate.SelectFreeCandidates : rows.Scan error : ", err)
			revel.AppLog.Errorf("MCandidate.SelectFreeCandidates : rows.Scan, %s\n", err)
		}

		candidate := p.ToCandidate()

		cs = append(cs, &candidate)
	}

	return cs, nil
}

//SelectByID получение кандидата по ID
func (m *MCandidate) SelectByID(ID int64) (c *entities.Candidate, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MCandidate.SelectByID : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MCandidate.SelectByID : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MCandidate.SelectByID : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MCandidate.SelectByID : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	query := `SELECT c.id, "Firstname", "Lastname", "Patronymic", "Email", "Phone", cs."Status"
	FROM public."Candidate" as c
	JOIN public."CandidatesStatus" as cs ON c."id_candidatesStatus" = cs.id
	WHERE c.id = $1`

	row, err := db.Query(query, ID)
	if err != nil {
		fmt.Println("MCandidate.SelectByID : db.Query error : ", err)
		revel.AppLog.Errorf("MCandidate.SelectByID : db.Query, %s\n", err)
		return nil, err
	}

	defer row.Close()

	p := CandidateSQL{}
	row.Next()
	err = row.Scan(&p.ID, &p.Firstname, &p.Lastname, &p.Patronymic, &p.Email, &p.Phone, &p.Status)
	candidate := p.ToCandidate()
	return &candidate, nil
}

//Insert добавление кандидата
func (m *MCandidate) Insert(candidate *entities.Candidate) (c *entities.Candidate, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MCandidate.Insert : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MCandidate.Insert : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MCandidate.Insert : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MCandidate.Insert : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	query := `INSERT INTO public."Candidate"(
		"Firstname", "Lastname", "Patronymic", "Email", "Phone", "id_candidatesStatus")
		VALUES ($1, $2, $3, $4, $5, (SELECT id
								  FROM public."CandidatesStatus"
								  WHERE "Status" = $6))
								  RETURNING id;`

	var id int64

	var candidateSQL CandidateSQL = ToCandidateSQL(*candidate)

	err = db.QueryRow(query,
		candidateSQL.Firstname,
		candidateSQL.Lastname,
		candidateSQL.Patronymic,
		candidateSQL.Email,
		candidateSQL.Phone,
		candidateSQL.Status).Scan(&id)
	if err != nil {
		fmt.Println("MCandidate.Insert : db.QueryRowerror : ", err)
		revel.AppLog.Errorf("MCandidate.Insert : db.QueryRow, %s\n", err)
		return nil, err
	}

	c, err = m.SelectByID(id)
	if err != nil {
		fmt.Println("MCandidate.Insert : m.SelectByID : ", err)
		revel.AppLog.Errorf("MCandidate.Insert : m.SelectByID, %s\n", err)
		return nil, err
	}

	return c, nil
}

//Update изменение кандидата
func (m *MCandidate) Update(candidate *entities.Candidate) (c *entities.Candidate, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MCandidate.Update : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MCandidate.Update : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MCandidate.Update : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MCandidate.Update : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	fmt.Println("UPDATING CANDIDATE: ", candidate)

	query := `UPDATE public."Candidate"
	SET "Firstname"=$1, "Lastname"=$2, "Patronymic"=$3, "Email"=$4, "Phone"=$5, "id_candidatesStatus"= (SELECT id
								  FROM public."CandidatesStatus"
								  WHERE "Status" = $6)
	WHERE id = $7;`

	_, err = db.Exec(query, candidate.Firstname,
		candidate.Lastname,
		candidate.Patronymic,
		candidate.Email,
		candidate.Phone,
		candidate.Status,
		candidate.ID)
	if err != nil {
		fmt.Println("MCandidate.Update : db.Exec (candidate) : ", err)
		revel.AppLog.Errorf("MCandidate.Update : db.Exec (candidate), %s\n", err)
		return nil, err
	}

	c, err = m.SelectByID(candidate.ID)
	if err != nil {
		fmt.Println("MCandidate.Update : m.SelectByID : ", err)
		revel.AppLog.Errorf("MCandidate.Update : m.SelectByID, %s\n", err)
		return nil, err
	}

	fmt.Println("UPDATING CandidateToEvent: ")

	query = `UPDATE public."CandidateEvent"
	SET "id_candidateStatus" = (SELECT id
							FROM public."CandidatesStatus"
							WHERE "Status" = $1)
	WHERE id_candidate = $2
	AND "candidatesStatusValue" is null`

	_, err = db.Exec(query, c.Status, c.ID)
	if err != nil {
		fmt.Println("MCandidate.Update : db.Exec (candidateEvent) : ", err)
		revel.AppLog.Errorf("MCandidate.Update : db.Exec (candidateEvent), %s\n", err)
		return nil, err
	}

	return c, nil
}

//UpdateStatus обновление статуса на пустое для неназначенных кандидатов
func (m *MCandidate) UpdateStatus() error {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MCandidate.UpdateStatus : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MCandidate.UpdateStatus : helpers.GetConnector, %s\n", err)
		return err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MCandidate.UpdateStatus : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MCandidate.UpdateStatus : connector.GetDBConnection, %s\n", err)
		return err
	}

	defer db.Close()

	query := `UPDATE public."Candidate"
	SET "id_candidatesStatus"=1
	WHERE id not in (SELECT id_candidate
					FROM public."CandidateEvent")`

	_, err = db.Exec(query)
	if err != nil {
		fmt.Println("MCandidate.UpdateStatus : db.Exec (candidate) error : ", err)
		revel.AppLog.Errorf("MCandidate.UpdateStatus : db.Exec (candidate), %s\n", err)
		return err
	}
	return nil
}

//Delete удаление кандидата
func (m *MCandidate) Delete(ID int64) (err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MCandidate.Delete : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MCandidate.Delete : helpers.GetConnector, %s\n", err)
		return err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MCandidate.Delete : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MCandidate.Delete : connector.GetDBConnection, %s\n", err)
		return err
	}

	defer db.Close()

	query := `DELETE FROM public."CandidateEvent"
	WHERE "id_candidate" = $1;`

	_, err = db.Exec(query, ID)
	if err != nil {
		fmt.Println("MCandidate.Delete : db.Exec (candidateEvent) error : ", err)
		revel.AppLog.Errorf("MCandidate.Delete : db.Exec (candidateEvent), %s\n", err)
		return err
	}

	query = `DELETE FROM public."Candidate"
	WHERE id = $1;`

	_, err = db.Exec(query, ID)
	if err != nil {
		fmt.Println("MCandidate.Delete : db.Exec (candidate) error : ", err)
		revel.AppLog.Errorf("MCandidate.Delete : db.Exec (candidate), %s\n", err)
		return err
	}

	return nil
}
