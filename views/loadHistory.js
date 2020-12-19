function getTimeOfDay(time) {
    const hour = time.getHours()
    if (hour > 3 && hour < 12) {
        return "breakfast"
    } else if (hour > 11 && hour < 3) {
        return "lunch"
    } else {
        return "dinner"
    }
}

function formatmdy(time) {
    const month = time.getMonth();
    const date = time.getDate()
    const year = time.getFullYear()

    return `${month + 1}/${date}/${year}`
}

function mealTimeHTML(list, nameOfMealTime) {

    const mealsAtTimeContainer = document.createElement("div");
    mealsAtTimeContainer.classList.add(`col`);
    mealsAtTimeContainer.classList.add(`span-1-of-3`);
    mealsAtTimeContainer.classList.add(`${nameOfMealTime}`);

    list = list.map((food) => {
        return `<a href="#"><img src="
    ${food.imgSrc||"https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png"}
    "></a>
    <p>${food.name}</p>
    <p>${food.calories} calories</p>`;
    });

    mealsAtTimeContainer.innerHTML = list.join("");
    return mealsAtTimeContainer;
}


function displayDateEaten(dateHistory) {
    const dateSection = document.createElement("section");
    const mealsAt = {
        breakfast: [],
        lunch: [],
        dinner: [],
    };

    for (var key in mealsAt) {
        if (mealsAt.hasOwnProperty(key)) {
            mealsAt[key] = dateHistory.foodList.filter(
                (food) => food.time === key
            );
        }
    }

    dateSection.innerHTML = `
        <h4 class="date">${dateHistory.date}</h4>
        <div class="row"> 
        </div>`;

    dateSection
        .querySelector("div")
        .appendChild(mealTimeHTML(mealsAt["breakfast"], "breakfast"));
    dateSection
        .querySelector("div")
        .appendChild(mealTimeHTML(mealsAt["lunch"], "lunch"));
    dateSection
        .querySelector("div")
        .appendChild(mealTimeHTML(mealsAt["dinner"], "dinner"));
    console.log(dateSection);
    return dateSection;
}