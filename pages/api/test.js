export default function test(req, res) {
  console.log(process.env.PROJECT_ROOT);

  res.status(200).json({ dir: process.env.PROJECT_ROOT });
}
