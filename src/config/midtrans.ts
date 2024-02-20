import dotenv from 'dotenv'
dotenv.config()
//@ts-ignore
import midtransClient from 'midtrans-client';

const coreMidtrans = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : process.env.MIDTRANS_SERVER_KEY,
    clientKey : process.env.MIDTRANS_CLIENT_KEY
})

export const midtransSnap = new midtransClient.Snap({
    isProduction : false,
    serverKey :  process.env.MIDTRANS_SERVER_KEY,
    clientKey :  process.env.MIDTRANS_CLIENT_KEY
})


export default coreMidtrans