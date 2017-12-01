// ==UserScript==
// @name New Script
// @namespace Violentmonkey Scripts
// @match *://*/*
// @grant none
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js

$(document).ready(function(){
  var tabReponse = [];
  var tabTest = [];
  function fuck_the_game(){
    console.log("FIRST");
    setInterval(function () {
      if($('.recentBustsContainer > a').length){
          $('.recentBustsContainer > a').each(function(){
            var val = $(this).text();
            tabTest.push(parseFloat(val));
            console.log(val);
          })
          if(tabReponse.length == 0){
            tabTest.reverse();
            tabReponse = tabTest.slice(0);
            tabTest = [];
          }
          else{
            console.log('COUCOU');
            console.log(tabTest[0]);
            if(tabTest[0]==tabReponse[tabReponse.length-1]){

            }
            else{
              tabReponse.push(tabTest[0]);
            }
            tabTest = [];

         }
          console.log(tabReponse);
          analyze_tab(tabReponse);
      }
      else{
        console.log ("rien");
      }

    }, 5000);
  }
//////////////////
/*
* La fonction ne marche pas encore
* Elle ne prends pas en compte l'ajout de valeur au fil du temps, je ne sais pas pourquoi
* La gestion des cas a analyser pour evaluer les chances en fonction des couples est surement
* fausse
*
*/
//////////////////
  function analyze_tab(tab){
    var parfait = 2;
    var moyen = 1.75;
    var mauvais = 1.50;
    //a définir en fonction de nos choix de cashout
    var choix = mauvais;
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

});
/*
 *
 *
 *             //Tout les cas ne sont pas traité car la fonction se relancera forcement plus rapidement :)
            var max = tabReponse.length;
            console.log(tabReponse.length);
            if(tabTest[5]==tabReponse[max-6]){
              if(tabTest[4] == tabReponse[max-5]){
                if(tabTest[3] == tabReponse[max-4]){
                  if(tabTest[2] == tabReponse[max-3]){
                    if(tabTest[1] == tabReponse[max-2]){
                      if(tabTest[0] == tabReponse[max-1])[

                      ]
                      else{
                        tabReponse.push(tabTest[0]);
                        console.log('hi');
                      }
                    }
                    else{
                      if(tabTest[0] == tabReponse[max-1])[
                        //impossible
                      ]
                      else{
                        tabReponse.push(tabTest[1]);
                        tabReponse.push(tabTest[0]);
                        console.log('hi2');
                      }
                    }
                  }
                }
              }
            }
       */
