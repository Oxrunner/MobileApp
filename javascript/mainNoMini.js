var planetLinks = "",
    backButton = "",
    pages = "",
    questionsInfo = "",
    score = [],
    mainPagesInApp = ["homePage", "informationPage", "quizPage"];

//Swipe JS vars
var currentPage = 0,
  numberOfPages = 0,
  sectionToListenTo = "",
  transformText = "-webkit-transform .3s linear";

//Map Var
var map;

function historyPop(e){
  if(e.state == null){

	}else if(e.state.mainPage && e.state.mainPage === true){
    loadChosenPage(e.state.pageName);
	} else if(e.state.mainPage && e.state.mainPage === false){
  }
}

function setActivePage(){
  var url = window.location.href;
  var newPageName = url.split("#");
  loadChosenPage(newPageName[1]);
}

function mainNavigation(e){
  if(e.target.id == "navIcon"){
    var hrefValue = e.target.parentNode.href;
  }else {
    var hrefValue = e.target.href;
  }

  var newPageName = hrefValue.split("#");
  setHistory(true);
  loadChosenPage(newPageName[1]);
}

function loadChosenPage(pageName){
  if(mainPagesInApp.indexOf(pageName) == -1){
    pageName = mainPagesInApp[0];
  }
  for (var i = 0; i < mainPagesInApp.length; i++) {
    var selectedPage = document.getElementById(mainPagesInApp[i]);
    selectedPage.classList.add("inactive");
  }
  resetPages(pageName);
  var selectedPage = document.getElementById(pageName);
  selectedPage.classList.remove("inactive");
}

function resetPages(pageName){
  if(pageName == "quizPage"){
    resetQuiz(1);
  } else if(pageName == "informationPage"){
    resetInformationPage();
  }
}

function setHistory(mainPage){
  var url = window.location.href;
  var oldPageName = url.split("#");
  history.pushState({mainPage:mainPage, pageName:oldPageName[1], subPage:""}, "Space app "+oldPageName[1]+" page");
}

// Home Page JS
function initMap(position) {
  map = new google.maps.Map(document.getElementById('backgroundMap'), {
    center: {lat: position.coords.latitude, lng: position.coords.longitude},
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    disableDefaultUI: true
  });
}

