const searchInput = document.querySelector("#survey-search");
const categoryButtons = [...document.querySelectorAll("[data-category]")].filter(
  (element) => element.tagName === "BUTTON",
);
const surveyCards = [...document.querySelectorAll(".survey-card")];
const surveyGrid = document.querySelector("#survey-grid");
const emptyState = document.querySelector("#empty-state");
const resultCount = document.querySelector("#results-count");
const resultWord = document.querySelector("#results-word");
const resetButton = document.querySelector("#reset-filters");
const emptyResetButton = document.querySelector("#empty-reset");

let activeCategory = "الكل";

function updateSurveys() {
  const query = searchInput.value.trim().toLocaleLowerCase("ar");
  let visibleCount = 0;

  surveyCards.forEach((card) => {
    const categoryMatches =
      activeCategory === "الكل" || card.dataset.category === activeCategory;
    const searchText = `${card.dataset.search} ${card.textContent}`.toLocaleLowerCase("ar");
    const searchMatches = !query || searchText.includes(query);
    const isVisible = categoryMatches && searchMatches;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  resultCount.textContent = String(visibleCount);
  resultWord.textContent = visibleCount === 1 ? "استبيان" : "استبيانات";
  surveyGrid.hidden = visibleCount === 0;
  emptyState.hidden = visibleCount !== 0;
  resetButton.hidden = activeCategory === "الكل" && !query;
}

function chooseCategory(category, shouldScroll = true) {
  activeCategory = category;
  categoryButtons.forEach((button) => {
    const isActive = button.dataset.category === category;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  updateSurveys();

  if (shouldScroll && category !== "الكل") {
    window.setTimeout(() => {
      surveyGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }
}

function resetFilters() {
  searchInput.value = "";
  chooseCategory("الكل", false);
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => chooseCategory(button.dataset.category));
});

searchInput.addEventListener("input", updateSurveys);
resetButton.addEventListener("click", resetFilters);
emptyResetButton.addEventListener("click", resetFilters);
