const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

router.get("/getrooms", async(req,res)=>{
    try{
        Room.find()
            .then((allRooms) => {
                res.status(200)
                    .json({
                        success:true,
                        allRooms
                    })
            })
            .catch((err) =>{
                res.status(400)
                    .json({
                        success:false,
                        message:"Can't find",
                        err
                    })
            })
    }catch(err){
        res.status(500)
            .json({
                success:false,
                message:"Internal Server Error",
                error: err.message
            })
    }
});

module.exports = router;