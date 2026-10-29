
const papers = [
  {
    title: "Cultural Reflections in Virtual Reality: The Effects of User Ethnicity in Avatar Matching Experiences on Sense of Embodiment",
    authors: "Tiffany D. Do, Juanita Benjamin, Camille Isabella Protko, Ryan P. McMahan",
    venue: "IEEE Transactions on Visualization and Computer Graphics (TVCG)",
    year: "2024",
    kind: "journal",
    url: "https://doi.org/10.1109/TVCG.2024.3456196"
  },
  {
    title: "Evaluating Transitive Perceptual Effects Between Virtual Entities in Outdoor Augmented Reality",
    authors: "Juanita Benjamin, Austin Erickson, Matthew Gottsacker, Gerd Bruder, Greg Welch",
    venue: "IEEE Conference on Virtual Reality and 3D User Interfaces (IEEE VR)",
    year: "2024",
    kind: "conference",
    url: "https://doi.org/10.1109/VR58804.2024.00082"
  },
  {
    title: "Perception and Proxemics with Virtual Humans on Transparent Display Installations in Augmented Reality",
    authors: "Juanita Benjamin, Gerd Bruder, Carsten Neumann, Dirk Reiners, Carolina Cruz-Neira, Gregory F. Welch",
    venue: "IEEE International Symposium on Mixed and Augmented Reality (ISMAR)",
    year: "2023",
    kind: "conference",
    url: "https://sreal.ucf.edu/wp-content/uploads/2023/08/Perception-and-Proxemics-ISMAR-23-2.pdf"
  },
  {
    title: "Effects of Optical See-Through Displays on Self-Avatar Appearance in Augmented Reality",
    authors: "Meelad Doroodchi, Priscilla Ramos, Austin Erickson, Hiroshi Furuya, Juanita Benjamin, Gerd Bruder, Gregory F. Welch",
    venue: "IEEE ISMAR Adjunct — IDEATExR Workshop",
    year: "2022",
    kind: "conference",
    url: "https://doi.org/10.1109/ISMAR-Adjunct57072.2022.00077"
  },
  {
    title: "SkeletonVR: Educating Human Anatomy Through An Interactive Puzzle Assembly",
    authors: "Jake Gonzalez, Chau Pham, Afamefuna Umejiaku, Juanita Benjamin, Tommy Dang",
    venue: "International Conference on Advances in Information Technology (IAIT)",
    year: "2021",
    kind: "conference",
    url: "https://dblp.org/rec/conf/iait/GonzalezD21"
  }
];

(function () {
  const modal = document.getElementById('citation-dialog');
  if (!modal) return;

  const content = document.getElementById('citation-content');
  const copy = document.getElementById('citation-copy');
  const esc = s => String(s).replace(/[{}]/g, '');

  document.querySelectorAll('.cite-button').forEach(button => {
    button.addEventListener('click', () => {
      const p = papers[Number(button.dataset.paper)];
      if (!p) return;

      const key = 'Benjamin' + p.year + '-' +
        p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 24);

      const names = p.authors
        .split(', ')
        .map(s => s.trim())
        .join(' and ');

      content.value =
        '@' + (p.kind === 'journal' ? 'article' : 'inproceedings') +
        '{' + key + ',\n' +
        '  title = {' + esc(p.title) + '},\n' +
        '  author = {' + names + '},\n' +
        '  year = {' + p.year + '},\n' +
        '  ' + (p.kind === 'journal' ? 'journal' : 'booktitle') +
        ' = {' + esc(p.venue) + '},\n' +
        '  url = {' + p.url + '}\n' +
        '}';

      copy.textContent = 'Copy BibTeX';
      modal.showModal();
    });
  });

  document.getElementById('citation-close').onclick = () => modal.close();
  document.getElementById('citation-dismiss').onclick = () => modal.close();

  copy.onclick = async () => {
    try {
      await navigator.clipboard.writeText(content.value);
      copy.textContent = 'Copied!';
    } catch {
      content.focus();
      content.select();
      copy.textContent = 'Select and copy text';
    }
  };

  modal.addEventListener('click', e => {
    if (e.target === modal) modal.close();
  });
})();
