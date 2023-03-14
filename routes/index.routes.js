const { Router } = require("express");
const router = Router();
const dictionaryRouter = require("./dictioanry.routes");
const descrtiptionRouter = require("./description.routes");
const categoryRouter = require("./category.routes");
const authorRouter = require('../routes/author.routes')  // author.routes faylidagi zaproslarni yonaltiradi
const socialRouter = require('./social.routes')
const AuthorSocialRouter = require('./author_social.routes')
const topicRouter = require('./topic.routes')
const tagRouter = require('./tag.routes')
const adminRouter = require('./admin.routes')
const userRouter = require('./user.routes')
const responses = require('./responses.routes')
const path = require('path')

const createViewPath = (page) =>{
    return path.resolve(__dirname, "../views", `${page}.hbs`)
}
router.use(responses)
router.get('/', (req, res) => {
    console.log(req);
    res.render(createViewPath("index"), {title: "Asosiy", page_name: "home"})
})
router.use("/api/dictionary", dictionaryRouter);
router.use("/api/category", categoryRouter);
router.use("/api/description", descrtiptionRouter);
router.use('/api/author', authorRouter)
router.use('/api/social', socialRouter)
router.use('/api/author_social', AuthorSocialRouter)
router.use('/api/topic', topicRouter)
router.use('/api/tag', tagRouter)
router.use('/api/admin', adminRouter)
router.use('/api/user', userRouter)

module.exports = router;
