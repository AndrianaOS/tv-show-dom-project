//You can edit ALL of the code here
//VARIABLE FOR BODY
const episodeArea = document.querySelector("body");

// VARIABLE FOR DIV
const rootElem = document.querySelector("root");

// VARIABLE FOR DIV HOUSING EPISODE SECTIONS
const episodeDiv = document.createElement("div");
episodeArea.appendChild(episodeDiv);
episodeDiv.setAttribute("class", "show-episodes");

// DISPLAYING NUMBER OF EPISODES
const episodeNumber = document.querySelector("#episodeNumber");

const allEpisodes = getAllEpisodes();

// FETCH FUNCTION FOR EPISODES

async function setup() {
  try {
    const response = await fetch("https://api.tvmaze.com/shows/82/episodes");
    const objectResponse = await response.json();
    displayEpisodes(objectResponse);
    search(objectResponse);
    select(objectResponse);
  } catch (error) {
    console.log(error);
  }
}

//SEARCH INPUT FUNCTION
function search(episodes) {
  const searchInput = document.querySelector("#searchInput");

  episodeNumber.innerText = `Displaying ${episodes.length} episode(s)`;

  searchInput.addEventListener("keyup", (e) => {
    let value = e.target.value.toLowerCase();
    const filteredEpisodes = episodes.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(value) ||
        episode.summary.toLowerCase().includes(value)
      );
    });
    console.log(filteredEpisodes);
    displayEpisodes(filteredEpisodes);
    episodeNumber.innerText = `Displaying ${filteredEpisodes.length} / ${allEpisodes.length} episode(s)`;
  });
}

// SELECT FUNCTION FOR DROPDOWN
function select(episodes) {
  const select = document.querySelector("#select");

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

  select.addEventListener("change", (event) => {
    const episodeId = event.target.value;
    const episodeElement = document.querySelector(`#episode-${episodeId}`);
    episodeElement.scrollIntoView();
  });
}

// FUNCTION TO DISPLAY EPISODES

function displayEpisodes(episodeList) {
  document.querySelector(".show-episodes").innerHTML = " ";

  for (let eachEpisode of episodeList) {
    const episodeSection = document.createElement("section");
    episodeDiv.appendChild(episodeSection);
    episodeSection.setAttribute("class", "box");
    episodeSection.setAttribute("id", `episode-${eachEpisode.id}`);

    const episodeImage = document.createElement("img");
    episodeImage.src = eachEpisode.image.medium;
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

// SETUP TO SHOW PAGE
// async function setup() {
//   fetchEpisodes();
//   search();

//   displayEpisodes();

//   select();
// }

window.onload = setup;
