/*!
 * angular-chart.js - An angular.js wrapper for Chart.js
 * http://jtblin.github.io/angular-chart.js/
 * Version: 1.1.1
 *
 * Copyright 2016 Jerome Touffe-Blin
 * Released under the BSD-2-Clause license
 * https://github.com/jtblin/angular-chart.js/blob/master/LICENSE
 */
(function (factory) {
    'use strict';
    if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(
          typeof angular !== 'undefined' ? angular : require('angular'),
          typeof Chart !== 'undefined' ? Chart : require('chart.js'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['angular', 'chart'], factory);
    } else {
        // Browser globals
        if (typeof angular === 'undefined') {
            throw new Error('AngularJS framework needs to be included, see https://angularjs.org/');
        } else if (typeof Chart === 'undefined') {
            throw new Error('Chart.js library needs to be included, see http://jtblin.github.io/angular-chart.js/');
        }
        factory(angular, Chart);
    }
}(function (angular, Chart) {
    'use strict';

    Chart.defaults.global.multiTooltipTemplate = '<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>';
    Chart.defaults.global.tooltips.mode = 'label';
    Chart.defaults.global.elements.line.borderWidth = 2;
    Chart.defaults.global.elements.rectangle.borderWidth = 2;    
    Chart.defaults.global.elements.arc.borderWidth = 2;
    Chart.defaults.global.elements.arc.borderColor = '#ffffff';  
    Chart.defaults.global.elements.arc.backgroundColor = 'rgba(255,255,255,255)';
    Chart.defaults.global.legend.display = false;
    
    Chart.defaults.global.colors = [
      '#97BBCD',// blue
      '#F7464A',// red
      '#ffff99',//yellow light
      '#00FFFF',//cyan
      '#46bf8e',// green
      '#6495ED',//corn flower blue
      '#FDB45C',// yellow
      '#800080',//purple
      '#3CB371',//medium sea green
      '#FF7F50',//coral
     // '#EEE8AA',//pale golden rod
      '#87CEFA'//light sky blue
    ];
    Chart.Legend.prototype.afterFit = function () {
        this.height = this.height + 80;
    };
    Chart.plugins.register({
        afterDatasetsDraw: function (chart) {
                var ctx = chart.chart.ctx;               
                chart.data.datasets.forEach(function (dataset, i) {
                    var meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function (element, index) {

                          
                            // Draw the text in black, with the specified font
                            ctx.fillStyle = 'rgb(0, 0, 0)';

                            var fontSize = 16;
                            var fontStyle = 'normal';
                            var fontFamily = 'Helvetica Neue';
                            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                            var dataString;                      
                            // Just naively convert to string for now
                            if (chart.config.type == "line" || chart.config.type == "bar") {
                                dataString = dataset.data[index].toString();

                                // Make sure alignment settings are correct
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';

                                var padding = 3;
                                var position = element.tooltipPosition();
                                ctx.fillText(dataString, position.x, position.y - (fontSize / 3) - padding);
                            }
                            if (chart.config.type == "doughnut" && chart.data.datasets.length > 1) { 

                                 
                                    var fontStyle =  'Arial';
                                   var txt = chart.data.datasets[1].label;
                                var color = '#000099';
                                    var sidePadding =  20;
                                    var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
                                 

                                    //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                                    var stringWidth = ctx.measureText(txt).width;
                                    var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
                                
                                    
                                    //Set font settings to draw it correctly.
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                                    var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                                    ctx.font =  "35px " + fontStyle;
                                    ctx.fillStyle = color;

                                    //Draw text in center
                                    ctx.fillText(txt, centerX, centerY);
                                
                            }

                       

                        });
                    }
                });
            
        }
    });

    var useExcanvas = typeof window.G_vmlCanvasManager === 'object' &&
      window.G_vmlCanvasManager !== null &&
      typeof window.G_vmlCanvasManager.initElement === 'function';

    if (useExcanvas) Chart.defaults.global.animation = false;

    return angular.module('chart.js', [])
      .provider('ChartJs', ChartJsProvider)
      .factory('ChartJsFactory', ['ChartJs', '$timeout', ChartJsFactory])
      .directive('chartBase', ['ChartJsFactory', function (ChartJsFactory) { return new ChartJsFactory(); }])
      .directive('chartLine', ['ChartJsFactory', function (ChartJsFactory) { return new ChartJsFactory('line'); }])
      .directive('chartBar', ['ChartJsFactory', function (ChartJsFactory) { return new ChartJsFactory('bar'); }])
      .directive('chartHorizontalBar', ['ChartJsFactory', function (ChartJsFactory) { return new ChartJsFactory('horizontalBar'); }])
      .directive('chartRadar', ['ChartJsFactory', function (ChartJsFactory) { return new ChartJsFactory('radar'); }])
      .directive('chartDoughnut', ['ChartJsFactory', function (ChartJsFactory) { return new ChartJsFactory('doughnut'); }])
      .directive('chartPie', ['ChartJsFactory', function (ChartJsFactory) { return new ChartJsFactory('pie'); }])
      .directive('chartPolarArea', ['ChartJsFactory', function (ChartJsFactory) { return new ChartJsFactory('polarArea'); }])
      .directive('chartBubble', ['ChartJsFactory', function (ChartJsFactory) { return new ChartJsFactory('bubble'); }])
      .name;

    /**
     * Wrapper for chart.js
     * Allows configuring chart js using the provider
     *
     * angular.module('myModule', ['chart.js']).config(function(ChartJsProvider) {
     *   ChartJsProvider.setOptions({ responsive: false });
     *   ChartJsProvider.setOptions('Line', { responsive: true });
     * })))
     */
    function ChartJsProvider() {
        var options = { responsive: true };
        var ChartJs = {
            Chart: Chart,
            getOptions: function (type) {
                var typeOptions = type && options[type] || {};
                return angular.extend({}, options, typeOptions);
            }
        };

        /**
         * Allow to set global options during configuration
         */
        this.setOptions = function (type, customOptions) {
            // If no type was specified set option for the global object
            if (!customOptions) {
                customOptions = type;
                options = angular.merge(options, customOptions);
            } else {
                // Set options for the specific chart
                options[type] = angular.merge(options[type] || {}, customOptions);
            }

            angular.merge(ChartJs.Chart.defaults, options);
        };

        this.$get = function () {
            return ChartJs;
        };
    }

    function ChartJsFactory(ChartJs, $timeout) {
        return function chart(type) {
            return {
                restrict: 'CA',
                scope: {
                    chartGetColor: '=?',
                    chartType: '=',
                    chartData: '=?',
                    chartLabels: '=?',
                    chartOptions: '=?',
                    chartSeries: '=?',
                    chartColors: '=?',
                    chartClick: '=?',
                    chartHover: '=?',
                    chartDatasetOverride: '=?'
                },
                link: function (scope, elem/*, attrs */) {
                    if (useExcanvas) window.G_vmlCanvasManager.initElement(elem[0]);

                    // Order of setting "watch" matter
                    scope.$watch('chartData', watchData, true);
                    scope.$watch('chartSeries', watchOther, true);
                    scope.$watch('chartLabels', watchOther, true);
                    scope.$watch('chartOptions', watchOther, true);
                    scope.$watch('chartColors', watchOther, true);
                    scope.$watch('chartDatasetOverride', watchOther, true);
                    scope.$watch('chartType', watchType, false);

                    scope.$on('$destroy', function () {
                        destroyChart(scope);
                    });

                    scope.$on('$resize', function () {
                        if (scope.chart) scope.chart.resize();
                    });

                    function watchData(newVal, oldVal) {
                        if (!newVal || !newVal.length || (Array.isArray(newVal[0]) && !newVal[0].length)) {
                            destroyChart(scope);
                            return;
                        }
                        var chartType = type || scope.chartType;
                        if (!chartType) return;

                        if (scope.chart && canUpdateChart(newVal, oldVal))
                            return updateChart(newVal, scope);

                        createChart(chartType, scope, elem);
                    }

                    function watchOther(newVal, oldVal) {
                        if (isEmpty(newVal)) return;
                        if (angular.equals(newVal, oldVal)) return;
                        var chartType = type || scope.chartType;
                        if (!chartType) return;

                        // chart.update() doesn't work for series and labels
                        // so we have to re-create the chart entirely
                        createChart(chartType, scope, elem);
                    }

                    function watchType(newVal, oldVal) {
                        if (isEmpty(newVal)) return;
                        if (angular.equals(newVal, oldVal)) return;
                        createChart(newVal, scope, elem);
                    }
                }
            };
        };

        function createChart(type, scope, elem) {
            var options = getChartOptions(type, scope);
            if (!hasData(scope) || !canDisplay(type, scope, elem, options)) return;

            var cvs = elem[0];
            var ctx = cvs.getContext('2d');

            scope.chartGetColor = getChartColorFn(scope);
            var data = getChartData(type, scope);
            // Destroy old chart if it exists to avoid ghost charts issue
            // https://github.com/jtblin/angular-chart.js/issues/187
            destroyChart(scope);

            scope.chart = new ChartJs.Chart(ctx, {
                type: type,
                data: data,
                options
            });
            scope.$emit('chart-create', scope.chart);
            bindEvents(cvs, scope);
        }

        function canUpdateChart(newVal, oldVal) {
            if (newVal && oldVal && newVal.length && oldVal.length) {
                return Array.isArray(newVal[0]) ?
                newVal.length === oldVal.length && newVal.every(function (element, index) {
                    return element.length === oldVal[index].length;
                }) :
                  oldVal.reduce(sum, 0) > 0 ? newVal.length === oldVal.length : false;
            }
            return false;
        }

        function sum(carry, val) {
            return carry + val;
        }

        function getEventHandler(scope, action, triggerOnlyOnChange) {
            var lastState = {
                point: void 0,
                points: void 0
            };
            return function (evt) {
                var atEvent = scope.chart.getElementAtEvent || scope.chart.getPointAtEvent;
                var atEvents = scope.chart.getElementsAtEvent || scope.chart.getPointsAtEvent;
                if (atEvents) {
                    var points = atEvents.call(scope.chart, evt);
                    var point = atEvent ? atEvent.call(scope.chart, evt)[0] : void 0;

                    if (triggerOnlyOnChange === false ||
                      (!angular.equals(lastState.points, points) && !angular.equals(lastState.point, point))
                    ) {
                        lastState.point = point;
                        lastState.points = points;
                        scope[action](points, evt, point);
                    }
                }
            };
        }

        function getColors(type, scope) {
            var colors = angular.copy(scope.chartColors ||
              ChartJs.getOptions(type).chartColors ||
              Chart.defaults.global.colors
            );
            var notEnoughColors = colors.length < scope.chartData.length;
            while (colors.length < scope.chartData.length) {
                colors.push(scope.chartGetColor());
            }
            // mutate colors in this case as we don't want
            // the colors to change on each refresh
            if (notEnoughColors) scope.chartColors = colors;
            return colors.map(convertColor);
        }

        function convertColor(color) {
            // Allows RGB and RGBA colors to be input as a string: e.g.: "rgb(159,204,0)", "rgba(159,204,0, 0.5)"
            if (typeof color === 'string' && color[0] === 'r') return getColor(rgbStringToRgb(color));
            // Allows hex colors to be input as a string.
            if (typeof color === 'string' && color[0] === '#') return getColor(hexToRgb(color.substr(1)));
            // Allows colors to be input as an object, bypassing getColor() entirely
            if (typeof color === 'object' && color !== null) return color;
            return getRandomColor();
        }

        function getRandomColor() {
            var color = [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
            return getColor(color);
        }

        function getColor(color) {
            var alpha = color[3] || 1;
            color = color.slice(0, 3);
            return {
                backgroundColor: rgba(color, 0.2),
                pointBackgroundColor: rgba(color, alpha),
                pointHoverBackgroundColor: rgba(color, 0.8),
                borderColor: rgba(color, alpha),
                pointBorderColor: '#fff',
                pointHoverBorderColor: rgba(color, alpha)
            };
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function rgba(color, alpha) {
            // rgba not supported by IE8
            return useExcanvas ? 'rgb(' + color.join(',') + ')' : 'rgba(' + color.concat(alpha).join(',') + ')';
        }

        // Credit: http://stackoverflow.com/a/11508164/1190235
        function hexToRgb(hex) {
            var bigint = parseInt(hex, 16),
              r = (bigint >> 16) & 255,
              g = (bigint >> 8) & 255,
              b = bigint & 255;

            return [r, g, b];
        }

        function rgbStringToRgb(color) {
            var match = color.match(/^rgba?\(([\d,.]+)\)$/);
            if (!match) throw new Error('Cannot parse rgb value');
            color = match[1].split(',');
            return color.map(Number);
        }

        function hasData(scope) {
            return scope.chartData && scope.chartData.length;
        }

        function getChartColorFn(scope) {
            return typeof scope.chartGetColor === 'function' ? scope.chartGetColor : getRandomColor;
        }

        function getChartData(type, scope) {
            var colors = getColors(type, scope);
            return Array.isArray(scope.chartData[0]) ?
                type == 'doughnut' ? getDataSetsforDonought(scope.chartLabels, scope.chartData, scope.chartSeries || [], colors, scope.chartDatasetOverride): getDataSets(scope.chartLabels, scope.chartData, scope.chartSeries || [], colors, scope.chartDatasetOverride) :
              getData(scope.chartLabels, scope.chartData, colors, scope.chartDatasetOverride);
        }

        function getDataSets(labels, data, series, colors, datasetOverride) { 
           
            return {                
                labels: labels,
                datasets: data.map(function (item, i) {
                    var dataset = angular.extend({}, colors[i], {
                        label: series[i],
                        data: item,
                        backgroundColor: colors.map(function (color) {
                            return color.pointBackgroundColor;
                        }),
                        hoverBackgroundColor: colors.map(function (color) {
                            return color.backgroundColor;
                        })
                    });
                    if (datasetOverride && datasetOverride.length >= i) {
                        angular.merge(dataset, datasetOverride[i]);
                    }
                    return dataset;
                })
            };
        }

        function getDataSetsforDonought(labels, data, series, colors, datasetOverride) {         
            return {
                labels: labels,
                datasets: data.map(function (item, i) {
                    var dataset = angular.extend({}, colors[i], {
                        label: series[i],
                        data: item,
                        backgroundColor: colors.map(function (color) {
                            return color.pointBackgroundColor;
                        }),
                        hoverBackgroundColor: colors.map(function (color) {
                            return color.backgroundColor;
                        }),

                        borderWidth: 3,
                        borderColor: '#fff'
                    });
                    if (datasetOverride && datasetOverride.length >= i) {
                        angular.merge(dataset, datasetOverride[i]);
                    }
                    return dataset;
                })
            };
        }

        function getData(labels, data, colors, datasetOverride) {          
            var dataset = {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.map(function (color) {
                        return color.pointBackgroundColor;
                    }),
                    hoverBackgroundColor: colors.map(function (color) {
                        return color.backgroundColor;
                    })
                }]
            };
            if (datasetOverride) {
                angular.merge(dataset.datasets[0], datasetOverride);
            }
            return dataset;
        }

        function getChartOptions(type, scope) {
            return angular.extend({}, ChartJs.getOptions(type), scope.chartOptions);
        }

        function bindEvents(cvs, scope) {
            cvs.onclick = scope.chartClick ? getEventHandler(scope, 'chartClick', false) : angular.noop;
            cvs.onmousemove = scope.chartHover ? getEventHandler(scope, 'chartHover', true) : angular.noop;
        }

        function updateChart(values, scope) {
            if (Array.isArray(scope.chartData[0])) {
                scope.chart.data.datasets.forEach(function (dataset, i) {
                    dataset.data = values[i];
                });
            } else {
                scope.chart.data.datasets[0].data = values;
            }

            scope.chart.update();
            scope.$emit('chart-update', scope.chart);
        }

        function isEmpty(value) {
            return !value ||
              (Array.isArray(value) && !value.length) ||
              (typeof value === 'object' && !Object.keys(value).length);
        }

        function canDisplay(type, scope, elem, options) {
            // TODO: check parent?
            if (options.responsive && elem[0].clientHeight === 0) {
                $timeout(function () {
                    createChart(type, scope, elem);
                }, 50, false);
                return false;
            }
            return true;
        }

        function destroyChart(scope) {
            if (!scope.chart) return;
            scope.chart.destroy();
            scope.$emit('chart-destroy', scope.chart);
        }
    }

  
}));
