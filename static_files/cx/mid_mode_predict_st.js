//全局变量
//大型赛事活动模式一站点
var bregion_model = [
    {'ID': 'wx4epx861cb4', 'poly': [[116.3537006693754, 39.94585003081417], [116.3413469174728, 39.93505781967401], [116.33787997410147, 39.944093886417186], [116.34280844395735, 39.9578664764638], [116.34427581197913, 39.959041188303146], [116.35206007361617, 39.95736061930561]], 'FlowOut': 110846, 'FlowIn': 107648, 'NetFlow': -3198}, 
{'ID': 'wx4epwebrkgk', 'poly': [[116.3557950171642, 39.94292823829354], [116.3537006693754, 39.94585003081417], [116.3413469174728, 39.93505781967401], [116.34131841878228, 39.93423929352307], [116.34507756326873, 39.92618447560267], [116.35013166386854, 39.92487791151423], [116.3558121383944, 39.93266682541865]], 'FlowOut': 57322, 'FlowIn': 53888, 'NetFlow': -3434}, 
{'ID': 'wx4er5hv2dj8', 'poly': [[116.31642410866336, 39.95451452662089], [116.31502692897493, 39.958864561032115], [116.3152760004971, 39.96544782339419], [116.33980892758409, 39.97045450159636], [116.34427581197913, 39.959041188303146], [116.34280844395735, 39.9578664764638], [116.31666020258783, 39.95439698068918]], 'FlowOut': 87534, 'FlowIn': 85172, 'NetFlow': -2362}, 
{'ID': 'wx4er0qnyx0n', 'poly': [[116.32456578412427, 39.94345049318621], [116.33787997410147, 39.944093886417186], [116.34280844395735, 39.9578664764638], [116.31666020258783, 39.95439698068918]], 'FlowOut': 94084, 'FlowIn': 96504, 'NetFlow': 2420}, 
{'ID': 'wx4epnws1ueb', 'poly': [[116.32483832895052, 39.934090557018955], [116.34131841878228, 39.93423929352307], [116.3413469174728, 39.93505781967401], [116.33787997410147, 39.944093886417186], [116.32456578412427, 39.94345049318621]], 'FlowOut': 61662, 'FlowIn': 72738, 'NetFlow': 11076}, 
{'ID': 'wx4enye9d6xj', 'poly': [[116.32004313480327, 39.92579542182965], [116.32483832895052, 39.934090557018955], [116.32456578412427, 39.94345049318621], [116.31666020258783, 39.95439698068918], [116.31642410866336, 39.95451452662089], [116.3102086486841, 39.9478711259911], [116.30930951983466, 39.93622183571591], [116.31633171356452, 39.92590850203748]], 'FlowOut': 20332, 'FlowIn': 17288, 'NetFlow': -3044}, 
{'ID': 'wx4ephyweb9u', 'poly': [[116.33618634167766, 39.91980189901589], [116.34507756326873, 39.92618447560267], [116.34131841878228, 39.93423929352307], [116.32483832895052, 39.934090557018955], [116.32004313480327, 39.92579542182965], [116.32242873603758, 39.92343453196869]], 'FlowOut': 13692, 'FlowIn': 11742, 'NetFlow': -1950}];




