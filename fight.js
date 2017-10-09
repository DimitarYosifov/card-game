'use strict';
let playerActsFirst = true;
let playerCardsOnTable = 0;
let playerCardsInPlay = 0;////////////////////////////////////////////////////cards ready to get into play
let playerCardsPositions = [false, false, false]
let playerFightCards = []/////////////////////////////////////////////arr with all player's creatures
let playerDeck = []///////////////////////////////////////////////////arr with all player's creatures stats
let playerCardsInAction = []
let isCardPlayed = false;
let playerCardsToBePlayed = 0
let opponentCardsOnTable = 0;
let opponentCardsInPlay = 0
let opponentFightCards = []
let opponentDeck = []
let opponentCardsInAction = []

let newDealDelay = 500;
let isThereDyingCreature = false
let round = 1
let deadHero = false;

function start() {
    $('main').effect('bounce', 500)
    showWhoActsFirst()
    fillPlayerDeckForFight(function done() {
        newPlayerCardIntoCreature(function done() {
            fillPlayerHeroStats(function done() {
                setTimeout(function () {
                    newDeal()
                }, 500)
            })
        })
    });
    fillOpponentDeckForFight(function done() {
        newOpponentCardIntoCreature(function done() {
            fillOpponentHeroStats()
        })
    });
}

function fillOpponentHeroStats() {
    let hero = $('#opponent-hero-container')
    hero.find('.fight-card-name').text(currentFightOpponentHeroStats.name)
    hero.find('.opponent-hero-energy').text(currentFightOpponentHeroStats.energy)
    hero.find('.opponent-hero-health').text(currentFightOpponentHeroStats.health)
    hero.find('.rating-star-img').css('display', 'none')
    for (let i = 0; i < currentFightOpponentHeroStats.level; i++) {
        hero.find('.rating-star-img').eq(i).css('display', 'inline-flex')
    }

}

function fillPlayerHeroStats(done) {
    let hero = $('#player-hero-container')
    hero.find('.fight-card-name').text(savedPlayerHeroStats.name)
    hero.find('.player-hero-energy').text(savedPlayerHeroStats.energy)
    hero.find('.player-hero-health').text(savedPlayerHeroStats.health)
    hero.find('.rating-star-img').css('display', 'none')
    for (let i = 0; i < savedPlayerHeroStats.level; i++) {
        hero.find('.rating-star-img').eq(i).css('display', 'inline-flex')
    }
    done()
}

function fillPlayerDeckForFight(done) {
    let arr = new Array(100)
    for (let i = 0; i < savedPlayerDeck.length; i++) {
        let rand = Math.floor(Math.random() * 100) + 1
        arr.splice(rand, 0, savedPlayerDeck[i])
        if (i === savedPlayerDeck.length - 1) {
            playerDeck = arr.filter(e=>e !== '');
            done()
        }
    }
}

function fillOpponentDeckForFight(done) {
    let arr = new Array(100)
    for (let i = 0; i < currentFightOpponenDeck.length; i++) {
        let rand = Math.floor(Math.random() * 100) + 1
        arr.splice(rand, 0, currentFightOpponenDeck[i])
        if (i === currentFightOpponenDeck.length - 1) {
            opponentDeck = arr.filter(e=>e !== '');
            done()
        }
    }
}

function newDeal() {
    if (deadHero) {
        return
    }
    let position = playerCardsPositions.findIndex(element => element === false)
//        console.log('new deal')
    playerCardsPositions[position] = true
    position++

    if (position > 0 && playerCardsOnTable !== 10) {

        playerCardsToBePlayed++


//            console.log('fuuucking true')
        setTimeout(function () {
//                playerCardsOnTable++

            movingToHand('position' + position)


        }, 500)

    }
    else {
        nextRound()
        if (playerCardsInPlay < 3 && isCardPlayed === false) {
            setTimeout(function () {
                if (playerActsFirst === true) {
                    $('.fight-cards').addClass('clickable')
                    $('#endTurn,#clock').css('pointer-events', 'auto')
                }
                else {
                    opponentCardMovingToPosition()
                }
            }, 0)
        }
        else if (playerCardsInPlay === 3 && playerActsFirst === false) {
            opponentCardMovingToPosition()
        }
    }
    // console.log(playerCardsInPlay);
    if (playerCardsInPlay === 3) {
        setTimeout(function () {
            $('#endTurn,#clock').css('pointer-events', 'auto')

        }, 1900)
    }
    let card = playerCardsPositions.findIndex(element => element === true)
    // console.log(playerCardsToBePlayed);
    if ($('.player-cards-left').text() === '0 cards left' && playerCardsToBePlayed === 0) {
        if (playerActsFirst) {
            console.log('666');
            opponentCardMovingToPosition()
        }
        else {
            console.log('555');
            roundAction()
            // $('#endTurn,#clock').css('pointer-events', 'auto')
        }

    }
}

