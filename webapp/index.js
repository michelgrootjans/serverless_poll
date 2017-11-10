function submitVote(name, vote) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ name, vote })
  };

  fetch('https://dsvvyynae1.execute-api.eu-west-1.amazonaws.com/dev/votes', requestOptions)
    .then(() => {
      window.location = 'results.html'
    })
}
document
  .querySelectorAll('button')
  .forEach(button => {
    button.addEventListener('click', event => {
      submitVote('Miss. Vote', event.target.value);
    });
  });
