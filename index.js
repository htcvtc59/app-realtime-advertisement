var express = require('express');
var app = express();
app.use(express.static('public'));
app.set("view engine", "ejs");
app.set("views", "./views");


var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000);

var mangAds = [
    new Quangcao("1.jpg", "http://google.com"),
    new Quangcao("2.jpg", "http://google.com"),
    new Quangcao("3.jpg", "http://google.com")
]

io.on("connection", function (socket) {
    console.log(socket.id + '');

    socket.on("admin_send_qc", function (data) {
        console.log(data);
        var l = timlink(data);
        io.sockets.emit("server_send_qc", { hinh: data, link: l });
    });

});

app.get('/admin', (req, res) => {
    res.render("admin", { mangQC: mangAds });
});

app.get('/web', (req, res) => {
    res.render("web");
});

function timlink(hinh) {
    $kq = "";
    mangAds.forEach(function (qc) {
        if (qc.hinh = hinh) return kq = qc.link;
    });
    return kq;
}

function Quangcao(hinh, link) {
    this.hinh = hinh;
    this.link = link;
}