function newPlayerCardIntoCreature(done) {
    for (let i = 0; i < 10; i++) {
        let current = playerDeck[i]
//            console.log(playerDeck[i])
        let creatureName = current.name
        let playerCards = $('#player-cards')
        let creature = $("<div>").addClass("fight-cards")
        let rating = $("<div>").addClass("rating-stars-container").addClass("hideWhenFaceOff")
        for (var j = 0; j < playerDeck[i].level; j++) {
            let star = $("<img>").attr("src", "imgs/full-star.png").addClass("rating-star-img").appendTo(rating)
        }
        rating.appendTo(creature)
        let name = $("<h1>").addClass("fight-card-name").addClass("hideWhenFaceOff").html(playerDeck[i].name).appendTo(creature)


        let src = '' + (playerDeck[i].src)
        let pic = $("<img>").attr("src", src).addClass("fight-card").appendTo(creature)


        let state = $("<div>").addClass("card-state-container").addClass("hideWhenFaceOff").appendTo(creature);
        let stats = $("<div>").addClass("card-stats-container").appendTo(state);
        let attack = $("<span>").addClass("attack").html(playerDeck[i].attack).appendTo(stats)
        let health = $("<span>").addClass("health").html(playerDeck[i].health).appendTo(stats)
        let stain = $("<img>").attr("src", 'imgs/blood-stain1.gif').addClass("blood-stain1").addClass("hideWhenFaceOff").appendTo(creature)
        creature.appendTo(playerCards)
        playerFightCards.push(creature)
        if (i === 9) {
            done()
        }
    }
}

function newOpponentCardIntoCreature(done) {
    for (let i = 0; i < 10; i++) {
        let current = opponentDeck[i]
//            console.log(playerDeck[i])
        let creatureName = current.name
        let playerCards = $('#opponent-cards')
        let creature = $("<div>").addClass("fight-cards")
        let rating = $("<div>").addClass("rating-stars-container").addClass("hideWhenFaceOff")
        for (var j = 0; j < opponentDeck[i].level; j++) {
            let star = $("<img>").attr("src", "imgs/full-star.png").addClass("rating-star-img").appendTo(rating)
        }
        rating.appendTo(creature)
        let name = $("<h1>").addClass("fight-card-name").addClass("hideWhenFaceOff").html(opponentDeck[i].name).appendTo(creature)


        let src = '' + (opponentDeck[i].src)
        // console.log(opponentDeck[i].src);
        let pic = $("<img>").attr("src", src).addClass("fight-card").appendTo(creature)


        let state = $("<div>").addClass("card-state-container").addClass("hideWhenFaceOff").appendTo(creature);
        let stats = $("<div>").addClass("card-stats-container").appendTo(state);
        let attack = $("<span>").addClass("attack").html(opponentDeck[i].attack).appendTo(stats)
        let health = $("<span>").addClass("health").html(opponentDeck[i].health).appendTo(stats)
        let stain = $("<img>").attr("src", "imgs/blood-stain1.gif").addClass("blood-stain1").addClass("hideWhenFaceOff").appendTo(creature)
        creature.appendTo(playerCards)
        opponentFightCards.push(creature)
        if (i === 9) {
            done()
        }
    }
}

