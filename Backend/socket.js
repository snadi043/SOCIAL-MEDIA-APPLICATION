// // This the file which deals with the building of socket module to be exported and used in multiple location in the application.
// let io;

// // The module is basically an object which holds two properties and stores functions to access them in the application 
// // one is init() which expects "httpServer" parameter and creates an configuration abs stores it in "io" variable.
// // second is getIO() which for now just checks whether the "io" server connection is valid, if not then throws an error.
// module.exports = {
//     init: (httpServer) => {
//         io = require('socket.io')(httpServer);
//         return io;
//     },
//     getIO: () => {
//         if(!io){
//             throw new Error('Socket io not found');
//         }
//         return io;
//     }

// }


                        // COMMENTED THIS FILE TO IMPLEMENT GRAPHQL //