let tileWidth;
let n;
let p1,p2;
let pArr = [];
let vOrg = [];
let posX,posY;
let vertexCatched = false;
let lineColor;
let checkMode = false;
let showMode = false;
let undoBtn, resetBtn, checkBtn, showBtn;
let prevBtn, nextBtn;
let shapeNum;
let shapeName;

function setup() {
  let ratio = 8/5;
  let h = windowHeight*4/10;
  c=createCanvas(h*ratio, h);
  c.parent('board');
  tileWidth = h/10;
  n = width/tileWidth;
  //buttons
  undoBtn = createButton('UNDO');
  undoBtn.parent('undo_btn');
  resetBtn = createButton('RESET');
  resetBtn.parent('reset_btn');
  checkBtn = createButton('CHECK');
  checkBtn.parent('check_btn');
  showBtn = createButton('SHOW');
  showBtn.parent('show_btn');
  undoBtn.mousePressed(undo);
  resetBtn.mousePressed(resetAll);
  checkBtn.mousePressed(checkLoS);
  showBtn.mousePressed(showLoS);

  shapeNum = 0;
  prevBtn = createButton('<i class="fa fa-caret-left fa-5x" aria-hidden="true"></i>');
  prevBtn.parent('prev_btn');
  nextBtn = createButton('<i class="fa fa-caret-right fa-5x" aria-hidden="true"></i>');
  nextBtn.parent('next_btn');
  prevBtn.mousePressed(() => updateShapeNum(-1));
  nextBtn.mousePressed(() => updateShapeNum(1));
  for (let i=0; i<shapes[shapeNum].losArr.length; i++) {
    vOrg.push(shapes[shapeNum].losArr[i]);
  }
  lineColor = color(100,200);
  shapeName = createDiv(shapes[shapeNum].name);
  shapeName.parent('shape_name');
}

