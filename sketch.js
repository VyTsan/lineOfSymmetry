let tileWidth;
let n;
let p1,p2;
let pArr = [];
let vOrg = [];
let posX,posY;
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
  for (let i=0; i<shapes[shapeNum].numberOfLoS; i++) {
    vOrg.push(shapes[shapeNum].vOrg[i]);
  }
  lineColor = color(100,200);
  shapeName = createDiv(shapes[shapeNum].name);
  shapeName.parent('shape_name');
}

function draw() {
  //reset
  background(255);
  //draw cells
  rectMode(CORNER);
  stroke(0);
  fill('#f4f0e8');
  strokeWeight(1);
  for (let j=0; j<n; j++) {
    for (let i=0; i<n; i++) {
      rect(i*tileWidth,j*tileWidth,tileWidth);
    }
  }
  //draw shape
  fill(255,10);
  strokeWeight(5);
  stroke(0);
  shapes[shapeNum].drawFunc();

  //display rounded position of point on grid
  if (!checkMode && !showMode) {
    stroke(100,200);
    if (mouseX>0 && mouseX<width && mouseY<height && mouseY>0 && !p2) {
      posX = round(mouseX/tileWidth)*tileWidth;
      posY = round(mouseY/tileWidth)*tileWidth;
      strokeWeight(15);
      point(posX,posY);
    }
  }
  //draw p1
  if (p1) {
    strokeWeight(15);
    point(p1);
  }
  //draw that line that follows mouse while no p2 yet
  if (p1 && !p2) {
    strokeWeight(5);
    endlessLine(p1.x,p1.y,posX,posY);
  }
  //when there is p2 form a triplet in array
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
      strokeWeight(5);
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
      push();
      translate(width/2, height/2);
      endlessLine(0,0,vOrg[i].x,vOrg[i].y);
      pop();
    }
  }

}

function mousePressed() {
  if (!checkMode && !showMode) {
    if (mouseX>0 && mouseX<width && mouseY<height && mouseY>0) {
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
  for (let i=0; i<shapes[shapeNum].numberOfLoS; i++) {
    vOrg.push(shapes[shapeNum].vOrg[i]);
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
          let vOrgx = vOrg[j].x + width/2;
          let vOrgy = vOrg[j].y + height/2;
          let area = 0.5*abs(vOrgx*(pArr[i-1].y-pArr[i].y)+pArr[i-1].x*(pArr[i].y-vOrgy)+pArr[i].x*(vOrgy-pArr[i-1].y));
          if (area == 0) {
            pArr[i].isCorrect = true;
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