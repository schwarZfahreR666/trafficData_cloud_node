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
region_mode1=[
    {"ID": "wx4g8eqd9f3v", "poly": [["116.38683245080864", " 39.99884399687314"], [" 116.40640051121127", " 40.00123648206145"],
 [" 116.40613076764157", " 40.0116938225004"], [" 116.38615400363223", " 40.01379777682655"]], "FlowOut": "12", "FlowIn": "18", "NetFlow": "6"},
{"ID": "wx4dzqb15j2f", "poly": [["116.32807181333327", " 39.894018761761274"], [" 116.33279621618296", " 39.873232647226125"],
 [" 116.33349852281354", " 39.87249124934724"], [" 116.33368639638529", " 39.87245982935269"], [" 116.33837530334304", " 39.87304007406992"],
 [" 116.33885754530205", " 39.904591455986164"], [" 116.33674033791604", " 39.905791575875604"]], "FlowOut": "8", "FlowIn": "9", "NetFlow": "1"},
{"ID": "wx4g956kbxu3", "poly": [["116.40640051121127", " 40.00123648206145"], [" 116.41150752054523", " 39.996946888456264"],
 [" 116.4198921688047", " 40.00214221723744"], [" 116.41739816903876", " 40.0235244582701"], [" 116.41279144157495", " 40.02523110750434"],
 [" 116.40613076764157", " 40.0116938225004"]], "FlowOut": "1", "FlowIn": "2", "NetFlow": "1"},
{"ID": "wx4erhg6jrp9", "poly": [["116.31857643715867", " 39.974188442501635"],
 [" 116.31465605483383", " 39.96756677096173"], [" 116.3152760004971", " 39.96544782339419"], [" 116.33980892758409", " 39.97045450159636"],
 [" 116.3398179717624", " 39.97089874929348"], [" 116.32977381318217", " 39.97888291844971"]], "FlowOut": "7", "FlowIn": "9", "NetFlow": "2"},
{"ID": "wx4ep3zq20p7", "poly": [["116.336030938472", " 39.906721413139756"], [" 116.33618634167766", " 39.91980189901589"],
 [" 116.34507756326873", " 39.92618447560267"], [" 116.35013166386854", " 39.92487791151423"], [" 116.35173301397086", " 39.92308531979975"],
 [" 116.35163667011446", " 39.90377844849085"], [" 116.33885754530205", " 39.904591455986164"], [" 116.33674033791604", " 39.905791575875604"]],
 "FlowOut": "8", "FlowIn": "9", "NetFlow": "1"},
{"ID": "wx4dzpem3fyx", "poly": [["116.32142851033664", " 39.89927314998531"],
 [" 116.32377546107116", " 39.906943151772396"], [" 116.336030938472", " 39.906721413139756"], [" 116.33674033791604", " 39.905791575875604"],
 [" 116.32807181333327", " 39.894018761761274"]],
 "FlowOut": "2", "FlowIn": "4", "NetFlow": "2"}];
