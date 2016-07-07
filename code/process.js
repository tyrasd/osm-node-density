var merc = new (require("sphericalmercator"))({size: 256});

var osmium = require('osmium');
var handler = new osmium.Handler();

var count = 0;
var tiles = {};

handler.on('node', function(node) {
    count++;
    if (count % 0100000000 === 0) console.error("… processed "+count+" nodes.");
    //var xyz = merc.xyz([node.lon, node.lat, node.lon, node.lat], 13);
    //var x = xyz.minX,
    //    y = xyz.minY;
    var xy = merc.px([node.lon, node.lat], 15),
        x = Math.floor(xy[0]/256),
        y = Math.floor(xy[1]/256);
    if (!tiles[x])
        tiles[x] = {};
    if (!tiles[x][y])
        tiles[x][y] = 0;
    tiles[x][y]++;
});

handler.on('done',function() {
    console.error("Done processing "+count+" nodes.");
    for (var x in tiles)
        for (var y in tiles[x]) {
            var lat = merc.ll([0,y*256], 15)[1];
            console.log(x,y, Math.round(tiles[x][y] / Math.cos(lat*Math.PI/180)));
        }
});

var file = new osmium.File("-", "pbf");
var reader = new osmium.Reader(file);
reader.apply(reader, handler);


