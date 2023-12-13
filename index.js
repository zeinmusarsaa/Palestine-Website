const express = require("express");
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const session = require('express-session');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.json());

// Set the view engine to use EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.RDS_HOSTNAME || 'localhost',
        user: process.env.RDS_USERNAME || 'postgres',
        password: process.env.RDS_PASSWORD || 'hi from11',
        database: process.env.RDS_DB_NAME || 'ebdbLocal',
        port: process.env.RDS_PORT || 5432,
        ssl: process.env.DB_SSL ? {rejectUnauthorized: false} : false
    }
})

// Define your routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/palestine', (req, res) => {
  res.render('palestine');
});

app.get('/support', (req, res) => {
  res.render('support');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/report', (req, res) => {
  res.render('report');
})

app.get('/seeRequests', (req, res) => {
  res.render('seeRequests');
})

//Edit a help request
app.get('/editReq/:id', (req, res) => {
  let loggedIn = req.session.loggedIn || 'false';
  let edit = 'true';
  let formId = req.params.formId;
  knex.select('formId', 'firstName', 'lastName', 'city', 'phone', 'aidType').from('requests').where('formId', formId).then(form => {
    res.render('editReq', {request : form /*, loggedIn: loggedIn, edit: edit */});
  }).catch(err => {
    console.log(err);
    res.status(500).json({err});
  });
});

//Save edits to help request
app.post('/saveEdits/:id', (req, res) => {
  
}) 

//Delete a help request
app.post('/deleteReq/:id', (req, res) => {
  knex('requests').where('formId', req.params.formId).del().then(requests => {
    res.redirect('/seeRequests');
  }).catch(err => {
    console.log(err);
    res.status(500).json({err});
  });
});

app.get('/login', (req, res) => {
  res.render('login', { loggedIn: req.session.loggedIn || 'false' });
});

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  knex.select('password').from('Users').where('username', username).then( results => {
      if (results.length > 0)
      {
        if (password === results[0].password)
        {
            req.session.loggedIn = 'true';
            res.redirect('/');
        }
        else
        {
            req.session.loggedIn = 'password';
            res.redirect('/login');
        }
      }
      else 
      {
          req.session.loggedIn = 'username';
          res.redirect('/login');
      }
  }).catch(err => {
      console.log(err);
      res.status(500).json({err});
  });
})

app.post('/enter', (req, res) => {
  knex('Users').insert(req.body).then( users => {
      res.redirect('/report');
  })
});

app.post('/logout', (req, res) => {
  req.session.loggedIn = 'false';
  req.session.edit = 'false';
  res.redirect('/')
})


// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('404');
});

// Start the server
app.listen(port, () => console.log("Server is listening on port", port));
