package mappers

import (
	"database/sql"
	"fmt"
	"revel-app/app/helpers"
	"revel-app/app/models/entities"
)

//MEvent маппер мероприятий
type MEvent struct {
	db *sql.DB
}

//SelectAll получение всех мероприятий
func (m *MEvent) SelectAll() (es []*entities.Event, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	query := `SELECT e.id, "Theme", "Beginning", es."Status"
	FROM public."Event" as e
	JOIN public."EventsStatus" as es ON e."id_eventsStatus" = es.id`

	rows, err := db.Query(query)
	if err != nil {
		panic(err)
	}

	defer rows.Close()

	for rows.Next() {
		p := entities.Event{}
		err := rows.Scan(&p.ID, &p.Theme, &p.Beginning, &p.Status)
		if err != nil {
			fmt.Println("SelectAll получение всех мероприятий: ", err)
			continue
		}
		es = append(es, &p)
	}

	return es, nil
}

//SelectByID получение мероприятия по ID
func (m *MEvent) SelectByID(ID int64) (e *entities.Event, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	query := `SELECT e.id, "Theme", "Beginning", es."Status"
	FROM public."Event" as e
	JOIN public."EventsStatus" as es ON e."id_eventsStatus" = es.id
	WHERE e.id = $1`

	fmt.Println("ID IN GetByID: ", ID)

	row, err := db.Query(query, ID)

	if err != nil {
		return nil, err
	}

	defer row.Close()

	row.Next()
	result := entities.Event{}
	err = row.Scan(&result.ID, &result.Theme, &result.Beginning, &result.Status)

	fmt.Println("Result IN GetByID: ", result)

	return &result, nil
}

//Insert добавление мероприятия
func (m *MEvent) Insert(event *entities.Event) (e *entities.Event, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	query := `INSERT INTO public."Event"(
		"Theme", "Beginning", "id_eventsStatus")
		VALUES ($1, $2, (SELECT id
							   FROM public."EventsStatus"
							   WHERE "Status" = $3))
							   RETURNING id;`

	var id int64
	err = db.QueryRow(query,
		event.Theme,
		event.Beginning,
		event.Status).Scan(&id)
	if err != nil {
		fmt.Println("Insert добавление мероприятия: ", err)
		return
	}

	fmt.Println("ID NEW EVENT: ", id)

	e, err = m.SelectByID(id)
	if err != nil {
		fmt.Println("Insert добавление мероприятия - SelectByID: ", err)
		return
	}

	fmt.Println("INSERT EVENT: ", e)

	return e, nil
}

//Update изменение мероприятия
func (m *MEvent) Update(event *entities.Event) (e *entities.Event, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	fmt.Println("Updating event: ", event)

	query := `UPDATE public."Event"
	SET "Theme"=$1, "Beginning"=$2, "id_eventsStatus"=(SELECT id
														FROM public."EventsStatus"
														WHERE "Status" = $3)
	WHERE id = $4;`

	_, err = db.Exec(query,
		event.Theme,
		event.Beginning,
		event.Status,
		event.ID)

	if err != nil {
		fmt.Println("ERROR UPDATE event: ", err)
		return nil, err
	}

	e, err = m.SelectByID(event.ID)

	fmt.Println("Result Updating event: ", e)

	if err != nil {
		fmt.Println("ERROR UPDATE event: ", err)
		return
	}

	return e, nil
}

//Delete удаление мероприятия
func (m *MEvent) Delete(ID int64) (err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	query := `DELETE FROM public."CandidateEvent"
	WHERE "id_event" = $1;`

	_, err = db.Exec(query, ID)

	if err != nil {
		fmt.Println("ERROR DELETE event: ", err)
		return err
	}

	query = `DELETE FROM public."EmployeeEvent"
		WHERE "id_event" = $1;`

	_, err = db.Exec(query, ID)

	if err != nil {
		fmt.Println("ERROR UPDATE event: ", err)
		return err
	}

	query = `DELETE FROM public."Event"
		WHERE id = $1;`

	_, err = db.Exec(query, ID)

	if err != nil {
		fmt.Println("ERROR UPDATE event: ", err)
		return err
	}

	return nil
}

// UpdateCandidateStatusToFinishedEvent обновляет статус кандидата в таблице связи между кандидатом и мероприятием
func (m *MEvent) UpdateCandidateStatusToFinishedEvent(IDcandidate int64, IDevent int64) error {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	fmt.Println("UpdateCandidateStatusToFinishedEvent : IDCandidate: ", IDcandidate, " IDEvent: ", IDevent)

	query := `SELECT "id_candidateStatus"
	FROM public."CandidateEvent"
	WHERE "id_candidate" = $1
	AND "id_event" = $2;`

	var idCandidateStatus int

	err = db.QueryRow(query, IDcandidate, IDevent).Scan(&idCandidateStatus)

	fmt.Println("First query result: ", idCandidateStatus)

	query = `UPDATE public."CandidateEvent"
	SET "candidatesStatusValue" = (SELECT "Status"
							FROM public."CandidatesStatus"
							WHERE id = $1)
	WHERE "id_candidate" = $2
	AND "id_event" = $3;`

	returnQuery, err := db.Exec(query, idCandidateStatus, IDcandidate, IDevent)

	fmt.Println("Second query result: ", returnQuery)

	if err != nil {
		return err
	}

	return nil
}

//InsertEmployeeToEvent связывание сотрудника и мероприятия
func (m *MEvent) InsertEmployeeToEvent(IDEmployee int64, IDEvent int64) (err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		return err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		return err
	}

	fmt.Println("ID employee: ", IDEmployee)
	fmt.Println("ID event: ", IDEvent)

	query := `INSERT INTO public."EmployeeEvent"(
		id_employee, id_event)
		VALUES ($1, $2);`

	_, err = db.Exec(query, IDEmployee, IDEvent)
	if err != nil {
		return err
	}
	return nil
}

//DeleteEmployeesFromEvent удаляет всех сотрудников из мероприятия
func (m *MEvent) DeleteEmployeesFromEvent(IDEvent int64) (err error) {

	connector, err := helpers.GetConnector()
	if err != nil {
		return err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		return err
	}

	query := `DELETE FROM public."EmployeeEvent"
	WHERE id_event = $1;`

	err = db.QueryRow(query, IDEvent).Scan()
	if err != nil {
		fmt.Println("DeleteEmployeesFromEvent ", err)
		return err
	}

	return nil
}

//InsertCandidateToEvent связывание кандидата и мероприятия
func (m *MEvent) InsertCandidateToEvent(IDcandidate int64, IDevent int64) (err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		return err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		return err
	}

	fmt.Println("ID candidate: ", IDcandidate)
	fmt.Println("ID event: ", IDevent)

	query := `INSERT INTO public."CandidateEvent"(
		id_candidate, id_event, "id_candidateStatus")
		VALUES ($1, $2, (SELECT "id_candidatesStatus"
					  FROM public."Candidate"
					  WHERE id = $1));`

	_, err = db.Exec(query, IDcandidate, IDevent)
	if err != nil {
		fmt.Println("InsertCandidateToEvent ", err)
	}
	return nil
}

//DeleteCandidatesFromEvent удаляет всех кандидатов из мероприятия
func (m *MEvent) DeleteCandidatesFromEvent(IDEvent int64) (err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		return err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		return err
	}

	query := `DELETE FROM public."CandidateEvent"
	WHERE id_event = $1;`

	err = db.QueryRow(query, IDEvent).Scan()
	if err != nil {
		fmt.Println("DeleteCandidatesFromEvent ", err)
		return err
	}

	return nil
}
