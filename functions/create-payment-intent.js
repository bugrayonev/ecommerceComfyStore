


// domain/.netlify/functions/create-payment-intent
require('dotenv').config()  

// şu anda functions klasöründe yaptığımız işlemler Node.js ile alakalı. yani React ın bir parçası değil ve .env deki kodlara ulaşabilmek için "dotenv" gerekli

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)


exports.handler = async function (event, context) {
  if (event.body) {

    const { cart, shipping_fee, total_amount } = JSON.parse(event.body)

// normalde calculateOrderAmount içinde cart dan tekrar total amount ı hesaplamak daha garanti olabilir.Ama hoca bu adımı atladı.
   const calculateOrderAmount = () => {
      return shipping_fee + total_amount
    }

    try {

       
      const paymentIntent = await stripe.paymentIntents.create({ // toplam miktarı stripe a göndericez
        amount: calculateOrderAmount(), /// formatPrice yapmadan gönderiyoruz (stripe kendi içinde yapıyor)
        currency: 'usd',
      })
      return {  // StripeCheckout.js ye bunu gönderiyoruz
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      }
    }
  }
  return {
    statusCode: 200,
    body: 'Create Payment Intent',
  }
}

















