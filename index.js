/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

// NodeJS QAP 2

// Author: Michael Bennett
// Last Updated: 2023-10-17

/* A multi route HTTP server that serves HTML files from the views directory, and logs events to disk */

// File: (index.js) is the main file and entry point for this project
// Last Updated: 2023-10-17

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */


// Import statements for the common core modules that we will need
const http = require('http'); // Import http module used to create http server
const fs = require('fs'); // Common core filesystem module used to work with files

// Import events module and extend it to create a custom event emitter
const EventEmitter = require('events'); // Common core events module
class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter();

const logEvents = require('./logEvents.js'); // Import the logEvents function



// Define custom event listeners //

// Define an event for when the server starts
myEmitter.on('serverStarted', (message) => {
    console.log(message)
    logEvents('Server started')
})

// Define an event for when any page is visited
myEmitter.on('pageVisited', (message) => {
    console.log(message)
    logEvents(message)
})

// Define an event for when there is an error, page not found
myEmitter.on('pageNotFound', (message) => {
    console.log(message)
    logEvents(message)
})



// Create an HTTP server
const server = http.createServer((request, response) => {

    let filePath = './views/' // Set the default file path
    const urlPath = request.url; // Get the URL path

    // Map the URL paths to the file paths
    const routeMap = {
        '/': 'home.html',
        '/about': 'about.html',
        '/contact': 'contact.html',
        '/products': 'products.html',
        '/faq': 'faq.html',
        '/privacy': 'privacy'
    }

    // Check if the requested URL path is in the route map
    if (routeMap[urlPath]) {
         
        filePath += routeMap[urlPath]; // Concatenate the default file path with the corresponding HTML file name

        // Read the HTML file asynchronously
        fs.readFile(filePath, (err, data) => {

            if (err) {
                
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('404 Not Found')

            } else { // Read the HTML file successfully
                
                response.writeHead(200, { 'Content-Type': 'text/html' })
                response.end(data) // Send the HTML file to the client
                myEmitter.emit('pageVisited', `Serving ${routeMap[urlPath]}`)

            }
        });


    } else { // Requested URL is not in the route map

        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 Not Found');
        myEmitter.emit('pageNotFound', `Route ${urlPath} not found`)

    }

})

// Start the server and listen on post 3000
server.listen(3000, 'localhost', () => {

    myEmitter.emit('serverStarted', 'Server started')
    console.log('Server is listening on port 3000') // Log a message to the console when the server starts

})
