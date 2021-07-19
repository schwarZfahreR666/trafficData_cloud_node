//全局变量
var map;
var addedSrcId = [];
var addedLayerId = [];
var source_data = new Array();//道路数据
var timelineChart;
var graphChart;
var node_color={};
var cur_time = 0;
var cur_loc = 'DZM';
var view;
var pointLayer;
var region_mode1;
var mode1_in;
var mode1_out;

var text1=$("#area option:selected").text();
var text2=$("#scale option:selected").text();
var text3=$("#mode option:selected").text();

//大型活动模式一入客流
region_mode1=[{"ID": "wx4g956kbxu3", "poly":[[116.40640051121127, 40.00123648206145], [116.41150752054523, 39.996946888456264],
 [116.4198921688047, 40.00214221723744], [116.41739816903876, 40.0235244582701], [116.41279144157495, 40.02523110750434],
[116.40613076764157, 40.0116938225004]],
    "FlowOut": "1604", "FlowIn": "950", "NetFlow": "-654"},
    {"ID": "wx4g2v0wm521", "poly": [["116.38818277498736", " 39.968649083100146"],[" 116.41267611589788", " 39.96968760980454"], [" 116.41269153341982", " 39.97112287643928"],
 [" 116.40649107258109", " 39.97937356400532"], [" 116.3943229391871", " 39.97871850938206"]], "FlowOut": "1212", "FlowIn": "969", "NetFlow": "-243"},
 {"ID": "wx4g8eqd9f3v", "poly": [["116.38683245080864", " 39.99884399687314"], [" 116.40640051121127", " 40.00123648206145"],
 [" 116.40613076764157", " 40.0116938225004"], [" 116.38615400363223", " 40.01379777682655"]], "FlowOut": "23914", "FlowIn": "17485", "NetFlow": "-6429"},
 {"ID": "wx4epcfjv4nn", "poly": [["116.3611835312926", " 39.92113654626935"], [" 116.35173301397086", " 39.92308531979975"],
 [" 116.35163667011446", " 39.90377844849085"], [" 116.35404228580963", " 39.901555601566315"], [" 116.36062764533668", " 39.90365250019365"],
 [" 116.36142312366849", " 39.90476905353463"]], "FlowOut": "711", "FlowIn": "645", "NetFlow": "-66"},
 {"ID": "wx4erhg6jrp9", "poly": [["116.31857643715867", " 39.974188442501635"], [" 116.31465605483383", " 39.96756677096173"],
 [" 116.3152760004971", " 39.96544782339419"], [" 116.33980892758409", " 39.97045450159636"], [" 116.3398179717624", " 39.97089874929348"],
 [" 116.32977381318217", " 39.97888291844971"]], "FlowOut": "1216", "FlowIn": "834", "NetFlow": "-382"},
 {"ID": "wx4erye3bb5k", "poly": [["116.36758678283688", " 39.99493450382268"], [" 116.3682913554025", " 39.994543437165746"],
 [" 116.36882380111528", " 39.9675937744589"], [" 116.3678443518311", " 39.96692299546711"], [" 116.35367847763106", " 39.97956467862393"],
 [" 116.35354068985616", " 39.991428895722876"], [" 116.35638269830028", " 39.99428194991918"]], "FlowOut": "6150", "FlowIn": "4182", "NetFlow": "-1968"},
 {"ID": "wx4exffpzg20", "poly": [["116.36758678283688", " 39.99493450382268"], [" 116.36631261982923", " 40.02023555377464"],
 [" 116.3612672556412", " 40.025026038782215"], [" 116.35220394055844", " 40.02548711327245"], [" 116.35288233471078", " 40.000693770415644"],
 [" 116.35638269830028", " 39.99428194991918"]], "FlowOut": "4396", "FlowIn": "3441", "NetFlow": "-955"},
 {"ID": "wx4g2y8rd3tn", "poly": [["116.3943229391871", " 39.97871850938206"], [" 116.40649107258109", " 39.97937356400532"],
 [" 116.40645338321958", " 39.98802627416739"], [" 116.39407262665172", " 39.9874278071865"]], "FlowOut": "47", "FlowIn": "250", "NetFlow": "203"},
 {"ID": "wx4ex3x2kwc7", "poly": [["116.33325072794878", " 40.00520333697286"], [" 116.35288233471078", " 40.000693770415644"],
 [" 116.35638269830028", " 39.99428194991918"], [" 116.35354068985616", " 39.991428895722876"], [" 116.34090251484488", " 39.98972466805103"],
 [" 116.33398545246882", " 39.99352042064858"], [" 116.33345883660371", " 39.994817137901"]],
    "FlowOut": "45", "FlowIn": "246", "NetFlow": "201"}];

