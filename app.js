function access() {
    const iframe = document.getElementById("iFramed");
    const iframedoc = iframe.contentDocument;


    const username = iframedoc.getElementById('name'),
        mail = iframedoc.getElementById('mail'),
        phone = iframedoc.getElementById('phone'),
        dob = iframedoc.getElementById('dob'),
        submitBtn = iframedoc.getElementById('submitBtn'),
        errorText = document.getElementById('errorMsg'),
        country = iframedoc.getElementById('country');
    let state = "";

    // Time Interval for reading state value for every new country selected
    setInterval(stateFunc, 100);

    function stateFunc() {
        state = iframedoc.getElementById('state');
    }

    // validation for name
    function nameLength() {
        const usernameLength = username.value.length;
        const error = username.value;
        const errReason = "Length should be between 4-10 characters."
        if (usernameLength < 5 || usernameLength > 11) {
            errorShow(error, errReason);
        }
    }

    // validation for date
    function validDob() {
        const error = dob.value;
        const errReason = "Use Valid Date";
        let dateFormat = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

        if (dateFormat.test(error)) {
            return true;
        }
        else {
            console.log(error);
            errorShow(error, errReason);
        }
    }

    // validation for phone
    function phoneLength() {
        const phoneNumLength = phone.value.length;
        const error = phone.value;
        const errReason = "mobile number should be of 10 digits."
        if (phoneNumLength !== 10) {
            errorShow(error, errReason);
        }
    }

    // validation for  mail
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

    // validation for country
    function validCountry() {
        const error = "Country";
        const errReason = "is mandatory fields"
        if (country.value == "") {
            errorShow(error, errReason);
        }
    }

    // validation for state
    function validState() {
        const errReason = "is mandatory fields"
        if (state.value == "") {
            errorText.innerText = `Result: {"State": {"error": "${errReason}"}}`
        }
    }


    // function to show error to user
    function errorShow(errorPlace, errorReason) {
        errorText.innerText = `Result: {"${errorPlace}": {"error": "${errorReason}"}}`
    }

    // function to show success, when all fields are valid
    function allValidField() {
        errorText.innerText = `Result: {"Success": "All fields are valid."}}`
    }

    //  event listener for submit button
    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();
        allValidField();
        nameLength();
        validDob();
        validEmail();
        phoneLength();
        validState();
        validCountry();
    });

}