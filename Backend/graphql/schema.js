// This file schema.js ressembles to the models file in the node application which is integrated with mongoose schema structure.

// Importing the buildSchem property from the npm installed graphql package.
const { buildSchema } = require('graphql');

// Exporting the module to use it in resolvers file in the application where the keys for the data are defined in an object.
module.exports = buildSchema(`
    type TestData {
        title: String!
        value: Int!
    }

    type RootQuery {
        hello: TestData!
    }

    // buildSchema method expects a schema value where the "query" property has to be set which is based on the typed-language.
    // In this case the query key is assigned with RootQuery object where again it is set with a key which stores the schema of the TestData.
    // The key "hello" in the RootQuery is handled again in the resolvers file which contains the actual data values for the TestData.

    schema {
        query: RootQuery
    }`
);