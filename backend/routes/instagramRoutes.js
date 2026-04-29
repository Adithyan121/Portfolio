const express = require("express");
const router = express.Router();

router.get("/posts", async (req, res) => {
  try {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({
        error: data.error.message,
      });
    }

    res.json(data.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
