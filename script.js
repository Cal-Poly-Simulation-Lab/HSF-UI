
async function fetchAndDisplayXMLTable() {
    document.body.innerHTML.concat("Hello there")
    try {

        const response = await fetch('DSAC_Static.xml'); 
        const xmlText = await response.text();
        const parser = new DOMParser(); // change parser
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        const xmlTable = document.getElementById('xml-table');
        const tableBody = document.createElement('tbody');

        const rows = xmlDoc.querySelectorAll('Row');
        rows.forEach(rowElement => {
            const row = document.createElement('tr');
            const cells = rowElement.querySelectorAll('Cell');

            cells.forEach(cellElement => {
                const cell = document.createElement('td');
                const cellType = cellElement.querySelector('Data').getAttribute('ss:Type');
                const cellValue = cellElement.querySelector('Data').textContent;

                if (cellType === 'Number') {
                    cell.textContent = parseFloat(cellValue).toFixed(2); // Formatting numeric value
                } else {
                    cell.textContent = cellValue;
                }

                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        });

        xmlTable.appendChild(tableBody);
    } catch (error) {
        console.error('Error fetching or parsing XML:', error);
    }
}

window.onload = fetchAndDisplayXMLTable();

fetchAndDisplayXMLTable();


// For subsystems
const subsystems = [];

function displaySubsystems() {
    const subsystemGrid = document.getElementById("subsystemGrid");
    subsystemGrid.innerHTML = "";

    subsystems.forEach(subsystem => {
        const subsystemElement = document.createElement("div");
        subsystemElement.textContent = subsystem.name;
        subsystemElement.classList.add("subsystem");
        subsystemElement.addEventListener("click", () => displayProperties(subsystem));
        subsystemGrid.appendChild(subsystemElement);
    });
}

function displayProperties(subsystem) {
    const propertyGrid = document.getElementById("propertyGrid");
    propertyGrid.innerHTML = "";

    const attributesLabel = document.createElement("h3");
    attributesLabel.textContent = "Attributes:";
    propertyGrid.appendChild(attributesLabel);

    subsystem.attributes.forEach(attribute => {
        const attributeLabel = document.createElement("label");
        attributeLabel.textContent = `${attribute.name}: `;
        const attributeInput = document.createElement("input");
        attributeInput.value = attribute.value;
        attributeInput.addEventListener("input", () => attribute.value = attributeInput.value);
        propertyGrid.appendChild(attributeLabel);
        propertyGrid.appendChild(attributeInput);
        propertyGrid.appendChild(document.createElement("br"));
    });

    const statesLabel = document.createElement("h3");
    statesLabel.textContent = "States:";
    propertyGrid.appendChild(statesLabel);

    subsystem.states.forEach(state => {
        const stateLabel = document.createElement("label");
        stateLabel.textContent = `${state.name}: `;
        const stateInput = document.createElement("input");
        stateInput.value = state.value;
        stateInput.addEventListener("input", () => state.value = stateInput.value);
        propertyGrid.appendChild(stateLabel);
        propertyGrid.appendChild(stateInput);
        propertyGrid.appendChild(document.createElement("br"));
    });
}

function saveChanges() {
    // In a real scenario, save the changes to a backend server or file
    console.log("Changes saved:", subsystems);
}

function addSubsystem() {
    const newSubsystem = {
        name: "New Subsystem",
        attributes: [],
        states: []
    };
    subsystems.push(newSubsystem);
    displaySubsystems();
}

// Mock data for demonstration purposes
subsystems.push({
    name: "Subsystem 1",
    attributes: [
        { name: "Attribute 1", value: "Value 1" },
        { name: "Attribute 2", value: "Value 2" }
    ],
    states: [
        { name: "State 1", value: "Active" },
        { name: "State 2", value: "Inactive" }
    ]
});

subsystems.push({
    name: "Subsystem 2",
    attributes: [
        { name: "Attribute A", value: "Value A" },
        { name: "Attribute B", value: "Value B" }
    ],
    states: [
        { name: "State X", value: "On" },
        { name: "State Y", value: "Off" }
    ]
});

displaySubsystems();

document.getElementById("saveButton").addEventListener("click", saveChanges);
document.getElementById("addSubsystemButton").addEventListener("click", addSubsystem);