const router = require('express').Router();
const Theatre = require('../models/theatreModel');


router.get('/get-all-theatres', async (_req, res) => {
  try {
    const allTheatres = await Theatre.find().populate('owner');
    res.send({
      success: true,
      message: "Theatres fetched!",
      data: allTheatres
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message
    });
  }
});

router.post('/get-all-theatres-by-owner', async (req, res) => {
  try {
    const allTheatres = await Theatre.find({ owner: req.body.owner });
    res.send({
      success: true,
      message: "Fetched successfully!",
      data: allTheatres
    })
  } catch (err) {
    res.send({
      success: false,
      message: err.message
    })
  }
});

router.post('/add-theatre', async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
      success: true,
      message: "Added!"
    })
  } catch (err) {
    res.send({
      success: false,
      message: err.message
    })
  }
});



router.put('/update-theatre', async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
    res.send({
      success: true,
      message: "Updated!"
    })
  } catch (err) {
    res.send({
      success: false,
      message: err.message
    })
  }
})

router.put('/delete-theatre', async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.body.theatreId);
    res.send({
      success: true,
      message: "Deleted!"
    })
  } catch (err) {
    res.send({
      success: false,
      message: err.message
    })
  }
});

module.exports = router;