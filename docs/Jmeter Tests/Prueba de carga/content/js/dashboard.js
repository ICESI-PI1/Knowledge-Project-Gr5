/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6535714285714286, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "users-create"], "isController": false}, {"data": [0.0, 500, 1500, "donations-list"], "isController": false}, {"data": [0.005, 500, 1500, "resources-list"], "isController": false}, {"data": [1.0, 500, 1500, "edit_company"], "isController": false}, {"data": [0.52, 500, 1500, "report-generate-1"], "isController": false}, {"data": [0.565, 500, 1500, "report-generate-2"], "isController": false}, {"data": [1.0, 500, 1500, "report-generate-0"], "isController": false}, {"data": [1.0, 500, 1500, "logout"], "isController": false}, {"data": [1.0, 500, 1500, "categories-list-0"], "isController": false}, {"data": [0.5, 500, 1500, "categories-list-1"], "isController": false}, {"data": [0.5, 500, 1500, "categories-list-2"], "isController": false}, {"data": [0.0, 500, 1500, "announcements-categories"], "isController": false}, {"data": [1.0, 500, 1500, "delete_company"], "isController": false}, {"data": [0.005, 500, 1500, "company_detail"], "isController": false}, {"data": [1.0, 500, 1500, "donation-create"], "isController": false}, {"data": [0.5, 500, 1500, "resources-list-1"], "isController": false}, {"data": [0.5, 500, 1500, "resources-list-2"], "isController": false}, {"data": [0.995, 500, 1500, "resources-list-0"], "isController": false}, {"data": [0.115, 500, 1500, "login-1"], "isController": false}, {"data": [1.0, 500, 1500, "login-0"], "isController": false}, {"data": [1.0, 500, 1500, "categories-update"], "isController": false}, {"data": [1.0, 500, 1500, "announcements-delete"], "isController": false}, {"data": [1.0, 500, 1500, "announcementProjects-list-0"], "isController": false}, {"data": [0.51, 500, 1500, "announcementProjects-list-1"], "isController": false}, {"data": [0.51, 500, 1500, "announcementProjects-list-2"], "isController": false}, {"data": [1.0, 500, 1500, "resources-delete"], "isController": false}, {"data": [0.5, 500, 1500, "announcements-list-2"], "isController": false}, {"data": [1.0, 500, 1500, "announcements-list-0"], "isController": false}, {"data": [0.485, 500, 1500, "announcements-categories-2"], "isController": false}, {"data": [0.46, 500, 1500, "announcements-list-1"], "isController": false}, {"data": [0.495, 500, 1500, "announcements-categories-1"], "isController": false}, {"data": [1.0, 500, 1500, "announcements-categories-0"], "isController": false}, {"data": [1.0, 500, 1500, "binnacle-update"], "isController": false}, {"data": [1.0, 500, 1500, "announcementProjects-apply"], "isController": false}, {"data": [0.165, 500, 1500, "Home-2"], "isController": false}, {"data": [0.045, 500, 1500, "announcementProjects-list"], "isController": false}, {"data": [1.0, 500, 1500, "user-update"], "isController": false}, {"data": [0.005, 500, 1500, "login"], "isController": false}, {"data": [1.0, 500, 1500, "binnacle-delete"], "isController": false}, {"data": [1.0, 500, 1500, "Home-0"], "isController": false}, {"data": [0.425, 500, 1500, "Home-1"], "isController": false}, {"data": [1.0, 500, 1500, "register_user"], "isController": false}, {"data": [1.0, 500, 1500, "resources-create"], "isController": false}, {"data": [0.0, 500, 1500, "announcements-list"], "isController": false}, {"data": [0.995, 500, 1500, "users-update"], "isController": false}, {"data": [1.0, 500, 1500, "categories-create"], "isController": false}, {"data": [0.0, 500, 1500, "users-list"], "isController": false}, {"data": [0.005, 500, 1500, "Home"], "isController": false}, {"data": [0.485, 500, 1500, "users-list-2"], "isController": false}, {"data": [1.0, 500, 1500, "user_detail-0"], "isController": false}, {"data": [1.0, 500, 1500, "categories-delete"], "isController": false}, {"data": [0.5, 500, 1500, "user_detail-1"], "isController": false}, {"data": [0.5, 500, 1500, "user_detail-2"], "isController": false}, {"data": [1.0, 500, 1500, "announcements-create"], "isController": false}, {"data": [0.0, 500, 1500, "user_detail"], "isController": false}, {"data": [0.0, 500, 1500, "categories-list"], "isController": false}, {"data": [1.0, 500, 1500, "donations-list-0"], "isController": false}, {"data": [0.5, 500, 1500, "donations-list-1"], "isController": false}, {"data": [0.5, 500, 1500, "donations-list-2"], "isController": false}, {"data": [1.0, 500, 1500, "users-list-0"], "isController": false}, {"data": [0.415, 500, 1500, "users-list-1"], "isController": false}, {"data": [0.04, 500, 1500, "report-generate"], "isController": false}, {"data": [1.0, 500, 1500, "resources-update"], "isController": false}, {"data": [1.0, 500, 1500, "company_detail-0"], "isController": false}, {"data": [0.505, 500, 1500, "company_detail-1"], "isController": false}, {"data": [1.0, 500, 1500, "users-delete"], "isController": false}, {"data": [1.0, 500, 1500, "register_company"], "isController": false}, {"data": [0.5, 500, 1500, "company_detail-2"], "isController": false}, {"data": [1.0, 500, 1500, "binnacle-create"], "isController": false}, {"data": [1.0, 500, 1500, "announcements-update"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 7000, 0, 0.0, 904.6139999999995, 182, 4186, 418.5, 2394.800000000001, 2698.95, 3074.99, 180.3612377934091, 313.5789466903713, 42.923860986575974], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["users-create", 100, 0, 0.0, 221.9399999999999, 184, 415, 199.0, 355.6, 366.5999999999999, 414.8099999999999, 27.68549280177187, 18.24971449335548, 6.27249446290144], "isController": false}, {"data": ["donations-list", 100, 0, 0.0, 2581.390000000001, 2233, 2965, 2641.0, 2772.3, 2875.0999999999995, 2964.99, 11.273957158962796, 51.21723506200677, 5.857173055242391], "isController": false}, {"data": ["resources-list", 100, 0, 0.0, 1902.3600000000006, 1415, 2409, 1882.0, 2200.0, 2381.349999999999, 2408.97, 17.250301880282905, 77.49159047783337, 8.102925004312576], "isController": false}, {"data": ["edit_company", 100, 0, 0.0, 201.89999999999998, 185, 276, 198.5, 214.9, 226.0, 275.6199999999998, 14.634860237084736, 9.832796721791306, 3.501504646568125], "isController": false}, {"data": ["report-generate-1", 100, 0, 0.0, 1013.97, 224, 1196, 1060.5, 1144.9, 1158.0, 1195.8799999999999, 17.205781142463866, 15.575936639710942, 2.7388108654507914], "isController": false}, {"data": ["report-generate-2", 100, 0, 0.0, 894.5299999999997, 212, 1198, 1001.5, 1104.7, 1107.95, 1197.2199999999996, 20.61855670103093, 57.748067010309285, 3.664626288659794], "isController": false}, {"data": ["report-generate-0", 100, 0, 0.0, 210.10000000000002, 193, 250, 206.5, 230.8, 236.95, 249.92999999999995, 17.304031839418585, 14.076424338120782, 2.7544503806887004], "isController": false}, {"data": ["logout", 100, 0, 0.0, 210.57, 183, 397, 198.0, 240.9, 345.8499999999993, 396.66999999999985, 27.129679869777537, 17.72437093054802, 5.987605127509496], "isController": false}, {"data": ["categories-list-0", 100, 0, 0.0, 213.80000000000004, 191, 268, 210.0, 237.0, 242.84999999999997, 267.96, 26.867275658248253, 21.409860290166577, 4.066823952176249], "isController": false}, {"data": ["categories-list-1", 100, 0, 0.0, 1053.4900000000007, 883, 1368, 1022.5, 1196.6, 1316.6499999999994, 1367.93, 21.290185224611456, 19.107109591228443, 3.2226354588034916], "isController": false}, {"data": ["categories-list-2", 100, 0, 0.0, 1162.1499999999999, 908, 1410, 1178.0, 1308.5, 1392.6999999999998, 1409.92, 20.412329046744233, 57.170468462951625, 3.4685012247397426], "isController": false}, {"data": ["announcements-categories", 100, 0, 0.0, 2700.4500000000016, 2341, 3880, 2664.0, 2985.9, 3081.3999999999996, 3876.4399999999982, 13.025921583952066, 59.06186905692328, 6.652887683991143], "isController": false}, {"data": ["delete_company", 100, 0, 0.0, 203.36999999999995, 186, 254, 200.0, 221.9, 225.95, 253.83999999999992, 14.65845793022574, 9.84865142187042, 3.507150579009088], "isController": false}, {"data": ["company_detail", 100, 0, 0.0, 2526.85, 1284, 2924, 2585.5, 2803.0, 2872.0499999999993, 2923.91, 12.679092177000127, 57.14258827817928, 6.141435273234436], "isController": false}, {"data": ["donation-create", 100, 0, 0.0, 201.24000000000004, 184, 270, 196.0, 220.70000000000002, 243.39999999999986, 269.88999999999993, 16.210082671421624, 11.065281042308316, 4.052520667855406], "isController": false}, {"data": ["resources-list-1", 100, 0, 0.0, 814.9199999999997, 539, 1391, 801.0, 1071.0, 1170.9499999999996, 1390.5899999999997, 22.256843979523705, 19.95291286445582, 3.3472206766080568], "isController": false}, {"data": ["resources-list-2", 100, 0, 0.0, 868.7799999999997, 579, 1109, 895.0, 1064.9000000000003, 1090.95, 1108.96, 23.803856224708404, 66.66939419185908, 4.021549928588431], "isController": false}, {"data": ["resources-list-0", 100, 0, 0.0, 218.55999999999997, 192, 603, 206.0, 234.70000000000002, 263.1499999999998, 600.8399999999989, 27.33734281027884, 21.731051804264627, 4.111280071077092], "isController": false}, {"data": ["login-1", 100, 0, 0.0, 1612.6099999999997, 1109, 2099, 1596.5, 1790.4, 1891.0, 2097.9199999999996, 19.120458891013385, 53.55222275334608, 2.744831500956023], "isController": false}, {"data": ["login-0", 100, 0, 0.0, 214.45999999999998, 192, 311, 210.5, 236.0, 260.4999999999999, 310.91999999999996, 25.252525252525253, 19.728535353535353, 3.625118371212121], "isController": false}, {"data": ["categories-update", 100, 0, 0.0, 200.44000000000003, 185, 246, 196.0, 215.8, 235.69999999999993, 245.99, 24.612355402412014, 16.608532795963576, 5.960804824021659], "isController": false}, {"data": ["announcements-delete", 100, 0, 0.0, 209.37, 185, 391, 203.0, 227.9, 245.89999999999998, 390.8399999999999, 20.798668885191347, 14.095972857737106, 5.098111220881863], "isController": false}, {"data": ["announcementProjects-list-0", 100, 0, 0.0, 219.85999999999996, 192, 393, 207.0, 252.80000000000007, 350.3999999999992, 392.96999999999997, 19.77848101265823, 16.321109820015824, 3.2642219640031644], "isController": false}, {"data": ["announcementProjects-list-1", 100, 0, 0.0, 878.6800000000003, 477, 1381, 851.5, 1229.7, 1275.8499999999997, 1380.4799999999998, 16.072002571520414, 14.643728905496625, 2.6525082369013178], "isController": false}, {"data": ["announcementProjects-list-2", 100, 0, 0.0, 857.2799999999999, 489, 1324, 823.5, 1197.8, 1210.75, 1323.79, 16.139444803098776, 45.20305438992899, 2.9631011943189156], "isController": false}, {"data": ["resources-delete", 100, 0, 0.0, 202.26000000000002, 183, 298, 200.0, 217.0, 221.95, 297.25999999999965, 26.427061310782243, 17.80729717230444, 6.374496234143764], "isController": false}, {"data": ["announcements-list-2", 100, 0, 0.0, 1242.47, 787, 1499, 1245.0, 1410.8, 1488.1499999999992, 1499.0, 17.873100983020553, 50.05864611260054, 3.194118632707775], "isController": false}, {"data": ["announcements-list-0", 100, 0, 0.0, 211.8599999999999, 191, 262, 211.0, 230.9, 240.64999999999992, 261.90999999999997, 19.569471624266143, 15.95752813111546, 3.1341731898238745], "isController": false}, {"data": ["announcements-categories-2", 100, 0, 0.0, 1273.0900000000004, 996, 2305, 1293.0, 1410.8, 1425.55, 2299.0999999999967, 16.162922256343947, 45.26880960077582, 2.9516274042346855], "isController": false}, {"data": ["announcements-list-1", 100, 0, 0.0, 1336.5000000000002, 1001, 1696, 1361.5, 1494.6000000000001, 1596.9999999999998, 1695.94, 16.952025767079167, 15.362773351415495, 2.7149728767587726], "isController": false}, {"data": ["announcements-categories-1", 100, 0, 0.0, 1216.3699999999994, 920, 2379, 1211.5, 1364.9, 1407.1499999999996, 2370.1299999999956, 16.18384851917786, 14.729830878782973, 2.6551626476776176], "isController": false}, {"data": ["announcements-categories-0", 100, 0, 0.0, 210.91000000000003, 192, 295, 207.0, 227.9, 243.95, 294.8399999999999, 22.8675966155957, 18.8255702606906, 3.7517150697461696], "isController": false}, {"data": ["binnacle-update", 100, 0, 0.0, 201.68000000000004, 185, 269, 197.0, 221.30000000000004, 232.74999999999994, 268.96, 17.473353136466887, 11.756972959986022, 4.197700069893413], "isController": false}, {"data": ["announcementProjects-apply", 100, 0, 0.0, 203.61999999999998, 186, 274, 199.0, 222.0, 230.89999999999998, 273.7999999999999, 19.116803670426307, 12.937446233989677, 4.6671883961001726], "isController": false}, {"data": ["Home-2", 100, 0, 0.0, 1509.7400000000002, 414, 2129, 1591.0, 1992.4000000000005, 2097.95, 2128.9, 24.078979051288226, 67.43995304599086, 3.6212527088851436], "isController": false}, {"data": ["announcementProjects-list", 100, 0, 0.0, 1955.9499999999998, 1275, 2893, 1928.5, 2448.8, 2590.6499999999996, 2890.4999999999986, 12.919896640826872, 58.61898417312661, 6.636587532299742], "isController": false}, {"data": ["user-update", 100, 0, 0.0, 201.51000000000008, 185, 301, 197.0, 215.0, 228.0, 300.66999999999985, 14.79946721918011, 9.900034223767944, 3.4975303389077994], "isController": false}, {"data": ["login", 100, 0, 0.0, 1827.1400000000006, 1308, 2293, 1801.5, 2005.9, 2116.2, 2292.0899999999997, 18.41959845275373, 65.9795772702155, 5.28843939952109], "isController": false}, {"data": ["binnacle-delete", 100, 0, 0.0, 201.29000000000005, 184, 386, 197.0, 217.70000000000002, 229.84999999999997, 384.75999999999937, 17.470300489168416, 11.754918981481481, 4.196966719077568], "isController": false}, {"data": ["Home-0", 100, 0, 0.0, 325.4699999999999, 217, 456, 295.5, 423.9, 445.95, 456.0, 69.49270326615705, 52.66243919388464, 9.161635684503127], "isController": false}, {"data": ["Home-1", 100, 0, 0.0, 1136.31, 606, 2118, 1137.0, 1706.0000000000005, 1751.6999999999998, 2116.669999999999, 33.7609723160027, 29.6397598750844, 4.450909436191762], "isController": false}, {"data": ["register_user", 100, 0, 0.0, 214.78, 184, 421, 199.5, 236.60000000000002, 354.95, 420.52999999999975, 23.10536044362292, 15.36596724815157, 5.370191196857671], "isController": false}, {"data": ["resources-create", 100, 0, 0.0, 200.28, 183, 312, 197.0, 212.9, 229.69999999999993, 311.6299999999998, 27.74694783573807, 18.642480577136514, 6.638674042730299], "isController": false}, {"data": ["announcements-list", 100, 0, 0.0, 2790.92, 1999, 3284, 2806.0, 3074.7, 3102.85, 3283.94, 14.496955639315743, 65.5619155914758, 7.234320636416353], "isController": false}, {"data": ["users-update", 100, 0, 0.0, 223.29999999999998, 185, 718, 203.0, 349.20000000000005, 367.84999999999997, 714.7699999999984, 27.166530834012494, 17.960684936158653, 6.207976772616137], "isController": false}, {"data": ["categories-create", 100, 0, 0.0, 199.3399999999999, 183, 291, 197.0, 213.70000000000002, 223.95, 290.5499999999998, 24.242424242424242, 16.31155303030303, 5.823863636363637], "isController": false}, {"data": ["users-list", 100, 0, 0.0, 2840.85, 2388, 3434, 2850.5, 3011.9, 3177.3499999999995, 3433.7799999999997, 15.101177891875567, 67.48338870431894, 6.739490524010873], "isController": false}, {"data": ["Home", 100, 0, 0.0, 2972.9500000000003, 1407, 4186, 3053.0, 3773.8, 3946.699999999999, 4184.879999999999, 19.364833462432223, 85.91253751936483, 8.018251355538343], "isController": false}, {"data": ["users-list-2", 100, 0, 0.0, 1261.2800000000002, 801, 1687, 1298.5, 1398.8, 1409.9, 1685.6499999999992, 20.876826722338205, 58.4714248434238, 3.3639418058455113], "isController": false}, {"data": ["user_detail-0", 100, 0, 0.0, 215.84000000000006, 191, 277, 211.5, 238.8, 254.5999999999999, 276.91999999999996, 14.196479273140262, 11.340546919363998, 2.162744889267462], "isController": false}, {"data": ["categories-delete", 100, 0, 0.0, 201.43999999999994, 185, 295, 197.0, 219.40000000000003, 245.89999999999998, 294.8499999999999, 23.691068467187872, 15.986844053541814, 5.737680644397062], "isController": false}, {"data": ["user_detail-1", 100, 0, 0.0, 1200.7600000000002, 960, 1383, 1243.5, 1343.6, 1351.95, 1382.93, 12.40233163834801, 11.14271983132829, 1.8894177105295795], "isController": false}, {"data": ["user_detail-2", 100, 0, 0.0, 1237.4500000000003, 984, 1396, 1233.0, 1325.7, 1372.0, 1396.0, 12.653422750854105, 35.4394691889156, 2.1624501771479188], "isController": false}, {"data": ["announcements-create", 100, 0, 0.0, 206.43000000000004, 185, 264, 202.5, 227.0, 237.0, 263.98, 23.30459100442787, 15.748805639711021, 5.666839023537636], "isController": false}, {"data": ["user_detail", 100, 0, 0.0, 2654.019999999998, 2266, 2887, 2668.0, 2793.6, 2860.75, 2886.96, 10.645092612305728, 47.88212555886736, 5.062656349797743], "isController": false}, {"data": ["categories-list", 100, 0, 0.0, 2429.64, 2007, 2824, 2408.0, 2700.8, 2734.5499999999997, 2823.87, 16.638935108153078, 74.79396318635608, 7.8644966722129785], "isController": false}, {"data": ["donations-list-0", 100, 0, 0.0, 212.95, 193, 306, 208.0, 232.0, 242.79999999999995, 305.9, 14.771048744460856, 12.24669959379616, 2.466649741506647], "isController": false}, {"data": ["donations-list-1", 100, 0, 0.0, 1210.46, 952, 1478, 1239.0, 1331.7, 1365.85, 1477.2899999999997, 13.087292239235703, 11.949822503599005, 2.1854755594817434], "isController": false}, {"data": ["donations-list-2", 100, 0, 0.0, 1157.8799999999999, 988, 1408, 1154.5, 1297.9, 1393.8999999999996, 1407.94, 13.464386697185942, 37.71080180422782, 2.498274875454423], "isController": false}, {"data": ["users-list-0", 100, 0, 0.0, 218.42999999999998, 189, 371, 206.0, 243.10000000000005, 358.74999999999994, 370.96, 22.456770716370983, 17.500491241859418, 3.2018442622950816], "isController": false}, {"data": ["users-list-1", 100, 0, 0.0, 1361.0800000000004, 1057, 1682, 1338.5, 1553.6000000000001, 1593.55, 1681.83, 17.873100983020553, 15.88332216264522, 2.5483132260947277], "isController": false}, {"data": ["report-generate", 100, 0, 0.0, 2118.7, 643, 2581, 2233.0, 2391.7, 2456.1499999999996, 2579.9199999999996, 16.069419893941827, 72.62624538004178, 7.971938775510204], "isController": false}, {"data": ["resources-update", 100, 0, 0.0, 201.20000000000002, 183, 251, 200.0, 218.8, 225.95, 250.83999999999992, 26.364355391510678, 17.76504416029528, 6.35937088056947], "isController": false}, {"data": ["company_detail-0", 100, 0, 0.0, 214.57000000000008, 195, 330, 211.0, 233.0, 249.74999999999994, 329.6299999999998, 19.05850962454736, 15.336144463502954, 2.959280303030303], "isController": false}, {"data": ["company_detail-1", 100, 0, 0.0, 1125.4199999999996, 482, 1461, 1172.0, 1361.5, 1378.6, 1460.4099999999996, 15.710919088766692, 14.161306952081697, 2.439488413197172], "isController": false}, {"data": ["users-delete", 100, 0, 0.0, 206.89, 187, 365, 197.5, 229.70000000000002, 248.29999999999984, 364.93999999999994, 28.35270768358378, 18.744905372838105, 6.47903671675645], "isController": false}, {"data": ["register_company", 100, 0, 0.0, 204.19999999999993, 182, 260, 201.5, 220.0, 235.5999999999999, 259.96999999999997, 19.124115509657678, 12.811663319946453, 4.538242254733219], "isController": false}, {"data": ["company_detail-2", 100, 0, 0.0, 1186.8199999999997, 601, 1402, 1202.0, 1318.7, 1330.9, 1401.94, 13.8811771238201, 38.878140616324266, 2.412938992226541], "isController": false}, {"data": ["binnacle-create", 100, 0, 0.0, 200.96000000000004, 185, 249, 196.0, 220.8, 226.95, 248.7999999999999, 17.024174327545115, 11.421491956077631, 4.05654153898536], "isController": false}, {"data": ["announcements-update", 100, 0, 0.0, 204.90000000000006, 184, 284, 202.0, 228.9, 236.74999999999994, 283.7399999999999, 21.4638334406525, 14.546777742004723, 5.261154485941189], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 7000, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
