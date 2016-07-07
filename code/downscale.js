var fs=require("fs");

var dbg = 0;
console.error(dbg++);

var fs = require('fs')
var liner = require('./liner')()
var source = fs.createReadStream(process.argv[2])
source.pipe(liner)
var tiles = {}
liner.on('readable', function () {
     var line
     while (line = liner.read()) {
          // do something with line
          line = line.split(" ")
          var x = line[0],
              y = line[1],
              val = +line[2]
          x = Math.floor(x/2)
          y = Math.floor(y/2)
          if (!tiles[x]) tiles[x] = {}
          if (!tiles[x][y]) tiles[x][y] = 0
          tiles[x][y] += val
     }
})
liner.on('end', function() {
  console.error(dbg++);
      for (var x in tiles)
          for (var y in tiles[x])
              console.log(x,y,tiles[x][y]);
})
console.error(dbg++);
