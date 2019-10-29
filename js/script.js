let profile = [];
profile = profiles;

$(document).ready(function() {
    //append HEADER and nav ul
    $("body").append(`
    	<div id="header" class="container"> 
    		<nav class="p-3 list-group-horizontal navbar-nav justify-content-around row bg-dark text-light"> 
    			<span class="h1 m-0 text-center col-5">Keep me</span> 
    			<ul id="navbar" class="list-group-horizontal navbar-nav justify-content-around col-7 align-items-center" id="nav"></ul> 
    		</nav> 
    	</div>
    	`);
    //append NAV menu
    $("#navbar").append(`
    	<li><a class="list-group-item-info" href="index.html">Dates</a> </li>
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
    //gender/pets filter function  //age filter function
    document.getElementById("filter1").onclick = function() {
        valG = $("#filter1 :selected").text()
        valA = $("#filter2 :selected").text()
        select()
    }
    document.getElementById("filter2").onclick = function() {
        valG = $("#filter1 :selected").text()
        valA = $("#filter2 :selected").text()
        select()
    }
    //FILTER function
    function select() {
        for (i = 0; i < profile.length; i++) {
            if (valA === "Pets: under 15y" && valG == profile[i].filter || valA === "Pets: under 15y" && valG === "Gender/Pets - all" || valA === "Age - all" && valG === "Pets" || valA === "Pets: under 15y" && valG === "Pets") {
                if (profile[i].age <= 15) {
                    $("#col" + i).show() //show pets
                    $("#placeholder").hide()
                } else {
                    $("#col" + i).hide() //hide men and women
                    $("#placeholder").hide()
                }
            } else if (valA === "18-29" && valG == profile[i].filter || valA === "18-29" && valG === "Gender/Pets - all") {
                if (profile[i].age <= 29 && profile[i].age >= 18) {
                    $("#col" + i).show() //show 18-29y
                    $("#placeholder").hide()
                } else {
                    $("#col" + i).hide() //hide other ages and pets
                    $("#placeholder").hide()
                }
            } else if (valA === "30-45" && valG == profile[i].filter || valA === "30-45" && valG === "Gender/Pets - all") {
                if (profile[i].age <= 45 && profile[i].age >= 30) {
                    $("#col" + i).show() //show 30-45y
                    $("#placeholder").hide()
                } else {
                    $("#col" + i).hide() //hide other ages and pets
                    $("#placeholder").hide()
                }
            } else if (valA === "46+" && valG == profile[i].filter || valA === "46+" && valG === "Gender/Pets - all") {
                if (profile[i].age >= 46) {
                    $("#col" + i).show() //show 46y+
                    $("#placeholder").hide()
                } else {
                    $("#col" + i).hide() //hide younger and pets
                    $("#placeholder").hide()
                }
            } else if (valA == "Age - all" && valG == profile[i].filter) {
                $("#col" + i).show()
                $("#placeholder").hide()
            } else if (valA === "Age - all" && valG === "Gender/Pets - all") {
                $("#col" + i).show() //show all 
                $("#placeholder").hide()
            } else {
                if ($("#col" + i).is(":visible")) {
                    $("#col" + i).hide()
                    $("#placeholder").show()
                } else { console.log("huh?") }
            }
        }
    }
    //append MAIN content
    $("body").append(`<div class="container"><div id="maincontent" class="row p-2"></div></div>`)
    for (i = 0; i < profile.length; i++) {
        $("#maincontent").append(`
        		<div class="col-lg-3 col-md-6 col-sm-12" id="col${+i}">
	        		<img id="profileImg${+i}" class="card-img" src="${profile[i].pic}">
	        		<img class="heart" id="bHeart${+i}" src="./img/black_heart.png">
	        		<img class="heart" id="rHeart${+i}" src="./img/heart.png">
	        		<br>
        			<div class="quote p-1"><quote>&quot${profile[i].quote}&quot</quote></div>
        			<div class = "myProgress">
						<div id = "myBar${+i}""></div>
                	</div> 
                	<p class="progressATM"><span id="progressATM${+i}">0</span>%</p>        		
      			</div>
            <div>` /* div row end */ )
    }
    //append placeholder for filter error
    $("#maincontent").append(`<p id="placeholder"></p>`)
    //hide red Heart in the beginning
    $("[id^=rHeart]").hide()
    //hide placeholder for filter error
    $("#placeholder").text("nothing found with these filters, try different ones").hide()
    //DRAG and drop
    $("#maincontent").sortable()
    $("[id^=col]").draggable({
        connectToSortable: "#maincontent"
    });
    //append Favourites
    $("body").append(`
    	<div class="container">
    		<div class="h1 m-0 text-center bg-dark text-light">Favourites</div> 
    		<div class="row m-0 mt-2 content col-12 justify-content-between"></div>
    	</div>`)
    //CLICKfunction for the HEARTS
    $(".heart").click(function(e) {
        var idNum = Number((e.target.id).slice(6))
        $("#bHeart" + idNum).toggle();
        $("#rHeart" + idNum).toggle();
        var currentbHeart = document.getElementById("bHeart" + idNum)
        if (window.getComputedStyle(currentbHeart).display === "none") {
            $(".content").append(`<div class="col-md-5 col-lg-5 col-sm-10 mb-3 detailText align-self-end" id="favourite${+idNum}">
            	<div class="cancel" id="cancel${+idNum}"><p>X</p></div>
            	<img class="card-img my-2" src="${profile[idNum].pic}">
            	<div class="col-10 offset-1">
	            	<p>Name: ${profile[idNum].name}</p>
	            	<p>Age: ${profile[idNum].age} ${profile[idNum].y_m}</p>
	            	<p>Location: ${profile[idNum].location}</p>
	            	<p>Hobbies: ${profile[idNum].hobbies}</p>
	            	<p>Special Skill: ${profile[idNum].special_skill}</p>
	            <div>
            </div>`)
            var progress = Number($("#progressATM" + idNum).text())
            if (progress <= 99) {
                progress++;
                document.getElementById("myBar" + idNum).style.height = progress + 4 + "%";
                $("#progressATM" + idNum).text(progress + 4) //+4 to get 5% per click
            } else {
                document.getElementById("myBar" + idNum).style.height = "100%";
            }
        } else {
            $("#favourite" + idNum).remove()
        }
        //giving CancelButton it's function
        $(".cancel").click(function(e) {
            var actual = Number((this.id).slice(6))
            $("#favourite" + actual).remove()
            $("#bHeart" + actual).show()
            $("#rHeart" + actual).hide()
        })
        //CALCulation for width of div of cancal - to be a circle always
        var cancelHeight = document.getElementById("cancel" + idNum).offsetHeight;
        document.getElementById("cancel" + idNum).style.width = cancelHeight + "px";
    })

});

//CALCulation to set heights and widths relative to img and div width
function imgHeight() {
    for (i = 0; i < profile.length; i++) {
        var offsetWidth = document.getElementById("profileImg" + i).offsetWidth;
        var divWidth = document.getElementById("col" + i).offsetWidth;
        var imgHeight = offsetWidth / 16 * 9;
        var heartSize = offsetWidth / 7;
        var divHeight = divWidth * 0.8;
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



/////DONE
//header and navbar - done
//apply JSON main-part - done
//hearts added and functions given - done
//append favourites part + functions - done
//img's mobile friendly (calculation) - done
//filter - done
//drag and drop - done
//x in favourites added - done
//processbar - done
//bootstrap classes and CSS/SASS - done

/////OPEN
//error msg if filter empty not correct atm



//HOW TO GET ERROR MSG right?
//little bug: if i add 2 favs and X the first of them in the bottom - the heart stays red at top - fixed
//Progressbar() didn't work