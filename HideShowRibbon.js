// ==UserScript==
// @name         No ribbon button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       You
// @match        https://wol.jw.org/*
// @icon         https://www.google.com/s2/favicons?domain=jw.org
// @grant        GM_addStyle
// ==/UserScript==


document.getElementById('siteBanner').innerHTML += '<div id="hideRibbonButton"><a class="chrome librarySelectionLink spriteLink" data-lang="M"><span style="font-size:30px; display:inline-flex" class="label">△</span></a></div>';

var showRibbonButton =document.createElement('div');
showRibbonButton.setAttribute('id', 'showRibbonButton');
showRibbonButton.innerHTML = '<a class="chrome librarySelectionLink spriteLink" data-lang="M"><span class="label">▽</span></a>';


document.body.appendChild(showRibbonButton);

var marginTop;
var maxWidth;
//--- Activate the newly added button.
document.getElementById ("hideRibbonButton").addEventListener (
    "click", HideRibbon, false
);

document.getElementById ("showRibbonButton").addEventListener (
    "click", ShowRibbon, false
);

document.getElementById ("hideRibbonButton").style.display="block";
document.getElementById ("showRibbonButton").style.display="none";

function HideRibbon (zEvent) {
    if (document.getElementById ("hideRibbonButton")) document.getElementById ("hideRibbonButton").style.display="none";
    if (document.getElementById ("showRibbonButton")) document.getElementById ("showRibbonButton").style.display="block";

    if (document.getElementById("regionHeader")) document.getElementById("regionHeader").style.display="none";
    if (document.getElementById("secondaryNavContent")) document.getElementById("secondaryNavContent").style.display="none";
    var element = undefined;
    if (element = document.getElementById("regionMain"))
    {
        element.classList.remove("showSecondaryNav");
        marginTop = element.style['margin-top'];
        element.style['margin-top']='0px';
    }
    element = undefined;
    if (element = document.getElementById("article"))
    {
        maxWidth = element.style['max-width'];
        element.style['max-width']='none';
    }
}

function ShowRibbon (zEvent) {
    if (document.getElementById("regionMain")) document.getElementById ("hideRibbonButton").style.display="block";
    if (document.getElementById("regionMain")) document.getElementById ("showRibbonButton").style.display="none";

    if (document.getElementById("regionHeader")) document.getElementById("regionHeader").style.display="block";
    if (document.getElementById("secondaryNavContent")) document.getElementById("secondaryNavContent").style.display="block";
    var element = undefined;
    if (element = document.getElementById("regionMain"))
    {
        element.classList.add("showSecondaryNav");
        element.style['margin-top']=marginTop;
    }
    element = undefined;
    if (element = document.getElementById("article"))
    {
        element.style['max-width']=maxWidth;
    }
}

//--- Style our newly added elements using CSS.
GM_addStyle ( `
    #showRibbonButton {
        position:fixed;
        background: white;
        top:0%;
        right:0%;
        font-size:30px;
    }
` );
