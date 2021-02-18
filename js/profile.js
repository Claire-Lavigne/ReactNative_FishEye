import Media from "./media.class.js";

const dropdown = document.querySelector(".dropdown");
const sectionOne = document.querySelector("#photographer-infos");
const modal = document.querySelector(".modal");
const form = document.querySelector("form");
const modalTitle = document.querySelector(".modal-title");
const inputFirstname = document.querySelector("#first_name");
const inputLastname = document.querySelector("#last_name");
const inputEmail = document.querySelector("#email");
const inputMessage = document.querySelector("#your_message");
const lightbox = document.querySelector(".lightbox");
const gallery = document.querySelector(".gallery-wrapper");

fetch("./js/datas.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const getUrlId = window.location.search.substr(4); // get id from url

    const photographersById = data[0].photographers.filter((photographer) => {
      return photographer.id == getUrlId;
    });

    const mediasById = data[0].media.filter((media) => {
      if (media.photographerId == getUrlId) {
        return media;
      }
    });

    const formatedMedias = mediasById.map((media) => new Media(media));

    createProfile(photographersById);
    window.addEventListener("popstate", workingLightbox);
    removeOption();
    dropdown.addEventListener("change", removeOption);
    sortGallery(formatedMedias);
    dropdown.addEventListener("change", () => {
      sortGallery(formatedMedias);
    });

    const modalOpen = document.querySelector(".modal-btn");
    modalOpen.addEventListener("click", () => {
      modal.style.display = "block";
    });
    form.addEventListener("submit", validateForm);

    generateTotalLikes();
    generateTotalPrice(photographersById);
    generateLikesCounter();

    let likesCounter = document.querySelectorAll(".likesCounter:not(i)");
    likesCounter.forEach((counter) => {
      counter.addEventListener("click", generateTotalLikes);
    });

    const allMedias = document.querySelectorAll(".media-link");
    allMedias.forEach((media) => {
      media.addEventListener("click", (e) => {
        const imgID = e.currentTarget.getAttribute("href").split('#').pop();

        lightbox.style.display = 'block';
        const lightboxes = Array.from(lightbox.children);
        lightboxes.forEach(item => {
          if (item.id === imgID) {
            item.style.display = 'block';
            item.classList.add('active');
          } else {
            item.style.display = 'none';
            item.classList.remove('active');
          }
        });
      })

    });

    // close modal form + lightbox
    window.onclick = (event) => {
      if (
        event.target.classList == "lightbox" ||
        event.target.classList == "icon-close" ||
        event.target.classList == "modal" ||
        event.target.classList == "icon-close"
      ) {
        modal.style.display = "none";
        lightbox.style.display = "none";
        const cleanURL = window.location.href.split("#")[0];
        const newURL = new URL(cleanURL);
        window.history.pushState({}, '', newURL);
      }
    };
  })
  .catch((error) => {
    console.log(error);
  });

const removeOption = () => {
  let options = document.querySelectorAll(".dropdown-option");
  let selectedOption = document.querySelector("option:checked");

  Array.from(options).map((option) => (option.style.display = "block"));
  selectedOption.style.display = "none";

  let filteredOptions = Array.from(options).filter(
    (elt) => elt.id != selectedOption.id
  );
  filteredOptions.map((option) => (option.style.display = "block"));
};

const createProfile = (photographersById) => {
  let tagLink = "";
  const name = photographersById[0].name;
  const city = photographersById[0].city;
  const country = photographersById[0].country;
  const tagline = photographersById[0].tagline;
  const tags = photographersById[0].tags;
  const portrait = photographersById[0].portrait;

  tags.forEach((tag) => {
    tagLink += `<a href="./index.html#${tag}" aria-label="tag" class="tag ${tag}">#${tag}</a>`;
  });

  const content = `
      <div class="photographer-infos">
        <h1>${name}</h1>
        <p>${city}, ${country}</p>
        <p>${tagline}</p>
        <div class="tags-container">
          ${tagLink}
        </div>
      </div>
      <button class="modal-btn btn" title="Contact Me">Contactez-moi</button>
      <img src="./assets/Photographers ID Photos/${portrait}" alt="${name}">
  `;

  sectionOne.innerHTML += content;

  modalTitle.innerHTML += `<br>${name}`;
  modalTitle.id = `Contact\ me\ ${name}`;
  modal.setAttribute("aria-labelledby", `Contact me ${name}`);
};

const createGalleryAndLightbox = (medias) => {
  medias.forEach((media) => {
    gallery.innerHTML += media.generateCard();
    lightbox.innerHTML += media.generateLightbox();
    // add smthg in datas.json :
    // item.alt = media.generateMediaTitle();
  });
};

