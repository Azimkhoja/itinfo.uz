const Question_Answer = require('../models/Question_Answer')
const {errorHandler, checkId} = require('../helpers/error_handler')

const addQuestion_Answer = async(req, res) => {
    try {
        const {question, answer, is_checked, expert_id} = req.body
        let isthere = await Question_Answer.findOne({question, answer, is_checked, expert_id})
        if(isthere != null){
            return res.send({status: 500, message: "Yuo are entering an existing data"})
        }        
        isthere = await Question_Answer({question, answer, is_checked, expert_id}).save()
        res.send({status: 200, data: isthere, message: "Saved"})
    } catch (error) {
        errorHandler(res, error)
    }
}

const getQuestion_Answer = async(req, res) => {
    try {
        const {id} = req.params
        if(checkId(id)){
            let QA = await Question_Answer.findOne({question, answer, is_checked, expert_id})
            if(QA == null)  
                return res.send({status: 400, message: "not found question_answer by this id"})
        }
    } catch (error) {
        errorHandler(res, error)
    }
}

const getAllQuestion_Answer = async(req, res) => {
    try {
        
    } catch (error) {
        errorHandler(res, error)
    }
}

const updateQuestion_Answer = async(req, res) => {
    try {
        
    } catch (error) {
        errorHandler(res, error)
    }
}

const deleteQuestion_Answer = async(req, res) => {
    try {
        
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports = {
    addQuestion_Answer,
    getQuestion_Answer,
    getAllQuestion_Answer,
    updateQuestion_Answer,
    deleteQuestion_Answer
}