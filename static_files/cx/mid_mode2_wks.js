//全局变量
var map;
var addedSrcId = [];
var addedLayerId = [];
var source_data = new Array();//道路数据
var timelineChart;
var graphChart;
var node_color = {};
var cur_time = 0;
var cur_loc = 'DZM';
var view;
var pointLayer;
var region_mode2;
var mode2_in;
var mode2_out;

var text1 = $("#area option:selected").text();
var text2 = $("#scale option:selected").text();
var text3 = $("#mode option:selected").text();

//大型活动模式一入客流
region_mode2 = [
    { 'ID': 'wx4en40f8uv4', 'poly': [[116.29071366194508, 39.895744423956714], [116.28812382099237, 39.89301267976936], [116.27040261741118, 39.89213260956423], [116.27017206758823, 39.89224443164736], [116.26970792979675, 39.92450968756305], [116.27256484949758, 39.92726484591476], [116.28992495927498, 39.925518529069656], [116.29080111271507, 39.924189446349736]], 'FlowOut': 186664, 'FlowIn': 191598, 'NetFlow': 4934 },
    // { 'ID': 'wx43zpy0d434', 'poly': [[116.01029050620384, 39.74505316683623], [116.39484103631311, 39.94821444648131], [112.32478714935269, 41.579087550375625], [115.72052364218798, 40.05171120106658], [116.02703047048668, 39.82246724450009], [116.02088478261703, 39.777462626899066]], 'FlowOut': 108062, 'FlowIn': 104818, 'NetFlow': -3244 },
    // { 'ID': 'wx4en6pfm8zm', 'poly': [[116.30312023591368, 39.89942269557345], [116.3087037313496, 39.90830159769706], [116.30890545476817, 39.92044099697474], [116.29080111271507, 39.924189446349736], [116.29071366194508, 39.895744423956714]], 'FlowOut': 69118, 'FlowIn': 68464, 'NetFlow': -654 },
    // { 'ID': 'wx4enf50bcdw', 'poly': [[116.3221216847341, 39.908916165806744], [116.3087037313496, 39.90830159769706], [116.30890545476817, 39.92044099697474], [116.31633171356452, 39.92590850203748], [116.32004313480327, 39.92579542182965], [116.32242873603758, 39.92343453196869]], 'FlowOut': 59442, 'FlowIn': 58798, 'NetFlow': -644 },
    // { 'ID': 'wx4ep1grr7fn', 'poly': [[116.32377546107116, 39.906943151772396], [116.3221216847341, 39.908916165806744], [116.32242873603758, 39.92343453196869], [116.33618634167766, 39.91980189901589], [116.336030938472, 39.906721413139756]], 'FlowOut': 80014, 'FlowIn': 78882, 'NetFlow': -1132 },
    { 'ID': 'wx4ejd12zs80', 'poly': [[116.25129372771643, 39.89215384584934], [116.25075641132976, 39.92452179508169], [116.26970792979675, 39.92450968756305], [116.27017206758823, 39.89224443164736]], 'FlowOut': 113396, 'FlowIn': 109900, 'NetFlow': -3496 },
    // { 'ID': 'wx4enwb2myud', 'poly': [[116.30930951983466, 39.93622183571591], [116.29260777694857, 39.93178361332599], [116.29217672281676, 39.94584570219037], [116.3102086486841, 39.9478711259911]], 'FlowOut': 38312, 'FlowIn': 35608, 'NetFlow': -2704 },
    { 'ID': 'wx4enndt5f6t', 'poly': [[116.29260777694857, 39.93178361332599], [116.28992495927498, 39.925518529069656], [116.27256484949758, 39.92726484591476], [116.26747627936885, 39.962763396582346], [116.26852805094207, 39.963368081496355], [116.28082323614709, 39.9587337568098], [116.29217672281676, 39.94584570219037]], 'FlowOut': 125380, 'FlowIn': 114302, 'NetFlow': -11078 },
    // { 'ID': 'wx4ejw13ry48', 'poly': [[116.25075641132976, 39.92452179508169], [116.24577850939471, 39.92827665303373], [116.2490519511753, 39.96109836253883], [116.26747627936885, 39.962763396582346], [116.27256484949758, 39.92726484591476], [116.26970792979675, 39.92450968756305]], 'FlowOut': 6200, 'FlowIn': 6748, 'NetFlow': 548 },
    // { 'ID': 'wx4enb72g4ft', 'poly': [[116.32142851033664, 39.89927314998531], [116.31248884598114, 39.89536689426349], [116.30312023591368, 39.89942269557345], [116.3087037313496, 39.90830159769706], [116.3221216847341, 39.908916165806744], [116.32377546107116, 39.906943151772396]], 'FlowOut': 38048, 'FlowIn': 31680, 'NetFlow': -6368 },
    // { 'ID': 'wx4ensfr4xwv', 'poly': [[116.30890545476817, 39.92044099697474], [116.31633171356452, 39.92590850203748], [116.30930951983466, 39.93622183571591], [116.29260777694857, 39.93178361332599], [116.28992495927498, 39.925518529069656], [116.29080111271507, 39.924189446349736]], 'FlowOut': 92032, 'FlowIn': 80498, 'NetFlow': -11534 }
];

