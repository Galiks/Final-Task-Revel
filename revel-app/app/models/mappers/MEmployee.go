package mappers

import (
	"database/sql"
	"fmt"
	"revel-app/app/helpers"
	"revel-app/app/models/entities"
)

//EmployeeSQL структура для конвертации в Employee
type EmployeeSQL struct {
	ID         int64   `json:"ID"`
	Firstname  string  `json:"firstname"`
	Lastname   string  `json:"lastname"`
	Patronymic *string `json:"patronymic"`
	Position   string  `json:"position"`
	Email      string  `json:"email"`
	Phone      string  `json:"phone"`
	IDUser     *int64  `json:"id_user"`
}

//ToEmployee метод конвентирует EmployeeSQL в Employee
func (e EmployeeSQL) ToEmployee() entities.Employee {
	var (
		patronymic string
		idUser     int64
	)

	if e.Patronymic == nil {
		patronymic = ""
	} else {
		patronymic = *e.Patronymic
	}

	if e.IDUser == nil {
		idUser = 0
	} else {
		idUser = *e.IDUser
	}

	return entities.Employee{
		ID:         e.ID,
		Firstname:  e.Firstname,
		Lastname:   e.Lastname,
		Patronymic: patronymic,
		Position:   e.Position,
		Email:      e.Email,
		Phone:      e.Phone,
		IDUser:     idUser}
}

//MEmployee маппер сотрудников
type MEmployee struct {
	db *sql.DB
}

//SelectAll получение всех сотрудников
func (m *MEmployee) SelectAll() (es []*entities.Employee, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	defer db.Close()

	query := `SELECT id, "Firstname", "Lastname", "Patronymic", "Position", "Email", "Phone", id_user
	FROM public."Employee";`

	rows, err := db.Query(query)
	if err != nil {
		panic(err)
	}

	defer rows.Close()

	for rows.Next() {
		p := EmployeeSQL{}
		err := rows.Scan(&p.ID, &p.Firstname, &p.Lastname, &p.Patronymic, &p.Position, &p.Email, &p.Phone, &p.IDUser)
		if err != nil {
			fmt.Println(err)
			continue
		}
		fmt.Println("ROWS THERE!")
		fmt.Println(rows)

		employee := p.ToEmployee()

		es = append(es, &employee)
	}

	return es, nil
}

//SelectByEventID получение сотрудников, связанных с мероприятием
func (m *MEmployee) SelectByEventID(IDEvent int64) (es []*entities.Employee, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	defer db.Close()

	query := `SELECT e.id, "Firstname", "Lastname", "Patronymic", "Position", "Email", "Phone", id_user
	FROM public."Employee" as e
	JOIN public."EmployeeEvent" as ee ON e.id = ee.id_employee
	WHERE ee.id_event = $1`

	rows, err := db.Query(query, IDEvent)
	if err != nil {
		panic(err)
	}

	defer rows.Close()

	for rows.Next() {
		p := EmployeeSQL{}
		err := rows.Scan(&p.ID, &p.Firstname, &p.Lastname, &p.Patronymic, &p.Position, &p.Email, &p.Phone, &p.IDUser)
		if err != nil {
			fmt.Println(err)
			continue
		}
		fmt.Println("ROWS THERE!")
		fmt.Println(rows)

		employee := p.ToEmployee()

		es = append(es, &employee)
	}

	return es, nil
}

//SelectByID получение сотрудников по ID
func (m *MEmployee) SelectByID(ID int64) (e *entities.Employee, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	query := `SELECT id, "Firstname", "Lastname", "Patronymic", "Position", "Email", "Phone", id_user
	FROM public."Employee"
	WHERE id = $1;`

	row, err := db.Query(query, ID)
	if err != nil {
		fmt.Println(err)
		return
	}
	if err != nil {
		return nil, err
	}

	defer row.Close()

	p := EmployeeSQL{}
	row.Next()
	err = row.Scan(&p.ID, &p.Firstname, &p.Lastname, &p.Patronymic, &p.Position, &p.Email, &p.Phone, &p.IDUser)
	employee := p.ToEmployee()
	return &employee, nil
}

//Insert добавление сотрудников
func (m *MEmployee) Insert(employee *entities.Employee) (e *entities.Employee, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	var id int64

	query := `INSERT INTO public."Employee"(
		"Firstname", "Lastname", "Patronymic", "Position", "Email", "Phone")
		VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`

	err = db.QueryRow(query, employee.Firstname,
		employee.Lastname,
		employee.Patronymic,
		employee.Position,
		employee.Email,
		employee.Phone).Scan(id)
	if err != nil {
		fmt.Println(err)
		return
	}

	e, err = m.SelectByID(id)
	if err != nil {
		fmt.Println(err)
		return
	}

	return e, nil
}

//Update изменение сотрудника
func (m *MEmployee) Update(employee *entities.Employee) (e *entities.Employee, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		return nil, err
	}

	query := `UPDATE public."Employee"
	SET "Firstname"=$1, "Lastname"=$2, "Patronymic"=$3, "Position"=$4, "Email"=$5, "Phone"=$6, id_user=$7
	WHERE id = $8;`

	fmt.Println("ID - ", employee.ID)

	_, err = db.Exec(query,
		employee.Firstname,
		employee.Lastname,
		employee.Patronymic,
		employee.Position,
		employee.Email,
		employee.Phone,
		employee.IDUser,
		employee.ID)
	if err != nil {
		fmt.Println("EXEC: ")
		fmt.Println(err)
		return
	}

	e, err = m.SelectByID(employee.ID)
	if err != nil {
		fmt.Println("SELECT BY ID: ")
		fmt.Println(err)
		return
	}
	return e, nil
}

//Delete удаление сотрудника
func (m *MEmployee) Delete(ID int64) (err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		return err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		return err
	}

	query := `DELETE FROM public."Employee"
	WHERE id = $1;`

	err = db.QueryRow(query, ID).Scan()
	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}
