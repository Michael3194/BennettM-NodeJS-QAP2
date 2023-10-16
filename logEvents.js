const fs = require('fs'); // Import the filesystem module
const fsPromises = require('fs').promises; // Import promises functionality for fs module
const path = require('path') // Import the path module

const { format } = require('date-fns'); // Import the date-fns module to format dates

const { v4: uuidv4 } = require('uuid'); // Import the uuid module to generate unique IDs

const logEvents = async (message) => {

    // Format the current date and time
    const dateTime = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`;

    // This is the format for each log item in the log file
    const logItem = `${dateTime}\t${message}\t${uuidv4()}`;

    try {
        // If log directory does not exist
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {

            // Then create it here
            await fsPromises.mkdir(path.join(__dirname, 'logs')); 
        }

        // Create the log file name
        const fileName = `${format(new Date(), 'yyyyMMdd')}` + '_serverEvents.log';

        // Append the log item to the log file
        await fsPromises.appendFile(path.join(__dirname, 'logs', fileName), logItem + '\n');

    // Catch any errors
    } catch (err) {
        console.log(err) // And log them to the console
    }

}

module.exports = logEvents; // Export the logEvents function