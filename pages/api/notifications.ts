import type { NextApiRequest, NextApiResponse } from "next";
import INotification from "../../interfaces/INotification";
import IRequestInitialMessage from "../../interfaces/IRequestInitialMessage";
import { API } from "../../services/API";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            return res.status(200).send("Juancito te amo!!");
        case "POST":
            return postNoti2();
        //   case "PUT":
        //     return insUpdAppointment();
        //   case "DELETE":
        //     return deleteAppointment();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function postNoti2() {
        try {
               const resp = await API.post("/messages", {
                //acaaaaaa
                messaging_product: "whatsapp",
                to: "573504247713",
                type: "template",
                template: {
                    name: "temporal_code_password",
                    language: {
                        code: "es_MX"
                    },
                    components: [
                        {
                            type: "body",
                            parameters: [
                                {
                                    type: "text",
                                    text: "5678"
                                }
                            ]
                        }
                    ]
                }
            })

            console.log(resp,'respp')
            
            res.status(200).json({ resp:"notification"});
        } catch (error) {
            //    console.log(error)
            res.status(500).send(error);
        }
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
            //    const resp = await API.post("/messages", requestWhatsApp)
            API.post("/messages", requestWhatsApp).then(console.log);
            res.json(notification);
            res.status(200).json(notification);
        } catch (error) {
            //    console.log(error)
            res.status(500).send(error);
        }
    }
}


