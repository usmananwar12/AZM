document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn'); // Navigation buttons
    const pages = document.querySelectorAll('.page'); // All page sections

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPage = button.getAttribute('data-page'); // Get target page from data-page

            // Hide all pages
            pages.forEach(page => {
                page.classList.add('hidden'); // Add hidden class
            });

            // Show the target page
            const activePage = document.getElementById(`${targetPage}-page`);
            if (activePage) {
                activePage.classList.remove('hidden'); // Remove hidden class
            }
        });
    });
});
