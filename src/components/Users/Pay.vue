<template>
    <div id="Pay">
        <div style="width: 60%;margin: 0 auto">
            <div>stripe demo支付demo</div>
            <form action="http://xxxxxxx/test/stripe/pay.json" method="post" id="payment-form">
            <div class="form-row">
                <label for="card-element">
                Credit or debit card
                </label>
                <div id="card-element" name="token">
                <!-- A Stripe Element will be inserted here. -->
                </div>
                <div style="margin-top: 20px">
                <input placeholder="请输入费用" name="charger"> USD
                </div>
                <!-- Used to display form errors. -->
                <div id="card-errors" role="alert"></div>
            </div>
        
            <button style="margin-top: 20px">Submit Payment</button>
            </form>
        
            <div>
            <div style="margin-top: 40px">测试退款(两个都请输入)</div>
            <input style="margin-top: 20px" placeholder="请输入退款的交易单号" v-model="value">
            <div style="margin-top: 20px">
                <input placeholder="请输入退款金额" v-model="charge">
            </div>
            <div style="margin-top: 20px">
                <button @click="refund">发起退款</button>
            </div>
            </div>  
        </div>
    </div>
</template>

<script>
// Create a Stripe client.
   const stripe = Stripe(process.env.PUB_KEY);
   // Create an instance of Elements.
   var elements = stripe.elements();
 
   // Custom styling can be passed to options when creating an Element.
   // (Note that this demo uses a wider set of styles than the guide below.)
   var style = {
     base: {
       color: '#32325d',
       lineHeight: '18px',
       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
       fontSmoothing: 'antialiased',
       fontSize: '16px',
       '::placeholder': {
         color: '#aab7c4'
       }
     },
     invalid: {
       color: '#fa755a',
       iconColor: '#fa755a'
     }
   };
 
   // Create an instance of the card Element.
   var card = elements.create('card', {style: style});
 
   // Add an instance of the card Element into the `card-element` <div>.
   card.mount('#card-element');
 
   var form = document.getElementById('payment-form');
   form.addEventListener('submit', function(event) {
     event.preventDefault();
 
     stripe.createToken(card).then(function(result) {
       if (result.error) {
         // Inform the customer that there was an error.
         var errorElement = document.getElementById('card-errors');
         errorElement.textContent = result.error.message;
       } else {
         stripeTokenHandler(result.token);
         // Send the token to your server.
       }
     });
   });
 
   function stripeTokenHandler(token) {
     // Insert the token ID into the form so it gets submitted to the server
     var form = document.getElementById('payment-form');
     var hiddenInput = document.createElement('input');
     hiddenInput.setAttribute('type', 'hidden');
     hiddenInput.setAttribute('name', 'stripeToken');
     hiddenInput.setAttribute('value', token.id);
     form.appendChild(hiddenInput);
 
     // Submit the form
     form.submit();
   }
export default {
    name: 'Pay',
    methods: {
        stripeTokenHandler(token) {
            // Insert the token ID into the form so it gets submitted to the server
            var form = document.getElementById('payment-form');
            var hiddenInput = document.createElement('input');
            hiddenInput.setAttribute('type', 'hidden');
            hiddenInput.setAttribute('name', 'stripeToken');
            hiddenInput.setAttribute('value', token.id);
            form.appendChild(hiddenInput);

            // Submit the form
            form.submit();
        }
    },
}
</script>

<style scoped>

</style>
