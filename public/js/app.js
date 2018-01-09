//Mein Teil Start
// Get the modal
var modal = document.getElementById('modal-overlay');
var largePic = document.getElementsByClassName('enlarged-pic')[0];
var closeBtn = document.getElementsByClassName("close")[0];
let picContainer = document.getElementsByClassName('picturecontainer')[0];


closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});
// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function (event) {
    if (event.target == largePic) {
        modal.style.display = "none";
        console.log("Modal close");
    }
});

//Mein Teil Ende

class Picture {
    constructor(elem) {

        this._elem = elem;
        this.createButtons();
        this.likes = 0;
        this.remember = false;
        this.likeButton = this._elem.querySelector("button.like");
        this.likeButton.addEventListener('click', ()=> this.buttonActivated(1));
        this.rememberButton = this._elem.querySelector("button.remember");
        this.rememberButton.addEventListener('click', () => this.buttonActivated(2));
        this.enlargeButton = elem.querySelector("button.enlarge");
        this.enlargeButton.addEventListener('click', () => this.enlarge());
    }

    createButtons() {
        this.enlargeButton = document.createElement("button");
        this.enlargeButton.classList.add("enlarge");
        this.enlargeButton.setAttribute('title', 'Details');
        this.enlargeButton.setAttribute('z-index', '100000000');
        // this.enlargeButton.innerText = "Details";
        this.rememberButton = document.createElement("button");
        this.rememberButton.classList.add("remember");
        this.rememberButton.setAttribute('title', 'Merken');
        // this.rememberButton.innerText = "Merken";
        this.likeButton = document.createElement("button");
        this.likeButton.classList.add("like");
        this.likeButton.setAttribute('title', 'Gefällt mir');
        // this.likeButton.innerText = "Gefällt mir";

        let picturecontainer = document.createElement("buttonDiv");
        picturecontainer.appendChild(this.enlargeButton);
        picturecontainer.appendChild(this.rememberButton);
        picturecontainer.appendChild(this.likeButton);

        this._elem.appendChild(picturecontainer);
    }

    // remember() {
    //     this.rememberButton.classList.toggle("remembered");
    //     this.remember = true;
    //     console.log(this.remember);
    // }

    buttonActivated(nummer) {
        if (nummer === 1){
            this.likeButton.classList.toggle("button-activated");
            console.log(this.likes);
            this.likes += 1;
        }else{
            this._elem.classList.toggle("remembered");
            this.remember = true;
            console.log(this.remember);
        }
    }

//Mein Teil Start
    enlarge() {
        console.log("Enlarge");
        modal.style.display = "block";
        let enlargedPic = document.getElementsByClassName("enlarged-pic")[0];
        let picUrl = this._elem.childNodes[0].src;
        enlargedPic.innerHTML = "<img src=\"" + picUrl + "\"/>";
    }

    //Mein Teil Ende
}


document.addEventListener('DOMContentLoaded', function () {

    let pictureElemArray = document.querySelectorAll('.picturecontainer');

    let pictureObjectArray = [];
    for (let pictureBox of pictureElemArray) {
        let picture = new Picture(pictureBox);
        pictureObjectArray.push(picture);
    }

    document.getElementById("menu-icon").addEventListener("click", function () {
        console.log("click");
        document.getElementById("navbar").classList.toggle('width');

        var bars = document.getElementById("menu-icon").childNodes;
        console.log(bars);
        for (var i = 0; i < bars.length / 2 - 1; i++) {
            console.log(i + " " + bars[2 * i + 1]);
            bars[2 * i + 1].classList.toggle("change");
        }
        document.getElementById('menu-items').classList.toggle('nav-show');
    });
});