mode1_in=[
{"AreaID":"wx4ur6un8zm1","Station":"R安立路","Lng":116.413246,"Lat":40.008831,"15-16":104,"16-17":264,"17-18":380,"18-19":366,"19-20":220,"20-21":187,"21-22":181,"22-23":169,"23-24":27},
{"AreaID":"wx4g2v0wm521","Station":"B马甸桥南","Lng":116.392509,"Lat":39.973271,"15-16":65,"16-17":179,"17-18":162,"18-19":203,"19-20":178,"20-21":96,"21-22":66,"22-23":18,"23-24":2},
{"AreaID":"wx4g8eqd9f3v","Station":"B南沟泥河","Lng":116.391503,"Lat":40.009547,"15-16":91,"16-17":142,"17-18":159,"18-19":115,"19-20":102,"20-21":76,"21-22":108,"22-23":55,"23-24":9},
{"AreaID":"wx4epcfjv4nn","Station":"B天宁寺桥西","Lng":116.357029,"Lat":39.904969,"15-16":82,"16-17":82,"17-18":65,"18-19":111,"19-20":161,"20-21":55,"21-22":52,"22-23":27,"23-24":10},
{"AreaID":"wx4g956kbxu3","Station":"B洼里南口","Lng":116.408081,"Lat":40.009926,"15-16":85,"16-17":134,"17-18":161,"18-19":189,"19-20":150,"20-21":115,"21-22":68,"22-23":42,"23-24":6},
{"AreaID":"wx4erhg6jrp9","Station":"B万泉庄","Lng":116.319753,"Lat":39.973539,"15-16":109,"16-17":159,"17-18":148,"18-19":146,"19-20":107,"20-21":72,"21-22":64,"22-23":28,"23-24":1},
{"AreaID":"wx4erye3bb5k","Station":"R西土城","Lng":116.360647,"Lat":39.982279,"15-16":230,"16-17":609,"17-18":672,"18-19":701,"19-20":481,"20-21":466,"21-22":480,"22-23":455,"23-24":88},
{"AreaID":"wx4exffpzg20","Station":"B学院路北口","Lng":116.365599,"Lat":40.004284,"15-16":63,"16-17":123,"17-18":122,"18-19":108,"19-20":101,"20-21":81,"21-22":47,"22-23":20,"23-24":2},
{"AreaID":"wx4g8eqd9f3v","Station":"B中科院地理所","Lng":116.395964,"Lat":40.009501,"15-16":70,"16-17":115,"17-18":85,"18-19":98,"19-20":61,"20-21":68,"21-22":47,"22-23":30,"23-24":0},
{"AreaID":"wx4exffpzg20","Station":"R六道口","Lng":116.358557,"Lat":40.006894,"15-16":158,"16-17":408,"17-18":597,"18-19":570,"19-20":425,"20-21":344,"21-22":415,"22-23":479,"23-24":45},
{"AreaID":"wx4g2y8rd3tn","Station":"R北土城","Lng":116.400688,"Lat":39.983269,"15-16":10,"16-17":19,"17-18":29,"18-19":56,"19-20":24,"20-21":31,"21-22":28,"22-23":51,"23-24":2},
{"AreaID":"wx4ex3x2kwc7","Station":"R五道口","Lng":116.344448,"Lat":39.998443,"15-16":8,"16-17":24,"17-18":41,"18-19":34,"19-20":37,"20-21":24,"21-22":37,"22-23":32,"23-24":9},

];
mode1_out=[
{"AreaID":"wx4ur6un8zm1","Station":"R安立路","Lng":116.413246,"Lat":40.008831,"15-16":398,"16-17":455,"17-18":618,"18-19":616,"19-20":411,"20-21":336,"21-22":297,"22-23":283,"23-24":15},
{"AreaID":"wx4g2v0wm521","Station":"B马甸桥南","Lng":116.392509,"Lat":39.973271,"15-16":211,"16-17":222,"17-18":273,"18-19":225,"19-20":155,"20-21":81,"21-22":38,"22-23":6,"23-24":1},
{"AreaID":"wx4g8eqd9f3v","Station":"B南沟泥河","Lng":116.391503,"Lat":40.009547,"15-16":132,"16-17":222,"17-18":280,"18-19":230,"19-20":215,"20-21":97,"21-22":111,"22-23":86,"23-24":11},
{"AreaID":"wx4epcfjv4nn","Station":"B天宁寺桥西","Lng":116.357029,"Lat":39.904969,"15-16":137,"16-17":130,"17-18":132,"18-19":106,"19-20":66,"20-21":64,"21-22":56,"22-23":19,"23-24":1},
{"AreaID":"wx4g956kbxu3","Station":"B洼里南口","Lng":116.408081,"Lat":40.009926,"15-16":172,"16-17":223,"17-18":234,"18-19":222,"19-20":169,"20-21":172,"21-22":269,"22-23":139,"23-24":4},
{"AreaID":"wx4erhg6jrp9","Station":"B万泉庄","Lng":116.319753,"Lat":39.973539,"15-16":155,"16-17":188,"17-18":160,"18-19":226,"19-20":175,"20-21":128,"21-22":122,"22-23":56,"23-24":6},
{"AreaID":"wx4erye3bb5k","Station":"R西土城","Lng":116.360647,"Lat":39.982279,"15-16":701,"16-17":952,"17-18":1398,"18-19":1118,"19-20":749,"20-21":585,"21-22":466,"22-23":177,"23-24":4},
{"AreaID":"wx4exffpzg20","Station":"B学院路北口","Lng":116.365599,"Lat":40.004284,"15-16":118,"16-17":155,"17-18":166,"18-19":117,"19-20":84,"20-21":107,"21-22":80,"22-23":39,"23-24":3},
{"AreaID":"wx4g8eqd9f3v","Station":"B中科院地理所","Lng":116.395964,"Lat":40.009501,"15-16":108,"16-17":135,"17-18":147,"18-19":147,"19-20":163,"20-21":74,"21-22":118,"22-23":56,"23-24":3},
{"AreaID":"wx4exffpzg20","Station":"R六道口","Lng":116.358557,"Lat":40.006894,"15-16":502,"16-17":736,"17-18":706,"18-19":863,"19-20":643,"20-21":431,"21-22":312,"22-23":194,"23-24":9},
{"AreaID":"wx4g2y8rd3tn","Station":"R北土城","Lng":116.400688,"Lat":39.983269,"15-16":21,"16-17":15,"17-18":51,"18-19":60,"19-20":31,"20-21":12,"21-22":24,"22-23":43,"23-24":3},
{"AreaID":"wx4ex3x2kwc7","Station":"R五道口","Lng":116.344448,"Lat":39.998443,"15-16":22,"16-17":47,"17-18":67,"18-19":50,"19-20":51,"20-21":29,"21-22":18,"22-23":7,"23-24":0},

];

function areaChange(){
    var text1=$("#area option:selected").text();
    console.log(text1);
}
function scaleChange(){
    var text2=$("#scale option:selected").text();
    console.log(text2);
}
function modeChange(){
    var text3=$("#mode option:selected").text();
    console.log(text3);
}
var datamode1=[];
var time=['15-16','16-17','17-18','18-19','19-20','20-21','21-22','22-23','23-24'];
var color=[ 'rgb(255,0,0','rgb(255,165,0)','rgb(0,255,127)','rgb(0,0,255)','rgb(100,149,237)'];
//计算开场、比赛中和散场后的客流
function prepareData(){
    //开场前
for(var t=0;t<4;t++){
	var data=[];
for(var i=0;i<mode1_in.length;i++){
	var temp=[];
		temp.push(mode1_in[i]['AreaID']);
		temp.push(mode1_in[i]['Station']);
		temp.push(parseFloat(mode1_in[i]['Lng']));
		temp.push(parseFloat(mode1_in[i]['Lat']));
		temp.push(parseInt(mode1_in[i][time[t]]));

	data.push(temp);

}
datamode1.push(data);
}
//比赛期间
for(var t=4;t<7;t++){
	var data=[];
for(var i=0;i<mode1_in.length;i++){
	var temp=[];
		temp.push(mode1_in[i]['AreaID']);
		temp.push(mode1_in[i]['Station']);
		temp.push(parseFloat(mode1_in[i]['Lng']));
		temp.push(parseFloat(mode1_in[i]['Lat']));
		temp.push(parseInt(mode1_in[i][time[t]])-parseInt(mode1_out[i][time[t]]));

	data.push(temp);

}
datamode1.push(data);
}
//散场后
for(var t=7;t<9;t++){
	var data=[];
for(var i=0;i<mode1_in.length;i++){
	var temp=[];
		temp.push(mode1_in[i]['AreaID']);
		temp.push(mode1_in[i]['Station']);
		temp.push(parseFloat(mode1_in[i]['Lng']));
		temp.push(parseFloat(mode1_in[i]['Lat']));
		temp.push(-1*parseInt(mode1_out[i][time[t]]));

	data.push(temp);

}
datamode1.push(data);
}
console.log(datamode1);
}


