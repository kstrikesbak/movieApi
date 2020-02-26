const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');


router.get('/', (req, res) => {
  Movie.find({})
  .then((movies) => {
      return res.status(200).json(movies);
      // return res.render('index', {movies, title: 'movies'})
  })
  .catch(err => res.status(500).json({message: 'Server Error', err}));
});

router.get('/addmovie', (req, res) => {
  return res.render('addMovie', {title:'add a movie!'});
});

router.get('/findmovie/:title', (req, res)=> {
  Movie.findOne({title:req.params.title})
  .then((movie) => {
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(200).json({message: 'Movie does not exist'})
    }
  })
  .catch(err => res.status(500).json({message: 'Server Error', err}));
})


router.post('/addmovie', (req, res) => {
  if(!req.body.title || !req.body.rating || !req.body.synopsis || !req.body.release_year || !req.body.genre ) {
    return res.status(400).json({message: 'All inputs must be filled'});
}
  Movie.findOne({title:req.body.title})

  .then((movie) => {
    if(movie) {
        return res
        .status(500)
        .json({message:'Movie is already in our database'});
    }

    const newMovie = new Movie();
    newMovie.title = req.body.title;
    newMovie.rating = req.body.rating;
    newMovie.synopsis = req.body.synopsis;
    newMovie.release_year = req.body.release_year;
    newMovie.genre = req.body.genre;

    newMovie.save()
    .then((movie) => {
      return res.status(200).json({message: 'Movie added', movie: movie.title});
    }).catch(err => {
      res.status(500).json({message: 'Movie was not added', err});
    })

}).catch(err => {
  return res.status(500).json({message:'Server Error', err});
});
});

router.put('/updatemovie/:title', (req, res) => {
  Movie.findOne({title:req.params.title})
  .then((movie) => {
    if (movie) {
      movie.rating = req.body.rating ? req.body.rating : movie.rating;
      movie.synopsis = req.body.synopsis ? req.body.synopsis : movie.synopsis;
      movie.release_year = req.body.release_year ? req.body.release_year : movie.release_year;
      movie.genre = req.body.genre ? req.body.genre : movie.genre;
      movie.save()
      .then(updated => {
        return res.status(200).json({message: 'Movie updated', updated })
      }).catch(err => res.status(500).json({message: 'Movie was not updated', err}))
    } else {
      return res.status(200).json({message: 'This movie is not in our database'});
    }
  }).catch(err => res.status(500).json({message: 'Server Error', err}));
});


router.delete('/deletemovie/:title', (req, res) => {
  Movie.findOneAndDelete({title:req.params.title})
  .then((deleted) => {
    if (deleted) {
      return res.status(200).json({message:'Movie removed from database', deleted});
    } else {
      return res.status(200).json({message: 'No such movie exists'})
    }
  })
  .catch(err => res.status(400).json({message: 'Movie not deleted', err}));
});

module.exports = router;
