document.addEventListener("DOMContentLoaded", (event) => {
  const toggleSwitch = document.getElementById("darkmode");

  fetch("./db.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Now you can use the data to update your HTML dynamically
      updateDashboard(data.dashboard);
      updateAttribution(data.attribution);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  function updateDashboard(dashboard) {
    document.querySelector(".title h1").textContent = dashboard.title;
    document.querySelector(
      ".title span"
    ).textContent = `Total Followers: ${dashboard.totalFollowers}`;
    document.getElementById("darkmode").checked = dashboard.darkMode;

    const socialMediaAccounts = document.querySelectorAll(".social-media");
    socialMediaAccounts.forEach((account, index) => {
      if (dashboard.socialMediaAccounts[index]) {
        const data = dashboard.socialMediaAccounts[index];
        account.querySelector(".username").textContent = data.username;
        account.querySelector(".mid h1").textContent = data.followers;
        account.querySelector(
          ".below span.upp"
        ).textContent = `${data.followersToday} Today`;

        // Update the SVG or image based on the platform
        const platformIcons = {
          Facebook: "./images/icon-facebook.svg",
          Twitter: "./images/icon-twitter.svg",
          Instagram: "./images/icon-instagram.svg",
          YouTube: "./images/icon-youtube.svg",
        };
        account.querySelector(".up img").src = platformIcons[data.platform];
      }
    });

    document.querySelector(
      ".middle p"
    ).textContent = `Overview - ${dashboard.overview}`;

    const cards = document.querySelectorAll(".cards");
    cards.forEach((card, index) => {
      if (dashboard.cards[index]) {
        const data = dashboard.cards[index];
        card.querySelector(".view").textContent = data.type;
        card.querySelector(".likes").textContent = data.count;
        card.querySelector(".svg").textContent = data.percentage;
        card.querySelector(".image img").src = data.increase
          ? "./images/icon-up.svg"
          : "./images/icon-down.svg";

        // Update the platform icon
        const platformIcons = {
          Facebook: "./images/icon-facebook.svg",
          Twitter: "./images/icon-twitter.svg",
          Instagram: "./images/icon-instagram.svg",
          YouTube: "./images/icon-youtube.svg",
        };
        card.querySelector(".top .image img").src =
          platformIcons[data.platform];
      }
    });
  }

  function updateAttribution(attribution) {
    const attributionElement = document.querySelector(".attribution");
    attributionElement.innerHTML = `Challenge by <a href="${attribution.challengeLink}" target="_blank">Frontend Mentor</a>. Coded by <a href="#">${attribution.codedBy}</a>.`;
  }
  // Check local storage for saved preference
  if (localStorage.getItem("darkmode") === "true") {
    document.body.classList.add("dark-mode");
    toggleSwitch.checked = true;
  }

  toggleSwitch.addEventListener("change", () => {
    if (toggleSwitch.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkmode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkmode", "false");
    }
  });
});
