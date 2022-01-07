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
var region_mode1;
var mode1_in;
var mode1_out;

var text1 = $("#area option:selected").text();
var text2 = $("#scale option:selected").text();
var text3 = $("#mode option:selected").text();

//大型活动模式一入客流
region_mode1 = [
    { 'ID': 'wx4epx861cb4', 'poly': [[116.3537006693754, 39.94585003081417], [116.3413469174728, 39.93505781967401], [116.33787997410147, 39.944093886417186], [116.34280844395735, 39.9578664764638], [116.34427581197913, 39.959041188303146], [116.35206007361617, 39.95736061930561]], 'FlowOut': 110846, 'FlowIn': 107648, 'NetFlow': -3198 },
    { 'ID': 'wx4epwebrkgk', 'poly': [[116.3557950171642, 39.94292823829354], [116.3537006693754, 39.94585003081417], [116.3413469174728, 39.93505781967401], [116.34131841878228, 39.93423929352307], [116.34507756326873, 39.92618447560267], [116.35013166386854, 39.92487791151423], [116.3558121383944, 39.93266682541865]], 'FlowOut': 57322, 'FlowIn': 53888, 'NetFlow': -3434 },

    { 'ID': 'wx4er5hv2dj8', 'poly': [[116.31642410866336, 39.95451452662089], [116.31502692897493, 39.958864561032115], [116.3152760004971, 39.96544782339419], [116.33980892758409, 39.97045450159636], [116.34427581197913, 39.959041188303146], [116.34280844395735, 39.9578664764638], [116.31666020258783, 39.95439698068918]], 'FlowOut': 87534, 'FlowIn': 85172, 'NetFlow': -2362 },
    { 'ID': 'wx4er0qnyx0n', 'poly': [[116.32456578412427, 39.94345049318621], [116.33787997410147, 39.944093886417186], [116.34280844395735, 39.9578664764638], [116.31666020258783, 39.95439698068918]], 'FlowOut': 94084, 'FlowIn': 96504, 'NetFlow': 2420 },
    { 'ID': 'wx4epnws1ueb', 'poly': [[116.32483832895052, 39.934090557018955], [116.34131841878228, 39.93423929352307], [116.3413469174728, 39.93505781967401], [116.33787997410147, 39.944093886417186], [116.32456578412427, 39.94345049318621]], 'FlowOut': 61662, 'FlowIn': 72738, 'NetFlow': 11076 },
    { 'ID': 'wx4enye9d6xj', 'poly': [[116.32004313480327, 39.92579542182965], [116.32483832895052, 39.934090557018955], [116.32456578412427, 39.94345049318621], [116.31666020258783, 39.95439698068918], [116.31642410866336, 39.95451452662089], [116.3102086486841, 39.9478711259911], [116.30930951983466, 39.93622183571591], [116.31633171356452, 39.92590850203748]], 'FlowOut': 20332, 'FlowIn': 17288, 'NetFlow': -3044 },
    { 'ID': 'wx4ephyweb9u', 'poly': [[116.33618634167766, 39.91980189901589], [116.34507756326873, 39.92618447560267], [116.34131841878228, 39.93423929352307], [116.32483832895052, 39.934090557018955], [116.32004313480327, 39.92579542182965], [116.32242873603758, 39.92343453196869]], 'FlowOut': 13692, 'FlowIn': 11742, 'NetFlow': -1950 }
];

