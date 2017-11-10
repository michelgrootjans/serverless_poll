document
  .querySelectorAll('button')
  .forEach(button => {
    button.addEventListener('click', event => {
      const value = event.target.value;

      const requestOptions = {
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify({
          name: 'Mr. Voter',
          vote: value
        })
      };

      fetch('https://sp7kadttf3.execute-api.eu-west-1.amazonaws.com/dev/votes', requestOptions)
        .then(() => {
          window.location = 'results.html'
        })
    });
  });
