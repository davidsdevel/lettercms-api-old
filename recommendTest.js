
let trainingData = [
  {
    input: {
      title: 'Marketing Diseño',
      tags: [
        'marketing',
        'diseño'
      ],
      category: 'marketing',
    },
    output: {
      wanted: 0
    },
  },
];

let ratingItem;

      function nextTry(rating) {
        document.getElementById('result').innerHTML = '';

        if (undefined !== ratingItem) {
          trainingData.push({
            input: ratingItem.trainingInformation,
            output: { wanted: rating / 4 },
          });
        }

        const network = new brain.NeuralNetwork({
          activation: 'sigmoid',
          hiddenLayers: [4],
        });
        network.train(trainingData);

        let suggestionItemsText = '';
        let suggestionItems = [];
        for (let i = 0; i < itemsInStock.length; i++) {
          let item = itemsInStock[i];
          item.wanted = network.run(item.trainingInformation).wanted;
          suggestionItems.push(item);
        }

        suggestionItems.sort((a, b) => b.wanted - a.wanted);

        for (let i = 0; i < suggestionItems.length; i++) {
          const suggestionItem = suggestionItems[i];
          const suggestionPercentage = Math.round(suggestionItem.wanted * 100);
          suggestionItemsText += `
            <div class="suggestion__item">
              ${getFormattedItem(suggestionItem)}
              <br/>
              wanted: ${suggestionPercentage}%
            </div>
          `;
        }

        ratingItem = itemsInStock[Math.floor(Math.random() * itemsInStock.length - 1 + 1)];

        document.getElementById('result').innerHTML +=
          `<div class="rating__item">
            Rate this<br/>
            ${getFormattedItem(ratingItem)}
          </div>
          Suggested items<br/>
          <div class="suggested__items">
            ${suggestionItemsText}
          </div>
          `;
      }

      function getNormalizedItemFromStock(index) {
        const item = itemsInStock[index];
        const trainingInformation = item.trainingInformation;
        return {
          trainingInformation: {
            title: trainingInformation.color,
            category: trainingInformation.category,
            tags:trainingData
          },
          displayingInformation: item.displayingInformation,
        };
      }

      function getFormattedItem({trainingInformation}) {

        return `title: ${trainingInformation.title}<br/>
          category: ${trainingInformation.category}<br/>
          tags: <ul>${trainingInformation.tags.map(e => `<li>${e}</li>`)}</ul><br/>`;
      }
