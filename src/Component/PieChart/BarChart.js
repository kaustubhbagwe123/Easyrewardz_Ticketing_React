import React, { Component } from 'react';
import NVD3Chart from 'react-nvd3';

const datum = [
  {
    key: "Cumulative Return",
    values: [{
        "label": "A",
        "value": 25,
        "color": "#75A5DE"
    }, {
        "label": "B",
        "value": 15,
        "color": "#2561A8"
    }, {
        "label": "C",
        "value": 35,
        "color": "#75A5DE"
    }, {
        "label": "D",
        "value": 80,
        "color": "#2561A8"
    }, {
        "label": "E",
        "value": 55,
        "color": "#75A5DE"
    }, {
        "label": "F",
        "value": 96,
        "color": "#2561A8"
    }]
}
];
class BarChart extends Component {
    
  render() {
    return <NVD3Chart tooltip={{enabled: true}} type="discreteBarChart" datum={datum} x="label" y="value" height={300} />
}
}

export default BarChart


