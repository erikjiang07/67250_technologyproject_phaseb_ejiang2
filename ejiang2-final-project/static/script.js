// changes greeting based on time of day
var now = new Date()
var hour = now.getHours()

function greeting(currentHour) {
    var greetingElement = document.getElementById("greeting")
    if (greetingElement) {
        if (currentHour < 5 || currentHour >= 20) {
            greetingElement.innerHTML = "Good night, welcome to MonoMuse!"
        } else if (currentHour < 12) {
            greetingElement.innerHTML = "Good morning, welcome to MonoMuse!"
        } else if (currentHour < 18) {
            greetingElement.innerHTML = "Good afternoon, welcome to MonoMuse!"
        } else {
            greetingElement.innerHTML = "Good evening, welcome to MonoMuse!"
        }
    }
}

greeting(hour)


// adds copyright year to the footer
function addYear() {
    var year = new Date().getFullYear()
    document.getElementById("copyYear").innerHTML = "&copy; " + year + " MonoMuse. All rights reserved."
}


// highlights the current page in the nav bar
function ActiveNavBar() {
    var navLinks = document.querySelectorAll('nav a');
    for (var i = 0; i < navLinks.length; i++) {
        if (window.location.href === navLinks[i].href) {
            navLinks[i].classList.add("active");
        }
    }
}
ActiveNavBar()


// jQuery read more/less toggle for home page
$("#readLess").click(function(){
    $("#longIntro").hide();
    $("#readLess").hide();
    $("#readMore").show();
});

$("#readMore").click(function(){
    $("#longIntro").show();
    $("#readLess").show();
    $("#readMore").hide();
});


// hamburger menu toggle for mobile
function toggleNav() {
    var nav = document.querySelector('.nav_bar');
    nav.classList.toggle('responsive');
}


// EXPLORE PAGE

// Leaflet.js map showing museum location
var mapElement = document.getElementById("map");
if (mapElement) {
    var map = L.map('map').setView([40.4433, -79.9436], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([40.4433, -79.9436]).addTo(map);
}

// milestone gallery that cycles through museum history
var milestones = [
    {
        year: "2020",
        img: "../static/images/milestonePhotos/milestone1.png",
        alt: "MonoMuse 2020 opening exhibition Second Skin",
        text: 'MonoMuse opens in Pittsburgh with the inaugural exhibition "Second Skin," exploring wearable technology and smart textiles.'
    },
    {
        year: "2021",
        img: "../static/images/milestonePhotos/milestone2.png",
        alt: "Thread and Code Symposium 2021",
        text: 'MonoMuse hosts its first "Thread & Code Symposium," bringing together fashion designers, engineers, and researchers.'
    },
    {
        year: "2022",
        img: "../static/images/milestonePhotos/milestone3.png",
        alt: "Virtual fitting room launch 2022",
        text: "The museum launches a virtual fitting room, allowing visitors to try on AI-generated garments from anywhere in the world."
    },
    {
        year: "2023",
        img: "../static/images/milestonePhotos/milestone4.png",
        alt: "MonoMuse school partnership 2023",
        text: "MonoMuse partners with Pittsburgh-area schools to introduce students to computational fashion design and textile innovation."
    }
];

var currentMilestone = 0;

function updateMilestone() {
    var img = document.getElementById("milestoneImg");
    if (img == null) return;
    var m = milestones[currentMilestone];
    img.src = m.img;
    img.alt = m.alt;
    document.getElementById("milestoneYear").innerHTML = m.year;
    document.getElementById("milestoneText").innerHTML = m.text;
}

function nextMilestone() {
    if (currentMilestone < milestones.length - 1) {
        currentMilestone = currentMilestone + 1;
    } else {
        currentMilestone = 0;
    }
    updateMilestone();
}

function prevMilestone() {
    if (currentMilestone > 0) {
        currentMilestone = currentMilestone - 1;
    } else {
        currentMilestone = milestones.length - 1;
    }
    updateMilestone();
}


// EXHIBITIONS PAGE

// show/close exhibition description panels
function showExhibit(index) {
    for (var i = 0; i < 3; i++) {
        document.getElementById("exhibitDetail" + i).classList.remove("open");
    }
    document.getElementById("exhibitDetail" + index).classList.add("open");
}

function closeExhibit(index) {
    document.getElementById("exhibitDetail" + index).classList.remove("open");
}


// CHECKOUT PAGE

// sets min date to today and max to 1 year from now
var dateInput = document.getElementById("visitDate");
if (dateInput) {
    var now = new Date();
    var month = now.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var d = now.getDate();
    if (d < 10) d = "0" + d;
    var today = now.getFullYear() + "-" + month + "-" + d;
    dateInput.min = today;
    dateInput.max = (now.getFullYear() + 1) + "-" + month + "-" + d;
}

// updates total price when quantity changes
function updatePrice() {
    var qty = document.getElementById("ticketQty").value;
    var total = qty * 18;
    document.getElementById("totalPrice").innerHTML = total;
}

// validates form and redirects to confirmation page
function placeOrder() {
    var date = document.getElementById("visitDate").value;
    var qty = document.getElementById("ticketQty").value;
    var email = document.getElementById("email").value;
    var zip = document.getElementById("zipCode").value;
    var errorMsg = document.getElementById("errorMsg");

    if (date == "" || qty == "" || email == "") {
        errorMsg.innerHTML = "Please fill in all required fields.";
        errorMsg.style.display = "block";
        return;
    }

    // build today's date to check against
    var now = new Date();
    var month = now.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var d = now.getDate();
    if (d < 10) d = "0" + d;
    var today = now.getFullYear() + "-" + month + "-" + d;
    if (date < today) {
        errorMsg.innerHTML = "Please select a date that is today or later.";
        errorMsg.style.display = "block";
        return;
    }

    // museum is closed Mon/Tue
    var dateParts = date.split("-");
    var selectedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    var day = selectedDate.getDay();
    if (day == 1 || day == 2) {
        errorMsg.innerHTML = "We are closed on Mondays and Tuesdays. Please select a Wednesday through Sunday.";
        errorMsg.style.display = "block";
        return;
    }

    if (qty < 1 || qty > 10) {
        errorMsg.innerHTML = "Quantity must be between 1 and 10.";
        errorMsg.style.display = "block";
        return;
    }

    if (email.includes("@") == false || email.includes(".") == false) {
        errorMsg.innerHTML = "Please enter a valid email address.";
        errorMsg.style.display = "block";
        return;
    }

    if (zip != "" && zip.length != 5) {
        errorMsg.innerHTML = "Zip code must be 5 digits.";
        errorMsg.style.display = "block";
        return;
    }

    var total = qty * 18;
    localStorage.setItem("orderTotal", total);
    localStorage.setItem("orderQty", qty);
    localStorage.setItem("orderDate", date);
    window.location.href = "confirmation.html";
}


// CONFIRMATION PAGE

// shows order details from localStorage
function showConfirmation() {
    if (document.getElementById("confTotal")) {
        document.getElementById("confTotal").innerHTML = localStorage.getItem("orderTotal");
        document.getElementById("confQty").innerHTML = localStorage.getItem("orderQty");
        var parts = localStorage.getItem("orderDate").split("-");
        document.getElementById("confDate").innerHTML = parts[1] + "/" + parts[2] + "/" + parts[0];
    }
}