document.getElementById('about').addEventListener('click', function() {
    window.location.href = '/about';
});
document.getElementById('palestine').addEventListener('click', function() {
    window.location.href = '/palestine';
});
document.getElementById('support').addEventListener('click', function() {
    window.location.href = '/support';
});
document.getElementById('home').addEventListener('click', function() {
    window.location.href = '/';
});
document.getElementById('login').addEventListener('click', function() {
    window.location.href = '/login';
});


// document.getElementById('report').addEventListener('click', function() {
//     window.location.href = '/report';
// });
    // Add a click event listener to the Logout link
document.getElementById("logout-link").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag

    // Perform a POST request using Fetch API
    fetch("/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // You can include data in the body if required
        // body: JSON.stringify({ key: "value" }),
    })
    .then(() => {
        console.log("Logout successful");
        window.location.href = "/";
    })
    
    .catch(error => {
        console.error("Logout failed", error);
    });
});
