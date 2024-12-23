document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn'); // Navigation buttons
    const pages = document.querySelectorAll('.page'); // All page sections

    // Function to switch pages
    const switchPage = (pageId) => {
        pages.forEach(page => page.classList.add('hidden')); // Hide all pages
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.remove('hidden'); // Show the target page
        }
    };

    // Event listeners for navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pageId = button.getAttribute('data-page'); // Get target page ID
            switchPage(pageId); // Call the switchPage function
        });
    });

    // Handle specific service navigation
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            const servicePageId = item.getAttribute('onclick').match(/'(.*?)'/)[1]; // Extract servicePageId
            switchPage(servicePageId); // Switch to the service page
        });
    });
});

