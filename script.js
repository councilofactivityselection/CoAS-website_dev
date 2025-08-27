// script.js
// This script handles the login functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const loginBtn = document.getElementById('loginBtn');
    const modal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');
    
    // Hardcoded password (in a real application, this would be handled server-side)
    const CORRECT_PASSWORD = "CoAS2023";
    
    // Open modal when login button is clicked
    loginBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
    });
    
    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        errorMsg.style.display = 'none';
        loginForm.reset();
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            errorMsg.style.display = 'none';
            loginForm.reset();
        }
    });
    
    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const passwordInput = document.getElementById('password').value;
        
        // Check if password is correct
        if (passwordInput === CORRECT_PASSWORD) {
            // Success - redirect to members page (for demonstration, we'll just show an alert)
            alert("Login successful! Redirecting to members page...");
            // In a real implementation: window.location.href = "members.html";
            modal.style.display = 'none';
            loginForm.reset();
        } else {
            // Show error message
            errorMsg.textContent = "Incorrect password. Please try again.";
            errorMsg.style.display = 'block';
        }
    });
});