mode2_in = [{ 'AreaID': 'wx4en40f8uv4', 'Station': 'R五棵松', 'Lng': 116.28036596313514, 'Lat': 39.91378520497797, '15-16': 2340, '16-17': 3575, '17-18': 6257, '18-19': 7112, '19-20': 4278, '20-21': 1802, '21-22': 1433, '22-23': 875, '23-24': 206 }, { 'AreaID': 'wx4enndt5f6t', 'Station': 'R海淀五路居', 'Lng': 116.2828944297655, 'Lat': 39.93892065413468, '15-16': 2364, '16-17': 3678, '17-18': 6451, '18-19': 7035, '19-20': 4574, '20-21': 2821, '21-22': 2292, '22-23': 1410, '23-24': 327 }, { 'AreaID': 'wx4ejd12zs80', 'Station': 'R玉泉路', 'Lng': 116.25936278739741, 'Lat': 39.91348307293766, '15-16': 2220, '16-17': 3873, '17-18': 6228, '18-19': 6328, '19-20': 3997, '20-21': 2445, '21-22': 2047, '22-23': 1201, '23-24': 252 }];

mode2_out = [{ 'AreaID': 'wx4en40f8uv4', 'Station': 'R五棵松', 'Lng': 116.28036596313514, 'Lat': 39.91378520497797, '15-16': 3003, '16-17': 4236, '17-18': 4796, '18-19': 3391, '19-20': 2033, '20-21': 2056, '21-22': 3653, '22-23': 2546, '23-24': 54 }, { 'AreaID': 'wx4enndt5f6t', 'Station': 'R海淀五路居', 'Lng': 116.2828944297655, 'Lat': 39.93892065413468, '15-16': 2647, '16-17': 4666, '17-18': 6386, '18-19': 4540, '19-20': 2161, '20-21': 1306, '21-22': 755, '22-23': 257, '23-24': 8 }, { 'AreaID': 'wx4ejd12zs80', 'Station': 'R玉泉路', 'Lng': 116.25936278739741, 'Lat': 39.91348307293766, '15-16': 1616, '16-17': 2804, '17-18': 3466, '18-19': 2218, '19-20': 1136, '20-21': 887, '21-22': 540, '22-23': 156, '23-24': 11 }];

function areaChange() {
    var text1 = $("#area option:selected").text();
    console.log(text1);
}
function scaleChange() {
    var text2 = $("#scale option:selected").text();
    console.log(text2);
}
function modeChange() {
    var text3 = $("#mode option:selected").text();
    console.log(text3);
}
var datamode1 = [];
var time = ['15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-24'];
var color = ['rgb(255,0,0', 'rgb(255,165,0)', 'rgb(0,255,127)', 'rgb(0,0,255)', 'rgb(100,149,237)'];

