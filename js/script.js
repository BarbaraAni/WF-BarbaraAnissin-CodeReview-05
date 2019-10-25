let profile = [];
profile = profiles;

$(document).ready(function() {
    //append header and nav ul
    $("body").append(`
    	<div id="header" class="container"> 
    		<nav class="p-3 list-group-horizontal navbar-nav justify-content-around row bg-dark text-light"> 
    			<span class="h1 m-0 text-center col-5">Keep me</span> 
    			<ul id="navbar" class="list-group-horizontal navbar-nav justify-content-around col-7 align-items-center" id="nav"></ul> 
    		</nav> 
    	</div>
    	`);
    //append nav menu
    $("#navbar").append(`
    	<li><a class="list-group-item-info" href="#">Dates</a> </li>
    	<li><a class="list-group-item-info" href="#">Contact</a> </li>
    	<li><a class="list-group-item-info" href="#">About</a> </li>
    	<li><a class="list-group-item-info" href="#">Settings</a></li>
    	`)
    //append catch-line
    $(".container").append(`<p class="text-center p-2">If you don't find the right girlfriend or boyfriend here - you can still get a PET! &#128513`)
    //append gender/pet filter
    $(".container").append(`
    	<select class="select" id="filter1" type="select">
			<option value="" selected="selected">Gender/Pets - all</option>
			<option value="">Women</option>
			<option value="">Men</option>
			<option value="">Pets</option>
		</select>`)
    //append age filter
    $(".container").append(`
    	<select class="select" id="filter2" type="select">
			<option value="" selected="selected">Age - all</option>
			<option value="">18-29</option>
			<option value="">30-45</option>
			<option value="">46+</option>
			<option value="">Pets: under 15y</option>
		</select>`)
    //gender/pets filter function
    var valG = ""
    document.getElementById("filter1").onclick = function() {
        valG = $("#filter1 :selected").text()
        selectG()
    }

    function selectG() {
        for (i = 0; i < profile.length; i++) {
            if (profile[i].filter == valG) {
                $("#col" + i).show()
            } else if (valG == "Gender/Pets - all") {
                $("#col" + i).show()
            } else {
                $("#col" + i).hide()
            }
        }
    }
    //age filter function
    var valA = ""
    document.getElementById("filter2").onclick = function() {
        valA = $("#filter2 :selected").text()
        console.log(valA)
        selectA()
    }

    function selectA() {
        for (i = 0; i < profile.length; i++) {
            if (valA === "Pets: under 15y") {
                if (profile[i].age <= 15) {
                    $("#col" + i).show() //show pets
                } else {
                    $("#col" + i).hide() //hide men and women
                }

            } else if (valA === "18-29") {
                if (profile[i].age <= 29 && profile[i].age >= 18) {
                    $("#col" + i).show() //show 18-29y
                } else {
                    $("#col" + i).hide() //hide other ages and pets
                }
            } else if (valA === "30-45") {
                if (profile[i].age <= 45 && profile[i].age >= 30) {
                    $("#col" + i).show() //show 30-45y
                } else {
                    $("#col" + i).hide() //hide other ages and pets
                }
            } else if (valA === "46+") {
                if (profile[i].age >= 46) {
                    $("#col" + i).show() //show 46y+
                } else {
                    $("#col" + i).hide() //hide younger and pets
                }
            } else {
                $("#col" + i).show() //show all 
            }
        }
    }
    //append main content
    $("body").append(`<div class="container"><div id="maincontent" class="row p-2"></div></div>`)
    for (i = 0; i < profile.length; i++) {
        $("#maincontent").append(`
        	<div class="col-lg-3 col-md-6 col-sm-12" id="col${+i}">
        		<img id="profileImg${+i}" class="card-img" src="${profile[i].pic}">
        		<img class="heart" id="bHeart${+i}" src="./img/black_heart.png">
        		<img class="heart" id="rHeart${+i}" src="./img/heart.png">
        		<br>
        		<div class="quote p-1"><quote>&quot${profile[i].quote}&quot</quote></div>
        	</div>
        </div>` /*div row end*/ )
    }
    //hide red Heart in the beginning
    $("[id^=rHeart]").hide()
    //append Favourites
    $("body").append(`
    	<div class="container">
    		<div class="h1 m-0 text-center bg-dark text-light">Favourites</div> 
    		<div class="row m-0 mt-2 content col-12 justify-content-between"></div>
    	</div>`)
    //clickfunction for the hearts
    $(".heart").click(function(e) {
        var idNum = Number((e.target.id).slice(6))
        $("#bHeart" + idNum).toggle();
        $("#rHeart" + idNum).toggle();
        var currentbHeart = document.getElementById("bHeart" + idNum)
        if (window.getComputedStyle(currentbHeart).display === "none") {
            $(".content").append(`<div class="col-md-5 col-lg-5 col-sm-10 mb-3 detailText align-self-end" id="favourite${+idNum}">
            	<img class="card-img my-2" src="${profile[idNum].pic}">
            	<div class="col-10 offset-1">
	            	<p>Name: ${profile[idNum].name}</p>
	            	<p>Age: ${profile[idNum].age}</p>
	            	<p>Location: ${profile[idNum].location}</p>
	            	<p>Hobbies: ${profile[idNum].hobbies}</p>
	            	<p>Special Skill: ${profile[idNum].special_skill}</p>
	            <div>
            </div>`)
        } else {
            $("#favourite" + idNum).remove()
        }
    })
});

//calculations to set heights and widths relative to img and div width
function imgHeight() {
    for (i = 0; i < profile.length; i++) {
        var offsetWidth = document.getElementById("profileImg" + i).offsetWidth;
        var divWidth = document.getElementById("col" + i).offsetWidth;
        var imgHeight = offsetWidth / 16 * 9
        var heartSize = offsetWidth / 7
        var divHeight = divWidth / 8 * 7.5
        document.getElementById("profileImg" + i).style.height = imgHeight + "px";
        document.getElementById("bHeart" + i).style.width = heartSize + "px";
        document.getElementById("bHeart" + i).style.height = heartSize + "px";
        document.getElementById("rHeart" + i).style.width = heartSize + "px";
        document.getElementById("rHeart" + i).style.height = heartSize + "px";
        document.getElementById("col" + i).style.height = divHeight + "px";
    }
}

$(document).ready(imgHeight);
$(window).resize(imgHeight);



//add progress bar
//drag and drop - no clue how - google

//option to filter both at same time