const workingLightbox = () => {
  const urlHash = window.location.href.split("#")[0];
  const actualLightbox = document.querySelector('.lightbox-content.active')
  const prevArrow = actualLightbox.children[2];
  const nextArrow = actualLightbox.children[3];

  if (actualLightbox.previousElementSibling != null) {
    prevArrow.style.display = 'flex';
    prevArrow.href = `${urlHash}#${actualLightbox.previousElementSibling.id}`;
    prevArrow.addEventListener('click', () => {
      prevLightbox()
    })
    actualLightbox.addEventListener("keyup", (e) => {
      if (e.key == "ArrowLeft") {
        prevLightbox()
      }
    })
    function prevLightbox() {
      actualLightbox.style.display = "none";
      actualLightbox.classList.remove("active");
      actualLightbox.previousElementSibling.style.display = "block";
      actualLightbox.previousElementSibling.classList.add("active");
    }
  } else {
    prevArrow.style.display = 'none';
  }

  if (actualLightbox.nextElementSibling != null) {
    nextArrow.style.display = 'flex';
    nextArrow.href = `${urlHash}#${actualLightbox.nextElementSibling.id}`;
    nextArrow.addEventListener('click', () => {
      nextLightbox()
    })
    actualLightbox.addEventListener("keyup", (e) => {
      if (e.key == "ArrowRight") {
        nextLightbox()
      }
    })

    function nextLightbox() {
      actualLightbox.style.display = "none";
      actualLightbox.classList.remove("active");
      actualLightbox.nextElementSibling.style.display = "block";
      actualLightbox.nextElementSibling.classList.add("active");
    }
  } else {
    nextArrow.style.display = 'none';
  }

};

const sortGallery = (medias) => {
  const dropdownOption = dropdown.options[dropdown.selectedIndex].innerHTML;
  let sortedMedias = [];
  switch (dropdownOption) {
    case "Titre":
      sortedMedias = medias.sort((a, b) => {
        return a.media.generateTitle().localeCompare(b.media.generateTitle());
      });
      console.log(sortedMedias);
      break;
    case "Date":
      // Timestamp
      sortedMedias = medias.sort(
        (a, b) =>
          new Date(b.media.date).getTime() - new Date(a.media.date).getTime()
      );
      console.log(sortedMedias);
      break;
    default:
      // Popularité
      sortedMedias = medias.sort((a, b) => b.media.likes - a.media.likes);
      console.log(sortedMedias);
      break;
  }
  createGalleryAndLightbox(sortedMedias);
};

////// --VALIDATION FUNCTIONS-- //////
function validateInput(input) {
  if (input.value.toString().trim().length < 2) {
    input.parentElement.setAttribute("data-error-visible", "true");
    return false;
  } else {
    input.parentElement.removeAttribute("data-error-visible");
    return true;
  }
}

// submit form
function validateForm(event) {
  let isFormOk = [];
  event.preventDefault(); // disable redirect + keep form datas if invalid

  isFormOk.push(validateInput(inputFirstname));
  isFormOk.push(validateInput(inputLastname));
  isFormOk.push(validateInput(inputMessage));
  isFormOk.push(validateInput(inputEmail));

  // if form doesn't return any 'false'
  if (!isFormOk.includes(false)) {
    // get every valid keys/values
    let datas = new FormData(form);
    for (let entry of datas.entries()) {
      console.log(entry[0], ":", entry[1]);
    }
    modal.style.display = "none";
    form.reset();
  }
}

const generateLikesCounter = () => {
  let likesCounter = document.querySelectorAll(".likesCounter");

  likesCounter.forEach((counter) => {
    counter.addEventListener("click", (event) => {
      let targetNumber = parseInt(event.target.innerText); // get number without <i> child
      targetNumber++;
      counter.innerText = targetNumber;
    });
  });
};

const generateTotalLikes = () => {
  let likesCounter = document.querySelectorAll(".likesCounter");
  let totalLikes = document.querySelector(".totalLikes");
  let arr = [];
  likesCounter.forEach((counter) => {
    let number = parseInt(counter.innerText);
    arr.push(number);
  });
  let totalLikesCounter = arr.reduce((a, b) => a + b);
  totalLikes.innerHTML = `${totalLikesCounter} <i aria-label="likes"> ❤ </i>`;
};

const generateTotalPrice = (photographersById) => {
  let totalPrice = document.querySelector(".totalPrice");
  totalPrice.innerHTML = `${photographersById[0].price}€ / jour`;
};