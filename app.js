const username = document.getElementById('name');
const mail = document.getElementById('mail');
const phone = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');
const errorText = document.getElementById('errorMsg');


function nameLength() {
    const usernameLength = username.value.length;
    const error = username.value;
    const errReason = "Length should be between 4-10 characters."
    if (usernameLength < 5 || usernameLength > 11) {
        errorShow(error, errReason);
    }
}

function phoneLength() {
    const phoneNumLength = phone.value.length;
    const error = phone.value;
    const errReason = "mobile number should be of 10 digits."
    if (phoneNumLength !== 10) {
        errorShow(error, errReason);
    }
}

function validEmail() {
    const error = mail.value;
    const errReason = "should only support valid email address."
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (error.match(mailformat)) {
        return true;
    } else {
        errorShow(error, errReason);
    }
}

function allValidField() {
    errorText.innerText = `Result: {"Success": "All fields are valid."}}`
}


submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    allValidField();
    nameLength();
    validEmail();
    phoneLength();
});

function errorShow(errorPlace, errorReason) {
    errorText.innerText = `Result: {"${errorPlace}": {"error":" "${errorReason}"}}`
}