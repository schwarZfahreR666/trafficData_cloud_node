//全局变量
//大型赛事活动模式一站点
var bregion_model = [
    { 'ID': 'wx4en40f8uv4', 'poly': [[116.29071366194508, 39.895744423956714], [116.28812382099237, 39.89301267976936], [116.27040261741118, 39.89213260956423], [116.27017206758823, 39.89224443164736], [116.26970792979675, 39.92450968756305], [116.27256484949758, 39.92726484591476], [116.28992495927498, 39.925518529069656], [116.29080111271507, 39.924189446349736]], 'FlowOut': 186664, 'FlowIn': 191598, 'NetFlow': 4934 },
    // { 'ID': 'wx43zpy0d434', 'poly': [[116.01029050620384, 39.74505316683623], [116.39484103631311, 39.94821444648131], [112.32478714935269, 41.579087550375625], [115.72052364218798, 40.05171120106658], [116.02703047048668, 39.82246724450009], [116.02088478261703, 39.777462626899066]], 'FlowOut': 108062, 'FlowIn': 104818, 'NetFlow': -3244 },
    { 'ID': 'wx4en6pfm8zm', 'poly': [[116.30312023591368, 39.89942269557345], [116.3087037313496, 39.90830159769706], [116.30890545476817, 39.92044099697474], [116.29080111271507, 39.924189446349736], [116.29071366194508, 39.895744423956714]], 'FlowOut': 69118, 'FlowIn': 68464, 'NetFlow': -654 },
    // { 'ID': 'wx4enf50bcdw', 'poly': [[116.3221216847341, 39.908916165806744], [116.3087037313496, 39.90830159769706], [116.30890545476817, 39.92044099697474], [116.31633171356452, 39.92590850203748], [116.32004313480327, 39.92579542182965], [116.32242873603758, 39.92343453196869]], 'FlowOut': 59442, 'FlowIn': 58798, 'NetFlow': -644 },
    // { 'ID': 'wx4ep1grr7fn', 'poly': [[116.32377546107116, 39.906943151772396], [116.3221216847341, 39.908916165806744], [116.32242873603758, 39.92343453196869], [116.33618634167766, 39.91980189901589], [116.336030938472, 39.906721413139756]], 'FlowOut': 80014, 'FlowIn': 78882, 'NetFlow': -1132 },
    { 'ID': 'wx4ejd12zs80', 'poly': [[116.25129372771643, 39.89215384584934], [116.25075641132976, 39.92452179508169], [116.26970792979675, 39.92450968756305], [116.27017206758823, 39.89224443164736]], 'FlowOut': 113396, 'FlowIn': 109900, 'NetFlow': -3496 },
    // { 'ID': 'wx4enwb2myud', 'poly': [[116.30930951983466, 39.93622183571591], [116.29260777694857, 39.93178361332599], [116.29217672281676, 39.94584570219037], [116.3102086486841, 39.9478711259911]], 'FlowOut': 38312, 'FlowIn': 35608, 'NetFlow': -2704 },
    { 'ID': 'wx4enndt5f6t', 'poly': [[116.29260777694857, 39.93178361332599], [116.28992495927498, 39.925518529069656], [116.27256484949758, 39.92726484591476], [116.26747627936885, 39.962763396582346], [116.26852805094207, 39.963368081496355], [116.28082323614709, 39.9587337568098], [116.29217672281676, 39.94584570219037]], 'FlowOut': 125380, 'FlowIn': 114302, 'NetFlow': -11078 },
    { 'ID': 'wx4ejw13ry48', 'poly': [[116.25075641132976, 39.92452179508169], [116.24577850939471, 39.92827665303373], [116.2490519511753, 39.96109836253883], [116.26747627936885, 39.962763396582346], [116.27256484949758, 39.92726484591476], [116.26970792979675, 39.92450968756305]], 'FlowOut': 6200, 'FlowIn': 6748, 'NetFlow': 548 },
    // { 'ID': 'wx4enb72g4ft', 'poly': [[116.32142851033664, 39.89927314998531], [116.31248884598114, 39.89536689426349], [116.30312023591368, 39.89942269557345], [116.3087037313496, 39.90830159769706], [116.3221216847341, 39.908916165806744], [116.32377546107116, 39.906943151772396]], 'FlowOut': 38048, 'FlowIn': 31680, 'NetFlow': -6368 },
    // { 'ID': 'wx4ensfr4xwv', 'poly': [[116.30890545476817, 39.92044099697474], [116.31633171356452, 39.92590850203748], [116.30930951983466, 39.93622183571591], [116.29260777694857, 39.93178361332599], [116.28992495927498, 39.925518529069656], [116.29080111271507, 39.924189446349736]], 'FlowOut': 92032, 'FlowIn': 80498, 'NetFlow': -11534 }
];




