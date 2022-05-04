module.exports = {

    type: "object",
    properties: {
        name: {type: "string"},
        phone_e164: {type: "string"},
        email: {type: "string"},
        address: {type: "string"},
    },
    anyOf: [
        {required: ["phone_e164"]},
        {required: ["email"]}
    ],
    additionalProperties: false

}
