
module.exports = class Vehicle {
    constructor(json){
        if(json){
            this.brand = json.brand
            this.model = json.model
            this.year = json.year
            this.board = json.board
            this.price = json.price
            this.id_colors = json.id_colors
        }
    }
}

