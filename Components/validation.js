function validatePassword(){
    
    let password = document.getElementById("password");
    let confirm_password = document.getElementById("confirm_password");

    if(password.value.length < 8) {
        confirm_password.setCustomValidity("Passowrd must be 8 characters or more!")
    }
    else if(password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
