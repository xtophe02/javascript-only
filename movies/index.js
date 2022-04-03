const autocompleteConfig = {
  renderOption(movie) {
    document.querySelector("#tutorial").classList.add("is-hidden");
    const src = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://bulma.io/images/placeholders/256x256.png";
    return `
      <div style="display:flex; align-items:center" >
        <div style="width:60px;">
        <figure class="image is-4by5" >
          <img src=${src} />
        </figure></div><span class="pl-1">${movie.original_title}</span>
        &nbsp;(${movie.release_date ? movie.release_date.split("-")[0] : "n/a"})
      </div>  
`;
  },
  inputValue(movie) {
    return movie.original_title;
  },
};

createAutoComplete({
  root: document.querySelector("#autocomplete"),

  onOptionSelect(movieId) {
    // console.log(movieId);
    renderMovieSelect(movieId, "#resume");
  },
  ...autocompleteConfig,
});
createAutoComplete({
  root: document.querySelector("#autocomplete-two"),

  onOptionSelect(movieId) {
    // console.log(movieId);
    renderMovieSelect(movieId, "#resume-two");
  },
  ...autocompleteConfig,
});

let left;
let right;
async function renderMovieSelect(movieId, element) {
  const data = await fetchData(`/movie/${movieId}`, null);

  const resume = document.querySelector(element);
  const src = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : "https://bulma.io/images/placeholders/256x256.png";

  const html = `
  <article class="media mb-2" style="height:300px; overflow-y:auto;">
  <figure class="media-left" style="width: 128px;">
    <p class="image is-4by5">
      <img src=${src}>
    </p>
  </figure>
  <div class="media-content">
    <div class="content">

  <a href="${data.homepage}"><h1 class="title">${data.original_title}</h1>
  <h3 class="subtitle">${data.tagline}</h3></a>
  <p class='has-text-weight-bold'>[${Object.values(data.genres)
    .map((el) => el.name)
    .join(", ")}]</p>

      <p>
      ${data.overview}
      </p>
    </div>
  </div>
</article>

<article>
<div class="notification is-primary" data-value=${data.release_date}>
  <p class="heading">release date</p>
  <p class="title is-4">${data.release_date}</p>
</div>
<div class="notification is-primary" data-value=${data.runtime}>
  <p class="heading">runtime</p>
  <p class="title is-4">${data.runtime}</p>
  </div>

<div class="notification is-primary" data-value=${data.vote_average}>
  <p class="heading">Votes</p>
  <p class="title is-4">${data.vote_average}</p>
</div>
<div class="notification is-primary" data-value=${data.vote_count}>
  <p class="heading">Votes count</p>
  <p class="title is-4">${data.vote_count}</p>
</div>
<div class="notification is-primary" data-value=${data.popularity}>
  <p class="heading">popularity</p>
  <p class="title is-4">${data.popularity}</p>
</div>
<div class="notification is-primary" data-value=${data.budget}>
  <p class="heading">Budget</p>
  <p class="title is-4">$ ${convertToInternationalCurrencySystem(
    data.budget
  )}</p>
  </div>
<div class="notification is-primary" data-value=${data.revenue}>
  <p class="heading">Revenue</p>
  <p class="title is-4">$ ${convertToInternationalCurrencySystem(
    data.revenue
  )}</p>
  </div>
</article>
  `;
  resume.innerHTML = html;

  if (element === "#resume") {
    left = resume.querySelectorAll(`.notification`);
  }

  if (element === "#resume-two") {
    // console.log(resume);
    right = resume.querySelectorAll(`.notification`);
  }

  if (left && right) {
    runComparison(left, right);
  }
}

function runComparison(left, right) {
  // console.log(leftMovie, rightMovie);
  // const leftSideStats = document.querySelectorAll("#resume .notification");
  // const rightSideStats = document.querySelectorAll("#resume-two .notification");

  left.forEach((leftStat, i) => {
    const rightStat = right[i];

    const leftStatValue = +leftStat.dataset.value;
    const rightStatValue = +rightStat.dataset.value;

    if (leftStatValue < rightStatValue) {
      leftStat.classList.remove("is-primary");
      leftStat.classList.add("is-warning");
    } else {
      rightStat.classList.remove("is-primary");
      rightStat.classList.add("is-warning");
    }
  });
}
