// Select elements
const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const resultBox = document.getElementById("resultBox");

// AI poem generator (fake for now)
function generatePoem(topic) {
  const poems = [
    `Whispers of ${topic} in the evening air,\nSoft melodies drifting everywhere.\nThe world slows down, the stars appear,\nA gentle moment, calm and clear.`,

    `${topic} dances in the morning light,\nA golden spark, warm and bright.\nThrough quiet winds it softly glows,\nA secret only nature knows.`,

    `In the heart of ${topic}, a story lies,\nPainted beneath the open skies.\nEach breath it takes, each silent plea,\nA verse released to set it free.`,

    `${topic} blooms like a quiet song,\nCarried by the wind along.\nIts rhythm gentle, pure, and true,\nA poem written just for you.`,
  ];

  // pick a random poem
  const randomIndex = Math.floor(Math.random() * poems.length);
  return poems[randomIndex];
}

// Button click
generateBtn.addEventListener("click", () => {
  const topic = promptInput.value.trim();

  if (topic === "") {
    resultBox.textContent = "Please type a topic first.";
    return;
  }

  resultBox.textContent = "Generating poem...";
  
  setTimeout(() => {
    const poem = generatePoem(topic);
    resultBox.textContent = poem;
  }, 800); // small delay for “AI effect”
});