//计算开场、比赛中和散场后的客流
function prepareData() {
    //开场前
    for (var t = 0; t < 4; t++) {
        var data = [];
        for (var i = 0; i < mode2_in.length; i++) {
            var temp = [];
            temp.push(mode2_in[i]['AreaID']);
            temp.push(mode2_in[i]['Station']);
            temp.push(parseFloat(mode2_in[i]['Lng']));
            temp.push(parseFloat(mode2_in[i]['Lat']));
            temp.push(parseInt(mode2_in[i][time[t]]));

            data.push(temp);

        }
        datamode1.push(data);
    }
    //比赛期间
    for (var t = 4; t < 7; t++) {
        var data = [];
        for (var i = 0; i < mode2_in.length; i++) {
            var temp = [];
            temp.push(mode2_in[i]['AreaID']);
            temp.push(mode2_in[i]['Station']);
            temp.push(parseFloat(mode2_in[i]['Lng']));
            temp.push(parseFloat(mode2_in[i]['Lat']));
            console.log(i);
            console.log(mode2_in[i][time[t]]);
            console.log(mode2_out[i][time[t]]);
            temp.push(parseInt(mode2_in[i][time[t]]) - parseInt(mode2_out[i][time[t]]));

            data.push(temp);

        }
        datamode1.push(data);
    }
    //散场后
    for (var t = 7; t < 9; t++) {
        var data = [];
        for (var i = 0; i < mode2_in.length; i++) {
            var temp = [];
            temp.push(mode2_in[i]['AreaID']);
            temp.push(mode2_in[i]['Station']);
            temp.push(parseFloat(mode2_in[i]['Lng']));
            temp.push(parseFloat(mode2_in[i]['Lat']));
            temp.push(-1 * parseInt(mode2_out[i][time[t]]));

            data.push(temp);

        }
        datamode1.push(data);
    }
    console.log(datamode1);
}


