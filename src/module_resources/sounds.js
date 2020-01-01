
var sounds = {} 

var AudioContext = window.AudioContext || window.webkitAudioContext;    

sounds.ctx = new AudioContext()

sounds.osc = function(type , freq, gainVal){
    var osc, gain 
    
    osc = sounds.ctx.createOscillator()
    osc.frequency.value = freq
    gain = sounds.ctx.createGain()
    osc.type = type
    gain.connect(sounds.ctx.destination)
    gain.gain.value = gainVal
    osc.connect(gain)
    osc.start()
    return osc 
} 







var beep_time = 150
var beep_dic = { 0 : 300 , 1 : 350 , 2 : 400 , 3 : 450 , 4 : 500 }
function beep(n) { 
    var f = beep_dic[n]
    var s = sounds.osc("sine" , f , 1 ) 
    setTimeout( function() {s.stop() } , beep_time)
}


export { beep } 


