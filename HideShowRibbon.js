// ==UserScript==
// @name         Minimize Navigation Button
// @namespace    https://github.com/apasserbycoder
// @version      0.5
// @author       apasserbycoder
// @match        https://wol.jw.org/*
// @icon         https://www.google.com/s2/favicons?domain=jw.org
// @grant        GM_addStyle
// ==/UserScript==

// set this to enasble state sorage after reload
var keepState = true;

var pubNav = document.getElementById('publicationNavigation');

var hideRibbonButton =document.createElement('div');
hideRibbonButton.setAttribute('id', 'hideRibbonButton');
hideRibbonButton.innerHTML = '<a class="chrome librarySelectionLink" data-lang="M"><span class="label RibbonButton">△</span></a>';

var showRibbonButton =document.createElement('div');
showRibbonButton.setAttribute('id', 'showRibbonButton');
showRibbonButton.innerHTML = '<a class="chrome librarySelectionLink" data-lang="M"><span class="label RibbonButton">▽</span></a>';

pubNav.insertBefore(hideRibbonButton, pubNav.firstChild);
pubNav.insertBefore(showRibbonButton, pubNav.firstChild);

document.getElementById ("hideRibbonButton").addEventListener (
    "click", HideRibbon, false
);

document.getElementById ("showRibbonButton").addEventListener (
    "click", ShowRibbon, false
);

document.getElementById ("hideRibbonButton").style.display="block";
document.getElementById ("showRibbonButton").style.display="none";


window.addEventListener('load', function() {
    if (keepState && sessionStorage.getItem("hidden")=='true' && document.getElementById('publicationNavigation')) HideRibbon();
}, false);

function HideRibbon (zEvent) {
    if (document.getElementById ("hideRibbonButton")) document.getElementById ("hideRibbonButton").style.display="none";
    if (document.getElementById ("showRibbonButton")) document.getElementById ("showRibbonButton").style.display="block";

    if (document.getElementById("siteBanner"))
    {
        sessionStorage.setItem("siteBannerDisplay", document.getElementById("siteBanner").style.display);
        document.getElementById("siteBanner").style.display = "none";
    }
    if (document.getElementById("toolbarFrame")) document.getElementById("toolbarFrame").style.display="none";
    if (document.getElementById("playerwrapper")) document.getElementById("playerwrapper").style.display="none";
    if (document.getElementById("secondaryNavContent")) document.getElementById("secondaryNavContent").style.display="none";
    var element = undefined;
    if (element = document.getElementById("regionMain"))
    {
        element.classList.remove("hasSecondaryNav");
        element.classList.remove("showSecondaryNav");
        sessionStorage.setItem("marginTop", element.style['margin-top']);
        element.style['margin-top']='32px';
    }
    element = undefined;
    if (element = document.getElementById("article"))
    {
        sessionStorage.setItem("maxWidth", element.style['max-width']);
        element.style['max-width']='none';
    }
    element = undefined;
    if (element = document.getElementsByClassName("articlePositioner"))
    {
        if (element.style)
        {
            sessionStorage.setItem("margin-left", element.style['margin-left']);
            element.style['margin-left'] = '0px';
        }
        else element.style = "margin-left:0px;"
    }
    if (keepState) sessionStorage.setItem("hidden", true);
}

function ShowRibbon (zEvent) {
    if (document.getElementById("regionMain")) document.getElementById ("hideRibbonButton").style.display="block";
    if (document.getElementById("regionMain")) document.getElementById ("showRibbonButton").style.display="none";

    if (document.getElementById("siteBanner"))
    {
        document.getElementById("siteBanner").style.display = sessionStorage.getItem("siteBannerDisplay");
    }
    if (document.getElementById("toolbarFrame")) document.getElementById("toolbarFrame").style.display="block";
    if (document.getElementById("playerwrapper")) document.getElementById("playerwrapper").style.display="block";
    if (document.getElementById("secondaryNavContent")) document.getElementById("secondaryNavContent").style.display="block";
    var element = undefined;
    if (element = document.getElementById("regionMain"))
    {
        element.classList.add("hasSecondaryNav");
        element.classList.add("showSecondaryNav");
        element.style['margin-top'] = sessionStorage.getItem("marginTop");
    }
    element = undefined;
    if (element = document.getElementById("article"))
    {
        element.style['max-width'] = sessionStorage.getItem("maxWidth");
    }
    element = undefined;
    if (element = document.getElementsByClassName("articlePositioner"))
    {
        element.style['margin-left'] = sessionStorage.getItem("margin-left");
    }
    if (keepState) sessionStorage.setItem("hidden", false);
}

//--- Style our newly added elements using CSS.
GM_addStyle ( `
    .RibbonButton {
        font-size:16px;
        float: right;
    }
` );
