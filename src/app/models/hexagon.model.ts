export interface HexCell {
    row: number;
    col: number;
    polygon?: L.Polygon;       // capa Leaflet
    events: any[];             // todos los eventos que caen en el hex
    color: string;             // color de relleno final
    maxStrength: number;       // fuerza máxima si es spoofer
    isSpoofer: boolean;        // true => color rojo, false => jam
  }