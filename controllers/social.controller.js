const { errorHandler, checkId } = require('../helpers/error_handler')
const Social = require('../models/Social')

const addSocial = async(req, res) => {
    try {
        const {social_name, social_icon_file} = req.body 
        let newSocial = await Social({social_name, social_icon_file}).save()
        res.send({status: 200, message: "Social media added"})      
    } catch (error) {
        errorHandler(res, error)
    }
}

const getSocial = async(req, res) => {
    try {
        const { id} = req.params
        if(checkId(id)){
            let one_fromsocial = await Social.findById(id)
            if(one_fromsocial != null)
                return res.send({status: 200, message: "found", data: one_fromsocial})
            res.send({status: 500, message: "no social found"})
        }
        else res.send({status: 400, message: "Invalid id entered"})
    } catch (error) {
        errorHandler(res, error)
    }
}

const getAllSocial = async(req, res) => {
    try {
        const all_social = await Social.find()
        if(all_social.length == 0) 
            return res.send({status: 500, message: "social media collection is empty in database"})
        else res.send({status: 200, message: "Found", data: all_social})
    } catch (error) {
        errorHandler(res, error)
    }
}

const updateSocial = async(req, res) => {
    try {
        const {id} = req.params
        const {social_name, social_icon_file} = req.body
        if(checkId(id)){
            let update = await Social.findById(id)
            if(update != null)
                res.send({status: 200, message: "updated", data: await Social.findByIdAndUpdate(id, { social_name, social_icon_file})})
            else res.send({status: 500, message: "not found by this is"})
        }
        else res.send({status: 500, message: "Invalid id entered."})

    } catch (error) {
        errorHandler(res, error)
    }
}

const deleteSocial = async(req, res) => {
    try {
        const {id} = req.params
        if(checkId(id)){
            let find_to_delete = await Social.findById(id)
            if(find_to_delete != null) 
                res.send({status: 200, data: await Social.findByIdAndDelete(id),  message: "deleted"})
            else res.send({status: 500, message: "not found"})
        }
        else res.send({status: 500, message:"Invalid id entered"})
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports = {
    addSocial,
    getSocial, 
    getAllSocial, 
    updateSocial,
     deleteSocial,
}