const signupForm = document.getElementById("signupForm");

if (signupForm) {
  
  signupForm.addEventListener("submit", async function(e) {
    
    e.preventDefault();
    
    const nameInput = document.getElementById("name");
    
    if (!nameInput) {
      alert("Name input नहीं मिला।");
      return;
    }
    
    const name = nameInput.value.trim();
    
    if (name === "") {
      alert("कृपया अपना नाम डालें।");
      return;
    }
    
    // Submit button
    const submitButton = signupForm.querySelector(
      'button[type="submit"], input[type="submit"]'
    );
    
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Please wait...";
    }
    
    try {
      
      // Web3Forms के लिए पूरा form data
      const formData = new FormData(signupForm);
      
      // Web3Forms API
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData
        }
      );
      
      const result = await response.json();
      
      // अगर Web3Forms ने successfully data receive किया
      if (result.success) {
        
        // Name Local Storage में save करो
        localStorage.setItem("userName", name);
        
        // Index page पर जाओ
        window.location.href = "index.html";
        
      } else {
        
        alert(
          "Form submit नहीं हो पाया।\n\n" +
          (result.message || "Web3Forms error")
        );
        
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Sign Up";
        }
      }
      
    } catch (error) {
      
      console.error("Web3Forms Error:", error);
      
      alert(
        "Server से connection नहीं हो पाया।\n\n" +
        "कृपया Internet connection check करके दोबारा try करें।"
      );
      
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Sign Up";
      }
    }
    
  });
}


// ========================================
// INDEX PAGE
// ========================================

const signupButton = document.getElementById("signup");
const greeting = document.getElementById("greeting");

const savedName = localStorage.getItem("userName");


// ========================================
// USER ALREADY SIGNED UP
// ========================================

if (savedName) {
  
  // Greeting बदलो
  if (greeting) {
    
    greeting.textContent =
      `Hello ${savedName}, What do you want to learn today?`;
    
  }
  
  
  // Sign Up button → Sign Out
  if (signupButton) {
    
    signupButton.textContent = "Sign Out";
    
    signupButton.onclick = function() {
      
      // Local Storage से नाम हटाओ
      localStorage.removeItem("userName");
      
      // Guest greeting
      if (greeting) {
        
        greeting.textContent =
          "Hello Guest, What do you want to learn today?";
        
      }
      
      // Button वापस Sign Up
      signupButton.textContent = "Sign Up";
      
      
      // Sign Up page खोलो
      signupButton.onclick = function() {
        
        window.location.href = "signup.html";
        
      };
      
    };
    
  }
  
}


// ========================================
// USER NOT SIGNED UP
// ========================================

else {
  
  if (signupButton) {
    
    signupButton.textContent = "Sign Up";
    
    signupButton.onclick = function() {
      
      window.location.href = "signup.html";
      
    };
    
  }
  
}