mode1_in = [
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B西直门外', 'Lng': 116.34816, 'Lat': 39.939739, '15-16': 451, '16-17': 573, '17-18': 567, '18-19': 419, '19-20': 354, '20-21': 330, '21-22': 208, '22-23': 58, '23-24': 10 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B北京交通大学', 'Lng': 116.343361, 'Lat': 39.946705, '15-16': 160, '16-17': 180, '17-18': 182, '18-19': 141, '19-20': 100, '20-21': 95, '21-22': 76, '22-23': 34, '23-24': 0 },
    { 'AreaID': 'wx4epwebrkgk', 'Station': 'R车公庄西', 'Lng': 116.344082, 'Lat': 39.932466, '15-16': 685, '16-17': 771, '17-18': 873, '18-19': 736, '19-20': 564, '20-21': 566, '21-22': 546, '22-23': 307, '23-24': 54 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B北京交通大学东门', 'Lng': 116.347444, 'Lat': 39.953984, '15-16': 150, '16-17': 166, '17-18': 179, '18-19': 156, '19-20': 103, '20-21': 83, '21-22': 76, '22-23': 33, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B白石桥东', 'Lng': 116.329575, 'Lat': 39.938667, '15-16': 701, '16-17': 693, '17-18': 748, '18-19': 631, '19-20': 420, '20-21': 288, '21-22': 159, '22-23': 67, '23-24': 4 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B紫竹院南门', 'Lng': 116.316068, 'Lat': 39.9402, '15-16': 278, '16-17': 290, '17-18': 263, '18-19': 226, '19-20': 181, '20-21': 129, '21-22': 87, '22-23': 37, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B高梁桥', 'Lng': 116.349815, 'Lat': 39.945507, '15-16': 36, '16-17': 42, '17-18': 29, '18-19': 9, '19-20': 8, '20-21': 7, '21-22': 2, '22-23': 1, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'R地铁西直门站', 'Lng': 116.351921, 'Lat': 39.941574, '15-16': 318, '16-17': 350, '17-18': 354, '18-19': 260, '19-20': 144, '20-21': 111, '21-22': 85, '22-23': 35, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B动物园枢纽站', 'Lng': 116.339987, 'Lat': 39.937291, '15-16': 182, '16-17': 182, '17-18': 199, '18-19': 157, '19-20': 94, '20-21': 58, '21-22': 48, '22-23': 28, '23-24': 3 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B二里沟西口', 'Lng': 116.332489, 'Lat': 39.932457, '15-16': 58, '16-17': 44, '17-18': 48, '18-19': 49, '19-20': 39, '20-21': 31, '21-22': 21, '22-23': 8, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B大柳树南站', 'Lng': 116.336931, 'Lat': 39.950317, '15-16': 85, '16-17': 99, '17-18': 78, '18-19': 56, '19-20': 44, '20-21': 35, '21-22': 38, '22-23': 22, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B大慧寺路东口', 'Lng': 116.33448, 'Lat': 39.952183, '15-16': 62, '16-17': 73, '17-18': 60, '18-19': 43, '19-20': 34, '20-21': 38, '21-22': 26, '22-23': 2, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B白石桥西', 'Lng': 116.323189, 'Lat': 39.939186, '15-16': 89, '16-17': 74, '17-18': 71, '18-19': 62, '19-20': 36, '20-21': 23, '21-22': 12, '22-23': 3, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B中央民族大学', 'Lng': 116.324371, 'Lat': 39.948238, '15-16': 474, '16-17': 469, '17-18': 433, '18-19': 363, '19-20': 261, '20-21': 186, '21-22': 108, '22-23': 26, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'R二里沟', 'Lng': 116.333517, 'Lat': 39.933844, '15-16': 62, '16-17': 78, '17-18': 71, '18-19': 49, '19-20': 33, '20-21': 13, '21-22': 7, '22-23': 5, '23-24': 2 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B皂君东里', 'Lng': 116.335022, 'Lat': 39.960143, '15-16': 91, '16-17': 81, '17-18': 85, '18-19': 74, '19-20': 51, '20-21': 27, '21-22': 8, '22-23': 1, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B北下关', 'Lng': 116.348282, 'Lat': 39.945061, '15-16': 109, '16-17': 113, '17-18': 102, '18-19': 100, '19-20': 84, '20-21': 46, '21-22': 35, '22-23': 14, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B北京展览馆', 'Lng': 116.343063, 'Lat': 39.936848, '15-16': 67, '16-17': 86, '17-18': 80, '18-19': 87, '19-20': 84, '20-21': 45, '21-22': 25, '22-23': 14, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B中苑宾馆', 'Lng': 116.337761, 'Lat': 39.947475, '15-16': 94, '16-17': 102, '17-18': 78, '18-19': 93, '19-20': 116, '20-21': 80, '21-22': 49, '22-23': 24, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B外文印刷厂', 'Lng': 116.322327, 'Lat': 39.93243, '15-16': 143, '16-17': 128, '17-18': 107, '18-19': 49, '19-20': 60, '20-21': 49, '21-22': 35, '22-23': 22, '23-24': 5 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B四道口东', 'Lng': 116.326889, 'Lat': 39.93235, '15-16': 150, '16-17': 131, '17-18': 118, '18-19': 94, '19-20': 78, '20-21': 76, '21-22': 62, '22-23': 20, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B大柳树北站', 'Lng': 116.33567, 'Lat': 39.953804, '15-16': 117, '16-17': 121, '17-18': 155, '18-19': 130, '19-20': 72, '20-21': 59, '21-22': 43, '22-23': 17, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B皂君庙', 'Lng': 116.340988, 'Lat': 39.957878, '15-16': 111, '16-17': 107, '17-18': 113, '18-19': 78, '19-20': 69, '20-21': 76, '21-22': 49, '22-23': 21, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B中国农业科学院南门', 'Lng': 116.327405, 'Lat': 39.957075, '15-16': 84, '16-17': 86, '17-18': 83, '18-19': 66, '19-20': 37, '20-21': 46, '21-22': 41, '22-23': 12, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B交大东路北口', 'Lng': 116.34668, 'Lat': 39.956641, '15-16': 28, '16-17': 34, '17-18': 54, '18-19': 40, '19-20': 21, '20-21': 17, '21-22': 10, '22-23': 9, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B百万庄', 'Lng': 116.333794, 'Lat': 39.931461, '15-16': 57, '16-17': 55, '17-18': 51, '18-19': 35, '19-20': 45, '20-21': 35, '21-22': 33, '22-23': 24, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B白石桥北', 'Lng': 116.325523, 'Lat': 39.940926, '15-16': 4, '16-17': 6, '17-18': 7, '18-19': 3, '19-20': 0, '20-21': 1, '21-22': 1, '22-23': 0, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B交大东路', 'Lng': 116.348557, 'Lat': 39.949921, '15-16': 22, '16-17': 49, '17-18': 50, '18-19': 18, '19-20': 15, '20-21': 14, '21-22': 14, '22-23': 8, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B中新小区', 'Lng': 116.319794, 'Lat': 39.937153, '15-16': 11, '16-17': 5, '17-18': 6, '18-19': 8, '19-20': 12, '20-21': 6, '21-22': 1, '22-23': 1, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B大慧寺路西口', 'Lng': 116.327042, 'Lat': 39.951759, '15-16': 56, '16-17': 63, '17-18': 66, '18-19': 54, '19-20': 35, '20-21': 37, '21-22': 29, '22-23': 4, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B四道口北', 'Lng': 116.325556, 'Lat': 39.933819, '15-16': 22, '16-17': 22, '17-18': 8, '18-19': 5, '19-20': 3, '20-21': 14, '21-22': 15, '22-23': 3, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B皂君庙西站', 'Lng': 116.333427, 'Lat': 39.957523, '15-16': 91, '16-17': 94, '17-18': 144, '18-19': 132, '19-20': 64, '20-21': 67, '21-22': 58, '22-23': 19, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B二里沟东口', 'Lng': 116.342438, 'Lat': 39.932381, '15-16': 125, '16-17': 135, '17-18': 150, '18-19': 120, '19-20': 103, '20-21': 116, '21-22': 114, '22-23': 52, '23-24': 9 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B大慧寺', 'Lng': 116.330383, 'Lat': 39.951946, '15-16': 45, '16-17': 33, '17-18': 53, '18-19': 51, '19-20': 29, '20-21': 37, '21-22': 25, '22-23': 5, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B郝家湾', 'Lng': 116.337463, 'Lat': 39.932472, '15-16': 37, '16-17': 41, '17-18': 34, '18-19': 30, '19-20': 28, '20-21': 34, '21-22': 27, '22-23': 9, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B皂君庙东站', 'Lng': 116.344116, 'Lat': 39.958054, '15-16': 61, '16-17': 47, '17-18': 44, '18-19': 59, '19-20': 52, '20-21': 27, '21-22': 32, '22-23': 22, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B慈献寺桥', 'Lng': 116.341965, 'Lat': 39.947102, '15-16': 19, '16-17': 28, '17-18': 30, '18-19': 21, '19-20': 18, '20-21': 32, '21-22': 36, '22-23': 12, '23-24': 0 }
];

