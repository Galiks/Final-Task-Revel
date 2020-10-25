package mappers

import (
	"database/sql"
	"fmt"
	"revel-app/app/helpers"
	"revel-app/app/models/entities"

	"github.com/revel/revel"
)

//MEvent маппер мероприятий
type MEvent struct {
	db *sql.DB
}

//SelectAll получение всех мероприятий
func (m *MEvent) SelectAll() (es []*entities.Event, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MEvent.SelectAll : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MEvent.SelectAll : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MEvent.SelectAll : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MEvent.SelectAll : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	query := `SELECT e.id, "Theme", "Beginning", es."Status"
	FROM public."Event" as e
	JOIN public."EventsStatus" as es ON e."id_eventsStatus" = es.id`

	rows, err := db.Query(query)
	if err != nil {
		fmt.Println("MEvent.SelectAll : db.Query error : ", err)
		revel.AppLog.Errorf("MEvent.SelectAll : db.Query, %s\n", err)
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		p := entities.Event{}
		err := rows.Scan(&p.ID, &p.Theme, &p.Beginning, &p.Status)
		if err != nil {
			fmt.Println("MEvent.SelectAll : rows.Scan error : ", err)
			revel.AppLog.Errorf("MEvent.SelectAll : rows.Scan, %s\n", err)
		}
		es = append(es, &p)
	}

	return es, nil
}

//SelectByID получение мероприятия по ID
func (m *MEvent) SelectByID(ID int64) (e *entities.Event, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MEvent.SelectByID : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MEvent.SelectByID : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MEvent.SelectByID : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MEvent.SelectByID : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	query := `SELECT e.id, "Theme", "Beginning", es."Status"
	FROM public."Event" as e
	JOIN public."EventsStatus" as es ON e."id_eventsStatus" = es.id
	WHERE e.id = $1`

	fmt.Println("ID IN GetByID: ", ID)

	row, err := db.Query(query, ID)
	if err != nil {
		fmt.Println("MEvent.SelectByID : db.Query error : ", err)
		revel.AppLog.Errorf("MEvent.SelectByID : db.Query, %s\n", err)
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
		fmt.Println("MEvent.Insert : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MEvent.Insert : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MEvent.Insert : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MEvent.Insert : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

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
		fmt.Println("MEvent.Insert : db.QueryRow error : ", err)
		revel.AppLog.Errorf("MEvent.Insert : db.QueryRow, %s\n", err)
		return nil, err
	}

	fmt.Println("ID NEW EVENT: ", id)

	e, err = m.SelectByID(id)
	if err != nil {
		fmt.Println("MEvent.Insert : m.SelectByID error : ", err)
		revel.AppLog.Errorf("MEvent.Insert : m.SelectByID, %s\n", err)
		return nil, err
	}

	fmt.Println("INSERT EVENT: ", e)

	return e, nil
}

//Update изменение мероприятия
func (m *MEvent) Update(event *entities.Event) (e *entities.Event, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MEvent.Update : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MEvent.Update : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MEvent.Update : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MEvent.Update : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

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
		fmt.Println("MEvent.Update : db.Exec error : ", err)
		revel.AppLog.Errorf("MEvent.Update : db.Exec, %s\n", err)
		return nil, err
	}

	e, err = m.SelectByID(event.ID)
	if err != nil {
		fmt.Println("MEvent.Update : m.SelectByID error : ", err)
		revel.AppLog.Errorf("MEvent.Update : m.SelectByID, %s\n", err)
		return nil, err
	}

	fmt.Println("Result Updating event: ", e)

	return e, nil
}

