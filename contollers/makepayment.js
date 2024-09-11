const stripe = require('stripe')('sk_test_51PrikhRwlDxN8ptpknrQ9D8oTEsnKUoB04ogr6x0RCemDrerBmo0N6kePE62ijXFGbFyTqS6qtERsJ98RuDK253r00hOACF6Io'); // your secret key

async function makepayment(req, res){
    try {
        console.log("req.body : ",req.body);
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: "Watch Store",   
                        },
                        unit_amount: req.query.total,
                    },
                    quantity: 1 // Add quantity if needed
                }
            ],
            mode: 'payment', // Place mode property correctly inside the object
            success_url: 'http://localhost:8000',
            cancel_url: 'http://localhost:8000/cancel'
        });
  
        console.log("session:" , session); // Log the created session for debugging or further processing
        
        // Respond with session ID or redirect as needed
        res.redirect(session.url)
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to initiate checkout session' });
    }
}


module.exports = {makepayment}