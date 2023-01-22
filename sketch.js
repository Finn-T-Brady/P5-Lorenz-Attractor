class coord{
  constructor(x,y,z){
    this.x=x;
    this.y=y;
    this.z=z;
    
    this.defX=x;
    this.defY=y;
    this.defZ=z;
  }
}
class LorenzVars{
  constructor(P,Sig,b){
    this.P=P;
    this.Sig=Sig;
    this.b=b;
  }
}

let Point = new coord(0.1,0,0);
let DeltaPoint = new coord();
let Vars = new LorenzVars(28,10,8/3);//the default

let iterator = 0.01;

function LorenzDelta(init,delta,Vars,t){
  delta.x=Vars.Sig*(init.y-init.x);
  delta.y=init.x*(Vars.P-init.z)-init.y;
  delta.z=init.x*init.y - Vars.b*init.z;
  
  init.x+=delta.x*t;
  init.y+=delta.y*t;
  init.z+=delta.z*t;
}

let zoom = 7;

let iterations=5500;

let font;
function preload(){
  font = loadFont("Helvetica.otf");
}

let points = new Array();
function setup() {
  createCanvas(800, 800,WEBGL);
  background(100);
  textFont(font);
  textSize(30);
  fill(0);
  textAlign("center");
  text("LOADING...",0,0);
  let i=0;
  while(i<iterations){
    points[i] = [zoom*Point.x,zoom*Point.y,zoom*Point.z];
    LorenzDelta(Point,DeltaPoint,Vars,iterator);
    i++;
  }
}

let upd=1;

function PointDraw(){
  background(100);
  rotateX(Ang.x);
  rotateY(Ang.y);
  rotateZ(Ang.z);
  let i=0;
  let p;
  while(i<iterations){
    p=points[i];
    point(p[0],p[1],p[2]);
    i++;
  }
}
function LineDraw(){
  background(100);
  rotateX(Ang.x);
  rotateY(Ang.y);
  rotateZ(Ang.z);
  let i=0;
  let p;
  while(i<iterations-1){
    p=[points[i],points[i+1]];
    line(p[0][0],p[0][1],p[0][2],p[1][0],p[1][1],p[1][2]);
    i++;
  }
}



let mode=0;

let Ang = new coord(0,0,0);
function draw() {
  if(upd){
    upd=0;
    if(!mode){
      PointDraw();
    }else{
      LineDraw();
    }
  }
}

function mousePressed(){
  mode=(mode+1)%2;
  upd=1;
}