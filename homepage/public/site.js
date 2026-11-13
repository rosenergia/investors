const drawer = document.querySelector('#drawer');
const trigger = document.querySelector('#menu');
trigger.addEventListener('click', () => drawer.showModal());
document.querySelector('#close').addEventListener('click', () => drawer.close());
drawer.addEventListener('click', event => {
  if (event.target.closest('a') || (event.target === drawer && event.clientX >= drawer.getBoundingClientRect().right)) drawer.close();
});