bmode1_in1 = [{'AreaID': 'wx43zpy0d434', 'Station': 'B西直门外', 'Lng': 116.34816, 'Lat': 39.939739, '15-16': 451, '16-17': 573, '17-18': 567, '18-19': 419, '19-20': 354, '20-21': 330, '21-22': 208, '22-23': 58, '23-24': 10}, 
{'AreaID': 'wx43zpy0d434', 'Station': 'B北京交通大学', 'Lng': 116.343361, 'Lat': 39.946705, '15-16': 160, '16-17': 180, '17-18': 182, '18-19': 141, '19-20': 100, '20-21': 95, '21-22': 76, '22-23': 34, '23-24': 0}, 
{'AreaID': 'wx4epwebrkgk', 'Station': 'R车公庄西', 'Lng': 116.344082, 'Lat': 39.932466, '15-16': 685, '16-17': 771, '17-18': 873, '18-19': 736, '19-20': 564, '20-21': 566, '21-22': 546, '22-23': 307, '23-24': 54}, 
{'AreaID': 'wx43zpy0d434', 'Station': 'B北京交通大学东门', 'Lng': 116.347444, 'Lat': 39.953984, '15-16': 150, '16-17': 166, '17-18': 179, '18-19': 156, '19-20': 103, '20-21': 83, '21-22': 76, '22-23': 33, '23-24': 0}, 
{'AreaID': 'wx43zpy0d434', 'Station': 'B白石桥东', 'Lng': 116.329575, 'Lat': 39.938667, '15-16': 701, '16-17': 693, '17-18': 748, '18-19': 631, '19-20': 420, '20-21': 288, '21-22': 159, '22-23': 67, '23-24': 4}, 
{'AreaID': 'wx43zpy0d434', 'Station': 'B紫竹院南门', 'Lng': 116.316068, 'Lat': 39.9402, '15-16': 278, '16-17': 290, '17-18': 263, '18-19': 226, '19-20': 181, '20-21': 129, '21-22': 87, '22-23': 37, '23-24': 0}, 
{'AreaID': 'wx43zpy0d434', 'Station': 'B高梁桥', 'Lng': 116.349815, 'Lat': 39.945507, '15-16': 36, '16-17': 42, '17-18': 29, '18-19': 9, '19-20': 8, '20-21': 7, '21-22': 2, '22-23': 1, '23-24': 0}, 
{'AreaID': 'wx43zpy0d434', 'Station': 'R地铁西直门站', 'Lng': 116.351921, 'Lat': 39.941574, '15-16': 318, '16-17': 350, '17-18': 354, '18-19': 260, '19-20': 144, '20-21': 111, '21-22': 85, '22-23': 35, '23-24': 1}, 
{'AreaID': 'wx43zpy0d434', 'Station': 'B动物园枢纽站', 'Lng': 116.339987, 'Lat': 39.937291, '15-16': 182, '16-17': 182, '17-18': 199, '18-19': 157, '19-20': 94, '20-21': 58, '21-22': 48, '22-23': 28, '23-24': 3}, 
{'AreaID': 'wx43zpy0d434', 'Station': 'B二里沟西口', 'Lng': 116.332489, 'Lat': 39.932457, '15-16': 58, '16-17': 44, '17-18': 48, '18-19': 49, '19-20': 39, '20-21': 31, '21-22': 21, '22-23': 8, '23-24': 1}, 
{'AreaID': 'wx43zpy0d434', 'Station': 'B大柳树南站', 'Lng': 116.336931, 'Lat': 39.950317, '15-16': 85, '16-17': 99, '17-18': 78, '18-19': 56, '19-20': 44, '20-21': 35, '21-22': 38, '22-23': 22, '23-24': 1}, 
{'AreaID': 'wx43zpy0d434', 'Station': 'B大慧寺路东口', 'Lng': 116.33448, 'Lat': 39.952183, '15-16': 62, '16-17': 73, '17-18': 60, '18-19': 43, '19-20': 34, '20-21': 38, '21-22': 26, '22-23': 2, '23-24': 0}, 
{'AreaID': 'wx43zpy0d434', 'Station': 'B白石桥西', 'Lng': 116.323189, 'Lat': 39.939186, '15-16': 89, '16-17': 74, '17-18': 71, '18-19': 62, '19-20': 36, '20-21': 23, '21-22': 12, '22-23': 3, '23-24': 0}, 
{'AreaID': 'wx43zpy0d434', 'Station': 'B中央民族大学', 'Lng': 116.324371, 'Lat': 39.948238, '15-16': 474, '16-17': 469, '17-18': 433, '18-19': 363, '19-20': 261, '20-21': 186, '21-22': 108, '22-23': 26, '23-24': 0}, 
{'AreaID': 'wx43zpy0d434', 'Station': 'R二里沟', 'Lng': 116.333517, 'Lat': 39.933844, '15-16': 62, '16-17': 78, '17-18': 71, '18-19': 49, '19-20': 33, '20-21': 13, '21-22': 7, '22-23': 5, '23-24': 2}, 
{'AreaID': 'wx43zpy0d434', 'Station': 'B皂君东里', 'Lng': 116.335022, 'Lat': 39.960143, '15-16': 91, '16-17': 81, '17-18': 85, '18-19': 74, '19-20': 51, '20-21': 27, '21-22': 8, '22-23': 1, '23-24': 0},
 {'AreaID': 'wx43zpy0d434', 'Station': 'B北下关', 'Lng': 116.348282, 'Lat': 39.945061, '15-16': 109, '16-17': 113, '17-18': 102, '18-19': 100, '19-20': 84, '20-21': 46, '21-22': 35, '22-23': 14, '23-24': 0}, 
 {'AreaID': 'wx43zpy0d434', 'Station': 'B北京展览馆', 'Lng': 116.343063, 'Lat': 39.936848, '15-16': 67, '16-17': 86, '17-18': 80, '18-19': 87, '19-20': 84, '20-21': 45, '21-22': 25, '22-23': 14, '23-24': 0},
  {'AreaID': 'wx43zpy0d434', 'Station': 'B中苑宾馆', 'Lng': 116.337761, 'Lat': 39.947475, '15-16': 94, '16-17': 102, '17-18': 78, '18-19': 93, '19-20': 116, '20-21': 80, '21-22': 49, '22-23': 24, '23-24': 0}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B外文印刷厂', 'Lng': 116.322327, 'Lat': 39.93243, '15-16': 143, '16-17': 128, '17-18': 107, '18-19': 49, '19-20': 60, '20-21': 49, '21-22': 35, '22-23': 22, '23-24': 5}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B四道口东', 'Lng': 116.326889, 'Lat': 39.93235, '15-16': 150, '16-17': 131, '17-18': 118, '18-19': 94, '19-20': 78, '20-21': 76, '21-22': 62, '22-23': 20, '23-24': 0}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B大柳树北站', 'Lng': 116.33567, 'Lat': 39.953804, '15-16': 117, '16-17': 121, '17-18': 155, '18-19': 130, '19-20': 72, '20-21': 59, '21-22': 43, '22-23': 17, '23-24': 0}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B皂君庙', 'Lng': 116.340988, 'Lat': 39.957878, '15-16': 111, '16-17': 107, '17-18': 113, '18-19': 78, '19-20': 69, '20-21': 76, '21-22': 49, '22-23': 21, '23-24': 0}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B中国农业科学院南门', 'Lng': 116.327405, 'Lat': 39.957075, '15-16': 84, '16-17': 86, '17-18': 83, '18-19': 66, '19-20': 37, '20-21': 46, '21-22': 41, '22-23': 12, '23-24': 0}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B交大东路北口', 'Lng': 116.34668, 'Lat': 39.956641, '15-16': 28, '16-17': 34, '17-18': 54, '18-19': 40, '19-20': 21, '20-21': 17, '21-22': 10, '22-23': 9, '23-24': 1}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B百万庄', 'Lng': 116.333794, 'Lat': 39.931461, '15-16': 57, '16-17': 55, '17-18': 51, '18-19': 35, '19-20': 45, '20-21': 35, '21-22': 33, '22-23': 24, '23-24': 1}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B白石桥北', 'Lng': 116.325523, 'Lat': 39.940926, '15-16': 4, '16-17': 6, '17-18': 7, '18-19': 3, '19-20': 0, '20-21': 1, '21-22': 1, '22-23': 0, '23-24': 0}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B交大东路', 'Lng': 116.348557, 'Lat': 39.949921, '15-16': 22, '16-17': 49, '17-18': 50, '18-19': 18, '19-20': 15, '20-21': 14, '21-22': 14, '22-23': 8, '23-24': 1}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B中新小区', 'Lng': 116.319794, 'Lat': 39.937153, '15-16': 11, '16-17': 5, '17-18': 6, '18-19': 8, '19-20': 12, '20-21': 6, '21-22': 1, '22-23': 1, '23-24': 0}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B大慧寺路西口', 'Lng': 116.327042, 'Lat': 39.951759, '15-16': 56, '16-17': 63, '17-18': 66, '18-19': 54, '19-20': 35, '20-21': 37, '21-22': 29, '22-23': 4, '23-24': 0}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B四道口北', 'Lng': 116.325556, 'Lat': 39.933819, '15-16': 22, '16-17': 22, '17-18': 8, '18-19': 5, '19-20': 3, '20-21': 14, '21-22': 15, '22-23': 3, '23-24': 0}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B皂君庙西站', 'Lng': 116.333427, 'Lat': 39.957523, '15-16': 91, '16-17': 94, '17-18': 144, '18-19': 132, '19-20': 64, '20-21': 67, '21-22': 58, '22-23': 19, '23-24': 0}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B二里沟东口', 'Lng': 116.342438, 'Lat': 39.932381, '15-16': 125, '16-17': 135, '17-18': 150, '18-19': 120, '19-20': 103, '20-21': 116, '21-22': 114, '22-23': 52, '23-24': 9}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B大慧寺', 'Lng': 116.330383, 'Lat': 39.951946, '15-16': 45, '16-17': 33, '17-18': 53, '18-19': 51, '19-20': 29, '20-21': 37, '21-22': 25, '22-23': 5, '23-24': 1}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B郝家湾', 'Lng': 116.337463, 'Lat': 39.932472, '15-16': 37, '16-17': 41, '17-18': 34, '18-19': 30, '19-20': 28, '20-21': 34, '21-22': 27, '22-23': 9, '23-24': 1}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B皂君庙东站', 'Lng': 116.344116, 'Lat': 39.958054, '15-16': 61, '16-17': 47, '17-18': 44, '18-19': 59, '19-20': 52, '20-21': 27, '21-22': 32, '22-23': 22, '23-24': 1}, 
  {'AreaID': 'wx43zpy0d434', 'Station': 'B慈献寺桥', 'Lng': 116.341965, 'Lat': 39.947102, '15-16': 19, '16-17': 28, '17-18': 30, '18-19': 21, '19-20': 18, '20-21': 32, '21-22': 36, '22-23': 12, '23-24': 0},
  {'AreaID': 'wx4er0qnyx0n', 'Station': 'R国家图书馆', 'Lng': 116.32519, 'Lat': 39.943114, '15-16': 3107, '16-17': 3679, '17-18': 3025, '18-19': 2107, '19-20': 1499, '20-21': 1631, '21-22': 2547, '22-23': 1595, '23-24': 14}, 
  {'AreaID': 'wx4er5hv2dj8', 'Station': 'R魏公村', 'Lng': 116.323929, 'Lat': 39.952744, '15-16': 2694, '16-17': 2868, '17-18': 3181, '18-19': 2767, '19-20': 2207, '20-21': 2086, '21-22': 1345, '22-23': 433, '23-24': 25}, 
  {'AreaID': 'wx4epnws1ueb', 'Station': 'R白石桥南', 'Lng': 116.32568, 'Lat': 39.933022, '15-16': 1343, '16-17': 1661, '17-18': 1826, '18-19': 1420, '19-20': 1025, '20-21': 960, '21-22': 838, '22-23': 383, '23-24': 25},
  {'AreaID': 'wx4epx861cb4', 'Station': 'R动物园', 'Lng': 116.339031, 'Lat': 39.93825, '15-16': 5991, '16-17': 6521, '17-18': 5093, '18-19': 2673, '19-20': 1156, '20-21': 792, '21-22': 895, '22-23': 562, '23-24': 13}];
