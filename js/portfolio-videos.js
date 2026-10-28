
 // Add an entry for each project card that should display a video.
 // project: 1 through 6 matches the numbered cards on Portfolio.html.
 // Only projects with a configured video display a player; no preview cover is shown.


 // Configure one optional playable video per project (cards 1 through 6).
 // Use youtubeId OR youtubeUrl for YouTube, or src for a hosted MP4.
 // No upload or backend is needed for YouTube videos.

window.portfolioVideos = [
  {
    project: 1,
    title: "Assembly Skill Transfer in Virtual Reality",
    youtubeId: "MdsXYkrtZjw",
    caption: "VR research demonstration"
  },

  // Example of a second YouTube video:
  // {
  //   project: 3,
  //   youtubeUrl: "https://youtu.be/YOUR_VIDEO_ID",
  //   title: "AR demonstration"
  // },

  // Example of an MP4 hosted in your GitHub repository:
  // {
  //   project: 2,
  //   src: "Files/Videos/motion-tracking.mp4",
  //   type: "video/mp4",
  //   caption: "Motion tracking demo"
  // }
];



// How to use them
// 1. Rename Portfolio_cards_videos.html to Portfolio.html.
// 2. Rename style_cards_videos.css to style.css and place it in your css folder.
// 3. Rename portfolio-videos-cards.js to portfolio-videos.js and place it in your js folder.