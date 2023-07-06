import './style.css'
/*import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
*/
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
  background: '#1099bb',
  resizeTo: window,
});

document.body.appendChild(app.view);
let bullets = [];
let enemies = [];
// create a new Sprite from an image path
const bunny = PIXI.Sprite.from('true.png');
bunny.scale.set(1.5);
// center the sprite's anchor point
bunny.anchor.set(0.5);

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height - 50;

app.stage.addChild(bunny);
let started = false;
//トゥル子さん設定
let life = 3;
let score = 0;
// Listen for animate update
const lifeStyle = new PIXI.TextStyle( { fontSize:48})
const lifetext = new PIXI.Text(`LIFE: ${life}\nScore: ${score}`,lifeStyle);
app.stage.addChild(lifetext);
lifetext.x=20;
lifetext.y=20;

//スタート画面
const startStyle = new PIXI.TextStyle( { fontSize:64})
const starttext = new PIXI.Text(`CLICK TO START`,startStyle);
app.stage.addChild(starttext);
starttext.x=app.screen.width / 2-250;
starttext.y=app.screen.height/2-32;

app.ticker.add((delta) =>
{
  if(started){
    const speed = 10;
    if(isUp&&bunny.y>speed){
      bunny.y-=speed;
    }
    if(isDown&&bunny.y<app.screen.height-speed){
      bunny.y+=speed;
    }
    if(isLeft&&bunny.x>speed){
      bunny.x-=speed;
    }
    if(isRight&&bunny.x<app.screen.width-speed){
      bunny.x+=speed;
    }
    if(isFire){
      const radius = 3
      // 衝突させる円1
      const circleSprite1 = new PIXI.Sprite()
      const circle1 = new PIXI.Graphics()
          .beginFill(0xff00ff)
          .drawCircle(0, 0, radius)
          .endFill()
      circleSprite1.addChild(circle1)
      circleSprite1.anchor.set(0.5)
      circleSprite1.position.set(bunny.x, bunny.y)
      bullets.push(circleSprite1)
      app.stage.addChild(circleSprite1)
    }
    //敵攻撃
    if(enemies.length>0){
      for(let i =0;i<enemies.length;i++){
        const r = Math.random();
        if(r<0.03){
          //攻撃実行
          if(enemies[i].type==1){
            //狙撃弾作成
            
          }
          else{
            //弾幕作成
          }
        }
      }
    }

    //弾幕処理
    const gunspeed=30;
    for(let i =0;i<bullets.length;i++){
      bullets[i].position.set(bullets[i].x, bullets[i].y-speed)
      //画面範囲外に出たら消す
      if(bullets[i].y<-10){
        bullets[i].removeFromParent();
        bullets.splice( i, 1 );
      }
    }
    //スコア表示処理
    score++;
    lifetext.text = `LIFE: ${life}\nScore: ${score}`;

    //敵出現
    //敵が10対以下なら
    if(enemies.length<10){
      //抽選
      const r = Math.random();
      if(r<0.01){
        //敵作成
        let enm;
        if(r<0.005){
          enm = PIXI.Sprite.from('enm1.png');
          enm.type = 1;
        }
        else{
          enm = PIXI.Sprite.from('enm2.png');
          enm.type = 2;
        }
        enm.scale.set(1.5);
        enm.anchor.set(0.5);
        //右からくるか、左からくるか
        const j = Math.random();
        if(j<0.5){
          enm.x = app.screen.width-50;
          enm.LtR = false;
        }
        else{
          enm.x=50;
          enm.LtR = true;
        }
        enm.y = Math.random() * (app.screen.height - 200);
        enemies.push(app.stage.addChild(enm));
      }
    }
    //敵移動
    for(let i=0;i<enemies.length;i++){
      const enmSpeed = 5;
      if(enemies[i].x<0||enemies[i].x>app.screen.width){
        enemies[i].removeFromParent();
        enemies.splice(i,1);
        return;
      }
      if(enemies[i].LtR){
        enemies[i].x+=enmSpeed;
      }
      else{
        enemies[i].x-=enmSpeed;
      }
    }
  }
});

let isUp:Boolean = false;
let isDown:Boolean = false;
let isLeft:Boolean = false;
let isRight:Boolean = false;
let isFire:boolean = false;
const gunsound = document.getElementById("gun");
const bgm = document.getElementById("bgm");

window.addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode === 38) {
    isUp = true;
  }
  else if(event.isComposing || event.keyCode === 40){
    isDown = true;
  }
  if(event.isComposing || event.keyCode === 37){
    isLeft=true;
  }
  else if(event.isComposing || event.keyCode === 39){
    isRight=true;
  }
  if(event.isComposing || event.keyCode === 32){
    isFire=true;
    gunsound.currentTime = 0;
    gunsound.play();
  }
});
window.addEventListener("keyup", event => {
  if (event.isComposing || event.keyCode === 38) {
    isUp = false;
  }
  else if(event.isComposing || event.keyCode === 40){
    isDown = false;
  }
  if(event.isComposing || event.keyCode === 37){
    isLeft=false;
  }
  else if(event.isComposing || event.keyCode === 39){
    isRight=false;
  }
  if(event.isComposing || event.keyCode === 32){
    isFire=false;
    gunsound.pause();
  }
});
window.addEventListener("DOMContentLoaded",function(){
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
},false);
window.addEventListener("click",function(){
  bgm.play();
  started =true;
  starttext.text = "";
},false);
bgm.addEventListener("ended", function() {
  bgm.currentTime = 0;
  bgm.play();
}, false);
gunsound.addEventListener("ended", function() {
  gunsound.currentTime = 0;
  gunsound.play();
}, false);