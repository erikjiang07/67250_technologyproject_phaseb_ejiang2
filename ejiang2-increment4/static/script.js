var x = 5
var y = 7
var z = x + y
console.log(z)

var A = "Hello "
var B = "world!"
var C = A + B
console.log(C)

function sumnPrint(x1,x2) {
    var sum = x1 + x2
    console.log(sum)
}
sumnPrint(x, y) 
sumnPrint(A, B)
    
if (C.length > z) {
    console.log(C)
} else if (C.length < z) {
    console.log(z)
} else {
    console.log("good job!")
}

var L1 = ["Watermelon", "Pineapple", "Pear", "Banana"]
var L2 = ["Apple", "Banana", "Kiwi", "Orange"]
// arrays and loops
//function findTheBanana(fruitList) {
//    for (var i = 0; i < fruitList.length; i++) {
//        if (fruitList[i] === "Banana") {
//            alert("Found the banana!")
//        }
//    }
//}
// findTheBanana(L1)
// findTheBanana(L2)

// forEach version
//function findTheBanana(fruitList) {
//    fruitList.forEach(function(fruit) {
//        if (fruit === "Banana") {
//            alert("Found the banana!")
//        }
//    })
//}
//findTheBanana(L1)
//findTheBanana(L2)

var now = new Date()
var hour = now.getHours()

function greeting(h) {
    var greetingElement = document.getElementById("greeting")
    if (greetingElement) {
        if (h < 5 || h >= 20) {
            greetingElement.innerHTML = "Good night, welcome to MonoMuse!"
        } else if (h < 12) {
            greetingElement.innerHTML = "Good morning, welcome to MonoMuse!"
        } else if (h < 18) {
            greetingElement.innerHTML = "Good afternoon, welcome to MonoMuse!"
        } else {
            greetingElement.innerHTML = "Good evening, welcome to MonoMuse!"
        }
    }
}

greeting(hour)

function addYear() {
    var year = new Date().getFullYear()
    document.getElementById("copyYear").innerHTML = "&copy; " + year + " MonoMuse. All rights reserved."
}
// active nav bar
function ActiveNavBar() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (window.location.href === link.href) {
            link.classList.add("active");
        }
    });
}
ActiveNavBar()

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

// Part 6: buy tickets
function showForm() {
    document.getElementById("purchaseForm").style.display = "block";
}

function submitForm() {
    alert("Redirecting to payment system.");
}













