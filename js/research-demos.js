
// One entry per research demo.
// You can use youtubeId, youtubeUrl or src (MP4).


 // Projects appear and expand inside Publications.html. No Project.html needed.
window.researchDemos = [
  {
    slug: "assembly-transfer",
    title: "VR Assembly Transfer Study",
    category: "Virtual reality · Learning transfer",
    description:  "Investigating how hand tracking, controllers, and passive observation influence the transfer of assembly skills from virtual to physical environments.",
    details: [
      "This research investigates how different interaction methods in virtual reality influence the acquisition and transfer of assembly skills to real-world tasks. The study explores whether the way users interact with virtual objects affects their ability to learn, remember, and reproduce assembly procedures outside the virtual environment.",
      "The experiment compares three conditions: passive observation, hand-tracking interaction, and controller-based interaction. Participants experience an assembly task under their assigned condition and are evaluated on their ability to transfer the learned assembly procedure. The study also examines how interaction techniques influence users' sense of embodiment within the virtual environment.",
      "By examining the relationship between interaction methods, embodiment, and learning transfer, this project aims to inform the design of immersive training applications for education, manufacturing, and other environments where virtual training can support physical skill development."
      
    ],
    gif: "Files/Images/FASTVR.gif",
    youtubeId: "nXTqX8TREGY"
  },
  {
    slug: "motion-tracking",
    title: "Motion Tracking & Behavioral Data",
    category: "Unity · Data collection",
    description:  "Exploring user behavior and performance in immersive virtual reality environments through motion tracking and behavioral data collection.",
    details: [
      "This project examines how users behave and perform while completing interactive tasks in virtual reality. By capturing movement and interaction data, the research seeks to better understand the relationship between individual behavioral tendencies, task demands, and performance within immersive environments.",
      "The project involves virtual reality tasks that require users to interact with objects through constructive and destructive activities. Motion and behavioral data can be collected during these interactions to examine patterns in movement, task execution, and user performance. These measurements provide a foundation for comparing how individuals approach different types of virtual tasks.",

      "This work contributes to the broader study of human behavior in immersive environments by exploring how interaction data can support behavioral analysis and evaluation. Understanding these patterns can help researchers develop more informative assessment methods and better-designed VR experiences."
      
    ],
    gif: "Files/Images/CoDVR Tasks.gif",
    youtubeId: "MdsXYkrtZjw"
  },
  {
    slug: "ar-spatial-interaction",
    title: "AR Spatial Interaction",
    category: "Augmented reality · Perception",
    description:  "Investigating how display transparency and environmental lighting influence the perception, social presence, and interpersonal distances of virtual humans in augmented reality.",
    details: [
        "This research examines how display transparency and environmental lighting affect users' perceptions and social interactions with virtual humans in augmented reality.",

        "We conducted a user study with 22 participants using a stereoscopic transparent AR installation, evaluating virtual human appearance, social presence, and interpersonal distances under different viewing conditions.",

        "Our findings showed that darker environments increased social presence, while interpersonal distance judgments were influenced by viewing position rather than transparency. These results inform the design of AR systems supporting realistic social interactions."
    ],
    gif: "Files/Images/Proxemics-CloseUp-Dark.gif",
    youtubeId: "JSMzx_oM6Jg"
  }
];


(function () {
  "use strict";
  const list = document.getElementById("demo-list");
  if (!list) return;

  function getYouTubeId(project) {
    if (project.youtubeId) return String(project.youtubeId).trim();
    if (!project.youtubeUrl) return null;
    try {
      const url = new URL(project.youtubeUrl);
      const host = url.hostname.toLowerCase();
      if (host === "youtu.be" || host === "www.youtu.be") {
        return url.pathname.split("/")[1];
      }
      if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"].includes(host)) {
        return url.searchParams.get("v") || url.pathname.match(/\/(?:embed|shorts)\/([^/]+)/)?.[1] || null;
      }
    } catch (error) {
      console.warn("Invalid YouTube URL:", project.youtubeUrl);
    }
    return null;
  }

  function createPreview(project) {
    const media = document.createElement("div");
    media.className = "media";
    const id = getYouTubeId(project);
    const preview = document.createElement("img");
    if (project.gif || (project.src && /\.(gif|png|jpe?g|webp)(?:[?#].*)?$/i.test(project.src))) {
      preview.src = project.gif || project.src;
    } else if (id && /^[A-Za-z0-9_-]{11}$/.test(id)) {
      preview.src = project.thumbnail || `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    } else if (project.thumbnail) {
      preview.src = project.thumbnail;
    } else {
      media.textContent = "Research project";
      return media;
    }
    preview.alt = project.title + " preview";
    preview.loading = "lazy";
    media.append(preview);
    return media;
  }

  function showDetail(project, panel) {
    panel.replaceChildren();
    const id = getYouTubeId(project);
    const media = document.createElement("div");
    media.className = "project-full-media";
    if (id && /^[A-Za-z0-9_-]{11}$/.test(id)) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}`;
      iframe.title = project.title + " video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;
      media.append(iframe);
    } else if (project.src && /\.(mp4|webm)(?:[?#].*)?$/i.test(project.src)) {
      const video = document.createElement("video");
      video.src = project.src;
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      media.append(video);
    } else if (project.gif || project.thumbnail || project.src) {
      const img = document.createElement("img");
      img.src = project.gif || project.thumbnail || project.src;
      img.alt = project.title;
      media.append(img);
    } else {
      media.textContent = "Video coming soon";
    }
    panel.append(media);
    const heading = document.createElement("h4");
    heading.textContent = "About this project";
    panel.append(heading);
    (project.details || []).forEach(paragraph => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      panel.append(p);
    });
  }

  window.researchDemos.forEach((project, index) => {
    const row = document.createElement("article");
    row.className = "research-demo";
    row.id = "project-" + (project.slug || index + 1);

    const panelId = "project-detail-" + index;
    const panel = document.createElement("div");
    panel.className = "project-inline-detail";
    panel.id = panelId;
    panel.hidden = true;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "research-demo-preview";
    button.setAttribute("aria-label", "Expand " + project.title);
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", panelId);
    button.append(createPreview(project));

    const body = document.createElement("div");
    const category = document.createElement("div");
    category.className = "meta";
    category.textContent = project.category || "Research project";
    const title = document.createElement("h3");
    const titleButton = document.createElement("button");
    titleButton.type = "button";
    titleButton.className = "project-title-button";
    titleButton.textContent = project.title;
    titleButton.setAttribute("aria-expanded", "false");
    titleButton.setAttribute("aria-controls", panelId);
    title.append(titleButton);
    const description = document.createElement("p");
    description.textContent = project.description || "";
    const more = document.createElement("button");
    more.type = "button";
    more.className = "project-view-link";
    more.textContent = "View project & full video +";
    more.setAttribute("aria-expanded", "false");
    more.setAttribute("aria-controls", panelId);

    function toggle() {
      const open = panel.hidden;
      // Closing removes the iframe and stops playback.
      if (open) showDetail(project, panel);
      else panel.replaceChildren();
      panel.hidden = !open;
      [button, titleButton, more].forEach(el => el.setAttribute("aria-expanded", String(open)));
      more.textContent = open ? "Close project −" : "View project & full video +";
    }
    [button, titleButton, more].forEach(el => el.addEventListener("click", toggle));
    body.append(category, title, description, more);
    row.append(button, body, panel);
    list.append(row);
  });

  document.dispatchEvent(new Event("researchDemosRendered"));
})();
