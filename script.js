// login add java script

const demoUsername = "admin";
const demoPassword = "admin123";

const form = document.getElementById("loginForm");
form.addEventListener("submit", function(e){
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

if(username === demoUsername && password === demoPassword){
    alert("Login Successfull !");
    window.location.href = "issues.html";
}
else{
    alert("Invalid credentials!");
}
});