// loading
$(function () {

    prepareData();

    loadMap();

    loadPoly();
    graphChart = echarts.init(document.getElementById('picture'));
    addVenue();
    showTimeline();

    $(".minemap-ctrl-bottom-left").remove();



});
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
        offset: new BMapGL.Size(-40, -10)
    };
    var label = new BMapGL.Label('五棵松体育馆', opts);
    label.setStyle({
        color: '#fff',
        borderRadius: '5px',
        borderColor: '#fff',
        backgroundColor: '#79a913',
        fontSize: '20px',
        height: '35px',
        lineHeight: '30px',
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
    for (var i = 0; i < region_mode2.length; i++) {
        if (Math.abs(region_mode2[i]["NetFlow"]) >= 300) {
            region_o1.push(region_mode2[i]);
        }
        else if (Math.abs(region_mode2[i]["NetFlow"]) >= 100) {
            region_o2.push(region_mode2[i]);
        }
        else {
            region_o3.push(region_mode2[i]);
        }
        //else if(region_mode2[i]["NetFlow"]>-1000 && region_mode2[i]["NetFlow"]<=-500){
        //region_o4.push(region_mode2[i]);
        //}
        //else if(region_mode2[i]["NetFlow"]>=0){
        //region_o5.push(region_mode2[i]);
        //}
    }

    var polygon;
    //红色
    //console.log(region_o1);
    for (var i = 0; i < region_o1.length; i++) {
        var lines = [];
        for (var j = 0; j < region_o1[i]["poly"].length; j++) {
            lines.push(new BMapGL.Point(region_o1[i]["poly"][j][0], region_o1[i]["poly"][j][1]));
        }
        polygon = new BMapGL.Polygon(lines, {
            strokeColor: '#FFFFFF',
            fillColor: '#000000',
            strokeWeight: 2,
            strokeOpacity: 0.5
        });
        map.addOverlay(polygon);
    }

    //蓝色
    //console.log(region_o2);
    for (var i = 0; i < region_o2.length; i++) {
        var lines = [];
        for (var j = 0; j < region_o2[i]["poly"].length; j++) {
            lines.push(new BMapGL.Point(region_o2[i]["poly"][j][0], region_o2[i]["poly"][j][1]));
        }
        polygon = new BMapGL.Polygon(lines, {
            //strokeColor: 'rgb(0,0,0)',
            //fillColor:'white',
            //strokeWeight: 2,
            //strokeOpacity: 0.5
            strokeColor: '#FFFFFF',
            fillColor: '#000000',
            strokeWeight: 2,
            strokeOpacity: 0.5,

        });
        map.addOverlay(polygon);
    }
    //橘色
    //console.log(region_o3);
    for (var i = 0; i < region_o3.length; i++) {
        var lines = [];
        for (var j = 0; j < region_o3[i]["poly"].length; j++) {
            lines.push(new BMapGL.Point(region_o3[i]["poly"][j][0], region_o3[i]["poly"][j][1]));
        }
        polygon = new BMapGL.Polygon(lines, {
            strokeColor: '#FFFFFF',
            fillColor: '#000000',
            strokeWeight: 2,
            strokeOpacity: 0.5
        });
        map.addOverlay(polygon);
    }
    //蓝色
    for (var i = 0; i < region_o4.length; i++) {
        var lines = [];
        for (var j = 0; j < region_o4[i]["poly"].length; j++) {
            lines.push(new BMapGL.Point(region_o4[i]["poly"][j][0], region_o4[i]["poly"][j][1]));
        }
        polygon = new BMapGL.Polygon(lines, {
            strokeColor: '#FFFFFF',
            fillColor: '#000000',
            strokeWeight: 2,
            strokeOpacity: 0.5
        });
        ///map.addOverlay(polygon);
    }

    for (var i = 0; i < region_o5.length; i++) {
        for (var j = 0; j < region_o5[i]["poly"].length - 1; j++) {
            if (region_o5[i]["poly"][j][0] - region_o5[i]["poly"][j + 1][0] > 0.5 || region_o5[i]["poly"][j][0] - region_o5[i]["poly"][j + 1][0] < -0.5) {
                //console.log(region_o5[i]);
                //console.log(i);
                //console.log(region_o5);
                break;
            }
        }
    }
    //绿色
    for (var i = 0; i < region_o5.length; i++) {
        var lines = [];
        for (var j = 0; j < region_o5[i]["poly"].length; j++) {
            lines.push(new BMapGL.Point(region_o5[i]["poly"][j][0], region_o5[i]["poly"][j][1]));
        }
        polygon = new BMapGL.Polygon(lines, {
            strokeColor: '#FFFFFF',
            fillColor: '#000000',
            strokeWeight: 2,
            strokeOpacity: 0.5
        });
        //map.addOverlay(polygon);
    }
}
function loadPoint(flowdata, color) {


    var data = [];

    var citys = [
        '北京', '天津', '上海', '重庆', '石家庄', '太原', '呼和浩特', '哈尔滨',
        '长春', '沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州', '郑州',
        '武汉', '长沙', '广州', '南宁', '西安', '银川', '兰州', '西宁', '乌鲁木齐',
        '成都', '贵阳', '昆明', '拉萨', '海口'
    ];

    var randomCount = 300;



    // 构造数据
    for (var i = 0; i < flowdata.length; i++) {
        var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length, 10)]);
        data.push({
            geometry: {
                type: 'Point',
                coordinates: [flowdata[i][2], flowdata[i][3]]
            },
            properties: {
                count: flowdata[i][4]
            }
        });
    }

    view = new mapvgl.View({
        map: map
    });
    //console.log(data);
    pointLayer = new mapvgl.PointLayer({
        blend: 'lighter',
        size: 20,
        color: function (data) {
            if (data.properties.count >= 150) {
                return 'rgb(255,0,0)';
            }
            else if (data.properties.count >= 50) {
                return 'rgb(255,165,0)';
            }
            else if (data.properties.count >= 0) {
                return 'rgb(0,255,127)';
            }
            else if (data.properties.count <= -150) {
                return 'rgb(0,0,255)';
            }
            else if (data.properties.count <= -20) {
                return 'rgb(100,149,237)';
            }
            else if (data.properties.count <= 0) {
                return 'rgb(0,255,127)';
            }
        }
    });
    //添加公交站点信息窗口
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
        var label = new BMapGL.Label(str, opts);  // 创建文本标注对象
        label.setStyle({
            color: "black",
            fontSize: "15px",
            height: "15px",
            lineHeight: "12px",
            fontFamily: "微软雅黑",
            backgroundColor: "white", //文本标注背景颜色　
            maxWidth: "none",
            border: "0"
        });
        map.addOverlay(label);
    }
    return data;
    //view.addLayer(pointLayer);
    //pointLayer.setData(data);



}
function removeAllLayer() {
    for (var i = addedSrcId.length - 1; i >= 0; i--) {
        if (map.getSource(addedSrcId[i])) {
            map.removeSource(addedSrcId[i]);
        }
    }

    for (var i = addedLayerId.length - 1; i >= 0; i--) {
        if (map.getLayer(addedLayerId[i])) {
            map.removeLayer(addedLayerId[i]);
        }
    }
    addedSrcId = [];
    addedLayerId = [];
}

