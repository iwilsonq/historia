const validateToken = authToken => {
  // ... validate token and return a Promise, rejects in case of an error
  return new Promise(resolve => {
    resolve('token is valid')
  })
}

const findUser = authToken => {
  return validateTokenResponse => {
    return new Promise(resolve => {
      resolve({
        id: 'abc123',
        firstName: 'Ian',
        lastName: 'Wilson',
        authToken
      })
    })
  }
}

const subscriptions = {
  onConnect: (connectionParams, webSocket) => {
    if (connectionParams.authToken) {
      return validateToken(connectionParams.authToken)
        .then(findUser(connectionParams.authToken))
        .then(user => {
          return {
            currentUser: user
          }
        })
    }

    throw new Error('Missing auth token!')
  }
}

export default subscriptions
