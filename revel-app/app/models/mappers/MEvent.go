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
func (m *MEvent) SelectAll() (e []entities.Event, err error) {
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

	result := []entities.Event{}

	for rows.Next() {
		p := entities.Event{}
		err := rows.Scan(&p.ID, &p.Theme, &p.Beginning, &p.Status)
		if err != nil {
			fmt.Println(err)
			continue
		}
		fmt.Println(rows)
		result = append(result, p)
	}

	return result, nil
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
