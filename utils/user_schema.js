module.exports = {

    type: "object",
    properties: {
        name: {type: "string"},
        address: {type: "string"}
    },
    required: ["name"],
    additionalProperties: false

}