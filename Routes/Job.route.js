const {Router}=require("express")
const {jobModel}=require("../Models/Job.model")
const jobController=Router()


jobController.get("/", async (req, res) => {
    console.log(req.query)
    const query = req.query
    
      const job = await jobModel.find(query)
    
    res.send(job)
  
  })



  jobController.get("/job/:id", async (req, res) => {
    console.log(req.params.id)
    const id = req.params.id
    try{
  
      const job = await jobModel.findOne({_id:id})
    
    res.send(job)
    }
    catch(err){
      console.log(err)
    }
   
  })


module.exports={jobController}