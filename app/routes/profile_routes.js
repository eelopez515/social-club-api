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

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

router.patch('/update-profile', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  console.log('REQ BODY ', req.body)
  console.log('REQ USER ', req.user)
  const updatedUser = req.body
  const userId = req.user.id
  User.findById(userId)
    .then(handle404)
    .then(user => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      // pass the result of Mongoose's `.update` to the next `.then`
      return user.updateOne(updatedUser)
    })
    // .then(user => console.log('THIS IS WHAT YOU WANT!!!! ', user))
    // if that succeeded, return 204 and no JSON
    .then(user => res.status(200).json({ user }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
