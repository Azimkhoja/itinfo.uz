const Topic = require('../models/Topic')
const {errorHandler, checkId} = require('../helpers/error_handler')
const Author = require('../models/Author')
const addTopic = async(req, res) => {
    try {
        const {author_id, topic_title, topic_text, is_checked, is_approved, expert_id} = req.body        
        if(checkId(author_id)){
            let author = await Author.findById(id)
            if(author != null){
                let newTopic = await Topic({author_id, topic_title, topic_text, is_checked, is_approved, expert_id}).save()
            }
            else res.error(500, "there is no such Author id")
        }
        else res.error(500, "Invalid id entered ")
    } catch (error) {
        errorHandler(res, error)
    }
}

const getTopic = async(req, res) => {
    try {
        const {id} = req.params
        if(checkId(id)){
            let topic = await Topic.findById(id)
            if(topic != null){
                return res.ok(200, topic)
            }
            return res.error(500, "nothing found by this id")
        }
        else res.error(500, "Invalid id entered")
    } catch (error) {
        errorHandler(res, error)
    }
}

const getAllTopic = async(req, res) => {
    try {
        const all_topic = await Topic.find()
        if(all_topic.length == 0){
            return res.error(500, "topics collection is empty")
        }
        res.ok(200, all_topic)
    } catch (error) {
        errorHandler(res, error)
    }
}

const updateTopic = async(req, res) => {
    try {
        
    } catch (error) {
        errorHandler(res, error)
    }
}

const deleteTopic = async(req, res) => {
    try {
        const {id} = req.params
        if(checkId(id)){
            let del_topic = await Topic.findById(id)
            if(del_topic != null)
                return res.ok(200, await Topic.findByIdAndDelete(id) )
            return res.error(500, "Not found ")
        }
        else res.error(500, "Invalid id entered")
    } catch (error) {
        errorHandler(res, error)
    }
}


module.exports = {
    addTopic, 
    getTopic, 
    getAllTopic, 
    updateTopic,
    deleteTopic
}