var map;
var addedSrcId = [];
var addedLayerId = [];
var source_data = new Array();//道路数据
var timelineChart;
var graphChart;
var node_color = {};
var cur_time = 0;
var cur_loc = 'DZM';
var flowdata = [];
var view;
var pointLayer;
var trafficIndex = [];
$(function () {


    loadMap();

    loadPoly();
    addTrafficIndex();
   
    addStations(bmode1_in1);
    addVenue();
    $.when({ testing: 123 }).done(
        function (x) {

            myChart = echarts.init(document.getElementById('trafficRank'));
            var updateFrequency = 2000;
            var dimension = 0;

            //var countryColors = {"Australia":"#00008b","Canada":"#f00","China":"#ffde00","Cuba":"#002a8f","Finland":"#003580","France":"#ed2939","Germany":"#000","Iceland":"#003897","India":"#f93","Japan":"#bc002d","North Korea":"#024fa2","South Korea":"#000","New Zealand":"#00247d","Norway":"#ef2b2d","Poland":"#dc143c","Russia":"#d52b1e","Turkey":"#e30a17","United Kingdom":"#00247d","United States":"#b22234"};


            //var flags = res0[0];
            //var data = res1[0];
            var flags = [{ code: "AD", emoji: "🇦🇩", unicode: "U+1F1E6 U+1F1E9", name: "Andorra", title: "flag for Andorra" },
            { code: "AE", emoji: "🇦🇪", unicode: "U+1F1E6 U+1F1EA", name: "United Arab Emirates", title: "flag for United Arab Emirates" },
            { code: "AF", emoji: "🇦🇫", unicode: "U+1F1E6 U+1F1EB", name: "Afghanistan", title: "flag for Afghanistan" }];

            var data = [["Income", "Life Expectancy", "Population", "Country", "Year"],
            [815, 34.05, 351014, "Australia", 1800], [1314, 39, 645526, "Canada", 1800],
            [1400, 39.01496774, 727603, "Canada", 1810],
            [1491, 39.02993548, 879432, "Canada", 1820],
            [1651, 39.04490323, 1202146, "Canada", 1830],
            [985, 32, 321675013, "China", 1800], [864, 32.2, 345043, "Cuba", 1800]];

            var years = [];
            for (var i = 0; i < data.length; ++i) {
                if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
                    years.push(data[i][4]);
                }
            }

            function getFlag(countryName) {
                if (!countryName) {
                    return '';
                }
                return (flags.find(function (item) {
                    return item.name === countryName;
                }) || {}).emoji;
            }
            var startIndex = 10;
            var startYear = years[startIndex];

            var option = {
                grid: {
                    top: 10,
                    bottom: 30,
                    left: 150,
                    right: 80
                },
                xAxis: {
                    max: 'dataMax',
                    label: {
                        formatter: function (n) {
                            return Math.round(n);
                        }
                    }
                },
                dataset: {
                    source: data.slice(1).filter(function (d) {
                        return d[4] === startYear;
                    })
                },
                yAxis: {
                    type: 'category',
                    inverse: true,
                    max: 10,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            fontSize: 14
                        },
                        formatter: function (value) {
                            return value + '{flag|' + getFlag(value) + '}';
                        },
                        rich: {
                            flag: {
                                fontSize: 25,
                                padding: 5
                            }
                        }
                    },
                    animationDuration: 300,
                    animationDurationUpdate: 300
                },
                series: [{
                    realtimeSort: true,
                    seriesLayoutBy: 'column',
                    type: 'bar',
                    itemStyle: {
                        color: function (param) {
                            return countryColors[param.value[3]] || '#5470c6';
                        }
                    },
                    encode: {
                        x: dimension,
                        y: 3
                    },
                    label: {
                        show: true,
                        precision: 1,
                        position: 'right',
                        valueAnimation: true,
                        fontFamily: 'monospace'
                    }
                }],
                // Disable init animation.
                animationDuration: 0,
                animationDurationUpdate: updateFrequency,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear',
                graphic: {
                    elements: [{
                        type: 'text',
                        right: 160,
                        bottom: 60,
                        style: {
                            text: startYear,
                            font: 'bolder 80px monospace',
                            fill: 'rgba(100, 100, 100, 0.25)'
                        },
                        z: 100
                    }]
                }
            };

            // console.log(option);
            myChart.setOption(option);

            for (var i = startIndex; i < years.length - 1; ++i) {
                (function (i) {
                    setTimeout(function () {
                        updateYear(years[i + 1]);
                    }, (i - startIndex) * updateFrequency);
                })(i);
                console.log("动态图表测试！")
            }

            function updateYear(year) {
                var source = data.slice(1).filter(function (d) {
                    return d[4] === year;
                });
                option.series[0].data = source;
                option.graphic.elements[0].style.text = year;
                myChart.setOption(option);
            }



        } /* alerts "123" */
    );
    showTrafficRank();

});
function loadMap() {
    map = new BMapGL.Map("map");
    map.centerAndZoom(new BMapGL.Point(116.304145,39.941939), 15);
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    map.setDisplayOptions({
        poiText: false,  // 隐藏poi标注
        //poiIcon: false,  // 隐藏poi图标
        //building: false  // 隐藏楼块
    });
    map.setMapStyleV2({
        styleId: 'f93e20266be1e44e35abd488256458fe'
    });
    map.setTrafficOn(); // 叠加路况图层

}

