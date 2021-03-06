package mappers

import (
	"database/sql"
	"errors"
	"fmt"
	"revel-app/app/helpers"
	"revel-app/app/models/entities"
	"time"

	"github.com/revel/revel"
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
	IDRole       *int64     `json:"id_role"`
	UserPhoto    *[]byte    `json:"userPhoto"`
	LastVisisted *time.Time `json:"lastVisited"`
}

//ToUser метод для конвертации из UserSQL в User
func (u UserSQL) ToUser() entities.User {
	var (
		role        string
		userPhoto   []byte
		lastVisited time.Time
	)

	if u.IDRole == nil {
		role = "Нет роли"
	} else {
		roleByID, err := u.getRoleByID(*u.IDRole)
		if err != nil {
			role = "Нет роли"
		}
		role = roleByID
	}

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
		Password:     "password",
		Role:         role,
		UserPhoto:    userPhoto,
		LastVisisted: lastVisited}
}

//SelectAll получение всех пользователей
func (m *MUser) SelectAll() (us []*entities.User, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MUser.SelectAll : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MUser.SelectAll : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MUser.SelectAll : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MUser.SelectAll : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	query := `SELECT id, "Login", "Password", "UserPhoto", "LastVisite", "id_role"
	FROM public."User"`

	rows, err := db.Query(query)
	if err != nil {
		fmt.Println("MUser.SelectAll : db.Query error : ", err)
		revel.AppLog.Errorf("MUser.SelectAll : db.Query, %s\n", err)
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		p := UserSQL{}
		err := rows.Scan(&p.ID, &p.Login, &p.Password, &p.UserPhoto, &p.LastVisisted, &p.IDRole)
		if err != nil {
			fmt.Println("MUser.SelectAll : rows.Scan error : ", err)
			revel.AppLog.Errorf("MUser.SelectAll : rows.Scan, %s\n", err)
		}
		user := p.ToUser()

		us = append(us, &user)
	}

	return us, nil
}

//SelectByID получение пользователя по ID
func (m *MUser) SelectByID(ID int64) (u *entities.User, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MUser.SelectByID : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MUser.SelectByID : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MUser.SelectByID : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MUser.SelectByID : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	query := `SELECT id, "Login", "Password", "UserPhoto", "LastVisite", "id_role"
	FROM public."User"
	WHERE id = $1;`

	rows, err := db.Query(query, ID)
	if err != nil {
		fmt.Println("MUser.SelectByID : db.Query error : ", err)
		revel.AppLog.Errorf("MUser.SelectByID : db.Query, %s\n", err)
		return nil, err
	}

	defer rows.Close()

	rows.Next()
	p := UserSQL{}
	err = rows.Scan(&p.ID, &p.Login, &p.Password, &p.UserPhoto, &p.LastVisisted, &p.IDRole)
	if err != nil {
		fmt.Println("MUser.SelectByID : rows.Scan error : ", err)
		revel.AppLog.Errorf("MUser.SelectByID : rows.Scan, %s\n", err)
		return nil, err
	}
	user := p.ToUser()
	return &user, nil
}

//SelectByAuth получения пользователя при авторизации
func (m *MUser) SelectByAuth(user *entities.User) (u *entities.User, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MUser.SelectByAuth : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MUser.SelectByAuth : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MUser.SelectByAuth : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MUser.SelectByAuth : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	fmt.Println("MUser.SelectByAuth : Input value : ", user)

	query := `SELECT id, "Login", "Password", "id_role", "UserPhoto", "LastVisite"
	FROM public."User"
	WHERE "Login" = $1
	AND "Password" = $2;`

	rows, err := db.Query(query, user.Login, user.Password)
	if err != nil {
		fmt.Println("MUser.SelectByAuth : db.Query error : ", err)
		revel.AppLog.Errorf("MUser.SelectByAuth : db.Query, %s\n", err)
		return nil, err
	}

	defer rows.Close()

	rows.Next()
	p := UserSQL{}
	err = rows.Scan(&p.ID, &p.Login, &p.Password, &p.IDRole, &p.UserPhoto, &p.LastVisisted)
	if p.ID == 0 {
		return nil, errors.New("Пользователь не найден")
	}
	result := p.ToUser()
	result.LastVisisted = time.Now()
	m.UpdateLastVisited(&result)
	fmt.Println("MUser.SelectByAuth : ", result)
	return &result, nil

}

//Insert создание пользователя
func (m *MUser) Insert(user *entities.User) (u *entities.User, err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MUser.Insert : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MUser.Insert : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MUser.Insert : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MUser.Insert : connector.GetDBConnection, %s\n", err)
		return nil, err
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
		fmt.Println("MUser.Insert : db.QueryRow error : ", err)
		revel.AppLog.Errorf("MUser.Insert : db.QueryRow, %s\n", err)
		return nil, err
	}

	fmt.Println("ID of new user : ", id)

	u, err = m.SelectByID(id)
	if err != nil {
		fmt.Println("MUser.Insert : m.SelectByID error : ", err)
		revel.AppLog.Errorf("MUser.Insert : m.SelectByID, %s\n", err)
		return nil, err
	}
	return u, nil
}