function movingToHand(position) {
    // console.log(playerFightCards);
    // console.log(playerCardsOnTable);
    $('.fight-cards').removeClass('clickable')
//        $('#fight-section').css('pointer-events', 'none')
//        console.log(position)
//        console.log('moving')
    let current = playerCardsOnTable
    playerCardsOnTable++

    let src = '' + $(playerFightCards[current]).find('.fight-card').attr("src")
//        console.log(''+src)
//        console.log(position)

    $('#player-cards').css({
        'perspective-origin': '920px',
        'perspective': '572px'
    })


    if (position === 'position1') {
        $(playerFightCards[current]).css('display', 'block').addClass('toPosition1');
    }
    else if (position === 'position2') {
        $(playerFightCards[current]).addClass('toPosition2').css('display', 'block');
    }
    else if (position === 'position3') {
        $(playerFightCards[current]).addClass('toPosition3').css('display', 'block');
    }
    else {
//            $('#fight-section').css('pointer-events', 'auto')
        return;
    }


    $(playerFightCards[current]).find('.hideWhenFaceOff').css('display', 'none');
    setTimeout(function () {
        $(playerFightCards[current]).find('.hideWhenFaceOff').css('display', 'none');
        $(playerFightCards[current]).find('.fight-card').attr("src", "imgs/card-back.jpg")
    }, 0);

    setTimeout(function () {
        $(playerFightCards[current]).find('.hideWhenFaceOff').css('display', 'block');
        $(playerFightCards[current]).find('.fight-card').attr("src", src)
    }, 170);

    setTimeout(function () {
//           $('#fight-section').css('pointer-events', 'auto')
    }, 1400);

    setTimeout(function () {
//            $(playerFightCards[current]).find('.hideWhenFaceOff').css('display', 'block');
//            $(playerFightCards[current]).find('.fight-card').attr("src", src)

    }, 3250);

    $('.player-cards-left').text(10 - playerCardsOnTable + ' cards left')
    if ($('.player-cards-left').text() === '0 cards left') {
//            setTimeout(function () {
        $('#player-card-back2-container').css('display', 'none')

//            },1400)
    }

    setTimeout(function () {
//            let playerCardBack = $('#player-card-back-container');
//            let lastClass = playerFightCards[current].attr('class').split(' ').pop();
//            $(playerFightCards[current]).addClass('whenHovered')
//            playerFightCards[current].removeClass(lastClass).css('display', 'block');
//            if (playerCardsInPlay === 3) {
//                $('#endTurn,#clock').css('pointer-events', 'auto')
//            }

//                $('.fight-cards').addClass('clickable')


        $(playerFightCards[current]).click(function () {
//                $('#endTurn,#clock').css('pointer-events', 'auto')
//                this.style.webkitAnimationPlayState = "paused";
            if ($(this).hasClass('clickable')) {
                playerCardsToBePlayed--
                $('#endTurn,#clock').css('pointer-events', 'auto')
//                    console.log('oi');
                playerCardsInAction.push(playerFightCards[current])

                playerCardsInPlay++
//                    if(playerCardsInPlay!==3){
                playerCardsPositions[position.substring(8, 9) - 1] = false
//                    }

//                    $(playerFightCards[current]).css('top', '-0px');
                $(playerFightCards[current]).find('.blood-stain1').trigger('mouseout');
                movingToPosition(playerFightCards[current], position)
                isCardPlayed = true;
//                    console.log('iscardplayed ==true')
                $('.fight-cards').removeClass('clickable')
                playerFightCards[current] = ''
            }
        })


        $('.fight-cards').removeClass('clickable')
        newDeal()
        $(playerFightCards[current]).find('.blood-stain1').mouseenter(function () {
            $(playerFightCards[current]).animate({
                'top': '-210'
            }, 300);
        }).mouseout(function () {
            $(playerFightCards[current]).animate({
                'top': '-154'
            }, 0);
        });

//            if(playerCardsInPlay===3){
//                $('.fight-cards').addClass('clickable')
//            }

//            $('.hideWhenFaceOff').css('display', 'none');
//            $('#player-card-back-container .player-card-back').attr("src", "imgs/card-back.jpg");
//            playerCardBack.css('display', 'block');
//            drawSecondCard();
//            drawThirdCard();
//            hideBoxShadow();
    }, 1400)


}

function checkButtonAction() {
    $("#clock,#endTurn").animate({
        left: "+=5px"
    }, 100).animate({
        left: "-=5px"
    }, 200).css('pointer-events', 'none')
    if (playerActsFirst) {
        opponentCardMovingToPosition()

    }
    else {
        roundAction()
//            $('.fight-cards').addClass('clickable')
//            opponentCardMovingToPosition
    }

}

function opponentCardMovingToPosition() {

    function opponentCardNumberDecrease() {
        $('.opponent-cards-left').text(10 - opponentCardsOnTable + ' cards left');
        if ($('.opponent-cards-left').text() === '0 cards left') {

            $('#opponent-card-back-container').css('display', 'none')
        }
    }


    $('#endTurn,#clock').css('pointer-events', 'none')
    if (opponentCardsInPlay !== 3) {

        if (opponentCardsOnTable === 10) {
            roundAction()
            return;
        }

        let src = '' + $(opponentFightCards[opponentCardsOnTable]).find('.fight-card').attr("src");
        let current = opponentCardsOnTable;
        opponentFightCards[current].find('.fight-card').attr('src', 'imgs/card-back.jpg');
        opponentFightCards[current].find('.hideWhenFaceOff').css('display', 'none');
        setTimeout(function () {
            opponentFightCards[current].find('.fight-card').attr('src', src);
            opponentFightCards[current].find('.hideWhenFaceOff').css('display', 'block')
        }, 170);

        setTimeout(function () {
            if (opponentCardsInPlay === 0) {
                opponentFightCards[opponentCardsOnTable].addClass('moveToOpponentHand1').css('display', 'block');
                opponentCardsInPlay++;
                opponentCardsOnTable++;
                opponentCardNumberDecrease()
                // console.log(' opponentCardsOnTable ' + opponentCardsOnTable);
            }
            else if (opponentCardsInPlay === 1) {
                opponentFightCards[opponentCardsOnTable].addClass('moveToOpponentHand2').css('display', 'block');
                opponentCardsInPlay++;
                opponentCardsOnTable++
                opponentCardNumberDecrease()
                // console.log(' opponentCardsOnTable ' + opponentCardsOnTable);
            }
            else if (opponentCardsInPlay === 2) {
                opponentFightCards[opponentCardsOnTable].addClass('moveToOpponentHand3').css('display', 'block');
                opponentCardsInPlay++;
                opponentCardsOnTable++
                opponentCardNumberDecrease()
                // console.log(' opponentCardsOnTable ' + opponentCardsOnTable);
            }
        }, 0)/////////////////////////////1000 originally


        // $('.opponent-cards-left').text(10 - opponentCardsOnTable + ' cards left');
        // if ($('.opponent-cards-left').text() === '0 cards left') {
        //     alert('0 cards left')
        //     $('#opponent-card-back-container').css('display', 'none')
        // }

        setTimeout(function () {
            if (playerActsFirst === true) {
                roundAction()
            }
            else {
                $('.fight-cards').addClass('clickable')
                $('#endTurn,#clock').css('pointer-events', 'auto')
            }
//                isCardPlayed = false;///////////////////////////////////////////////////////////?????????????????

        }, 1400)
//            setTimeout(function () {//////REPEAT FOR TESTING------------------------------------------------------------------
//                roundAction()
//            }, 2800)
        opponentCardsInAction.push(opponentFightCards[current])
    }
    else {///opponent cards in action=3
//            setTimeout(function () {
        if (playerActsFirst) {
            roundAction()
        }
        else {
            $('#endTurn,#clock').css('pointer-events', 'auto')
            $('.fight-cards').addClass('clickable')

        }
        console.log(playerCardsInPlay);
        let card = playerCardsPositions.findIndex(element => element === true)
        console.log(card);
        if (card === -1) {  /////////////////////////////////if player has nothing to play
            setTimeout(function () {
                roundAction()
            }, 500)
        }

//            }, 0)

    }

}

