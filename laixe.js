const GAMEBOARD_WIDTH = 500;
const GAMEBOARD_HEIGHT = 500;

const ORIENTATION_LEFT = "left";     //Định hướng _ trái
const ORIENTATION_RIGHT = "right";   //Định hướng _ phải
const ORIENTATION_UP = "up";         //Định hướng _ lên
const ORIENTATION_DOWN = "down";     //Định hướng _ xuống

const MOTO_WIDTH = 30;
const MOTO_HEIGHT = 30;

const DEFAULT_MOTO_X_POSITION = 100;
const DEFAULT_MOTO_Y_POSITION = 100;
const DEFAULT_MOTO_ORIENTATION = ORIENTATION_DOWN;
const DEFAULT_MOTO_SPEED = 20;

function Moto() {
    this.xPosition = DEFAULT_MOTO_X_POSITION; //tọa độ x
    this.yPosotion = DEFAULT_MOTO_Y_POSITION; // tọa độ y
    this.orientation = ORIENTATION_DOWN;      // hướng xuống
    this.speed = DEFAULT_MOTO_SPEED;
    this.step = 1; //bước 1

    this.buildImage = function () {     //xây dựng hình ảnh
        this.image = this.orientation + this.step + '.JPG';
    };
    this.buildImage();
    this.move = function () {
        switch (this.orientation) {
            case ORIENTATION_DOWN:
                this.yPosotion += this.speed;
                break;
            case ORIENTATION_UP:
                this.yPosotion -= this.speed;
                break;
            case ORIENTATION_LEFT:
                this.xPosition -= this.speed;
                break;
            case ORIENTATION_RIGHT:
                this.xPosition += this.speed;
                break;
        }
        this.step = 1;
        this.buildImage();
    };
    this.turn = function (orientation) {
        this.orientation = orientation;
        this.step = 1;
        this.buildImage();
    };

    this.show = function (ctx) { //Hiển thị hình ảnh
        var image = new Image();
        var xPosition = this.xPosition;
        var yPosition = this.yPosotion;
        image.onload = function () {
            ctx.drawImage(image, xPosition, yPosition,30,30);
        };
        image.src = './hinh anh/' + this.image;
    }
}

function GameBoard() { //liên kết canvas và hình ảnh
    this.moto = new Moto();
    this.ctx = undefined;
    this.start = function () {
        this.ctx = document.getElementById('gameCanvas').getContext('2d');
        this.moto.show(this.ctx);
    };

    this.render = function (){
        this.ctx.clearRect(0,0, GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT);
        this.moto.show(this.ctx);
    };

    this.movemoto = function (event){
        var orientation = 0;
        switch (event.which){
            case 37:
                orientation = ORIENTATION_LEFT;
                break;
            case 38:
                orientation = ORIENTATION_UP;
                break;
            case 39:
                orientation = ORIENTATION_RIGHT;
                break;
            case 40:
                orientation = ORIENTATION_DOWN;
                break;
        }

        if (orientation){
            if(this.moto.orientation !== orientation){
                this.moto.orientation = orientation;
            }
            else {
                this.moto.move();
            }
            this.render();
        }
    }
}

var gameBoard = new GameBoard();
gameBoard.start();

