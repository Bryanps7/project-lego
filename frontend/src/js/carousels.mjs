import * as module from "./config.js";

const prevBtnCpts = document.querySelectorAll(".prev-btn-cpt")
const nextBtnCpts = document.querySelectorAll(".next-btn-cpt")
const carouselBodyCpts = document.querySelectorAll(".carousel-body-cpt")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")
const carouselBody = document.querySelector(".carousel-body")
const prevBtnSpdf = document.querySelector(".prev-btn-spdf")
const nextBtnSpdf = document.querySelector(".next-btn-spdf")
const carouselBodySpdf = document.querySelector(".carousel-body-spdf")

prevBtnCpts.forEach((btn, index) => {
    module.CarouselNoRestart(prevBtnCpts[index], nextBtnCpts[index], carouselBodyCpts[index]);
});
module.CarouselNoRestart(prevBtn, nextBtn, carouselBody);
module.CarouselNoRestart(prevBtnSpdf, nextBtnSpdf, carouselBodySpdf);