function handleRouteError(err, res) {
  console.log(err);

  if (err.code === 11000) {
    // Duplicate entry error
    return res.json({
      error: 403,
      message: 'A user already exists with that email address'
    });
  }

  let messages = [];

  for (let prop in err.errors) {
    messages.push(err.errors[prop].message);
  }

  res.json({
    error: 403,
    messages
  });
}

module.exports = {
  handleRouteError
}