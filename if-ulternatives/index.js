// Ternary operator
function testTernary(age) {
    // syntax:  condition ? trueValue : falseValue
    let value = age === undefined ? 18 : age;
    console.log(value)
}

// Guard operator

function testGuard(age) {
    let value = age || 18
    console.log(value)
}

// Default operator
function testDefault(age) {
    let value = age ?? 18
    console.log(value)
}

// practise test

function getDiscount() {

    let age = document.getElementById("age-val").innerHTML;
    let gender = document.getElementById("gender-val").innerHTML;
    let discount;
    if (age === '' || gender === '') {
        document.getElementById("result").innerHTML = "give proper input";
    } else if (age <= 5) {
        discount = 100;
    } else if (gender === 'female') {
        discount = 50;
    } else if (age <= 8) {
        discount = 50;
    } else if (age >= 65) {
        discount = 30;
    } else {
        discount = 0;
    }
    if (discount) {
        document.getElementById("result").innerHTML = `Your final discount: ${discount}%.`
    }
}


function genderChangeHandler(gender) {
    document.getElementById("gender-val").innerHTML = gender;
}
function ageChangeHandler() {
    document.getElementById("age-val").innerHTML = document.getElementById("person-age").value;
}

