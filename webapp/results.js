const resultsList = document.querySelector('dl');

function renderResult(label, value) {
  const labelElement = document.createElement('dt');
  labelElement.appendChild(document.createTextNode(label));
  resultsList.appendChild(labelElement);

  const valueElement = document.createElement('dd');
  valueElement.appendChild(document.createTextNode(value))
  resultsList.appendChild(valueElement);
}

fetch('https://dsvvyynae1.execute-api.eu-west-1.amazonaws.com/dev/votes')
  .then(response => response.json())
  .then(response => {
    Object
      .keys(response.votes)
      .forEach(key => {
        renderResult(key, response.votes[key])
      })
  })
  .catch(error => {
    console.error(error);
  });