// 自定义canvas
function getTextureCanvas() {
    var textureCanvas = document.createElement('canvas');
    textureCanvas.width = textureCanvas.height = 200;
    var ctx = textureCanvas.getContext('2d');
    ctx.fillStyle = '#79a913';
    ctx.strokeStyle = '#79a913';
    ctx.fillOpacity = 0.9;
    ctx.lineWidth = 6;
    ctx.lineCap = 'square';
    ctx.fillRect(0, 0, 200, 200);
    ctx.moveTo(50, 50);
    ctx.lineTo(150, 50);
    ctx.lineTo(150, 150);
    ctx.lineTo(50, 150);
    ctx.lineTo(50, 50);
    ctx.stroke();
    return textureCanvas;
}
//添加场馆
function addVenue() {

    var pStart = new BMapGL.Point(116.332298,39.944629);
    var pEnd = new BMapGL.Point(116.335756,39.947671);
    var bounds = new BMapGL.Bounds(new BMapGL.Point(pStart.lng, pEnd.lat), new BMapGL.Point(pEnd.lng, pStart.lat));
    var canvasOverlay = new BMapGL.GroundOverlay(bounds, {
        type: 'canvas',
        url: getTextureCanvas(),
        opacity: 0.9
    });
    map.addOverlay(canvasOverlay);

    // 添加文本标注
    var opts = {
        position: new BMapGL.Point(116.333789,39.944248),
        offset: new BMapGL.Size(-93, -55)
    };
    var label = new BMapGL.Label('首都体育馆', opts);
    label.setStyle({
        color: '#fff',
        borderRadius: '5px',
        borderColor: '#fff',
        backgroundColor: '#79a913',
        fontSize: '20px',
        height: '40px',
        lineHeight: '35px',
        maxWidth: "none",

    });
    //label.setZIndex(zIndex:1);
    map.addOverlay(label);

}

