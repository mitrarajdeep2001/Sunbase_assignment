//Constants
const components = ["input", "select", "textarea"];
const componentsContainer = document.getElementById("components");
const form = document.getElementById("form");
const saveBtn = document.getElementById("save-btn");
const selectOptions = [
  "Sample Option 1",
  "Sample Option 2",
  "Sample Option 3",
  "Sample Option 4",
  "Sample Option 5",
];

//Function to display components in sidebar
(function () {
  componentsContainer.innerHTML = components
    .map(
      (component) =>
        `<div data-type=${component}>
        <span data-type=${component}>${component.toUpperCase()}</span>
        <i data-type=${component} class="fa-solid fa-plus"></i>
      </div>`
    )
    .join("");
})();

//Function to display form elements
(function () {
  componentsContainer.addEventListener("click", (event) => {
    const type = event.target.dataset.type;
    if (components.includes(type)) {
      createElement(type);
    }
  });
})();

function createElement(type) {
  // form.innerHTML = ""
  const placeholderImg = document.querySelector(".form-placeholder-img");
  if (placeholderImg) {
    placeholderImg.remove();
  }
  if (type === "input") {
    form.innerHTML += `<li class="element" data-type="input" id=${genRanHex(
      32
    )}>
        <div>
          <label for="input">Sample label</label>
          <i class="fa-solid fa-trash"></i>
        </div>
        <input type="text" id="input" placeholder="Sample placeholder" aria-placeholder="Sample placeholder" />
      </li>`;
  } else if (type === "select") {
    form.innerHTML += `<li class="element" data-type="select" id=${genRanHex(
      32
    )}>
    <div>
      <label for="select">Select</label>
      <i class="fa-solid fa-trash"></i>
    </div>
    <div class="select">
      <select>
        ${selectOptions
          .map((option) => `<option value="${option}">${option}</option>`)
          .join("")}
      </select>
    </div>
  </li>`;
  } else {
    form.innerHTML += `<li class="element" data-type="textarea" id=${genRanHex(
      32
    )}>
    <div>
      <label for="textarea">Textarea</label>
      <i class="fa-solid fa-trash"></i>
    </div>
    <textarea
      id="textarea"
      placeholder="Sample placeholder" 
      aria-placeholder="Sample placeholder"
      rows="8"
    ></textarea>
  </li>`;
  }
}

//Function to delete form elements
(function () {
  const trashBtn = document.getElementById("form");
  trashBtn.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-trash")) {
      event.target.parentNode.parentNode.remove();
    }
  });
})();

//Function to save form data in json
(function () {
  saveBtn.addEventListener("click", function () {
    const formData = [];
    for (let i = 0; i < form.children.length; i++) {
      const el = form.children[i];
      const elemObj = {
        id: el.id,
        type: el.dataset.type,
        label: el.children[0].innerText,
        placeholder: el.children[1].ariaPlaceholder,
        option: el.dataset.type === "select" ? selectOptions : null,
      };
      formData.push(elemObj);
    }
    console.log(JSON.stringify(formData));
  });
})();

//Function to generate hex code
const genRanHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
