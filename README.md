Modern Calculator
A sleek, multi-mode calculator with a cyberpunk-inspired design, featuring simple and scientific modes, dark/light themes, and a history panel. Built with HTML, CSS, and JavaScript, it is responsive and optimized for deployment on GitHub Pages.
Features

Multi-Mode: Starts in simple mode (basic arithmetic) with a toggle to switch to scientific mode (sin, cos, tan, log, etc.).
Dark Mode: Launches in dark theme with pink neon glow, toggleable to light theme with cyan glow.
Unique Design:
Circular buttons with neon glow effects (pink in dark, cyan in light).
Holographic display with cyberpunk gradients.
Staggered button load animation (no slide-up after clicks).


History Panel: Stores calculation history with Clear History and Close buttons.
Minimal Messages: Displays only critical success messages (e.g., "Calculation successful", "Cleared") and error messages (e.g., "Cannot add multiple operators").
Functionality:
Input validation (blocks multiple operators/decimals, invalid scientific functions).
Decimal rounding to 6 places.
Clipboard copy on display click.
Long press DEL (1s) to clear all.
Keyboard support (numbers, operators, Enter, Backspace, etc.).


Responsive: Adapts to mobile (<400px), tablet (<600px), and desktop screens.

Project Structure
modern-calculator/
├── index.html        # Main HTML file
├── style.css         # Styling with cyberpunk design and responsiveness
├── script.js         # JavaScript for calculator logic and interactions
└── assets/           # Optional folder for future assets

Setup

Clone the Repository:
git clone https://github.com/pammu-27/calculator.git
cd modern-calculator


Run Locally:

Option 1: Open index.html in a browser (Chrome, Firefox, Edge).
Option 2: Use a local server for full functionality (e.g., clipboard):npx http-server

Open http://localhost:8080 in your browser.



Usage

Initial State:
Starts in dark mode (pink neon glow) and simple mode (scientific buttons hidden).
Scientific button toggles scientific mode; Light button switches to light theme.


Calculator:
Click buttons or use keyboard (0-9, +, -, *, /, ., Enter, Backspace, etc.).
Long press ⌫ (1s) to clear all.
Click display to copy result to clipboard.


History:
Click History to view past calculations.
Use Clear History to reset or Close to hide the panel.


Scientific Mode:
Toggle to Scientific to use functions like sin, cos, log, etc.
Keyboard shortcuts: s (sin), c (cos), t (tan), l (log), r (√), etc.



Deployment on GitHub Pages

Create Repository:

Create a public repository on GitHub (e.g., modern-calculator).
Push files:git add .
git commit -m "Initial commit: Multi-mode calculator"
git remote add origin https://github.com/pammu-27/calculator.git
git branch -M main
git push -u origin main


Enable GitHub Pages:

Go to repository Settings > Pages.
Set Source to:
Branch: main
Folder: / (root)


Save and wait 5-10 minutes.
Access at: https://pammu-27.github.io/calculator/


Testing

Initial Load:
Verify dark mode (pink glow) and simple mode (no scientific buttons).
Check modeToggle says "Scientific", themeToggle says "Light".


Functionality:
Test calculations (e.g., "1 + 2 =", "sin(0)").
Verify history panel, close button, and clear history.
Check clipboard copy and long press DEL.


Responsiveness:
Test on mobile (<400px), tablet (<600px), and desktop.


Debugging:
Open F12 > Console for logs (e.g., Button clicked: 7) or errors.


Troubleshooting

GitHub Pages Not Loading:
Ensure files are in the repo root.
Check Settings > Pages for correct branch/folder.
Verify deployment in Actions tab.


Functionality Issues:
Share console errors from F12 > Console.
Specify browser (Chrome, Firefox, Edge) and device.


Contact: Open an issue on the repository for support.

License
MIT License. Feel free to use, modify, and distribute.
Acknowledgments
Built with a cyberpunk aesthetic inspired by modern web design trends. Deployed using GitHub Pages for easy access.

Author: Pramod
Live Demo: https://pammu-27.github.io/calculator/