//定位到道路
function clickRoad(data) {
    $('#picture').hide();
    latitude = data.Lonlat[0];
    longitude = data.Lonlat[1];
    bearing = data.bearing;
    map.flyTo({
        center: [latitude, longitude],
        zoom: 16,
        bearing: bearing,
        pitch: 30,
        duration: 4000,
    });
    $("#city_table tr").css("background-color", "transparent");
    $("#row-templete_" + data.id).css("background-color", "#666666");
    cur_loc = data.location;
    showGraph();
}





function loadMap() {
    map = new BMapGL.Map("map");
    map.centerAndZoom(new BMapGL.Point(116.278425, 39.91054), 15);
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    map.setDisplayOptions({
        poiText: false,  // 隐藏poi标注
        //poiIcon: false,  // 隐藏poi图标
        //building: false  // 隐藏楼块
    });
    map.setMapStyleV2({
        styleId: 'f93e20266be1e44e35abd488256458fe'
    });



}

//时间轴
function showTimeline() {
    timelineChart = echarts.init(document.getElementById('timeline'));
    var option = {
        baseOption: {
            timeline: {
                axisType: 'category',
                autoPlay: true,
                playInterval: 2000,
                loop: true,
                lineStyle: {
                    color: 'black',

                },
                controlStyle: {
                    color: 'black',
                    borderColor: 'black',
                    borderWidth: 2.0,
                },
                //data: ['0', '1h', '2h', '3h', '4h','5h', '6h', '7h', '8h', '9h','10h', '11h', '12h', '13h', '14h','15h', '16h', '17h', '18h', '19h','20', '21h', '22h', '23h', '24h'],
                data: ['15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '活动中', '活动中', '活动中', '22:00-23:00', '23:00-24:00'],

                label: {
                    color: 'black',
                    fontSize: 12.5,
                    fontWeight: 'bold',
                }
            }
        }
    };





    timelineChart.setOption(option);

    timelineChart.on('timelinechanged', function (timeLineIndex) {

        var arrIndex = parseInt(timeLineIndex.currentIndex);
        console.log(arrIndex);
        var temp;
        if (arrIndex == 0) temp = 0;
        else { temp = arrIndex; }
        var data = loadPoint(datamode1[temp], color);
        //console.log(data);
        if (pointLayer) {
            view.removeLayer(pointLayer);
        }
        view.addLayer(pointLayer);
        pointLayer.setData(data);

    });


}

