const fromEvent = require('graphcool-lib').fromEvent

function getUser(api, userId) {
  return api.request(`
    query {
      User(id: "${userId}"){
        id
        name
        isAdmin
      }
    }`)
    .then(userQueryResult => {
      console.log(userQueryResult)
      return userQueryResult.User
    })
    .catch(error => {
      // Log error but don't expose to caller
      console.log(error)
      return { error: `An unexpected error occured` }
    })
}

module.exports = function authenticatedUser(event) {

  if (!event.context.auth || !event.context.auth.nodeId) {
    return {data: {id: null, name: null, isAdmin: null}}
  }

  const userId = event.context.auth.nodeId
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  return getUser(api, userId)
    .then(User => {
      if (!User) {
        return { error: `No user with id: ${userId}` }
      }
      return { data: User }
    })
    .catch(error => {
      // Log error but don't expose to caller
      console.log(error)
      return { error: `An unexpected error occured` }
    })

}