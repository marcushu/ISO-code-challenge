const nameInput = document.getElementById('namInput');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');
const industryInput = document.getElementById('industryInput');
const form = document.getElementById('subscriberForm');

const handleSubmit = evt => {
    evt.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": nameInput.value,
        "email": emailInput.value,
        "phone": phoneInput.value,
        "company": industryInput.value
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/subscriber", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.success) form.reset();

            let message = result.success ? "Form successfully submitted." : result.formatError

            alert(message);
        })
        .catch(error => console.log('error', error));
}

form.addEventListener('submit', handleSubmit);