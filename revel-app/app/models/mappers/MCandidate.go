package mappers

import (
	"database/sql"
	"fmt"
	"revel-app/app/helpers"
	"revel-app/app/models/entities"
)

//CandidateSQL структура для конвертации в Candidate
type CandidateSQL struct {
	ID         int64   `json:"ID"`
	Firstname  string  `json:"firstname"`
	Lastname   string  `json:"lastname"`
	Patronymic *string `json:"patronymic"`
	Position   string  `json:"position"`
	Email      string  `json:"email"`
	Phone      string  `json:"phone"`
	Status     string  `json:"id_user"`
}

//ToCandidate метод конвентирует CandidateSQL в Candidate
func (e CandidateSQL) ToCandidate() entities.Candidate {
	var (
		patronymic string
	)

	if e.Patronymic == nil {
		patronymic = ""
	} else {
		patronymic = *e.Patronymic
	}

	return entities.Candidate{
		ID:         e.ID,
		Firstname:  e.Firstname,
		Lastname:   e.Lastname,
		Patronymic: patronymic,
		Email:      e.Email,
		Phone:      e.Phone,
		Status:     e.Status}
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
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	defer db.Close()

	query := `SELECT c.id, "Firstname", "Lastname", "Patronymic", "Email", "Phone", cs."Status"
	FROM public."Candidate" as c
	JOIN public."CandidatesStatus" as cs ON c."id_candidatesStatus" = cs.id`

	rows, err := db.Query(query)
	if err != nil {
		panic(err)
	}

	defer rows.Close()

	for rows.Next() {
		p := CandidateSQL{}
		err := rows.Scan(&p.ID, &p.Firstname, &p.Lastname, &p.Patronymic, &p.Email, &p.Phone, &p.Status)
		if err != nil {
			fmt.Println(err)
			continue
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
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	fmt.Println("IDEvent in getCandidateByID: ", IDEvent)

	defer db.Close()

	query := `SELECT c.id, "Firstname", "Lastname", "Patronymic", "Email", "Phone", cs."Status"
	FROM public."Candidate" as c
	JOIN public."CandidateEvent" as ce ON c.id = ce.id_candidate
	JOIN public."CandidatesStatus" as cs ON c."id_candidatesStatus" = cs.id
	WHERE ce."id_event" = $1`

	rows, err := db.Query(query, IDEvent)
	if err != nil {
		panic(err)
	}

	defer rows.Close()

	for rows.Next() {
		p := CandidateSQL{}
		fmt.Println("SelectCandidatesByEventID: ", rows)
		err := rows.Scan(&p.ID, &p.Firstname, &p.Lastname, &p.Patronymic, &p.Email, &p.Phone, &p.Status)
		if err != nil {
			fmt.Println(err)
			continue
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
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	defer db.Close()

	query := `SELECT c.id, "Firstname", "Lastname", "Patronymic", "Email", "Phone", cs."Status"
	FROM public."Candidate" as c
	JOIN public."CandidatesStatus" as cs ON c."id_candidatesStatus" = cs.id
	WHERE c.id = $1`

	row, err := db.Query(query, ID)
	if err != nil {
		fmt.Println(err)
		return
	}
	if err != nil {
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
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

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
		fmt.Println(err)
		return
	}

	c, err = m.SelectByID(id)
	if err != nil {
		fmt.Println(err)
		return
	}

	return c, nil
}

//Update изменение кандидата
func (m *MCandidate) Update(candidate *entities.Candidate) (c *entities.Candidate, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

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
		fmt.Println(err)
		return
	}

	c, err = m.SelectByID(candidate.ID)
	if err != nil {
		fmt.Println(err)
		return
	}

	return c, nil
}

//Delete удаление кандидата
func (m *MCandidate) Delete(ID int64) (err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	query := `DELETE FROM public."CandidateEvent"
	WHERE "id_candidate" = $1;`

	_, err = db.Exec(query, ID)
	if err != nil {
		fmt.Println(err)
		return err
	}

	query = `DELETE FROM public."Candidate"
	WHERE id = $1;`

	_, err = db.Exec(query, ID)
	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}
