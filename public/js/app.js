let modal = document.getElementById('modal-overlay');
let largePic = document.getElementsByClassName('enlarged-pic')[0];
let closeBtn = document.getElementsByClassName("close")[0];

/**
 *
 */
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target === largePic) {
        modal.style.display = "none";
        console.log("Modal close");
    }
});

/**
 *  Class to represent picture objects in the DOM
 */
class Picture {

    /**
     * creates an object from the nodeelem and initializes all the attributes
     * @param elem is the picture element
     */
    constructor(elem) {
        this._elem = elem;
        this.createButtons();
        this.likes = 0;
        this.remember = false;
        this.likeButton = this._elem.querySelector("button.like");
        this.likeButton.addEventListener('click', () => this.buttonActivated(1));
        this.rememberButton = this._elem.querySelector("button.remember");
        this.rememberButton.addEventListener('click', () => this.buttonActivated(2));
        if (!this._elem.classList.contains("movie")) {
            this.enlargeButton = elem.querySelector("button.enlarge");
            this.enlargeButton.addEventListener('click', () => this.enlarge());
        }
    }

    /**
     * puts all the buttons in place
     */
    createButtons() {
        if (!this._elem.classList.contains("movie")) {
            this.enlargeButton = document.createElement("button");
            this.enlargeButton.classList.add("enlarge");
            this.enlargeButton.setAttribute('title', 'Details');
        }

        this.rememberButton = document.createElement("button");
        this.rememberButton.classList.add("remember");
        this.rememberButton.setAttribute('title', 'Merken');

        this.likeButton = document.createElement("button");
        this.likeButton.classList.add("like");
        this.likeButton.setAttribute('title', 'Gefällt mir');

        let pictureButtonContainer = document.createElement("div");
        if (this._elem.classList.contains("movie")) {
            pictureButtonContainer.classList.add("videoButtonDiv")
        } else {
            pictureButtonContainer.classList.add("buttondiv");
            pictureButtonContainer.appendChild(this.enlargeButton);
        }
        pictureButtonContainer.appendChild(this.rememberButton);
        pictureButtonContainer.appendChild(this.likeButton);

        this._elem.appendChild(pictureButtonContainer);
    }

    /**
     *toggles for like and remembered
     * @param number comes from eventlistener for switch between like and remember
     */
    buttonActivated(number) {
        if (number === 1) {
            this.likeButton.classList.toggle("button-activated");
            this.likes += 1;
        } else {
            this._elem.classList.toggle("remembered");
            this.remember = true;

        }
    }

    /**
     * show details and the modalview
     */
    enlarge() {
        console.log("Enlarge");
        modal.style.display = "block";
        let enlargedPic = document.getElementsByClassName("enlarged-pic")[0];
        let picUrl = this._elem.childNodes[0].src;
        let name = this._elem.childNodes[0].getAttribute("data-name");
        enlargedPic.innerHTML = "<img src=\"" + picUrl + "\"/><DIV class='showmodallikes'><div class='additionalinfo'>"
            + "Name: " + name + " | Likes: " + this.likes + "</div></DIV>";
        console.log(this.likes);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let pictureElemArray = document.querySelectorAll('.content');
    let pictureObjectArray = [];

    for (let pictureBox of pictureElemArray) {
        let picture = new Picture(pictureBox);
        pictureObjectArray.push(picture);
    }

    document.getElementById("menu-icon").addEventListener("click", function () {
        console.log("click");
        document.getElementById("navbar").classList.toggle('width');
        let bars = document.getElementById("menu-icon").getElementsByTagName("div");
        console.log(bars);

        for (let i = 0; i < bars.length; i++) {
            bars[i].classList.toggle("change");
        }
        document.getElementById('menu-items').classList.toggle('nav-show');
    });

    document.getElementsByTagName("main")[0].addEventListener("click", closeMenu);
    document.getElementsByTagName("header")[0].addEventListener("click", closeMenu);

    /**
     * closing the manu with click in main content
     * @param e clickevent
     */
    function closeMenu(e) {
        if (e.target.nodeName !== document.getElementsByTagName("nav")) {
            document.getElementById("navbar").classList.remove('width');
            document.getElementById("menu-items").classList.remove('nav-show');
            let mi = document.getElementById("menu-icon").getElementsByTagName("div");
            for (let j = 0; j < mi.length; j++) {
                mi[j].classList.remove("change");
            }
        }
    }

    let picConts = document.getElementsByClassName("picturecontainer");
    let vidConts = document.getElementsByClassName("movie");
    document.getElementById("favorite").addEventListener("click", showFavorite);

    /**
     * highlights remembered items
     */
    function showFavorite() {
        [...picConts].forEach(picCont => {
            picCont.style.opacity = "0.4";
            if (picCont.classList.contains("remembered")) {
                picCont.style.opacity = "1";
            }
        });
        [...vidConts].forEach(vidCont => {
            vidCont.style.opacity = "0.4";
            if (vidCont.classList.contains("remembered")) {
                vidCont.style.opacity = "1";
            }
        });

    }

    document.getElementById("home").addEventListener("click", goHome);

    /**
     * closes all highlighted stuff and shows normal view
     */
    function goHome() {
        [...picConts].forEach(picCont => {
            picCont.style.opacity = "1";
        });
        [...vidConts].forEach(vidCont => {
            vidCont.style.opacity = "1";
        });
    }

    document.getElementById("like").addEventListener("click", showLiked);

    /**
     * highlights liked items
     */
    function showLiked() {
        [...picConts].forEach(picCont => {
            picCont.style.opacity = "0.4";
            if (picCont.childNodes[1].childNodes[2].classList.contains("button-activated")) {
                picCont.style.opacity = "1";
            }
        });
        [...vidConts].forEach(vidCont => {
            vidCont.style.opacity = "0.4";
            if (vidCont.childNodes[3].childNodes[1].classList.contains("button-activated")) {
                vidCont.style.opacity = "1";
            }
        });
    }
});
