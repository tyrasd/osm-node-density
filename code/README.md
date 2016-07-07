*rudimentary scripts and instructions for how to create my osm-node-analysis visualization:*

prerequisites
-------------

download a `*.pbf` planet file.

install nodejs (v0.10 – [n](https://www.npmjs.com/package/n) is quite handy to install different versions of node on a system) incl. npm

install gnuplot

install imagemagick

install dependencies: `npm install sphericalmercator osmium@0.1`


calculate node density
----------------------

run `process.js` to generate the density data at the highest zoom level:

    cat planet.pbf | node --max-old-space-size=55000 process.js > data.15.txt

run `downscale.js` to generate lower zoom levels:

    node --max-old-space-size=55000 downscale.js data.<<zoom>>.txt > data.<<zoom-1>>.txt


calculate delta between two data sets
-------------------------------------

run `diff.js`:

    node --max-old-space-size=55000 diff.js data-2016.15.txt data-2015.15.txt > diff.15.txt

(this can be downscaled like above)


plot the results
----------------

use `plot*.gp` with gnuplot to plot one large png file for each zoom level:

    gnuplot plot.gp # or plot-diff.gp

adjust the filenames and paths in the plot-script(s) first and adjust the zoom level for each zoom level.


make tiles
----------

make subdirectories for each output zoom level (note that `*.15.txt` above corresponds to zoom level 7 in the output):

    for i in {0..7};do mkdir $i; done

in each subdirectory: create `2^<subdir-name>` sub-subdirectories, e.g. for output zoom 7:

    for i in {0..127};do mkdir $i; done

in each subdirectory: use imagemagick to split the png file into 256x256 tiles, e.g. for zoom 7:

    convert <...15.png> -crop 256x256 -set filename:tile "%[fx:page.x/256]/%[fx:page.y/256]" +repage +adjoin "%[filename:tile].png"

