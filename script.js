document.querySelectorAll('[data-year]').forEach((el)=>el.textContent=new Date().getFullYear());
document.querySelectorAll('#year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
