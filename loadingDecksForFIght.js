/**
 * Created by user1 on 9.10.2017 г..
 */
let savedPlayerDeck=[
    {
        level: 0,
        name: 'Bear',
        src: "imgs/bear.jpg",
        attack: 4,
        health: 5
    },
    {
        level: 4,
        name: 'Snake',
        src: "imgs/snake.jpg",
        attack: 4,
        health: 11
    },
    {
        level: 3,
        name: 'Snake',
        src: "imgs/snake.jpg",
        attack: 4,
        health: 5
    },
    {
        level: 1,
        name: 'Snake',
        src: "imgs/snake.jpg",
        attack: 3,
        health: 4
    },
    {
        level: 3,
        name: 'Lion',
        src: "imgs/lion.jpg",
        attack: 2,
        health: 5
    },
    {
        level: 0,
        name: 'Tiger',
        src: "imgs/tiger.jpg",
        attack: 4,
        health: 5
    },
    {
        level: 0,
        name: 'Snake',
        src: "imgs/snake.jpg",
        attack: 3,
        health: 4
    },
    {
        level: 0,
        name: 'Snake',
        src: "imgs/snake.jpg",
        attack: 1,
        health: 7
    },
    {
        level: 2,
        name: 'Red Fox',
        src: "imgs/red fox.jpg",
        attack: 4,
        health: 5
    },
    {
        level:3,
        name: 'Snake',
        src: "imgs/snake.jpg",
        attack: 3,
        health: 6
    },


]
let currentFightOpponenDeck=[
    {
        level: 0,
        name: 'Crocodile',
        src: "imgs/crocodile.jpg",
        attack: 4,
        health: 5
    },
    {
        level: 4,
        name: 'Snake',
        src: "imgs/snake.jpg",
        attack: 4,
        health: 11
    },
    {
        level: 3,
        name: 'Snake',
        src: "imgs/snake.jpg",
        attack: 4,
        health: 5
    },
    {
        level: 1,
        name: 'Snake',
        src: "imgs/snake.jpg",
        attack: 3,
        health: 4
    },
    {
        level: 3,
        name: 'Lion',
        src: "imgs/lion.jpg",
        attack: 2,
        health: 5
    },
    {
        level: 0,
        name: 'Tiger',
        src: "imgs/tiger.jpg",
        attack: 4,
        health: 5
    },
    {
        level: 0,
        name: 'Snake',
        src: "imgs/snake.jpg",
        attack: 3,
        health: 4
    },
    {
        level: 0,
        name: 'Snake',
        src: "imgs/snake.jpg",
        attack: 1,
        health: 7
    },
    {
        level: 2,
        name: 'Red Fox',
        src: "imgs/red fox.jpg",
        attack: 4,
        health: 5
    },
    {
        level:3,
        name: 'Snake',
        src: "imgs/snake.jpg",
        attack: 3,
        health: 6
    },


]
let savedPlayerHeroStats={
    level:2,
    name:'ivan',
    energy:33,
    health:23
}

let currentFightOpponentHeroStats={
    level:1,
    name:'gosho',
    energy:11,
    health:19
}