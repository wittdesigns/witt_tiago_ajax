(() => {

  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");


  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  const loadingSpinner = document.getElementById('loading-spinner');



  //functions
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }


  function showLoadingSpinner() {
    loadingSpinner.style.display = 'block';
  }
  function hideLoadingSpinner() {
    loadingSpinner.style.display = 'none';
  }


  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }





  function loadInfoBoxes() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoBoxes => {
        console.log(infoBoxes);



        infoBoxes.forEach((infoBox, index) => {


          const selected = document.querySelector(`#hotspot-${index + 1}`);
          const titleElement = document.createElement('h2');
          titleElement.textContent = infoBox.heading;

          const textElement = document.createElement('p');
          textElement.textContent = infoBox.description;


          selected.appendChild(titleElement);
          selected.appendChild(textElement);
          


        });
      })

  }
    loadInfoBoxes();





  function loadMaterialInfo() {
    showLoadingSpinner();

    fetch("https://swiftpixel.com/earbud/api/materials")
    .then(response => response.json())
    .then(materialvar => {
      console.log(materialvar);

      materialvar.forEach(material => {
          const clone = materialTemplate.content.cloneNode(true);

      const materialHeading = clone.querySelector(".material-heading");
      materialHeading.textContent = material.heading;

      const materialDescription = clone.querySelector(".material-description");
      materialDescription.textContent = material.description;

          materialList.appendChild(clone);

        });
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        hideLoadingSpinner();      });

  }
  loadMaterialInfo();



  

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  
  //Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();




