let normalCount = 0;
let warningCount = 0;

basic.forever(() => {
  let seismic = input.acceleration(Dimension.Strength) - 1023;
  
  led.plotBarGraph(seismic, 0);
  serial.writeValue("seismic", seismic);
  
  if (seismic > 20 || seismic < -20) {
    serial.writeLine("warning");
    warningCount += 1;
    normalCount = 0;
  } else {
    normalCount += 1;
  }
  
  if (normalCount >= 50) {
    warningCount = 0;
  }
  
  if (warningCount >= 10) {
    serial.writeLine("earthquake detected");
    warningCount = 0;
  }
});