//Delete удаление мероприятия
func (m *MEvent) Delete(ID int64) (err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MEvent.Delete : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MEvent.Delete : helpers.GetConnector, %s\n", err)
		return err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MEvent.Delete : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MEvent.Delete : connector.GetDBConnection, %s\n", err)
		return err
	}

	defer db.Close()

	// query := `DELETE FROM public."CandidateEvent"
	// WHERE "id_event" = $1;`

	// _, err = db.Exec(query, ID)
	// if err != nil {
	// 	fmt.Println("MEvent.Delete : db.Exec (candidateEvent) error : ", err)
	// 	revel.AppLog.Errorf("MEvent.Delete : db.Exec (candidateEvent), %s\n", err)
	// 	return err
	// }

	err = m.DeleteCandidatesFromEvent(ID)
	if err != nil {
		fmt.Println("MEvent.Delete : m.DeleteCandidatesFromEvent error : ", err)
		revel.AppLog.Errorf("MEvent.Delete : m.DeleteCandidatesFromEvent, %s\n", err)
		return err
	}

	// query = `DELETE FROM public."EmployeeEvent"
	// 	WHERE "id_event" = $1;`

	err = m.DeleteEmployeesFromEvent(ID)
	if err != nil {
		fmt.Println("MEvent.Delete : m.DeleteEmployeesFromEvent error : ", err)
		revel.AppLog.Errorf("MEvent.Delete : m.DeleteEmployeesFromEvent, %s\n", err)
		return err
	}

	query := `DELETE FROM public."Event"
		WHERE id = $1;`

	_, err = db.Exec(query, ID)
	if err != nil {
		fmt.Println("MEvent.Delete : db.Exec (event) error : ", err)
		revel.AppLog.Errorf("MEvent.Delete : db.Exec (event), %s\n", err)
		return err
	}

	return nil
}

// UpdateCandidateStatusToFinishedEvent обновляет статус кандидата в таблице связи между кандидатом и мероприятием
func (m *MEvent) UpdateCandidateStatusToFinishedEvent(IDcandidate int64, IDevent int64) error {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MEvent.UpdateCandidateStatusToFinishedEvent : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MEvent.UpdateCandidateStatusToFinishedEvent : helpers.GetConnector, %s\n", err)
		return err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MEvent.UpdateCandidateStatusToFinishedEvent : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MEvent.UpdateCandidateStatusToFinishedEvent : connector.GetDBConnection, %s\n", err)
		return err
	}

	defer db.Close()

	fmt.Println("UpdateCandidateStatusToFinishedEvent : IDCandidate: ", IDcandidate, " IDEvent: ", IDevent)

	query := `SELECT "id_candidateStatus"
	FROM public."CandidateEvent"
	WHERE "id_candidate" = $1
	AND "id_event" = $2;`

	var idCandidateStatus int

	err = db.QueryRow(query, IDcandidate, IDevent).Scan(&idCandidateStatus)
	if err != nil {
		fmt.Println("MEvent.UpdateCandidateStatusToFinishedEvent : db.QueryRow error : ", err)
		revel.AppLog.Errorf("MEvent.UpdateCandidateStatusToFinishedEvent : db.QueryRow, %s\n", err)
		return err
	}

	fmt.Println("First query result: ", idCandidateStatus)

	query = `UPDATE public."CandidateEvent"
	SET "candidatesStatusValue" = (SELECT "Status"
							FROM public."CandidatesStatus"
							WHERE id = $1)
	WHERE "id_candidate" = $2
	AND "id_event" = $3;`

	returnQuery, err := db.Exec(query, idCandidateStatus, IDcandidate, IDevent)
	if err != nil {
		fmt.Println("MEvent.UpdateCandidateStatusToFinishedEvent : db.Exec error : ", err)
		revel.AppLog.Errorf("MEvent.UpdateCandidateStatusToFinishedEvent : db.Exec, %s\n", err)
		return err
	}

	fmt.Println("Second query result: ", returnQuery)

	return nil
}

