# TL-25 cold-chain temperature logger — datasheet (excerpt)

| | |
|---|---|
| Sensor | NTC thermistor, 16-bit ADC |
| Resolution | 0.01 °C (0.01 °F when unit = F) |
| Accuracy | ±0.3 °C, 0–10 °C |
| Sampling | 60 s |
| Response time (τ63) | 4 min typical, bare probe in moving air |
| Display unit | °C or °F, set at commissioning (see fleet logger register) |
| Mounting | probe supplied with a foam calibration sleeve for shipment use. With the sleeve fitted the step response is slower than the bare-probe figure above; refer to the batch calibration certificate for the as-shipped response. |
| Calibration | batch certificate: step from room temperature into a 4.0 °C reference bath, readings every 60 s |

Firmware 2.4.x writes `temp` in the configured display unit. Ambient column (`ambient_c`) is not measured by the logger; it is appended by the fleet system from the Open-Meteo ERA5 archive for the route cities.