function draw() {
  //reset
  background('#f4f0e8');
  
  //draw shape
  fill(255,10);
  strokeWeight(5);
  stroke(0);
  push();
  translate(width/2, height/2);
  beginShape();
  for (let i=0; i<shapes[shapeNum].vertexArr.length; i++) {
    let v = shapes[shapeNum].vertexArr[i];
    vertex(v.x*tileWidth,v.y*tileWidth);
    if (i==shapes[shapeNum].vertexArr.length-1) {
      vertex(shapes[shapeNum].vertexArr[0].x*tileWidth,shapes[shapeNum].vertexArr[0].y*tileWidth);
    }
  }
  endShape();
  pop();

  cursorCatchVertex();
  //draw p1
  if (p1) {
    strokeWeight(15);
    point(p1);
  }
  //draw that line that follows mouse while no p2 yet
  if (p1 && !p2) {
    strokeWeight(5);
    if (vertexCatched==false) {
      endlessLine(p1.x,p1.y,mouseX,mouseY);
    } else {
      endlessLine(p1.x,p1.y,posX,posY);
    }
  }
  //when there is p2 form a couple in array
  if (p2) {
    pArr.push(p1,p2);
    resetp1p2();
  }
  //loop through array to display lines that user draws
  for (let i=0; i<pArr.length; i++) {
    if ((i+1)%2==0) {
      if (!checkMode && !showMode) {
        strokeWeight(15);
        point(pArr[i]);
        point(pArr[i-1]);
      }
      strokeWeight(4);
      if (checkMode) {
        pArr[i].isCorrect ? lineColor=color('green') : lineColor=color('red');
      } else {
        lineColor = color(100,200);
      }
      stroke(lineColor);
      endlessLine(pArr[i].x,pArr[i].y,pArr[i-1].x,pArr[i-1].y);
    }
  }
  if (showMode) {
    strokeWeight(5);
    stroke('blue');
    for (let i=0; i<vOrg.length; i++) {
      let _point1 = p5.Vector.mult(vOrg[i].point1,tileWidth);
      _point1.add(width/2,height/2);
      let _point2 = p5.Vector.mult(vOrg[i].point2,tileWidth);
      _point2.add(width/2,height/2);
      endlessLine(_point1.x,_point1.y,_point2.x,_point2.y);
    }
  }
}
function cursorCatchVertex() {
  if (!checkMode && !showMode) {
    stroke(100,200);
      if (mouseX>0 && mouseX<width && mouseY<height && mouseY>0 && !p2) {
        for (let i=0; i<shapes[shapeNum].vertexArr.length; i++) {
          vertexCatched=false;
          if (dist(mouseX,mouseY,shapes[shapeNum].vertexArr[i].x*tileWidth+width/2,shapes[shapeNum].vertexArr[i].y*tileWidth+height/2)<30) {
            strokeWeight(15);
            point(shapes[shapeNum].vertexArr[i].x*tileWidth+width/2,shapes[shapeNum].vertexArr[i].y*tileWidth+height/2);
            posX = shapes[shapeNum].vertexArr[i].x*tileWidth+width/2;
            posY = shapes[shapeNum].vertexArr[i].y*tileWidth+height/2;
            vertexCatched=true;
            break;
          }
        }
      }
    }
}
function mousePressed() {
  if (!checkMode && !showMode) {
    if (mouseX>0 && mouseX<width && mouseY<height && mouseY>0 && vertexCatched==true) {
      if (!p1) {
        p1 = createVector(posX,posY);
      } else if (!p2) {
        p2 = createVector(posX,posY);
      }
    }
  } 
}
function updateShapeNum(num) {
  resetAll();
  shapeNum+=num;
  if (shapeNum==shapes.length) shapeNum=0;
  if (shapeNum<0) shapeNum=shapes.length-1;
  vOrg = [];
  for (let i=0; i<shapes[shapeNum].losArr.length; i++) {
    vOrg.push(shapes[shapeNum].losArr[i]);
  }
  shapeName.html(shapes[shapeNum].name);
}
function undo() {
  if (!p1 && pArr.length%2==0 && pArr!=[]) {
    for (let i=0; i<2; i++) {
      pArr.pop();
    }
  }
  resetp1p2();
}
function resetAll() {
  resetp1p2();
  pArr = [];
  lineColor = color(100,200);
  checkMode = false;
  showMode = false;
  undoBtn.removeAttribute('disabled','false');
  resetBtn.removeAttribute('disabled','false');
  checkBtn.removeAttribute('disabled','false');
  showBtn.removeAttribute('disabled','false');
}
function resetp1p2() {
  p1 = null;
  p2 = null;
}
function checkLoS() {
  checkMode = !checkMode;
  if (checkMode) {
    undoBtn.attribute('disabled','true');
    resetBtn.attribute('disabled','true');
    showBtn.attribute('disabled','true');
    for (let i=0; i<pArr.length; i++) {
      if ((i+1)%2==0) {
        for (let j=0; j<vOrg.length; j++) {
          let _point1 = p5.Vector.mult(vOrg[j].point1,tileWidth);
          _point1.add(width/2,height/2);
          let _point2 = p5.Vector.mult(vOrg[j].point2,tileWidth);
          _point2.add(width/2,height/2);
          if ((pArr[i-1].equals(_point1) && pArr[i].equals(_point2)) || 
              (pArr[i-1].equals(_point2) && pArr[i].equals(_point1))) {
            pArr[i].isCorrect = true;
            break;
          }
        }
      }
    }
  } else {
    undoBtn.removeAttribute('disabled','false');
    resetBtn.removeAttribute('disabled','false');
    showBtn.removeAttribute('disabled','false');
  }
}
function showLoS() {
  showMode=!showMode;
  if (showMode) {
    undoBtn.attribute('disabled','true');
    resetBtn.attribute('disabled','true');
    checkBtn.attribute('disabled','true');
  } else {
    undoBtn.removeAttribute('disabled','false');
    resetBtn.removeAttribute('disabled','false');
    checkBtn.removeAttribute('disabled','false');
  }
}
function endlessLine(x1, y1, x2, y2) {
  point1 = new p5.Vector(x1, y1);
  point2 = new p5.Vector(x2, y2);
  let dia_len = new p5.Vector(width, height).mag();
  let dir_v = p5.Vector.sub(point2, point1).setMag(dia_len);
  let lp1 = p5.Vector.add(point1, dir_v);
  let lp2 = p5.Vector.sub(point1, dir_v);
  line(lp1.x, lp1.y, lp2.x, lp2.y);
}