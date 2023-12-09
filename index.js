const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Set the view engine to use EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'views', 'images')));
app.use(express.static(path.join(__dirname, 'views', 'css')));
app.use(express.static(path.join(__dirname, 'views', 'js')));

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

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('404');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
