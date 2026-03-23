//1.Helper Functions

//selecting all indicator numbers and their headings

const indicator = document.querySelectorAll(".num1, .num2, .num3 ");
// functions to active a indicator numbers

function activateIndicator(stepNumber) {
    indicator.forEach((indicator, index) => {
        if (index === stepNumber - 1) {
            indicator.classList.add('active');
        }
    });
}


//activating the indicators headings
function activateHeading(stepNumber) {
    document.querySelectorAll(".guide1 h4, .guide2 h4, .guide3 h4").forEach((Heading, index) => {
        if (index === stepNumber - 1) {
            Heading.classList.add('active');
        }
        else {
            Heading.classList.remove('active');
        }

    });
}


// function to show a specific step and hide others

function showStep(stepCLass) {
    // selecting all steps with class .step1, .step2, .step3
    document.querySelectorAll('.step1, .step2, .step3').forEach(step => {
        step.style.display = 'none' //hide all step
    });
    document.querySelector('.' + stepCLass).style.display = 'block';//this shows the chosen or selected form
}

//

//function to validate email format

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test (email)
}

//2. event listener + forgot password logic
//STEP 1: user enters email and clicks 'send reset code'

const emailInput = document.getElementById('email');
const submitBtn = document.getElementsByClassName('step1-btn')[0];

submitBtn.addEventListener('click', () => {
    const emailValue = emailInput.value;

    //validation

    if (!validateEmail(emailValue)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    // if valid, continue to next step
    nextStep(2);


});

















