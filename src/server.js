/**
 * This is the main entry point for the API Gateway.
 * It acts as a central router that receives all incoming client requests
 * and forwards them to the appropriate backend microservices.
 */

// Import the Express web framework to create our server
const express = require("express");

// Import the authentication routes logic from the routes folder
const authRoutes = require("./routes/auth.routes");

// 'app' is the instance of our Express application. 
// We use this object to configure routes, middleware, and start the server.
const app = express();

// Define the port number our API Gateway will listen on
const PORT = 4000;

// Middleware to parse incoming JSON payloads in the HTTP request body
// Without this, req.body would be undefined for JSON requests
app.use(express.json());

// Define a root route (GET /) to check if the Gateway is running (Health Check)
app.get("/", (req, res) => {
    // Respond with a simple JSON message
    res.json({
        message: "Booking API Gateway is Running",
    });
});

// Mount the authentication routes under the "/auth" path prefix.
// Any request starting with "/auth" (e.g., "/auth/login") will be handled by authRoutes.
app.use("/auth", authRoutes);

// Start the server and listen for incoming connections on the specified port
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});