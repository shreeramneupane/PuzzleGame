/**
 * Created by lf129 on 1/5/15.
 */
$(document).ready(function(){
  var boxValue = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
  createView(boxValue)
  $("#suffle").click(function(){
    suffle();
    $("#suffle").remove();
    $(".wrapper").append("<div id='score'><p>Movement Performed: 0</p></div>");
    $(".box").remove();
    createView(boxValue);
    var score = 0;
    $(".box").click(function(){
      var emptyBoxIndex = $.inArray(0,boxValue);
      var clickedBoxIndex = $.inArray(parseInt($(this).html()),boxValue);
      if(Math.abs(emptyBoxIndex - clickedBoxIndex) == 1 || (Math.abs(emptyBoxIndex/4 - clickedBoxIndex/4) == 1 && Math.abs(emptyBoxIndex - clickedBoxIndex) == 4)){
        $("#empty").html(boxValue[clickedBoxIndex]);
        $("#empty").removeAttr("id");
        $(this).attr("id","empty");
        $(this).empty();
        boxValue[emptyBoxIndex] = boxValue[clickedBoxIndex];
        boxValue[clickedBoxIndex] = 0;
        score++;
        $("#score p").html("Movement Performed: "+score);

        var winned = win(score);
        if(winned == true){
          $(".box").remove();
          $(".wrapper").css('background-color','red');
          $(".wrapper").append("<p>You complete game in "+score+" movement</p>");
        }
      }
    });
  });

  function createView(boxValue){
    for (var i=0; i<16; i++){
      if(boxValue[i] == 0){
        $(".wrapper").append("<div class='box' id='empty'></div>");
      }
      else {
        $(".wrapper").append("<div class='box'>" + boxValue[i] + "</div>");
      }
    }
  }

  function suffle(){
    boxValue = [];
    boxValue.push(Math.floor(Math.random() * 16));
    while(boxValue.length < 16) {
      var isRepeated = false;
      var rand = Math.floor(Math.random() * 16);
      for (var i = 0; i < boxValue.length; i++){
        if (boxValue[i] == rand){
          isRepeated = true;
          break;
        }
      }
      if (isRepeated == false){
        boxValue.push(rand);
      }
    }
  }

  function win(score){
    isWinned = true;
    if(boxValue[0] == 0){
      for(var i = 0; i<boxValue.length; i++){
        if(i != boxValue[i]){
          isWinned = false;
          break;
        }
      }
    } else if(boxValue[0] == 1){
      for(var i = 0; i<boxValue.length; i++){
        if(boxValue[i] != i+1){
          isWinned = false;
          break;
        }
      }
    }else{
      isWinned = false;
    }
    return isWinned;
  }
});
