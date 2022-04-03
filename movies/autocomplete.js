function createAutoComplete({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
}) {
  //SELECT HTML ELEMENTS

  root.innerHTML = `
    <label class="label"><strong>Search</strong></label>
    <input class="input" />
    <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results" style="overflow-y: scroll; max-height: 500px;"></div>
    </div>
    </div>
`;
  const input = root.querySelector("input");
  const dropdownActive = root.querySelector(".dropdown");
  const dropdownContent = root.querySelector(".dropdown-content");

  const onInput = async (e) => {
    dropdownContent.innerHTML = "";
    const { results } = await fetchData("/search/movie", e.target.value);
    if (!results.length) {
      dropdownActive.classList.remove("is-active");
      return;
    }
    dropdownActive.classList.add("is-active");
    // console.log(results);
    for (let item of results) {
      const elment = document.createElement("a");
      elment.className = "dropdown-item";

      elment.innerHTML = renderOption(item);
      elment.addEventListener("click", async (e) => {
        dropdownActive.classList.remove("is-active");
        input.value = inputValue(item);
        // console.log(item.id);
        onOptionSelect(item.id);
      });
      dropdownContent.appendChild(elment);
    }
  };

  //ADD EVENT LISTNER TO INPUT WITH SOME TIMEOUT
  input.addEventListener("input", debounce(onInput, 800));

  //
  document.addEventListener("click", (e) => {
    if (!autocomplete.contains(e.target)) {
      dropdownActive.classList.remove("is-active");
    }
  });
}
