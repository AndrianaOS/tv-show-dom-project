//You can edit ALL of the code here
const episodeArea = document.querySelector("body");

const rootElem = document.querySelector("root");

const episodeDiv = document.createElement("div");
episodeArea.appendChild(episodeDiv);
episodeDiv.setAttribute("class", "show-episodes");

const episodeNumber = document.querySelector("#episodeNumber");

const allEpisodes = getAllEpisodes();

function search() {
  const searchInput = document.querySelector("#searchInput");

  episodeNumber.innerText = `Displaying ${allEpisodes.length} episode(s)`;

  searchInput.addEventListener("keyup", (e) => {
    let value = e.target.value.toLowerCase();
    const filteredEpisodes = allEpisodes.filter((episode) => {
      return episode.name.toLowerCase().includes(value);
    });
    displayEpisodes(filteredEpisodes);
    episodeNumber.innerText = `Displaying ${filteredEpisodes.length} / ${allEpisodes.length} episode(s)`;
  });
}

// function makePageForEpisodes(episodeList) {
//   rootElem.innerHTML = `Got ${episodeList.length} episode(s)`;
// }

function displayEpisodes(episodes) {
  document.querySelector(".show-episodes").innerHTML = " ";

  for (let eachEpisode of episodes) {
    const episodeSection = document.createElement("section");
    episodeDiv.appendChild(episodeSection);
    episodeSection.setAttribute("class", "box");

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

function setup() {
  search();
  // makePageForEpisodes(allEpisodes);

  displayEpisodes(allEpisodes);
}

window.onload = setup;
