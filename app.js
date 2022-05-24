// Fetch elements from the DOM
const colorSchemeEl = document.getElementById('color-scheme');
const colorSchemeBtn = document.getElementById('scheme-btn');
const colorsDiv = document.querySelector('.rectangle-area');
const hexFooterEl = document.querySelector('.hex-footer');
const colorPickerEl = document.getElementById('color-picker');
const lightColorPickerEl = document.getElementById('light-color-picker');

// Fetch the hex code from the color-picker
let hexCode = colorPickerEl.value.slice(1);

// Colors API
lightColorPickerEl.style.border = `2px solid #${hexCode}`;
// lightColorPickerEl.style.border = `2px solid black`;

// Set default mode to 'monochrome'
let modeString = 'monochrome';

// Show colors when the page loads
fillColors()

// Add click event to color-scheme button
colorSchemeBtn.addEventListener('click', fillColors)

// Function to load colors
function fillColors(){
    // Extract hex code from the color picker and remove '#' symbol
    hexCode = colorPickerEl.value.slice(1);

    // Get mode 
    modeString = colorSchemeEl.value;
    
    // Create url based on the current mode string value
    const url = `https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${modeString}&count=5`;

    // Colors API 'GET' request
    fetch(url)
        .then(res => res.json())
        .then(data => {
            lightColorPickerEl.style.border = `2px solid #${hexCode}`;
            const { colors } = data;

            // Create an arrya of hex color codes
            const hexColorCodes = [];
            colors.forEach((color) => {
                hexColorCodes.push(color.hex.value);
            });
            
            // Clear color scheme and hex footer divs
            colorsDiv.innerHTML = '';
            hexFooterEl.innerHTML = '';

            // Update the DOM with colors and hex-codes
            for(let color of hexColorCodes){
                const div = document.createElement('div');
                div.className = 'single-color';
                div.style.backgroundColor = color;
                colorsDiv.appendChild(div);

                // Update hex-footer
                const hexCodeDiv = document.createElement('div');
                hexCodeDiv.className = 'hex-code';
                hexCodeDiv.textContent = color; 
                hexFooterEl.appendChild(hexCodeDiv);         
            }   
        })
}

