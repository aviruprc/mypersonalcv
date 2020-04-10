const form = document.getElementById('contactform');

form.addEventListener('submit', e => {

  e.preventDefault();

  const name = document.getElementById('name').value;
  const subject = document.getElementById('subject').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  fetch(' https://jo6dhyi82i.execute-api.ap-south-1.amazonaws.com/first/', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    method: 'POST',
    body: JSON.stringify({
        name: name,
        subject:subject,
        email: email,
        message: message
    })

  }).then(() => {
    form.reset();
    alert('Thank you for Contacting');
  });
});