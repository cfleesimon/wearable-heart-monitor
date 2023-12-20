// Create QRS Chart
function createQRSChart() {
    var chart = new Highcharts.Chart({
        time:{
            useUTC: false
        },
        chart:{
            renderTo:'chart-qrs',
            type: 'spline'
        },
        series: [
            {
                name: 'QRS Result'
            }
        ],
        title: {
            text: undefined
        },
        plotOptions: {
            line: {
                animation: false,
                dataLabels: {
                    enabled: true
                }
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { second: '%H:%M:%S' }
        },
        yAxis: {
            title: {
                text: 'Millisecond (ms)'
            }
        },
        credits: {
            enabled: false
        }
    });
    return chart;
}

// Create Humidity Chart
function createRMSSDChart(){
    var chart = new Highcharts.Chart({
        time:{
            useUTC: false
        },
        chart:{
            renderTo:'chart-rmssd',
            type: 'spline'
        },
        series: [{
            name: 'RMSSD Result'
        }],
        title: {
            text: undefined
        },
        plotOptions: {
            line: {
                animation: false,
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                color: '#4CAF50'
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { second: '%H:%M:%S' }
        },
        yAxis: {
            title: {
                text: 'Millisecond (ms)'
            }
        },
        credits: {
            enabled: false
        }
    });
    return chart;
}

// Create Pressure Chart
function createSDNNChart() {
    var chart = new Highcharts.Chart({
        time:{
            useUTC: false
        },
        chart:{
            renderTo:'chart-sdnn',
            type: 'spline'
        },
        series: [{
            name: 'SDNN Result'
        }],
        title: {
            text: undefined
        },
        plotOptions: {
            line: {
                animation: false,
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                color: '#FF9800'
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { second: '%H:%M:%S' }
        },
        yAxis: {
            title: {
                text: 'Millisecond (ms)'
            }
        },
        credits: {
            enabled: false
        }
    });
    return chart;
}

// Create ECG chart
function createECGChart() {
    var chart = new Highcharts.Chart({
        time:{
            useUTC: false
        },
        chart:{
            renderTo:'chart-ecg',
            type: 'spline'
        },
        series: [{
            name: 'AD8232'
        }],
        title: {
            text: undefined
        },
        plotOptions: {
            line: {
                animation: false,
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                color: '#8F00FF'
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { second: '%H:%M:%S' }
        },
        yAxis: {
            title: {
                text: 'Normalised Amplitude'
            }
        },
        credits: {
            enabled: false
        }
    });
    return chart;
}

// Create ECG chart
function createPPGChart() {
    var chart = new Highcharts.Chart({
        time:{
            useUTC: false
        },
        chart:{
            renderTo:'chart-ppg',
            type: 'spline'
        },
        series: [{
            name: 'MAX30105'
        }],
        title: {
            text: undefined
        },
        plotOptions: {
            line: {
                animation: false,
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                color: '#D21F3C'
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { second: '%H:%M:%S' }
        },
        yAxis: {
            title: {
                text: 'Normalised Amplitude'
            }
        },
        credits: {
            enabled: false
        }
    });
    return chart;
}