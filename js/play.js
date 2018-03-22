var mapBols={
    "Na": [31],
    "Ne": [33],
    "Tin": [41],
    "Tin2": [42],
    "Tu": [39],
    "Ti": [40],
    "Re": [27],
    "Ki": [30],
    "Ke": [30],
    "Ta": [32],
    "Te": [37],
    "TiTa": [40, 35],
    "Kat": [22],
    "Ge": [26],
    "Ga": [25],
    "Soft Ra": [27],
    "Ghasee Ra": [29],
    "Din": [38],
    "Thun": [38],
    "Tra": [35, 27],
    "Ra": [27],
    "-": [34],
    "Dhi": [40, 36],
    "Ghasee Dhi": [40, 29],
    "Soft Dhi": [40, 27],
    "Dha": [32, 25],
    "Dha1": [32, 26],
    "Dha2": [32, 27],
    "Dha3": [32, 28],
    "Dha4": [32, 29],
    "Dha5": [32, 21],
    "Dhin": [41, 25],
    "Dhin1": [41, 26],
    "Dhin2": [41, 27],
    "Dhin3": [41, 28],
    "Dhin4": [41, 29],
    "Dhin5": [41, 21],
    "Dhun": [38, 25],
    "-": [34]
};

function playComposition(composition, tempo, volume){
    var delay = 60.0/tempo;
    var delta = delay;

    ctxtime = MIDI.getContext().currentTime;

    if (composition)
        composition.split("|").forEach(function(beat, index) {
            ctxtime = playBeat(beat.replace(/\s/g, ""), ctxtime, delta);
        }); 
}

midiAudioBuffers = [];

function playBeat(beat, ctxtime, delta) {
    //Check emphasis
    var emph = 0;
    var e_rgx = /\+/g;
    if(e_rgx.test(beat)){
        emph = beat.match(e_rgx).length;
        beat = beat.replace(e_rgx, "");
    }
    
    //Check matra
    var matra = 1;
    var m_rgx = /\[\s*(\d+\.?\d*)\s*\]/;

    if ((m = m_rgx.exec(beat)) !== null) {
        matra = m[1];
        beat = beat.replace(m_rgx, "");
    }

    var midi = mapBols[beat];
    console.log(ctxtime, beat, emph, matra, midi);

    if (beat != "-" && beat in mapBols) {
        for (note of midi){
            midiAudioBuffers.push(
                MIDI.noteOn(window.CHANNEL, note, window.VOLUME + emph*5, ctxtime)
            );  
        }
    }
    else {
        MIDI.noteOff(CHANNEL, beat, ctxtime)
    }

    return ctxtime + delta*matra;
}

function stopAllBeats(){
    midiAudioBuffers.forEach(function(ab){
        ab.stop();
    });
}   