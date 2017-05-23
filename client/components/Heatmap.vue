<template>
    <div id="container"></div>
</template>

<script>
    import Highcharts from 'highcharts';
    export default {
        props: {
            value: "",
        },
        mounted() {
            require('highcharts/modules/exporting')(Highcharts);
            require('highcharts/modules/heatmap')(Highcharts);
            
            Highcharts.chart(this.$el, {
                chart: {
                    type: 'heatmap',
                    marginTop: 40,
                    marginBottom: 40
                },
                title: {
                    text: ''
                },
                colorAxis: {
                    min: 0,
                    minColor: '#FFFFFF',
                    maxColor: "#880E4F",
                },
                legend: {
                    align: 'right',
                    layout: 'vertical',
                    margin: 0,
                    verticalAlign: 'top',
                    y: 25,
                    symbolHeight: 320
                },
                series: [{
                    name: '',
                    borderWidth: 0,
                    data: this.convertData(),
                    dataLabels: {
                        enabled: true,
                        color: 'black',
                        style: {
                            textShadow: 'none'
                        }
                    }
                }]

            });
        },
        methods: {
            convertData() {
                let value =  this.value;
                let arrayOutput = [];

                value.forEach((itemR, i)=> {
                    itemR.forEach((itemC, j) => {
                        arrayOutput.push([
                             i, j, itemC,
                        ])
                    })
                })

                return arrayOutput;
            }
        }
    }
</script>

<style>
    #container {
        width: 100%;
        height: 400px;
        margin: 1em auto;
    }
</style>
