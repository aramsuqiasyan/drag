const item = document.querySelector(".item");
const placeholders = document.querySelectorAll(".placeholder");
let ghost;

item.addEventListener("dragstart", dragstart);
item.addEventListener("dragend", dragend);

placeholders.forEach((placeholder) => {
  placeholder.addEventListener("dragover", dragover);
  placeholder.addEventListener("dragenter", dragenter);
  placeholder.addEventListener("dragleave", dragleave);
  placeholder.addEventListener("drop", drop);
});

function dragstart(event) {
  event.target.classList?.add("hide");
  event.target.classList.add("hold");
  ghost = event.target.cloneNode(true);
  ghost.innerText = "Тащи куда надо...!";
  ghost.style.cssText = `position:fixed;top:-999px;`;

  document.body.appendChild(ghost);
  const { width, height } = getComputedStyle(ghost);
  event.dataTransfer.setDragImage(
    ghost,
    parseInt(width) / 2,
    parseInt(height) - 10
  );
}

function dragend(event) {
  event.target?.classList?.remove("hold", "hide");
  ghost?.remove();
}

function dragover(event) {
  event.preventDefault();
}
function dragenter(event) {
  event.target.classList.add("hovered");
}
function dragleave(event) {
  event.target.classList.remove("hovered");
}
function drop(event) {
  const id = event.target.dataset.placeholder;
  const col = document.querySelector(`.col-header[data-id="${id}"]`);
  col.classList.add("shake");
  setTimeout(() => {
    col.classList.remove("shake");
  }, 300);
  event.target.classList.remove("hovered");
  item.classList.add("drop");
  setTimeout(() => {
    item.classList.remove("drop");
  }, 300);
  event.target.append(item);
}