//道路信息
var data1 = [
        {
            "name": "东直门南大街路口",
            "id": 611100347,
            "Lonlat": [116.434,39.9336],
            "bearing": 0,
            "length": 421,
            "speed": 4.53,
            "time": 23,
            "location": "DZM",
        },
        {
            "name": "农展馆南路路口",
            "id": 611100346,
            "Lonlat": [116.462,39.9337],
            "bearing": 0,
            "length": 347,
            "speed": 11.32,
            "time": 17,
            "location": "NZG",
        },
        {
            "name": "中关村东路路口",
            "id": 611100345,
            "Lonlat": [116.333, 39.9858],
            "bearing": 0,
            "length": 213,
            "speed": 18.64,
            "time": 11,
            "location": "ZGC",
        },

    ];
//道路数据
var section1_DZM_0={"type": "geojson", "data": {"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"color": "red", "smallid": 0, "speed": "7.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43424, 39.93664], [116.43424, 39.93672], [116.43423, 39.93691]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 1, "speed": "37.2"}, "geometry": {"type": "LineString", "coordinates": [[116.43447, 39.93092], [116.43447, 39.93099]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 2, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.43431, 39.93414], [116.4344, 39.93414]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 3, "speed": "17.6"}, "geometry": {"type": "LineString", "coordinates": [[116.43395, 39.93068], [116.43399, 39.92957]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 4, "speed": "11.2"}, "geometry": {"type": "LineString", "coordinates": [[116.43446, 39.93487], [116.43444, 39.9351]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 5, "speed": "11.2"}, "geometry": {"type": "LineString", "coordinates": [[116.43425, 39.93604], [116.43424, 39.93661]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 6, "speed": "13.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43375, 39.93656], [116.43378, 39.93614]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 7, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.4334, 39.93392], [116.43336, 39.93378], [116.43336, 39.93363], [116.43341, 39.93346]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 8, "speed": "13.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43375, 39.93666], [116.43375, 39.93656]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 9, "speed": "37.2"}, "geometry": {"type": "LineString", "coordinates": [[116.43444, 39.93137], [116.43451, 39.93159], [116.43454, 39.93183], [116.43456, 39.93219], [116.43456, 39.93228]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 10, "speed": "25.2"}, "geometry": {"type": "LineString", "coordinates": [[116.43395, 39.93091], [116.43395, 39.93068]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 11, "speed": "33.3"}, "geometry": {"type": "LineString", "coordinates": [[116.43379, 39.93213], [116.4338, 39.93199], [116.43385, 39.9318]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 12, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43381, 39.93327], [116.43384, 39.93326], [116.43387, 39.93326]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 13, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43352, 39.93335], [116.43343, 39.93344], [116.43341, 39.93346]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 14, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43157, 39.9336], [116.4323, 39.9336]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 15, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43148, 39.93375], [116.43191, 39.93374]]}}, {"type": "Feature", "properties": {"color": "red", "smallid": 16, "speed": "2.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43665, 39.93377], [116.4352, 39.93378], [116.43507, 39.93379], [116.43496, 39.93383], [116.43483, 39.93387]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 17, "speed": "12.4"}, "geometry": {"type": "LineString", "coordinates": [[116.43435, 39.93321], [116.43436, 39.93308], [116.43437, 39.93259]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 18, "speed": "18.7"}, "geometry": {"type": "LineString", "coordinates": [[116.43352, 39.93335], [116.43367, 39.93313], [116.43372, 39.93301], [116.43375, 39.93294], [116.43376, 39.93288], [116.43378, 39.93247], [116.43379, 39.93213]]}}, {"type": "Feature", "properties": {"color": "red", "smallid": 19, "speed": "2.6"}, "geometry": {"type": "LineString", "coordinates": [[116.43385, 39.93414], [116.43398, 39.93414], [116.43407, 39.93414], [116.43416, 39.93414], [116.43431, 39.93414]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 20, "speed": "13.3"}, "geometry": {"type": "LineString", "coordinates": [[116.43385, 39.93438], [116.43384, 39.93501]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 21, "speed": "11.2"}, "geometry": {"type": "LineString", "coordinates": [[116.43424, 39.93661], [116.43424, 39.93664]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 22, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.43431, 39.93414], [116.43431, 39.93408], [116.43434, 39.93327]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 23, "speed": "37.2"}, "geometry": {"type": "LineString", "coordinates": [[116.43447, 39.93099], [116.43445, 39.93119]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 24, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.4344, 39.93414], [116.43443, 39.93414], [116.4345, 39.93413], [116.43459, 39.9341]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 25, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.4323, 39.9336], [116.43265, 39.9336], [116.43287, 39.93359], [116.43305, 39.93357], [116.4332, 39.93354], [116.43341, 39.93346]]}}, {"type": "Feature", "properties": {"color": "red", "smallid": 26, "speed": "3.7"}, "geometry": {"type": "LineString", "coordinates": [[116.43387, 39.93326], [116.43393, 39.93325], [116.43401, 39.93325], [116.4341, 39.93325], [116.43419, 39.93326], [116.43422, 39.93326], [116.43434, 39.93327]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 27, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.43431, 39.93423], [116.43431, 39.9342], [116.43431, 39.93414]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 28, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43367, 39.9347], [116.43368, 39.9345], [116.43364, 39.93429], [116.43356, 39.93407]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 29, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.43539, 39.93365], [116.43527, 39.93364], [116.43507, 39.93361]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 30, "speed": "13.5"}, "geometry": {"type": "LineString", "coordinates": [[116.43367, 39.93549], [116.43365, 39.93537], [116.43367, 39.9347]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 31, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43191, 39.93374], [116.43199, 39.93374]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 32, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43388, 39.93306], [116.43387, 39.93326]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 33, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43385, 39.93414], [116.43385, 39.9342], [116.43385, 39.93438]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 34, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.43525, 39.93387], [116.43522, 39.93387], [116.43506, 39.93391], [116.435, 39.93393]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 35, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43148, 39.9336], [116.43157, 39.9336]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 36, "speed": "14.3"}, "geometry": {"type": "LineString", "coordinates": [[116.43096, 39.93375], [116.43148, 39.93375]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 37, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.43538, 39.93386], [116.43531, 39.93386], [116.43525, 39.93387]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 38, "speed": "37.2"}, "geometry": {"type": "LineString", "coordinates": [[116.43437, 39.93259], [116.43444, 39.93137]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 39, "speed": "13.8"}, "geometry": {"type": "LineString", "coordinates": [[116.4338, 39.93594], [116.43378, 39.93614]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 40, "speed": "10.6"}, "geometry": {"type": "LineString", "coordinates": [[116.43456, 39.93228], [116.43453, 39.93283], [116.43453, 39.93296], [116.43454, 39.933], [116.43455, 39.93307], [116.43458, 39.93318], [116.43466, 39.93335]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 41, "speed": "11.2"}, "geometry": {"type": "LineString", "coordinates": [[116.43444, 39.9351], [116.43441, 39.9354], [116.4343, 39.93576], [116.43425, 39.93591]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 42, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43379, 39.93413], [116.43385, 39.93414]]}}, {"type": "Feature", "properties": {"color": "red", "smallid": 43, "speed": "2.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43663, 39.93386], [116.43649, 39.93386], [116.43574, 39.93385], [116.43565, 39.93384], [116.43538, 39.93386]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 44, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43387, 39.93326], [116.43387, 39.93332], [116.43385, 39.93368], [116.43385, 39.93414]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 45, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.435, 39.93393], [116.43493, 39.93395], [116.43486, 39.93399], [116.43463, 39.93407]]}}, {"type": "Feature", "properties": {"color": "red", "smallid": 46, "speed": "2.2"}, "geometry": {"type": "LineString", "coordinates": [[116.43459, 39.9341], [116.43454, 39.93426], [116.4345, 39.93439], [116.43448, 39.93454], [116.43446, 39.93487]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 47, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43356, 39.93407], [116.43366, 39.93411], [116.43373, 39.93413], [116.43379, 39.93413]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 48, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43356, 39.93407], [116.43348, 39.93401], [116.4334, 39.93392]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 49, "speed": "13.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43384, 39.93501], [116.4338, 39.93594]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 50, "speed": "33.3"}, "geometry": {"type": "LineString", "coordinates": [[116.43385, 39.9318], [116.43393, 39.9315]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 51, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.43352, 39.93335], [116.43381, 39.93327]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 52, "speed": "11.2"}, "geometry": {"type": "LineString", "coordinates": [[116.43425, 39.93591], [116.43425, 39.93604]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 53, "speed": "26.5"}, "geometry": {"type": "LineString", "coordinates": [[116.43393, 39.9315], [116.43392, 39.93227], [116.43388, 39.93306]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 54, "speed": "12.8"}, "geometry": {"type": "LineString", "coordinates": [[116.4334, 39.93392], [116.43318, 39.93382], [116.43308, 39.93379], [116.43286, 39.93376], [116.43264, 39.93375], [116.43199, 39.93374]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 55, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.43459, 39.9341], [116.43463, 39.93407]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 56, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.43434, 39.93327], [116.4344, 39.93328]]}}, {"type": "Feature", "properties": {"color": "red", "smallid": 57, "speed": "7.5"}, "geometry": {"type": "LineString", "coordinates": [[116.43425, 39.93591], [116.43427, 39.93526], [116.43431, 39.93423]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 58, "speed": "37.2"}, "geometry": {"type": "LineString", "coordinates": [[116.43445, 39.93119], [116.43444, 39.93137]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 59, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.43463, 39.93407], [116.43471, 39.93402], [116.43475, 39.93398], [116.43478, 39.93394], [116.43481, 39.9339], [116.43483, 39.93387]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 60, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.43507, 39.93361], [116.43502, 39.9336], [116.43497, 39.93359], [116.43482, 39.93351]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 61, "speed": "13.8"}, "geometry": {"type": "LineString", "coordinates": [[116.4338, 39.93594], [116.43374, 39.93578], [116.43367, 39.93549]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 62, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.4344, 39.93328], [116.43445, 39.93328], [116.43454, 39.9333], [116.43466, 39.93335]]}}, {"type": "Feature", "properties": {"color": "red", "smallid": 63, "speed": "6.9"}, "geometry": {"type": "LineString", "coordinates": [[116.43662, 39.93364], [116.43539, 39.93365]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 64, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.43466, 39.93335], [116.43472, 39.93341], [116.4348, 39.93349], [116.43482, 39.93351]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 65, "speed": "33.3"}, "geometry": {"type": "LineString", "coordinates": [[116.43393, 39.9315], [116.43394, 39.93106], [116.43395, 39.93091]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 66, "speed": "14.3"}, "geometry": {"type": "LineString", "coordinates": [[116.43097, 39.9336], [116.43148, 39.9336]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 67, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.43483, 39.93387], [116.43486, 39.9338], [116.43488, 39.93376], [116.43488, 39.93371], [116.43488, 39.93366], [116.43486, 39.9336], [116.43482, 39.93351]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 68, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.43434, 39.93327], [116.43435, 39.93321]]}}]}};

var section1_NZG_0={"type": "geojson", "data": {"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"color": "red", "smallid": 0, "speed": "7.5"}, "geometry": {"type": "LineString", "coordinates": [[116.45953, 39.93367], [116.45998, 39.93367]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 1, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46204, 39.9366], [116.46194, 39.93685], [116.46182, 39.93718]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 2, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46144, 39.9329], [116.46155, 39.93294], [116.46165, 39.93294], [116.46172, 39.93294], [116.4618, 39.93295], [116.46187, 39.93295], [116.46201, 39.9329]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 3, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46201, 39.93367], [116.46212, 39.93367]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 4, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.4636, 39.93367], [116.46368, 39.93372], [116.4638, 39.9338]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 5, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.4636, 39.93367], [116.46399, 39.93366]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 6, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46358, 39.9338], [116.4638, 39.9338]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 7, "speed": "13.4"}, "geometry": {"type": "LineString", "coordinates": [[116.46199, 39.9321], [116.46201, 39.9329]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 8, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.4638, 39.9338], [116.46391, 39.93372], [116.46399, 39.93366]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 9, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.4638, 39.9338], [116.46408, 39.9338]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 10, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46156, 39.93379], [116.46166, 39.93379], [116.46173, 39.93379], [116.46181, 39.93379], [116.46201, 39.93379]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 11, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46008, 39.93361], [116.4608, 39.9336], [116.46113, 39.93359], [116.46145, 39.9336]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 12, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46204, 39.93674], [116.46203, 39.93712], [116.46205, 39.93758]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 13, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46201, 39.93379], [116.46201, 39.9339]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 14, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.45998, 39.93361], [116.46008, 39.93361]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 15, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46156, 39.93379], [116.46149, 39.93444], [116.46144, 39.93457]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 16, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46145, 39.9338], [116.46156, 39.93379]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 17, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46201, 39.9329], [116.46191, 39.93309], [116.46189, 39.93367]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 18, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.45998, 39.93367], [116.46145, 39.93367]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 19, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46212, 39.93367], [116.4636, 39.93367]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 20, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46144, 39.93653], [116.46144, 39.93722]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 21, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46202, 39.93457], [116.46203, 39.93512]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 22, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46201, 39.93367], [116.46191, 39.93373], [116.46186, 39.93376], [116.46181, 39.93376], [116.46173, 39.93376], [116.46166, 39.93376], [116.4616, 39.93377], [116.46156, 39.93379]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 23, "speed": "15.0"}, "geometry": {"type": "LineString", "coordinates": [[116.45958, 39.9338], [116.45903, 39.93379], [116.45852, 39.9338]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 24, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46145, 39.9338], [116.46144, 39.93457]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 25, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46144, 39.93506], [116.46144, 39.93609], [116.46144, 39.93653]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 26, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46399, 39.93366], [116.46409, 39.93366]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 27, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46189, 39.93367], [116.46181, 39.93367], [116.46173, 39.93367], [116.46166, 39.93367], [116.46145, 39.93367]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 28, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46144, 39.93457], [116.46144, 39.93506]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 29, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46212, 39.93379], [116.46358, 39.9338]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 30, "speed": "26.7"}, "geometry": {"type": "LineString", "coordinates": [[116.46143, 39.93194], [116.46144, 39.93281]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 31, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46145, 39.9338], [116.45998, 39.9338]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 32, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46144, 39.93457], [116.46155, 39.93452], [116.46166, 39.9345], [116.46174, 39.9345], [116.46181, 39.9345], [116.46192, 39.93452], [116.46202, 39.93457]]}}, {"type": "Feature", "properties": {"color": "orange", "smallid": 33, "speed": "13.4"}, "geometry": {"type": "LineString", "coordinates": [[116.46144, 39.93281], [116.46144, 39.9329]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 34, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46145, 39.93367], [116.46145, 39.93373], [116.46145, 39.9338]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 35, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46144, 39.9329], [116.46145, 39.9336]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 36, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46201, 39.93367], [116.46189, 39.93367]]}}, {"type": "Feature", "properties": {"color": "red", "smallid": 37, "speed": "8.4"}, "geometry": {"type": "LineString", "coordinates": [[116.46409, 39.93366], [116.46563, 39.93365]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 38, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46201, 39.93367], [116.46201, 39.93373], [116.46201, 39.93379]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 39, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46145, 39.9336], [116.46145, 39.93367]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 40, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46144, 39.93653], [116.46165, 39.93727]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 41, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46204, 39.93582], [116.46204, 39.93653]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 42, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46408, 39.9338], [116.46474, 39.9338]]}}, {"type": "Feature", "properties": {"color": "red", "smallid": 43, "speed": "7.5"}, "geometry": {"type": "LineString", "coordinates": [[116.45998, 39.9338], [116.45958, 39.9338]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 44, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46204, 39.9366], [116.46204, 39.9367], [116.46204, 39.93674]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 45, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46201, 39.93379], [116.46212, 39.93379]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 46, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46189, 39.93367], [116.46186, 39.9337], [116.46181, 39.9337], [116.46173, 39.93371], [116.46166, 39.9337], [116.46158, 39.9337], [116.46154, 39.93373], [116.46145, 39.9338]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 47, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46204, 39.93653], [116.46204, 39.9366]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 48, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46201, 39.9329], [116.46201, 39.93367]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 49, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46201, 39.9339], [116.46202, 39.93457]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 50, "speed": "0.0"}, "geometry": {"type": "LineString", "coordinates": [[116.46203, 39.93512], [116.46204, 39.93582]]}}]}};
var section1_ZGC_0={"type": "geojson", "data": {"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"color": "yellow", "smallid": 0, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33462, 39.98586], [116.33453, 39.98586]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 1, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33316, 39.98578], [116.33306, 39.98577]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 2, "speed": "23.2"}, "geometry": {"type": "LineString", "coordinates": [[116.32952, 39.98613], [116.3299, 39.98615], [116.33061, 39.98617], [116.33091, 39.98617], [116.33288, 39.98625]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 3, "speed": "24.7"}, "geometry": {"type": "LineString", "coordinates": [[116.33794, 39.98604], [116.33637, 39.98596], [116.33462, 39.98586]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 4, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33488, 39.98638], [116.33496, 39.98644], [116.33509, 39.98646], [116.33512, 39.98646]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 5, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33311, 39.98652], [116.33312, 39.98626]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 6, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33331, 39.98579], [116.33316, 39.98578]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 7, "speed": "25.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33479, 39.98584], [116.33488, 39.98583], [116.33499, 39.98581], [116.33531, 39.98578], [116.33539, 39.98577], [116.33549, 39.98577], [116.3356, 39.98578], [116.33582, 39.98578]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 8, "speed": "38.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33328, 39.9875], [116.33326, 39.98792], [116.33326, 39.98798]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 9, "speed": "25.6"}, "geometry": {"type": "LineString", "coordinates": [[116.33343, 39.98425], [116.33342, 39.98497], [116.33346, 39.98564], [116.33348, 39.98572], [116.33354, 39.9858]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 10, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33453, 39.98586], [116.33354, 39.9858]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 11, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33311, 39.98652], [116.33325, 39.98653]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 12, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33312, 39.98626], [116.33327, 39.98626]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 13, "speed": "38.4"}, "geometry": {"type": "LineString", "coordinates": [[116.3332, 39.98758], [116.33317, 39.98816]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 14, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33327, 39.98626], [116.33328, 39.98616], [116.33328, 39.98613], [116.33329, 39.98596], [116.33331, 39.98579]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 15, "speed": "35.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33323, 39.98421], [116.33321, 39.98461], [116.3332, 39.98482]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 16, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33318, 39.98536], [116.33317, 39.98552]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 17, "speed": "30.8"}, "geometry": {"type": "LineString", "coordinates": [[116.33294, 39.98791], [116.33295, 39.98764], [116.33295, 39.98709], [116.33296, 39.98693], [116.33297, 39.98648], [116.33295, 39.98639], [116.33294, 39.98633], [116.33288, 39.98625]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 18, "speed": "35.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33326, 39.98362], [116.33323, 39.98421]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 19, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33354, 39.9858], [116.33331, 39.98579]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 20, "speed": "35.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33347, 39.98426], [116.33351, 39.98426], [116.33361, 39.98427]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 21, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33335, 39.98627], [116.33355, 39.98628], [116.33446, 39.98633]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 22, "speed": "22.9"}, "geometry": {"type": "LineString", "coordinates": [[116.33306, 39.98577], [116.33096, 39.98569]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 23, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33312, 39.98626], [116.33313, 39.98612]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 24, "speed": "35.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33302, 39.98462], [116.33312, 39.98462]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 25, "speed": "38.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33404, 39.98749], [116.33387, 39.98748], [116.33375, 39.98748], [116.33354, 39.98748], [116.33328, 39.9875]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 26, "speed": "38.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33306, 39.9875], [116.33307, 39.98739]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 27, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33317, 39.98552], [116.33316, 39.98578]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 28, "speed": "29.3"}, "geometry": {"type": "LineString", "coordinates": [[116.3332, 39.98482], [116.33318, 39.98536]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 29, "speed": "29.3"}, "geometry": {"type": "LineString", "coordinates": [[116.33334, 39.98466], [116.33332, 39.98531]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 30, "speed": "38.4"}, "geometry": {"type": "LineString", "coordinates": [[116.3332, 39.98731], [116.3332, 39.98742]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 31, "speed": "35.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33335, 39.98422], [116.33343, 39.98425]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 32, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33332, 39.98531], [116.33332, 39.98552]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 33, "speed": "32.3"}, "geometry": {"type": "LineString", "coordinates": [[116.33327, 39.98626], [116.33334, 39.98647], [116.33332, 39.9869], [116.33331, 39.98713], [116.33328, 39.9875]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 34, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33327, 39.98626], [116.33335, 39.98627]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 35, "speed": "35.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33361, 39.98427], [116.33369, 39.98427]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 36, "speed": "38.4"}, "geometry": {"type": "LineString", "coordinates": [[116.3332, 39.98742], [116.33328, 39.9875]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 37, "speed": "38.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33293, 39.98814], [116.33294, 39.98791]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 38, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33288, 39.98625], [116.33312, 39.98626]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 39, "speed": "35.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33337, 39.98376], [116.33335, 39.98422]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 40, "speed": "30.8"}, "geometry": {"type": "LineString", "coordinates": [[116.33325, 39.98653], [116.3332, 39.98731]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 41, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33332, 39.98552], [116.33331, 39.98579]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 42, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33446, 39.98633], [116.33488, 39.98638]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 43, "speed": "25.3"}, "geometry": {"type": "LineString", "coordinates": [[116.33488, 39.98638], [116.33622, 39.98645], [116.3368, 39.98647]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 44, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33315, 39.98595], [116.33316, 39.98578]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 45, "speed": "35.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33348, 39.98327], [116.33343, 39.98425]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 46, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33327, 39.98626], [116.33325, 39.98653]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 47, "speed": "38.4"}, "geometry": {"type": "LineString", "coordinates": [[116.3332, 39.98742], [116.3332, 39.98758]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 48, "speed": "38.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33304, 39.98813], [116.33306, 39.9875]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 49, "speed": "27.2"}, "geometry": {"type": "LineString", "coordinates": [[116.33316, 39.98578], [116.33307, 39.98556], [116.33312, 39.98462]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 50, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33313, 39.98612], [116.33315, 39.98595]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 51, "speed": "30.8"}, "geometry": {"type": "LineString", "coordinates": [[116.33307, 39.98739], [116.33311, 39.98652]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 52, "speed": "38.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33328, 39.9875], [116.3332, 39.98758]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 53, "speed": "35.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33335, 39.98422], [116.33334, 39.98462], [116.33334, 39.98466]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 54, "speed": "35.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33343, 39.98425], [116.33347, 39.98426]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 55, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33317, 39.98552], [116.33332, 39.98552]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 56, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33462, 39.98586], [116.33475, 39.98584], [116.33479, 39.98584]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 57, "speed": "23.1"}, "geometry": {"type": "LineString", "coordinates": [[116.33446, 39.98633], [116.33445, 39.98649]]}}, {"type": "Feature", "properties": {"color": "green", "smallid": 58, "speed": "35.4"}, "geometry": {"type": "LineString", "coordinates": [[116.33312, 39.98462], [116.33317, 39.98362]]}}, {"type": "Feature", "properties": {"color": "yellow", "smallid": 59, "speed": "24.7"}, "geometry": {"type": "LineString", "coordinates": [[116.33512, 39.98646], [116.33621, 39.98652]]}}]}};
var roaddata=[];
roaddata.push(section1_DZM_0);
roaddata.push(section1_NZG_0);
roaddata.push(section1_ZGC_0);