function movingToPosition(e, position) {
//        console.log(playerCardsInPlay)
//        console.dir(position)
    if (playerCardsInPlay === 1) {
        if (position === 'position1') {
            $(e).addClass('moveToHand1to1').css('pointer-events', 'none');
        }
        else if (position === 'position2') {
            $(e).addClass('moveToHand2to1').css('pointer-events', 'none');
        }
        else if (position === 'position3') {
            $(e).addClass('moveToHand3to1').css('pointer-events', 'none');
        }

    }
    else if (playerCardsInPlay === 2) {
        if (position === 'position1') {
            $(e).addClass('moveToHand1to2').css('pointer-events', 'none');
        }
        else if (position === 'position2') {
            $(e).addClass('moveToHand2to2').css('pointer-events', 'none');
        }
        else if (position === 'position3') {
            $(e).addClass('moveToHand3to2').css('pointer-events', 'none');
        }


    }
    else if (playerCardsInPlay === 3) {
        if (position === 'position1') {
            $(e).addClass('moveToHand1to3').css('pointer-events', 'none');
        }
        else if (position === 'position2') {
            $(e).addClass('moveToHand2to3').css('pointer-events', 'none');
        }
        else if (position === 'position3') {
            $(e).addClass('moveToHand3to3').css('pointer-events', 'none');
        }
    }

    setTimeout(function () {
//            alert()
//            alert()
//            let card = $(e.parentElement);
//            let lastClass = card.attr('class').split(' ').pop();
//            card.removeClass(lastClass);
    }, 1400);


//        $(e.parentElement).children('.deck-card-state-container').children('.deck-card-stats-container').hide()
//        $(e.parentElement).children('.deck-card-state-container').children('.deck-card-stats-container').children('.deck-card-health').css({
//            'position': 'relative',
//            'padding-bottom': '2px',
//            'right': '-58px',
//            'bottom': '35px',
//            'display': 'block',
//            'background-size': '40px 30px',
//            'font-size': 21,
//        });
//
//        $(e.parentElement).children('.deck-card-state-container').children('.deck-card-stats-container').children('.deck-card-attack').css({
//            'background': 'url(imgs/attack.png)',
//            "background-size": "35px 28px",
//            'background-position': 'center',
//            'background-repeat': 'no-repeat',
//            'font-size': 21,
//            'margin-left': '10px',
//            'left': '-61px',
//            'top': '-6px'
//        });
//
//        setTimeout(function () {
//            $(e.parentElement).children('.deck-card-state-container').children('.deck-card-stats-container').css({
//                'top': '130px'
//            }).show()
//        }, 1700);
//
//        setTimeout(function () {
//            $(e.parentElement).children('h1').show()
//        }, 1500);
//
//        $(e.parentElement).children('.deck-rating-stars-container').children('.deck-rating-star-img').css(
//                'width', 0 + 'px',
//                'height', 0 + 'px'
//        );
//
//        $(e.parentElement)
//                .css('pointer-events', 'none')
//                //                .addClass('toPosition4')
//                .animate({
//                    'width': 152,
//                    'height': 200,
//                    'top': top,
//                    'left': left
//                }, 333);
//
//        $(e.parentElement).children('.deck-rating-stars-container').animate({
//            'position': 'relative',
//            'top': -2 + 'px',
//            'min-height': 25 + 'px'
//        }, 1000);
//
//        $(e).css(
//                'border', '2px dashed',
//                'box-shadow', '0px 0px 10px #ffffec'
//        );
//
//        setTimeout(function () {
//            $(e.parentElement).children('.deck-rating-stars-container').children('.deck-rating-star-img').animate({
//                'width': 15 + 'px',
//                'height': 15 + 'px'
//            }, 1000);
//        }, 800);
//
//        $(e.parentElement).children('h1').hide().css({
//            'font-size': 18 + 'px',
//            'position': 'relative',
//            'top': -16,
//        });
//
//        $(e).animate({
//            'width': 152,
//            'height': 200
//        }, 1000)
}
//    .replaceWith($(card1).clone())-----------------------------clone element


