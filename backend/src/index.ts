import app from "./app.js";
import { connecttoDatabase } from "./db/connection.js";

// Connections

const PORT = process.env.PORT || 5000;

connecttoDatabase().then(() => {
    app.listen(PORT, () => console.log("Server Started"));
})
.catch((err) => console.log(err));

