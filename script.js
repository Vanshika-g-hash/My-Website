const sliders = [
    "cleanEnergy",
    "efficiency",
    "transport",
    "nature"
];

function updateScenario() {

    const clean = Number(
        document.getElementById("cleanEnergy").value
    );

    const efficiency = Number(
        document.getElementById("efficiency").value
    );

    const transport = Number(
        document.getElementById("transport").value
    );

    const nature = Number(
        document.getElementById("nature").value
    );


    document.getElementById("cleanValue").textContent =
        clean + "%";

    document.getElementById("efficiencyValue").textContent =
        efficiency + "%";

    document.getElementById("transportValue").textContent =
        transport + "%";

    document.getElementById("natureValue").textContent =
        nature + "%";


    /*
       Calculate an illustrative climate-pressure score.
       This is NOT a scientific climate model.
    */

    const actionScore =
        (clean +
        efficiency +
        transport +
        nature) / 4;

    const climateScore =
        Math.round(100 - actionScore);


    document.getElementById("climateScore")
        .textContent = climateScore;


    document.getElementById("progressBar")
        .style.width = climateScore + "%";


    let message;

    if (climateScore < 30) {

        message =
            "Strong climate action scenario.";

    } else if (climateScore < 60) {

        message =
            "Moderate progress. More action can reduce future pressure.";

    } else {

        message =
            "Higher climate pressure. Increasing climate action can improve the scenario.";
    }


    document.getElementById("scenarioMessage")
        .textContent = message;
}


sliders.forEach(id => {

    document
        .getElementById(id)
        .addEventListener("input", updateScenario);

});


updateScenario();

const ctx =
    document.getElementById("warmingChart");

const warmingChart = new Chart(ctx, {

    type: "line",

    data: {

        labels: [
            "1990",
            "2000",
            "2010",
            "2020",
            "2030",
            "2040",
            "2050"
        ],

        datasets: [

            {
                label: "Current Path",

                data: [
                    0.18,
                    0.27,
                    0.37,
                    0.49,
                    0.62,
                    0.76,
                    0.91
                ],

                borderWidth: 3,

                tension: 0.35
            },

            {
                label: "Lower Emissions",

                data: [
                    0.18,
                    0.25,
                    0.32,
                    0.38,
                    0.43,
                    0.48,
                    0.52
                ],

                borderWidth: 3,

                tension: 0.35
            }

        ]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                position: "bottom"
            }

        },

        scales: {

            y: {
                title: {
                    display: true,
                    text: "Temperature anomaly index"
                }
            },

            x: {
                title: {
                    display: true,
                    text: "Year"
                }
            }

        }

    }

});

// Get the scenario sliders
const clean = document.getElementById("clean");
const efficiency = document.getElementById("eff");
const transport = document.getElementById("transport");
const nature = document.getElementById("nature");

// Get the displayed percentage values
const cleanOut = document.getElementById("cleanOut");
const efficiencyOut = document.getElementById("effOut");
const transportOut = document.getElementById("transportOut");
const natureOut = document.getElementById("natureOut");

// Get dashboard signal elements
const signal = document.getElementById("signal");
const signalBar = document.getElementById("signalBar");

// Update scenario
function updateScenario() {

    // Get current slider values
    const cleanValue = Number(clean.value);
    const efficiencyValue = Number(efficiency.value);
    const transportValue = Number(transport.value);
    const natureValue = Number(nature.value);

    // Show slider percentages
    cleanOut.value = cleanValue + "%";
    efficiencyOut.value = efficiencyValue + "%";
    transportOut.value = transportValue + "%";
    natureOut.value = natureValue + "%";

    /*
      Different importance for each scenario:

      Clean Energy      = 35%
      Efficiency        = 25%
      Transport Shift   = 20%
      Nature Protection = 20%
    */

    const cleanWeight = 0.35;
    const efficiencyWeight = 0.25;
    const transportWeight = 0.20;
    const natureWeight = 0.20;

    // Calculate overall scenario score
    const scenarioScore =
        (cleanValue * cleanWeight) +
        (efficiencyValue * efficiencyWeight) +
        (transportValue * transportWeight) +
        (natureValue * natureWeight);

    // Convert score into an illustrative warming-pressure ratio
    const ratio = (2.35 - (scenarioScore / 100) * 1.35).toFixed(1);

    // Update dashboard signal
    signal.textContent = ratio + "×";

    // Update progress bar
    const barWidth = 35 + (scenarioScore / 100) * 55;
    signalBar.style.width = barWidth + "%";
}


// Listen for changes on every slider
clean.addEventListener("input", updateScenario);
efficiency.addEventListener("input", updateScenario);
transport.addEventListener("input", updateScenario);
nature.addEventListener("input", updateScenario);


// Run once when the website loads
updateScenario();

const themeToggle = document.getElementById("themeToggle");

// Check saved theme
const savedTheme = localStorage.getItem("climateTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}




// Climate Driver Explore buttons
document.querySelectorAll("[data-explore]").forEach(button => {

    button.addEventListener("click", () => {

        const infoId = button.dataset.explore + "Info";
        const info = document.getElementById(infoId);

        const isOpen = !info.hidden;

        info.hidden = isOpen;

        if (isOpen) {
            button.textContent = "Explore";
            button.setAttribute("aria-expanded", "false");
        } else {
            button.textContent = "Hide information";
            button.setAttribute("aria-expanded", "true");
        }

    });

});

