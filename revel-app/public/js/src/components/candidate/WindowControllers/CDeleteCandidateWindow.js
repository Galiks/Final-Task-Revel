export class CDeleteCandidateWindow{
    constructor(){

    }

    init(candidate, candidateModel, refreshDatatable){
        this.candidateModel = candidateModel
        this.refreshDatatable = refreshDatatable

        this.window = $$("deleteWindow")
        this.main = $$("main")

        this.attachCandidateOnDeleteWindow(candidate)
    }

    attachCandidateOnDeleteWindow(candidate){
        $$("deleteWindowClose").attachEvent("onItemClick", ()=>{
            this.window.close()
            this.main.enable()
        })

        this.window.attachEvent("onHide", ()=> {
            this.window.close()
            this.main.enable()
        })

        $$("deleteWindowButtonYes").attachEvent("onItemClick", () =>{
            this.candidateModel.deleteCandidate(candidate.ID)
            this.window.close()
            this.main.enable()
            this.refreshDatatable()
        })

        $$("deleteWindowButtonNo").attachEvent("onItemClick", () =>{
            this.window.close()
            this.main.enable()
        })

        this.window.show()
        this.main.disable()
        
    }
}