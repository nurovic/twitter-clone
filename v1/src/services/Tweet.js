const BaseService = require("./BaseService")
const BaseModel = require("../models/Tweet")

class UserService extends BaseService{
    constructor(){
        super(BaseModel)
    }
}

module.exports = new UserService()