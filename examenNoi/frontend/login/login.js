async function login() {
    var username =document.getElementById("username").value;
  
    console.log(username);
    var response = await fetch("../../../examenNoi/backend/login.php?username=" + username);
   
    if (response.status == 200) {
        document.cookie = "username=" + username + "; path=/";
         window.location.replace("../user/mainPage.html");
    }
    else {
        alert("login failed!");
    }
}
