console.log("Extension writer content script.");

// Creating Reply With AI button
function createAIButton() {
  const button = document.createElement("div");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3 T-I-Zf-aw2";
  button.style.marginRight = "8px";
  button.innerHTML = "AI Reply";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Generate AI Reply");
  return button;
}

// Create a tone dropdown
function createToneDropDown() {
  const button = document.createElement("select");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3 T-I-Zf-aw2";
  button.style.marginRight = "10px";

  const tones = ["professional", "casual", "friendly", "formal"];
  tones.forEach((tone) => {
    const option = document.createElement("option");
    option.value = tone;
    option.textContent = tone.charAt(0).toUpperCase() + tone.slice(1);
    button.appendChild(option);
  });

  return button;
}

// Getting email content for AI response
function getEmailContent() {
  const selectors = [".h7", ".a3s.aiL", "gmail_quote", '[role="presentation"]'];

  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim();
    }
    return "";
  }
}

//function to get toolbar in email reply.
function findComposeToolbar() {
  const selectors = [".btC", ".aDh", '[role="toolbar"]', ".gU.Up"];

  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      return toolbar;
    }
    return null;
  }
}
function injectButton() {
  const existingButton = document.querySelector(".ai-reply-button");
  if (existingButton) existingButton.remove();

  const existingDropdown = document.querySelector(".ai-tone-dropdown");
  if (existingDropdown) existingDropdown.remove();

  const toolbar = findComposeToolbar();

  if (!toolbar) {
    console.log("toolbar not found");
    return;
  }
  console.log("toolbar found, creating one");

  const button = createAIButton();
  button.classList.add("ai-reply-button");

  const toneDropDown = createToneDropDown();
  toneDropDown.classList.add(".ai-tone-dropdown");

  button.addEventListener("click", async () => {
    try {
      button.innerHTML = "Generating....";
      button.disabled = true;

      const emailContent = getEmailContent();
      const selectedTone = toneDropDown.value;

      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: selectedTone,
        }),
      });

      if (!response.ok) {
        throw new Error("API Request Failed");
      }

      const generatedReply = await response.text();
      const composeBox = document.querySelector(
        '[role="textbox"][g_editable="true"]'
      );
      if (composeBox) {
        composeBox.focus();
        composeBox.innerHTML = generatedReply;
      } else {
        console.error("Compose box was not found");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate reply");
    } finally {
      button.innerHTML = "AI Reply";
      button.disabled = false;
    }
  });
  // appending button on toolbar of email reply.
  toolbar.insertBefore(button, toolbar.firstChild);
  toolbar.insertBefore(toneDropDown, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches('.aDh, .btC,[role="dialog"]') ||
          node.querySelector('.aDh, .btC,[role="dialog"]'))
    );

    if (hasComposeElements) {
      console.log("compose Window Detected!");
      setTimeout(injectButton, 500);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
