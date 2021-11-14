var iframedoc = document.getElementById('iFramed').contentWindow.document;
// console.log(iframedoc);


// All Elements from HTML Doc
const username = iframedoc.getElementById('name'),
    mail = iframedoc.getElementById('mail'),
    phone = iframedoc.getElementById('phone'),
    submitBtn = iframedoc.getElementById('submitBtn'),
    errorText = document.getElementById('errorMsg'),
    country = iframedoc.getElementById('country'),
    stateDiv = iframedoc.getElementById('stateDiv'),
    form = iframedoc.getElementsByTagName('form');
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
// submitBtn.addEventListener('click', function (event) {
    // event.preventDefault();
//     allValidField();
//     nameLength();
//     validEmail();
//     phoneLength();
//     validState();
//     validCountry();
// });

// API Fetching for countries and there state
fetch('https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json')
    .then(response => response.json())
    .then(country_list => {
        let i = 0;
        for (; i < country_list.length; i++) {
            const options = document.createElement("option");
            options.innerText = country_list[i].name;
            options.setAttribute("value", `${country_list[i].code3}`)
            country.appendChild(options);

        }

    })
    .catch(error => console.error(error));


function selectCountry() {

    stateDiv.removeChild(stateDiv.lastChild);

    fetch('https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json')
        .then(response => response.json())
        .then(country_list => {
            let i = 0;
            let y = 0;

            let select = `<label for="state">State</label><br>
                          <select class="formInput" id="state">
                              <option value='' selected="selected"> -- Select Country First -- </option>
                          </select>`

            stateDiv.innerHTML = select;

            for (; i < country_list.length; i++) {

                if (country.value == country_list[i].code3) {

                    const statesList = country_list[i].states;

                    for (; y < statesList.length; y++) {
                        let options = document.createElement("option");
                        options.innerText = statesList[y].name;
                        options.setAttribute("value", `${statesList[y].code}`)
                        stateDiv.lastChild.appendChild(options);
                    }

                }


            }

        })
        .catch(error => console.error(error));
}