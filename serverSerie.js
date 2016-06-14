var Irradiance = require('./models/mod_irrad.js');
var io = module.parent.exports.io;
SerialPort = require("serialport").SerialPort;
var sp = new SerialPort("/dev/cu.SLAB_USBtoUART");


sp.on("close", function(err) {
  console.log("puerto cerrado");
});

sp.on("error", function(err) {
  console.error("error", err);
});

sp.on("open",function() {
  console.log("puerto abierto...");
});

var cleanData=0;
var readData;
var val=0;
var samples=5;
var i=0;
sp.on("data", function(data) {
  readData += data.toString();

  if (readData.indexOf("B") >= 0 && readData.indexOf("A") >= 0) {
    cleanData = readData.substring(readData.indexOf("A") + 1, readData.indexOf("B"));
    readData = "";
    var date = new Date().getTime();
    i++;
    console.log("Contador: "+i);
    val = val/1 + cleanData/1;//dividir por una para q lo tome como numero.
    console.log("Valor: "+cleanData);
    console.log("Suma: "+val);
    io.sockets.emit('irrad1', date, (val/samples));
    if (i==samples) {
      console.log("serial port: " + (val/samples));

      var t = new Irradiance({
        IrradTime: Date(),
        SenNum: "irrad1",
        IrradValue: (val/samples)
      });

      //guardo los datos en la db
      t.save(function(err, doc){
        if(!err){
          console.log("guarde el paquete");
        }else{
          console.log("error al guardar papquete");
          console.log(doc);
        }
      });


  // Limpio las variables
  val=0;
  i=0;
}
}
});

// fired when a message is received
// servermqtt.on('published', function(packet, client) {
//   console.log('Published ' + packet.payload);
//   // console.log('Published ' + packet.topic);
//   // console.log('Published ' + client);
//   console.log(Date());
//   var t = new Topics({
//     TopicTime: Date(),
//     TopicTema: packet.topic,
//     TopicValue: packet.payload
//   });
//   t.save(function(err, doc){
//     if(!err){
//       console.log("guarde el paquete");
//       if(packet.topic == 't1'){
//         io.sockets.emit('t1', {tema: String(packet.topic), valor: String(packet.payload)});
//       }
//       if(packet.topic == 'h1'){
//         io.sockets.emit('h1', {tema: String(packet.topic), valor: String(packet.payload)});
//       }
//       io.sockets.emit('topic', {tema: String(packet.topic), valor: String(packet.payload)});
//     }else{
//       console.log("error al guardar papquete");
//       console.log(doc);
//     }
//   });
// });
