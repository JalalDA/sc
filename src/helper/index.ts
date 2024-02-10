import firebase from 'firebase-admin'

export const generateOrderId = () => {
    const prefix = "ALPYID";
    const timestamp = new Date().getTime().toString();
    const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const orderId = `${prefix}${timestamp}${randomDigits}`;
    return orderId;
}

export const sendNotif = async (token:string, title:string, body:string) => {
    firebase.messaging().send({
        notification : {
            title, 
            body
        },
        token
    })
}