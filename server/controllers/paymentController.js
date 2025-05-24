import mercadopago from "mercadopago"


export const createOrder = async (req, res) => {
    
    mercadopago.configure({
        access_token: "APP_USR-412533297282542-052017-1f02203b19d8de48fdd23d1f95c44ff1-2448200083",
    });

    const result = await mercadopago.preferences.create({
        items: [
            {
                title: "Mi producto",
                unit_price: 2000,
                currency_id: "ARS",
                quantity: 1,
            }
        ],
        back_urls: {
            success: "http://localhost:3000/success",
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/pending",
        },
        notification_url:"http://localhost:3000",
    })

    console.log(result)

    res.send("create-order")
};

export const receiveWebhook = (req, res) => {
    console.log(req.query);

    res.send("webhook");
}