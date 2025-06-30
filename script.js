
        // Authentication variables
        const ADMIN_USERNAME = 'azm.admin';
        const ADMIN_PASSWORD = 'azm@1248';
        
        // Check if user is already logged in
        function checkAuth() {
            const isLoggedIn = sessionStorage.getItem('isLoggedIn');
            if (isLoggedIn === 'true') {
                // Redirect to dashboard page
                window.location.href = 'dashboard/';
            }
        }
        
        // Handle login form submission
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            
            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                sessionStorage.setItem('isLoggedIn', 'true');
                // Redirect to dashboard page
                window.location.href = 'dashboard/';
            } else {
                errorMessage.style.display = 'block';
                // Clear password field
                document.getElementById('password').value = '';
                
                // Hide error message after 3 seconds
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 3000);
            }
        });
        
        // Initialize authentication check on page load
        window.addEventListener('load', checkAuth);