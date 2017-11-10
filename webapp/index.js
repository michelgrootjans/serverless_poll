

const buttons = document.querySelectorAll('button')
console.log('buttons: ', buttons);

buttons.forEach(button => {
  button.addEventListener('click', event => {
    const value = event.target.value;

    // fetch('https://sp7kadttf3.execute-api.eu-west-1.amazonaws.com/dev/votes', {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'POST',
    //   body: JSON.stringify({ value })
    // })
  });
})



// GET https://sp7kadttf3.execute-api.eu-west-1.amazonaws.com/dev/votes