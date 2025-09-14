const Graph = [
    [0 ,8 ,10,0,15,0,0 ,0 ],
    [8 ,0 ,13,5,0 ,0,0 ,0 ],
    [10,13,0 ,0,7 ,7,13,0 ],
    [0 ,5 ,0 ,0,6 ,0,0 ,0 ],
    [15,0 ,7 ,6,0 ,9,12,11],
    [0 ,0 ,7 ,0,9 ,0,3 ,6 ],
    [0 ,0 ,13,0,12,3,0 ,4 ],
    [0 ,0 ,0 ,0,11,6,4 ,0 ],
];
  
function drawGraph() {
    paint(0,1,'black');
    paint(0,2,'black');
    paint(0,4,'black');
    paint(1,2,'black');
    paint(1,3,'black');
    paint(2,4,'black');
    paint(2,5,'black');
    paint(2,6,'black');
    paint(3,4,'black');
    paint(5,6,'black');
    paint(5,7,'black');
    paint(6,7,'black');
    paint(4,5,'black');
    paint(4,6,'black');
    paint(4,7,'black');
    writenumber(0);
    writenumber(1);
    writenumber(2);
    writenumber(3);
    writenumber(4);
    writenumber(5);
    writenumber(6);
    writenumber(7);
    writenumberedge(0,1);
    writenumberedge(0,2);
    writenumberedge(0,4);
    writenumberedge(1,2);
    writenumberedge(1,3);
    writenumberedge(2,4);
    writenumberedge(2,5);
    writenumberedge(2,6);
    writenumberedge(3,4);
    writenumberedge(4,5);
    writenumberedge(4,6);
    writenumberedge(4,7);
    writenumberedge(5,6);
    writenumberedge(5,7);
    writenumberedge(6,7);
}

drawGraph();

    // Tạo điểm
function getPoint(num) {
    var x, y;
    switch(num){
        case 0: x = 315; y = 130;
            break;
        case 1: x = 420; y = 410;
            break;
        case 2: x = 650; y = 130;
            break;
        case 3: x = 510; y = 540;
            break;
        case 4: x = 680; y = 400;
            break;
        case 5: x = 920; y = 130;
            break;
        case 6: x = 1020; y = 240;
            break;
        case 7: x = 1020; y = 400;
            break;
    }
    this.x = x;
    this.y = y;
}

    // Vẽ line
var context;
function paint(A, B, color, context) {
    var a = A.toString();
    var b = B.toString();
    var id = 'mycanvas';
    A < B ? id = id + a +b : id = id + b + a;
    canvas=document.getElementById(id);
    var point1 = new getPoint(A);
    var point2 = new getPoint(B);
    console.log(point1, ' ', point2, id);
    context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(point1.x, point1.y);
    context.lineTo(point2.x, point2.y);
    context.lineWidth = 3;
    context.strokeStyle = color;
    context.stroke();
}

function run() {
    var start1 = document.getElementById('diemdi').value;
    console.log(start1);
}

function writenumber(num) {
    var id = "mypoint";
    id = id + num.toString();
    var canvse = document.getElementById(id);
    var point = new getPoint(num);
    var ctx = canvas.getContext("2d");
    ctx.font = "44px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText(num, point.x - 10, point.y + 5, 100);
}

function writenumberedge(A, B) {
    var id = "edge";
    var a = A.toString();
    var b = B.toString();
    A < B ? id = id + a + b : id = id + b + a;
    var canvse = document.getElementById(id);
    var point1 = new getPoint(A);
    var point2 = new getPoint(B);
    var point = new Object();
    point.x = (point1.x + point2.x) / 2;
    point.y = (point1.y + point2.y) / 2;
    if (point.x < 0) point.x = -point.x;
    if (point.y < 0) point.y = -point.y;
    console.log(id, point.x, point.y);
    var ctx = canvas.getContext("2d");
    ctx.font = "44px Arial";
    ctx.fillStyle = 'red';
    ctx.fillText(Graph[A][B], point.x - 20, point.y + 5, 100);
}

function addEdge(Graph, start, check, canh) {
    var ln = Graph.length;
    for (var i = 0; i < ln; i++) {
        if (Graph[start][i] !== 0 && check[i] === false) {
            canh.push(Graph[start][i]);
        }
    }
    return canh;
}

