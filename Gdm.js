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
    setInterval(function () {
      if($('.recentBustsContainer > a').length){
          $('.recentBustsContainer > a').each(function(){
            var val = $(this).text();  
            tabTest.push(val);
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
      }
      else{
        console.log ("rien");
      }

    }, 5000);
  }
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
