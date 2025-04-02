    document.addEventListener("DOMContentLoaded", function () {
      const loginRadio = document.getElementById("login");
      const signupRadio = document.getElementById("signup");
      const submitBtn = document.getElementById("submit-btn");
  
      function updateButtonText() {
        submitBtn.value = loginRadio.checked ? "Login" : "SignUp";
      }
  
      // Event listeners for toggling
      loginRadio.addEventListener("change", updateButtonText);
      signupRadio.addEventListener("change", updateButtonText);
  
      // Set initial button text on page load
      updateButtonText();
    });

    document.addEventListener("DOMContentLoaded", function () {
      const loginRadio = document.getElementById("login");
      const signupRadio = document.getElementById("signup");
      const submitBtns = document.querySelectorAll(".btn input");
      const signupLink = document.querySelector(".signup-link");
      const passLink = document.querySelector(".pass-link");
      
      function validateEmail(email) {
        return email.endsWith("@gmail.com");
      }
      
      function validatePassword(password) {
        const specialCharRegex = /[^A-Za-z0-9]/g;
        const uppercaseRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;
        const specialCharMatch = password.match(specialCharRegex);
        const hasOneSpecialChar = specialCharMatch && specialCharMatch.length === 1;
        return uppercaseRegex.test(password) && numberRegex.test(password) && hasOneSpecialChar;
      }
      
      
      
      
      function showErrorMessage(element, message) {
        let errorSpan = element.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error")) {
          errorSpan = document.createElement("span");
          errorSpan.classList.add("error");
          errorSpan.style.color = "red";
          errorSpan.style.fontSize = "12px";
          errorSpan.style.display = "block";
          element.parentNode.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
      }
      
      function clearErrorMessage(element) {
        let errorSpan = element.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("error")) {
          errorSpan.remove();
        }
      }
      
      submitBtns.forEach((btn) => {
        btn.addEventListener("click", function (event) {
          const form = btn.closest("form");
          const emailInput = form.querySelector("input[type='text']");
          const passwordInput = form.querySelector("input[type='password']");
          const confirmPasswordInput = form.querySelector("input[type='password']:nth-of-type(2)");
          let valid = true;
          
          if (!validateEmail(emailInput.value)) {
            showErrorMessage(emailInput, "Email must end with @gmail.com");
            valid = false;
          } else {
            clearErrorMessage(emailInput);
          }
          
          if (!validatePassword(passwordInput.value)) {
            showErrorMessage(passwordInput, "Password must have 1 uppercase, 1 number, and 1 special character only");
            valid = false;
          } else {
            clearErrorMessage(passwordInput);
          }
          
          if (form.classList.contains("signup") && confirmPasswordInput) {
            if (passwordInput.value !== confirmPasswordInput.value) {
              showErrorMessage(confirmPasswordInput, "Passwords do not match");
              valid = false;
            } else {
              clearErrorMessage(confirmPasswordInput);
            }
          }
          
          if (!valid) {
            event.preventDefault();
          }
        });
      });
      
      function toggleLinks() {
        if (loginRadio.checked) {
          signupLink.style.display = "block";
          passLink.style.display = "block";
        } else {
          signupLink.style.display = "none";
          passLink.style.display = "none";
        }
      }
      loginRadio.addEventListener("change", toggleLinks);
      signupRadio.addEventListener("change", toggleLinks);
      toggleLinks();
    });

    document.addEventListener("DOMContentLoaded", function () {
  const createAccountLink = document.getElementById("create-account");
  const loginRadio = document.getElementById("login");
  const signupRadio = document.getElementById("signup");
  const formInner = document.querySelector(".form-inner");
  const passwordInput = document.querySelector(".signup input[type='password']");
  
  // Password rules
  const passwordRules = document.createElement("p");
  passwordRules.textContent = "Password must contain at least: 1 uppercase letter, 1 number, and exactly 1 special character.";
  passwordRules.style.color = "#26355D";
  passwordRules.style.fontSize = "12px";
  passwordRules.style.marginTop = "5px";

  // Append password rules below the password field in SignUp
  passwordInput.parentNode.appendChild(passwordRules);

  // Switch to SignUp when clicking "Create One!"
  createAccountLink.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent page refresh
    signupRadio.checked = true; // Check the SignUp radio button
    formInner.style.transform = "translateX(-50%)"; // Show SignUp form
  });

  // Handle the radio button click to move the form
  loginRadio.addEventListener("change", function () {
    formInner.style.transform = "translateX(0)"; // Show Login form
  });

  signupRadio.addEventListener("change", function () {
    formInner.style.transform = "translateX(-50%)"; // Show SignUp form
  });
});