// Thuật toán Prim
function Prim(Graph) {
    var start = document.getElementById('diemdi').value;
    var sodinh = Graph.length;
    if (start >= sodinh) alert('Đỉnh không tồn tại');
    else {
        var canh = new Array();
        var dinhdi = new Array();
        var dinhden = new Array();
        var check = new Array(sodinh).fill(false);
        var count = 1;
        check[start] = true;
        canh = addEdge(Graph, start, check, canh);
        var flag = false;
        while (count !== sodinh) {
            var Min = Math.min.apply(Math, canh);
            for (var i = 0; i < sodinh; i++) {
                if (check[i] === true) {
                    for (var j = 0; j < sodinh; j++) {
                        if (Graph[i][j] === Min && check[j] === false) {
                            dinhdi.push(i);
                            dinhden.push(j);
                            check[j] = true;
                            start = j;
                            canh = addEdge(Graph, start, check, canh);
                            flag = true;
                            paint(i, j, 'red');
                        }
                        if (flag === true) break;
                    }
                }
                if (flag === true) break;
            }
            for (var v = 0; v < canh.length; v++) {
                if (canh[v] === Min) {
                    canh.splice(v, 1);
                    break;
                }
            }
            if (flag === true) count++;
            flag = false;
        }
        var show = '';
        for (var i = 0; i < dinhdi.length; i++) {
            show = show + dinhdi[i].toString() + '-->' + dinhden[i].toString() + ' : ' + Graph[dinhdi[i]][dinhden[i]].toString() + '\n';
        }
        var tong = 0;
        for (var i = 0; i < dinhdi.length; i++) {
            tong += Graph[dinhdi[i]][dinhden[i]];
        }
        show = show + 'Tổng giá trị của cây là: ' + tong.toString();
        console.log(show);
        alert("Kết quả thuật toán Prim:\n" + show);
    }
}

    // Thuật toán Dijkstra
function Dijkstra(Graph) {
    var start = parseInt(document.getElementById('diemdi').value);
    var n = Graph.length;
    if (start >= n || start < 0) {
        alert('Đỉnh không tồn tại');
        return;
    }

    var dist = new Array(n).fill(Infinity);  // Mảng khoảng cách
    var prev = new Array(n).fill(null);  // Mảng lưu trữ đỉnh trước
    var visited = new Array(n).fill(false);  // Mảng đánh dấu các đỉnh đã thăm
    dist[start] = 0;

    // Hàm tìm đỉnh có khoảng cách nhỏ nhất
    function minDistance() {
        var min = Infinity;
        var minIndex = -1;
        for (var i = 0; i < n; i++) {
            if (!visited[i] && dist[i] < min) {
                min = dist[i];
                minIndex = i;
            }
        }
        return minIndex;
    }

    // Chạy thuật toán Dijkstra
    for (var i = 0; i < n - 1; i++) {
        var u = minDistance();  // Tìm đỉnh chưa được thăm có khoảng cách nhỏ nhất
        if (u === -1) break;  // Nếu không còn đỉnh nào để thăm

        visited[u] = true;

        // Cập nhật khoảng cách các đỉnh kề
        for (var v = 0; v < n; v++) {
            if (!visited[v] && Graph[u][v] !== 0 && dist[u] + Graph[u][v] < dist[v]) {
                dist[v] = dist[u] + Graph[u][v];
                prev[v] = u;
            }
        }
    }

    // In ra đường đi ngắn nhất
    var result = "";
    for (var i = 0; i < n; i++) {
        if (dist[i] === Infinity) {
            result += `Không thể đi đến đỉnh ${i}\n`;
        } else {
            result += `Khoảng cách từ đỉnh ${start} đến đỉnh ${i}: ${dist[i]} (Đường đi: ${getPath(prev, i)})\n`;
            paintPath(prev, i, start);  // Vẽ đường đi
        }
    }
    alert(result);
}

// Hàm lấy đường đi từ đỉnh start đến đỉnh đích
function getPath(prev, target) {
    var path = [];
    for (var at = target; at !== null; at = prev[at]) {
        path.push(at);
    }
    return path.reverse().join(' -> ');
}

// Hàm vẽ đường đi
function paintPath(prev, target, start) {
    var path = [];
    for (var at = target; at !== null; at = prev[at]) {
        path.push(at);
    }
    path.reverse();

    // Vẽ các đường đi
    for (var i = 0; i < path.length - 1; i++) {
        paint(path[i], path[i + 1], 'blue');  // Màu xanh cho đường đi ngắn nhất
    }
}
