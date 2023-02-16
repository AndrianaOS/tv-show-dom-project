//You can edit ALL of the code here
//VARIABLE FOR BODY
const episodeArea = document.querySelector("body");

// VARIABLE FOR DIV
const rootElem = document.querySelector("root");
const title = document.querySelector("#title");

// VARIABLE FOR DIV HOUSING EPISODE SECTIONS
const episodeDiv = document.querySelector("#episodeDiv");

// DISPLAYING NUMBER OF EPISODES
const episodeNumber = document.querySelector("#episodeNumber");

let allEpisodes = getAllEpisodes();

function getURLId(id) {
  return `https://api.tvmaze.com/shows/${id}/episodes`;
}

/**
 * WHAT NEEDS TO BE DONE
 * Fix showID bug to avoid showing GoT only
 * Fix search episode option  as it only shows GoT episodes
 * Make show dropdown show in alphabetical order
 * Get page to display show title based on show selected
 */

// FETCH FUNCTION FOR EPISODES

// async function fetchInfo(showID) {
//   try {
//     const response = await fetch(
//       `https://api.tvmaze.com/shows/${showID}/episodes`
//     );
//     allEpisodes = await response.json();
//     displayEpisodes(allEpisodes);
//     search(allEpisodes);
//     select(allEpisodes);
//   } catch (error) {
//     console.log(error);
//   }
// }

async function setup() {
  const allShows = getAllShows();
  selectShow(allShows);

  try {
    const url = getURLId(82);
    const response = await fetch(url);
    const data = await response.json();
    allEpisodes = data;
    displayEpisodes(allEpisodes);
    search(allEpisodes);
    createSelectDropdown(allEpisodes);
    const showTitle = allShows.find((show) => show.id === 82);
    title.innerText = showTitle.name;
  } catch (error) {
    console.log(error);
  }
}

//SEARCH INPUT FUNCTION
function search(episodes) {
  const searchInput = document.querySelector("#searchInput");

  episodeNumber.innerText = `Displaying ${episodes.length} episode(s)`;

  searchInput.oninput = (e) => {
    let value = e.target.value.toLowerCase();
    const filteredEpisodes = episodes.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(value) ||
        episode.summary.toLowerCase().includes(value)
      );
    });
    console.log(filteredEpisodes);
    displayEpisodes(filteredEpisodes);
    episodeNumber.innerText = `Displaying ${filteredEpisodes.length} / ${episodes.length} episode(s)`;
  };
}

// SELECT FUNCTION FOR DROPDOWN
function createSelectDropdown(episodes) {
  const select = document.querySelector("#select");
  select.innerHTML = "";

  for (let eachEpisode of episodes) {
    const option = document.createElement("option");
    select.appendChild(option);

    option.value = eachEpisode.id;

    const episodeSeason = eachEpisode.season;
    const episodeNumber = eachEpisode.number;
    const episodeCode = `S${String(episodeSeason).padStart(2, "0")}: E${String(
      episodeNumber
    ).padStart(2, "0")}`;

    option.innerText = `${episodeCode} - ${eachEpisode.name}`;
  }
  episodeNumber.innerText = `Displaying ${episodes.length} episode(s)`;

  select.addEventListener("change", (event) => {
    const episodeId = Number(event.target.value);
    // let episodeElement = document.getElementById(`${episodeId}`);
    // episodeElement.scrollIntoView();
    const episodeElement = episodes.find((episode) => episode.id === episodeId);
    if (episodeElement) {
      displayEpisodes([episodeElement]);
      episodeNumber.innerText = `Displaying ${[episodeElement].length} / ${
        episodes.length
      } episode(s)`;
    } else {
      displayEpisodes(episodes);
      episodeNumber.innerText = `Displaying ${episodes.length} episode(s)`;
    }
  });
}

// FUNCTION TO DISPLAY EPISODES

function displayEpisodes(episodeList) {
  episodeDiv.innerHTML = " ";

  for (let eachEpisode of episodeList) {
    const episodeSection = document.createElement("section");
    episodeDiv.appendChild(episodeSection);
    episodeSection.setAttribute("class", "box");
    episodeSection.setAttribute("id", `${eachEpisode.id}`);

    const episodeImage = document.createElement("img");
    episodeImage.src = eachEpisode.image ? eachEpisode.image.medium : "";
    episodeSection.appendChild(episodeImage);

    const episodeName = document.createElement("h2");
    episodeName.innerText = eachEpisode.name;
    episodeSection.appendChild(episodeName);

    const episodeSeason = eachEpisode.season;

    const episodeNumber = eachEpisode.number;

    const episodeCode = document.createElement("p");
    episodeCode.innerText = `S${String(episodeSeason).padStart(
      2,
      "0"
    )}: E${String(episodeNumber).padStart(2, "0")}`;
    episodeCode.setAttribute("id", "code");

    episodeSection.appendChild(episodeCode);

    const episodeSummary = document.createElement("p");

    episodeSummary.innerHTML = eachEpisode.summary;

    episodeSection.appendChild(episodeSummary);
  }
}

//LEVEL 400 FOR DIFFERENT SHOWS

function selectShow(shows) {
  shows.sort((a, b) => (a.name > b.name ? 1 : -1));

  const select = document.querySelector("#selectShow");

  for (let eachShow of shows) {
    const option = document.createElement("option");
    select.appendChild(option);

    option.value = eachShow.id;
    option.innerText = eachShow.name;
  }

  select.addEventListener("change", async (event) => {
    const showId = Number(event.target.value);

    const fetchFromUrl = getURLId(showId);
    console.log(fetchFromUrl);
    try {
      const response = await fetch(fetchFromUrl);
      const data = await response.json();
      allEpisodes = data;
      displayEpisodes(allEpisodes);
      createSelectDropdown(allEpisodes);
      search(allEpisodes);
      const showTitle = shows.find((show) => show.id === showId);
      title.innerText = showTitle.name;
    } catch (error) {
      console.log(error);
    }
  });
}

// SETUP TO SHOW PAGE
// async function setup() {
//   fetchEpisodes();
//   search();

//   displayEpisodes();

//   select();
// }

window.onload = setup;
