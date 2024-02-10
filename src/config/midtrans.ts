//@ts-ignore
import midtransClient from 'midtrans-client';

const coreMidtrans = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : "SB-Mid-server-zAFHjuMsUn64UGL096Xz3tX0", //process.env.MIDTRANS_SERVER_KEY,
    clientKey : "SB-Mid-client-tHaoHMww5OMhohru" //process.env.MIDTRANS_CLIENT_KEY
})


export default coreMidtrans