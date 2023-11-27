import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import { fetchTasks, createTasks, updateTasks, deleteTasks } from "./task.js";
import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {
        region: 'us-west-1', // replace with your region
        userPoolId: 'us-west-1_910JwO0sT', // replace with your User Pool ID
        userPoolWebClientId: '1jmdfm225d1nlaohs18nnt62eh', // replace with your User Pool Web Client ID
    }
});

const app = express();
const port = 3001;

app.use(express.json());

if (process.env.DEVELOPMENT) {
  app.use(cors());
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/task", async (req, res) => {
  try {
    const tasks = await fetchTasks();

    res.send(tasks.Items);
  } catch (err) {
    res.status(400).send(`Error fetching tasks: ${err}`);
  }
});

app.post("/task", async (req, res) => {
  try {
    const task = req.body;

    const response = await createTasks(task);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error creating tasks: ${err}`);
  }
});

app.put("/task", async (req, res) => {
  try {
    const task = req.body;

    const response = await updateTasks(task);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error updating tasks: ${err}`);
  }
});

app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await deleteTasks(id);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error deleting tasks: ${err}`);
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
