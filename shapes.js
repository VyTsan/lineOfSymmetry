let shapes = [
{
    name: 'Hình Chữ Nhật',
    drawFunc : () => {
        rectMode(CENTER);
        rect(width/2,height/2,tileWidth*6,tileWidth*4);
    },
    numberOfLoS: 2,
    vOrg : [
        {
            x:0,
            y:1
        },
        {
            x:1,
            y:0
        },
    ]
},
{
    name: 'Hình Vuông',
    drawFunc : () => {
        rectMode(CENTER);
        rect(width/2,height/2,tileWidth*4,tileWidth*4);
    },
    numberOfLoS: 4,
    vOrg : [
        {
            x:0,
            y:1
        },
        {
            x:1,
            y:0
        },
        {
            x:1,
            y:1
        },
        {
            x:-1,
            y:1
        },
    ]
},
{
    name: 'Hình Tam Giác Cân',
    drawFunc : () => {
        push();
        translate(width/2, height/2);
        beginShape();
        vertex(0, -2*tileWidth); 
        vertex(3*tileWidth, 2*tileWidth);
        vertex(-3*tileWidth, 2*tileWidth);
        vertex(0, -2*tileWidth);
        endShape();
        pop();
    },
    numberOfLoS: 1,
    vOrg : [
        {
            x:0,
            y:1
        },
    ]
},
{
    name: 'Hình Thoi',
    drawFunc : () => {
        push();
        translate(width/2, height/2);
        beginShape();
        vertex(0, 2*tileWidth);
        vertex(4*tileWidth, 0);
        vertex(0, -2*tileWidth);
        vertex(-4*tileWidth, 0);
        vertex(0, 2*tileWidth);
        endShape();
        pop();
    },
    numberOfLoS: 2,
    vOrg : [
        {
            x:0,
            y:1
        },
        {
            x:1,
            y:0
        },
    ]
},
{
    name: 'Hình Thang Cân',
    drawFunc : () => {
        push();
        translate(width/2, height/2);
        beginShape();
        vertex(-2*tileWidth, -2*tileWidth);
        vertex(2*tileWidth, -2*tileWidth);
        vertex(4*tileWidth, 2*tileWidth);
        vertex(-4*tileWidth, 2*tileWidth);
        vertex(-2*tileWidth, -2*tileWidth);
        endShape();
        pop();
    },
    numberOfLoS: 1,
    vOrg : [
        {
            x:0,
            y:1
        },
    ]
},
{
    name: 'Hình Bình Hành',
    drawFunc : () => {
        push();
        translate(width/2, height/2);
        beginShape();
        vertex(-2*tileWidth, -2*tileWidth);
        vertex(4*tileWidth, -2*tileWidth);
        vertex(2*tileWidth, 2*tileWidth);
        vertex(-4*tileWidth, 2*tileWidth);
        vertex(-2*tileWidth, -2*tileWidth);
        endShape();
        pop();
    },
    numberOfLoS: 0,
    vOrg : []
},
// {
//     name: 'Hình Tam Giác Đều',
//     drawFunc : () => {
//         angleMode(DEGREES);
//         push();
//         translate(width/2,height/2+tileWidth);
//         rotate(30);
//         const side = 200;
//         const x1 = side * cos(0), y1 = side * sin(0);
//         const x2 = side * cos(120), y2 = side * sin(120);
//         const x3 = side * cos(240), y3 = side * sin(240);
//         triangle(x1, y1, x2, y2, x3, y3)
//         pop();
//     },
//     numberOfLoS: 3,
//     vOrg : [
//         {
//             x:0,
//             y:1
//         },
//         {
//             x:-5,
//             y:-3
//         },
//         {
//             x:5,
//             y:-3
//         },
//     ]
// },
];