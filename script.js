import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import { auth } from "./firebase.js";

// REGISTER
window.register = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Registered Successfully");
  } catch (e) {
    alert(e.message);
  }
};

// LOGIN
window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful");
  } catch (e) {
    alert(e.message);
  }
};

// AUTH STATE
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("auth").style.display = "none";
    document.getElementById("editor").style.display = "block";
  }
});

// RUN CODE
window.runcode = async () => {
  let code = document.getElementById("code").value;
  const languageId = Number(document.getElementById("language").value);
  const output = document.getElementById("output");
  const userInput = document.getElementById("stdin").value;
  if (languageId === 62) {
    code = code.replace(/public class\s+\w+/, "public class Main");
  }
  // PYTHON FIX
  if (languageId === 71) {
    code = code.replace(/^\/\/(.*)/gm, "#$1");
  }

  output.innerText = "⏳ Running code...";

  const res = await fetch(
    "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source_code: code,
        language_id: Number(languageId),
        stdin: userInput,
      }),
    },
  );

  const result = await res.json();
  document.getElementById("output").innerText =
    result.stdout || result.stderr || "No output";
};
document.addEventListener("DOMContentLoaded", () => {
  const codeEditor = document.getElementById("code");
  const languageSelect = document.getElementById("language");

  const templates = {
    54: `#include <iostream>
using namespace std;

int main() {
    return 0;
}`,
    62: `public class Main {
    public static void main(String[] args) {
        // Your code here
    }
}`,
    71: `# Your Python code here
def main():
    pass

if __name__ == "__main__":
    main()
`,
    50: `#include <stdio.h>

int main() {
    // Your code here
    return 0;
}`, //c
  };

  // Track last language to avoid unnecessary replacement
  let lastLang = Number(languageSelect.value);

  function setTemplate() {
    const lang = Number(languageSelect.value);
    // Only replace if:
    // 1. The editor is empty, OR
    // 2. User changed the language
    if (
      !codeEditor.value ||
      codeEditor.value.trim() === "" ||
      lang !== lastLang
    ) {
      codeEditor.value = templates[lang] || "";
      lastLang = lang;
    }
  }

  // On page load
  setTemplate();

  // On language change
  languageSelect.addEventListener("change", setTemplate);
});
