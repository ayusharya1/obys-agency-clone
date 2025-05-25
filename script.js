function locomotive() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
function loadingAnimation() {
    let count = document.querySelector("#count");

    const countHandler = () => {
        // console.log(count.innerHTML);
        let counter = Number(count.innerHTML);

        setInterval(() => {
            if (counter < 100) {
                counter++;
                count.innerHTML = counter;
            }
            else {
                count.innerHTML = 100;
            }
        }, 25);
    }
    countHandler();

    var tl = gsap.timeline()

    tl.from(".line h1", {
        y: 150,
        stagger: 0.25 /*taki ek k bad ek aye*/,
        duration: 0.6,
        delay: 0.5
    })
    tl.to(".line h2", {
        animationName: "anime",
        opacity: 1,
    })
    // ab humein yh loader page ko hatana h uske liya
    tl.to("#loader", {/*to hatane k liya*/
        opacity: 0,
        delay: 0,///////correctionnnnnnnnnnnnnnn(0 ki jgh 4)
        duration: 0.2
    });

    tl.from("#page1", {
        y: 1600,
        opacity: 0,
        delay: 0.2,
        duration: 0.4,
        ease: Power4/*taki wh ata hua ache seh dikhe*/
    })
    tl.to("#loader", {
        display: "none"/*taki humara loader gayab hojaye*/
    })
    tl.from("#nav", {
        opacity: 0
    })
    tl.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero4 h1", {
        y: 140,
        stagger: 0.22
    })
    tl.from("#hero1,#page2", {
        opacity: 0
    }, "-=1.2")/*yh likhke humne yh wala animation thoda phele chala diya*/
}
const crsrAnimation = () => {
    // making cursor
    // document.addEventListener("mousemove", (dets) => {
    //     // console.log("hello");
    //     gsap.to(".crsr", {
    //         left: dets.x,
    //         top: dets.y
    //     })

    // })
    Shery.mouseFollower({
        skew: true,
        ease: "cubic-bezier(0.23,1,0.320,1)",
        duration: 1
    });

    //used shery js libraray
    Shery.makeMagnet("#nav-part2 h4", {
    });

    document.querySelector(".video-container").addEventListener("mouseenter", function () {
        document.querySelector(".video-container").addEventListener("mousemove", function (dets) {
            gsap.to(".mousefollower", {
                opacity: 0
            })
            gsap.to("#video-crsr", {
                left: dets.x - 500,
                top: dets.y - 200
            })
        })
    })
    document.querySelector(".video-container").addEventListener("mouseleave", function () {
        gsap.to(".mousefollower", {
            opacity: 1
        })
        gsap.to("#video-crsr", {
            top: "-11%",
            left: "85%"
        })
    })

    let flag = 0;
    document.querySelector(".video-container").addEventListener("click", function () {
        let video = document.querySelector(".video-container video");
        let img = document.querySelector(".video-container img");


        if (flag == 0) {
            video.play();
            video.style.opacity="1";
            img.style.opacity="0";
            img.style.opacity = "0";
            document.querySelector(
                "#video-crsr"
            ).innerHTML = `<i class="ri-pause-mini-fill"></i>`;
            gsap.to('#video-crsr', {
                scale: '0.6'
            })
            flag = 1;
        } else {
            video.pause();
            img.style.opacity = "1";
            document.querySelector(
                "#video-crsr"
            ).innerHTML = `<i class="ri-play-mini-fill"></i>`;
            gsap.to('#video-crsr', {
                scale: '1'
            })

            flag = 0;
        }
    });
}
loadingAnimation();
crsrAnimation();
// locomotive();
function sheryAnimation() {
    Shery.imageEffect(".image-div ", {
        style: 5,
        // debug:true,/*isse animation ka speed size of ball set karne k baad isse comment out kardo aaur copied to clipboard wale ko niche config mein paste kardo*/
        config: { "a": { "value": 2, "range": [0, 30] }, "b": { "value": 0.75, "range": [-1, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.9705833300901239 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.69, "range": [0, 10] }, "metaball": { "value": 0.41, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.37, "range": [0, 2] }, "noise_scale": { "value": 10, "range": [0, 100] } },
        gooey: true
    })
}
sheryAnimation();
document.addEventListener("mousemove",function(dets){
    gsap.to("#flag-img",{
        x:dets.x,
        y:dets.y
    })
})
document.querySelector("#hero3").addEventListener("mouseenter",function(){
    gsap.to("#flag-img",{
        opacity:1
    })
})
document.querySelector("#hero3").addEventListener("mouseleave",function(){
    gsap.to("#flag-img",{
        opacity:0
    })
})