function loadPoly() {
    // 根据出入流量显示不同颜色
    //>5000红色；>1000黄色；>500蓝色；>100粉色；其余是绿色
    var region_o1 = [];
    var region_o2 = [];
    var region_o3 = [];
    var region_o4 = [];
    var region_o5 = [];
    var trafficIndexSum = 0.0;
    var regionWithTrafficIndex = bregion_model;

    var polyColor = [];
    //计算交通指数总和
    for (var i = 0; i < bregion_model.length; i++) {
        trafficIndexSum = trafficIndexSum + Math.abs(bregion_model[i]["NetFlow"]);
    }
    //计算每个区域的交通指数
    for (var i = 0; i < bregion_model.length; i++) {
        var temp;
        temp = 5 * (Math.abs(bregion_model[i]["NetFlow"])) / (trafficIndexSum * 1.0);
        trafficIndex.push(temp.toFixed(2));
    }
    //为每个多边形添加交通指数属性
    for (var i = 0; i < bregion_model.length; i++) {
        regionWithTrafficIndex[i]['trafficIndex'] = trafficIndex[i];
        if (trafficIndex[i] >= 0.5) {
            polyColor.push('#FF0000');
        }
        else if (trafficIndex[i] >= 0.1) {
            polyColor.push('#FFA500');
        }
        else {
            polyColor.push('#00FF7F');
        }
    }
    //console.log(trafficIndex);
    //console.log(polyColor);

    //绘制多边形区域
    var polygon;
    for (var i = 0; i < regionWithTrafficIndex.length; i++) {
        var lines = [];
        //根据交通指数分别绘制多边形
        for (var j = 0; j < regionWithTrafficIndex[i]["poly"].length; j++) {
            lines.push(new BMapGL.Point(regionWithTrafficIndex[i]["poly"][j][0], regionWithTrafficIndex[i]["poly"][j][1]));
        }
        polygon = new BMapGL.Polygon(lines, {
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
            strokeOpacity: 0.5,
            fillColor: polyColor[i]
        });
        map.addOverlay(polygon);

    }
}
//获取多边形的中心点
function getCenterPoint(path) {
    //var path =e.;//Array<Point> 返回多边型的点数组
    //var ret=parseFloat(num1)+parseFloat(num2);
    //console.log(path);
    var x = 0.0;
    var y = 0.0;
    for (var i = 0; i < path.length; i++) {
        x = x + parseFloat(path[i][0]);
        y = y + parseFloat(path[i][1]);
    }
    x = x / path.length;
    y = y / path.length;

    //return new BMap.Point(path[0].lng,path[0].lat);
    return new BMapGL.Point(x, y);
    //return path[0];
}

