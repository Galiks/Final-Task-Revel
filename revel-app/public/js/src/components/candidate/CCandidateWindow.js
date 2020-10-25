import { CandidateModel } from "../../models/CandidateModel.js";
import { CandidateWindowView } from "./CandidateWindowView.js";
import { CAboutCandidateWindow } from "./WindowControllers/CAboutCandidateWindow.js";
import { CCreateCandidateWindow } from "./WindowControllers/CCreateCandidateWindow.js";
import { CDeleteCandidateWindow } from "./WindowControllers/CDeleteCandidateWindow.js";
import { CUpdateCandidateWindow } from "./WindowControllers/CUpdateCandidateWindow.js";

export class CCandidateWindow{
    constructor(){
        this.candidateWindowView = new CandidateWindowView()
    }

    /**
     * Метод для инициализации переменных
     */
    init(refreshDatatable){
        this.refreshDatatable = refreshDatatable

        this.createWindowController = new CCreateCandidateWindow()
        this.updateWindowController = new CUpdateCandidateWindow()
        this.deleteWindowController = new CDeleteCandidateWindow()
        this.aboutWindowController = new CAboutCandidateWindow()
    }


    createWindow(){
        webix.ui(this.candidateWindowView.viewCreateWindow())
        this.createWindowController.init(()=>{this.refreshDatatable()})
    }

    deleteWindow(candidate){
        webix.ui(this.candidateWindowView.viewDeleteWindow(candidate))
        this.deleteWindowController.init(candidate, ()=>{this.refreshDatatable()})
    }

    updateWindow(candidate){
        webix.ui(this.candidateWindowView.viewUpdateWindow(candidate))
        this.updateWindowController.init(candidate, () => {this.refreshDatatable()})
    }

    aboutWindow(candidate){
        webix.ui(this.candidateWindowView.viewAboutWindow(candidate))
        this.aboutWindowController.init()
    }
}

export const CANDIDATE_STATUS = {
    empty: "Не назначен",
    invite: "Приглашен",
    showUp: "Явился",
    dontShowUp: "Не явился",
    wait: "Ожидает результат",
    success: "Успешно",
    unsuccess: "Не успешно"
}