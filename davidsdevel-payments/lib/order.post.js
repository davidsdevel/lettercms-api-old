const createOrder = require('./paypal/createOrder');

const item = amount => ({
    "intent" : "CAPTURE",
    "application_context" : {
        "return_url" : 'http://localhost:3009',
        "cancel_url" : 'http://localhost:3009'
    },
    "purchase_units" : [ 
        {
            "amount" : {
                "currency_code" : 'USD',
                "value" : amount
            }
        }
    ]
  })

module.exports = async function() {
  const {req, res} = this;

  const {body: {amount}} = req;

  const order = await createOrder(item(amount));

  res.json(order);
}