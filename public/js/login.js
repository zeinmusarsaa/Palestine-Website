let loginClickCount = 0;
const time_to_show_login = 400;
const time_to_hidden_login = 200;
const time_to_show_sign_up = 100;
const time_to_hidden_sign_up = 400;
const time_to_hidden_all = 500;


function change_to_login() {
 const contForms = document.querySelector('.cont_forms');
 const formLogin = document.querySelector('.cont_form_login');
 const formSignUp = document.querySelector('.cont_form_sign_up');


 if (loginClickCount === 0) {
   contForms.classList.add('cont_forms_active_login');
   formLogin.style.display = "block";
   formSignUp.style.opacity = "0";


   setTimeout(function () {
     formLogin.style.opacity = "1";
   }, time_to_show_login);


   setTimeout(function () {
     formSignUp.style.display = "none";
   }, time_to_hidden_login);


   loginClickCount++;
 } else {
   // Redirect to landing.html after the second login
   window.location.href = "index.html";
 }
}


function change_to_sign_up() {
 const contForms = document.querySelector('.cont_forms');
 const formLogin = document.querySelector('.cont_form_login');
 const formSignUp = document.querySelector('.cont_form_sign_up');


 contForms.classList.add('cont_forms_active_sign_up');
 formSignUp.style.display = "block";
 formLogin.style.opacity = "0";


 setTimeout(function () {
   formSignUp.style.opacity = "1";
 }, time_to_show_sign_up);


 setTimeout(function () {
   formLogin.style.display = "none";
 }, time_to_hidden_sign_up);


 loginClickCount = 0; // Reset click count when switching to sign-up
}


function hidden_login_and_sign_up() {
 const contForms = document.querySelector('.cont_forms');
 const formSignUp = document.querySelector('.cont_form_sign_up');
 const formLogin = document.querySelector('.cont_form_login');


 contForms.classList.remove('cont_forms_active_login', 'cont_forms_active_sign_up');
 formSignUp.style.opacity = "0";
 formLogin.style.opacity = "0";


 setTimeout(function () {
   formSignUp.style.display = "none";
   formLogin.style.display = "none";
 }, time_to_hidden_all);


 loginClickCount = 0; // Reset click count when hiding forms
}


// Add this function to handle the login logic
function handleLogin() {
 // Add your authentication logic here
 const email = document.querySelector('.cont_form_login input[type="text"]').value;
 const password = document.querySelector('.cont_form_login input[type="password"]').value;


 // For demonstration purposes, let's assume the login is successful if the email and password are not empty
 if (email && password) {
   // Redirect to landing.html
   window.location.href = "index.html";
 } else {
   // You can display an error message or handle unsuccessful login in other ways
   console.log("Invalid credentials");
 }
}


// Attach the handleLogin function to the login button click event
document.querySelector('.cont_form_login .btn_login').addEventListener('click', handleLogin);


// Add this function to handle the signup logic
function handleSignUp() {
 // Add your authentication logic here
 const email = document.querySelector('.cont_form_sign_up input[type="text"]').value;
 const password = document.querySelector('.cont_form_sign_up input[type="password"]').value;
 const userName = document.getElementById('username').value;
 const confirmPassword = document.querySelector('.cont_form_sign_up input[placeholder="Confirm Password"]').value;


 // For demonstration purposes, let's assume the signup is successful if all fields are not empty
 if (email && password && userName && confirmPassword) {
   // Redirect to landing.html
   window.location.href = "index.html";
 } else {
   // You can display an error message or handle unsuccessful signup in other ways
   console.log("Invalid credentials");
 }
}


// Attach the handleSignUp function to the signup button click event
document.querySelector('.cont_form_sign_up .btn_sign_up').addEventListener('click', handleSignUp);