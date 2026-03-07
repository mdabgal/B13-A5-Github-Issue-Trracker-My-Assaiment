

const demoUsername = "admin";
const demoPassword = "admin123";

const form = document.getElementById("loginForm");
form.addEventListener("submit", function(e){
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

if(username === demoUsername && password === demoPassword){
    alert("Login Successfull !");
}
else{
    alert("Invalid credentials!");
}
});