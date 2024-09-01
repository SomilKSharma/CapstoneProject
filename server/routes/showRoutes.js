const router = require('express').Router();
const Show = require('../models/showModel');



router.post('/get-all-shows-by-theatre', async (req, res) => {
  try {
    const shows = await Show.find({ theatre: req.body.theatreId }).populate('movie')
    res.send({
      success: true,
      message: "Fetched",
      data: shows
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message
    })
  }
});

router.post('/add-show', async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: 'Added!'
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message
    })
  }
});

router.put("/update-show", async (req, res) => {
  try {

    await Show.findByIdAndUpdate(req.body.showId, req.body);

    await Show.findById(req.body.showId);
    res.send({
      success: true,
      message: 'Updated!'
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message
    })
  }
})

router.post('/get-show-by-id', async (req, res) => {
  try {
    const show = await Show.findById(req.body.showId).populate('movie').populate('theatre');
    res.send({
      success: true,
      message: 'Fetched!',
      data: show
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message
    })
  }
});

router.post('/get-all-theatres-by-movie', async (req, res) => {
  try {
    const { movie, date } = req.body
    const shows = await Show.find({ movie, date }).populate('theatre');
    let uniqueTheatres = [];
    shows.forEach(show => {
      let isTheatre = uniqueTheatres.find(theatre => theatre._id === show.theatre._id);
      if (!isTheatre) {
        let showsOfThisTheatre = shows.filter(showObj => showObj.theatre._id == show.theatre._id);
        uniqueTheatres.push({ ...show.theatre._doc, shows: showsOfThisTheatre });
      }
    });
    res.send({
      success: true,
      message: 'Shows by theatre',
      data: uniqueTheatres
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message
    })
  }
});



module.exports = router;