# tabla-js
Proof-of-concept app for playing tabla compositions using [MIDI.js](https://github.com/mudcube/MIDI.js)

[Demo](https://trivedigaurav.com/exp/tabla-js-master/example.html) available online.

It uses sound samples by Pete Lockett downloaded from [here](http://www.petelockett.com/pete%20new%20pages/tabla%20programming.html):

| Sample            |  Note     |  Decimal|
| ------------------|:-----------:|--------:|
| Hi Vhoop          |   A0      |   21 |
| flick             |   Bb0     |   22 |
| ge open attack    |   B0      |   23 |
| ge open           |   C1      |   24 |
| ge quick          |   Db1     |   25 |
| ge soft open hi   |   D1      |   26 |
| ge soft open      |   Eb1     |   27 |
| ge stacatto       |   E1      |   28 |
| gu bend up        |   F1      |   29 |
| ke 3              |   Gb1     |   30 |
| na open           |   G1      |   31 |
| na                |   Ab1     |   32 |
| ne                |   A1      |   33 |
| silence           |   Bb1     |   34 |
| ta                |   B1      |   35 |
| te 3              |   C2      |   36 |
| te                |   Db2     |   37 |
| thun              |   D2      |   38 |
| ti 2              |   Eb2     |   39 |
| ti                |   E2      |   40 |
| tin 2             |   F2      |   41 |
| tin               |   Gb2     |   42 |

Look up `mapBols` in [js/play.js](js/play.js) for mapping to tabla bols.
