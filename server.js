const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

let videos = require("./videos.json");

// GET Videos
app.get("/videos", (req, res) => {
    res.json(videos);
});

// Like
app.post("/like", (req, res) => {

    const { videoId } = req.body;

    const video = videos.find(v => v.id == videoId);

    if (!video) {
        return res.status(404).json({
            message: "Video not found"
        });
    }

    video.likes++;

    res.json({
        success: true,
        likes: video.likes
    });

});

// Share
app.post("/share", (req, res) => {

    const { videoId } = req.body;

    const video = videos.find(v => v.id == videoId);

    if (!video) {
        return res.status(404).json({
            message: "Video not found"
        });
    }

    video.shares++;

    res.json({
        success: true,
        shares: video.shares
    });

});

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});