function roundAction() {
    isCardPlayed = false;
    isThereDyingCreature = false;
//        console.log(playerCardsInAction[0].find($('.attack')).text())
//        console.log(playerCardsInPlay);

    let playerCardInAction1 = playerCardsInAction[0]
    let playerCardInAction2 = playerCardsInAction[1]
    let playerCardInAction3 = playerCardsInAction[2]

    let opponentCardInAction1 = opponentCardsInAction[0]
    let opponentCardInAction2 = opponentCardsInAction[1]
    let opponentCardInAction3 = opponentCardsInAction[2]
//        playerActsFirst=false
    if (playerActsFirst === true) {
        playerTurn(function finished() {
            setTimeout(function () {
                opponentTurn(function finished() {
                    if (isThereDyingCreature) {
                        rearangeCreaturesAfterTurn()
                    }
                    else {
                        newDeal()
                    }
                })
            }, 500)
        })
    }
    else {
        opponentTurn(function finished() {
            setTimeout(function () {
                playerTurn(function finished() {
                    if (isThereDyingCreature) {
                        rearangeCreaturesAfterTurn()
                    }
                    else {
                        newDeal()
                    }
                })
            }, 500)
        })
    }

    function opponentTurn(finished) {
        checkOpponentCard1(function done() {
            checkOpponentCard2(function done() {
                checkOpponentCard3(function done() {
                    finished()
                })
            })
        })

        function checkOpponentCard1(done) {
            opponentCardInAction1 = opponentCardsInAction[0]
            if (opponentCardInAction1) {
//                    console.log(opponentCardInAction1);
                let amountOfDamage = opponentCardInAction1.find('.attack').html()
                if (playerCardInAction1) {
                    opponentCardHitsPlayerCard(opponentCardInAction1, 1, '318px')
                    playerCardTakesHit(playerCardInAction1, amountOfDamage, 0)
                    displayDamage(6, amountOfDamage)
                }
                else {
                    opponentCardHitsPlayerHero(opponentCardInAction1, 1)
                    playerCardTakesHit($('#player-hero-frame'))
                    playerHeroTakesHit(amountOfDamage)
                    displayDamage(5, amountOfDamage)
                }

                setTimeout(function () {
                    done()
                }, 520)
            }
            else {
                done()
            }
        }

        function checkOpponentCard2(done) {
            opponentCardInAction2 = opponentCardsInAction[1]
            if (opponentCardInAction2) {
                let amountOfDamage = opponentCardInAction2.find('.attack').html()
                if (playerCardInAction2) {
                    opponentCardHitsPlayerCard(opponentCardInAction2, 2, '478px')
                    playerCardTakesHit(playerCardInAction2, amountOfDamage, 1)
                    displayDamage(7, amountOfDamage)
                }
                else {
                    opponentCardHitsPlayerHero(opponentCardInAction2, 2)
                    playerCardTakesHit($('#player-hero-frame'))
                    playerHeroTakesHit(amountOfDamage)
                    displayDamage(5, amountOfDamage)
                }

                setTimeout(function () {
                    done()
                }, 520)
            }
            else {
                done()
            }
        }

        function checkOpponentCard3(done) {
            opponentCardInAction3 = opponentCardsInAction[2]
            if (opponentCardInAction3) {
                let amountOfDamage = opponentCardInAction3.find('.attack').html()
                if (playerCardInAction3) {
                    opponentCardHitsPlayerCard(opponentCardInAction3, 3, '638px')
                    playerCardTakesHit(playerCardInAction3, amountOfDamage, 2)
                    displayDamage(8, amountOfDamage)
                }
                else {
                    opponentCardHitsPlayerHero(opponentCardInAction3, 3)
                    playerCardTakesHit($('#player-hero-frame'))
                    playerHeroTakesHit(amountOfDamage)
                    displayDamage(5, amountOfDamage)
                }

                setTimeout(function () {
//                    newDeal()
                    done()
                }, 520)
            }
            else {
                done()
            }
        }
    }

    function playerTurn(finished) {
        checkPlayerCard1(function done() {
            checkPlayerCard2(function done() {
                checkPlayerCard3(function done() {
                    finished()
                })
            })
        })


        function checkPlayerCard1(done) {
            playerCardInAction1 = playerCardsInAction[0]
//                console.log(playerCardInAction1);
            if (playerCardInAction1) {
                let amountOfDamage = playerCardInAction1.find('.attack').html()
                if (opponentCardInAction1) {
                    playerCardHitsOpponentCard(playerCardInAction1, 1, '318px')
                    opponentCardTakesHit(opponentCardInAction1, amountOfDamage, 0)
                    displayDamage(2, amountOfDamage)
                }
                else {
                    playerCardHitsOpponentHero(playerCardInAction1, 1)
                    opponentCardTakesHit($('#opponent-hero-frame'), amountOfDamage)
                    opponentHeroTakesHit(amountOfDamage)
                    displayDamage(1, amountOfDamage)
                }
                setTimeout(function () {
                    done()
                }, 520)
            }
            else {
                done()
            }

        }

        function checkPlayerCard2(done) {
            playerCardInAction2 = playerCardsInAction[1]
            if (playerCardInAction2) {
                let amountOfDamage = playerCardInAction2.find('.attack').html()
                if (opponentCardInAction2) {
                    playerCardHitsOpponentCard(playerCardInAction2, 2, '478px')
                    opponentCardTakesHit(opponentCardInAction2, amountOfDamage, 1)
                    displayDamage(3, amountOfDamage)
                }
                else {
                    playerCardHitsOpponentHero(playerCardInAction2, 2)
                    opponentCardTakesHit($('#opponent-hero-frame'))
                    opponentHeroTakesHit(amountOfDamage)
                    displayDamage(1, amountOfDamage)
                }
                setTimeout(function () {
                    done()
                }, 520)
            }
            else {
                done()
            }
        }

        function checkPlayerCard3(done) {
            playerCardInAction3 = playerCardsInAction[2]
            if (playerCardInAction3) {
                let amountOfDamage = playerCardInAction3.find('.attack').html()
                if (opponentCardInAction3) {
                    playerCardHitsOpponentCard(playerCardInAction3, 3, '638px')
                    opponentCardTakesHit(opponentCardInAction3, amountOfDamage, 2)
                    displayDamage(4, amountOfDamage)
                }
                else {
                    playerCardHitsOpponentHero(playerCardInAction3, 3)
                    opponentCardTakesHit($('#opponent-hero-frame'))
                    opponentHeroTakesHit(amountOfDamage)
                    displayDamage(1, amountOfDamage)
                }

                setTimeout(function () {
                    done()
                }, 520)
            }
            else {
                done()
            }

        }
    }
}


