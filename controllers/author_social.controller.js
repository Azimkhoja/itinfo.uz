const { errorHandler, checkId } = require("../helpers/error_handler")
const Author_Social  = require("../models/Author_social")

const addAuthorSocial = async(req, res) => {
    try {
        const {author_id, social_id, social_link} = req.body
        let insert = await Author_Social({author_id, social_id, social_link}).save()
        res.send({status: 200, message: "Successfully added", data: insert})
    } catch (error) {
        errorHandler(res, error)
    }
}


const getAuthorSocial = async(req, res) => {
    try {
        const {id} = req.params
        if(checkId(id)){
            let isfound = await Author_Social.findById(id)
            if(isfound != null)
                return res.send({status: 200, data: isfound, message: "Here"})
            res.send({status: 500, message: "not found by this id"})
        }
        else res.send({status: 500, message: "Invalid id entered."})
        
    } catch (error) {
        errorHandler(res, error)
    }
}


const getAllAuthorSocial = async(req, res) => {
    try {
        const alldata = await Author_Social.find()
        if(alldata.length == 0)
            return res.send({status: 400, message: "AuthorSocial collection is empty"})
        res.send({status: 200, data: alldata, message: "here you are"})       
    } catch (error) {
        errorHandler(res, error)
    }
}


const updateAuthorSocial = async(req, res) => {
    try {
        
    } catch (error) {
        errorHandler(res, error)
    }
}


const deleteAuthorSocial = async(req, res) => {
    try {
        const {id} = req.params
        if(checkId(id)){
            let find_to_delete = await Author_Social.findById(id)
            if(find_to_delete != null){
                await Author_Social.findByIdAndDelete(id)
                return res.send({status: 200, message:"Deleted"})
            }
            res.send({status: 500, message: "not by this id"})
            }
        else res.send({status: 500, message: "invalid id entered."})
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports = {
    addAuthorSocial,
    getAllAuthorSocial,
    getAuthorSocial,
    updateAuthorSocial,
    deleteAuthorSocial,
}