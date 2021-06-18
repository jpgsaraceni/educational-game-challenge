$(document).ready(() => {

  class Game {

    #cash;

    constructor() {
      this.#cash = new Cash(20);
    }

    getCash() {
      return this.#cash.getValue();
    }

    setCash(_points){
      this.#cash.addCash(_points);
    }

  }


  class Stage {
    #stageDeck;
    #stageIndex
    #points

    constructor(_deck) {
      this.#stageIndex = _deck; //animals
      this.#stageDeck = new Deck(_deck); //animals
      this.#points = new Point(); //Pontos = 0;
    }

    playSound(_index) {
      return this.#stageDeck.getCardSound(_index);
    }

    getPoints(){
      return this.#points.getPoints();
    }

    rightDrop(){
      this.#points.addPoints(10);
    }

    wrongDrop(){
      this.#points.removePoints(5);
    }


    endStage(){
        game.setCash(this.getPoints()/10);
        $(".input-coin-value").text(`${game.getCash()}`);
    }
  }

  class Deck {
    #category;

    #animalsDeck = {
      //cardX : new Card("name","habitat"),
      card4: new Card(4, "turtle", "Tartaruga", "domestic","animals"),
      card12: new Card(12, "polar_bear", "Urso Polar", "snow","animals"),
      card5: new Card(5, "panda", "Panda", "jungle","animals"),
      card9: new Card(9, "penguin", "Pinguim", "snow","animals"),
      card1: new Card(1, "dog", "Cachorro", "domestic","animals"),
      card6: new Card(6, "red_panda", "Panda Vermelho", "jungle","animals"),
      card10: new Card(10, "snow_owl", "Coruja das Neves", "snow","animals"),
      card7: new Card(7, "koala", "Coala", "jungle","animals"),
      card2: new Card(2, "cat", "Gato", "domestic","animals"),
      card11: new Card(11, "snow_weasel", "Doninha da Neve", "snow","animals"),
      card8: new Card(8, "lemur", "Lemure", "jungle","animals"),
      card3: new Card(3, "fish", "Peixes", "domestic","animals"),
    };

    #foodDeck = {
      card4: new Card(4, "apple", "Maçã", "fruit","food"),
      card12: new Card(12, "cabbage", "Repolho", "vegetable","food"),
      card5: new Card(5, "chard", "Acelga", "vegetable","food"),
      card9: new Card(9, "gum", "Chiclete", "candy","food"),
      card1: new Card(1, "ice_cream", "Sorvete", "candy","food"),
      card6: new Card(6, "jelly_beans", "Jujuba", "candy","food"),
      card10: new Card(10, "kiwi", "Kiwi", "fruit","food"),
      card7: new Card(7, "orange", "Laranja", "fruit","food"),
      card2: new Card(2, "pear", "Pêra", "fruit","food"),
      card11: new Card(11, "spinach", "Espinafre", "vegetable","food"),
      card8: new Card(8, "candy_cane", "Bengala Doce", "candy","food"),
      card3: new Card(3, "cress", "Agrião", "vegetable","food"),
    }

    #mathDeck = {
      card4: new Card(4, "eight", "Oito", "multiplication","math"),
      card12: new Card(12, "eleven", "Onze", "addition","math"),
      card5: new Card(5, "fifteen", "Quinze", "addition","math"),
      card9: new Card(9, "forty", "Quarenta", "multiplication","math"),
      card1: new Card(1, "four", "Quatro", "subtraction","math"),
      card6: new Card(6, "nine", "Nove", "multiplication","math"),
      card10: new Card(10, "one", "Um", "multiplication","math"),
      card7: new Card(7, "seven", "Sete", "subtraction","math"),
      card2: new Card(2, "six", "Seis", "subtraction","math"),
      card11: new Card(11, "ten", "Dez", "subtraction","math"),
      card8: new Card(8, "two", "Dois", "addition","math"),
      card3: new Card(3, "twenty", "twenty", "addition","math"),
    }



    constructor(_category) { // Animals
      this.#category = _category; //É o habitat
      this.setDeck(_category);
    }

    getCardSound(_index) {
      return eval(`this.#${this.#category}Deck.card${_index}.getSound()`);
      //return new Function(`return this.getCard().card${_index}.getSound()`);
    }

    setDeck(_category){

      if(_category == "animals"){
        for(let card in this.#animalsDeck){
            this.#animalsDeck[card].createCardElement();
        }
      }

      if(_category == "food"){
        for(let card in this.#foodDeck){
            this.#foodDeck[card].createCardElement();
        }
      }

      if(_category == "math"){
        for(let card in this.#animalsDeck){
            this.#mathDeck[card].createCardElement();
        }
      }
    }

  }

  class Card {
    #index;
    #name;
    #translation;
    #sound;
    #category;
    #area;

    constructor(_index, _name, _translation, _area, _category) {
      this.#index = _index;
      this.#name = _name;
      this.#translation = _translation;
      this.#sound = new Audio(`audio/${_category}/${_name}.mp3`);
      this.#category = _category;
      this.#area = _area;
      //this.createCardElement();
    }

    createCardElement(){
      $(`#card${this.#index}`).attr("class", `card ${this.#area}`).attr("icon", `${this.#name}-${this.#area}-habitat`).attr("index", `${this.#index}`).html(
        `<div class="card-front">
                    <div>
                    <img class="image" src="img/${this.#category}/${this.#name}.svg">
                    </div>
                </div>
                <div class="card-back">
                    <div class="data">
                        <span class="card-name">${this.#name.replace("_", " ")}</span><br>
                        <span class="card-sub">${this.#translation}</span>
                    </div>
                </div>`
      );
    };

    getSound() {
      return this.#sound.play();
    }


  }

  class Cash {
    #value;

    constructor(_value) {
      this.#value = _value;
    }

    getValue() {
      return this.#value;
    }

    addCash(_value) {
      this.#value += _value;
    }

    removeCash(_value) {
      if ((this.#value - _value) < 0) {
        return false;
      } else {
        this.#value -= _value;
        return true;
      }
    }

  }

  class Point {
    // Começa com 0 pontos e 20 coins
    // 10 pts = 1 coin
    // 1 Acerto = 10 pts
    // 1 Erro = -5 pts
    // Não pode ser menos que zero
    // Dica 5 coins

    #points;

    constructor() {
      this.#points = 0;
    };

    getPoints() {
      return this.#points;
    }

    addPoints(_value) {
      this.#points += _value;
    }

    removePoints(_value) {
      if ((this.#points - _value) < 0) {
        this.#points = 0;
      } else {
        this.#points -= _value;
      }
    }

  }

  let stage;

  ////////////////////////////////////
  //  INITIAL STATE STAGE FUNCTION  //
  ////////////////////////////////////

  function startStage(_category){ // sets the stage initial stage state
    $(`#animals-section`).hide();
    $(`#food-section`).hide();
    $(`#math-section`).hide();
    $(`#${_category}-section`).show();
    $(`#${_category}-stage-modal`).fadeOut(1000).hide();
    $("#icons-button").fadeOut(1000).hide();
    $("#stages").css("background-image", "linear-gradient(#FFEBDB,#FFDBBF)");
    $(".stage").show();
    $(".card").css("transition", ".5s").show();
    $("img[class*='in-category']").css("visibility", "hidden");

    stage = new Stage(_category);
    $(".input-points-value").text(stage.getPoints());

    
  }

  ///////////
  //  END  //
  ///////////

  const game = new Game(); 

  $("#landing-page").show();
  $("#store").hide();
  $("#stages").hide();
  $(".modal-quit-stage").hide();
  $("#modal-complete-stage-animals").hide();
  $("#modal-complete-stage-food").hide();
  $("#modal-complete-stage-math").hide();
  $(".start-stage-modal").hide();
  $("#building-store").hide();
  // hide as tela


  ////////////////////
  //  LANDING PAGE  //
  ////////////////////

  $("#start-game-button").on("click", function () {
    $("#landing-page").slideUp(1000);
    $(".input-coin-value").text(game.getCash());
    $(".input-coin-value").text(game.getCash());
    $("#stages").show();
  });


  $("#help-button").on("click", function(){
    $(".landing-page-button").fadeOut(1000).hide();
    $("#all-tutorial").css("display","flex");
  });

  $("#back-video-help").on("click", function(){
    $("#all-tutorial").fadeOut(1000).css("display","none");
    $(".landing-page-button").fadeIn(1000).show();
  });
  /////////////////
  //  STAGE MAP  //
  /////////////////

  $("#stages-map-return-icon").on("click", function () {
    $("#landing-page").slideDown(1000);
  });

  $("#store-icon").on("click", function () {
    $("#return-button").fadeOut(1000).hide();
    $("#stages-map").fadeOut(1000).hide();
    $("#icons-button").fadeOut(1000).hide();
    $("#building-store").fadeIn(1000).show();
    /*
    $("#stages").slideUp(1000);
    $("#store").show();
    */
  });

  $(".building-modal-button").on("click", function(){
    $("#return-button").fadeIn(1000).show();
    $("#stages-map").fadeIn(1000).show();
    $("#icons-button").fadeIn(1000).show();
    $("#building-store").fadeOut(1000).hide();
  });

  $(".stage-button").on("click", function (){
    $("#return-button").fadeOut(1000).hide();
    $("#stages-map").fadeOut(1000).hide();
    $("#icons-button").fadeOut(1000).hide();
    $(`#${$(this).attr("stage")}-stage-modal`).fadeIn(1000).show();
    console.log(`${$(this).attr("stage")}-stage-modal`);
  });

  //////////////////////
  // STAGE MODAL MAP  //
  //////////////////////

  $(".quit-stage-button").on("click", function () {
    $(".modal-quit-stage").fadeIn(1000).show();
  });

  $("#confirm-quit-stage").on("click", function () {
    $(".stage").fadeOut(1000).hide();
    $(".modal-quit-stage").fadeOut(1000).hide();
    $("#stages").css("background-image", "url(" + "img/tela_fases.svg" + ")");
    $(".start-stage-modal").fadeOut(1000).hide();
    $("#icons-button").fadeIn(1000).show();
    $("#stages-map").fadeIn(1000).show();
    $("#return-button").show();
  });

  $("#confirm-stay-stage").on("click", function () {
    $(".modal-quit-stage").fadeOut(1000).hide();
  });

  /////////////
  //  MODAL  //
  /////////////
  $(".stage-start-button").on("click", function () {
    startStage($(this).attr("stage"));
  });

  $("#stage-cancel-button").on("click", function () {
    $(".start-stage-modal").fadeOut(1000).hide();
    $("#return-button").show();
    $(".return-button").css("padding", "11.5vh 5vw 0 0");
    $("#stages-map").fadeIn(1000).show();
    $("#icons-button").show();
  });

  $("#food-stage-cancel-button").on("click", function(){
    $(".start-stage-modal").fadeOut(1000).hide();
    $("#return-button").show();
    $(".return-button").css("padding", "11.5vh 5vw 0 0");
    $("#stages-map").fadeIn(1000).show();
    $("#icons-button").show();
  });

  $("#math-stage-cancel-button").on("click", function(){
    $(".start-stage-modal").fadeOut(1000).hide();
    $("#return-button").show();
    $(".return-button").css("padding", "11.5vh 5vw 0 0");
    $("#stages-map").fadeIn(1000).show();
    $("#icons-button").show();
  });
  /////////////
  //  STORE  //
  /////////////

  $("#store-return-icon").on("click", function () {
    $("#stages").slideDown(1000);
  });

  ///////////////////////////
  //  DRAGGABLE DROPPABLE  //
  ///////////////////////////

  let dropCounter = 0;

  // Makes card elements draggable, and reverts to initial position if not dropped in correct category.
  $(".card").draggable({
    drag: function() {
      $(this).css("transition", "none");
    },
    revert: function (is_valid_drop) {
      if (!is_valid_drop) {
        stage.wrongDrop(); // chamar método q subtrai ponto
        $(".input-points-value").text(stage.getPoints());
        $(this).css("transition", ".5s");
        return true;
      } else {
        return true;
      }
    }
  });

  // Makes category element droppable only for cards that belong to that category.
  $("#accept-snow").droppable({
    accept: ".snow"
  });

  $("#accept-domestic").droppable({
    accept: ".domestic"
  });

  $("#accept-jungle").droppable({
    accept: ".jungle"
  });

  $("#accept-vegetable").droppable({
    accept: ".vegetable"
  });

  $("#accept-fruit").droppable({
    accept: ".fruit"
  });

  $("#accept-candy").droppable({
    accept: ".candy"
  });

  $("#accept-addition").droppable({
    accept: ".addition"
  });

  $("#accept-subtraction").droppable({
    accept: ".subtraction"
  });

  $("#accept-multiplication").droppable({
    accept: ".multiplication"
  });

  // Hides cards when they are dropped in correct category, and puts the image (TEXT PLACEHOLDER) in the category.
  $(".drop-area").droppable({
    drop: function (event, ui) {
      dropCounter++;
      stage.rightDrop();
      $(".input-points-value").text(stage.getPoints());
      ui.draggable.hide();
      $(`#${$(ui.draggable).attr("icon")}`).css("visibility", "visible");
      if (dropCounter == 12) {
        stage.endStage();
        console.log("completou");
        $(`#modal-complete-stage-${$(this).attr("stage")}`).show();
      }
    }
  });

  $(`.end-complete-stage-button`).on("click", function () {
   $(".start-stage-modal").fadeOut(1000).hide();
    $(".stage").hide();
    $(".input-coin-value").text(`${game.getCash()}`);
    dropCounter = 0;
    $(`#modal-complete-stage-${$(this).attr("stage")}`).fadeOut(1000).hide();
    $("#stages").css("background-image", "url(" + "img/tela_fases.svg" + ")");
    $("#icons-button").fadeIn(1000).show();
    $("#stages-map").fadeIn(1000).show();
    $("#return-button").show();
    $(".modal-complete-stage").hide();
    // 
  });

  $(".card ").on("mousedown", function () {
    stage.playSound($(this).attr("index"));
  });

});

//Att. Fav