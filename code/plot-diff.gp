reset
unset xtics
unset ytics
unset border
unset key
#unset legend
unset title
set lmargin at screen 0
set tmargin at screen 0
set rmargin at screen 1
set bmargin at screen 1

set palette model HSV rgbformulae -7,2,12

zoom = "8"

width = 2**(zoom)

set xrange [0:width-1]
set yrange [0:width]

set object rectangle from screen 0,0 to screen 1,1 fillcolor rgb"#000000" behind

set terminal png size width,width
set output ("diff-area-2016.".zoom.".png")

min(x,y) = (x < y) ? x : y
max(x,y) = (x > y) ? x : y
sign(x) = (x >= 0) ? 1 : -1

set cbrange [-log(1015214):log(1015214)] # [0:1]

plot ('diff-area-2016.'.zoom.'.txt') using ($1):(width-1-$2):(sign($3)*log(abs($3))) with dots palette

