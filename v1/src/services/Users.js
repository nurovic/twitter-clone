const BaseService = require("./BaseService")
const BaseModel = require("../models/Users")

class TweetService extends BaseService{
    constructor(){
        super(BaseModel)
    }
}

module.exports = new TweetService()