//InsertEmployeeToEvent связывание сотрудника и мероприятия
func (m *MEvent) InsertEmployeeToEvent(IDEmployee int64, IDEvent int64) (err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MEvent.InsertEmployeeToEvent : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MEvent.InsertEmployeeToEvent : helpers.GetConnector, %s\n", err)
		return err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MEvent.InsertEmployeeToEvent : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MEvent.InsertEmployeeToEvent : connector.GetDBConnection, %s\n", err)
		return err
	}

	defer db.Close()

	fmt.Println("ID employee: ", IDEmployee)
	fmt.Println("ID event: ", IDEvent)

	query := `INSERT INTO public."EmployeeEvent"(
		id_employee, id_event)
		VALUES ($1, $2);`

	_, err = db.Exec(query, IDEmployee, IDEvent)
	if err != nil {
		fmt.Println("MEvent.InsertEmployeeToEvent : db.Exec error : ", err)
		revel.AppLog.Errorf("MEvent.InsertEmployeeToEvent : db.Exec, %s\n", err)
		return err
	}
	return nil
}

//DeleteEmployeesFromEvent удаляет всех сотрудников из мероприятия
func (m *MEvent) DeleteEmployeesFromEvent(IDEvent int64) (err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MEvent.DeleteEmployeesFromEvent : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MEvent.DeleteEmployeesFromEvent : helpers.GetConnector, %s\n", err)
		return err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MEvent.DeleteEmployeesFromEvent : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MEvent.DeleteEmployeesFromEvent : connector.GetDBConnection, %s\n", err)
		return err
	}

	defer db.Close()

	query := `DELETE FROM public."EmployeeEvent"
	WHERE id_event = $1;`

	_, err = db.Exec(query, IDEvent)
	if err != nil {
		fmt.Println("MEvent.DeleteEmployeesFromEvent : db.QueryRow error : ", err)
		revel.AppLog.Errorf("MEvent.DeleteEmployeesFromEvent : db.QueryRow, %s\n", err)
		return err
	}

	return nil
}

//InsertCandidateToEvent связывание кандидата и мероприятия
func (m *MEvent) InsertCandidateToEvent(IDcandidate int64, IDevent int64) (err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MEvent.InsertCandidateToEvent : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MEvent.InsertCandidateToEvent : helpers.GetConnector, %s\n", err)
		return err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MEvent.InsertCandidateToEvent : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MEvent.InsertCandidateToEvent : connector.GetDBConnection, %s\n", err)
		return err
	}

	defer db.Close()

	fmt.Println("ID candidate: ", IDcandidate)
	fmt.Println("ID event: ", IDevent)

	query := `INSERT INTO public."CandidateEvent"(
		id_candidate, id_event, "id_candidateStatus")
		VALUES ($1, $2, (SELECT "id_candidatesStatus"
					  FROM public."Candidate"
					  WHERE id = $1));`

	_, err = db.Exec(query, IDcandidate, IDevent)
	if err != nil {
		fmt.Println("MEvent.InsertCandidateToEvent : db.Exec error : ", err)
		revel.AppLog.Errorf("MEvent.InsertCandidateToEvent : db.Exec, %s\n", err)
		return err
	}
	return nil
}

//DeleteCandidatesFromEvent удаляет всех кандидатов из мероприятия
func (m *MEvent) DeleteCandidatesFromEvent(IDEvent int64) (err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MEvent.DeleteCandidatesFromEvent : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MEvent.DeleteCandidatesFromEvent : helpers.GetConnector, %s\n", err)
		return err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MEvent.DeleteCandidatesFromEvent : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MEvent.DeleteCandidatesFromEvent : connector.GetDBConnection, %s\n", err)
		return err
	}

	defer db.Close()

	query := `DELETE FROM public."CandidateEvent"
	WHERE id_event = $1;`

	_, err = db.Exec(query, IDEvent)
	if err != nil {
		fmt.Println("MEvent.DeleteCandidatesFromEvent : db.QueryRow error : ", err)
		revel.AppLog.Errorf("MEvent.DeleteCandidatesFromEvent : db.QueryRow, %s\n", err)
		return err
	}

	return nil
}
