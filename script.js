var validuserName = "abcd";
var validPassword ="1234";
function checkValidInput(){
    let inputUserName = document.getElementById("userName").value;
    let inputPassword = document.getElementById("password").value;
    if(inputUserName != validuserName){
        document.getElementById("userNameError").innerHTML="Please enter a valid user name";
    }
    else{
        document.getElementById("userNameError").innerHTML="";
    }
    if(inputPassword != validPassword){
        document.getElementById("passwordError").innerHTML="Please enter a valid password";
    }
    else{
        document.getElementById("passwordError").innerHTML="";
    }
    if(inputPassword==validPassword && inputUserName==validuserName){
        location.assign("2ndpage.html")
    }
}

// var input = document.getElementsById("userName");
// input.addEventListener("keydown", function (e) {
//     if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
//         checkValidInput();
//     }
// });

// var input = document.getElementById("input");
// input.addEventListener("keyup", function(event) {
//   if (event.key === "Enter") {
//    event.preventDefault();
//    document.getElementById("enter").click();
//   }
// });