const Validators = require('../validations')

module.exports = function (validator) {
    console.log(Validators.hasOwnProperty(validator));
    if(!Validators.hasOwnProperty(validator))
    throw new Error(`${validator} validator is not exists `)
}
return async function(req, res, next){
    try {
        const validated = await Validators[validator].validateAsync(req.body)
        req.body = validated
        next()
    } catch (err) {
        console.log(err.isJoi);
        if(err.isJoi){
            return res.error(400, {
                message: err.message,
                friedlyMsg: "Validation error",
            })
        }       
        return res.error(500, {
            friedlyMsg: "Internal error",
        })
        // next()
    }
}
