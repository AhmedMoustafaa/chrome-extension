chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      // Place the code you want to run in the console here
      function manipulateMType() {
        const manufacturerSelect = document.getElementById("inMManufacturer");
        const mTypeSelect = document.getElementById("inMType");

        if (manufacturerSelect && mTypeSelect) {
            const selectedManufacturer = manufacturerSelect.value;
            Array.from(mTypeSelect.options).forEach((option, index) => {
                if (index > 0) {
                    option.removeAttribute("disabled");
                    const optionText = option.textContent.split(' ').slice(0, -1).join(' ');
                    option.value = `${selectedManufacturer}|${optionText}`;
                }
            });
        }
      }

      function manipulateSelectElements() {
        const selectElementIds = ["inBCell", "inEType"];
        selectElementIds.forEach(id => {
            const selectElement = document.getElementById(id);
            if (selectElement) {
                if (id === "inEType") {
                    Array.from(selectElement.options).forEach((option, index) => {
                        if (index > 0) {
                            option.removeAttribute("disabled");
                            option.value = index;
                        }
                    });
                } else {
                    Array.from(selectElement.options).forEach(option => {
                        option.removeAttribute("disabled");
                        option.value = option.textContent;
                    });
                }
            }
        });

        const manufacturerSelect = document.getElementById("inMManufacturer");
        if (manufacturerSelect) {
            manufacturerSelect.addEventListener("change", manipulateMType);
        }
        manipulateMType();
      }

      // Call the functions
      manipulateSelectElements();
    }
  });
});
