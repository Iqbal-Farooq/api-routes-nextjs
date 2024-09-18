import fs from "fs";
import path from "path";
export function buildPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}
export function extractdata(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}
function handler(req, res) {
  if (req.method === "POST") {
    let user_data = JSON.parse(req.body);
    let email = user_data.email;
    const feedbackText = user_data.text;
    const newFeedBack = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };
    const filePath = buildPath();
    const data = extractdata(filePath);
    data.push(newFeedBack);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success", feedback: newFeedBack });
  } else {
    const filePath = buildPath();
    const data = extractdata(filePath);
    res.status(200).json({ feedback: data });
  }
}
export default handler;
