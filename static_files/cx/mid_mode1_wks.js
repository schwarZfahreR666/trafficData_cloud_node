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

mode1_in = [
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

mode1_out = [
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B万寿庄', 'Lng': 116.29596422334176, 'Lat': 39.91915483590961, '15-16': 9, '16-17': 12, '17-18': 6, '18-19': 9, '19-20': 10, '20-21': 3, '21-22': 2, '22-23': 0, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B万寿庄西', 'Lng': 116.29093386408023, 'Lat': 39.919194899467286, '15-16': 37, '16-17': 21, '17-18': 11, '18-19': 7, '19-20': 9, '20-21': 6, '21-22': 2, '22-23': 2, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B万寿路口西', 'Lng': 116.29983553720946, 'Lat': 39.91367361600812, '15-16': 262, '16-17': 309, '17-18': 342, '18-19': 273, '19-20': 214, '20-21': 142, '21-22': 84, '22-23': 32, '23-24': 6 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B东翠路口', 'Lng': 116.29401846827753, 'Lat': 39.91383185984961, '15-16': 114, '16-17': 178, '17-18': 188, '18-19': 112, '19-20': 72, '20-21': 53, '21-22': 35, '22-23': 12, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B五棵松桥东', 'Lng': 116.28438877025637, 'Lat': 39.91375049644393, '15-16': 151, '16-17': 168, '17-18': 206, '18-19': 163, '19-20': 87, '20-21': 56, '21-22': 69, '22-23': 47, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B五棵松桥北', 'Lng': 116.28067703132857, 'Lat': 39.915269473119444, '15-16': 205, '16-17': 198, '17-18': 243, '18-19': 218, '19-20': 173, '20-21': 131, '21-22': 47, '22-23': 5, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B五棵松桥南', 'Lng': 116.28072432344378, 'Lat': 39.912673526667824, '15-16': 406, '16-17': 479, '17-18': 528, '18-19': 528, '19-20': 389, '20-21': 223, '21-22': 88, '22-23': 15, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B五棵松桥西', 'Lng': 116.27957964900911, 'Lat': 39.913715485428774, '15-16': 85, '16-17': 121, '17-18': 110, '18-19': 96, '19-20': 83, '20-21': 51, '21-22': 22, '22-23': 8, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B北太平路东口', 'Lng': 116.27385746894687, 'Lat': 39.91006095487206, '15-16': 39, '16-17': 32, '17-18': 23, '18-19': 10, '19-20': 19, '20-21': 25, '21-22': 10, '22-23': 2, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B北沙沟', 'Lng': 116.28979591310637, 'Lat': 39.92425900485057, '15-16': 42, '16-17': 46, '17-18': 40, '18-19': 36, '19-20': 28, '20-21': 13, '21-22': 11, '22-23': 0, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B定慧桥南', 'Lng': 116.2819093832214, 'Lat': 39.927891500400044, '15-16': 357, '16-17': 470, '17-18': 481, '18-19': 281, '19-20': 135, '20-21': 84, '21-22': 45, '22-23': 24, '23-24': 7 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B永定路口东', 'Lng': 116.27204541256646, 'Lat': 39.913646309977345, '15-16': 373, '16-17': 478, '17-18': 575, '18-19': 360, '19-20': 245, '20-21': 228, '21-22': 113, '22-23': 33, '23-24': 11 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B永定路口北', 'Lng': 116.27109458872644, 'Lat': 39.91588041916751, '15-16': 185, '16-17': 179, '17-18': 164, '18-19': 106, '19-20': 77, '20-21': 55, '21-22': 35, '22-23': 18, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B永定路口南', 'Lng': 116.27105249904614, 'Lat': 39.91182608304334, '15-16': 117, '16-17': 121, '17-18': 174, '18-19': 165, '19-20': 125, '20-21': 108, '21-22': 55, '22-23': 7, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B沙沟路口东', 'Lng': 116.29157151789498, 'Lat': 39.91374657685537, '15-16': 62, '16-17': 56, '17-18': 80, '18-19': 90, '19-20': 54, '20-21': 35, '21-22': 30, '22-23': 9, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B沙沟路口北', 'Lng': 116.28969629495678, 'Lat': 39.9179198764393, '15-16': 23, '16-17': 50, '17-18': 57, '18-19': 30, '19-20': 19, '20-21': 39, '21-22': 29, '22-23': 0, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B沙沟路口西', 'Lng': 116.28834876098377, 'Lat': 39.91375352629281, '15-16': 92, '16-17': 91, '17-18': 100, '18-19': 69, '19-20': 59, '20-21': 53, '21-22': 31, '22-23': 17, '23-24': 3 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B沙窝桥东', 'Lng': 116.28164472521865, 'Lat': 39.90658005970777, '15-16': 128, '16-17': 134, '17-18': 114, '18-19': 121, '19-20': 110, '20-21': 84, '21-22': 70, '22-23': 20, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B沙窝桥北', 'Lng': 116.28070281226233, 'Lat': 39.908090907535076, '15-16': 195, '16-17': 246, '17-18': 265, '18-19': 254, '19-20': 165, '20-21': 79, '21-22': 47, '22-23': 19, '23-24': 1 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B沙窝桥西', 'Lng': 116.27869066204863, 'Lat': 39.90655477676362, '15-16': 49, '16-17': 54, '17-18': 54, '18-19': 44, '19-20': 30, '20-21': 23, '21-22': 12, '22-23': 1, '23-24': 0 },
    { 'AreaID': 'wx4ejw13ry48', 'Station': 'R田村', 'Lng': 116.25937688493883, 'Lat': 39.93554951154278, '15-16': 195, '16-17': 213, '17-18': 215, '18-19': 203, '19-20': 196, '20-21': 116, '21-22': 54, '22-23': 24, '23-24': 3 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B西翠路口东', 'Lng': 116.29352030179032, 'Lat': 39.906573733537634, '15-16': 123, '16-17': 135, '17-18': 146, '18-19': 103, '19-20': 72, '20-21': 33, '21-22': 14, '22-23': 11, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B西翠路口北', 'Lng': 116.28969107587908, 'Lat': 39.90736727582161, '15-16': 1, '16-17': 10, '17-18': 17, '18-19': 9, '19-20': 5, '20-21': 21, '21-22': 17, '22-23': 0, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B西翠路口西', 'Lng': 116.28712616526019, 'Lat': 39.90657549882319, '15-16': 56, '16-17': 52, '17-18': 59, '18-19': 46, '19-20': 26, '20-21': 20, '21-22': 22, '22-23': 14, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B金沟河', 'Lng': 116.2808605522285, 'Lat': 39.923241378826155, '15-16': 261, '16-17': 483, '17-18': 559, '18-19': 334, '19-20': 187, '20-21': 119, '21-22': 60, '22-23': 14, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B金沟河东路', 'Lng': 116.2877144693706, 'Lat': 39.923956798656064, '15-16': 6, '16-17': 4, '17-18': 5, '18-19': 4, '19-20': 1, '20-21': 2, '21-22': 1, '22-23': 0, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B金沟河桥南', 'Lng': 116.28093969860848, 'Lat': 39.91994655725097, '15-16': 31, '16-17': 49, '17-18': 59, '18-19': 26, '19-20': 27, '20-21': 24, '21-22': 17, '22-23': 12, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B金沟河路', 'Lng': 116.27443185478224, 'Lat': 39.923933475432456, '15-16': 43, '16-17': 63, '17-18': 69, '18-19': 38, '19-20': 13, '20-21': 8, '21-22': 5, '22-23': 1, '23-24': 0 },
    { 'AreaID': 'wx43zpy0d434', 'Station': 'B金沟河路东口', 'Lng': 116.2798101060646, 'Lat': 39.9240442350266, '15-16': 38, '16-17': 73, '17-18': 60, '18-19': 37, '19-20': 46, '20-21': 33, '21-22': 13, '22-23': 2, '23-24': 0 }
];

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
            console.log(i);
            console.log(mode1_in[i][time[t]]);
            console.log(mode1_out[i][time[t]]);
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

