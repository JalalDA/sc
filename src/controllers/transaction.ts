import { Response, Request } from "express";
import Transactions from "../models/Transaction";
import { v4 as uuidV4 } from "uuid";
import coreMidtrans from "../config/midtrans";
import User from "../models/Users";




//create transaction
export const createTransaction = async (req: Request, res: Response) => {
    const {
        payment_type,
        gross_amount,
        customer_details,
        item_details,
        bank_name
    } = req.body
    try {
        let parameter;
        switch (payment_type) {
            case "bank_transfer":
                parameter = {
                    "payment_type": "bank_transfer",
                    "transaction_details": {
                        "gross_amount": gross_amount,
                        "order_id": uuidV4()
                    },
                    customer_details,
                    item_details,
                    "bank_transfer": {
                        "bank": bank_name,
                        "va_number": "111111"
                    }
                }
            case "e-wallet":
                parameter = {
                    "payment_type": "bank_transfer",
                    "transaction_details": {
                        "gross_amount": gross_amount,
                        "order_id": uuidV4()
                    },
                    customer_details,
                    item_details,
                    "bank_transfer": {
                        "bank": bank_name,
                        "va_number": "111111"
                    }
                }
        }
        coreMidtrans.charge(parameter)
            .then((response: any) => {
                console.log({ response });
                console.log(response.va_numbers);
            }).catch((e: any) => {
                console.log({ e });
            })
        res.status(200).json({ msg: "Success" })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}

export const createSnapTransaction = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}

//get all transaction

//get single transaction

//update transaction

//delete transaction

//webhook midtrans to update status transaction
export const webhookTransaction = async (req:Request, res:Response)=>{
    try {
        //get body from midtrans
        const {transaction_status} = req.body

        //get user to get fcmToken
        const user = User.findOne({})
        if(transaction_status === "settlement"){
            
        }
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}