function opponentCardTakesHit(current, amountOfDamage, position) {
//        dyingCreature(current)
    let currentCreatureHealth = current.find('.health').text()
    setTimeout(function () {
        current.animate({
            top: '-=30'
        }, 110, function () {
            $(this).animate({
                opacity: 1
            }, 150, function () {
                $(this).animate({
                    top: '+=30'
                }, 100)
            })
        })
            .find('.health').text(currentCreatureHealth - amountOfDamage)
        current.find('.blood-stain1')
            .animate({
                'opacity': '1'
            }, 0, function () {
                $(this).animate({
                    'opacity': '1'
                }, 900, function () {
                    $(this).animate({
                        'opacity': '0.01'
                    }, 900)
                })
            })
    }, 130)
    if (currentCreatureHealth - amountOfDamage <= 0 && current.attr('id') !== 'opponent-hero-frame') {
        dyingOpponentCreature(current, position)
    }
}

function playerCardTakesHit(current, amountOfDamage, position) {
//        console.log('takes hit')
    let currentCreatureHealth = current.find('.health').text()
    setTimeout(function () {
        current.animate({
            top: '+=30'
        }, 110, function () {
            $(this).animate({
                opacity: 1
            }, 150, function () {
                $(this).animate({
                    top: '-=30'
                }, 100)
            })
        })
            .find('.health').text(currentCreatureHealth - amountOfDamage)
        current.find('.blood-stain1')
            .animate({
                'opacity': '1'
            }, 0, function () {
                $(this).animate({
                    'opacity': '1'
                }, 900, function () {
                    $(this).animate({
                        'opacity': '0.01'
                    }, 900)
                })
            })
    }, 130)
    if (currentCreatureHealth - amountOfDamage <= 0 && current.attr('id') !== 'player-hero-frame') {
        dyingPlayerCreature(current, position)
    }
}


function opponentHeroTakesHit(amountOfDamage) {
    let current = $('#opponent-hero-container')
    let health = current.find('.opponent-hero-health').text()
    setTimeout(function () {
        current.find('.opponent-hero-health').text(health - amountOfDamage)
        function callback() {
            $('#opponent-hero-container').effect('puff', 2000, function () {
                $("#opponent-hero-container").removeAttr("style").hide().fadeIn();
                resetForNewBattle('opponentHeroDied')
            })
        };

        if (health - amountOfDamage <= 0) {
            if (!deadHero) {
                $('#player-cards,.fight-cards,#opponent-card-back-container,.opponent-cards-left,#endTurn,#clock').hide()
                deadHero = true
                $('#opponent-hero-container').toggle('pulsate', 3000, callback)
                $('#opponent-hero-frame').animate({
                    left: '+=450px',
                    top: '+=210px'
                }, 400)
            }
        }
    }, 200)
}

