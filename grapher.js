/*jslint browser:true*/
/*global console*/
var c = document.getElementById('swf'),
    ctx = c.getContext('2d');
c.width = 500;
c.height = 500;
c.focus();
function point(x, y, c) {
    'use strict';
    c = c || '#000';
    ctx.fillStyle = c;
    console.log(x + 250, -y + 500);
    ctx.fillRect(x + 250, -y + 500, 1, 1);
}
function getDist(p1, p2) {
    'use strict';
    return Math.sqrt(Math.pow(Math.abs(p1.x - p2.x), 2) + Math.pow(Math.abs(p2.y - p1.y), 2));
}
function graphParabola(a, h, k) {
    'use strict';
    var vertex = {x: h, y: k},
        focus = {x: h, y: k - (a / 0.25)},
        i,
        points = [];
    function getY(x) {
        return -(a * Math.pow(x - h, 2)) + k;
    }
    for (i = h - 50; i < h + 50; i += 1) {
        point(i, getY(i));
        console.log(i, getY(i));
        points.push({x: i, y: getY(i)});
    }
    point(focus.x, focus.y, '#00f');
    points.push(vertex);
    point(vertex.x, vertex.y, '#0f0');
    points.push(focus);
    points.sort(function (a, b) {
        return getDist(a, vertex) - getDist(b, vertex);
    });
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(vertex.x, vertex.y);
    points.forEach(function (v) {
        ctx.lineTo(v.x, v.y);
    });
    ctx.closePath();
    return {points: points, getY: getY, focus: focus, vertex: vertex};
}