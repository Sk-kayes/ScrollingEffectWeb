function webPageAnimation() {
    const frames = {
        currIdx: 0,
        maxIdx: 382
    };
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
    let imagesLoded = 0;
    const images = [];
    function preloadImages() {
        for(var i=1; i<=frames.maxIdx; i++) {
            const imgUrl = `./Frames/frame_${i.toString().padStart(4, "0")}.jpeg`;
            const img = new Image();
            img.src = imgUrl;
            img.onload = () => {
                imagesLoded++;
                if (imagesLoded === frames.maxIdx) {
                    loadImage(frames.currIdx);
                    startAnimation();
                }
            }
            images.push(img)
        }
    }
    preloadImages();
    
    function loadImage(idx) {
        if(idx >= 0 && idx <= frames.maxIdx) {
            const img = images[idx];
    
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
    
            const scaleX = canvas.width / img.width;
            const scaleY = canvas.height / img.height;
            const scale = Math.max(scaleX, scaleY);
    
            const newWidth = img.width*scale;
            const newHeight = img.height*scale;
    
            const offSetX = (canvas.width - newWidth)/2;
            const offSetY = (canvas.height - newHeight)/2;
    
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
            context.drawImage(img, offSetX, offSetY, newWidth, newHeight);
            
            frames.currIdx = idx;
        }
    }
    function startAnimation() {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".parent",
                start: "top top",
                scrub: 2
            }
        })
        tl.to(frames, {
            currIdx: frames.maxIdx,
            onUpdate: function() {
                loadImage(Math.floor(frames.currIdx));
            }
        })
    }
    
}

webPageAnimation()