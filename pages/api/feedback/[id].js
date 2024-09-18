import { buildPath, extractdata } from ".";
function handler(req, res) {
  const Id = req.query.id;
  const filePath = buildPath();
  const data = extractdata(filePath);
  let selectedFeedback = data.find((item) => item.id === Id);
  res.status(200).json({ feedback: selectedFeedback });
}
export default handler;
