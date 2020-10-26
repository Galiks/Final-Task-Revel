export class Event{
    /**
     * 
     * @param {number} id 
     * @param {string} theme 
     * @param {Date} beginning 
     * @param {EVENT_STATUS} status
     */
    constructor(id, theme, beginning, status){
        this.ID = id
        this.theme = theme
        this.beginning = beginning
        this.status = status
    }
}