function getUsersLocation(){
  if (navigator.geolocation) {
      document.getElementById("mapCover").style.opacity = "0.4";
      document.getElementById("homePageContent").style.display = "none";
      options = {
        enableHighAccuracy: false
      };
      navigator.geolocation.watchPosition(initMap, mapError, options);
  } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function mapError(){
  console.log("Unable to get location");
}

//Information JS

function resetInformationPage(){
  activatePage("page-home");
}

function planetLinkClick(e){
  e.preventDefault();
    var linkValue = findParentNode("A", e.srcElement).href;
    var newPageName = linkValue.split("#");
    setInformationPage(newPageName[1]);
    setSelectedPlanet(newPageName[1]);
  activatePage("planet-info");

  // Mark the old page as historic
  var oldPage = document.getElementById("page-home");
  oldPage.classList.add("historic");
}

function makeRequest(scriptToCall, callBackFunction, localStorageName) {
  if(localStorage.getItem(localStorageName) == null || localStorage.getItem(localStorageName) == "" || localStorage.getItem(localStorageName) == "null"){
      var request = new XMLHttpRequest();
      request.open('get', 'MobileAppAPI/'+scriptToCall);
      request.onreadystatechange = function () {
          if (request.readyState === 4) {
              if (request.status === 200) {
                  localStorage.setItem(localStorageName, request.responseText);
                  window[callBackFunction](request.responseText);
              } else {
                  console.log("Failed");
              }
          }
      };
      request.send(null);
    }else{
      window[callBackFunction](localStorage.getItem(localStorageName));
    }
}

// Parse response
function setInformationPage(planetSelected) {
  var selectedPlanetInfo = {};
  var allPlanetInfo = JSON.parse(localStorage.getItem("planetsInfo"));
  for (var i = 0; i < allPlanetInfo.length; i++) {
    if(allPlanetInfo[i].idText == planetSelected){
      selectedPlanetInfo = allPlanetInfo[i];
    }
  }

    document.getElementById("selectedPlanet").innerHTML = selectedPlanetInfo.title;
    document.getElementById("imageForPlanetInformation").src = selectedPlanetInfo.image;
    var planetInfo = document.getElementById("planetInfo");
    planetInfo.innerHTML = selectedPlanetInfo.information;
}

function loadPlanetList(){
  makeRequest('PlanetInfo.txt', "renderPlanetsList", "planetsInfo");
}


function renderPlanetsList(planetJSON){
  var planetInfo = JSON.parse(planetJSON);
  var iPhoneTemplateHTML = document.getElementById("planet-list-template-iPhone").innerHTML,
      iPhoneHTML = '',
      iPadTemplateHTML = document.getElementById("planet-list-template-iPad").innerHTML,
      iPadHTML = '',
      iPadPlanetsInfoTemplate = document.getElementById("planet-info-ipad-template").innerHTML,
      iPadInfoHTML = '';
  for(i = 0; i < planetInfo.length; i++){
    iPhoneHTML += renderTemplate(iPhoneTemplateHTML, planetInfo[i]);
    iPadHTML += renderTemplate(iPadTemplateHTML, planetInfo[i]);
    iPadInfoHTML += renderTemplate(iPadPlanetsInfoTemplate, planetInfo[i]);
  }

  document.getElementById("planetsList").innerHTML = iPhoneHTML;
  document.getElementById("planetsList-iPad").innerHTML = iPadHTML;
  document.getElementById("planetInfoHolder").innerHTML = iPadInfoHTML;
  setSelectedPlanet("sun");
  setUpListeners();
}

function gestureChange(e){
	var realTarget = findRealTarget(e.target, 'informationPlanetImage');
	if(realTarget !== false){
		realTarget.style.webkitTransform = 'rotate(' + e.rotation + 'deg)';
		if(realTarget.style.zIndex != 2){
		  realTarget.style.zIndex = 2;
	    }
		e.preventDefault();
	}
}

function setSelectedPlanet(selectedPlanet){
  var planetHolder = document.getElementById('planetInfoHolder');
  var planetPages = planetHolder.getElementsByTagName('div');
  for (var i = 0; i < planetPages.length; i++) {
    planetPages[i].classList.remove("selectedPlanetInfo");
  }
  var selectedPage = document.getElementById(selectedPlanet+"-iPad");
  selectedPage.classList.add("selectedPlanetInfo");
}

function renderTemplate(templateHTML, data){
	var property, value, searchRegex;

	for(property in data){
		// Important:
		if(data.hasOwnProperty(property)){
		  value = data[property];
		  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp
		  searchRegex = new RegExp("{\\*" + property + "\\*}", "gi");
		  templateHTML = templateHTML.replace(searchRegex, value);
		}
	}

	return templateHTML;
}

function backButtonClick(e){
  e.preventDefault();
  activatePage("page-home");
}

// Set a particular page to be active
function activatePage(newPageId){
  deactivatePages();

  window.scrollTo(0,0);

  // Make the new page active
  var newPage = document.getElementById(newPageId);
  newPage.classList.add("active");
  newPage.classList.remove("historic");
}

// Ensures no pages are active
function deactivatePages(){
  for(var i = 0; i < pages.length; i++){
    pages[i].classList.remove("active");
  }
}

function findParentNode(parentName, childObj) {
    var testObj = childObj.parentNode;
    var count = 1;
    while(testObj.nodeName != parentName) {
        testObj = testObj.parentNode;
        count++;
    }
    return testObj;
}

function setUpListeners(){
  planetLinks = document.querySelectorAll(".planet-link");
  backButton = document.querySelector("header a");
  pages = document.querySelectorAll(".page");

  // Hook up the story links
  for(var i = 0; i < planetLinks.length; i++){
    planetLinks[i].addEventListener("click", planetLinkClick, false);
  }

  var informationImages = document.getElementsByClassName('informationPlanetImage');
  for(var i = 0; i < informationImages.length; i++){
    informationImages[i].addEventListener('gesturechange', gestureChange, false);
  }

  // Hook up the back button
  backButton.addEventListener("click", backButtonClick, false);
}

// Quiz JS
function setQuestions(questionJSON){
  questionsInfo = JSON.parse(questionJSON);
  var mq = window.matchMedia( "(min-width: 700px)" );
  var numberOfPagesInQuiz = 0;
  if (mq.matches) {
	   numberOfPagesInQuiz = loadiPadQuestionView(questionsInfo);
  } else {
    numberOfPagesInQuiz = loadiPhoneQuestionView(questionsInfo);
  }
  createSubmitButton(numberOfPagesInQuiz);
  setUpSwipe(1, numberOfPagesInQuiz, "question");
  setUpQuiz();
}



function loadiPhoneQuestionView(questionsInfo){
  var templateHTML = document.getElementById("question-template").innerHTML;
  var html = '';
  for(i = 0; i < questionsInfo.length; i++){
    html += renderTemplate(templateHTML, questionsInfo[i]);
  }
  html += resultsPage();
  document.getElementById("questionHere").innerHTML = html;
  return questionsInfo.length;
}

function loadiPadQuestionView(questionsInfo){
  var templateHTML = document.getElementById("question-template-iPad").innerHTML;
  var pageNumberiPad = 1;
  var returnHTML = '<div class="questionHere question" id="question'+pageNumberiPad+'">';
  for(i = 0; i < questionsInfo.length; i++){
    returnHTML += renderTemplate(templateHTML, questionsInfo[i]);
    var checkNumberOnPage = ((i+1)/5)%1;
    if(checkNumberOnPage === 0 && i+1 != questionsInfo.length){
      pageNumberiPad++;
      returnHTML += '</div><div class="questionHere question" id="question'+pageNumberiPad+'">';
    }
  }
  returnHTML += "</div>";
  returnHTML += resultsPage();
  document.getElementById("questionHere").innerHTML = returnHTML;
  return pageNumberiPad;
}

function setUpQuiz(){
  for(var i = 0; i < questionsInfo.length; i++){
    score[i] = 0;
  }
  createEventListenerForAnswerInputs();
}

function createEventListenerForAnswerInputs(){
  var answerInputs = document.getElementsByClassName("answer");
  for(var i=0; i<answerInputs.length; i++){
      answerInputs[i].addEventListener("focusout", checkAnswer, false);
  }
}

function createSubmitButton(numberOfPagesInQuiz){
  if (window.matchMedia("(min-width: 700px)").matches) {
    var inputField = "<input type='submit'name='submit' id='submitQuiz' value='Submit Quiz'/>";
    document.getElementById("questionNumber"+questionsInfo.length).innerHTML += inputField;
  } else {
    var inputField = "<div id='SubmitQuizDiv'><input type='submit'name='submit' id='submitQuiz' value='Submit Quiz'/></div>";
    document.getElementById("question"+numberOfPagesInQuiz).innerHTML += inputField;
  }
  document.getElementById("submitQuiz").addEventListener("click", submitQuiz);
}

function submitQuiz(){
  var totalScore = 0;
  for (var i = 0; i < score.length; i++) {
    totalScore += score[i];
  }
  document.getElementById("resultsName").value=localStorage.getItem("name");
  document.getElementById("resultsEmail").value=localStorage.getItem("email");

  document.getElementById("pageLocation").classList.add("hiddenPageLocation");

  document.getElementById("showScore").innerHTML = "Score "+totalScore+"/10";
  document.getElementById("resultsScreen").style.webkitTransform = "translate(0vw,0)";
  var lastQuestion = document.getElementById("question"+numberOfPages);
  lastQuestion.classList.remove("activePage");
  lastQuestion.classList.add("previousPage");

  document.getElementById("submitResultsFormButton").addEventListener("click", submitResults);
}

function submitResults(){
  localStorage.setItem("name", document.getElementById("resultsName").value);
  localStorage.setItem("email", document.getElementById("resultsEmail").value);
  resetQuiz(1);
}

function resetQuiz(pageNumber){
  document.getElementById("showScore").innerHTML = "";
  document.getElementById("resultsScreen").style.webkitTransform = "translate(100vw,0)";
  document.getElementById("pageLocation").classList.remove("hiddenPageLocation");
  for(var i = 0; i < numberOfPages; i++){
    score[i] = 0;
    var questionToReset = i + 1;
    document.getElementById(questionToReset).value = "";
    var pages = document.getElementById("question"+questionToReset);
    pages.classList.remove("previousPage");
    pages.style.transition = "";
    pages.style.webkitTransform = "";
  }
  setUpSwipe(1, numberOfPages, "question");
}


function checkAnswer(e){
  if(e.srcElement.value == questionsInfo[e.srcElement.id-1].answer){
    score[e.srcElement.id-1] = 1;
  } else {
    score[e.srcElement.id-1] = 0;
  }
}

function resultsPage(){
    //return "Results";
return "<div id='resultsScreen'><h2>Results</h2><h3 id='showScore'></h3><div id='submitResultsForm'><label for='name' >Name: </label><input type='text' id='resultsName' name='name'/><br><label for='Email' >Email: </label><input type='Email' id='resultsEmail' name='Email'/><br><label for='colour' >Favourite Colour: </label><input type='color' id='colour' name='colour'/><br><input type='submit' name='submit' value='Submit Results' id='submitResultsFormButton' /></div></div>";
}

// Swipe JS
function setUpSwipe(startPage, numOfPages, classToWatch){
    currentPage = startPage;
    numberOfPages = numOfPages;
    sectionToListenTo = classToWatch;

    setPageActiveAndNextPage();

    var swipeElements = document.getElementsByClassName(sectionToListenTo);

    for(var i=0; i<swipeElements.length; i++){
        swipeElements[i].addEventListener("touchstart", touchstart, false);
    }
    createPageCircles(numOfPages, startPage);
  }

function createPageCircles(numberOfPagesInQuiz, startPage){
    var html = "";
    for(var i = 0; i < numberOfPagesInQuiz; i++){
        var pageSelected = i + 1;
        var classes = "circle";
        if(pageSelected === startPage){
            classes += " selectedPageIndicator";
        }
        html += "<div class='"+classes+"' id='page"+pageSelected+"'></div>";
    }
    document.getElementById("pageCircles").innerHTML = html;
}


function setPageActiveAndNextPage(){
  for(var i = 1; i <= numberOfPages; i++){
    var previousPage = document.getElementById(sectionToListenTo+i);
    if(currentPage.toString() == i){
      previousPage.classList.add("activePage");
    } else if(currentPage.toString() > i) {
      previousPage.classList.add("previousPage");
    } else if(currentPage.toString() < i){
      previousPage.classList.add("nextPage");
    }
  }
}


function touchstart(e){
    var element = findRealTarget(e.target, sectionToListenTo);
    element.removeEventListener("touchstart", touchstart, false);
    element.addEventListener("touchend",touchend,false);
    element.addEventListener("touchmove",touchmove,false);

    var startX = e.changedTouches[0].clientX,
        startY = e.changedTouches[0].clientY;

    element.setAttribute("data-x", startX);
    element.setAttribute("data-y", startY);
}

function touchmove(e){
    var element = findRealTarget(e.target, sectionToListenTo);
    var startX = element.getAttribute("data-x"),
        startY = element.getAttribute("data-y");

    var x = e.changedTouches[0].clientX,
        y = e.changedTouches[0].clientY;

    var deltaX = x - startX,
        deltaY = y - startY;

    if(deltaX * deltaX > deltaY * deltaY){
        //swipping to dismiss
        element.style.webkitTransform = "translate(" + deltaX + "px,0px)";

        var mq = window.matchMedia( "(min-width: 700px)" );
        var numberOfPixelsToAdd = 300;
        if (mq.matches) {
          numberOfPixelsToAdd = 700;
        }

        nextPage = getNextPage();
        if(nextPage != null){
          var nextPageMove = parseInt(deltaX) + numberOfPixelsToAdd;
          nextPage.style.webkitTransform = "translate(" + nextPageMove.toString() + "px,0px)";
        }

        previousPage = getPreviousPage();
        if(previousPage != null){
          var previousPageMove = parseInt(deltaX) - numberOfPixelsToAdd;
          previousPage.style.webkitTransform = "translate(" + previousPageMove.toString() + "px,0px)";
        }

        e.preventDefault();
    } else {
        //swiping to scroll
        touchend(e);
    }
}

function touchend(e){
    var element = findRealTarget(e.target, sectionToListenTo);

    var startX = element.getAttribute("data-x"),
        startY = element.getAttribute("data-y");

    var x = e.changedTouches[0].clientX,
        y = e.changedTouches[0].clientY;

    var deltaX = x - startX,
        deltaY = y - startY;


    nextPage = getNextPage();
    previousPage = getPreviousPage();

    if(deltaX < -150 && currentPage != numberOfPages){
      element.style.transition = transformText;
      element.style.webkitTransform = "translate(-100vw,0)";

      nextPage.style.transition = transformText;
      nextPage.style.webkitTransform = "translate(0vw,0)";

      movePagesAroundMoveLeft();

    }else if (deltaX > 150 && currentPage != 1){
      element.style.transition = transformText;
      element.style.webkitTransform = "translate(100vw,0)";

      previousPage.style.transition = transformText;
      previousPage.style.webkitTransform = "translate(0vw,0)";

      movePagesAroundMoveRight();

    }else{
        element.style.transition = transformText;
        element.style.webkitTransform = "";
        if(nextPage != null){
          nextPage.style.transition = transformText;
          nextPage.style.webkitTransform = "";
        }
        if(previousPage != null){
          previousPage.style.transition = transformText;
          previousPage.style.webkitTransform = "";
        }
    }

    setTimeout(function(){
        element.style.transition = "";
        element.style.webkitTransform = "";
        if(nextPage != null){
          nextPage.style.transition = "";
          nextPage.style.webkitTransform = "";
        }
        if(previousPage != null){
          previousPage.style.transition = "";
          previousPage.style.webkitTransform = "";
        }
        element.addEventListener("touchstart", touchstart, false);
        element.removeEventListener("touchend",touchend,false);
        element.removeEventListener("touchmove",touchmove,false);
    }, 500);
}

function movePagesAroundMoveLeft(){
  var previousPage = document.getElementById(sectionToListenTo+currentPage.toString());
  previousPage.classList.add("previousPage");
  previousPage.classList.remove("activePage");

  document.getElementById("page"+currentPage.toString()).classList.remove("selectedPageIndicator");

  currentPage++;

  var newPage = document.getElementById(sectionToListenTo+currentPage.toString());
  newPage.classList.add("activePage");
  newPage.classList.remove("nextPage");

  document.getElementById("page"+currentPage.toString()).classList.add("selectedPageIndicator");
}


function movePagesAroundMoveRight(){
  var nextPage = document.getElementById(sectionToListenTo+currentPage.toString());
  nextPage.classList.add("nextPage");
  nextPage.classList.remove("activePage");

  document.getElementById("page"+currentPage.toString()).classList.remove("selectedPageIndicator");

  currentPage--;

  var newPage = document.getElementById(sectionToListenTo+currentPage.toString());
  newPage.classList.add("activePage");
  newPage.classList.remove("previousPage");

  document.getElementById("page"+currentPage.toString()).classList.add("selectedPageIndicator");
}

// Find an element with a class by checking
// a given element and all (nth-grand)parents
function findRealTarget(elem, className){
    if(elem.classList.contains(className)){
        return elem;
    }else if(elem.parentElement == null){
        return false;
    }else{
        return findRealTarget(elem.parentElement, className);
	}
}

function getNextPage(){
  if(currentPage != numberOfPages){
    var nextPageNum = currentPage+1;
    var nextPage = document.getElementById(sectionToListenTo+nextPageNum.toString());
    return nextPage;
  }
  return null
}

function getPreviousPage(){
  if(currentPage != 1){
    var previousPageNum = currentPage-1;
    var previousPage = document.getElementById(sectionToListenTo+previousPageNum.toString());
    return previousPage;
  }
  return null;
}

//Set everything up
loadPlanetList();
makeRequest("SpaceQuestion.txt", "setQuestions", "quizQuestions");

var mainNav = document.getElementsByClassName("mainNav");
for(var i=0; i<mainNav.length; i++){
    mainNav[i].addEventListener("click", mainNavigation, false);
}

window.addEventListener('popstate', historyPop, false);

setTimeout(function(){
    setActivePage();

    var footer = document.getElementById("mainFooter");
    footer.style.transition = "transform .3s linear";
    footer.style.transform = "translate(0vw,0)";

    footer.style.transition = "-webkit-transform .3s linear";
    footer.style.webkitTransform = "translate(0vw,0)";

    var splashScreen = document.getElementById("splashScreen");
    splashScreen.classList.add("inactive");
}, 500);
