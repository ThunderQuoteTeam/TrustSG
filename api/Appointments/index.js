const CosmosClient = require("@azure/cosmos").CosmosClient;
const client = new CosmosClient(process.env.CosmosDbConnectionString);
const database = client.database('main-db');
const container = database.container('main-db');

module.exports = async function (context, req) {
    context.log('HTTP trigger for cosmos get');
    let result;
    switch (req.method) {
        case "GET":
            // query to return all items
            let querySpec;
            if (req.query.id) {
                querySpec = {
                    query: "SELECT * from c WHERE c.id = @id",
                    parameters: [
                        {name: "@id", value: req.query.id}
                    ]
                }
            } else {
                querySpec = {
                    query: "SELECT * from c"
                }
            }
                
            const { resources: items } = await container.items
            .query(querySpec)
            .fetchAll();
            result = items;
            break;
        case "POST":
            const { resource: createdItem } = await container.items.create(req.body.newAppointment);
            result = createdItem;
            break;
        case "PATCH":
        default:
            result = "placeholder";
            break;
    }
    
    const responseMessage = result;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}