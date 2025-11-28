// DOM Elements
const topicInput = document.getElementById("topicInput");
const generateBtn = document.getElementById("generateBtn");
const poemForm = document.getElementById("poemForm");
const loadingSpinner = document.getElementById("loadingSpinner");
const poemDisplay = document.getElementById("poemDisplay");
const poemContent = document.getElementById("poemContent");
const errorMessage = document.getElementById("errorMessage");
const copyBtn = document.getElementById("copyBtn");
const charCount = document.getElementById("charCount");
const tagButtons = document.querySelectorAll(".tag");

// API Endpoint
const API_URL = "http://localhost:3000/generate-poem";

// Update character count
topicInput.addEventListener("input", () => {
  const count = topicInput.value.length;
  charCount.textContent = count > 0 ? `${count} character${count !== 1 ? 's' : ''}` : '';
});

// Handle form submission
poemForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetchPoem();
});

// Handle tag clicks
tagButtons.forEach(button => {
  button.addEventListener("click", () => {
    topicInput.value = button.dataset.topic;
    charCount.textContent = `${topicInput.value.length} characters`;
    fetchPoem();
  });
});

// Copy button functionality
copyBtn.addEventListener("click", () => {
  const text = poemContent.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 2000);
  }).catch(() => {
    alert("Failed to copy poem");
  });
});

// Fetch poem from backend
async function fetchPoem() {
  const topic = topicInput.value.trim();

  if (!topic) {
    showError("Please enter a topic to generate a poem.");
    return;
  }

  if (topic.length < 2) {
    showError("Topic must be at least 2 characters long.");
    return;
  }

  // Show loading state
  hideError();
  showLoading();
  hidePoem();
  generateBtn.disabled = true;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ topic })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.poem) {
      // Simulate thinking time for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      displayPoem(data.poem);
    } else {
      showError("No poem generated. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    showError(`Failed to generate poem: ${error.message}. Make sure the server is running!`);
  } finally {
    hideLoading();
    generateBtn.disabled = false;
  }
}

// UI Helper Functions
function showLoading() {
  loadingSpinner.classList.remove("hidden");
}

function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

function displayPoem(poem) {
  poemContent.textContent = poem;
  poemDisplay.classList.remove("hidden");
}

function hidePoem() {
  poemDisplay.classList.add("hidden");
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function hideError() {
  errorMessage.classList.add("hidden");
}

// Initialize
console.log("AI Poem Generator loaded successfully!");
