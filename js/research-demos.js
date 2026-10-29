
// One entry per research demo.
// You can use youtubeId, youtubeUrl or src (MP4).

const researchDemos = [
  {
    title: 'VR Assembly Transfer Study',
    category: 'Virtual reality · Learning transfer',
    description: 'Comparing hand tracking, controllers, and observation conditions for learning transfer in immersive assembly tasks.',
    youtubeId: 'MdsXYkrtZjw'
  },
  {
    title: 'Motion Tracking & Behavioral Data',
    category: 'Unity · Data collection',
    description: 'Collecting spatial and motion tracking data for XR experiments.'
  },
  {
    title: 'AR Spatial Interaction',
    category: 'Augmented reality · Perception',
    description: 'Research demonstrations investigating virtual content and spatial perception.'
  }
];

(function () {
  const list = document.getElementById('demo-list');
  if (!list) return;

  const getId = u => {
    try {
      const x = new URL(u);
      return x.hostname.includes('youtu.be')
        ? x.pathname.slice(1)
        : x.searchParams.get('v') ||
          x.pathname.split('/embed/')[1];
    } catch {
      return null;
    }
  };

  researchDemos.forEach(d => {
    const row = document.createElement('article');
    row.className = 'research-demo reveal';

    const media = document.createElement('div');
    media.className = 'media';

    let id = d.youtubeId || (d.youtubeUrl && getId(d.youtubeUrl));

    if (id && /^[A-Za-z0-9_-]{11}$/.test(id)) {
      const f = document.createElement('iframe');

      f.src = 'https://www.youtube-nocookie.com/embed/' + id;
      f.title = d.title;
      f.loading = 'lazy';
      f.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.allowFullscreen = true;

      media.append(f);

    } else if (d.src) {
      const v = document.createElement('video');

      v.src = d.src;
      v.controls = true;
      v.playsInline = true;
      v.preload = 'metadata';

      media.append(v);

    } else {
      media.textContent = 'Add video or GIF';

      if (d.gif) {
        const img = document.createElement('img');

        img.src = d.gif;
        img.alt = d.title;
        img.style.cssText = 'width:100%;height:100%;object-fit:cover';

        media.replaceChildren(img);
      }
    }

    const body = document.createElement('div');

    const tag = document.createElement('div');
    tag.className = 'meta';
    tag.textContent = d.category || 'Research demo';

    const h = document.createElement('h3');
    h.textContent = d.title;

    const p = document.createElement('p');
    p.textContent = d.description || '';

    body.append(tag, h, p);
    row.append(media, body);
    list.append(row);
  });

  document.dispatchEvent(new Event('researchDemosRendered'));
})();
