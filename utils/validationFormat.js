const joiErrorFormatter = (rawerrors)=>{
    const errors={}
    const details= rawerrors.details
    details.map(d=>{
        errors[d.path]= [d.message]
    })
    return errors
}

const mongooseErrorFormater=(rawerrors)=>{
    const errors= {}
    const details=rawerrors.errors
    for(const key in details){
        errors[key]=details[key].message
    }
    return errors

}
module.exports = {joiErrorFormatter,mongooseErrorFormater}