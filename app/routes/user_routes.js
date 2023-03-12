const Sanitize = require('../../classes/sanitize')

module.exports = function(app, db) {
  const sanitize = new Sanitize.Sanitize()

  /* Get all users from the database */
  app.get('/users', (req, res) => {
    const _database = {table: "users", fields: '*', values: ''}
    db.read({table: _database.table, field: _database.fields, callback: res})
  })

  /* Get a user from the database */
  app.get('/user/:id', (req, res) => {
    const _database = {table: "users", fields: 'id', values: ''}
    _database.values += sanitize.default(req.params.id, Sanitize.input_case.input)
    db.read({table: _database.table, field: _database.fields, values: _database.values, callback: res})
  })

  /**
   * Insert an entry to the database
   */
  app.post('/user/add', (req, res) => {
    const _database = {table: "users", fields: '', values: ''}

    // Sanitize each input
    for (const field in req.query) {
      /* TODO Deal with different input cases (input, textarea)
      if(req.query.case === input ) 
      if(req.query.case === textarea ) 
      if(req.query.case === search ) 
      */
      _database.values += sanitize.input(req.query[field], Sanitize.input_case.input) + ','
      _database.fields += sanitize.input(field, Sanitize.input_case.input) + ','
      console.log(_database.values)
      console.log(_database.fields)
    }

    _database.values = _database.values.slice(0, -1)  // Remove last comma
    _database.fields = _database.fields.slice(0, -1)  // Remove last comma

    /* TODO: Check if user exists and abort if true
    try {
      let res = db.read(_database.table, '_database.elements', '_database.values')  // TODO: Expand read method
      if (res == 1) {
        console.error('user already exist')
      }
    } catch(err) { console.log('something went wrong')} 
    */
    
    db.write({table: _database.table, values: _database.values, callback: res})
  })
}

/*
  const collection = app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title }
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' })
      } else {
        res.send(result.ops[0])
      }
    })
  })
*/