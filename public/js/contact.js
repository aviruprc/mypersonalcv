const form = document.getElementById('contactform');

form.addEventListener('submit', e => {

  e.preventDefault();

  const Title = document.getElementById('name').value;
  const Description = document.getElementById('subject').value;
  const Rating = document.getElementById('email').value;
  const Cast = document.getElementById('message').value;

  fetch('https://dnwtkf3wzi.execute-api.ap-south-1.amazonaws.com/default', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    method: 'POST',
    body: JSON.stringify({
        name: name,
        subject:subject,
        content: email,
        email: message
    })

  }).then(() => {
    form.reset();
    alert('Thank you for Contacting');
  });
});