//Update изменение пользователя
func (m *MUser) Update(user *entities.User) (u *entities.User, err error) {
	fmt.Println("MUser.Update START")
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MUser.Update : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MUser.Update : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MUser.Update : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MUser.Update : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	query := `UPDATE public."User"
	SET "Login"=$1, id_role=(SELECT id
							FROM public."Role"
							WHERE "Role" = $2)
	WHERE id = $3;`

	_, err = db.Exec(query,
		user.Login,
		user.Role,
		user.ID)
	if err != nil {
		fmt.Println("MUser.Update : db.Exec error : ", err)
		revel.AppLog.Errorf("MUser.Update : db.Exec, %s\n", err)
		return nil, err
	}

	u, err = m.SelectByID(user.ID)
	if err != nil {
		fmt.Println("MUser.Update : m.SelectByID error : ", err)
		revel.AppLog.Errorf("MUser.Update : m.SelectByID, %s\n", err)
		return nil, err
	}

	return u, nil
}

//UpdatePassword изменение пароля пользователя
func (m *MUser) UpdatePassword(user *entities.User) (u *entities.User, err error) {
	fmt.Println("MUser.UpdatePassword START")
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MUser.UpdatePassword : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MUser.UpdatePassword : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MUser.UpdatePassword : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MUser.UpdatePassword : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	query := `UPDATE public."User"
	SET "Password"=$1
	WHERE id = $2;`

	_, err = db.Exec(query,
		user.Password,
		user.ID)
	if err != nil {
		fmt.Println("MUser.UpdatePassword : db.Exec error : ", err)
		revel.AppLog.Errorf("MUser.UpdatePassword : db.Exec, %s\n", err)
		return nil, err
	}

	u, err = m.SelectByID(user.ID)
	if err != nil {
		fmt.Println("MUser.UpdatePassword : m.SelectByID error : ", err)
		revel.AppLog.Errorf("MUser.UpdatePassword : m.SelectByID, %s\n", err)
		return nil, err
	}

	return u, nil
}

//UpdateLastVisited изменение пользователя
func (m *MUser) UpdateLastVisited(user *entities.User) (u *entities.User, err error) {
	fmt.Println("MUser.UpdateLastVisited START")
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MUser.UpdateLastVisited : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MUser.UpdateLastVisited : helpers.GetConnector, %s\n", err)
		return nil, err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MUser.UpdateLastVisited : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MUser.UpdateLastVisited : connector.GetDBConnection, %s\n", err)
		return nil, err
	}

	defer db.Close()

	query := `UPDATE public."User"
	SET "LastVisite"=$1
	WHERE id = $2;`

	_, err = db.Exec(query,
		user.LastVisisted,
		user.ID)
	if err != nil {
		fmt.Println("MUser.UpdateLastVisited : db.Exec error : ", err)
		revel.AppLog.Errorf("MUser.UpdateLastVisited : db.Exec, %s\n", err)
		return nil, err
	}

	u, err = m.SelectByID(user.ID)
	if err != nil {
		fmt.Println("MUser.UpdateLastVisited : m.SelectByID error : ", err)
		revel.AppLog.Errorf("MUser.UpdateLastVisited : m.SelectByID, %s\n", err)
		return nil, err
	}

	return u, nil
}

//Delete удаление пользователя
func (m *MUser) Delete(ID int64) (err error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MUser.Delete : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MUser.Delete : helpers.GetConnector, %s\n", err)
		return err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MUser.Delete : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MUser.Delete : connector.GetDBConnection, %s\n", err)
		return err
	}

	defer db.Close()

	query := `DELETE FROM public."User"
		WHERE id = 5;`

	_, err = db.Exec(query, ID)
	if err != nil {
		fmt.Println("MUser.Delete : db.Exec error : ", err)
		revel.AppLog.Errorf("MUser.Delete : db.Exec, %s\n", err)
		return err
	}

	return nil

}

func (u *UserSQL) getRoleByID(ID int64) (string, error) {
	connector, err := helpers.GetConnector()
	if err != nil {
		fmt.Println("MUser.getRoleByID : helpers.GetConnector error : ", err)
		revel.AppLog.Errorf("MUser.getRoleByID : helpers.GetConnector, %s\n", err)
		return "", err
	}
	db, err := connector.GetDBConnection()
	if err != nil {
		fmt.Println("MUser.getRoleByID : connector.GetDBConnection error : ", err)
		revel.AppLog.Errorf("MUser.getRoleByID : connector.GetDBConnection, %s\n", err)
		return "", err
	}

	defer db.Close()

	query := `SELECT "Role"
	FROM public."Role"
	WHERE id = $1`

	rows, err := db.Query(query, ID)
	if err != nil {
		fmt.Println("MUser.getRoleByID : db.Query error : ", err)
		revel.AppLog.Errorf("MUser.getRoleByID : db.Query, %s\n", err)
		return "", err
	}

	defer rows.Close()

	rows.Next()
	var role string
	err = rows.Scan(&role)
	if err != nil {
		fmt.Println("MUser.getRoleByID : rows.Scan error : ", err)
		revel.AppLog.Errorf("MUser.getRoleByID : rows.Scan, %s\n", err)
		return "", err
	}
	return role, nil
}