mode1_in=[
{"AreaID":"wx4ur6un8zm1","Station":"R安立路","Lng":116.413246,"Lat":40.008831,"15-16":277,"16-17":362,"17-18":555,"18-19":810,"19-20":599,"20-21":244,"21-22":181,"22-23":201,"23-24":26},
{"AreaID":"wx4g8eqd9f3v","Station":"R奥林匹克公园","Lng":116.399208,"Lat":40.007279,"15-16":1187,"16-17":3923,"17-18":8547,"18-19":4484,"19-20":2014,"20-21":915,"21-22":433,"22-23":225,"23-24":68},
{"AreaID":"wx4ur6un8zm1","Station":"B豹房","Lng":116.418348,"Lat":40.01021,"15-16":96,"16-17":153,"17-18":176,"18-19":152,"19-20":120,"20-21":88,"21-22":76,"22-23":49,"23-24":15},
{"AreaID":"wx4dzqb15j2f","Station":"B北京西站","Lng":116.335726,"Lat":39.904248,"15-16":349,"16-17":466,"17-18":514,"18-19":461,"19-20":472,"20-21":275,"21-22":236,"22-23":112,"23-24":42},
{"AreaID":"wx4g8eqd9f3v","Station":"B国家体育馆","Lng":116.399887,"Lat":40.003426,"15-16":15,"16-17":47,"17-18":79,"18-19":62,"19-20":56,"20-21":27,"21-22":8,"22-23":8,"23-24":1},
{"AreaID":"wx4g956kbxu3","Station":"B洼里南口","Lng":116.408081,"Lat":40.009926,"15-16":86,"16-17":126,"17-18":177,"18-19":182,"19-20":138,"20-21":105,"21-22":54,"22-23":30,"23-24":20},
{"AreaID":"wx4erhg6jrp9","Station":"B万泉庄","Lng":116.319753,"Lat":39.973539,"15-16":155,"16-17":202,"17-18":227,"18-19":303,"19-20":186,"20-21":103,"21-22":82,"22-23":34,"23-24":7},
{"AreaID":"wx4ep3zq20p7","Station":"B小马厂","Lng":116.347773,"Lat":39.90444,"15-16":87,"16-17":71,"17-18":122,"18-19":108,"19-20":82,"20-21":59,"21-22":25,"22-23":16,"23-24":3},
{"AreaID":"wx4g8eqd9f3v","Station":"B中科院地理所","Lng":116.395964,"Lat":40.009501,"15-16":62,"16-17":115,"17-18":89,"18-19":141,"19-20":140,"20-21":102,"21-22":44,"22-23":40,"23-24":1},
{"AreaID":"wx4dzpem3fyx","Station":"R北京西站","Lng":116.327931,"Lat":39.90082,"15-16":3876,"16-17":4437,"17-18":6412,"18-19":6185,"19-20":5553,"20-21":5114,"21-22":3239,"22-23":1089,"23-24":280},

];
mode1_out=[
{"AreaID":"wx4ur6un8zm1","Station":"R安立路","Lng":116.413246,"Lat":40.008831,"15-16":428,"16-17":535,"17-18":1288,"18-19":1477,"19-20":747,"20-21":528,"21-22":406,"22-23":412,"23-24":18},
{"AreaID":"wx4g8eqd9f3v","Station":"R奥林匹克公园","Lng":116.399208,"Lat":40.007279,"15-16":1377,"16-17":1771,"17-18":3430,"18-19":3383,"19-20":3062,"20-21":3011,"21-22":3750,"22-23":13016,"23-24":102},
{"AreaID":"wx4ur6un8zm1","Station":"B豹房","Lng":116.418348,"Lat":40.01021,"15-16":87,"16-17":133,"17-18":195,"18-19":156,"19-20":131,"20-21":93,"21-22":45,"22-23":31,"23-24":0},
{"AreaID":"wx4dzqb15j2f","Station":"B北京西站","Lng":116.335726,"Lat":39.904248,"15-16":248,"16-17":278,"17-18":399,"18-19":362,"19-20":241,"20-21":168,"21-22":136,"22-23":68,"23-24":16},
{"AreaID":"wx4g8eqd9f3v","Station":"B国家体育馆","Lng":116.399887,"Lat":40.003426,"15-16":48,"16-17":44,"17-18":77,"18-19":101,"19-20":43,"20-21":24,"21-22":35,"22-23":27,"23-24":0},
{"AreaID":"wx4g956kbxu3","Station":"B洼里南口","Lng":116.408081,"Lat":40.009926,"15-16":145,"16-17":171,"17-18":246,"18-19":190,"19-20":194,"20-21":195,"21-22":245,"22-23":175,"23-24":3},
{"AreaID":"wx4erhg6jrp9","Station":"B万泉庄","Lng":116.319753,"Lat":39.973539,"15-16":182,"16-17":254,"17-18":292,"18-19":357,"19-20":297,"20-21":167,"21-22":141,"22-23":56,"23-24":6},
{"AreaID":"wx4ep3zq20p7","Station":"B小马厂","Lng":116.347773,"Lat":39.90444,"15-16":87,"16-17":71,"17-18":122,"18-19":108,"19-20":82,"20-21":59,"21-22":25,"22-23":16,"23-24":3},
{"AreaID":"wx4g8eqd9f3v","Station":"B中科院地理所","Lng":116.395964,"Lat":40.009501,"15-16":114,"16-17":139,"17-18":221,"18-19":144,"19-20":158,"20-21":89,"21-22":64,"22-23":75,"23-24":5},
{"AreaID":"wx4dzpem3fyx","Station":"R北京西站","Lng":116.327931,"Lat":39.90082,"15-16":3249,"16-17":3690,"17-18":3635,"18-19":3999,"19-20":2547,"20-21":2272,"21-22":4011,"22-23":2262,"23-24":102},

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
	
var pStart = new BMapGL.Point(116.392196,40.018233);
var pEnd = new BMapGL.Point(116.410593,40.031935);
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
    offset: new BMapGL.Size(-75, -20)
};
var label = new BMapGL.Label('奥林匹克森林公园', opts);
label.setStyle({
    color: '#fff',
    borderRadius: '5px',
    borderColor: '#fff',
    backgroundColor: '#79a913',
    fontSize: '30px',
    height: '40px',
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
    map.centerAndZoom(new BMapGL.Point(116.404375,40.013355), 15);
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

