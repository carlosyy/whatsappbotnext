import type { NextApiRequest, NextApiResponse } from "next";
import INotification from "../../interfaces/INotification";
import IRequestInitialMessage from "../../interfaces/IRequestInitialMessage";
import { API } from "../../services/API";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            return getPrueba()
        case "POST":
            return postNoti();
        //   case "PUT":
        //     return insUpdAppointment();
        //   case "DELETE":
        //     return deleteAppointment();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function getPrueba() {
        res.status(200).json({
            NEXT_REACT_APP_API_URL: process.env.NEXT_REACT_APP_API_URL,
            NEXT_TOKEN_FB: process.env.NEXT_TOKEN_FB,
        })
    }

    async function postNoti() {
        const notification: INotification = req.body;

        const requestWhatsApp: IRequestInitialMessage = {
            messaging_product: notification.message,
            to: notification.phone,
            type: "template",
            template: {
                name: notification.name,
                language: { code: "en_US" },
            },
        };

        try {
            const resp = await API.post("/messages", requestWhatsApp)

            res.status(200).json(notification);
        } catch (error) {
            //    console.log(error)
            res.status(500).send(error);
        }
    }
}


