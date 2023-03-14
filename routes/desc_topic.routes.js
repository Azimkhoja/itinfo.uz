const {Router} = require('express')
const router = Router()
const {
    addDesc_Topic,
    getDesc_Topic,
    getAllDesc_Topic,
    updateDesc_Topic,
    deleteDesc_Topic
} = require('../controllers/desc_topic')


router.post('/add', adminPolice,addDesc_Topic )
router.get('/all', getAllDesc_Topic)
router.get('/:id', getDesc_Topic)
router.put('/update',adminPolice, updateDesc_Topic)
router.delete('/del/:id',adminPolice, deleteDesc_Topic)

module.exports = router