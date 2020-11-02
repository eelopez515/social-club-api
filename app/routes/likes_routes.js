// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const User = require('../models/user')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /examples
router.get('/likes', requireToken, (req, res, next) => {
  const owner = req.user._id
  User.find(owner)
    .then(likes => {
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return likes.map(like => like.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(likes => res.status(200).json({ user: likes }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /examples
router.post('/likes', requireToken, (req, res, next) => {
  // set owner of new example to be current user
  console.log(req)
  req.body.owner = req.user.id
  const likeData = req.body
  const ownerId = req.body.owner
  console.log(likeData)

  User.findById(ownerId)
    .then(handle404)
    .then(user => {
      user.likes.push({
        name: likeData.likes.name,
        bio: likeData.likes.bio,
        image: likeData.likes.image,
        zipcode: likeData.likes.zipcode,
        gender: likeData.likes.gender,
        isLiked: likeData.likes.isLiked,
        owner: ownerId
      })
      return user.save()
    })
    .then(user => res.status(201).json({ user }))
    .catch(next)
})
// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/likes/:id', requireToken, (req, res, next) => {
  const likeId = req.params.id
  console.log('this is likes, ', req.user.likes)
  console.log('this is likeId ', likeId)
  User.findOne({ 'likes._id': likeId })
    .then(handle404)
    .then(user => {
      user.likes.id(likeId).remove()
      return user.save()
    })
    // send back 204 and no content if the deletion succeeded
    .then(user => res.status(200).json({ user }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