function playerHeroTakesHit(amountOfDamage) {
    let current = $('#player-hero-container')
    let health = current.find('.player-hero-health').text()
    setTimeout(function () {
        current.find('.player-hero-health').text(health - amountOfDamage)
        function callback() {
            $('#player-hero-container').effect('puff', 2000, function () {

                $("#player-hero-container").removeAttr("style").hide().fadeIn();
                resetForNewBattle('playerHeroDied')
            })
        }

        if (health - amountOfDamage <= 0) {
            if (!deadHero) {
                $('#opponent-cards,.fight-cards,#player-card-back2-container,.player-cards-left,#endTurn,#clock').hide()
                deadHero = true
                $('#player-hero-container').toggle('pulsate', 3000, callback)
                $('#player-hero-frame').animate({
                    left: '+=450px',
                    top: '+=100px'
                }, 400)
            }
        }
    }, 200)
}


function playerCardHitsOpponentCard(current, position, perspectiveOrigin) {
//        console.log(perspectiveOrigin)
//        console.log()
//        debugger;
//        console.log(playerCardsInAction);
//        current.removeClass('rearrange2to1');
//        current.removeClass('rearrange3to2');
//        current.removeClass('playerCardLockedToPosition' + position);
//        console.log(playerCardsInAction);
//        void current.offsetWidth;
    $('#player-cards').css('perspective-origin', perspectiveOrigin).addClass('perspective');
    current.attr('class', 'fight-cards')
    current.addClass('attackEnemyFromPosition' + position)
        .animate({'nothing': null}, 500, function () {
            $('#player-cards').css('perspective-origin', '0px').removeClass('perspective');
            $(this).addClass('playerCardLockedToPosition' + position);
        });
//            $(this).removeClass('attackEnemyFromPosition' + position);
//            console.log(playerCardsInAction);
//            console.log(playerCardsInAction);
//            console.log('0000000000000000px')
}

function opponentCardHitsPlayerCard(current, position, perspectiveOrigin) {
    $('#opponent-cards').css('perspective-origin', perspectiveOrigin).addClass('perspective');

//        current.removeClass('opponentCardLockedToPosition' + position);
    current.attr('class', 'fight-cards')
    current.addClass('attackPlayerFromPosition' + position)
        .animate({'nothing': null}, 500, function () {
            $(this).removeClass('attackPlayerFromPosition' + position);
            $('#opponent-cards').css('perspective-origin', '0px').removeClass('perspective');
            $(this).addClass('opponentCardLockedToPosition' + position);
        });
}

function playerCardHitsOpponentHero(current, position) {
    $('#player-cards').css('perspective-origin', '120px').addClass('perspective');
    current.attr('class', 'fight-cards')
//        current.removeClass('playerCardLockedToPosition' + position);
    current.addClass('attackEnemyHeroFromPosition' + position).animate({'nothing': null}, 500, function () {
        $(this).removeClass('attackEnemyHeroFromPosition' + position);
        $('#player-cards').css('perspective-origin', '0px').removeClass('perspective');
        $(this).addClass('playerCardLockedToPosition' + position);
    });
}

function opponentCardHitsPlayerHero(current, position) {
    $('#opponent-cards').css('perspective-origin', '100px').addClass('perspective');
    current.attr('class', 'fight-cards')
//        current.removeClass('opponentCardLockedToPosition' + position);
    current.addClass('attackPlayerHeroFromPosition' + position).animate({'nothing': null}, 500, function () {
        $(this).removeClass('attackPlayerHeroFromPosition' + position);
        $('#opponent-cards').css('perspective-origin', '0px').removeClass('perspective');
        $(this).addClass('opponentCardLockedToPosition' + position);
    });
}

function displayDamage(n, amountOfDamage) {
    let current = $('#damage' + n)
    current.text('-' + amountOfDamage)

    setTimeout(function () {
        current.addClass('damage').css('display', 'block')
    }, 280)

    setTimeout(function () {
        current.removeClass('damage')
        current.css({
            'display': 'none'
        })
    }, 2000)
}

function dyingPlayerCreature(current, position) {
    isThereDyingCreature = true

    setTimeout(function () {
        current.find('.blood-stain1').css('opacity', '1').attr('src', 'imgs/explosion-like.gif')
    }, 0)

    setTimeout(function () {
        current.animate({
            opacity: '0.01'
        }, 1000)
    }, 1000)

    setTimeout(function () {
        // console.log(playerCardsInAction);
        playerCardsInAction[position].remove()
        playerCardsInAction[position] = false
        // console.log(playerCardsInAction);

        playerCardsInPlay--;
    }, 1000)     ////1000
}

function dyingOpponentCreature(current, position) {
    isThereDyingCreature = true

    setTimeout(function () {
        current.find('.blood-stain1').css('opacity', '1').attr('src', 'imgs/explosion-like.gif')
    }, 0)

    setTimeout(function () {
        current.animate({
            opacity: '0.01'
        }, 1000)
    }, 1000)

    setTimeout(function () {
        opponentCardsInAction[position].remove()
        opponentCardsInAction[position] = false
        opponentCardsInPlay--;
        console.log(opponentDeck);
        // debugger
    }, 1000)
}

