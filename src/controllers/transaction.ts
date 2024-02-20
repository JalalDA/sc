import { Response, Request } from "express";
import Transactions from "../models/Transaction";
import { v4 as uuidV4 } from "uuid";
import coreMidtrans, { midtransSnap } from "../config/midtrans";
import User from "../models/Users";
import db from "../config/db";




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
    //@ts-ignore
    const { user_id } = req.payload
    if (!user_id) {
        return res.status(403).json({ msg: "User id not found" })
    }
    const { gross_amount = "", course_id } = req.body
    const generateOrderId = () => {
        const prefix = "SGRCD-";
        const timestamp = new Date().getTime().toString();
        const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const orderId = `${prefix}${timestamp}${randomDigits}`;
        return orderId;
    }

    const order_id = generateOrderId()
    try {
        const transaction = await Transactions.create({
            transaction_id: uuidV4(),
            user_id,
            course_id,
            status: "PENDING",
            order_id
        })
        if (!transaction) {
            return res.status(400).json({ msg: "Failed create transaction" })
        }
        const parameter = {
            transaction_details: {
                //@ts-ignore
                order_id: order_id,
                gross_amount,
            },
        };
        const result = await midtransSnap.createTransaction(parameter);
        return res.status(200).json({
            url: result.redirect_url,
            transaction
        });
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}

//get all transaction by user id
export const getTransactionByUserId = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const { user_id } = req.payload
        const data = await db.query(`select  t.transaction_id, t.status, c."name", c.price_down, t.order_id  from "Transactions" t join "Courses" c on t.course_id  = c.course_id  where t.user_id = '${user_id}';
        `)
        res.status(200).json({data : data[0]})
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}

//get single transaction

//update transaction

//delete transaction

//webhook midtrans to update status transaction
export const webhookTransaction = async (req: Request, res: Response) => {
    try {
        //get body from midtrans
        const { transaction_status, order_id } = req.body
        if (transaction_status === "settlement") {
            const transaction = await Transactions.findOne({where : {order_id : req.body.order_id}})
            if(!transaction){
                return res.status(404).json({msg : "Transaction not found"})
            }
            await transaction?.update({status : "PAID"})
        }
        if (transaction_status === "expire") {
            const transaction = await Transactions.findOne({where : {order_id : req.body.order_id}})
            if(!transaction){
                return res.status(404).json({msg : "Transaction not found"})
            }
            await transaction?.update({status : "EXPIRE"})
        }
        res.status(200).json({msg : "Success payment transaction", order_id})
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}