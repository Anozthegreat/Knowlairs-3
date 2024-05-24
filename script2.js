// script.js

document.addEventListener('DOMContentLoaded', (event) => {
    const modeToggleBtn = document.getElementById('mode-toggle');
    const body = document.body;

    // Check if the user already has a preferred mode
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        modeToggleBtn.textContent = 'Light Mode';
    } else {
        modeToggleBtn.textContent = 'Dark Mode';
    }

    // Add an event listener to the button
    modeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
            modeToggleBtn.textContent = 'Light Mode';
        } else {
            localStorage.setItem('dark-mode', 'disabled');
            modeToggleBtn.textContent = 'Dark Mode';
        }
    });
});