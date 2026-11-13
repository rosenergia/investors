const drawer = document.querySelector('#drawer');
const trigger = document.querySelector('#menu');
const search = document.querySelector('#menu-search');
const categories = [...drawer.querySelectorAll('[data-group]')];
const results = drawer.querySelector('.menu-results');
const empty = drawer.querySelector('#menu-empty');
let selected = 'sektorler';

function normalize(text) {
  return text.toLocaleLowerCase('tr').replaceAll('ı', 'i').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function filterMenu() {
  const query = normalize(search.value.trim());
  let matches = 0;
  for (const button of categories) {
    const group = button.dataset.group;
    const section = document.getElementById(button.getAttribute('aria-controls'));
    const active = group === selected && !query;
    button.setAttribute('aria-pressed', String(active));
    let visible = 0;
    for (const link of section.children) {
      if (link.matches('.sector-menu')) {
        const nameMatches = normalize(link.querySelector('summary').textContent).includes(query);
        let hit = false;
        for (const topic of link.querySelectorAll('a')) {
          const keywords = topic.hash === '#ana-yukleniciler' ? ' rönesans genel taahhüt' : '';
          const showTopic = !query || nameMatches || normalize(topic.textContent + keywords).includes(query);
          topic.hidden = !showTopic;
          hit ||= showTopic;
        }
        link.open = Boolean(query && hit);
        link.hidden = query ? !hit : !active;
        if (!link.hidden) visible++;
        continue;
      }
      const show = query ? normalize(link.textContent).includes(query) : active;
      link.hidden = !show;
      if (show) visible++;
    }
    section.hidden = visible === 0;
    matches += visible;
  }
  empty.hidden = matches > 0;
  results.scrollTop = 0;
}

for (const button of categories) {
  button.addEventListener('click', () => {
    selected = button.dataset.group;
    search.value = '';
    filterMenu();
  });
}
search.addEventListener('input', filterMenu);
trigger.addEventListener('click', () => {
  selected = 'sektorler';
  search.value = '';
  filterMenu();
  drawer.showModal();
  trigger.setAttribute('aria-expanded', 'true');
});
document.querySelector('#close').addEventListener('click', () => drawer.close());
drawer.addEventListener('close', () => trigger.setAttribute('aria-expanded', 'false'));
drawer.addEventListener('click', event => {
  if (event.target.closest('a') || (event.target === drawer && event.clientX >= drawer.getBoundingClientRect().right)) drawer.close();
});
