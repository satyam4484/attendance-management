
async function deleteOrganizationCascades(org,next) {
    try{
        console.log("inside organization middleware");
        // this need to be implemented
    }catch(error) {
        next(error);
    }
}

module.exports= {
    deleteOrganizationCascades
}