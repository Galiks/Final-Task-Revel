package mappers

import (
	"database/sql"
	"fmt"
	"revel-app/app/helpers"
	"revel-app/app/models/entities"
	"time"
)

//MUser маппер пользователей
type MUser struct {
	db *sql.DB
}

//UserSQL структура сущности пользователя
type UserSQL struct {
	ID           int64      `json:"ID"`
	Login        string     `json:"login"`
	Password     string     `json:"password"`
	Role         string     `json:"role"`
	UserPhoto    *[]byte    `json:"photo"`
	LastVisisted *time.Time `json:"last visited"`
}

func (u UserSQL) toUser() entities.User {
	var (
		userPhoto   []byte
		lastVisited time.Time
	)

	if u.UserPhoto == nil {
		userPhoto = make([]byte, 0, 0)
	} else {
		userPhoto = *u.UserPhoto
	}

	if u.LastVisisted == nil {
		lastVisited = time.Now()
	} else {
		lastVisited = *u.LastVisisted
	}

	return entities.User{
		ID:           u.ID,
		Login:        u.Login,
		Password:     u.Password,
		Role:         u.Role,
		UserPhoto:    userPhoto,
		LastVisisted: lastVisited}
}

//SelectAll получение всех пользователей
func (m *MUser) SelectAll() (us []*entities.User, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	defer db.Close()

	query := `SELECT u.id, "Login", "Password", "UserPhoto", "LastVisite", "Role"
	FROM public."User" as u
	JOIN public."Role" as r ON u.id_role = r.id;`

	rows, err := db.Query(query)
	if err != nil {
		panic(err)
	}

	defer rows.Close()

	for rows.Next() {
		p := UserSQL{}
		err := rows.Scan(&p.ID, &p.Login, &p.Password, &p.UserPhoto, &p.LastVisisted, &p.Role)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		user := p.toUser()

		us = append(us, &user)
	}

	return us, nil
}

//SelectByID получение пользователя по ID
func (m *MUser) SelectByID(ID int64) (u *entities.User, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	defer db.Close()

	query := `SELECT u.id, "Login", "Password", "UserPhoto", "LastVisite", "Role"
	FROM public."User" as u
	JOIN public."Role" as r ON u.id_role = r.id
	WHERE u.id = $1;`

	rows, err := db.Query(query, ID)
	if err != nil {
		panic(err)
	}

	defer rows.Close()

	rows.Next()
	p := UserSQL{}
	err = rows.Scan(&p.ID, &p.Login, &p.Password, &p.UserPhoto, &p.LastVisisted, &p.Role)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	user := p.toUser()
	return &user, nil
}

//SelectByAuth получения пользователя при авторизации
func (m *MUser) SelectByAuth(user *entities.User) (u *entities.User, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	defer db.Close()

	query := `SELECT u.id, "Login", "Password", "Role", "UserPhoto", "LastVisite"
	FROM public."User" as u
	JOIN public."Role" as r ON u."id_role" = r.id
	WHERE "Login" = $1
	AND "Password" = $2;`

	rows, err := db.Query(query, user.Login, user.Password)
	if err != nil {
		panic(err)
	}

	defer rows.Close()

	rows.Next()
	fmt.Println(rows)
	p := UserSQL{}
	err = rows.Scan(&p.ID, &p.Login, &p.Password, &p.Role, &p.UserPhoto, &p.LastVisisted)
	result := p.toUser()
	return &result, nil

}

//Insert создание пользователя
func (m *MUser) Insert(user *entities.User) (u *entities.User, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	defer db.Close()

	fmt.Println("User for insert : ", user)

	var id int64

	query := `INSERT INTO public."User"(
		"Login", "Password", "UserPhoto", "LastVisite", id_role)
		VALUES ($1, $2, $3, $4, (SELECT id
							FROM public."Role"
							WHERE "Role" = $5))
							RETURNING id;`

	err = db.QueryRow(query,
		user.Login,
		user.Password,
		user.UserPhoto,
		user.LastVisisted,
		user.Role).Scan(&id)

	if err != nil {
		fmt.Println("Insert user query error : ", err)
		return nil, err
	}

	fmt.Println("ID of new user : ", id)

	u, err = m.SelectByID(id)
	if err != nil {
		fmt.Println("SelectByID error : ", err)
		return nil, err
	}
	return u, nil
}

//Update изменение пользователя
func (m *MUser) Update(user *entities.User) (u *entities.User, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	query := `UPDATE public."User"
	SET "Login"=$1, "Password"=$2, "UserPhoto"=$3, "LastVisite"=$4, id_role=(SELECT id
																		FROM public."Role"
																		WHERE "Role" = $5)
	WHERE id = $6;`

	_, err = db.Exec(query,
		user.Login,
		user.Password,
		user.UserPhoto,
		user.LastVisisted,
		user.Role,
		user.ID)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	u, err = m.SelectByID(user.ID)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	return u, nil
}

//Delete удаление пользователя
func (m *MUser) Delete(ID int64) (err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		panic(err)
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		panic(err)
	}

	query := `DELETE FROM public."User"
		WHERE id = 5;`

	_, err = db.Exec(query, ID)
	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil

}
