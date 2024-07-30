const express = require('express')
const router = express.Router()
const Room = require('../models/Room')

router.post("/createroom", async(req, res)=>{
    const {
        username,
        email,
        phone,
        title,
        rent,
        description,
        rules,
        images,
        preferredTenant,
        bathroomFacility,
        toiletFacility,
        quantity,
        isPG,
        facilities
    } = req.body;

    try {
        await Room.create({
            username,
            email,
            phone,
            title,
            rent,
            description,
            rules,
            images,
            preferredTenant,
            bathroomFacility,
            toiletFacility,
            quantity,
            isPG,
            facilities
        });

        res.status(201).json({ success: true, message: 'Room created successfully' });
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(400).json({ success: false, message: 'Error creating room' });
    }
});

module.exports = router