function rearangeCreaturesAfterTurn() {
//        debugger;
    setTimeout(function () {
        playerCreaturesRearrange()
        opponentCreaturesRearrange()
    }, 500)


    function playerCreaturesRearrange() {
//            console.log(playerCardsInPlay);


        if (playerCardsInAction[0] === false) {
            if (playerCardsInAction[1] !== false) {
                $(playerCardsInAction[1]).addClass('rearrange2to1 playerCardLockedToPosition1');
            }
            if (playerCardsInAction[2] !== false) {
                // console.log('555')

                if (playerCardsInAction[1] === false) {
                    $(playerCardsInAction[2]).addClass('rearrange3to1 playerCardLockedToPosition1');
                }
                else {
                    $(playerCardsInAction[2]).addClass('rearrange3to2 playerCardLockedToPosition2');
                }
            }
        }
        if (playerCardsInAction[1] === false) {
            if (playerCardsInAction[2] !== false) {
                // console.log('666')
                $(playerCardsInAction[2]).addClass('rearrange3to2 playerCardLockedToPosition2');
            }
        }

        // console.log(playerCardsInAction);
        // console.log(playerCardsInAction[0]);
        // console.log(playerCardsInAction[1]);
        // console.log(playerCardsInAction[2]);
        // console.log(playerCardsInAction);
    }

    function opponentCreaturesRearrange() {
        if (opponentCardsInAction[0] === false) {
            if (opponentCardsInAction[1] !== false) {
                $(opponentCardsInAction[1]).addClass('rearrange2to1opponent opponentCardLockedToPosition1');
            }
            if (opponentCardsInAction[2] !== false) {
                if (opponentCardsInAction[1] === false) {
                    $(opponentCardsInAction[2]).addClass('rearrange3to1opponent opponentCardLockedToPosition1');
                }
                else {
                    $(opponentCardsInAction[2]).addClass('rearrange3to2opponent opponentCardLockedToPosition2');
                }
            }
        }
        if (opponentCardsInAction[1] === false) {
            if (opponentCardsInAction[2] !== false) {
                $(opponentCardsInAction[2]).addClass('rearrange3to2opponent opponentCardLockedToPosition2');
            }
        }
    }

    setTimeout(function () {
        playerCardsInAction = playerCardsInAction.filter(element => element !== false)
        opponentCardsInAction = opponentCardsInAction.filter(element => element !== false)
//            playerCardsInAction = []
//            console.log(playerCardsInAction);

    }, 510)
    setTimeout(function () {
        newDeal()
    }, 1000)
}


function nextRound() {
    $('#message').text('Round ' + round).css('display', 'block').effect('slide')
    setTimeout(function () {
        $('#message').effect('drop')
        // $('#round').css('display', 'none')
        round++
    }, 2000)
}

function showWhoActsFirst() {
    let rand = Math.floor((Math.random() * 2) + 1)
    let first;
    if (rand === 1) {
        first = 'You act first'
        playerActsFirst = true
    }
    else {
        first = 'Opponent acts first'
        playerActsFirst = false
    }
    setTimeout(function () {
        $('#message').text(first).css('display', 'block').effect('slide')
    }, 3000)

    setTimeout(function () {
        $('#message').effect('drop')
        // $('#round').css('display', 'none')
        // round++
    }, 5000)
}

function resetForNewBattle(heroDied) {
    playerActsFirst = true;
    playerCardsOnTable = 0;
    playerCardsInPlay = 0;////////////////////////////////////////////////////cards ready to get into play
    playerCardsPositions = [false, false, false]
    playerFightCards = []/////////////////////////////////////////////arr with all player's creatures
    playerDeck = []///////////////////////////////////////////////////arr with all player's creatures stats
    playerCardsInAction = []
    isCardPlayed = false;
    playerCardsToBePlayed = 0
    opponentCardsOnTable = 0;
    opponentCardsInPlay = 0
    opponentFightCards = []
    opponentDeck = []
    opponentCardsInAction = []
    newDealDelay = 500;
    isThereDyingCreature = false
    round = 1
    deadHero = false;
    $('#player-cards,#opponent-cards,.fight-cards,#opponent-card-back-container,#player-card-back2-container,.player-cards-left,.opponent-cards-left,#endTurn,#clock').show()
    $('.fight-cards').remove()
    if (heroDied === 'playerHeroDied') {
        $('#player-hero-frame').css({
            top: '51px',
            left: '0px'
        })
    }
    else {
        $('#opponent-hero-frame').css({
            top: '-=210px',
            left: '0px'
        })
    }

    $('.player-cards-left').text('10 cards left')
    $('.opponent-cards-left').text('10 cards left')
    setTimeout(function () {
        start()
    }, 500)

}
