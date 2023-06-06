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

    var data = {"OkPercent": 99.99800869536358, "KoPercent": 0.0019913046364209617};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6670040821745047, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "users-create"], "isController": false}, {"data": [0.0014285714285714286, 500, 1500, "donations-list"], "isController": false}, {"data": [0.01182355616189177, 500, 1500, "resources-list"], "isController": false}, {"data": [1.0, 500, 1500, "edit_company"], "isController": false}, {"data": [0.4911904761904762, 500, 1500, "report-generate-1"], "isController": false}, {"data": [0.4816666666666667, 500, 1500, "report-generate-2"], "isController": false}, {"data": [0.9997619047619047, 500, 1500, "report-generate-0"], "isController": false}, {"data": [0.9993178717598908, 500, 1500, "logout"], "isController": false}, {"data": [1.0, 500, 1500, "categories-list-0"], "isController": false}, {"data": [0.4988605287146764, 500, 1500, "categories-list-1"], "isController": false}, {"data": [0.4984047402005469, 500, 1500, "categories-list-2"], "isController": false}, {"data": [9.191176470588235E-4, 500, 1500, "announcements-categories"], "isController": false}, {"data": [1.0, 500, 1500, "delete_company"], "isController": false}, {"data": [0.010194404931247037, 500, 1500, "company_detail"], "isController": false}, {"data": [1.0, 500, 1500, "donation-create"], "isController": false}, {"data": [0.4954524783992724, 500, 1500, "resources-list-1"], "isController": false}, {"data": [0.49704411095952705, 500, 1500, "resources-list-2"], "isController": false}, {"data": [1.0, 500, 1500, "resources-list-0"], "isController": false}, {"data": [0.4734090909090909, 500, 1500, "login-1"], "isController": false}, {"data": [1.0, 500, 1500, "login-0"], "isController": false}, {"data": [0.9997706422018349, 500, 1500, "categories-update"], "isController": false}, {"data": [1.0, 500, 1500, "announcements-delete"], "isController": false}, {"data": [0.9997644842204427, 500, 1500, "announcementProjects-list-0"], "isController": false}, {"data": [0.4952896844088554, 500, 1500, "announcementProjects-list-1"], "isController": false}, {"data": [0.49340555817239756, 500, 1500, "announcementProjects-list-2"], "isController": false}, {"data": [1.0, 500, 1500, "resources-delete"], "isController": false}, {"data": [0.48766868310842254, 500, 1500, "announcements-list-2"], "isController": false}, {"data": [0.9995346672871103, 500, 1500, "announcements-list-0"], "isController": false}, {"data": [0.49011948529411764, 500, 1500, "announcements-categories-2"], "isController": false}, {"data": [0.49092601209865055, 500, 1500, "announcements-list-1"], "isController": false}, {"data": [0.4914981617647059, 500, 1500, "announcements-categories-1"], "isController": false}, {"data": [1.0, 500, 1500, "announcements-categories-0"], "isController": false}, {"data": [1.0, 500, 1500, "binnacle-update"], "isController": false}, {"data": [1.0, 500, 1500, "announcementProjects-apply"], "isController": false}, {"data": [0.46748522055479763, 500, 1500, "Home-2"], "isController": false}, {"data": [0.00730098916627414, 500, 1500, "announcementProjects-list"], "isController": false}, {"data": [1.0, 500, 1500, "user-update"], "isController": false}, {"data": [0.3925, 500, 1500, "login"], "isController": false}, {"data": [1.0, 500, 1500, "binnacle-delete"], "isController": false}, {"data": [0.9981818181818182, 500, 1500, "Home-0"], "isController": false}, {"data": [0.4743181818181818, 500, 1500, "Home-1"], "isController": false}, {"data": [1.0, 500, 1500, "register_user"], "isController": false}, {"data": [1.0, 500, 1500, "resources-create"], "isController": false}, {"data": [9.306654257794323E-4, 500, 1500, "announcements-list"], "isController": false}, {"data": [1.0, 500, 1500, "users-update"], "isController": false}, {"data": [1.0, 500, 1500, "categories-create"], "isController": false}, {"data": [0.0, 500, 1500, "users-list"], "isController": false}, {"data": [9.090909090909091E-4, 500, 1500, "Home"], "isController": false}, {"data": [0.48454545454545456, 500, 1500, "users-list-2"], "isController": false}, {"data": [0.9997622444127438, 500, 1500, "user_detail-0"], "isController": false}, {"data": [1.0, 500, 1500, "categories-delete"], "isController": false}, {"data": [0.49595815501664287, 500, 1500, "user_detail-1"], "isController": false}, {"data": [0.49595815501664287, 500, 1500, "user_detail-2"], "isController": false}, {"data": [0.9997653683716565, 500, 1500, "announcements-create"], "isController": false}, {"data": [0.003566333808844508, 500, 1500, "user_detail"], "isController": false}, {"data": [0.004557885141294439, 500, 1500, "categories-list"], "isController": false}, {"data": [0.9990476190476191, 500, 1500, "donations-list-0"], "isController": false}, {"data": [0.49333333333333335, 500, 1500, "donations-list-1"], "isController": false}, {"data": [0.49452380952380953, 500, 1500, "donations-list-2"], "isController": false}, {"data": [1.0, 500, 1500, "users-list-0"], "isController": false}, {"data": [0.4784090909090909, 500, 1500, "users-list-1"], "isController": false}, {"data": [0.0035714285714285713, 500, 1500, "report-generate"], "isController": false}, {"data": [1.0, 500, 1500, "resources-update"], "isController": false}, {"data": [1.0, 500, 1500, "company_detail-0"], "isController": false}, {"data": [0.4973921289710763, 500, 1500, "company_detail-1"], "isController": false}, {"data": [1.0, 500, 1500, "users-delete"], "isController": false}, {"data": [1.0, 500, 1500, "register_company"], "isController": false}, {"data": [0.4971550497866287, 500, 1500, "company_detail-2"], "isController": false}, {"data": [1.0, 500, 1500, "binnacle-create"], "isController": false}, {"data": [1.0, 500, 1500, "announcements-update"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 150655, 3, 0.0019913046364209617, 813.0876837808178, 89, 7597, 685.5, 2042.0, 2470.0, 3033.9900000000016, 211.58994064723447, 367.9912184508486, 50.316846056573326], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["users-create", 2199, 0, 0.0, 200.75807185084136, 180, 441, 196.0, 217.0, 230.0, 290.0, 3.1237925313089527, 2.0591405846030697, 0.7077342453746847], "isController": false}, {"data": ["donations-list", 2100, 0, 0.0, 2316.6390476190477, 1180, 3313, 2276.0, 2775.0, 2895.95, 3138.9399999999987, 3.10188358187791, 14.09176017860941, 1.6115254546475077], "isController": false}, {"data": ["resources-list", 2199, 0, 0.0, 2159.606184629375, 1230, 3768, 2120.0, 2704.0, 2841.0, 3074.0, 3.1148764743961124, 13.992609162326284, 1.463140218930205], "isController": false}, {"data": ["edit_company", 2104, 0, 0.0, 202.8246197718633, 181, 492, 197.0, 221.0, 235.0, 308.9499999999998, 3.054880403755296, 2.052497771273089, 0.7309040028516088], "isController": false}, {"data": ["report-generate-1", 2100, 0, 0.0, 1065.4285714285681, 503, 1757, 1047.5, 1339.0, 1412.9499999999998, 1552.0, 3.1072627087044786, 2.8129223935244645, 0.4946131069519824], "isController": false}, {"data": ["report-generate-2", 2100, 0, 0.0, 1093.917142857141, 399, 2106, 1093.0, 1387.0, 1492.0, 1658.9599999999991, 3.1088727227507307, 8.707272430516694, 0.5525535503326494], "isController": false}, {"data": ["report-generate-0", 2100, 0, 0.0, 212.0852380952378, 188, 588, 206.0, 230.0, 249.94999999999982, 303.9899999999998, 3.1102909158769982, 2.530148762622597, 0.4950951360233894], "isController": false}, {"data": ["logout", 2199, 1, 0.04547521600727603, 199.4233742610274, 165, 549, 195.0, 214.0, 225.0, 285.0, 3.121619664926282, 2.03896144483861, 0.6889512151106834], "isController": false}, {"data": ["categories-list-0", 2194, 0, 0.0, 210.43892433910628, 187, 455, 205.0, 228.0, 241.25, 307.15000000000055, 3.127828981602264, 2.492488719714304, 0.4734506759261239], "isController": false}, {"data": ["categories-list-1", 2194, 0, 0.0, 945.8327256153141, 511, 1670, 928.0, 1191.0, 1274.5, 1425.0500000000002, 3.124216809824338, 2.8038625470982095, 0.47290391164333234], "isController": false}, {"data": ["categories-list-2", 2194, 0, 0.0, 945.6381039197805, 483, 1697, 907.0, 1195.0, 1292.0, 1410.0, 3.125467431176324, 8.753750578724313, 0.5310852861569144], "isController": false}, {"data": ["announcements-categories", 2176, 0, 0.0, 2182.0965073529387, 1340, 6543, 2130.0, 2645.3, 2848.5500000000015, 3110.23, 3.1065166896752574, 14.085504873205295, 1.58662912959], "isController": false}, {"data": ["delete_company", 2103, 0, 0.0, 201.41321921065156, 181, 491, 196.0, 218.0, 231.0, 295.0, 3.0566593895983463, 2.053693027386389, 0.7313296391128856], "isController": false}, {"data": ["company_detail", 2109, 0, 0.0, 2152.047415836888, 1075, 3373, 2074.0, 2715.0, 2849.0, 3168.9, 3.048366254918002, 13.738486588326737, 1.476552404725907], "isController": false}, {"data": ["donation-create", 2100, 0, 0.0, 202.43476190476193, 180, 419, 196.0, 222.0, 238.0, 302.9899999999998, 3.1102033924913766, 2.123078292335422, 0.7775508481228441], "isController": false}, {"data": ["resources-list-1", 2199, 0, 0.0, 982.9472487494309, 511, 1856, 962.0, 1276.0, 1331.0, 1497.0, 3.117968088681308, 2.795209673251407, 0.46891316958683726], "isController": false}, {"data": ["resources-list-2", 2199, 0, 0.0, 965.6480218281058, 502, 1710, 924.0, 1228.0, 1309.0, 1488.0, 3.1223332732247497, 8.744972487899007, 0.5275035705741032], "isController": false}, {"data": ["resources-list-0", 2199, 0, 0.0, 210.92405638926758, 188, 463, 205.0, 228.0, 245.0, 322.0, 3.121150013909627, 2.481070421213317, 0.4693917013106275], "isController": false}, {"data": ["login-1", 2200, 0, 0.0, 1141.3495454545464, 621, 1986, 1107.0, 1401.9, 1508.8999999999996, 1793.9899999999998, 3.114171177496433, 8.722112243222432, 0.4470538702070075], "isController": false}, {"data": ["login-0", 2200, 0, 0.0, 210.41545454545454, 188, 419, 205.0, 229.0, 242.0, 300.97999999999956, 3.119010082908959, 2.4367266272726242, 0.4477485177613447], "isController": false}, {"data": ["categories-update", 2180, 0, 0.0, 201.34082568807358, 181, 584, 196.0, 218.0, 235.0, 302.19000000000005, 3.1176126523590177, 2.1037796316211725, 0.7550468142431995], "isController": false}, {"data": ["announcements-delete", 2127, 0, 0.0, 202.0089327691589, 182, 485, 197.0, 219.0, 233.0, 292.0, 3.0637643249347493, 2.076418399906949, 0.7509812944908418], "isController": false}, {"data": ["announcementProjects-list-0", 2123, 0, 0.0, 213.06076307112573, 189, 534, 207.0, 234.0, 251.0, 311.03999999999905, 3.0595759828329396, 2.5247477592713223, 0.5049495518542645], "isController": false}, {"data": ["announcementProjects-list-1", 2123, 0, 0.0, 969.8747056052756, 426, 1781, 946.0, 1266.0, 1355.0, 1512.0, 3.055876624918853, 2.784309463915322, 0.5043390132922717], "isController": false}, {"data": ["announcementProjects-list-2", 2123, 0, 0.0, 969.2684879886965, 494, 1611, 916.0, 1272.2000000000003, 1382.8, 1517.7599999999998, 3.0595495270884703, 8.569128948915754, 0.5617141709888989], "isController": false}, {"data": ["resources-delete", 2196, 0, 0.0, 200.33788706739526, 181, 361, 196.0, 216.0, 229.0, 285.0600000000004, 3.12993506382445, 2.1090382754285844, 0.754974571059218], "isController": false}, {"data": ["announcements-list-2", 2149, 0, 0.0, 999.1563517915321, 429, 1906, 988.0, 1297.0, 1405.0, 1600.0, 3.0823116333239624, 8.63288062927063, 0.5508428016584817], "isController": false}, {"data": ["announcements-list-0", 2149, 0, 0.0, 216.23592368543518, 188, 5122, 207.0, 236.0, 252.0, 330.5, 3.0832801279797986, 2.5141981512335274, 0.4938065829967646], "isController": false}, {"data": ["announcements-categories-2", 2176, 0, 0.0, 992.3373161764696, 501, 1886, 990.0, 1219.3, 1384.4500000000003, 1542.7600000000002, 3.1108556854604665, 8.712826275293573, 0.5680957159971751], "isController": false}, {"data": ["announcements-list-1", 2149, 0, 0.0, 1007.3066542577953, 525, 1837, 982.0, 1283.0, 1396.0, 1587.5, 3.080054176848713, 2.791299097769146, 0.4932899267609267], "isController": false}, {"data": ["announcements-categories-1", 2176, 0, 0.0, 977.9526654411773, 534, 5387, 953.0, 1203.3, 1318.15, 1590.15, 3.1099842499878516, 2.8305716025280057, 0.5102317910136319], "isController": false}, {"data": ["announcements-categories-0", 2176, 0, 0.0, 211.71874999999977, 187, 490, 206.0, 232.0, 245.0, 313.23, 3.113651127983081, 2.5632889657126343, 0.5108333881847242], "isController": false}, {"data": ["binnacle-update", 2100, 0, 0.0, 201.00333333333305, 180, 437, 196.0, 218.0, 229.0, 286.96999999999935, 3.110392264898779, 2.0928322954250573, 0.7472231417627927], "isController": false}, {"data": ["announcementProjects-apply", 2112, 0, 0.0, 204.03835227272728, 180, 420, 197.0, 224.0, 241.0, 345.34999999999945, 3.0548970201736028, 2.0674254247854553, 0.7458244678158209], "isController": false}, {"data": ["Home-2", 2199, 0, 0.0, 1143.3619827194163, 310, 2003, 1105.0, 1412.0, 1512.0, 1809.0, 3.117627710734053, 8.731793236704359, 0.4688619799346134], "isController": false}, {"data": ["announcementProjects-list", 2123, 0, 0.0, 2152.302873292508, 1220, 3421, 2087.0, 2696.0, 2891.0, 3148.7599999999998, 3.0524582857060696, 13.849337104873438, 1.5679619709779224], "isController": false}, {"data": ["user-update", 2100, 0, 0.0, 201.81666666666695, 181, 488, 196.5, 220.0, 232.0, 286.97999999999956, 3.1088727227507307, 2.0796658350432136, 0.734714061431325], "isController": false}, {"data": ["login", 2200, 0, 0.0, 1351.803181818185, 816, 2205, 1311.5, 1610.0, 1716.0, 2000.9699999999993, 3.113272162252424, 11.151838174943252, 0.893849624709192], "isController": false}, {"data": ["binnacle-delete", 2100, 0, 0.0, 200.68190476190478, 181, 498, 196.0, 217.0, 230.0, 279.9899999999998, 3.109954668708377, 2.0925378581446012, 0.7471180161154889], "isController": false}, {"data": ["Home-0", 2200, 0, 0.0, 218.08590909090935, 187, 721, 206.0, 243.0, 277.9499999999998, 433.0, 3.121590194801417, 2.3655800694979487, 0.41153776982245244], "isController": false}, {"data": ["Home-1", 2200, 1, 0.045454545454545456, 1117.1122727272707, 89, 1932, 1090.0, 1401.9, 1502.9499999999998, 1791.9599999999991, 3.120487703860043, 2.738794490442088, 0.41139242189561115], "isController": false}, {"data": ["register_user", 2200, 0, 0.0, 199.40045454545444, 181, 400, 195.0, 215.0, 224.0, 263.0, 3.115794244278269, 2.072124883157716, 0.7241787403693632], "isController": false}, {"data": ["resources-create", 2196, 0, 0.0, 201.1425318761383, 182, 366, 196.0, 216.0, 231.1500000000001, 314.0900000000006, 3.1303767713499253, 2.1032218932507307, 0.7489670986139957], "isController": false}, {"data": ["announcements-list", 2149, 0, 0.0, 2222.7994416007436, 1381, 7597, 2142.0, 2770.0, 2915.0, 3182.0, 3.07694951025101, 13.915383966769948, 1.5354699216194003], "isController": false}, {"data": ["users-update", 2199, 0, 0.0, 199.4633924511142, 180, 369, 195.0, 214.0, 225.0, 264.0, 3.122541655188474, 2.0644147466431613, 0.7135495579239286], "isController": false}, {"data": ["categories-create", 2185, 0, 0.0, 201.25080091533184, 181, 363, 196.0, 220.0, 234.0, 298.4199999999996, 3.1238026614512746, 2.1018555016991485, 0.7504447799970836], "isController": false}, {"data": ["users-list", 2200, 0, 0.0, 2413.671818181814, 1515, 4070, 2395.0, 2876.9, 3049.95, 3612.9399999999987, 3.106089912831822, 13.880339297967206, 1.3862139552384207], "isController": false}, {"data": ["Home", 2200, 1, 0.045454545454545456, 2478.155909090907, 314, 4460, 2411.0, 3006.0, 3242.749999999999, 3682.9299999999985, 3.114215260220996, 13.811551590957027, 1.289266870376452], "isController": false}, {"data": ["users-list-2", 2200, 0, 0.0, 1089.5968181818223, 612, 1955, 1091.0, 1387.0, 1417.9499999999998, 1636.9299999999985, 3.1126026451463207, 8.717719127226218, 0.5015424184073661], "isController": false}, {"data": ["user_detail-0", 2103, 0, 0.0, 212.74084640989037, 187, 654, 206.0, 232.0, 250.0, 320.0, 3.057619331481993, 2.442512317531514, 0.4658091950304599], "isController": false}, {"data": ["categories-delete", 2179, 0, 0.0, 201.31115190454318, 181, 455, 197.0, 218.0, 230.0, 287.9999999999991, 3.116949251946484, 2.103331965913106, 0.754886146955789], "isController": false}, {"data": ["user_detail-1", 2103, 0, 0.0, 1002.7108892058956, 430, 1756, 970.0, 1286.6000000000001, 1361.0, 1496.92, 3.0539162155254536, 2.7437528498861496, 0.4652450484589558], "isController": false}, {"data": ["user_detail-2", 2103, 0, 0.0, 1019.8597242035182, 409, 1801, 998.0, 1301.0, 1386.8, 1502.0, 3.054874434928124, 8.556035038451034, 0.5220732676879118], "isController": false}, {"data": ["announcements-create", 2131, 0, 0.0, 203.20225246363202, 182, 567, 197.0, 222.0, 236.0, 313.3599999999997, 3.067723118914219, 2.0731097639537492, 0.745960016220352], "isController": false}, {"data": ["user_detail", 2103, 0, 0.0, 2235.384688540187, 1195, 3328, 2167.0, 2749.000000000001, 2900.6, 3106.84, 3.0508990940149863, 13.72308713577444, 1.450964705845018], "isController": false}, {"data": ["categories-list", 2194, 0, 0.0, 2101.9940747493124, 1342, 3273, 2056.0, 2551.0, 2687.5, 2930.05, 3.1210968507364596, 14.029696097597581, 1.4752059333559047], "isController": false}, {"data": ["donations-list-0", 2100, 0, 0.0, 212.14000000000013, 188, 726, 206.0, 232.0, 247.0, 306.0, 3.1097105896011277, 2.5782659087610913, 0.5192973738494071], "isController": false}, {"data": ["donations-list-1", 2100, 0, 0.0, 1050.135238095237, 417, 1824, 1024.0, 1314.9, 1385.9499999999998, 1541.9299999999985, 3.1064721127560624, 2.8364760013934744, 0.5187565735168814], "isController": false}, {"data": ["donations-list-2", 2100, 0, 0.0, 1054.2571428571418, 510, 1667, 1014.0, 1302.0, 1385.0, 1504.9899999999998, 3.106504280319112, 8.700638941362513, 0.5764021613873352], "isController": false}, {"data": ["users-list-0", 2200, 0, 0.0, 210.0849999999999, 188, 480, 205.0, 228.9000000000001, 242.0, 301.96999999999935, 3.1143607420672277, 2.4270115939156716, 0.444039715177554], "isController": false}, {"data": ["users-list-1", 2200, 0, 0.0, 1113.902727272728, 580, 1988, 1093.0, 1377.9, 1483.8999999999996, 1763.9599999999991, 3.11153729743185, 2.7651356842411947, 0.44363715373540047], "isController": false}, {"data": ["report-generate", 2100, 0, 0.0, 2371.5204761904793, 1307, 3964, 2338.5, 2847.9, 3033.95, 3328.0, 3.1027085167871307, 14.022788101260586, 1.5392343032498657], "isController": false}, {"data": ["resources-update", 2196, 0, 0.0, 199.69945355191243, 182, 392, 195.0, 215.0, 226.1500000000001, 270.0900000000006, 3.130149209480532, 2.109182572794499, 0.755026225333683], "isController": false}, {"data": ["company_detail-0", 2109, 0, 0.0, 213.37221431958244, 187, 489, 207.0, 233.0, 249.0, 323.8000000000002, 3.055193394176445, 2.4584759343763585, 0.47439038054106913], "isController": false}, {"data": ["company_detail-1", 2109, 0, 0.0, 962.3100995732576, 397, 1640, 940.0, 1265.0, 1355.5, 1501.5000000000005, 3.052018905440958, 2.7509896969941448, 0.473897466762805], "isController": false}, {"data": ["users-delete", 2199, 0, 0.0, 200.49840836743945, 181, 405, 196.0, 216.0, 228.0, 274.0, 3.121513316469496, 2.0637348781736806, 0.7133145664588497], "isController": false}, {"data": ["register_company", 2109, 0, 0.0, 201.6348980559505, 182, 487, 196.0, 218.0, 230.5, 300.8000000000002, 3.054281932380023, 2.046130278918648, 0.7247954195003374], "isController": false}, {"data": ["company_detail-2", 2109, 0, 0.0, 976.2825983878596, 416, 1652, 926.0, 1294.0, 1384.5, 1498.0, 3.0520674899096534, 8.548173399473523, 0.5305351691444515], "isController": false}, {"data": ["binnacle-create", 2100, 0, 0.0, 200.418095238095, 182, 459, 196.0, 215.0, 225.0, 281.0, 3.110231030923102, 2.086649138910323, 0.7411097378371453], "isController": false}, {"data": ["announcements-update", 2130, 0, 0.0, 200.8882629107976, 181, 379, 196.0, 217.0, 231.0, 293.69000000000005, 3.067294718060894, 2.078811068685801, 0.7518466545246917], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["502/Bad Gateway", 3, 100.0, 0.0019913046364209617], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 150655, 3, "502/Bad Gateway", 3, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["logout", 2199, 1, "502/Bad Gateway", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Home-1", 2200, 1, "502/Bad Gateway", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Home", 2200, 1, "502/Bad Gateway", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
