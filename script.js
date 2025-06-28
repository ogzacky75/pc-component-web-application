const darkmode = document.getElementById('darkmode');
const finalBuildList = document.querySelector('#myFinalbuild ul');

darkmode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.style.transition = '1s';
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("partsid");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userInput = {
      case: document.getElementById("case").value.trim(),
      gpu: document.getElementById("gpuInput").value.trim(),
      cpu: document.getElementById("cpuInput").value.trim(),
      ram: document.getElementById("ramInput").value.trim(),
      storage: document.getElementById("storageinput").value.trim(),
      psu: document.getElementById("power-supply-unit").value.trim(),
    };

    try {
      const response = await fetch("https://pc-web-app-server.onrender.com/parts");
      if (!response.ok) throw new Error("Could not load database.");
      const data = await response.json();

      const results = {
        case: data.case.some(item => item.name === userInput.case),
        gpu: data.gpus.some(item => item.name === userInput.gpu),
        cpu: data.cpus.some(item => item.name === userInput.cpu),
        ram: data.rams.some(item => item.name === userInput.ram),
        storage: data.storages.some(item => item.name === userInput.storage),
        psu: data.psus.some(item => item.name === userInput.psu),
      };

      const messages = [];
      let isBuildValid = true;

      for (const [component, isValid] of Object.entries(results)) {
        messages.push(
          isValid
            ? `✅ ${component.toUpperCase()} is valid.`
            : `❌ ${component.toUpperCase()} is invalid!`
        );
        if (!isValid) isBuildValid = false;
      }

      alert(messages.join("\n"));

      
      if (isBuildValid) {
        finalBuildList.innerHTML = ""; 
        for (const [key, value] of Object.entries(userInput)) {
          const li = document.createElement("li");
          li.textContent = `${key.toUpperCase()}: ${value}`;
          finalBuildList.appendChild(li);
        }
      } else {
        finalBuildList.innerHTML = ""; 
      }

    } catch (err) {
      console.error("Error checking components:", err);
      alert("There was a problem verifying your build.");
    }
  });
});