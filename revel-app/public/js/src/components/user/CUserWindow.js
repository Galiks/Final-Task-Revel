import { User } from "../../models/entities/User.js";
import { UserModel } from "./../../models/UserModel.js";
import { UserWindow } from "./UserWindowView.js";

export class CUserWindow{
    constructor(){
        this.userModel = new UserModel()
        this.currentUser = new User();
    }

    async init(){
       
    }
}