bmode1_in1 = [
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B万寿庄', 'Lng': 116.29596422334176, 'Lat': 39.91915483590961, '15-16': 9, '16-17': 12, '17-18': 15, '18-19': 22, '19-20': 22, '20-21': 9, '21-22': 3, '22-23': 3, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B万寿庄西', 'Lng': 116.29093386408023, 'Lat': 39.919194899467286, '15-16': 25, '16-17': 22, '17-18': 20, '18-19': 14, '19-20': 29, '20-21': 30, '21-22': 8, '22-23': 2, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B万寿路口西', 'Lng': 116.29983553720946, 'Lat': 39.91367361600812, '15-16': 150, '16-17': 200, '17-18': 231, '18-19': 184, '19-20': 109, '20-21': 104, '21-22': 81, '22-23': 11, '23-24': 2 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B东翠路口', 'Lng': 116.29401846827753, 'Lat': 39.91383185984961, '15-16': 135, '16-17': 171, '17-18': 186, '18-19': 150, '19-20': 112, '20-21': 74, '21-22': 51, '22-23': 31, '23-24': 9 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B五棵松桥东', 'Lng': 116.28438877025637, 'Lat': 39.91375049644393, '15-16': 199, '16-17': 234, '17-18': 227, '18-19': 162, '19-20': 110, '20-21': 121, '21-22': 99, '22-23': 44, '23-24': 11 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B五棵松桥北', 'Lng': 116.28067703132857, 'Lat': 39.915269473119444, '15-16': 274, '16-17': 280, '17-18': 364, '18-19': 304, '19-20': 166, '20-21': 112, '21-22': 36, '22-23': 2, '23-24': 0 }, { 'AreaID': 'wx43zpy0d434', 'Station': 'B五棵松桥南', 'Lng': 116.28072432344378, 'Lat': 39.912673526667824, '15-16': 216, '16-17': 238, '17-18': 307, '18-19': 272, '19-20': 134, '20-21': 53, '21-22': 47, '22-23': 30, '23-24': 4 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B五棵松桥西', 'Lng': 116.27957964900911, 'Lat': 39.913715485428774, '15-16': 43, '16-17': 72, '17-18': 74, '18-19': 42, '19-20': 20, '20-21': 31, '21-22': 21, '22-23': 0, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B北太平路东口', 'Lng': 116.27385746894687, 'Lat': 39.91006095487206, '15-16': 52, '16-17': 48, '17-18': 43, '18-19': 26, '19-20': 27, '20-21': 34, '21-22': 17, '22-23': 5, '23-24': 0 }, { 'AreaID': 'wx43zpy0d434', 'Station': 'B北沙沟', 'Lng': 116.28979591310637, 'Lat': 39.92425900485057, '15-16': 42, '16-17': 53, '17-18': 73, '18-19': 79, '19-20': 58, '20-21': 16, '21-22': 39, '22-23': 50, '23-24': 13 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B定慧桥南', 'Lng': 116.2819093832214, 'Lat': 39.927891500400044, '15-16': 256, '16-17': 321, '17-18': 416, '18-19': 377, '19-20': 244, '20-21': 161, '21-22': 104, '22-23': 38, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B永定路口东', 'Lng': 116.27204541256646, 'Lat': 39.913646309977345, '15-16': 295, '16-17': 408, '17-18': 409, '18-19': 327, '19-20': 293, '20-21': 198, '21-22': 117, '22-23': 54, '23-24': 6 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B永定路口北', 'Lng': 116.27109458872644, 'Lat': 39.91588041916751, '15-16': 98, '16-17': 128, '17-18': 167, '18-19': 146, '19-20': 88, '20-21': 56, '21-22': 38, '22-23': 12, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B永定路口南', 'Lng': 116.27105249904614, 'Lat': 39.91182608304334, '15-16': 117, '16-17': 114, '17-18': 135, '18-19': 148, '19-20': 92, '20-21': 51, '21-22': 43, '22-23': 16, '23-24': 5 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B沙沟路口东', 'Lng': 116.29157151789498, 'Lat': 39.91374657685537, '15-16': 92, '16-17': 121, '17-18': 161, '18-19': 128, '19-20': 50, '20-21': 20, '21-22': 18, '22-23': 11, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B沙沟路口北', 'Lng': 116.28969629495678, 'Lat': 39.9179198764393, '15-16': 17, '16-17': 46, '17-18': 69, '18-19': 38, '19-20': 18, '20-21': 17, '21-22': 8, '22-23': 2, '23-24': 2 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B沙沟路口西', 'Lng': 116.28834876098377, 'Lat': 39.91375352629281, '15-16': 41, '16-17': 98, '17-18': 109, '18-19': 52, '19-20': 38, '20-21': 22, '21-22': 12, '22-23': 7, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B沙窝桥东', 'Lng': 116.28164472521865, 'Lat': 39.90658005970777, '15-16': 108, '16-17': 163, '17-18': 189, '18-19': 124, '19-20': 90, '20-21': 76, '21-22': 49, '22-23': 24, '23-24': 3 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B沙窝桥北', 'Lng': 116.28070281226233, 'Lat': 39.908090907535076, '15-16': 155, '16-17': 205, '17-18': 260, '18-19': 224, '19-20': 133, '20-21': 70, '21-22': 38, '22-23': 17, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B沙窝桥西', 'Lng': 116.27869066204863, 'Lat': 39.90655477676362, '15-16': 49, '16-17': 84, '17-18': 115, '18-19': 89, '19-20': 48, '20-21': 29, '21-22': 18, '22-23': 3, '23-24': 0 },
    { 'AreaID': 'wx4ejw13ry48', 'Station': 'R田村', 'Lng': 116.25937688493883, 'Lat': 39.93554951154278, '15-16': 157, '16-17': 193, '17-18': 281, '18-19': 308, '19-20': 225, '20-21': 146, '21-22': 119, '22-23': 65, '23-24': 3 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B西翠路口东', 'Lng': 116.29352030179032, 'Lat': 39.906573733537634, '15-16': 64, '16-17': 86, '17-18': 117, '18-19': 99, '19-20': 53, '20-21': 25, '21-22': 33, '22-23': 23, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B西翠路口北', 'Lng': 116.28969107587908, 'Lat': 39.90736727582161, '15-16': 3, '16-17': 23, '17-18': 58, '18-19': 42, '19-20': 8, '20-21': 11, '21-22': 8, '22-23': 3, '23-24': 2 }, { 'AreaID': 'wx43zpy0d434', 'Station': 'B西翠路口西', 'Lng': 116.28712616526019, 'Lat': 39.90657549882319, '15-16': 50, '16-17': 51, '17-18': 40, '18-19': 36, '19-20': 37, '20-21': 23, '21-22': 6, '22-23': 1, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B金沟河', 'Lng': 116.2808605522285, 'Lat': 39.923241378826155, '15-16': 193, '16-17': 194, '17-18': 283, '18-19': 254, '19-20': 149, '20-21': 94, '21-22': 37, '22-23': 11, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B金沟河东路', 'Lng': 116.2877144693706, 'Lat': 39.923956798656064, '15-16': 29, '16-17': 13, '17-18': 30, '18-19': 21, '19-20': 2, '20-21': 0, '21-22': 1, '22-23': 2, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B金沟河桥南', 'Lng': 116.28093969860848, 'Lat': 39.91994655725097, '15-16': 32, '16-17': 32, '17-18': 41, '18-19': 47, '19-20': 31, '20-21': 15, '21-22': 3, '22-23': 1, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B金沟河路', 'Lng': 116.27443185478224, 'Lat': 39.923933475432456, '15-16': 54, '16-17': 63, '17-18': 78, '18-19': 63, '19-20': 46, '20-21': 43, '21-22': 24, '22-23': 6, '23-24': 2 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B金沟河路东口', 'Lng': 116.2798101060646, 'Lat': 39.9240442350266, '15-16': 55, '16-17': 72, '17-18': 81, '18-19': 82, '19-20': 82, '20-21': 56, '21-22': 23, '22-23': 9, '23-24': 2 }
];
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
    map.centerAndZoom(new BMapGL.Point(116.259873, 39.910456), 15);
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

    var pStart = new BMapGL.Point(116.274197, 39.912984);
    var pEnd = new BMapGL.Point(116.283317, 39.908129);
    var bounds = new BMapGL.Bounds(new BMapGL.Point(pStart.lng, pEnd.lat), new BMapGL.Point(pEnd.lng, pStart.lat));
    var canvasOverlay = new BMapGL.GroundOverlay(bounds, {
        type: 'canvas',
        url: getTextureCanvas(),
        opacity: 0.9
    });
    map.addOverlay(canvasOverlay);

    // 添加文本标注
    var opts = {
        position: new BMapGL.Point(116.280785, 39.911182),
        offset: new BMapGL.Size(-93, -55)
    };
    var label = new BMapGL.Label('五棵松体育馆', opts);
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