// loading
$(function(){
    for (var i = 0; i < data1.length; i++) {
        contents = '<tr height="32px;" id="row-templete_' + data1[i].id + '" onclick="javascript:clickRoad(data1[' + i + ']);"> ' +
            '<td style=""><span class="table_span" style="font-size:15px;">'+ data1[i].name +'</td>' +
            '<td><span class="table_span" style="font-size:15px;">'+ data1[i].length +'</span></td>' +
            '<td><span class="table_span" style="font-size:15px;">'+ data1[i].speed +'</span></td>' +
            '<td><span class="table_span" style="font-size:15px;">'+ data1[i].time +' 分</span></td>' +
            '</tr>';
        //console.log(contents);
        $('#tab_rank').append(contents);
    }
    prepareData();
	loadRoadData();
    loadMap();
	//loadPoint();
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
	ctx.fillOpacity=0.9;
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
function addVenue(){
	
var pStart = new BMapGL.Point(116.389196,40.017233);
var pEnd = new BMapGL.Point(116.417593,40.036335);
var bounds = new BMapGL.Bounds(new BMapGL.Point(pStart.lng, pEnd.lat), new BMapGL.Point(pEnd.lng, pStart.lat));
var canvasOverlay = new BMapGL.GroundOverlay(bounds, {
    type: 'canvas',
    url: getTextureCanvas(),
    opacity: 0.9
});
map.addOverlay(canvasOverlay);

// 添加文本标注
var opts = {
    position: new BMapGL.Point(116.3980000,40.025084),
    offset: new BMapGL.Size(-40, -30)
};
var label = new BMapGL.Label('奥林匹克森林公园', opts);
label.setStyle({
    color: '#fff',
    borderRadius: '5px',
    borderColor: '#fff',
    backgroundColor: '#79a913',
    fontSize: '20px',
    height: '35px',
    lineHeight: '30px',
	maxWidth:"none",
	
});
//label.setZIndex(zIndex:1);
map.addOverlay(label);

}
function loadPoly(){
	// 根据出入流量显示不同颜色
//>5000红色；>1000黄色；>500蓝色；>100粉色；其余是绿色
var region_o1=[];
var region_o2=[];
var region_o3=[];
var region_o4=[];
var region_o5=[];
for(var i=0;i<region_mode1.length;i++){
if(Math.abs(region_mode1[i]["NetFlow"])>=300){
region_o1.push(region_mode1[i]);
}
else if(Math.abs(region_mode1[i]["NetFlow"])>=100){
region_o2.push(region_mode1[i]);
}
else {
region_o3.push(region_mode1[i]);
}
//else if(region_mode1[i]["NetFlow"]>-1000 && region_mode1[i]["NetFlow"]<=-500){
//region_o4.push(region_mode1[i]);
//}
//else if(region_mode1[i]["NetFlow"]>=0){
//region_o5.push(region_mode1[i]);
//}
}

var polygon;
//红色
//console.log(region_o1);
for(var i=0;i<region_o1.length;i++){
var lines=[];
for(var j=0;j<region_o1[i]["poly"].length;j++){
lines.push(new BMapGL.Point(region_o1[i]["poly"][j][0], region_o1[i]["poly"][j][1]));
}
polygon = new BMapGL.Polygon(lines, {
    strokeColor: '#FFFFFF',
    fillColor:'#000000',
    strokeWeight: 2,
    strokeOpacity: 0.5
});
map.addOverlay(polygon);
}

//蓝色
//console.log(region_o2);
for(var i=0;i<region_o2.length;i++){
var lines=[];
for(var j=0;j<region_o2[i]["poly"].length;j++){
lines.push(new BMapGL.Point(region_o2[i]["poly"][j][0], region_o2[i]["poly"][j][1]));
}
polygon = new BMapGL.Polygon(lines, {
    //strokeColor: 'rgb(0,0,0)',
    //fillColor:'white',
    //strokeWeight: 2,
    //strokeOpacity: 0.5
	strokeColor: '#FFFFFF',
    fillColor:'#000000',
    strokeWeight: 2,
    strokeOpacity: 0.5,
	
});
map.addOverlay(polygon);
}
//橘色
//console.log(region_o3);
for(var i=0;i<region_o3.length;i++){
var lines=[];
for(var j=0;j<region_o3[i]["poly"].length;j++){
lines.push(new BMapGL.Point(region_o3[i]["poly"][j][0], region_o3[i]["poly"][j][1]));
}
polygon = new BMapGL.Polygon(lines, {
    strokeColor: '#FFFFFF',
    fillColor:'#000000',
    strokeWeight: 2,
    strokeOpacity: 0.5
});
map.addOverlay(polygon);
}
//蓝色
for(var i=0;i<region_o4.length;i++){
var lines=[];
for(var j=0;j<region_o4[i]["poly"].length;j++){
lines.push(new BMapGL.Point(region_o4[i]["poly"][j][0], region_o4[i]["poly"][j][1]));
}
polygon = new BMapGL.Polygon(lines, {
    strokeColor: '#FFFFFF',
    fillColor:'#000000',
    strokeWeight: 2,
    strokeOpacity: 0.5
});
///map.addOverlay(polygon);
}

for(var i=0;i<region_o5.length;i++){
for(var j=0;j<region_o5[i]["poly"].length-1;j++){
if(region_o5[i]["poly"][j][0]-region_o5[i]["poly"][j+1][0]>0.5 ||region_o5[i]["poly"][j][0]-region_o5[i]["poly"][j+1][0]<-0.5)
{
//console.log(region_o5[i]);
//console.log(i);
//console.log(region_o5);
break;
}
}
}
//绿色
for(var i=0;i<region_o5.length;i++){
var lines=[];
for(var j=0;j<region_o5[i]["poly"].length;j++){
lines.push(new BMapGL.Point(region_o5[i]["poly"][j][0], region_o5[i]["poly"][j][1]));
}
polygon = new BMapGL.Polygon(lines, {
    strokeColor: '#FFFFFF',
    fillColor:'#000000',
    strokeWeight: 2,
    strokeOpacity: 0.5
});
//map.addOverlay(polygon);
}
}
function loadPoint(flowdata,color){


    var data = [];

    var citys = [
        '北京', '天津', '上海', '重庆', '石家庄', '太原', '呼和浩特', '哈尔滨',
        '长春', '沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州', '郑州',
        '武汉', '长沙', '广州', '南宁', '西安', '银川', '兰州', '西宁', '乌鲁木齐',
        '成都', '贵阳', '昆明', '拉萨', '海口'
    ];

    var randomCount = 300;
      


    // 构造数据
   for(var i=0;i<flowdata.length;i++) {
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
        color:  function (data) {
           if (data.properties.count >= 150) {
                return 'rgb(255,0,0)';
            }
            else if (data.properties.count >=50) {
                return 'rgb(255,165,0)';
            }
            else if (data.properties.count >= 0) {
                return 'rgb(0,255,127)';
            }
            else if (data.properties.count <= -150) {
                return 'rgb(0,0,255)';
            }
            else if (data.properties.count <=-20) {
                return 'rgb(100,149,237)';
            }
            else if (data.properties.count <= 0) {
                return 'rgb(0,255,127)';
            }
        }
    });
	//添加公交站点信息窗口
	for(var p=0;p<flowdata.length;p++){
		
	var opts = {
    position: new BMapGL.Point(flowdata[p][2], flowdata[p][3]), // 指定文本标注所在的地理位置
    offset: new BMapGL.Size(10, -30) // 设置文本偏移量
};
// 创建文本标注对象
var str;
if(flowdata[p][1].substr(0,1)=='B'){
	str=flowdata[p][1].substr(1,flowdata[p][1].length-1)+"公交站"
}
if(flowdata[p][1].substr(0,1)=='R')
{
	str=flowdata[p][1].substr(1,flowdata[p][1].length-1)+"地铁站"
}
var label = new BMapGL.Label(str, opts);  // 创建文本标注对象
        label.setStyle({
             color : "black",
             fontSize : "15px",
             height : "15px",
             lineHeight : "12px",
             fontFamily:"微软雅黑",
			 backgroundColor :"white", //文本标注背景颜色　
			 maxWidth:"none",
			 border:"0"
         });
    map.addOverlay(label);  
	}
return data;
    //view.addLayer(pointLayer);
    //pointLayer.setData(data);
	
	
	
}
function removeAllLayer() {
    for (var i = addedSrcId.length - 1; i >= 0; i--) {
        if (map.getSource(addedSrcId[i])){
            map.removeSource(addedSrcId[i]);
        }
    }

    for (var i = addedLayerId.length - 1; i >= 0; i--) {
        if (map.getLayer(addedLayerId[i])){
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

function drawRoad(loc, time) {
    //var file_name = "/static/data/section1_" + loc + "_" + time.toString() + ".json";
    var layerId = "layer_id_" + loc + "_" + time.toString();
    var layerSrcId = "layerSrc_id_" + loc + "_" + time.toString();

    if(! (loc in node_color))
        node_color[loc] = {}
    if(! (time in node_color[loc])){
        node_color[loc][time] = {}
        source_data[layerSrcId].data.features.forEach(function(feature){
            id = feature.properties.smallid;
            color = feature.properties.color;
            node_color[loc][time][id] = color;
        });
    }
   // map.addSource(layerSrcId, source_data[layerSrcId]);
    //map.addLayer({
    ///    "id": layerId,
    //    "type": "line",
    //    "source": layerSrcId,
    //    "paint": {
     //       "line-color": {"type": "identity", "property": "color"},
     //       "line-width": 6
     //   }
    //});
	//var polyline = new BMapGL.Polyline([
    //new BMapGL.Point(116.399, 39.910),
    //new BMapGL.Point(116.405, 39.920),
    //new BMapGL.Point(116.423493, 39.907445)
//], {
 //   strokeColor: 'blue',
 //   strokeWeight: 2,
 //   strokeOpacity: 0.5
//});
//map.addOverlay(polyline);
    //console.log(source_data[layerSrcId]);
    addedLayerId.push(layerId);
    addedSrcId.push(layerSrcId);
}

function loadRoadData(){
    for (var i = data1.length - 1; i >= 0; i--) {
            //var layerId = "layer_id_" + loc + "_" + time.toString();
            let layerSrcId = "layerSrc_id_" + data1[i]['location'] + "_" + 0;
			source_data[layerSrcId] = roaddata[i];

    }
	console.log("测试source_data");
}

function loadMap(){
    map = new BMapGL.Map("map");
    map.centerAndZoom(new BMapGL.Point(116.384651,39.993915), 14);
	map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
	map.setDisplayOptions({
    poiText: false,  // 隐藏poi标注
    //poiIcon: false,  // 隐藏poi图标
    //building: false  // 隐藏楼块
});
  map.setMapStyleV2({     
  styleId: 'f93e20266be1e44e35abd488256458fe'
});
	
		//alert("load执行了");
        for (var i = data1.length - 1; i >= 0; i--) {
            drawRoad(data1[i]['location'], 0);
        };
	
}

//时间轴
function showTimeline(){
    timelineChart = echarts.init(document.getElementById('timeline'));
    var option = {
        baseOption:{
            timeline:{
                axisType: 'category',
                autoPlay: true,
                playInterval: 2000,
				loop:true,
                lineStyle:{
                    color: 'black',

                },
                controlStyle:{
                    color: 'black',
                    borderColor:'black',
                    borderWidth: 2.0,
                },
                //data: ['0', '1h', '2h', '3h', '4h','5h', '6h', '7h', '8h', '9h','10h', '11h', '12h', '13h', '14h','15h', '16h', '17h', '18h', '19h','20', '21h', '22h', '23h', '24h'],
                data: ['15:00-16:00','16:00-17:00', '17:00-18:00', '18:00-19:00', '活动中', '活动中','活动中','22:00-23:00','23:00-24:00'],
                
				label:{
                    color: 'black',
                    fontSize: 12.5,
                    fontWeight: 'bold',
                }
            }
        }
    };
	




    timelineChart.setOption(option);

    timelineChart.on('timelinechanged', function(timeLineIndex) {
    //    time_idx = params.currentIndex;
    //    cur_time = time_idx;

            //removeAllLayer();
			
     //       for (var i =0;i< flowdata.length;i++) {
				
     //           loadPoint(flowdata[i]);
	//			view.removeLayer(pointLayer);
     //       }
        
        //console.log(node_color);
		var arrIndex = parseInt(timeLineIndex.currentIndex);
		console.log(arrIndex);
		var temp;
		if(arrIndex==0)temp=0;
		else{temp=arrIndex;}
		var data=loadPoint(datamode1[temp],color);
		//console.log(data);
		if(pointLayer){
		view.removeLayer(pointLayer);  
		}		
		view.addLayer(pointLayer);
		pointLayer.setData(data);
		
    });
		

}