//添加每个区域的交通指数
function addTrafficIndex() {
    for (var i = 0; i < bregion_model.length; i++) {

        var point = getCenterPoint(bregion_model[i]["poly"]);

        var opts = {
            position: point,    // 指定文本标注所在的地理位置    
            offset: new BMapGL.Size(0, 0)    //设置文本偏移量    
        }
        var label = new BMapGL.Label(trafficIndex[i], opts);  // 创建文本标注对象    
        label.setStyle({
            color: "BLUE",
            fontSize: "16px",
            height: "20px",
            lineHeight: "20px",
            fontFamily: "微软雅黑",
            maxWidth: "none",
            backgroundColor: "0.000000000001",
            border: "0"
        });
        map.addOverlay(label);

    }


}



function addStations(stations) {
    //console.log(stations);
    //处理数据
    var flowdata = [];

    for (var i = 0; i < stations.length; i++) {
        var temp = [];
        temp.push(stations[i]['AreaID']);
        temp.push(stations[i]['Station']);
        temp.push(parseFloat(stations[i]['Lng']));
        temp.push(parseFloat(stations[i]['Lat']));
        flowdata.push(temp);
    }


    console.log(flowdata);
    //添加公交站点信息窗口和公交站点标识
    for (var p = 0; p < flowdata.length; p++) {

        var opts = {
            position: new BMapGL.Point(flowdata[p][2], flowdata[p][3]), // 指定文本标注所在的地理位置
            offset: new BMapGL.Size(10, -30) // 设置文本偏移量
        };
        // 创建文本标注对象
        var str;
        if (flowdata[p][1].substr(0, 1) == 'B') {
            str = flowdata[p][1].substr(1, flowdata[p][1].length - 1) + "公交站"
        }
        if (flowdata[p][1].substr(0, 1) == 'R') {
            str = flowdata[p][1].substr(1, flowdata[p][1].length - 1) + "地铁站"
        }
        var marker = new BMapGL.Marker(new BMapGL.Point(flowdata[p][2], flowdata[p][3]));
        map.addOverlay(marker);
        var label = new BMapGL.Label(str, opts);  // 创建文本标注对象
        label.setStyle({
            color: "black",
            fontSize: "10px",
            height: "15px",
            lineHeight: "12px",
            fontFamily: "微软雅黑",
            backgroundColor: "white", //文本标注背景颜色　
            maxWidth: "none",
            border: "0"
        });
        map.addOverlay(label);
    }

}
//客流量动态排序
function showTrafficRank() {
    myChart = echarts.init(document.getElementById('trafficRank'));
    var updateFrequency = 2000;
    var dimension = 0;

    //var countryColors = {"Australia":"#00008b","Canada":"#f00","China":"#ffde00","Cuba":"#002a8f","Finland":"#003580","France":"#ed2939","Germany":"#000","Iceland":"#003897","India":"#f93","Japan":"#bc002d","North Korea":"#024fa2","South Korea":"#000","New Zealand":"#00247d","Norway":"#ef2b2d","Poland":"#dc143c","Russia":"#d52b1e","Turkey":"#e30a17","United Kingdom":"#00247d","United States":"#b22234"};


    //var flags = res0[0];
    //var data = res1[0];
    var flags = [{ code: "AD", emoji: "🇦🇩", unicode: "U+1F1E6 U+1F1E9", name: "Andorra", title: "flag for Andorra" },
    { code: "AE", emoji: "🇦🇪", unicode: "U+1F1E6 U+1F1EA", name: "United Arab Emirates", title: "flag for United Arab Emirates" },
    { code: "AF", emoji: "🇦🇫", unicode: "U+1F1E6 U+1F1EB", name: "Afghanistan", title: "flag for Afghanistan" }];

    var data = [["Income", "Life Expectancy", "Population", "Country", "Year"],
    [815, 34.05, 351014, "Australia", 1800], [1314, 39, 645526, "Canada", 1800],
    [985, 32, 321675013, "China", 1800], [864, 32.2, 345043, "Cuba", 1800]];

    var years = [];
    for (var i = 0; i < data.length; ++i) {
        if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
            years.push(data[i][4]);
        }
    }

    function getFlag(countryName) {
        if (!countryName) {
            return '';
        }
        return (flags.find(function (item) {
            return item.name === countryName;
        }) || {}).emoji;
    }
    var startIndex = 10;
    var startYear = years[startIndex];

    var option = {
        grid: {
            top: 10,
            bottom: 30,
            left: 150,
            right: 80
        },
        xAxis: {
            max: 'dataMax',
            label: {
                formatter: function (n) {
                    return Math.round(n);
                }
            }
        },
        dataset: {
            source: data.slice(1).filter(function (d) {
                return d[4] === startYear;
            })
        },
        yAxis: {
            type: 'category',
            inverse: true,
            max: 10,
            axisLabel: {
                show: true,
                textStyle: {
                    fontSize: 14
                },
                formatter: function (value) {
                    return value + '{flag|' + getFlag(value) + '}';
                },
                rich: {
                    flag: {
                        fontSize: 25,
                        padding: 5
                    }
                }
            },
            animationDuration: 300,
            animationDurationUpdate: 300
        },
        series: [{
            realtimeSort: true,
            seriesLayoutBy: 'column',
            type: 'bar',
            itemStyle: {
                color: function (param) {
                    return countryColors[param.value[3]] || '#5470c6';
                }
            },
            encode: {
                x: dimension,
                y: 3
            },
            label: {
                show: true,
                precision: 1,
                position: 'right',
                valueAnimation: true,
                fontFamily: 'monospace'
            }
        }],
        // Disable init animation.
        animationDuration: 0,
        animationDurationUpdate: updateFrequency,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        graphic: {
            elements: [{
                type: 'text',
                right: 160,
                bottom: 60,
                style: {
                    text: startYear,
                    font: 'bolder 80px monospace',
                    fill: 'rgba(100, 100, 100, 0.25)'
                },
                z: 100
            }]
        }
    };

    // console.log(option);
    myChart.setOption(option);

    for (var i = startIndex; i < years.length - 1; ++i) {
        (function (i) {
            setTimeout(function () {
                updateYear(years[i + 1]);
            }, (i - startIndex) * updateFrequency);
        })(i);
        console.log("动态图表测试！")
    }

    function updateYear(year) {
        var source = data.slice(1).filter(function (d) {
            return d[4] === year;
        });
        option.series[0].data = source;
        option.graphic.elements[0].style.text = year;
        myChart.setOption(option);
    }



}













