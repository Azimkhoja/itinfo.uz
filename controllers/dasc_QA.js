const Desc_QA = require('../models/Desc_QA')
const ApiError = require('../errors/ApiErrors')
const checkId = require('../helpers/error_handler')

const add_Desc_QA = async(req, res) => {
    try {
        const {QA_id, desc_id} = req.body
        if(checkId(QA_id) && checkId(desc_id)){
            await Desc_QA({QA_id, desc_id}).save()
            res.ok(200, "Added")
        }
        else {
            res.error(400, "Invalid id entered.")
        }       
    } catch (error) {
        ApiError.internal(res, "server error")        
    }
}

const get_Desc_QA = async(req, res) => {
    try {
        const {id} = req.params
        const desc_qa = await Desc_QA.findById(id) 
        if(desc_qa != null){
            res.ok(200, desc_qa)
        }       
        ApiError.notFound(res, "search not found")
    } catch (error) {
        
    }
}


const getAll_Desc_QA = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}


const update_Desc_QA = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}


const delete_Desc_QA = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}