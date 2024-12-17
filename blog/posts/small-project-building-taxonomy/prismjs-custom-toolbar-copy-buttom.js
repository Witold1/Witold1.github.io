const copyButtonLabel = "Copy Code";

// use a class selector if available
let blocks = document.querySelectorAll(".codeblock");

blocks.forEach((block) => {
  // only add button if browser supports Clipboard API
  if (navigator.clipboard) {
    let button = document.createElement("button");
    button.className = "codeblock-copy";
    button.innerText = copyButtonLabel;
    var targetDiv = block.getElementsByClassName("codeblock-toolbar")[0];

    targetDiv.appendChild(button);
    button.addEventListener("click", async () => {
      await copyCode(block, button);
    });
  }
});

async function copyCode(block, button) {
  let code = block.querySelector("code");
  let text = code.innerText;

  await navigator.clipboard.writeText(text);

  // visual feedback that task is completed
  button.innerText = "Code Copied";

  setTimeout(() => {
    button.innerText = copyButtonLabel;
  }, 700);
}
