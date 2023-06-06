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

    var data = {"OkPercent": 99.98857110203149, "KoPercent": 0.011428897968513386};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.48690676876482186, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "users-create"], "isController": false}, {"data": [0.0, 500, 1500, "donations-list"], "isController": false}, {"data": [0.0, 500, 1500, "resources-list"], "isController": false}, {"data": [1.0, 500, 1500, "edit_company"], "isController": false}, {"data": [0.0, 500, 1500, "report-generate-1"], "isController": false}, {"data": [0.0, 500, 1500, "report-generate-2"], "isController": false}, {"data": [1.0, 500, 1500, "report-generate-0"], "isController": false}, {"data": [1.0, 500, 1500, "logout"], "isController": false}, {"data": [1.0, 500, 1500, "categories-list-0"], "isController": false}, {"data": [0.0, 500, 1500, "categories-list-1"], "isController": false}, {"data": [0.0, 500, 1500, "categories-list-2"], "isController": false}, {"data": [0.0, 500, 1500, "announcements-categories"], "isController": false}, {"data": [1.0, 500, 1500, "delete_company"], "isController": false}, {"data": [0.0, 500, 1500, "company_detail"], "isController": false}, {"data": [1.0, 500, 1500, "donation-create"], "isController": false}, {"data": [0.0, 500, 1500, "resources-list-1"], "isController": false}, {"data": [0.0, 500, 1500, "resources-list-2"], "isController": false}, {"data": [1.0, 500, 1500, "resources-list-0"], "isController": false}, {"data": [0.0, 500, 1500, "login-1"], "isController": false}, {"data": [0.818, 500, 1500, "login-0"], "isController": false}, {"data": [1.0, 500, 1500, "categories-update"], "isController": false}, {"data": [1.0, 500, 1500, "announcements-delete"], "isController": false}, {"data": [1.0, 500, 1500, "announcementProjects-list-0"], "isController": false}, {"data": [0.0, 500, 1500, "announcementProjects-list-1"], "isController": false}, {"data": [0.0, 500, 1500, "announcementProjects-list-2"], "isController": false}, {"data": [1.0, 500, 1500, "resources-delete"], "isController": false}, {"data": [0.0, 500, 1500, "announcements-list-2"], "isController": false}, {"data": [1.0, 500, 1500, "announcements-list-0"], "isController": false}, {"data": [0.0, 500, 1500, "announcements-categories-2"], "isController": false}, {"data": [0.0, 500, 1500, "announcements-list-1"], "isController": false}, {"data": [0.0, 500, 1500, "announcements-categories-1"], "isController": false}, {"data": [0.9995, 500, 1500, "announcements-categories-0"], "isController": false}, {"data": [1.0, 500, 1500, "binnacle-update"], "isController": false}, {"data": [1.0, 500, 1500, "announcementProjects-apply"], "isController": false}, {"data": [0.034, 500, 1500, "Home-2"], "isController": false}, {"data": [0.0, 500, 1500, "announcementProjects-list"], "isController": false}, {"data": [1.0, 500, 1500, "user-update"], "isController": false}, {"data": [0.0, 500, 1500, "login"], "isController": false}, {"data": [1.0, 500, 1500, "binnacle-delete"], "isController": false}, {"data": [0.215, 500, 1500, "Home-0"], "isController": false}, {"data": [0.017, 500, 1500, "Home-1"], "isController": false}, {"data": [0.9995, 500, 1500, "register_user"], "isController": false}, {"data": [1.0, 500, 1500, "resources-create"], "isController": false}, {"data": [0.0, 500, 1500, "announcements-list"], "isController": false}, {"data": [1.0, 500, 1500, "users-update"], "isController": false}, {"data": [0.9995, 500, 1500, "categories-create"], "isController": false}, {"data": [0.0, 500, 1500, "users-list"], "isController": false}, {"data": [0.0, 500, 1500, "Home"], "isController": false}, {"data": [0.0, 500, 1500, "users-list-2"], "isController": false}, {"data": [1.0, 500, 1500, "user_detail-0"], "isController": false}, {"data": [1.0, 500, 1500, "categories-delete"], "isController": false}, {"data": [0.0, 500, 1500, "user_detail-1"], "isController": false}, {"data": [0.0, 500, 1500, "user_detail-2"], "isController": false}, {"data": [1.0, 500, 1500, "announcements-create"], "isController": false}, {"data": [0.0, 500, 1500, "user_detail"], "isController": false}, {"data": [0.0, 500, 1500, "categories-list"], "isController": false}, {"data": [1.0, 500, 1500, "donations-list-0"], "isController": false}, {"data": [0.0, 500, 1500, "donations-list-1"], "isController": false}, {"data": [0.0, 500, 1500, "donations-list-2"], "isController": false}, {"data": [1.0, 500, 1500, "users-list-0"], "isController": false}, {"data": [0.0, 500, 1500, "users-list-1"], "isController": false}, {"data": [0.0, 500, 1500, "report-generate"], "isController": false}, {"data": [1.0, 500, 1500, "resources-update"], "isController": false}, {"data": [1.0, 500, 1500, "company_detail-0"], "isController": false}, {"data": [0.0, 500, 1500, "company_detail-1"], "isController": false}, {"data": [1.0, 500, 1500, "users-delete"], "isController": false}, {"data": [1.0, 500, 1500, "register_company"], "isController": false}, {"data": [0.0, 500, 1500, "company_detail-2"], "isController": false}, {"data": [1.0, 500, 1500, "binnacle-create"], "isController": false}, {"data": [1.0, 500, 1500, "announcements-update"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 69998, 8, 0.011428897968513386, 9464.079430841106, 180, 44784, 12489.0, 28131.9, 28963.0, 29806.0, 199.43245599539583, 346.7303928700148, 47.45993140573983], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["users-create", 1000, 0, 0.0, 224.34399999999982, 187, 422, 218.0, 254.0, 272.89999999999986, 368.0, 22.161155925893095, 14.608183837868982, 5.020886889460154], "isController": false}, {"data": ["donations-list", 1000, 1, 0.1, 28215.928999999996, 10723, 29487, 28258.0, 28791.6, 28946.0, 29079.97, 12.540600193125242, 56.95677304100149, 6.510812642649327], "isController": false}, {"data": ["resources-list", 1000, 1, 0.1, 28808.606, 26550, 29994, 28775.5, 29172.0, 29277.0, 29493.87, 13.572019923725248, 60.964453183317275, 6.372845335805703], "isController": false}, {"data": ["edit_company", 1000, 0, 0.0, 221.10599999999985, 186, 396, 215.0, 248.0, 264.0, 321.9000000000001, 18.331805682859763, 12.316681943171403, 4.386027726856096], "isController": false}, {"data": ["report-generate-1", 1000, 0, 0.0, 13654.178000000016, 8621, 15089, 13751.5, 14184.8, 14419.85, 14737.0, 16.811525982213404, 15.219027915538895, 2.6760534522468604], "isController": false}, {"data": ["report-generate-2", 1000, 0, 0.0, 11585.463999999989, 2997, 14402, 13405.5, 14100.0, 14130.9, 14235.880000000001, 20.44362669937647, 57.258126341613, 3.6335352141469897], "isController": false}, {"data": ["report-generate-0", 1000, 0, 0.0, 212.9159999999999, 189, 476, 208.0, 232.0, 242.94999999999993, 302.94000000000005, 19.566408390075917, 15.916814637630118, 3.1145747730296627], "isController": false}, {"data": ["logout", 1000, 0, 0.0, 202.9370000000001, 182, 396, 198.0, 223.89999999999998, 237.94999999999993, 285.9200000000001, 22.00994849672052, 14.379546429986355, 4.857664414315271], "isController": false}, {"data": ["categories-list-0", 1000, 0, 0.0, 211.30900000000014, 186, 346, 206.0, 232.0, 247.0, 282.97, 22.51390233469167, 17.940765922957425, 3.407866076051962], "isController": false}, {"data": ["categories-list-1", 1000, 0, 0.0, 14189.158999999996, 13497, 14952, 14200.5, 14380.0, 14468.8, 14714.93, 17.00420003740924, 15.260605307010833, 2.5738779353500316], "isController": false}, {"data": ["categories-list-2", 1000, 0, 0.0, 14391.931, 13813, 15293, 14314.0, 14712.0, 14869.15, 15111.95, 16.66638889351844, 46.6789095181747, 2.831984050265829], "isController": false}, {"data": ["announcements-categories", 1000, 1, 0.1, 30349.38399999999, 8316, 33366, 30201.0, 31484.9, 31658.85, 32708.93, 12.58399818790426, 57.07204476600056, 6.424880707629678], "isController": false}, {"data": ["delete_company", 1000, 0, 0.0, 202.35399999999973, 182, 314, 198.0, 220.0, 235.0, 264.96000000000004, 18.332813903606066, 12.317359341485325, 4.3862689515463735], "isController": false}, {"data": ["company_detail", 1000, 1, 0.1, 30438.871999999967, 16359, 32625, 30120.5, 32027.9, 32220.85, 32426.91, 11.605505651881252, 52.27545885267971, 5.621416800129982], "isController": false}, {"data": ["donation-create", 1000, 0, 0.0, 213.9790000000001, 186, 460, 208.0, 229.0, 245.94999999999993, 373.0, 19.56679124190424, 13.356628005948306, 4.89169781047606], "isController": false}, {"data": ["resources-list-1", 1000, 0, 0.0, 14349.374999999996, 13634, 15571, 14318.0, 14715.8, 14813.85, 15039.86, 16.888753778858657, 15.140503875968992, 2.5399102362736654], "isController": false}, {"data": ["resources-list-2", 1000, 1, 0.1, 14243.289000000002, 12130, 15391, 14202.0, 14579.9, 14605.0, 14701.97, 17.165319189110324, 48.07174459721579, 2.8971002143519233], "isController": false}, {"data": ["resources-list-0", 1000, 0, 0.0, 215.8300000000002, 187, 447, 210.0, 240.0, 257.94999999999993, 309.93000000000006, 22.05266175627398, 17.530143232038107, 3.316513584439642], "isController": false}, {"data": ["login-1", 1000, 0, 0.0, 13668.706000000002, 1713, 20813, 14956.0, 16109.8, 17813.85, 20224.89, 16.95921309251251, 47.499046044263544, 2.4345745357415414], "isController": false}, {"data": ["login-0", 1000, 0, 0.0, 496.9519999999992, 192, 2095, 228.0, 1071.0, 1076.0, 1089.0, 21.86987424822307, 17.085839256424276, 3.1395229633679604], "isController": false}, {"data": ["categories-update", 1000, 0, 0.0, 212.32200000000014, 183, 477, 202.0, 246.0, 268.0, 388.97, 21.467519642780474, 14.486382883946588, 5.1991649134858955], "isController": false}, {"data": ["announcements-delete", 1000, 0, 0.0, 204.99199999999996, 182, 407, 201.0, 224.0, 234.0, 279.9200000000001, 16.950589032968896, 11.48799686414103, 4.154880710229681], "isController": false}, {"data": ["announcementProjects-list-0", 1000, 0, 0.0, 217.64299999999994, 191, 448, 212.0, 238.0, 256.0, 315.0, 16.96324065749521, 13.997986675374463, 2.7995973350748926], "isController": false}, {"data": ["announcementProjects-list-1", 1000, 0, 0.0, 15630.92800000002, 13833, 17623, 15343.5, 17030.9, 17123.95, 17234.96, 13.570362328674175, 12.364402395168952, 2.239639876509703], "isController": false}, {"data": ["announcementProjects-list-2", 1000, 0, 0.0, 15907.870999999996, 14330, 17381, 15721.5, 17003.0, 17105.0, 17270.75, 13.840447323257488, 38.76406535459226, 2.5410196257543047], "isController": false}, {"data": ["resources-delete", 1000, 0, 0.0, 200.23299999999998, 183, 397, 196.0, 215.89999999999998, 227.94999999999993, 257.98, 22.56979709752409, 15.2081640598551, 5.444081917078565], "isController": false}, {"data": ["announcements-list-2", 1000, 0, 0.0, 15833.035, 13910, 17989, 16089.0, 17198.9, 17398.0, 17528.99, 13.47363882563764, 37.736714992117925, 2.407886626066102], "isController": false}, {"data": ["announcements-list-0", 1000, 0, 0.0, 236.268, 194, 475, 227.0, 278.0, 303.94999999999993, 344.94000000000005, 17.205189085028042, 14.02962195898283, 2.7555185643990225], "isController": false}, {"data": ["announcements-categories-2", 999, 0, 0.0, 15360.586586586593, 14498, 17587, 15214.0, 15994.0, 16197.0, 17208.0, 15.369230769230768, 43.045853365384616, 2.8066856971153844], "isController": false}, {"data": ["announcements-list-1", 1000, 0, 0.0, 15952.580000000002, 13909, 17969, 15871.5, 17151.7, 17251.0, 17434.91, 13.831641262552214, 12.534924894187943, 2.215223795955628], "isController": false}, {"data": ["announcements-categories-1", 1000, 1, 0.1, 14785.089999999987, 8115, 15888, 14752.5, 15361.9, 15482.0, 15602.93, 16.033092302512387, 14.65527974739863, 2.630429205880938], "isController": false}, {"data": ["announcements-categories-0", 1000, 0, 0.0, 218.96099999999996, 191, 517, 212.0, 245.0, 267.94999999999993, 321.94000000000005, 21.254888624383607, 17.497921006206425, 3.4871301649379354], "isController": false}, {"data": ["binnacle-update", 1000, 0, 0.0, 201.9720000000001, 182, 395, 197.0, 218.0, 233.94999999999993, 284.97, 19.561815336463226, 13.162198014475743, 4.699420481220658], "isController": false}, {"data": ["announcementProjects-apply", 1000, 0, 0.0, 223.70900000000026, 186, 433, 214.0, 255.0, 277.94999999999993, 340.99, 17.53155680224404, 11.864618031206172, 4.280165234922861], "isController": false}, {"data": ["Home-2", 1000, 0, 0.0, 8227.726, 414, 20689, 6908.5, 15897.9, 17880.749999999993, 20092.92, 21.568458286601675, 60.4085335605211, 3.243693922008455], "isController": false}, {"data": ["announcementProjects-list", 1000, 0, 0.0, 31756.521999999997, 30179, 33396, 31856.5, 32549.7, 32701.55, 33059.92, 11.245558004588188, 51.022326649723354, 5.776526865638073], "isController": false}, {"data": ["user-update", 1000, 0, 0.0, 225.94199999999978, 186, 448, 215.0, 264.0, 292.0, 365.0, 19.01393721597931, 12.71928417279866, 4.493528131120111], "isController": false}, {"data": ["login", 1000, 0, 0.0, 14165.717999999997, 3808, 21904, 15190.5, 16595.1, 18888.9, 21300.86, 16.377333770062233, 58.66412135604323, 4.702086062888961], "isController": false}, {"data": ["binnacle-delete", 1000, 0, 0.0, 200.702, 182, 374, 197.0, 214.0, 224.0, 247.99, 19.55645949857238, 13.15859433058239, 4.6981338248523485], "isController": false}, {"data": ["Home-0", 1000, 0, 0.0, 2047.130000000003, 379, 7328, 2010.5, 3050.0, 4618.849999999999, 4700.0, 67.5949709341625, 51.224313911045016, 8.911446363390564], "isController": false}, {"data": ["Home-1", 1000, 0, 0.0, 9504.267000000003, 608, 27409, 9752.0, 16283.3, 18133.59999999999, 23421.97, 31.662603299243266, 27.79753941994111, 4.174268989646329], "isController": false}, {"data": ["register_user", 1000, 0, 0.0, 209.29100000000008, 184, 853, 206.0, 224.0, 238.0, 264.97, 20.96480010063104, 13.942411004423573, 4.8726781483888555], "isController": false}, {"data": ["resources-create", 1000, 0, 0.0, 212.49399999999986, 186, 399, 208.0, 230.0, 240.0, 284.99, 22.58151928461747, 15.171958269352363, 5.402804906964141], "isController": false}, {"data": ["announcements-list", 1000, 0, 0.0, 32021.928999999996, 30033, 33522, 32036.5, 32881.0, 32980.8, 33197.97, 11.17043855141753, 50.51787200352985, 5.574310644310895], "isController": false}, {"data": ["users-update", 1000, 0, 0.0, 204.94000000000005, 181, 354, 200.0, 225.0, 241.94999999999993, 293.98, 22.069209039548024, 14.590678241966808, 5.043159096927966], "isController": false}, {"data": ["categories-create", 1000, 0, 0.0, 221.48200000000023, 183, 567, 212.0, 256.0, 282.89999999999986, 385.97, 21.668002860176376, 14.579349580724143, 5.2053991246126845], "isController": false}, {"data": ["users-list", 1000, 0, 0.0, 30078.373000000003, 28532, 31238, 30122.0, 30805.8, 30904.0, 31164.63, 13.19557156618239, 58.96771043637755, 5.889039263423195], "isController": false}, {"data": ["Home", 1000, 0, 0.0, 20087.681999999993, 1893, 44784, 18949.0, 34482.1, 36633.45, 42868.96, 21.107288346666103, 93.64297945205479, 8.739736581041432], "isController": false}, {"data": ["users-list-2", 1000, 0, 0.0, 14656.543000000001, 13731, 15840, 14602.0, 15201.0, 15290.8, 15594.240000000002, 16.529472048662765, 46.29543538629376, 2.6634403203411683], "isController": false}, {"data": ["user_detail-0", 1000, 0, 0.0, 213.72599999999994, 189, 364, 209.0, 234.89999999999998, 249.0, 280.94000000000005, 18.427744812589836, 14.720600836619615, 2.807351748792983], "isController": false}, {"data": ["categories-delete", 1000, 0, 0.0, 206.56499999999983, 183, 383, 202.0, 226.0, 241.94999999999993, 298.0, 21.417862497322766, 14.45287400942386, 5.187138573570358], "isController": false}, {"data": ["user_detail-1", 1000, 0, 0.0, 14422.033999999996, 13223, 15555, 14404.0, 14864.6, 15061.95, 15208.0, 14.824478178368121, 13.318867113377609, 2.2584165974857684], "isController": false}, {"data": ["user_detail-2", 1000, 0, 0.0, 14168.008999999998, 13114, 15479, 14199.5, 15106.8, 15199.9, 15335.86, 14.992278976327192, 41.990093851666394, 2.5621570516184167], "isController": false}, {"data": ["announcements-create", 1000, 0, 0.0, 227.45899999999983, 188, 432, 220.0, 254.89999999999998, 281.94999999999993, 387.94000000000005, 16.879061524179257, 11.406553295636764, 4.10438117140687], "isController": false}, {"data": ["user_detail", 1000, 0, 0.0, 28803.861000000004, 27260, 30097, 28880.5, 29616.0, 29711.0, 29852.85, 12.122828498345234, 54.52905084314272, 5.765446756537235], "isController": false}, {"data": ["categories-list", 1000, 0, 0.0, 28792.503000000015, 27918, 30112, 28710.0, 29276.9, 29447.25, 29726.77, 13.45732010927344, 60.49223092088442, 6.360686457898774], "isController": false}, {"data": ["donations-list-0", 1000, 0, 0.0, 219.29100000000025, 189, 496, 213.0, 245.0, 263.0, 323.99, 18.997682282761502, 15.75100806451613, 3.172464521828337], "isController": false}, {"data": ["donations-list-1", 1000, 1, 0.1, 13953.14299999999, 10525, 15596, 13830.5, 14810.4, 14910.9, 15040.86, 15.103686809950307, 13.815463272553579, 2.5196755020087904], "isController": false}, {"data": ["donations-list-2", 999, 0, 0.0, 14057.456456456464, 13300, 15199, 13902.0, 14811.0, 14898.0, 15000.0, 15.438347061459766, 43.239432980729106, 2.8645370524192924], "isController": false}, {"data": ["users-list-0", 1000, 0, 0.0, 210.1719999999999, 189, 390, 207.0, 228.0, 239.0, 276.0, 21.253985122210416, 16.56316418703507, 3.0303533475026567], "isController": false}, {"data": ["users-list-1", 1000, 0, 0.0, 15211.566000000004, 13621, 16402, 15126.0, 15887.9, 15971.95, 16180.98, 16.395324053579916, 14.570063367927467, 2.3376145623268245], "isController": false}, {"data": ["report-generate", 1000, 0, 0.0, 25452.65100000002, 11837, 29184, 27381.0, 28307.8, 28536.3, 28963.72, 15.93981127263453, 72.04047516577404, 7.907640748533538], "isController": false}, {"data": ["resources-update", 1000, 0, 0.0, 200.99400000000009, 180, 410, 197.0, 216.0, 228.94999999999993, 265.97, 22.54842273782949, 15.193761415139011, 5.4389261877381685], "isController": false}, {"data": ["company_detail-0", 1000, 0, 0.0, 217.4329999999999, 189, 460, 212.0, 241.0, 254.0, 305.96000000000004, 17.529098303183282, 14.1054462908428, 2.7218033498106857], "isController": false}, {"data": ["company_detail-1", 1000, 0, 0.0, 15370.656000000006, 14170, 17329, 15238.0, 16445.8, 16669.6, 17120.96, 14.057579847053532, 12.671041209795323, 2.182768745782726], "isController": false}, {"data": ["users-delete", 1000, 0, 0.0, 203.52099999999996, 181, 399, 198.0, 222.0, 236.94999999999993, 300.0, 22.086268966583475, 14.601957119508802, 5.0470575568169265], "isController": false}, {"data": ["register_company", 1000, 0, 0.0, 205.46700000000024, 183, 432, 200.0, 225.0, 238.0, 295.98, 17.538013644574615, 11.74909898454901, 4.161852847296515], "isController": false}, {"data": ["company_detail-2", 1000, 1, 0.1, 14850.655000000006, 471, 16687, 14891.5, 15494.9, 15515.0, 15613.99, 14.12329637737448, 39.52139679401172, 2.455026128098298], "isController": false}, {"data": ["binnacle-create", 1000, 0, 0.0, 201.53100000000006, 183, 402, 198.0, 219.0, 227.0, 261.98, 19.559137050873318, 13.122194486279264, 4.660575625403407], "isController": false}, {"data": ["announcements-update", 1000, 0, 0.0, 203.805, 183, 398, 201.0, 220.0, 227.94999999999993, 255.0, 16.96467953720354, 11.497546483221932, 4.158334534998134], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: knowledgeprojects.onrender.com:443 failed to respond", 4, 50.0, 0.005714448984256693], "isController": false}, {"data": ["502/Bad Gateway", 2, 25.0, 0.0028572244921283465], "isController": false}, {"data": ["500/Internal Server Error", 2, 25.0, 0.0028572244921283465], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 69998, 8, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: knowledgeprojects.onrender.com:443 failed to respond", 4, "502/Bad Gateway", 2, "500/Internal Server Error", 2, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["donations-list", 1000, 1, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: knowledgeprojects.onrender.com:443 failed to respond", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["resources-list", 1000, 1, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: knowledgeprojects.onrender.com:443 failed to respond", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["announcements-categories", 1000, 1, "500/Internal Server Error", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["company_detail", 1000, 1, "502/Bad Gateway", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["resources-list-2", 1000, 1, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: knowledgeprojects.onrender.com:443 failed to respond", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["announcements-categories-1", 1000, 1, "500/Internal Server Error", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["donations-list-1", 1000, 1, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: knowledgeprojects.onrender.com:443 failed to respond", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["company_detail-2", 1000, 1, "502/Bad Gateway", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
