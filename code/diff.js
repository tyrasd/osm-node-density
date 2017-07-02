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
          if (!tiles[x]) tiles[x] = {}
          if (!tiles[x][y]) tiles[x][y] = val
          else tiles[x][y] += val
     }
})
liner.on('end', function() {
  console.error(dbg++);

  var refliner = require('./liner')()
  var refsource = fs.createReadStream(process.argv[3])
  refsource.pipe(refliner)
 
  refliner.on("readable", function() {
    var line
    while(line=refliner.read()) {
          line = line.split(" ")
          var x = line[0],
              y = line[1],
              val = +line[2]
          if (!tiles[x]) tiles[x] = {}
          if (!tiles[x][y]) tiles[x][y] = -val
          else tiles[x][y] -= val
    }
  })
  refliner.on("end", function() {
      for (var x in tiles)
          for (var y in tiles[x])
              if (tiles[x][y] != 0) console.log(x,y,tiles[x][y]);
  })
})
console.error(dbg++);
