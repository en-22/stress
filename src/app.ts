import express, { Request, Response } from 'express';
import routes from '../src/routes/questionRoutes'
import prisma from '../src/services/prismaClient'
import path from "path";

const app = express();
app.use(express.json());

app.use("/api/audio", express.static(path.join(__dirname, "audio")));
app.use("/api", routes);

// Start server
app.listen(3000, () => {
  console.log('🚀 Server ready at http://localhost:3000');
});