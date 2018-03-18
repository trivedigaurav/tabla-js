var mapBols={
    Ta:[71,59],Ta1:[71,68],Ta2:[71,70],Ta3:[71,64],
    Tin:[83,68],Tin1:[87,68],Tin2:[81,68],Tin3:[63,68],
    Tu:[88,68],Tu1:[63,68],Tu2:[83,68],Tu3:[87,68],
    Ti:[86,59],Ti1:[84,59],Ti2:[82,59],Ti3:[79,59],
    Te:[62,59],Te1:[62,59],Te2:[62,59],Te3:[62,59],
    Tet:[82,59],Tet1:[84,59],Tet2:[86,59],Tet3:[78,59],
    Ta5:[82,59],Ta6:[84,59],Ta7:[86,59],Ta8:[78,59],
    Ta9:[84,59],Ta10:[86,59],Ta11:[82,59],Ta12:[79,59],
    Tra:[86,59],Tra1:[86,59],Tra2:[86,59],Tra3:[86,59],
    Ra:[86,59],Ra1:[84,59],Ra2:[82,59],Ra3:[86,59],
    Re:[77,59],Re1:[77,59],Re2:[77,59],Re3:[77,59],
    Na:[71,59],Na1:[71,68],Na2:[71,70],Na3:[71,64],
    N4:[86,59],Na5:[84,59],Na6:[82,59],Na7:[72,59],
    Di:[63,59],Di1:[81,59],Di2:[83,59],Di3:[87,59],
    Da:[86,59],Da1:[84,59],Da2:[81,59],Da3:[71,59],
    Da4:[71,59],Da5:[78,59],Da6:[79,59],Da7:[86,59],
    Ge:[76,59],Ge1:[65,59],Ge2:[66,59],Ge3:[67,59],
    Gi:[76,59],Gi1:[65,59],Gi2:[66,59],Gi3:[67,59],
    Ga:[76,59],Ga1:[65,59],Ga2:[66,59],Ga3:[67,59],
    Ghe:[76,59],Ghe1:[65,59],Ghe2:[66,59],Ghe3:[67,59],
    Ghi:[76,59],Ghi1:[65,59],Ghi2:[66,59],Ghi3:[67,59],
    Gha:[69,59],Gha1:[73,59],Gha2:[66,59],Gha3:[67,59],
    Ke:[68,59],Ke1:[70,59],Ke2:[74,59],Ke3:[64,59],
    Ki:[68,59],Ki1:[70,59],Ki2:[74,59],Ki3:[64,59],
    Ka:[68,59],Ka1:[70,59],Ka2:[74,59],Ka3:[64,59],
    Kat:[70,70],Kat1:[70,59],Kat2:[74,74],Kat3:[74,59],
    Dha:[71,76],Dha1:[71,65],Dha2:[71,66],Dha3:[71,67],
    Dha4:[71,68],Dha5:[71,69],Dha6:[71,70],Dha7:[71,80],
    Dhin:[83,76],Dhin1:[87,65],Dhin2:[81,66],Dhin3:[63,67],
    Dhin4:[88,76],Dhin5:[63,65],Dhin6:[83,66],Dhin7:[87,67],
    Dhi:[86,76],Dhi1:[84,65],Dhi2:[82,66],Dhi3:[79,67],
    Dhe:[62,76],Dhe1:[62,65],Dhe2:[62,66],Dhe3:[62,67],
    Dhet:[82,76],Dhet1:[84,65],Dhet2:[86,66],Dhet3:[78,67],
    "(":[59,59],")":[59,59],"-":[59,59]
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
        midiAudioBuffers.push(
            MIDI.noteOn(window.CHANNEL, midi[0], window.VOLUME + emph*5, ctxtime)
        );  
        midiAudioBuffers.push(
            MIDI.noteOn(window.CHANNEL, midi[1], window.VOLUME + emph*5, ctxtime)
        );
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