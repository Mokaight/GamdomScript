// ==UserScript==
// @name New Script
// @namespace Violentmonkey Scripts
// @match *://*/*
// @grant none
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require https://raw.githubusercontent.com/eligrey/FileSaver.js/master/FileSaver.js
$(document).ready(function(){
  var tabReponse = [];
  var tabTest = [];
  var a = document.createElement("a");
  var loadingFiles=[];
  var resultat;

  function fuck_the_game(){
    console.log("FIRST");
    setInterval(function () {
      if($('.recentBustsContainer > a').length){
          $('.recentBustsContainer > a').each(function(){
            var val = $(this).text();
            tabTest.push(parseFloat(val));
           /* console.log(val);*/
          })
          if(tabReponse.length == 0){
            tabTest.reverse();
            tabReponse = tabTest.slice(0);
            tabTest = [];
          }
          else{
           /* console.log('COUCOU');
            console.log(tabTest[0]);*/
            if(tabTest[0]==tabReponse[tabReponse.length-1]){

            }
            else{
              tabReponse.push(tabTest[0]);
            }
            tabTest = [];

         }
         /* console.log(tabReponse);
          console.log(tabReponse.length);*/
          analyze_tab(tabReponse);
      }
      else{
        console.log ("rien");
      }

    }, 5000);
  }

  function analyze_tab(tab){
    var choix = 1.75;
    var value = parseFloat($(".autobet-input-div > input[name=cash-out").val());
    console.log("Cest la value : " + value);
    if(value != 0){
      choix = value;
    }
    var resultat_tab_sup = [];
    var resultat_tab_inf = [];
    for(var lol=tab.length-1;lol>0;lol--){
      if( (lol-1) >= 0){
        //cas de notre dernière val est > au cash out
        if(tab[tab.length-1] > choix){
          if (tab[lol-1] > choix){
            resultat_tab_sup.push(tab[lol]);

          }
        }
        //cas ou notre dernière valeur est < au cashout
        else{
          if(tab[lol-1] < choix){
            resultat_tab_inf.push(tab[lol]);
          }
        }
      }
    }
    //on traite resultat_tab_sup
    if(tab[tab.length-1] > choix){

      var vrai = 0;
      for (var boucle = 0;boucle < resultat_tab_sup.length;boucle++){
        if (resultat_tab_sup[boucle] > choix){
          vrai = vrai +1;
        }
      }
      var result = (vrai / resultat_tab_sup.length)*100;
      console.log("Chance prédécesseur T : " + result + "valeur de vrai " + vrai);
      document.getElementById('myButton3').innerHTML="";
      document.getElementById('myButton3').innerText = "Pourcentage de chance au dessus de : " + value + "  est de : " + result + " cas similaire " + vrai;

    }
    //on traite resultat_tab_inf
    else{

      var v = 0;
      for (var b = 0;b< resultat_tab_inf.length;b++){
        if (resultat_tab_inf[b] > choix){
          v = v +1;
        }
      }
      var result2 = (v / resultat_tab_inf.length)*100;
      console.log("Chance prédécesseur F : " + result2 + "valeur de vrai " + v);
    }

  }
/////////////////////
  fuck_the_game();
/////////////////////
var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">'
                + 'Save les données</button>'
                ;
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

var zNode2       = document.createElement ('div');
zNode2.innerHTML = '<input style="position:absolute;z-index:999:float:left;left: 0%" id ="myButton2" type="file">';
zNode2.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode2);

var zNode3       = document.createElement ('div');
zNode3.innerHTML = '<p style="position:absolute;z-index:999:float:left;left: 15%;top : 5%;color:red" id ="myButton3">COUCOU </p>';
zNode3.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode3);

document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction (zEvent) {
    var zNode       = document.createElement ('p');
    var blob = new Blob(tabReponse, {type: "text/plain;charset=utf-8"});
    saveAs(blob, "data.txt");
}
document.getElementById('myButton2').onchange = function(){

    var file = this.files[0];

    var reader = new FileReader();
    reader.onload = function(progressEvent){
      // Entire file
      console.log(this.result);
      resultat = this.result;
      loading_into_tab(resultat);
    };
    reader.readAsText(file);
};

function loading_into_tab(resultat){
  for (var i=0;i<resultat.length;i++){
        if(i%4 == 0 || i ==0){
          tabReponse.push(parseFloat(resultat.slice(i,i+4)));
        }
  }
  console.log("Effectué");
  console.log(tabReponse);
}

});
