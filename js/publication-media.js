
// Add a media file to any paper by changing its entry below.
// Images: .gif, .webp, .jpg or .png. Animated GIFs play automatically.
// Videos: .mp4 (muted, looping) OR YouTube (optional embed).
// Leave a paper empty to display the JR-themed placeholder instead.
// For GIFs: remove the /* and */ around the src/alt fields for that paper.
// Upload files to Files/Images/Publications/ in your GitHub Website repository.

window.publicationMedia = {
  1:{ src: "Files/Images/CulturalReflections.png", alt: "Avatar embodiment research demo"  },
  2: { src: "Files/Images/CoDVR Tasks.gif", alt: "Avatar embodiment research demo"  },
  3: { src: "Files/Images/ARAnimals.png", alt: "Outdoor AR study demo"},
  4: { src: "Files/Images/percep_motivation.png", alt: "Virtual human installation demo"},
  5: { src: "Files/Images/OpticalSeeThrough.png", alt: "AR self-avatar research demo"},
  6: { src: "Files/Images/SkeletonVR.png", alt: "SkeletonVR puzzle demonstration" },
  7: {src: "Files/Images/precue-Teaser.png", alt: "precue image"}
};

(function () {
  const mediaConfig = window.publicationMedia || {};

  document.querySelectorAll('[data-paper-media]').forEach(container => {
    const item = mediaConfig[container.dataset.paperMedia];

    if (!item || (!item.src && !item.youtubeId)) return;

    let element;

    if (item.youtubeId) {
      const id = String(item.youtubeId).trim();

      if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) return;

      element = document.createElement('iframe');
      element.src = 'https://www.youtube-nocookie.com/embed/' + id;
      element.title = item.alt || 'Research video';
      element.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';
      element.allowFullscreen = true;
      element.loading = 'lazy';
      element.style.cssText = 'display:block;width:100%;height:100%;border:0;';

    } else if (/\.mp4(?:[?#].*)?$/i.test(item.src)) {
      element = document.createElement('video');
      element.src = item.src;
      element.autoplay = true;
      element.loop = true;
      element.muted = true;
      element.playsInline = true;
      element.controls = true;
      element.preload = 'metadata';
      element.setAttribute(
        'aria-label',
        item.alt || 'Research demonstration video'
      );

    } else {
      element = document.createElement('img');
      element.src = item.src;
      element.alt = item.alt || 'Publication research visual';
      element.loading = 'lazy';

      element.onerror = () => {
        container.replaceChildren(createPlaceholder());
      };
    }

    container.replaceChildren(element);
  });

  function createPlaceholder() {
    const block = document.createElement('div');
    block.className = 'paper-media-placeholder';

    const mark = document.createElement('span');
    mark.textContent = 'JR✦';

    const label = document.createElement('small');
    label.textContent = 'Research visual';

    block.append(mark, label);

    return block;
  }
})();
