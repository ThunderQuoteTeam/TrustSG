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
            const updatedBody = req.body.updatedBody;
            const id = updatedBody.id;
            // first get the currentItem, to preserve its properties
            const query = {
                query: "SELECT * from c WHERE c.id = @id",
                parameters: [
                    {name: "@id", value: id}
                ]
            }
            const { resources } = await container.items
            .query(query)
            .fetchAll();
            const item = resources[0];
            // see microsoft's github repo for more details
            for (const [key, newVal] of Object.entries(updatedBody)) {
                if (key !== 'id') {
                    item[key] = newVal
                }
            }
            const { resource: updatedItem } = await container.item(id).replace(item)
            result = updatedItem;
            break;
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