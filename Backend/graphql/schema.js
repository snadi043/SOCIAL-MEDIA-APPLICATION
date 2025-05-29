// // This file schema.js ressembles to the models file in the node application which is integrated with mongoose schema structure.

// // Importing the buildSchem property from the npm installed graphql package.
// const { buildSchema } = require('graphql');

// // Exporting the module to use it in resolvers file in the application where the keys for the data are defined in an object.
// module.exports = buildSchema(`
//     type TestData {
//         title: String!
//         value: Int!
//     }

//     type RootQuery {
//         hello: TestData!
//     }

//     // buildSchema method expects a schema value where the "query" property has to be set which is based on the typed-language.
//     // In this case the query key is assigned with RootQuery object where again it is set with a key which stores the schema of the TestData.
//     // The key "hello" in the RootQuery is handled again in the resolvers file which contains the actual data values for the TestData.

//     schema {
//         query: RootQuery
//     }`
// );


                        // The lines of code from 1 to 25 deals with "query" in the schema which is designed to retrieve the data from the backend.
                        // The "query" property is not designed to handle the updation of the data on the backend. To handle this operation "graphql"
                        // has provided another property which is called "mutation".
                        
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    // As it is the feature of graphql which is inbuilt type language ability.
    // For the format of any input fields there is a defined type in the graphql which is "input".
    
    type Post {
        _id: ID! // ID is the data format that is accepted by graphql.
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        posts: [Post!]!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }
    
    input PostInputData {
        title: String!
        content: String!
        imageUrl: String!    
    }
    
    type: AuthData {
        token: String!
        userId: String!
    }
    
    type: PostData {
        posts: [Post!]!
        totalPosts: Int!
    }
        
    type RootQuery {
        login({email: String!, password: String!}) : AuthData!
        getPost(page) : PostData! // expecting the "page" as a parameter to implement pagination in the application.
        getPostById(id: ID!): Post! // expecting the "id" as the parameter to impelement fetching a post by particular ID.
        getUserStatus : User! // this is the query which deals with fetching the userStatus.
    }

    type RootMutation {
    // createUser() -> This is the property for which the resolver has to be designed which has the data to filter as per the requirements of the application.
    // createUser() -> expects the inputs (parameters) which is userInput of type UserInputData and returns the output which is User.
        createUser(userInput: UserInputData) : User!

    // createPost() -> This is the property for which the resolver has to be designed which has the data to filter as per the requirements of the application.
    // createPost() -> expects the inputs (parameters) which is postInput of type PostInputData and returns the output which is Post.
        createPost(postInput: PostInputData) : Post!
    }

    // updatePostById() -> This is the property for which the resolver has to be designed which has the data to filter as per the requirements of the application.
    // updatePostById() -> expects the inputs (parameters) which is an "id" of type ID and "postInput" of type PostInputData and returns the output which is Post.
        updatePostById(id: ID!, postInput: PostInputData) : Post!

    // deletetePostById() -> This is the property for which the resolver has to be designed which has the data to filter as per the requirements of the application.
    // deletetePostById() -> expects the input (parameter) which is an "id" of type ID and returns the output which is Post.
        deletetePostById(id: ID!) : Boolean
    
    // updateUserStatus() -> This is the property for which the resolver has to be designed which has the data to filter as per the requirements of the application.
    // updateUserStatus() -> expects the status parameter which is a "String" and returns the output which is User.
        updateUserStatus(status: String!) : User!
    
    schema {
    // query prop is defined to retrieve the data.
    query: RootQuery

    // mutation prop is defined to update the data (i,e: this can handle create,edit and delete the data).
    mutation: RootMutation 
    }
`);