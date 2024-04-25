let shapes = [
{   name: 'Hình Chữ Nhật',
    vertexArr : [
        {x:-4,y:-3},
        {x:0,y:-3},
        {x:4,y:-3},
        {x:4,y:0},
        {x:4,y:3},
        {x:0,y:3},
        {x:-4,y:3},
        {x:-4,y:0},
    ],
    losArr : [
        {point1:new p5.Vector(0,-3),point2:new p5.Vector(0,3)},
        {point1:new p5.Vector(-4,0),point2:new p5.Vector(4,0)},
    ]
},
{   name: 'Hình Vuông',
    vertexArr : [
        {x:-3,y:-3},
        {x:0,y:-3},
        {x:3,y:-3},
        {x:3,y:0},
        {x:3,y:3},
        {x:0,y:3},
        {x:-3,y:3},
        {x:-3,y:0},
    ], 
    losArr : [
        {point1:new p5.Vector(0,-3),point2:new p5.Vector(0,3)},
        {point1:new p5.Vector(-3,0),point2:new p5.Vector(3,0)},
        {point1:new p5.Vector(3,-3),point2:new p5.Vector(-3,3)},
        {point1:new p5.Vector(-3,-3),point2:new p5.Vector(3,3)},
    ],
},
{   name: 'Hình Tam Giác Cân',
    vertexArr : [
        {x:0,y:-3},
        {x:2,y:0},
        {x:4,y:3},
        {x:0,y:3},
        {x:-4,y:3},
        {x:-2,y:0},
    ],
    losArr : [
        {point1:new p5.Vector(0,-3),point2:new p5.Vector(0,3)},
    ],
},
{   name: 'Hình Thoi',
    vertexArr : [
        {x:0,y:-3},
        {x:2.5,y:-1.5},
        {x:5,y:0},
        {x:2.5,y:1.5},
        {x:0,y:3},
        {x:-2.5,y:1.5},
        {x:-5,y:0},
        {x:-2.5,y:-1.5},
    ],
    losArr : [
        {point1:new p5.Vector(0,-3),point2:new p5.Vector(0,3)},
        {point1:new p5.Vector(-5,0),point2:new p5.Vector(5,0)},
    ],
},
{   name: 'Hình Thang Cân',
    vertexArr : [
        {x:-2,y:-3},
        {x:0,y:-3},
        {x:2,y:-3},
        {x:3.5,y:0},
        {x:5,y:3},
        {x:0,y:3},
        {x:-5,y:3},
        {x:-3.5,y:0},
    ],
    losArr : [
        {point1:new p5.Vector(0,-3),point2:new p5.Vector(0,3)},
    ],
},
{   name: 'Hình Bình Hành',
    vertexArr : [
        {x:-2,y:-3},
        {x:1.5,y:-3},
        {x:5,y:-3},
        {x:3.5,y:0},
        {x:2,y:3},
        {x:-1.5,y:3},
        {x:-5,y:3},
        {x:-3.5,y:0},
    ],
    losArr : [],
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