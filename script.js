const dateDisplay = document.querySelector("#currentDay");

const timeBlockContainer = document.querySelector(".container");

const date = new Date();
dateDisplay.innerHTML = `${date.toString()}`;
console.log(date.getHours());

const timeBlocks = function () {
  for (let i = 0; i <= 11; i++) {
    dateRow = document.createElement("div");
    dateRow.className = "row";
    dateRow.setAttribute("id", i);

    dateBlock = document.createElement("div");
    dateBlock.className = "hour";

    dateText = document.createElement("textarea");
    if (date.getHours() === i) {
      dateText.className =  "present";
    } else if (date.getHours() > i) {
      dateText.className = "past";
    } else {
      dateText.className = "future";
    }

    if (notes[i]) {
        dateText.innerHTML = notes[i];
    }

    dateBtn = document.createElement("button");
    dateBtn.className = "saveBtn";
    dateBtn.innerHTML = "Save";

    if (i === 0) {
      dateBlock.textContent = `12:00 AM`;
    } else if (i < 10) {
      dateBlock.textContent = `0${i}:00 AM`;
    } else {
      dateBlock.textContent = `${i}:00 AM`;
    }

    dateRow.appendChild(dateBlock);
    dateRow.appendChild(dateText);
    dateRow.appendChild(dateBtn);
    timeBlockContainer.appendChild(dateRow);
  }
  for (let i = 0; i <= 11; i++) {
    dateRow = document.createElement("div");
    dateRow.className = "row";
    dateRow.setAttribute("id", i+12);

    dateBlock = document.createElement("div");
    dateBlock.className = "hour";

    dateText = document.createElement("textarea");
    if (date.getHours()-12 === i) {
      dateText.className = "present";
    } else if (date.getHours()-12 > i) {
      dateText.className = "past";
    } else {
      dateText.className = "future";
    }

    dateBtn = document.createElement("button");
    dateBtn.className = "saveBtn";
    dateBtn.innerHTML = "Save";

    if (i === 0) {
      dateBlock.textContent = `12:00 PM`;
    } else if (i < 10) {
      dateBlock.textContent = `0${i}:00 PM`;
    } else {
      dateBlock.textContent = `${i}:00 PM`;
    }

    if (notes[i+12]) {
        dateText.innerHTML = notes[i+12];
    }

    dateRow.appendChild(dateBlock);
    dateRow.appendChild(dateText);
    dateRow.appendChild(dateBtn);
    timeBlockContainer.appendChild(dateRow);
  }
};

const loadStoredNotes = function() {
    notes = localStorage.getItem("timeNotes");
    console.log("Got notes");
    console.log(notes);

    if (!notes) {
        notes = [];
        return false;
    }

    notes = JSON.parse(notes);
}

const handleButtonClick = function(event) {
    event.preventDefault();

    console.log("hello");

    if (event.target.matches(".saveBtn")){
        console.log('save button pressed');
        parentEl = event.target.parentElement;
        textEntry = parentEl.querySelector("textarea").value;
        if(textEntry){
            console.log(notes);
            notes[parseInt(parentEl.getAttribute("id"))];
            loadStoredNotes();
        }
    }
}

loadStoredNotes();
timeBlocks();

timeBlockContainer.addEventListener("click", handleButtonClick);