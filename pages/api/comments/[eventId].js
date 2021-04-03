import path from "path";
import fs from "fs";

function handler(req, res) {
  if (req.method === "POST") {
    const { name, text, email } = req.body;

    const newData = {
      text,
      email,
      name,
      eventId: req.query.eventId,
      id: new Date().toISOString(),
    };

    const filePath = path.join(process.cwd(), "data", "comments.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ msg: "Success", data: newData });
  } else if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "data", "comments.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    const responseData = [];
    data.map((comment) => {
      if (comment.eventId === req.query.eventId) {
        responseData.push(comment);
      }
    });

    res.status(200).json({ data: responseData });
  }
}

export default handler;
