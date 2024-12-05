function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {pageLanguage: 'en'},
        'google_translate_element'
    );

}

let selectedClimate = null;
let selectedSoil = null;

function selectClimate(climate) {
    // Reset all climate buttons
    const climateButtons = document.querySelectorAll('.climate-buttons .button');
    climateButtons.forEach(button => {
        button.classList.remove('selected');
    });

    // Add 'selected' class to the clicked button
    const selectedButton = document.querySelector(`.climate-buttons .button[onclick="selectClimate('${climate}')"]`);
    selectedButton.classList.add('selected');
    selectedClimate = climate;
}

function selectSoil(soil) {
    // Reset all soil buttons
    const soilButtons = document.querySelectorAll('.soil-buttons .button');
    soilButtons.forEach(button => {
        button.classList.remove('selected');
    });

    // Add 'selected' class to the clicked button
    const selectedButton = document.querySelector(`.soil-buttons .button[onclick="selectSoil('${soil}')"]`);
    selectedButton.classList.add('selected');
    selectedSoil = soil;
}

function recommendCrop() {
    if (selectedClimate && selectedSoil) {
        // Simulate crop recommendation logic
        const crops = {
            tropical: { loamy: 'Rice', sandy: 'Maize', clay: 'Sugarcane' },
            arid: { loamy: 'Wheat', sandy: 'Barley', clay: 'Cotton' },
            temperate: { loamy: 'Potato', sandy: 'Peas', clay: 'Barley' },
            continental: { loamy: 'Oats', sandy: 'Rye', clay: 'Soybean' }
        };

        const crop = crops[selectedClimate][selectedSoil];
        displayRecommendedCrop(crop);
    } else {
        alert("Please select both climate and soil conditions.");
    }
}

function displayRecommendedCrop(crop) {
    const cropSection = document.getElementById('idealCropSection');
    const cropCard = document.createElement('div');
    cropCard.classList.add('crop-card', 'show');
    cropCard.innerHTML = `
        <h4 class="crop-name">" <strong>${crop}</strong> "</h4>
        <p>Best for your selected conditions.</p>
    `;
    cropSection.appendChild(cropCard);
}



function showCropDetails(crop) {
    const modal = document.getElementById('predictionModal');
    const cropName = document.getElementById('cropName');
    const cropPrediction = document.getElementById('cropPrediction');
    const bestConditions = document.getElementById('bestConditions');

    cropName.textContent = crop;
    cropPrediction.textContent = `Detailed prediction for ${crop}.`;
    bestConditions.textContent = `Best soil and climate conditions for ${crop}.`;

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('predictionModal').style.display = "none";
}
let slideIndex = 0; // To track the current slide

// Function to show the slides
function showSlides() {
    const slides = document.querySelectorAll('.slides');
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Hide all slides
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1; // Reset to the first slide if we reach the end
    }
    slides[slideIndex - 1].style.display = "block"; // Show the current slide
}

// Function to change slide when next or prev button is clicked
function changeSlide(n) {
    slideIndex += n;
    const slides = document.querySelectorAll('.slides');
    if (slideIndex > slides.length) {
        slideIndex = 1; // Reset to the first slide if out of bounds
    }
    if (slideIndex < 1) {
        slideIndex = slides.length; // Reset to the last slide if going before the first one
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Hide all slides
    }
    slides[slideIndex - 1].style.display = "block"; // Show the new current slide
}

// Start the slideshow when the page loads
window.onload = function() {
    showSlides(); // Display the first slide initially
    setInterval(showSlides, 5000); // Change slides every 5 seconds automatically
};
