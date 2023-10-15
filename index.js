const http = require('http'); // Import http module used to create http server
const fs = require('fs'); // Import filesystem module

// Create an HTTP server
const server = http.createServer((request, response) => {

    const filePath = './views/' // Set the default file path
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
                console.log(err); // If there is an error, then log it the the console
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('404 Not Found');

            } else {
                console.log(`Serving ${routeMap[urlPath]}`); // If no error, then log the file name to the console
                response.writeHead(200, { 'Content-Type': 'text/html' })
                response.end(data) // Send the HTML file to the client
            }
        });


    } else {

        console.log(`Route ${urlPath} not found`) // Log route not found message to the console
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response,end('404 Not Found');
    }

})

// Start the server and listen on post 3000
server.listen(3000, 'localhost', () => {
    console.log('Server is listening on port 3000') // Log a message to the console when the server starts
})