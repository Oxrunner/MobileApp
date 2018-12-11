<?php
  header('Cache-control: no-transform');
  include(__DIR__."/../../classes/LogHit.php");
  LogHit::LogAHit("mobileApp");
?>
<!DOCTYPE HTML>
<html lang="en">
    <head>
      <script defer src="javascript/main.js"></script>
      <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCDt6Aji4fyjndmXxZQrOteBsW1hY6FsVQ&callback=getUsersLocation"></script>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="format-detection" content="telephone=no" />

      <meta name="msapplication-square70x70logo" content="images/touchIcons/smalltile.png" />
      <meta name="msapplication-square150x150logo" content="images/touchIcons/mediumtile.png" />
      <meta name="msapplication-wide310x150logo" content="images/touchIcons/widetile.png" />
      <meta name="msapplication-square310x310logo" content="images/touchIcons/largetile.png" />

      <link rel="shortcut icon" href="images/touchIcons/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" sizes="57x57" href="images/touchIcons/apple-touch-icon-57x57.png">
      <link rel="apple-touch-icon" sizes="60x60" href="images/touchIcons/apple-touch-icon-60x60.png">
      <link rel="apple-touch-icon" sizes="72x72" href="images/touchIcons/apple-touch-icon-72x72.png">
      <link rel="apple-touch-icon" sizes="76x76" href="images/touchIcons/apple-touch-icon-76x76.png">
      <link rel="apple-touch-icon" sizes="114x114" href="images/touchIcons/apple-touch-icon-114x114.png">
      <link rel="apple-touch-icon" sizes="120x120" href="images/touchIcons/apple-touch-icon-120x120.png">
      <link rel="apple-touch-icon" sizes="144x144" href="images/touchIcons/apple-touch-icon-144x144.png">
      <link rel="apple-touch-icon" sizes="152x152" href="images/touchIcons/apple-touch-icon-152x152.png">
      <link rel="apple-touch-icon" sizes="180x180" href="images/touchIcons/apple-touch-icon-180x180.png">
      <link rel="icon" type="image/png" href="images/touchIcons/favicon-16x16.png" sizes="16x16">
      <link rel="icon" type="image/png" href="images/touchIcons/favicon-32x32.png" sizes="32x32">
      <link rel="icon" type="image/png" href="images/touchIcons/favicon-96x96.png" sizes="96x96">
      <link rel="icon" type="image/png" href="images/touchIcons/android-chrome-192x192.png" sizes="192x192" />

      <link href="images/SplashScreen/Default-Portrait@2x~ipad_1536x2008.png" media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
      <link href="images/SplashScreen/Default-Landscape@2x~ipad_2048x1496.png" media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
      <link href="images/SplashScreen/Default-Portrait~ipad.png" media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)" rel="apple-touch-startup-image">
      <link href="images/SplashScreen/Default-Landscape~ipad_1024x748.png" media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)" rel="apple-touch-startup-image">
      <link rel="apple-touch-startup-image" href="images/SplashScreen/Default-736h.png" media="(device-width: 375px)">
      <link rel="apple-touch-startup-image" href="images/SplashScreen/Default-1242@3x~iphone6s-portrait_1242x2208.png" media="(device-width: 414px)">
      <link rel="apple-touch-startup-image" href="images/SplashScreen/Default-568h@2x~iphone.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)">
      <link href="images/SplashScreen/Default@2x~iphone.png" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
      <link href="images/SplashScreen/Default.png" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)" rel="apple-touch-startup-image" />

        <title>Space App - Home</title>
        <link rel="stylesheet" href="css/main.css" />
        <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
        <script id="planet-list-template-iPhone" type="x-mwp-template">
          <li>
            <a href="#{*idText*}" class="planet-link">
              <article>
                <img src="{*image*}" alt="Image of {*title*}" width="100" height="100" />
                <h2>{*title*}</h2>
                <p>{*informationMini*}.</p>
                <p>Click for more information</p>
              </article>
            </a>
          </li>
        </script>
        <script id="planet-list-template-iPad" type="x-mwp-template">
          <li>
            <a href="#{*idText*}" class="planet-link">
              <article>
                <h2>{*title*}</h2>
                <img src="{*image*}" alt="Image of {*title*}" width="100" height="100"/>
              </article>
            </a>
          </li>
        </script>
        <script id="question-template" type="x-mwp-template">
          <section class="question" id="question{*questionNumber*}">
            <h2>Question {*questionNumber*}</h2>
            <p>{*question*}</p>
            <label for="answerInput">Answer: </label><input class="answer" id="{*questionNumber*}" type="{*type*}" {*extraStuff*}/>
        </section>
        </script>
        <script id="question-template-iPad" type="x-mwp-template">
          <section class="iPadQuestion" id="questionNumber{*questionNumber*}">
            <p>{*question*}</p>
            <label for="answerInput">Answer: </label><input class="answer" id="{*questionNumber*}" type="{*type*}" {*extraStuff*}/>
        </section>
        </script>
        <script id="planet-info-ipad-template" type="x-mwp-template">
        <div class="iPadPlanetInfo" id="{*idText*}-iPad">
          <h2>{*title*}</h2>
          <img src="{*image*}" alt="Planet image of {*title*}" width="300" height="300" class="mast informationPlanetImage"/>
          <p>{*information*}</p>
        </div>
        </script>
    </head>
    <body id="mainBody">

      <div id="splashScreen"></div>

        <!-- Home Page -->
        <div class="mainContent" id="homePage">
            <div id="backgroundMap"></div>
            <div id="mapCover"></div>
            <h1>Explore Space</h1>
            <div id="homePageContent">
              <div id="earthDiv" class="planet" >
                  <img src="MobileAppAPI/images/Earth/Earth40x40.jpg" srcset="MobileAppAPI/images/Earth/Earth40x40.jpg 1x, MobileAppAPI/images/Earth/Earth80x80.jpg 2x, MobileAppAPI/images/Earth/Earth120x120.jpg 3x, MobileAppAPI/images/Earth/Earth160x160.jpg 4x" alt="Image of Earth in space"/>

                  <img src="MobileAppAPI/images/Sun/Sun80x80.jpg" srcset="MobileAppAPI/images/Sun/Sun80x80.jpg 1x, MobileAppAPI/images/Sun/Sun160x160.jpg 2x, MobileAppAPI/images/Sun/Sun240x240.jpg 3x, MobileAppAPI/images/Sun/Sun320x320.jpg 4x" alt="Image of the sun" id="sunHomePage"/>
              </div>
            </div>
        </div>

        <!-- Information Page -->
        <div class="mainContent" id="informationPage">

          <div id="iPhoneInformation">
            <div class="page active" id="page-home">
              <h1>Information</h1>
              <section id="planets">
                <ul id="planetsList">
                  <h2>Contacting NASA, Please Standby...</h2>
                </ul>
              </section>
            </div>

            <div class="page" id="planet-info">
              <header>
                <a href="#planet-info" ><i class="fa fa-arrow-left"></i> Planets</a>
              </header>
              <h1 id="selectedPlanet"></h1>
              <img src="" alt="Story image" width="300" height="300" class="mast" id="imageForPlanetInformation"/>
              <p id="planetInfo"></p>
            </div>
          </div>

          <div id="iPadInformation">
            <h1>Information</h1>
            <div class="plantInfo-iPad" id="page-home-iPad">

              <section id="planets">
                <ul id="planetsList-iPad">
                </ul>
              </section>
            </div>

            <div class="plantInfo-iPad" id="planetInfoHolder">
              <h2>Contacting NASA, Please Standby...</h2>
            </div>

          </div>
        </div>


        <!-- Quiz Page -->
        <div class="mainContent" id="quizPage">
            <h1>Quiz</h1>
            <div class="questionHere" id="questionHere">
              <h2>Contacting NASA, Please Standby...</h2>
            </div>
            <div id="pageLocation">
                <div id="pageCircles">
                </div>
            </div>
        </div>


        <footer id="mainFooter" class="hiddenBelow">
            <nav>
                <ul>
                    <li> <a class="mainNav" href="#homePage"><i id="navIcon" class="fa fa-home"></i><br>Home</a></li>
                    <li> <a class="mainNav" href="#informationPage"><i id="navIcon" class="fa fa-space-shuttle"></i><br>Information</a></li>
                    <li> <a class="mainNav" href="#quizPage"><i id="navIcon" class="fa fa-question"></i><br>Quiz</a></li>
                </ul>
            </nav>
        </footer>
    </body>
</html>
