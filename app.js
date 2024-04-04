import express from "express";
import cors from "cors";
import config from "./config.js";
import { db, collection, doc, writeBatch, getDocs } from "./firebase.js";
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/selector", async (req, res) => {
  try {
    const data = req.body;
    const selector_CSS = collection(db, "selector_CSS");
    const batch = writeBatch(db);

    // Iterate over each document data and add it to the batch
    data.forEach((docData) => {
      const newDocRef = doc(selector_CSS);
      batch.set(newDocRef, docData);
    });

    // Commit the batch operation
    await batch.commit();

    res.status(201).send("Data inserted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/api/css-questions", async (req, res) => {
  try {
    const data = req.body;
    const css_quetions = collection(db, "css_quetions");
    const batch = writeBatch(db);
    data.forEach((docData) => {
      const newDocRef = doc(css_quetions);
      batch.set(newDocRef, docData);
    });
    await batch.commit();
    res.status(201).send("Data inserted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/api/css-quetions", async (req, res) => {
  try {
    const css_quetions = collection(db, "css_quetions");
    const snapshot = await getDocs(css_quetions);
    const data = snapshot.docs.map((doc) => doc.data());
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/api/selector", async (req, res) => {
  try {
    const selector_CSS = collection(db, "selector_CSS");
    const snapshot = await getDocs(selector_CSS);
    const data = snapshot.docs.map((doc) => doc.data());
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About route 🎉 ");
});

app.listen(config.port, () => {
  console.log(`✅ Server is running on port ${config.port}`);
});