mode1_out = [
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B西直门外', 'Lng': 116.34816, 'Lat': 39.939739, '15-16': 768, '16-17': 813, '17-18': 696, '18-19': 516, '19-20': 459, '20-21': 415, '21-22': 305, '22-23': 126, '23-24': 5 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'R地铁西直门站', 'Lng': 116.351921, 'Lat': 39.941574, '15-16': 252, '16-17': 262, '17-18': 274, '18-19': 269, '19-20': 221, '20-21': 202, '21-22': 178, '22-23': 76, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B北京交通大学', 'Lng': 116.343361, 'Lat': 39.946705, '15-16': 155, '16-17': 165, '17-18': 189, '18-19': 152, '19-20': 100, '20-21': 78, '21-22': 37, '22-23': 8, '23-24': 1 },
    { 'AreaID': 'wx4epwebrkgk', 'Station': 'R车公庄西', 'Lng': 116.344082, 'Lat': 39.932466, '15-16': 966, '16-17': 1131, '17-18': 1138, '18-19': 831, '19-20': 512, '20-21': 485, '21-22': 444, '22-23': 214, '23-24': 14 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B北京交通大学东门', 'Lng': 116.347444, 'Lat': 39.953984, '15-16': 226, '16-17': 189, '17-18': 216, '18-19': 179, '19-20': 114, '20-21': 118, '21-22': 63, '22-23': 11, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B大柳树南站', 'Lng': 116.336931, 'Lat': 39.950317, '15-16': 119, '16-17': 115, '17-18': 83, '18-19': 75, '19-20': 56, '20-21': 33, '21-22': 19, '22-23': 14, '23-24': 5 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B白石桥东', 'Lng': 116.329575, 'Lat': 39.938667, '15-16': 670, '16-17': 691, '17-18': 631, '18-19': 521, '19-20': 387, '20-21': 311, '21-22': 265, '22-23': 135, '23-24': 5 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B紫竹院南门', 'Lng': 116.316068, 'Lat': 39.9402, '15-16': 461, '16-17': 444, '17-18': 404, '18-19': 355, '19-20': 258, '20-21': 193, '21-22': 105, '22-23': 19, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B交大东路北口', 'Lng': 116.34668, 'Lat': 39.956641, '15-16': 51, '16-17': 61, '17-18': 68, '18-19': 44, '19-20': 38, '20-21': 45, '21-22': 30, '22-23': 14, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B二里沟东口', 'Lng': 116.342438, 'Lat': 39.932381, '15-16': 150, '16-17': 138, '17-18': 181, '18-19': 140, '19-20': 80, '20-21': 74, '21-22': 55, '22-23': 24, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B外文印刷厂', 'Lng': 116.322327, 'Lat': 39.93243, '15-16': 62, '16-17': 69, '17-18': 64, '18-19': 40, '19-20': 35, '20-21': 28, '21-22': 51, '22-23': 39, '23-24': 2 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B北下关', 'Lng': 116.348282, 'Lat': 39.945061, '15-16': 107, '16-17': 96, '17-18': 86, '18-19': 93, '19-20': 83, '20-21': 47, '21-22': 17, '22-23': 10, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B大慧寺路西口', 'Lng': 116.327042, 'Lat': 39.951759, '15-16': 91, '16-17': 92, '17-18': 84, '18-19': 46, '19-20': 18, '20-21': 35, '21-22': 30, '22-23': 3, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B慈献寺桥', 'Lng': 116.341965, 'Lat': 39.947102, '15-16': 80, '16-17': 89, '17-18': 83, '18-19': 46, '19-20': 26, '20-21': 19, '21-22': 10, '22-23': 4, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B皂君庙西站', 'Lng': 116.333427, 'Lat': 39.957523, '15-16': 62, '16-17': 86, '17-18': 87, '18-19': 51, '19-20': 15, '20-21': 32, '21-22': 39, '22-23': 12, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B大柳树北站', 'Lng': 116.33567, 'Lat': 39.953804, '15-16': 120, '16-17': 149, '17-18': 156, '18-19': 118, '19-20': 71, '20-21': 69, '21-22': 47, '22-23': 10, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B中国农业科学院南门', 'Lng': 116.327405, 'Lat': 39.957075, '15-16': 102, '16-17': 120, '17-18': 118, '18-19': 80, '19-20': 53, '20-21': 62, '21-22': 62, '22-23': 25, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B大慧寺路东口', 'Lng': 116.33448, 'Lat': 39.952183, '15-16': 85, '16-17': 101, '17-18': 77, '18-19': 51, '19-20': 37, '20-21': 24, '21-22': 20, '22-23': 9, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B中央民族大学', 'Lng': 116.324371, 'Lat': 39.948238, '15-16': 360, '16-17': 357, '17-18': 353, '18-19': 307, '19-20': 203, '20-21': 201, '21-22': 173, '22-23': 61, '23-24': 3 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B四道口东', 'Lng': 116.326889, 'Lat': 39.93235, '15-16': 161, '16-17': 187, '17-18': 193, '18-19': 139, '19-20': 129, '20-21': 123, '21-22': 67, '22-23': 18, '23-24': 9 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B动物园枢纽站', 'Lng': 116.339987, 'Lat': 39.937291, '15-16': 60, '16-17': 57, '17-18': 44, '18-19': 28, '19-20': 19, '20-21': 19, '21-22': 9, '22-23': 4, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B郝家湾', 'Lng': 116.337463, 'Lat': 39.932472, '15-16': 46, '16-17': 42, '17-18': 51, '18-19': 31, '19-20': 14, '20-21': 18, '21-22': 11, '22-23': 4, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B皂君东里', 'Lng': 116.335022, 'Lat': 39.960143, '15-16': 85, '16-17': 114, '17-18': 118, '18-19': 77, '19-20': 71, '20-21': 74, '21-22': 44, '22-23': 18, '23-24': 2 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B皂君庙东站', 'Lng': 116.344116, 'Lat': 39.958054, '15-16': 33, '16-17': 37, '17-18': 28, '18-19': 14, '19-20': 10, '20-21': 11, '21-22': 23, '22-23': 16, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B白石桥西', 'Lng': 116.323189, 'Lat': 39.939186, '15-16': 172, '16-17': 222, '17-18': 183, '18-19': 140, '19-20': 99, '20-21': 91, '21-22': 93, '22-23': 41, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'R二里沟', 'Lng': 116.333517, 'Lat': 39.933844, '15-16': 91, '16-17': 77, '17-18': 57, '18-19': 59, '19-20': 60, '20-21': 44, '21-22': 46, '22-23': 28, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B百万庄', 'Lng': 116.333794, 'Lat': 39.931461, '15-16': 50, '16-17': 64, '17-18': 85, '18-19': 73, '19-20': 48, '20-21': 29, '21-22': 16, '22-23': 2, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B二里沟西口', 'Lng': 116.332489, 'Lat': 39.932457, '15-16': 76, '16-17': 59, '17-18': 47, '18-19': 52, '19-20': 42, '20-21': 25, '21-22': 31, '22-23': 35, '23-24': 13 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B四道口北', 'Lng': 116.325556, 'Lat': 39.933819, '15-16': 6, '16-17': 11, '17-18': 7, '18-19': 2, '19-20': 2, '20-21': 2, '21-22': 1, '22-23': 0, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B交大东路', 'Lng': 116.348557, 'Lat': 39.949921, '15-16': 10, '16-17': 6, '17-18': 5, '18-19': 2, '19-20': 2, '20-21': 4, '21-22': 3, '22-23': 1, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B白石桥北', 'Lng': 116.325523, 'Lat': 39.940926, '15-16': 15, '16-17': 10, '17-18': 27, '18-19': 28, '19-20': 8, '20-21': 9, '21-22': 4, '22-23': 0, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B新苑街', 'Lng': 116.331107, 'Lat': 39.93599, '15-16': 54, '16-17': 43, '17-18': 47, '18-19': 22, '19-20': 9, '20-21': 4, '21-22': 6, '22-23': 5, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B中苑宾馆', 'Lng': 116.337761, 'Lat': 39.947475, '15-16': 76, '16-17': 76, '17-18': 65, '18-19': 46, '19-20': 30, '20-21': 10, '21-22': 7, '22-23': 3, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B高梁桥', 'Lng': 116.349815, 'Lat': 39.945507, '15-16': 44, '16-17': 42, '17-18': 37, '18-19': 28, '19-20': 15, '20-21': 3, '21-22': 2, '22-23': 2, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B北京展览馆', 'Lng': 116.343063, 'Lat': 39.936848, '15-16': 108, '16-17': 121, '17-18': 131, '18-19': 97, '19-20': 75, '20-21': 46, '21-22': 20, '22-23': 11, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B皂君庙', 'Lng': 116.340988, 'Lat': 39.957878, '15-16': 184, '16-17': 189, '17-18': 186, '18-19': 128, '19-20': 70, '20-21': 116, '21-22': 85, '22-23': 12, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B大慧寺', 'Lng': 116.330383, 'Lat': 39.951946, '15-16': 28, '16-17': 41, '17-18': 45, '18-19': 30, '19-20': 18, '20-21': 30, '21-22': 20, '22-23': 7, '23-24': 5 }];

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
        for (var i = 0; i < mode1_in.length; i++) {
            var temp = [];
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
    for (var t = 4; t < 7; t++) {
        var data = [];
        for (var i = 0; i < mode1_in.length; i++) {
            var temp = [];
            temp.push(mode1_in[i]['AreaID']);
            temp.push(mode1_in[i]['Station']);
            temp.push(parseFloat(mode1_in[i]['Lng']));
            temp.push(parseFloat(mode1_in[i]['Lat']));
            temp.push(parseInt(mode1_in[i][time[t]]) - parseInt(mode1_out[i][time[t]]));

            data.push(temp);

        }
        datamode1.push(data);
    }
    //散场后
    for (var t = 7; t < 9; t++) {
        var data = [];
        for (var i = 0; i < mode1_in.length; i++) {
            var temp = [];
            temp.push(mode1_in[i]['AreaID']);
            temp.push(mode1_in[i]['Station']);
            temp.push(parseFloat(mode1_in[i]['Lng']));
            temp.push(parseFloat(mode1_in[i]['Lat']));
            temp.push(-1 * parseInt(mode1_out[i][time[t]]));

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

    var pStart = new BMapGL.Point(116.332298, 39.944629);
    var pEnd = new BMapGL.Point(116.335756, 39.947671);
    var bounds = new BMapGL.Bounds(new BMapGL.Point(pStart.lng, pEnd.lat), new BMapGL.Point(pEnd.lng, pStart.lat));
    var canvasOverlay = new BMapGL.GroundOverlay(bounds, {
        type: 'canvas',
        url: getTextureCanvas(),
        opacity: 0.9
    });
    map.addOverlay(canvasOverlay);

    // 添加文本标注
    var opts = {
        position: new BMapGL.Point(116.333789, 39.944248),
        offset: new BMapGL.Size(-40, -10)
    };
    var label = new BMapGL.Label('首都体育馆', opts);
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
    for (var i = 0; i < region_mode1.length; i++) {
        if (Math.abs(region_mode1[i]["NetFlow"]) >= 300) {
            region_o1.push(region_mode1[i]);
        }
        else if (Math.abs(region_mode1[i]["NetFlow"]) >= 100) {
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
    map.centerAndZoom(new BMapGL.Point(116.333933, 39.945935), 15);
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

