import { WhatsappAccountManagerEntity } from './whatsapp-account-manager.entity';
import { WhatsappContactEntity } from './whatsapp-contact.entity';
import { WhatsappMessageEntity } from './whatsapp-message.entity';

export class WhatsappConversationEntity {
    public declare id: string;
    public declare ticket: string;
    public declare sessionExpiration: string | null;
    public declare wppContactId: string;
    public declare wppManagerId: string;
    public declare createdAt: Date;
    public declare updatedAt: Date;
    public declare finishedAt: Date;
    public declare deletedAt: Date;
    public declare companyId: string;
    public manager: WhatsappAccountManagerEntity | null = null;
    public declare contact: WhatsappContactEntity;
    public messages: WhatsappMessageEntity[] = [];

    public static validateSessionExpiration(entity: WhatsappConversationEntity): WhatsappConversationEntity {
        if (!entity.sessionExpiration) {
            return entity;
        }
        if (new Date(Number.parseInt(entity.sessionExpiration)).getTime() > new Date().getTime()) {
            return entity;
        }
        entity.sessionExpiration = null;
        return entity;
    }
}

// {
//    "manager":{
//       "user":{
//          "name":"Barbara Prates"
//       },
//       "id":"085c46ce-5ece-4367-a5b6-a9ca4465a4ca",
//       "userId":"bade592e-3fa4-49a6-923a-86eb8d2db9bc",
//       "wppAccountId":"19fbce94-1b2e-4003-b864-b07e8c32320a",
//       "wppPhoneNumberId":"ee7ac3c2-7518-4f44-b825-0b1698dbffd6",
//       "companyId":"d8adf454-a310-43ff-9330-8e3b75638d38"
//    },
//    "contact":{
//       "id":"0f25c26d-c937-4b50-a4f0-636b49a7a37e",
//       "firstName":"Lucas",
//       "lastName":"Roscoe",
//       "countryCode":"55",
//       "subdivisionCode":"31",
//       "phone":"31998085147",
//       "isBlocked":false
//    },
//    "messages":[
//       {
//          "manager":{
//             "user":{
//                "name":"Admin Zoppy"
//             },
//             "id":"1bc0431d-f462-48f0-9f71-8bbad4174f3f",
//             "userId":"d3fa6047-b9b5-4dfc-9e03-030195fe70a2",
//             "wppAccountId":"19fbce94-1b2e-4003-b864-b07e8c32320a",
//             "wppPhoneNumberId":"ee7ac3c2-7518-4f44-b825-0b1698dbffd6",
//             "companyId":"d8adf454-a310-43ff-9330-8e3b75638d38"
//          },
//          "contact":null,
//          "media":null,
//          "id":"1cea1cb7-c514-4c81-93e4-56d658fda030",
//          "type":"template",
//          "content":"Olá Lucas! Aqui é Admin Zoppy, tudo bem? Irei fazer seu atendimento hoje. Me conta, como posso ajudar você?",
//          "status":"forwarded",
//          "origin":"business_initiated",
//          "wppContactId":"0f25c26d-c937-4b50-a4f0-636b49a7a37e",
//          "wppManagerId":"1bc0431d-f462-48f0-9f71-8bbad4174f3f",
//          "createdAt":"2023-04-14T21:31:34.000Z",
//          "deletedAt":null,
//          "companyId":"d8adf454-a310-43ff-9330-8e3b75638d38"
//       }
//    ],
//    "id":"1595dfee-c1d4-4d84-8efa-d8af292d295d",
//    "ticket":"92700a7a-5e23-47bc-b276-b1d71c4087ee",
//    "sessionExpiration":"1680826920000",
//    "wppContactId":"0f25c26d-c937-4b50-a4f0-636b49a7a37e",
//    "wppManagerId":"085c46ce-5ece-4367-a5b6-a9ca4465a4ca",
//    "createdAt":"2023-04-04T22:48:52.000Z",
//    "finishedAt":null,
//    "companyId":"d8adf454-a310-43ff-9330-8e3b75638d38"
// }
