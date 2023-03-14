const Desc_Topic = require('../models/Desc_Topic')
const {errorHandler, checkId} = require('../helpers/error_handler')
const Description = require('../models/Description')
const Topic = require('../models/Topic')

const addDesc_Topic = async(req, res) => {
    try {
        const {desc_id, topic_id} = req.body
        let flag = false
        if(checkId(desc_id)){
            let descript = await Description.findOne({_id: desc_id})
            if(descript != null)
                flag = true
            else return res.send({status: 500, message: "description not fount by this description id"})
        }
        else return res.send({status: 400, message: "invalid description id"})
        if(checkId(topic_id)){
            let topic = await Topic.findOne({_id: topic_id})
            if(topic != null && flag){
                let add = await Desc_Topic({desc_id, topic_id}).save()
                return res.send({status: 200, message: "Successfully added", data: add})
            }
            else res.send({status: 500, message: "topic not found by this topic id"})
        }        
        else res.send({status: 400, message: "Invalid topic id"})

    } catch (error) {
        errorHandler(res, error)
    }
}

const getAllDesc_Topic = async(req, res) => {
    try {
        const alldesc = await Desc_Topic.find()
        if(alldesc.length == 0)
            return res.send({status: 500, message: "Empty collection"})
        res.send({status: 200, data: alldesc})        
    } catch (error) {
        errorHandler(res, error)
    }
}

const getDesc_Topic = async(req, res) => {
    try {
        const {id} = req.params
        if(!checkId(id))
        return res.send({status: 500, message: "Invalid id while getting desc_topic"})
        let descTopic = await Desc_Topic.findById(id)
        if(descTopic == null) 
            return res.send({status: 400, message: "not found by this id"})
        res.send({status: 200, data: descTopic})
    } catch (error) {
        errorHandler(res, error)
    }
}

const updateDesc_Topic = async(req, res) => {
    try {
        const {id} = req.params
        const {desc_id, topic_id} = req.body
        if(!checkId(id))
            return res.send({status: 500, message: "Invalid id while updating desc_topic"})
        let update_desctopic = await Desc_Topic.findById(id)
        if(update_desctopic == null)
            return res.send({status: 400, message:"not found desctopic by this id"})
        update_desctopic = await Desc_Topic.findByIdAndUpdate(id, {desc_id, topic_id})            
        res.send({status: 200, data: update_desctopic, message: "updated."})
        } catch (error) {
        errorHandler(res, error)
    }
}
const deleteDesc_Topic = async(req, res) => {
    try {
        const {id} = req.params
        if(!checkId(id))
        return res.send({status: 500, message: "Invalid id while deleting desc_topic"})
        let descTopic = await Desc_Topic.findById(id)
        if(descTopic == null) 
            return res.send({status: 400, message: "not found by this id"})
        descTopic = await Desc_Topic.findByIdAndDelete(id)
            res.send({status: 200, data: descTopic, message: "Deleted!"})
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports = {
    addDesc_Topic,
    getDesc_Topic,
    getAllDesc_Topic,
    updateDesc_Topic,
    deleteDesc_Topic, 

}