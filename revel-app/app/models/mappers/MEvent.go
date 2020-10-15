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
	JOIN public."EventsStatus" as es ON e.id = es.id`

	rows, err := db.Query(query)
	if err != nil {
		panic(err)
	}

	defer rows.Close()

	for rows.Next() {
		p := entities.Event{}
		err := rows.Scan(&p.ID, &p.Theme, &p.Beginning, &p.Status)
		if err != nil {
			fmt.Println(err)
			continue
		}
		fmt.Println(rows)
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
	JOIN public."EventsStatus" as es ON e.id = es.id
	WHERE e.id = $1`

	row, err := db.Query(query, ID)

	if err != nil {
		return nil, err
	}

	defer row.Close()

	row.Next()
	result := entities.Event{}
	err = row.Scan(&result.ID, &result.Theme, &result.Beginning, &result.Status)

	return &result, nil
}

//Insert добавление мероприятия
func (m *MEvent) Insert(event entities.Event) (e *entities.Event, err error) {
	return
}

//Update изменение мероприятия
func (m *MEvent) Update(event entities.Event) (e *entities.Event, err error) {
	return
}

//Delete удаление мероприятия
func (m *MEvent) Delete(ID int64) (err error) {
	return
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

	query := `INSERT INTO public."EmployeeEvent"(
		id_employee, id_event)
		VALUES ($1, $2);`

	err = db.QueryRow(query, IDEmployee, IDEvent).Scan()
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
		fmt.Println(err)
		return err
	}

	return nil
}

//InsertCandidateToEvent связывание кандидата и мероприятия
func (m *MEvent) InsertCandidateToEvent(IDcandidate int64, IDevent int64) (err error) {
	return
}

//DeleteCandidatesFromEvent удаляет всех кандидатов из мероприятия
func (m *MEvent) DeleteCandidatesFromEvent(IDEvent int64) (err error) {
	return
}
