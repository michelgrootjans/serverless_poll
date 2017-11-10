const resultsList = document.querySelector('dl');

function renderResult(label, value) {
  const labelElement = document.createElement('dt');
  labelElement.appendChild(document.createTextNode(label));
  resultsList.appendChild(labelElement);

  const valueElement = document.createElement('dd');
  valueElement.appendChild(document.createTextNode(value))
  resultsList.appendChild(valueElement);
}

fetch('https://sp7kadttf3.execute-api.eu-west-1.amazonaws.com/dev/votes', {
  mode: 'no-cors'
})
  .then(results => {
    console.log(results);

    renderResult('Yes', 10);
    renderResult('No', 5);

  })
  .catch(error => {
    console.error(error);
  })
