const {Router}=require("express")
const {jobModel}=require("../Models/Job.model")
const jobController=Router()


jobController.get("/", async (req, res) => {

    try{

      // let match={};
      // if(req.query.keyword){
      //   match.$and=[{category:new RegExp(req.query.keyword,"i")},
      //              {title:new RegExp(req.query.keyword,"i")}    
      // ]
      // }

      // if(req.query.year){
      //   match.year=parseInt(req.query.year)
      // }

      // const job=await jobModel.aggregate([{$match:match}])
      //  res.send(job)

      const query = req.query
      const job = await jobModel.find(query)
       res.send(job)
    }

    catch(err){
      res.send({msg:"Something went wrong"})
      console.log(err)
    } 
  })



  jobController.get("/:id", async (req, res) => {
    const id = req.params.id
    try{
      const job = await jobModel.findOne({_id:id})
    
    res.send(job)
    }
    catch(err){
      console.log(err)
    }
   
  })


  jobController.delete("/:id",async(req,res)=>{
    const id= req.params.id ;
    console.log(id)
    try{
      await jobModel.deleteOne({_id:id})
     res.send({msg:"Job deleted successfully"}) 
    }
    catch(err){
      console.log(err)
    }
  })

module.exports={jobController}