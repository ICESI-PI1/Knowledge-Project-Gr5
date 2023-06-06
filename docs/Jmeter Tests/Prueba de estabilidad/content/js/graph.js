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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1655.0, "series": [{"data": [[300.0, 16.0], [100.0, 1398.0], [200.0, 782.0], [400.0, 3.0]], "isOverall": false, "label": "users-create", "isController": false}, {"data": [[2100.0, 231.0], [2200.0, 223.0], [2300.0, 208.0], [2400.0, 179.0], [2500.0, 170.0], [2600.0, 157.0], [2700.0, 107.0], [2800.0, 82.0], [2900.0, 32.0], [3000.0, 39.0], [3100.0, 20.0], [3200.0, 9.0], [3300.0, 2.0], [1100.0, 1.0], [1300.0, 2.0], [1400.0, 3.0], [1500.0, 13.0], [1600.0, 17.0], [1700.0, 31.0], [1800.0, 112.0], [1900.0, 205.0], [2000.0, 257.0]], "isOverall": false, "label": "donations-list", "isController": false}, {"data": [[1200.0, 2.0], [1300.0, 11.0], [1400.0, 39.0], [1500.0, 69.0], [1600.0, 86.0], [1700.0, 168.0], [1800.0, 264.0], [1900.0, 223.0], [2000.0, 208.0], [2100.0, 203.0], [2200.0, 187.0], [2300.0, 148.0], [2400.0, 148.0], [2500.0, 116.0], [2600.0, 103.0], [2700.0, 87.0], [2800.0, 66.0], [2900.0, 41.0], [3000.0, 12.0], [3100.0, 8.0], [3300.0, 4.0], [3200.0, 3.0], [3400.0, 1.0], [3500.0, 1.0], [3700.0, 1.0]], "isOverall": false, "label": "resources-list", "isController": false}, {"data": [[300.0, 22.0], [100.0, 1237.0], [200.0, 842.0], [400.0, 3.0]], "isOverall": false, "label": "edit_company", "isController": false}, {"data": [[600.0, 39.0], [700.0, 103.0], [800.0, 261.0], [900.0, 429.0], [1000.0, 385.0], [1100.0, 351.0], [1200.0, 243.0], [1300.0, 163.0], [1400.0, 76.0], [1500.0, 26.0], [1600.0, 9.0], [1700.0, 3.0], [500.0, 12.0]], "isOverall": false, "label": "report-generate-1", "isController": false}, {"data": [[2100.0, 1.0], [600.0, 36.0], [700.0, 93.0], [800.0, 190.0], [900.0, 360.0], [1000.0, 441.0], [1100.0, 381.0], [300.0, 1.0], [1200.0, 246.0], [1300.0, 174.0], [1400.0, 87.0], [1500.0, 53.0], [400.0, 2.0], [1600.0, 16.0], [1700.0, 6.0], [1800.0, 4.0], [1900.0, 3.0], [500.0, 6.0]], "isOverall": false, "label": "report-generate-2", "isController": false}, {"data": [[300.0, 25.0], [200.0, 1567.0], [100.0, 505.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "report-generate-0", "isController": false}, {"data": [[300.0, 14.0], [100.0, 1465.0], [200.0, 719.0], [500.0, 1.0]], "isOverall": false, "label": "logout", "isController": false}, {"data": [[300.0, 25.0], [200.0, 1590.0], [100.0, 578.0], [400.0, 1.0]], "isOverall": false, "label": "categories-list-0", "isController": false}, {"data": [[1100.0, 182.0], [600.0, 109.0], [1200.0, 120.0], [1300.0, 63.0], [700.0, 333.0], [1400.0, 22.0], [1500.0, 3.0], [800.0, 513.0], [1600.0, 2.0], [900.0, 480.0], [1000.0, 353.0], [500.0, 14.0]], "isOverall": false, "label": "categories-list-1", "isController": false}, {"data": [[600.0, 101.0], [700.0, 344.0], [800.0, 530.0], [900.0, 429.0], [1000.0, 334.0], [1100.0, 249.0], [1200.0, 116.0], [1300.0, 47.0], [1400.0, 23.0], [1500.0, 6.0], [1600.0, 3.0], [400.0, 1.0], [500.0, 11.0]], "isOverall": false, "label": "categories-list-2", "isController": false}, {"data": [[2100.0, 249.0], [2200.0, 191.0], [2300.0, 201.0], [2400.0, 147.0], [2500.0, 109.0], [2600.0, 77.0], [2700.0, 47.0], [2800.0, 47.0], [2900.0, 35.0], [3000.0, 26.0], [3100.0, 14.0], [3200.0, 5.0], [3300.0, 2.0], [3500.0, 1.0], [1300.0, 1.0], [1400.0, 3.0], [1500.0, 20.0], [1600.0, 66.0], [6500.0, 1.0], [1700.0, 132.0], [1800.0, 230.0], [1900.0, 306.0], [2000.0, 266.0]], "isOverall": false, "label": "announcements-categories", "isController": false}, {"data": [[300.0, 14.0], [200.0, 778.0], [100.0, 1309.0], [400.0, 2.0]], "isOverall": false, "label": "delete_company", "isController": false}, {"data": [[2100.0, 194.0], [2300.0, 114.0], [2200.0, 154.0], [2400.0, 98.0], [2500.0, 77.0], [2600.0, 90.0], [2700.0, 96.0], [2800.0, 52.0], [2900.0, 26.0], [3000.0, 28.0], [3100.0, 22.0], [3300.0, 4.0], [3200.0, 8.0], [1000.0, 1.0], [1100.0, 4.0], [1200.0, 3.0], [1300.0, 12.0], [1400.0, 23.0], [1500.0, 40.0], [1600.0, 95.0], [1700.0, 140.0], [1800.0, 220.0], [1900.0, 303.0], [2000.0, 305.0]], "isOverall": false, "label": "company_detail", "isController": false}, {"data": [[300.0, 19.0], [100.0, 1292.0], [200.0, 785.0], [400.0, 4.0]], "isOverall": false, "label": "donation-create", "isController": false}, {"data": [[600.0, 139.0], [700.0, 280.0], [800.0, 383.0], [900.0, 378.0], [1000.0, 350.0], [1100.0, 227.0], [1200.0, 226.0], [1300.0, 116.0], [1400.0, 36.0], [1500.0, 13.0], [1600.0, 2.0], [1700.0, 3.0], [1800.0, 2.0], [500.0, 44.0]], "isOverall": false, "label": "resources-list-1", "isController": false}, {"data": [[600.0, 115.0], [700.0, 298.0], [800.0, 434.0], [900.0, 420.0], [1000.0, 330.0], [1100.0, 245.0], [1200.0, 167.0], [1300.0, 96.0], [1400.0, 40.0], [1500.0, 11.0], [1600.0, 1.0], [1700.0, 1.0], [500.0, 41.0]], "isOverall": false, "label": "resources-list-2", "isController": false}, {"data": [[300.0, 27.0], [100.0, 566.0], [200.0, 1603.0], [400.0, 3.0]], "isOverall": false, "label": "resources-list-0", "isController": false}, {"data": [[600.0, 14.0], [700.0, 54.0], [800.0, 168.0], [900.0, 311.0], [1000.0, 503.0], [1100.0, 395.0], [1200.0, 319.0], [1300.0, 210.0], [1400.0, 108.0], [1500.0, 59.0], [1600.0, 24.0], [1700.0, 15.0], [1800.0, 16.0], [1900.0, 4.0]], "isOverall": false, "label": "login-1", "isController": false}, {"data": [[300.0, 20.0], [200.0, 1572.0], [100.0, 606.0], [400.0, 2.0]], "isOverall": false, "label": "login-0", "isController": false}, {"data": [[300.0, 22.0], [200.0, 765.0], [100.0, 1392.0], [500.0, 1.0]], "isOverall": false, "label": "categories-update", "isController": false}, {"data": [[300.0, 15.0], [100.0, 1248.0], [200.0, 862.0], [400.0, 2.0]], "isOverall": false, "label": "announcements-delete", "isController": false}, {"data": [[300.0, 25.0], [200.0, 1628.0], [100.0, 463.0], [400.0, 6.0], [500.0, 1.0]], "isOverall": false, "label": "announcementProjects-list-0", "isController": false}, {"data": [[600.0, 118.0], [700.0, 260.0], [800.0, 438.0], [900.0, 483.0], [1000.0, 298.0], [1100.0, 198.0], [1200.0, 135.0], [1300.0, 94.0], [1400.0, 44.0], [1500.0, 20.0], [1600.0, 2.0], [400.0, 4.0], [1700.0, 2.0], [500.0, 27.0]], "isOverall": false, "label": "announcementProjects-list-1", "isController": false}, {"data": [[600.0, 107.0], [700.0, 266.0], [800.0, 422.0], [900.0, 501.0], [1000.0, 291.0], [1100.0, 205.0], [1200.0, 144.0], [1300.0, 79.0], [1400.0, 49.0], [1500.0, 28.0], [1600.0, 3.0], [400.0, 2.0], [500.0, 26.0]], "isOverall": false, "label": "announcementProjects-list-2", "isController": false}, {"data": [[300.0, 12.0], [100.0, 1389.0], [200.0, 795.0]], "isOverall": false, "label": "resources-delete", "isController": false}, {"data": [[600.0, 53.0], [700.0, 242.0], [800.0, 427.0], [900.0, 478.0], [1000.0, 356.0], [1100.0, 236.0], [1200.0, 139.0], [1300.0, 84.0], [1400.0, 66.0], [1500.0, 35.0], [1600.0, 13.0], [400.0, 1.0], [1700.0, 4.0], [1800.0, 3.0], [1900.0, 1.0], [500.0, 11.0]], "isOverall": false, "label": "announcements-list-2", "isController": false}, {"data": [[300.0, 34.0], [5100.0, 1.0], [200.0, 1655.0], [100.0, 456.0], [400.0, 3.0]], "isOverall": false, "label": "announcements-list-0", "isController": false}, {"data": [[600.0, 63.0], [700.0, 241.0], [800.0, 426.0], [900.0, 476.0], [1000.0, 387.0], [1100.0, 269.0], [1200.0, 152.0], [1300.0, 67.0], [1400.0, 43.0], [1500.0, 33.0], [1600.0, 8.0], [1700.0, 2.0], [1800.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "announcements-categories-2", "isController": false}, {"data": [[600.0, 42.0], [700.0, 236.0], [800.0, 457.0], [900.0, 465.0], [1000.0, 365.0], [1100.0, 259.0], [1200.0, 142.0], [1300.0, 80.0], [1400.0, 63.0], [1500.0, 26.0], [1600.0, 10.0], [1700.0, 2.0], [1800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "announcements-list-1", "isController": false}, {"data": [[600.0, 61.0], [700.0, 274.0], [800.0, 502.0], [900.0, 465.0], [1000.0, 397.0], [1100.0, 253.0], [1200.0, 100.0], [1300.0, 55.0], [5300.0, 1.0], [1400.0, 29.0], [1500.0, 21.0], [1600.0, 10.0], [1700.0, 5.0], [500.0, 3.0]], "isOverall": false, "label": "announcements-categories-1", "isController": false}, {"data": [[300.0, 26.0], [200.0, 1597.0], [100.0, 550.0], [400.0, 3.0]], "isOverall": false, "label": "announcements-categories-0", "isController": false}, {"data": [[300.0, 8.0], [100.0, 1308.0], [200.0, 778.0], [400.0, 6.0]], "isOverall": false, "label": "binnacle-update", "isController": false}, {"data": [[300.0, 27.0], [200.0, 883.0], [100.0, 1197.0], [400.0, 5.0]], "isOverall": false, "label": "announcementProjects-apply", "isController": false}, {"data": [[600.0, 13.0], [700.0, 53.0], [800.0, 169.0], [900.0, 317.0], [1000.0, 453.0], [1100.0, 404.0], [300.0, 1.0], [1200.0, 304.0], [1300.0, 207.0], [1400.0, 123.0], [1500.0, 75.0], [400.0, 2.0], [1600.0, 31.0], [1700.0, 18.0], [1800.0, 15.0], [1900.0, 9.0], [500.0, 3.0], [2000.0, 2.0]], "isOverall": false, "label": "Home-2", "isController": false}, {"data": [[2100.0, 262.0], [2300.0, 114.0], [2200.0, 148.0], [2400.0, 104.0], [2500.0, 94.0], [2600.0, 80.0], [2800.0, 47.0], [2700.0, 63.0], [2900.0, 36.0], [3000.0, 35.0], [3100.0, 19.0], [3200.0, 7.0], [3300.0, 2.0], [3400.0, 1.0], [1200.0, 2.0], [1300.0, 7.0], [1400.0, 22.0], [1500.0, 68.0], [1600.0, 86.0], [1700.0, 122.0], [1800.0, 188.0], [1900.0, 296.0], [2000.0, 320.0]], "isOverall": false, "label": "announcementProjects-list", "isController": false}, {"data": [[300.0, 8.0], [100.0, 1272.0], [200.0, 814.0], [400.0, 6.0]], "isOverall": false, "label": "user-update", "isController": false}, {"data": [[2100.0, 4.0], [2200.0, 1.0], [800.0, 8.0], [900.0, 46.0], [1000.0, 145.0], [1100.0, 286.0], [1200.0, 488.0], [1300.0, 412.0], [1400.0, 336.0], [1500.0, 236.0], [1600.0, 106.0], [1700.0, 72.0], [1800.0, 27.0], [1900.0, 16.0], [2000.0, 17.0]], "isOverall": false, "label": "login", "isController": false}, {"data": [[300.0, 8.0], [100.0, 1343.0], [200.0, 745.0], [400.0, 4.0]], "isOverall": false, "label": "binnacle-delete", "isController": false}, {"data": [[300.0, 42.0], [700.0, 1.0], [400.0, 42.0], [200.0, 1514.0], [100.0, 594.0], [500.0, 7.0]], "isOverall": false, "label": "Home-0", "isController": false}, {"data": [[0.0, 1.0], [600.0, 25.0], [700.0, 74.0], [800.0, 176.0], [900.0, 423.0], [1000.0, 461.0], [1100.0, 353.0], [1200.0, 269.0], [1300.0, 185.0], [1400.0, 109.0], [1500.0, 56.0], [400.0, 2.0], [1600.0, 21.0], [1700.0, 20.0], [1800.0, 11.0], [1900.0, 6.0], [500.0, 8.0]], "isOverall": false, "label": "Home-1", "isController": false}, {"data": [[300.0, 9.0], [200.0, 755.0], [100.0, 1435.0], [400.0, 1.0]], "isOverall": false, "label": "register_user", "isController": false}, {"data": [[300.0, 25.0], [100.0, 1391.0], [200.0, 780.0]], "isOverall": false, "label": "resources-create", "isController": false}, {"data": [[2100.0, 236.0], [2300.0, 178.0], [2200.0, 178.0], [2400.0, 158.0], [2500.0, 98.0], [2600.0, 90.0], [2700.0, 67.0], [2800.0, 63.0], [2900.0, 45.0], [3000.0, 38.0], [3100.0, 22.0], [3300.0, 3.0], [3200.0, 11.0], [3400.0, 1.0], [1300.0, 1.0], [1400.0, 3.0], [1500.0, 16.0], [1600.0, 33.0], [1700.0, 102.0], [1800.0, 233.0], [1900.0, 291.0], [7500.0, 1.0], [2000.0, 281.0]], "isOverall": false, "label": "announcements-list", "isController": false}, {"data": [[300.0, 12.0], [200.0, 760.0], [100.0, 1427.0]], "isOverall": false, "label": "users-update", "isController": false}, {"data": [[300.0, 21.0], [100.0, 1400.0], [200.0, 764.0]], "isOverall": false, "label": "categories-create", "isController": false}, {"data": [[1500.0, 6.0], [1600.0, 22.0], [1700.0, 43.0], [1800.0, 117.0], [1900.0, 136.0], [2000.0, 175.0], [2100.0, 203.0], [2200.0, 195.0], [2300.0, 215.0], [2400.0, 233.0], [2500.0, 170.0], [2600.0, 179.0], [2800.0, 153.0], [2700.0, 155.0], [2900.0, 59.0], [3000.0, 43.0], [3100.0, 30.0], [3200.0, 16.0], [3300.0, 13.0], [3400.0, 11.0], [3500.0, 3.0], [3700.0, 7.0], [3600.0, 5.0], [3800.0, 5.0], [3900.0, 5.0], [4000.0, 1.0]], "isOverall": false, "label": "users-list", "isController": false}, {"data": [[1300.0, 2.0], [1400.0, 2.0], [1500.0, 6.0], [1600.0, 11.0], [1700.0, 12.0], [1800.0, 45.0], [1900.0, 103.0], [2000.0, 138.0], [2100.0, 244.0], [2200.0, 250.0], [2300.0, 234.0], [2400.0, 202.0], [2500.0, 208.0], [2600.0, 178.0], [2700.0, 147.0], [2800.0, 120.0], [2900.0, 72.0], [3000.0, 53.0], [3100.0, 46.0], [3200.0, 40.0], [3300.0, 36.0], [3400.0, 14.0], [3500.0, 8.0], [3600.0, 7.0], [3700.0, 3.0], [3800.0, 12.0], [3900.0, 5.0], [4400.0, 1.0], [300.0, 1.0]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[600.0, 15.0], [700.0, 138.0], [800.0, 263.0], [900.0, 385.0], [1000.0, 388.0], [1100.0, 335.0], [1200.0, 286.0], [1300.0, 218.0], [1400.0, 101.0], [1500.0, 40.0], [1600.0, 13.0], [1700.0, 9.0], [1800.0, 5.0], [1900.0, 4.0]], "isOverall": false, "label": "users-list-2", "isController": false}, {"data": [[300.0, 29.0], [600.0, 1.0], [100.0, 493.0], [200.0, 1575.0], [400.0, 5.0]], "isOverall": false, "label": "user_detail-0", "isController": false}, {"data": [[300.0, 16.0], [100.0, 1330.0], [200.0, 832.0], [400.0, 1.0]], "isOverall": false, "label": "categories-delete", "isController": false}, {"data": [[600.0, 69.0], [700.0, 198.0], [800.0, 414.0], [900.0, 489.0], [1000.0, 290.0], [1100.0, 243.0], [1200.0, 195.0], [1300.0, 112.0], [1400.0, 51.0], [1500.0, 17.0], [1600.0, 2.0], [400.0, 2.0], [1700.0, 1.0], [500.0, 20.0]], "isOverall": false, "label": "user_detail-1", "isController": false}, {"data": [[600.0, 44.0], [700.0, 186.0], [800.0, 358.0], [900.0, 485.0], [1000.0, 338.0], [1100.0, 246.0], [1200.0, 211.0], [1300.0, 149.0], [1400.0, 50.0], [1500.0, 21.0], [400.0, 5.0], [1600.0, 1.0], [1800.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "user_detail-2", "isController": false}, {"data": [[300.0, 24.0], [100.0, 1246.0], [200.0, 857.0], [400.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "announcements-create", "isController": false}, {"data": [[2100.0, 207.0], [2300.0, 137.0], [2200.0, 184.0], [2400.0, 128.0], [2500.0, 143.0], [2600.0, 118.0], [2700.0, 89.0], [2800.0, 68.0], [2900.0, 54.0], [3000.0, 29.0], [3100.0, 13.0], [3200.0, 5.0], [3300.0, 4.0], [1100.0, 1.0], [1200.0, 2.0], [1300.0, 4.0], [1400.0, 8.0], [1500.0, 22.0], [1600.0, 44.0], [1700.0, 95.0], [1800.0, 180.0], [1900.0, 259.0], [2000.0, 309.0]], "isOverall": false, "label": "user_detail", "isController": false}, {"data": [[2100.0, 221.0], [2200.0, 193.0], [2300.0, 176.0], [2400.0, 129.0], [2500.0, 87.0], [2600.0, 75.0], [2800.0, 38.0], [2700.0, 35.0], [2900.0, 17.0], [3000.0, 7.0], [3100.0, 5.0], [3200.0, 2.0], [1300.0, 1.0], [1400.0, 19.0], [1500.0, 47.0], [1600.0, 114.0], [1700.0, 184.0], [1800.0, 297.0], [1900.0, 313.0], [2000.0, 234.0]], "isOverall": false, "label": "categories-list", "isController": false}, {"data": [[300.0, 20.0], [700.0, 1.0], [200.0, 1537.0], [100.0, 536.0], [400.0, 3.0], [500.0, 3.0]], "isOverall": false, "label": "donations-list-0", "isController": false}, {"data": [[600.0, 22.0], [700.0, 104.0], [800.0, 334.0], [900.0, 508.0], [1000.0, 333.0], [1100.0, 332.0], [1200.0, 216.0], [1300.0, 148.0], [1400.0, 62.0], [1500.0, 25.0], [1600.0, 3.0], [400.0, 1.0], [1700.0, 1.0], [1800.0, 2.0], [500.0, 9.0]], "isOverall": false, "label": "donations-list-1", "isController": false}, {"data": [[1100.0, 328.0], [1200.0, 275.0], [600.0, 23.0], [1300.0, 154.0], [700.0, 97.0], [1400.0, 44.0], [1500.0, 24.0], [800.0, 292.0], [1600.0, 2.0], [900.0, 462.0], [1000.0, 394.0], [500.0, 5.0]], "isOverall": false, "label": "donations-list-2", "isController": false}, {"data": [[300.0, 20.0], [200.0, 1598.0], [100.0, 580.0], [400.0, 2.0]], "isOverall": false, "label": "users-list-0", "isController": false}, {"data": [[600.0, 12.0], [700.0, 102.0], [800.0, 237.0], [900.0, 341.0], [1000.0, 425.0], [1100.0, 342.0], [1200.0, 335.0], [1300.0, 220.0], [1400.0, 88.0], [1500.0, 49.0], [1600.0, 16.0], [1700.0, 12.0], [1800.0, 7.0], [1900.0, 11.0], [500.0, 3.0]], "isOverall": false, "label": "users-list-1", "isController": false}, {"data": [[1300.0, 5.0], [1400.0, 10.0], [1500.0, 11.0], [1600.0, 23.0], [1700.0, 49.0], [1800.0, 81.0], [1900.0, 122.0], [2000.0, 192.0], [2100.0, 250.0], [2300.0, 215.0], [2200.0, 221.0], [2400.0, 191.0], [2500.0, 171.0], [2600.0, 169.0], [2800.0, 77.0], [2700.0, 139.0], [2900.0, 51.0], [3000.0, 44.0], [3100.0, 32.0], [3200.0, 22.0], [3300.0, 12.0], [3400.0, 5.0], [3500.0, 3.0], [3600.0, 3.0], [3700.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "report-generate", "isController": false}, {"data": [[300.0, 12.0], [100.0, 1426.0], [200.0, 758.0]], "isOverall": false, "label": "resources-update", "isController": false}, {"data": [[300.0, 26.0], [200.0, 1591.0], [100.0, 486.0], [400.0, 6.0]], "isOverall": false, "label": "company_detail-0", "isController": false}, {"data": [[600.0, 123.0], [700.0, 289.0], [800.0, 448.0], [900.0, 446.0], [1000.0, 280.0], [1100.0, 167.0], [1200.0, 150.0], [300.0, 1.0], [1300.0, 98.0], [1400.0, 44.0], [1500.0, 19.0], [1600.0, 2.0], [400.0, 8.0], [500.0, 34.0]], "isOverall": false, "label": "company_detail-1", "isController": false}, {"data": [[300.0, 13.0], [100.0, 1397.0], [200.0, 788.0], [400.0, 1.0]], "isOverall": false, "label": "users-delete", "isController": false}, {"data": [[300.0, 19.0], [200.0, 786.0], [100.0, 1302.0], [400.0, 2.0]], "isOverall": false, "label": "register_company", "isController": false}, {"data": [[600.0, 88.0], [700.0, 274.0], [800.0, 407.0], [900.0, 478.0], [1000.0, 307.0], [1100.0, 194.0], [1200.0, 142.0], [1300.0, 114.0], [1400.0, 59.0], [1500.0, 16.0], [1600.0, 3.0], [400.0, 7.0], [500.0, 20.0]], "isOverall": false, "label": "company_detail-2", "isController": false}, {"data": [[300.0, 11.0], [100.0, 1343.0], [200.0, 742.0], [400.0, 4.0]], "isOverall": false, "label": "binnacle-create", "isController": false}, {"data": [[300.0, 10.0], [100.0, 1357.0], [200.0, 763.0]], "isOverall": false, "label": "announcements-update", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 7500.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 3.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1.500ms"], [2, "Requests having \nresponse time > 1.500ms"], [3, "Requests in error"]], "maxY": 75318.0, "series": [{"data": [[0.0, 75318.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 50339.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1.500ms", "isController": false}, {"data": [[2.0, 24995.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1.500ms", "isController": false}, {"data": [[3.0, 3.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 97.05479002624678, "minX": 1.686024E12, "maxY": 100.0, "series": [{"data": [[1.68602454E12, 100.0], [1.68602448E12, 100.0], [1.68602418E12, 100.0], [1.6860243E12, 100.0], [1.6860246E12, 100.0], [1.68602424E12, 100.0], [1.68602436E12, 100.0], [1.68602406E12, 100.0], [1.68602466E12, 100.0], [1.686024E12, 100.0], [1.68602412E12, 100.0], [1.68602442E12, 100.0], [1.68602472E12, 97.05479002624678]], "isOverall": false, "label": "Prueba de estabilidad", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68602472E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 185.0, "minX": 2.0, "maxY": 2478.155909090907, "series": [{"data": [[100.0, 200.75807185084136]], "isOverall": false, "label": "users-create", "isController": false}, {"data": [[100.0, 200.75807185084136]], "isOverall": false, "label": "users-create-Aggregated", "isController": false}, {"data": [[100.0, 2316.6390476190477]], "isOverall": false, "label": "donations-list", "isController": false}, {"data": [[100.0, 2316.6390476190477]], "isOverall": false, "label": "donations-list-Aggregated", "isController": false}, {"data": [[73.0, 1908.0], [10.0, 1648.0], [100.0, 2160.0031876138414], [56.0, 2051.0]], "isOverall": false, "label": "resources-list", "isController": false}, {"data": [[99.92678490222829, 2159.606184629375]], "isOverall": false, "label": "resources-list-Aggregated", "isController": false}, {"data": [[94.0, 191.0], [100.0, 202.83024251069918]], "isOverall": false, "label": "edit_company", "isController": false}, {"data": [[99.99714828897338, 202.8246197718633]], "isOverall": false, "label": "edit_company-Aggregated", "isController": false}, {"data": [[100.0, 1065.4285714285681]], "isOverall": false, "label": "report-generate-1", "isController": false}, {"data": [[100.0, 1065.4285714285681]], "isOverall": false, "label": "report-generate-1-Aggregated", "isController": false}, {"data": [[100.0, 1093.917142857141]], "isOverall": false, "label": "report-generate-2", "isController": false}, {"data": [[100.0, 1093.917142857141]], "isOverall": false, "label": "report-generate-2-Aggregated", "isController": false}, {"data": [[100.0, 212.0852380952378]], "isOverall": false, "label": "report-generate-0", "isController": false}, {"data": [[100.0, 212.0852380952378]], "isOverall": false, "label": "report-generate-0-Aggregated", "isController": false}, {"data": [[100.0, 199.4233742610274]], "isOverall": false, "label": "logout", "isController": false}, {"data": [[100.0, 199.4233742610274]], "isOverall": false, "label": "logout-Aggregated", "isController": false}, {"data": [[32.0, 210.5], [4.0, 232.0], [73.0, 196.0], [36.0, 328.0], [49.0, 283.0], [100.0, 210.3138151875568], [7.0, 214.0]], "isOverall": false, "label": "categories-list-0", "isController": false}, {"data": [[99.76390154968094, 210.43892433910628]], "isOverall": false, "label": "categories-list-0-Aggregated", "isController": false}, {"data": [[32.0, 928.5], [4.0, 914.0], [73.0, 728.0], [36.0, 931.0], [49.0, 772.0], [100.0, 946.0846294602007], [7.0, 1042.0]], "isOverall": false, "label": "categories-list-1", "isController": false}, {"data": [[99.76390154968094, 945.8327256153141]], "isOverall": false, "label": "categories-list-1-Aggregated", "isController": false}, {"data": [[32.0, 753.0], [4.0, 599.0], [73.0, 984.0], [36.0, 1015.0], [49.0, 1002.0], [100.0, 946.0837145471174], [7.0, 483.0]], "isOverall": false, "label": "categories-list-2", "isController": false}, {"data": [[99.76390154968094, 945.6381039197805]], "isOverall": false, "label": "categories-list-2-Aggregated", "isController": false}, {"data": [[33.0, 2086.0], [32.0, 1987.5], [2.0, 1833.0], [39.0, 2063.0], [11.0, 1646.0], [49.0, 2057.0], [12.0, 1646.0], [53.0, 2156.0], [55.0, 2080.0], [57.0, 2030.0], [17.0, 1857.0], [73.0, 1900.5], [19.0, 1857.0], [6.0, 1739.0], [100.0, 2185.152629129826]], "isOverall": false, "label": "announcements-categories", "isController": false}, {"data": [[99.26470588235293, 2182.0965073529387]], "isOverall": false, "label": "announcements-categories-Aggregated", "isController": false}, {"data": [[100.0, 201.41321921065156]], "isOverall": false, "label": "delete_company", "isController": false}, {"data": [[100.0, 201.41321921065156]], "isOverall": false, "label": "delete_company-Aggregated", "isController": false}, {"data": [[32.0, 2168.0], [49.0, 2053.0], [3.0, 1746.0], [100.0, 2152.38878326996], [51.0, 2022.0]], "isOverall": false, "label": "company_detail", "isController": false}, {"data": [[99.8501659554291, 2152.047415836888]], "isOverall": false, "label": "company_detail-Aggregated", "isController": false}, {"data": [[100.0, 202.43476190476193]], "isOverall": false, "label": "donation-create", "isController": false}, {"data": [[100.0, 202.43476190476193]], "isOverall": false, "label": "donation-create-Aggregated", "isController": false}, {"data": [[73.0, 778.0], [10.0, 916.0], [100.0, 983.1165755919848], [56.0, 883.0]], "isOverall": false, "label": "resources-list-1", "isController": false}, {"data": [[99.92678490222829, 982.9472487494309]], "isOverall": false, "label": "resources-list-1-Aggregated", "isController": false}, {"data": [[73.0, 897.0], [10.0, 503.0], [100.0, 965.9043715847016], [56.0, 934.0]], "isOverall": false, "label": "resources-list-2", "isController": false}, {"data": [[99.92678490222829, 965.6480218281058]], "isOverall": false, "label": "resources-list-2-Aggregated", "isController": false}, {"data": [[73.0, 232.0], [10.0, 229.0], [100.0, 210.89571948998153], [56.0, 234.0]], "isOverall": false, "label": "resources-list-0", "isController": false}, {"data": [[99.92678490222829, 210.92405638926758]], "isOverall": false, "label": "resources-list-0-Aggregated", "isController": false}, {"data": [[100.0, 1141.3495454545464]], "isOverall": false, "label": "login-1", "isController": false}, {"data": [[100.0, 1141.3495454545464]], "isOverall": false, "label": "login-1-Aggregated", "isController": false}, {"data": [[100.0, 210.41545454545454]], "isOverall": false, "label": "login-0", "isController": false}, {"data": [[100.0, 210.41545454545454]], "isOverall": false, "label": "login-0-Aggregated", "isController": false}, {"data": [[98.0, 191.0], [100.0, 201.34557136301075]], "isOverall": false, "label": "categories-update", "isController": false}, {"data": [[99.99908256880734, 201.34082568807358]], "isOverall": false, "label": "categories-update-Aggregated", "isController": false}, {"data": [[79.0, 227.0], [83.0, 212.0], [91.0, 201.0], [96.0, 191.0], [100.0, 201.99811587376396]], "isOverall": false, "label": "announcements-delete", "isController": false}, {"data": [[99.97602256699577, 202.0089327691589]], "isOverall": false, "label": "announcements-delete-Aggregated", "isController": false}, {"data": [[32.0, 272.3333333333333], [2.0, 214.0], [73.0, 221.33333333333334], [10.0, 215.0], [49.0, 328.0], [100.0, 212.8565340909091], [15.0, 209.0]], "isOverall": false, "label": "announcementProjects-list-0", "isController": false}, {"data": [[99.68911917098445, 213.06076307112573]], "isOverall": false, "label": "announcementProjects-list-0-Aggregated", "isController": false}, {"data": [[32.0, 1004.3333333333334], [2.0, 1044.0], [73.0, 822.3333333333334], [10.0, 930.0], [49.0, 776.0], [100.0, 970.250946969697], [15.0, 868.0]], "isOverall": false, "label": "announcementProjects-list-1", "isController": false}, {"data": [[99.68911917098445, 969.8747056052756]], "isOverall": false, "label": "announcementProjects-list-1-Aggregated", "isController": false}, {"data": [[32.0, 813.6666666666666], [2.0, 574.0], [73.0, 962.6666666666666], [10.0, 503.0], [49.0, 952.5], [100.0, 970.1477272727286], [15.0, 494.0]], "isOverall": false, "label": "announcementProjects-list-2", "isController": false}, {"data": [[99.68911917098445, 969.2684879886965]], "isOverall": false, "label": "announcementProjects-list-2-Aggregated", "isController": false}, {"data": [[87.0, 206.0], [85.0, 209.0], [100.0, 200.3313582497721]], "isOverall": false, "label": "resources-delete", "isController": false}, {"data": [[99.9872495446266, 200.33788706739526]], "isOverall": false, "label": "resources-delete-Aggregated", "isController": false}, {"data": [[32.0, 659.0], [35.0, 927.0], [37.0, 1014.0], [38.0, 1472.0], [10.0, 503.0], [49.0, 1002.0], [50.0, 1004.0], [52.0, 993.0], [13.0, 429.0], [16.0, 621.0], [75.0, 935.0], [73.0, 925.2], [77.0, 885.0], [76.0, 937.0], [100.0, 1000.0844673862048]], "isOverall": false, "label": "announcements-list-2", "isController": false}, {"data": [[99.5928338762215, 999.1563517915321]], "isOverall": false, "label": "announcements-list-2-Aggregated", "isController": false}, {"data": [[32.0, 221.0], [35.0, 208.0], [37.0, 247.0], [38.0, 212.0], [10.0, 215.0], [49.0, 373.0], [50.0, 216.0], [52.0, 196.0], [13.0, 213.0], [16.0, 218.0], [75.0, 238.0], [73.0, 212.6], [77.0, 237.0], [76.0, 214.0], [100.0, 216.15204129516667]], "isOverall": false, "label": "announcements-list-0", "isController": false}, {"data": [[99.5928338762215, 216.23592368543518]], "isOverall": false, "label": "announcements-list-0-Aggregated", "isController": false}, {"data": [[33.0, 928.0], [32.0, 771.6666666666666], [2.0, 577.0], [39.0, 1003.0], [11.0, 501.0], [49.0, 975.3333333333334], [12.0, 501.0], [53.0, 1042.0], [55.0, 1069.0], [57.0, 926.0], [17.0, 623.0], [73.0, 934.3333333333334], [19.0, 619.5], [6.0, 595.0], [100.0, 994.4904606793847]], "isOverall": false, "label": "announcements-categories-2", "isController": false}, {"data": [[99.26470588235293, 992.3373161764696]], "isOverall": false, "label": "announcements-categories-2-Aggregated", "isController": false}, {"data": [[32.0, 1071.0], [35.0, 983.0], [37.0, 924.0], [38.0, 771.0], [10.0, 930.0], [49.0, 816.0], [50.0, 884.0], [52.0, 897.0], [13.0, 930.0], [16.0, 991.0], [75.0, 1033.0], [73.0, 830.2], [77.0, 969.0], [76.0, 1052.0], [100.0, 1008.1182543406862]], "isOverall": false, "label": "announcements-list-1", "isController": false}, {"data": [[99.5928338762215, 1007.3066542577953]], "isOverall": false, "label": "announcements-list-1-Aggregated", "isController": false}, {"data": [[33.0, 951.0], [32.0, 1008.6666666666667], [2.0, 1039.0], [39.0, 732.0], [11.0, 946.0], [49.0, 803.3333333333334], [12.0, 926.0], [53.0, 884.0], [55.0, 780.0], [57.0, 870.0], [17.0, 1013.0], [73.0, 747.0], [19.0, 992.5], [6.0, 917.0], [100.0, 979.0777105630532]], "isOverall": false, "label": "announcements-categories-1", "isController": false}, {"data": [[99.26470588235293, 977.9526654411773]], "isOverall": false, "label": "announcements-categories-1-Aggregated", "isController": false}, {"data": [[33.0, 207.0], [32.0, 207.0], [2.0, 217.0], [39.0, 328.0], [11.0, 198.0], [49.0, 278.0], [12.0, 219.0], [53.0, 230.0], [55.0, 231.0], [57.0, 233.0], [17.0, 221.0], [73.0, 219.16666666666669], [19.0, 245.0], [6.0, 227.0], [100.0, 211.49744067007884]], "isOverall": false, "label": "announcements-categories-0", "isController": false}, {"data": [[99.26470588235293, 211.71874999999977]], "isOverall": false, "label": "announcements-categories-0-Aggregated", "isController": false}, {"data": [[100.0, 201.00333333333305]], "isOverall": false, "label": "binnacle-update", "isController": false}, {"data": [[100.0, 201.00333333333305]], "isOverall": false, "label": "binnacle-update-Aggregated", "isController": false}, {"data": [[79.0, 226.0], [80.0, 218.0], [92.0, 200.0], [100.0, 204.02323376007587]], "isOverall": false, "label": "announcementProjects-apply", "isController": false}, {"data": [[99.97679924242425, 204.03835227272728]], "isOverall": false, "label": "announcementProjects-apply-Aggregated", "isController": false}, {"data": [[100.0, 1143.3619827194163]], "isOverall": false, "label": "Home-2", "isController": false}, {"data": [[100.0, 1143.3619827194163]], "isOverall": false, "label": "Home-2-Aggregated", "isController": false}, {"data": [[32.0, 2090.3333333333335], [2.0, 1832.0], [73.0, 2006.3333333333333], [10.0, 1648.0], [49.0, 2057.5], [100.0, 2153.3536931818157], [15.0, 1571.0]], "isOverall": false, "label": "announcementProjects-list", "isController": false}, {"data": [[99.68911917098445, 2152.302873292508]], "isOverall": false, "label": "announcementProjects-list-Aggregated", "isController": false}, {"data": [[100.0, 201.81666666666695]], "isOverall": false, "label": "user-update", "isController": false}, {"data": [[100.0, 201.81666666666695]], "isOverall": false, "label": "user-update-Aggregated", "isController": false}, {"data": [[100.0, 1351.803181818185]], "isOverall": false, "label": "login", "isController": false}, {"data": [[100.0, 1351.803181818185]], "isOverall": false, "label": "login-Aggregated", "isController": false}, {"data": [[100.0, 200.68190476190478]], "isOverall": false, "label": "binnacle-delete", "isController": false}, {"data": [[100.0, 200.68190476190478]], "isOverall": false, "label": "binnacle-delete-Aggregated", "isController": false}, {"data": [[100.0, 218.08590909090935]], "isOverall": false, "label": "Home-0", "isController": false}, {"data": [[100.0, 218.08590909090935]], "isOverall": false, "label": "Home-0-Aggregated", "isController": false}, {"data": [[100.0, 1117.1122727272707]], "isOverall": false, "label": "Home-1", "isController": false}, {"data": [[100.0, 1117.1122727272707]], "isOverall": false, "label": "Home-1-Aggregated", "isController": false}, {"data": [[100.0, 199.40045454545444]], "isOverall": false, "label": "register_user", "isController": false}, {"data": [[100.0, 199.40045454545444]], "isOverall": false, "label": "register_user-Aggregated", "isController": false}, {"data": [[100.0, 201.1425318761383]], "isOverall": false, "label": "resources-create", "isController": false}, {"data": [[100.0, 201.1425318761383]], "isOverall": false, "label": "resources-create-Aggregated", "isController": false}, {"data": [[32.0, 1951.0], [35.0, 2118.0], [37.0, 2185.0], [38.0, 2455.0], [10.0, 1649.0], [49.0, 2191.0], [50.0, 2104.0], [52.0, 2086.0], [13.0, 1572.0], [16.0, 1830.0], [75.0, 2206.0], [73.0, 1968.2], [77.0, 2091.0], [76.0, 2203.0], [100.0, 2224.455185358986]], "isOverall": false, "label": "announcements-list", "isController": false}, {"data": [[99.5928338762215, 2222.7994416007436]], "isOverall": false, "label": "announcements-list-Aggregated", "isController": false}, {"data": [[100.0, 199.4633924511142]], "isOverall": false, "label": "users-update", "isController": false}, {"data": [[100.0, 199.4633924511142]], "isOverall": false, "label": "users-update-Aggregated", "isController": false}, {"data": [[86.0, 208.0], [91.0, 202.0], [89.0, 202.0], [88.0, 204.0], [95.0, 191.0], [100.0, 201.25045871559638]], "isOverall": false, "label": "categories-create", "isController": false}, {"data": [[99.97665903890157, 201.25080091533184]], "isOverall": false, "label": "categories-create-Aggregated", "isController": false}, {"data": [[100.0, 2413.8094588449253], [54.0, 2111.0]], "isOverall": false, "label": "users-list", "isController": false}, {"data": [[99.97909090909091, 2413.671818181814]], "isOverall": false, "label": "users-list-Aggregated", "isController": false}, {"data": [[100.0, 2478.155909090907]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[100.0, 2478.155909090907]], "isOverall": false, "label": "Home-Aggregated", "isController": false}, {"data": [[100.0, 1089.6380172805862], [54.0, 999.0]], "isOverall": false, "label": "users-list-2", "isController": false}, {"data": [[99.97909090909091, 1089.5968181818223]], "isOverall": false, "label": "users-list-2-Aggregated", "isController": false}, {"data": [[35.0, 329.0], [5.0, 229.0], [100.0, 212.68476190476164], [15.0, 198.0]], "isOverall": false, "label": "user_detail-0", "isController": false}, {"data": [[99.88349976224441, 212.74084640989037]], "isOverall": false, "label": "user_detail-0-Aggregated", "isController": false}, {"data": [[74.0, 260.0], [85.0, 210.0], [98.0, 190.0], [100.0, 201.2853860294116]], "isOverall": false, "label": "categories-delete", "isController": false}, {"data": [[99.9802661771455, 201.31115190454318]], "isOverall": false, "label": "categories-delete-Aggregated", "isController": false}, {"data": [[35.0, 935.0], [5.0, 1028.0], [100.0, 1002.7099999999992], [15.0, 1047.0]], "isOverall": false, "label": "user_detail-1", "isController": false}, {"data": [[99.88349976224441, 1002.7108892058956]], "isOverall": false, "label": "user_detail-1-Aggregated", "isController": false}, {"data": [[35.0, 1012.0], [5.0, 486.0], [100.0, 1020.3057142857137], [15.0, 625.0]], "isOverall": false, "label": "user_detail-2", "isController": false}, {"data": [[99.88349976224441, 1019.8597242035182]], "isOverall": false, "label": "user_detail-2-Aggregated", "isController": false}, {"data": [[98.0, 189.0], [100.0, 203.20892018779335]], "isOverall": false, "label": "announcements-create", "isController": false}, {"data": [[99.99906147348662, 203.20225246363202]], "isOverall": false, "label": "announcements-create-Aggregated", "isController": false}, {"data": [[35.0, 2276.0], [5.0, 1744.0], [100.0, 2235.77333333334], [15.0, 1870.0]], "isOverall": false, "label": "user_detail", "isController": false}, {"data": [[99.88349976224441, 2235.384688540187]], "isOverall": false, "label": "user_detail-Aggregated", "isController": false}, {"data": [[32.0, 1892.0], [4.0, 1745.0], [73.0, 1908.0], [36.0, 2274.0], [49.0, 2057.5], [100.0, 2102.566331198532], [7.0, 1739.0]], "isOverall": false, "label": "categories-list", "isController": false}, {"data": [[99.76390154968094, 2101.9940747493124]], "isOverall": false, "label": "categories-list-Aggregated", "isController": false}, {"data": [[100.0, 212.14000000000013]], "isOverall": false, "label": "donations-list-0", "isController": false}, {"data": [[100.0, 212.14000000000013]], "isOverall": false, "label": "donations-list-0-Aggregated", "isController": false}, {"data": [[100.0, 1050.135238095237]], "isOverall": false, "label": "donations-list-1", "isController": false}, {"data": [[100.0, 1050.135238095237]], "isOverall": false, "label": "donations-list-1-Aggregated", "isController": false}, {"data": [[100.0, 1054.2571428571418]], "isOverall": false, "label": "donations-list-2", "isController": false}, {"data": [[100.0, 1054.2571428571418]], "isOverall": false, "label": "donations-list-2-Aggregated", "isController": false}, {"data": [[100.0, 210.07594361073205], [54.0, 230.0]], "isOverall": false, "label": "users-list-0", "isController": false}, {"data": [[99.97909090909091, 210.0849999999999]], "isOverall": false, "label": "users-list-0-Aggregated", "isController": false}, {"data": [[100.0, 1114.0081855388821], [54.0, 882.0]], "isOverall": false, "label": "users-list-1", "isController": false}, {"data": [[99.97909090909091, 1113.902727272728]], "isOverall": false, "label": "users-list-1-Aggregated", "isController": false}, {"data": [[100.0, 2371.5204761904793]], "isOverall": false, "label": "report-generate", "isController": false}, {"data": [[100.0, 2371.5204761904793]], "isOverall": false, "label": "report-generate-Aggregated", "isController": false}, {"data": [[100.0, 199.69945355191243]], "isOverall": false, "label": "resources-update", "isController": false}, {"data": [[100.0, 199.69945355191243]], "isOverall": false, "label": "resources-update-Aggregated", "isController": false}, {"data": [[32.0, 206.0], [49.0, 250.5], [3.0, 200.0], [100.0, 213.3507604562735], [51.0, 205.0]], "isOverall": false, "label": "company_detail-0", "isController": false}, {"data": [[99.8501659554291, 213.37221431958244]], "isOverall": false, "label": "company_detail-0-Aggregated", "isController": false}, {"data": [[32.0, 957.0], [49.0, 835.5], [3.0, 946.0], [100.0, 962.5123574144488], [51.0, 812.0]], "isOverall": false, "label": "company_detail-1", "isController": false}, {"data": [[99.8501659554291, 962.3100995732576]], "isOverall": false, "label": "company_detail-1-Aggregated", "isController": false}, {"data": [[100.0, 200.49840836743945]], "isOverall": false, "label": "users-delete", "isController": false}, {"data": [[100.0, 200.49840836743945]], "isOverall": false, "label": "users-delete-Aggregated", "isController": false}, {"data": [[100.0, 201.6348980559505]], "isOverall": false, "label": "register_company", "isController": false}, {"data": [[100.0, 201.6348980559505]], "isOverall": false, "label": "register_company-Aggregated", "isController": false}, {"data": [[32.0, 1005.0], [49.0, 967.0], [3.0, 600.0], [100.0, 976.4429657794659], [51.0, 1005.0]], "isOverall": false, "label": "company_detail-2", "isController": false}, {"data": [[99.8501659554291, 976.2825983878596]], "isOverall": false, "label": "company_detail-2-Aggregated", "isController": false}, {"data": [[100.0, 200.418095238095]], "isOverall": false, "label": "binnacle-create", "isController": false}, {"data": [[100.0, 200.418095238095]], "isOverall": false, "label": "binnacle-create-Aggregated", "isController": false}, {"data": [[82.0, 215.0], [81.0, 216.0], [99.0, 185.0], [100.0, 200.88199341795902]], "isOverall": false, "label": "announcements-update", "isController": false}, {"data": [[99.98215962441316, 200.8882629107976]], "isOverall": false, "label": "announcements-update-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 20992.516666666666, "minX": 1.686024E12, "maxY": 404527.5833333333, "series": [{"data": [[1.68602454E12, 402704.98333333334], [1.68602448E12, 401577.4666666667], [1.68602418E12, 365754.9], [1.6860243E12, 374552.55], [1.6860246E12, 373347.38333333336], [1.68602424E12, 368242.25], [1.68602436E12, 355874.7833333333], [1.68602406E12, 404527.5833333333], [1.68602466E12, 371689.0333333333], [1.686024E12, 153959.1], [1.68602412E12, 341026.9], [1.68602442E12, 373704.73333333334], [1.68602472E12, 184759.28333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.68602454E12, 55317.45], [1.68602448E12, 55180.96666666667], [1.68602418E12, 50089.53333333333], [1.6860243E12, 51018.73333333333], [1.6860246E12, 51469.76666666667], [1.68602424E12, 50991.083333333336], [1.68602436E12, 48411.683333333334], [1.68602406E12, 55436.36666666667], [1.68602466E12, 50719.28333333333], [1.686024E12, 20992.516666666666], [1.68602412E12, 46176.416666666664], [1.68602442E12, 50855.4], [1.68602472E12, 24776.3]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68602472E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 194.0, "minX": 1.686024E12, "maxY": 3132.7599999999998, "series": [{"data": [[1.68602454E12, 202.915343915344], [1.68602448E12, 200.38418079096047], [1.68602418E12, 198.92920353982296], [1.6860243E12, 199.20500000000007], [1.6860246E12, 201.6968085106383], [1.68602424E12, 200.79144385026748], [1.68602436E12, 200.04999999999998], [1.68602406E12, 200.345], [1.68602466E12, 201.5849999999999], [1.686024E12, 203.54999999999995], [1.68602412E12, 201.06000000000003], [1.68602442E12, 197.6780821917809], [1.68602472E12, 202.3939393939394]], "isOverall": false, "label": "users-create", "isController": false}, {"data": [[1.68602454E12, 2186.712820512822], [1.68602436E12, 2272.9798994974867], [1.68602406E12, 2217.7000000000003], [1.68602466E12, 2669.5240963855435], [1.68602448E12, 2204.4399999999996], [1.68602418E12, 2380.280000000001], [1.6860243E12, 2362.4683544303793], [1.68602412E12, 2289.2449999999994], [1.6860246E12, 2434.3776223776235], [1.68602442E12, 2242.3099999999986], [1.68602424E12, 2521.706293706294], [1.68602472E12, 2023.791666666667]], "isOverall": false, "label": "donations-list", "isController": false}, {"data": [[1.68602454E12, 1995.3959390862929], [1.68602448E12, 1987.8829787234051], [1.68602418E12, 2164.0162601626007], [1.6860243E12, 2301.1299999999987], [1.6860246E12, 2137.096938775509], [1.68602424E12, 2223.1850000000013], [1.68602436E12, 2360.8526315789472], [1.68602406E12, 1760.7700000000002], [1.68602466E12, 2216.0800000000004], [1.686024E12, 1727.6599999999999], [1.68602412E12, 2638.7627118644064], [1.68602442E12, 2415.5503875969], [1.68602472E12, 1988.7474747474746]], "isOverall": false, "label": "resources-list", "isController": false}, {"data": [[1.68602454E12, 202.08000000000004], [1.68602448E12, 200.53999999999996], [1.68602418E12, 198.3750000000001], [1.6860243E12, 201.74809160305347], [1.6860246E12, 203.00529100529099], [1.68602424E12, 204.1161616161617], [1.68602436E12, 202.67836257309943], [1.68602406E12, 197.70059880239518], [1.68602466E12, 214.94814814814816], [1.686024E12, 201.64705882352942], [1.68602412E12, 209.72121212121215], [1.68602442E12, 201.38000000000002], [1.68602472E12, 200.6]], "isOverall": false, "label": "edit_company", "isController": false}, {"data": [[1.68602454E12, 1002.8770053475938], [1.68602436E12, 1098.6249999999998], [1.68602406E12, 844.9249999999998], [1.68602466E12, 1237.357541899441], [1.68602448E12, 1013.4591836734701], [1.68602418E12, 1060.939698492462], [1.6860243E12, 1112.3922651933703], [1.68602412E12, 1168.6150000000007], [1.6860246E12, 1077.7318840579712], [1.68602442E12, 1077.5049999999992], [1.68602424E12, 1159.316666666666], [1.68602472E12, 914.88]], "isOverall": false, "label": "report-generate-1", "isController": false}, {"data": [[1.68602454E12, 1013.6000000000004], [1.68602436E12, 1111.165], [1.68602406E12, 873.4899999999999], [1.68602466E12, 1238.2780748663101], [1.68602448E12, 1015.4814814814813], [1.68602418E12, 1077.7591623036647], [1.6860243E12, 1153.1709844559587], [1.68602412E12, 1316.6299999999999], [1.6860246E12, 1053.6402877697838], [1.68602442E12, 1105.66], [1.68602424E12, 1190.1206896551726], [1.68602472E12, 919.1299999999998]], "isOverall": false, "label": "report-generate-2", "isController": false}, {"data": [[1.68602454E12, 213.55851063829775], [1.68602436E12, 212.64], [1.68602406E12, 211.37999999999985], [1.68602466E12, 210.65882352941182], [1.68602448E12, 213.11557788944728], [1.68602418E12, 208.84500000000003], [1.6860243E12, 212.30357142857142], [1.68602412E12, 212.79000000000008], [1.6860246E12, 211.51388888888894], [1.68602442E12, 210.49499999999998], [1.68602424E12, 210.0984848484849], [1.68602472E12, 221.41414141414148]], "isOverall": false, "label": "report-generate-0", "isController": false}, {"data": [[1.68602454E12, 204.2041884816754], [1.68602448E12, 197.03208556149735], [1.68602418E12, 197.75892857142856], [1.6860243E12, 198.7949999999999], [1.6860246E12, 202.01047120418852], [1.68602424E12, 198.40740740740753], [1.68602436E12, 198.41206030150767], [1.68602406E12, 198.50500000000008], [1.68602466E12, 199.15500000000003], [1.686024E12, 200.79], [1.68602412E12, 198.50753768844214], [1.68602442E12, 196.58333333333343], [1.68602472E12, 203.49494949494945]], "isOverall": false, "label": "logout", "isController": false}, {"data": [[1.68602454E12, 214.4923857868022], [1.68602448E12, 210.98461538461535], [1.68602418E12, 206.9295774647888], [1.6860243E12, 210.23500000000004], [1.6860246E12, 217.24120603015072], [1.68602424E12, 209.00999999999993], [1.68602436E12, 208.03954802259886], [1.68602406E12, 205.95], [1.68602466E12, 209.12500000000003], [1.686024E12, 204.56], [1.68602412E12, 209.8227848101266], [1.68602442E12, 211.88636363636365], [1.68602472E12, 217.30851063829786]], "isOverall": false, "label": "categories-list-0", "isController": false}, {"data": [[1.68602454E12, 877.2929292929293], [1.68602448E12, 865.0355329949239], [1.68602418E12, 937.5939393939393], [1.6860243E12, 971.5800000000004], [1.6860246E12, 937.6999999999998], [1.68602424E12, 975.2600000000003], [1.68602436E12, 1119.8362573099412], [1.68602406E12, 741.5250000000004], [1.68602466E12, 955.6834170854271], [1.686024E12, 876.84], [1.68602412E12, 1115.9407407407414], [1.68602442E12, 1072.4477611940306], [1.68602472E12, 920.0842105263159]], "isOverall": false, "label": "categories-list-1", "isController": false}, {"data": [[1.68602454E12, 867.7587939698492], [1.68602448E12, 859.9195979899492], [1.68602418E12, 917.9886363636365], [1.6860243E12, 966.5300000000001], [1.6860246E12, 959.7199999999998], [1.68602424E12, 966.76], [1.68602436E12, 1142.8366013071898], [1.68602406E12, 765.7749999999997], [1.68602466E12, 920.2311557788937], [1.686024E12, 885.35], [1.68602412E12, 1118.2177419354832], [1.68602442E12, 1099.6912751677846], [1.68602472E12, 932.3263157894736]], "isOverall": false, "label": "categories-list-2", "isController": false}, {"data": [[1.68602454E12, 1965.6000000000001], [1.68602448E12, 1977.7000000000003], [1.68602418E12, 2071.5969387755094], [1.6860243E12, 2176.510000000001], [1.6860246E12, 2157.6049999999996], [1.68602424E12, 2209.395000000001], [1.68602436E12, 2712.538461538461], [1.68602406E12, 2042.6349999999993], [1.68602466E12, 2032.5492227979275], [1.686024E12, 2506.1799999999994], [1.68602412E12, 2560.2403846153848], [1.68602442E12, 2406.366120218579], [1.68602472E12, 2041.2409638554225]], "isOverall": false, "label": "announcements-categories", "isController": false}, {"data": [[1.68602454E12, 203.60499999999996], [1.68602448E12, 199.42999999999998], [1.68602418E12, 197.70000000000002], [1.6860243E12, 201.58399999999995], [1.6860246E12, 204.79032258064512], [1.68602424E12, 200.64974619289342], [1.68602436E12, 200.3820224719101], [1.68602406E12, 199.21637426900577], [1.68602466E12, 207.90579710144928], [1.686024E12, 198.33333333333334], [1.68602412E12, 202.72189349112423], [1.68602442E12, 199.70499999999993], [1.68602472E12, 203.56962025316454]], "isOverall": false, "label": "delete_company", "isController": false}, {"data": [[1.68602454E12, 2001.6500000000005], [1.68602448E12, 2036.165000000001], [1.68602418E12, 2437.9500000000007], [1.6860243E12, 2166.187969924813], [1.6860246E12, 2425.205263157894], [1.68602424E12, 2352.0454545454554], [1.68602436E12, 2294.52071005917], [1.68602406E12, 1870.3870967741934], [1.68602466E12, 2277.6296296296296], [1.686024E12, 1731.1375], [1.68602412E12, 2085.70303030303], [1.68602442E12, 1983.5199999999998], [1.68602472E12, 1957.357142857143]], "isOverall": false, "label": "company_detail", "isController": false}, {"data": [[1.68602454E12, 203.49740932642501], [1.68602436E12, 204.2462311557788], [1.68602406E12, 205.32499999999993], [1.68602466E12, 204.72189349112423], [1.68602448E12, 201.94472361809045], [1.68602418E12, 197.61500000000007], [1.6860243E12, 200.69374999999997], [1.68602412E12, 203.33], [1.6860246E12, 201.25174825174835], [1.68602442E12, 198.76000000000005], [1.68602424E12, 200.1914893617021], [1.68602472E12, 211.30208333333331]], "isOverall": false, "label": "donation-create", "isController": false}, {"data": [[1.68602454E12, 895.071794871795], [1.68602448E12, 891.5107526881721], [1.68602418E12, 986.0090909090907], [1.6860243E12, 1064.249999999999], [1.6860246E12, 957.2653061224487], [1.68602424E12, 1028.757575757576], [1.68602436E12, 1072.776649746193], [1.68602406E12, 794.3150000000002], [1.68602466E12, 1016.3149999999997], [1.686024E12, 725.9399999999996], [1.68602412E12, 1238.4270833333335], [1.68602442E12, 1101.3888888888882], [1.68602472E12, 867.6969696969694]], "isOverall": false, "label": "resources-list-1", "isController": false}, {"data": [[1.68602454E12, 882.4771573604058], [1.68602448E12, 884.5372340425529], [1.68602418E12, 960.1951219512196], [1.6860243E12, 1026.135000000001], [1.6860246E12, 966.1632653061221], [1.68602424E12, 981.1599999999994], [1.68602436E12, 1083.2421052631576], [1.68602406E12, 758.5499999999998], [1.68602466E12, 988.2000000000003], [1.686024E12, 780.23], [1.68602412E12, 1183.5536723163834], [1.68602442E12, 1098.116279069767], [1.68602472E12, 909.6262626262625]], "isOverall": false, "label": "resources-list-2", "isController": false}, {"data": [[1.68602454E12, 216.17894736842106], [1.68602448E12, 210.83957219251334], [1.68602418E12, 208.57142857142856], [1.6860243E12, 210.6449999999999], [1.6860246E12, 213.75647668393793], [1.68602424E12, 208.3015873015873], [1.68602436E12, 209.94974874371854], [1.68602406E12, 207.815], [1.68602466E12, 211.53499999999997], [1.686024E12, 221.39000000000001], [1.68602412E12, 207.82412060301516], [1.68602442E12, 207.2290076335877], [1.68602472E12, 211.26262626262624]], "isOverall": false, "label": "resources-list-0", "isController": false}, {"data": [[1.68602454E12, 986.7191011235954], [1.68602448E12, 995.3867403314913], [1.68602418E12, 1175.222972972973], [1.6860243E12, 1182.407035175878], [1.6860246E12, 1032.9285714285716], [1.68602424E12, 1146.5686274509806], [1.68602436E12, 1160.875], [1.68602406E12, 1107.0650000000005], [1.68602466E12, 1187.0710659898482], [1.686024E12, 1170.18], [1.68602412E12, 1485.775], [1.68602442E12, 1153.6988636363635], [1.68602472E12, 923.1399999999999]], "isOverall": false, "label": "login-1", "isController": false}, {"data": [[1.68602454E12, 212.50279329608952], [1.68602448E12, 210.06779661016944], [1.68602418E12, 206.47852760736197], [1.6860243E12, 210.1356783919598], [1.6860246E12, 210.75776397515523], [1.68602424E12, 209.55072463768118], [1.68602436E12, 214.8900000000001], [1.68602406E12, 207.69500000000008], [1.68602466E12, 212.54591836734684], [1.686024E12, 208.79000000000002], [1.68602412E12, 209.02999999999994], [1.68602442E12, 207.1336898395722], [1.68602472E12, 217.7599999999999]], "isOverall": false, "label": "login-0", "isController": false}, {"data": [[1.68602454E12, 206.99999999999994], [1.68602448E12, 200.9100000000001], [1.68602418E12, 200.82872928176795], [1.6860243E12, 201.12000000000003], [1.6860246E12, 205.61499999999992], [1.68602424E12, 197.5399999999999], [1.68602436E12, 200.86713286713288], [1.68602406E12, 197.51], [1.68602466E12, 202.0150753768844], [1.686024E12, 199.90000000000003], [1.68602412E12, 200.29411764705884], [1.68602442E12, 199.17088607594937], [1.68602472E12, 205.20987654320987]], "isOverall": false, "label": "categories-update", "isController": false}, {"data": [[1.68602454E12, 201.26499999999993], [1.68602448E12, 203.15499999999994], [1.68602418E12, 200.10999999999993], [1.6860243E12, 203.18518518518516], [1.6860246E12, 202.62814070351763], [1.68602424E12, 199.9999999999999], [1.68602436E12, 198.0088495575221], [1.68602406E12, 198.57000000000008], [1.68602466E12, 210.0395480225989], [1.686024E12, 204.04999999999998], [1.68602412E12, 200.34999999999997], [1.68602442E12, 200.11616161616158], [1.68602472E12, 210.05882352941182]], "isOverall": false, "label": "announcements-delete", "isController": false}, {"data": [[1.68602454E12, 209.08500000000004], [1.68602448E12, 214.72000000000006], [1.68602418E12, 209.59500000000003], [1.6860243E12, 212.8502673796792], [1.6860246E12, 217.4773869346734], [1.68602424E12, 208.58000000000007], [1.68602436E12, 211.00000000000003], [1.68602406E12, 208.53999999999996], [1.68602466E12, 225.22413793103448], [1.686024E12, 215.72000000000003], [1.68602412E12, 208.54999999999993], [1.68602442E12, 213.2020202020202], [1.68602472E12, 220.96000000000004]], "isOverall": false, "label": "announcementProjects-list-0", "isController": false}, {"data": [[1.68602454E12, 887.8800000000003], [1.68602448E12, 903.2799999999997], [1.68602418E12, 1070.4050000000002], [1.6860243E12, 973.7118644067799], [1.6860246E12, 1054.3216080402012], [1.68602424E12, 1060.8850000000002], [1.68602436E12, 1167.838709677419], [1.68602406E12, 935.4358974358977], [1.68602466E12, 931.9629629629629], [1.686024E12, 746.0999999999998], [1.68602412E12, 959.4857142857142], [1.68602442E12, 928.3366834170853], [1.68602472E12, 872.6129032258066]], "isOverall": false, "label": "announcementProjects-list-1", "isController": false}, {"data": [[1.68602454E12, 902.7850000000001], [1.68602448E12, 920.9600000000002], [1.68602418E12, 1075.4600000000007], [1.6860243E12, 957.8224852071005], [1.6860246E12, 1089.1060606060605], [1.68602424E12, 1057.35], [1.68602436E12, 1158.8030303030307], [1.68602406E12, 883.5956284153006], [1.68602466E12, 935.6794871794878], [1.686024E12, 718.7799999999999], [1.68602412E12, 940.1965811965807], [1.68602442E12, 937.170854271357], [1.68602472E12, 868.5072463768117]], "isOverall": false, "label": "announcementProjects-list-2", "isController": false}, {"data": [[1.68602454E12, 206.1167512690356], [1.68602448E12, 199.82474226804132], [1.68602418E12, 197.3014705882353], [1.6860243E12, 200.46], [1.6860246E12, 204.44723618090447], [1.68602424E12, 197.44], [1.68602436E12, 198.64999999999995], [1.68602406E12, 198.57499999999996], [1.68602466E12, 198.7700000000001], [1.686024E12, 197.24000000000004], [1.68602412E12, 199.44512195121956], [1.68602442E12, 200.33076923076922], [1.68602472E12, 205.94791666666666]], "isOverall": false, "label": "resources-delete", "isController": false}, {"data": [[1.68602454E12, 877.815], [1.68602448E12, 876.5900000000004], [1.68602418E12, 1016.1949999999996], [1.6860243E12, 971.0773195876287], [1.6860246E12, 1012.095], [1.68602424E12, 1021.5949999999999], [1.68602436E12, 1301.0925925925928], [1.68602406E12, 1026.8999999999999], [1.68602466E12, 902.6994535519123], [1.686024E12, 1150.9999999999995], [1.68602412E12, 1114.5500000000004], [1.68602442E12, 1015.8030303030307], [1.68602472E12, 896.4242424242426]], "isOverall": false, "label": "announcements-list-2", "isController": false}, {"data": [[1.68602454E12, 216.56999999999996], [1.68602448E12, 220.7849999999999], [1.68602418E12, 213.47959183673478], [1.6860243E12, 213.62500000000006], [1.6860246E12, 222.02499999999995], [1.68602424E12, 232.70000000000005], [1.68602436E12, 209.78632478632477], [1.68602406E12, 208.44000000000003], [1.68602466E12, 215.73298429319374], [1.686024E12, 207.02999999999997], [1.68602412E12, 208.46153846153854], [1.68602442E12, 214.8306010928962], [1.68602472E12, 216.77586206896558]], "isOverall": false, "label": "announcements-list-0", "isController": false}, {"data": [[1.68602454E12, 881.0549999999998], [1.68602448E12, 881.3550000000001], [1.68602418E12, 932.1275510204084], [1.6860243E12, 991.7399999999998], [1.6860246E12, 975.1799999999998], [1.68602424E12, 1008.0099999999998], [1.68602436E12, 1270.2564102564104], [1.68602406E12, 957.6900000000004], [1.68602466E12, 904.9170984455957], [1.686024E12, 1229.2599999999998], [1.68602412E12, 1144.240384615384], [1.68602442E12, 1080.9453551912572], [1.68602472E12, 898.9638554216867]], "isOverall": false, "label": "announcements-categories-2", "isController": false}, {"data": [[1.68602454E12, 892.73], [1.68602448E12, 886.5550000000001], [1.68602418E12, 983.2110552763819], [1.6860243E12, 970.7121212121214], [1.6860246E12, 999.875], [1.68602424E12, 1000.6199999999997], [1.68602436E12, 1305.7090909090914], [1.68602406E12, 1013.9899999999998], [1.68602466E12, 913.0952380952385], [1.686024E12, 1264.4600000000005], [1.68602412E12, 1133.841584158416], [1.68602442E12, 1064.3437500000002], [1.68602472E12, 942.7833333333333]], "isOverall": false, "label": "announcements-list-1", "isController": false}, {"data": [[1.68602454E12, 870.33], [1.68602448E12, 883.4500000000002], [1.68602418E12, 924.7842105263162], [1.6860243E12, 973.1449999999998], [1.6860246E12, 968.2199999999996], [1.68602424E12, 991.4749999999993], [1.68602436E12, 1226.8661417322835], [1.68602406E12, 874.9849999999998], [1.68602466E12, 913.0812182741115], [1.686024E12, 1069.05], [1.68602412E12, 1198.7818181818182], [1.68602442E12, 1111.1734104046236], [1.68602472E12, 927.8734177215191]], "isOverall": false, "label": "announcements-categories-1", "isController": false}, {"data": [[1.68602454E12, 214.16080402010056], [1.68602448E12, 212.87000000000003], [1.68602418E12, 209.3582887700535], [1.6860243E12, 211.53500000000003], [1.6860246E12, 214.12500000000003], [1.68602424E12, 209.80499999999998], [1.68602436E12, 213.20143884892084], [1.68602406E12, 209.9100000000001], [1.68602466E12, 212.99494949494954], [1.686024E12, 207.80999999999995], [1.68602412E12, 210.95575221238946], [1.68602442E12, 208.5493827160493], [1.68602472E12, 218.85897435897436]], "isOverall": false, "label": "announcements-categories-0", "isController": false}, {"data": [[1.68602454E12, 202.24607329842925], [1.68602436E12, 199.61499999999995], [1.68602406E12, 203.56], [1.68602466E12, 201.41071428571422], [1.68602448E12, 200.05025125628143], [1.68602418E12, 198.1], [1.6860243E12, 200.94478527607365], [1.68602412E12, 202.6150000000001], [1.6860246E12, 200.62237762237757], [1.68602442E12, 199.00000000000003], [1.68602424E12, 197.84671532846716], [1.68602472E12, 209.14141414141423]], "isOverall": false, "label": "binnacle-update", "isController": false}, {"data": [[1.68602454E12, 203.04000000000002], [1.68602448E12, 204.6800000000001], [1.68602418E12, 200.08], [1.6860243E12, 204.452380952381], [1.6860246E12, 204.9848484848486], [1.68602424E12, 200.60500000000002], [1.68602436E12, 198.15037593984965], [1.68602406E12, 203.86263736263732], [1.68602466E12, 212.6052631578948], [1.686024E12, 201.30999999999997], [1.68602412E12, 212.7542372881356], [1.68602442E12, 204.9748743718593], [1.68602472E12, 201.83870967741933]], "isOverall": false, "label": "announcementProjects-apply", "isController": false}, {"data": [[1.68602454E12, 1025.2954545454545], [1.68602448E12, 1011.5112359550565], [1.68602418E12, 1154.6666666666674], [1.6860243E12, 1188.5276381909546], [1.6860246E12, 1042.993827160494], [1.68602424E12, 1177.9705882352937], [1.68602436E12, 1167.8449999999998], [1.68602406E12, 1055.829145728642], [1.68602466E12, 1220.1384615384632], [1.686024E12, 1073.4199999999998], [1.68602412E12, 1492.3149999999994], [1.68602442E12, 1155.656084656084], [1.68602472E12, 917.1599999999997]], "isOverall": false, "label": "Home-2", "isController": false}, {"data": [[1.68602454E12, 1999.795000000001], [1.68602448E12, 2039.0700000000002], [1.68602418E12, 2355.545000000001], [1.6860243E12, 2156.869822485206], [1.6860246E12, 2359.8484848484864], [1.68602424E12, 2326.9299999999985], [1.68602436E12, 2510.1893939393935], [1.68602406E12, 2027.098360655738], [1.68602466E12, 2099.0961538461543], [1.686024E12, 1680.7100000000005], [1.68602412E12, 2106.6666666666665], [1.68602442E12, 2078.9396984924624], [1.68602472E12, 1960.6811594202895]], "isOverall": false, "label": "announcementProjects-list", "isController": false}, {"data": [[1.68602454E12, 200.7323232323232], [1.68602448E12, 200.2349999999999], [1.68602418E12, 199.805], [1.6860243E12, 201.36718750000003], [1.6860246E12, 199.688622754491], [1.68602424E12, 200.98863636363615], [1.68602436E12, 201.34693877551027], [1.68602406E12, 200.60891089108912], [1.68602466E12, 204.64335664335667], [1.686024E12, 194.0], [1.68602412E12, 205.25888324873094], [1.68602442E12, 202.11499999999992], [1.68602472E12, 209.3586956521739]], "isOverall": false, "label": "user-update", "isController": false}, {"data": [[1.68602454E12, 1199.9887640449444], [1.68602448E12, 1204.5414364640887], [1.68602418E12, 1381.8310810810813], [1.6860243E12, 1392.5678391959793], [1.6860246E12, 1243.4583333333335], [1.68602424E12, 1355.771241830065], [1.68602436E12, 1375.7899999999997], [1.68602406E12, 1314.7850000000008], [1.68602466E12, 1399.593908629441], [1.686024E12, 1379.0400000000006], [1.68602412E12, 1694.819999999999], [1.68602442E12, 1361.244318181818], [1.68602472E12, 1140.9900000000007]], "isOverall": false, "label": "login", "isController": false}, {"data": [[1.68602454E12, 202.738219895288], [1.68602436E12, 200.47000000000006], [1.68602406E12, 202.34999999999997], [1.68602466E12, 199.84523809523805], [1.68602448E12, 200.7889447236181], [1.68602418E12, 198.54000000000002], [1.6860243E12, 200.51219512195124], [1.68602412E12, 200.45499999999996], [1.6860246E12, 202.46853146853158], [1.68602442E12, 197.25], [1.68602424E12, 198.86029411764707], [1.68602472E12, 206.89898989898992]], "isOverall": false, "label": "binnacle-delete", "isController": false}, {"data": [[1.68602454E12, 215.38043478260872], [1.68602448E12, 208.5591397849462], [1.68602418E12, 207.36842105263162], [1.6860243E12, 210.8195876288659], [1.6860246E12, 208.3496503496504], [1.68602424E12, 208.9137931034483], [1.68602436E12, 214.54000000000005], [1.68602406E12, 213.45], [1.68602466E12, 210.9358288770053], [1.686024E12, 361.7699999999999], [1.68602412E12, 213.33999999999997], [1.68602442E12, 208.2000000000001], [1.68602472E12, 215.11999999999995]], "isOverall": false, "label": "Home-0", "isController": false}, {"data": [[1.68602454E12, 1010.7318435754183], [1.68602448E12, 1016.2651933701655], [1.68602418E12, 1119.093406593407], [1.6860243E12, 1162.10101010101], [1.6860246E12, 1038.4697986577182], [1.68602424E12, 1168.9416666666662], [1.68602436E12, 1154.835], [1.68602406E12, 954.195], [1.68602466E12, 1234.7886597938148], [1.686024E12, 978.8999999999999], [1.68602412E12, 1426.9999999999998], [1.68602442E12, 1145.5482233502541], [1.68602472E12, 936.8800000000001]], "isOverall": false, "label": "Home-1", "isController": false}, {"data": [[1.68602454E12, 201.97765363128494], [1.68602448E12, 197.74719101123605], [1.68602418E12, 197.52777777777777], [1.6860243E12, 200.68999999999997], [1.6860246E12, 200.03508771929822], [1.68602424E12, 199.09615384615373], [1.68602436E12, 199.47000000000006], [1.68602406E12, 199.35500000000005], [1.68602466E12, 201.01015228426394], [1.686024E12, 200.24000000000004], [1.68602412E12, 196.70000000000005], [1.68602442E12, 196.86857142857136], [1.68602472E12, 203.01]], "isOverall": false, "label": "register_user", "isController": false}, {"data": [[1.68602454E12, 205.14795918367346], [1.68602448E12, 203.60638297872345], [1.68602418E12, 197.23015873015882], [1.6860243E12, 201.39000000000001], [1.6860246E12, 203.48743718592974], [1.68602424E12, 200.785], [1.68602436E12, 199.20430107526875], [1.68602406E12, 200.1149999999999], [1.68602466E12, 199.64000000000007], [1.686024E12, 201.85999999999996], [1.68602412E12, 200.04597701149424], [1.68602442E12, 197.16030534351142], [1.68602472E12, 204.34375000000009]], "isOverall": false, "label": "resources-create", "isController": false}, {"data": [[1.68602454E12, 1987.205], [1.68602448E12, 1984.0199999999995], [1.68602418E12, 2213.5450000000014], [1.6860243E12, 2158.8041237113403], [1.6860246E12, 2234.07], [1.68602424E12, 2254.9949999999985], [1.68602436E12, 2804.9722222222217], [1.68602406E12, 2249.420000000001], [1.68602466E12, 2030.7923497267757], [1.686024E12, 2622.620000000001], [1.68602412E12, 2457.0800000000004], [1.68602442E12, 2298.6262626262637], [1.68602472E12, 2055.5606060606056]], "isOverall": false, "label": "announcements-list", "isController": false}, {"data": [[1.68602454E12, 203.16931216931226], [1.68602448E12, 200.20555555555558], [1.68602418E12, 197.23214285714292], [1.6860243E12, 197.695], [1.6860246E12, 204.4308510638298], [1.68602424E12, 198.12765957446805], [1.68602436E12, 199.00500000000002], [1.68602406E12, 198.78499999999994], [1.68602466E12, 199.73499999999996], [1.686024E12, 198.08000000000004], [1.68602412E12, 198.01999999999998], [1.68602442E12, 196.5244755244754], [1.68602472E12, 200.54545454545453]], "isOverall": false, "label": "users-update", "isController": false}, {"data": [[1.68602454E12, 207.1507537688441], [1.68602448E12, 202.25125628140717], [1.68602418E12, 204.20994475138124], [1.6860243E12, 200.41499999999982], [1.6860246E12, 207.67], [1.68602424E12, 196.25000000000003], [1.68602436E12, 198.97260273972609], [1.68602406E12, 197.48499999999996], [1.68602466E12, 200.1608040201005], [1.686024E12, 200.32999999999998], [1.68602412E12, 197.99159663865547], [1.68602442E12, 197.7628205128205], [1.68602472E12, 204.75581395348829]], "isOverall": false, "label": "categories-create", "isController": false}, {"data": [[1.68602454E12, 2169.4791666666656], [1.68602448E12, 2135.463687150839], [1.68602418E12, 2381.389380530973], [1.6860243E12, 2520.7200000000007], [1.6860246E12, 2188.434065934067], [1.68602424E12, 2473.9037433155077], [1.68602436E12, 2450.860000000001], [1.68602406E12, 2276.5899999999983], [1.68602466E12, 2476.745], [1.686024E12, 2582.17], [1.68602412E12, 3005.565], [1.68602442E12, 2548.986394557824], [1.68602472E12, 2022.6399999999992]], "isOverall": false, "label": "users-list", "isController": false}, {"data": [[1.68602454E12, 2252.5965909090896], [1.68602448E12, 2235.0280898876385], [1.68602418E12, 2437.0242424242433], [1.6860243E12, 2560.2663316582916], [1.6860246E12, 2285.259259259259], [1.68602424E12, 2604.772058823529], [1.68602436E12, 2537.3450000000003], [1.68602406E12, 2218.259999999999], [1.68602466E12, 2666.928205128205], [1.686024E12, 2414.64], [1.68602412E12, 3132.7599999999998], [1.68602442E12, 2515.613756613756], [1.68602472E12, 2069.4900000000002]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[1.68602454E12, 970.2604166666669], [1.68602448E12, 954.4636871508382], [1.68602418E12, 1100.3008849557527], [1.6860243E12, 1148.8449999999991], [1.6860246E12, 982.0989010989009], [1.68602424E12, 1107.8823529411773], [1.68602436E12, 1109.4700000000007], [1.68602406E12, 1005.3249999999991], [1.68602466E12, 1111.9550000000004], [1.686024E12, 1218.71], [1.68602412E12, 1367.2049999999995], [1.68602442E12, 1153.4897959183677], [1.68602472E12, 897.2999999999998]], "isOverall": false, "label": "users-list-2", "isController": false}, {"data": [[1.68602454E12, 212.6550000000001], [1.68602448E12, 212.46499999999992], [1.68602418E12, 207.67499999999998], [1.6860243E12, 212.48412698412696], [1.6860246E12, 212.89247311827955], [1.68602424E12, 210.17857142857147], [1.68602436E12, 209.54494382022472], [1.68602406E12, 212.18232044198902], [1.68602466E12, 220.51111111111103], [1.686024E12, 202.78571428571433], [1.68602412E12, 218.08474576271192], [1.68602442E12, 212.955], [1.68602472E12, 220.5731707317073]], "isOverall": false, "label": "user_detail-0", "isController": false}, {"data": [[1.68602454E12, 208.70351758793961], [1.68602448E12, 199.1350000000001], [1.68602418E12, 199.7322404371586], [1.6860243E12, 199.08000000000004], [1.6860246E12, 205.85000000000002], [1.68602424E12, 199.23999999999998], [1.68602436E12, 199.81428571428577], [1.68602406E12, 197.94000000000003], [1.68602466E12, 203.43718592964825], [1.686024E12, 198.42999999999992], [1.68602412E12, 200.8632478632478], [1.68602442E12, 198.13043478260872], [1.68602472E12, 207.79999999999987]], "isOverall": false, "label": "categories-delete", "isController": false}, {"data": [[1.68602454E12, 925.6130653266329], [1.68602448E12, 940.3250000000004], [1.68602418E12, 1120.0349999999999], [1.6860243E12, 1030.75], [1.6860246E12, 1115.04469273743], [1.68602424E12, 1098.5797872340427], [1.68602436E12, 985.5677083333329], [1.68602406E12, 928.2894736842102], [1.68602466E12, 1114.4890510948899], [1.686024E12, 797.7368421052631], [1.68602412E12, 990.2146596858643], [1.68602442E12, 905.5600000000002], [1.68602472E12, 896.8977272727273]], "isOverall": false, "label": "user_detail-1", "isController": false}, {"data": [[1.68602454E12, 936.3869346733671], [1.68602448E12, 952.7349999999998], [1.68602418E12, 1113.125], [1.6860243E12, 1030.0], [1.6860246E12, 1107.730538922156], [1.68602424E12, 1113.3258426966293], [1.68602436E12, 1001.0466321243525], [1.68602406E12, 989.2030456852793], [1.68602466E12, 1174.4718309859152], [1.686024E12, 756.0], [1.68602412E12, 1016.1979695431472], [1.68602442E12, 932.4099999999997], [1.68602472E12, 875.3684210526316]], "isOverall": false, "label": "user_detail-2", "isController": false}, {"data": [[1.68602454E12, 205.0899999999999], [1.68602448E12, 203.28000000000003], [1.68602418E12, 200.69999999999996], [1.6860243E12, 203.6373056994819], [1.6860246E12, 203.92999999999995], [1.68602424E12, 198.465], [1.68602436E12, 201.4495412844036], [1.68602406E12, 200.28999999999994], [1.68602466E12, 208.5879120879122], [1.686024E12, 204.20000000000002], [1.68602412E12, 201.43000000000004], [1.68602442E12, 206.02020202020202], [1.68602472E12, 206.02040816326527]], "isOverall": false, "label": "announcements-create", "isController": false}, {"data": [[1.68602454E12, 2074.7939698492464], [1.68602448E12, 2105.6000000000004], [1.68602418E12, 2440.8999999999996], [1.6860243E12, 2265.9689922480616], [1.6860246E12, 2417.7604790419164], [1.68602424E12, 2431.7303370786503], [1.68602436E12, 2196.0777202072522], [1.68602406E12, 2118.243654822333], [1.68602466E12, 2539.169014084507], [1.686024E12, 1716.8333333333333], [1.68602412E12, 2224.4974619289346], [1.68602442E12, 2050.9499999999994], [1.68602472E12, 1994.631578947368]], "isOverall": false, "label": "user_detail", "isController": false}, {"data": [[1.68602454E12, 1959.6582914572864], [1.68602448E12, 1937.4824120603016], [1.68602418E12, 2072.477272727273], [1.6860243E12, 2148.4399999999987], [1.6860246E12, 2114.665000000002], [1.68602424E12, 2151.085], [1.68602436E12, 2457.3594771241833], [1.68602406E12, 1713.355], [1.68602466E12, 2085.2110552763806], [1.686024E12, 1966.8300000000002], [1.68602412E12, 2446.6532258064503], [1.68602442E12, 2405.1275167785243], [1.68602472E12, 2069.6210526315795]], "isOverall": false, "label": "categories-list", "isController": false}, {"data": [[1.68602454E12, 210.67676767676772], [1.68602436E12, 212.57575757575756], [1.68602406E12, 213.05911330049258], [1.68602466E12, 213.14583333333331], [1.68602448E12, 210.565], [1.68602418E12, 208.26499999999993], [1.6860243E12, 211.09160305343508], [1.68602412E12, 217.3248730964468], [1.6860246E12, 214.24848484848494], [1.68602442E12, 208.17], [1.68602424E12, 211.67836257309938], [1.68602472E12, 218.62365591397855]], "isOverall": false, "label": "donations-list-0", "isController": false}, {"data": [[1.68602454E12, 995.1212121212124], [1.68602436E12, 1028.7939698492462], [1.68602406E12, 1037.4499999999987], [1.68602466E12, 1207.6242038216558], [1.68602448E12, 988.2650000000001], [1.68602418E12, 1085.3899999999994], [1.6860243E12, 1073.7482014388488], [1.68602412E12, 1022.0499999999996], [1.6860246E12, 1136.4400000000003], [1.68602442E12, 998.2499999999998], [1.68602424E12, 1127.327160493827], [1.68602472E12, 897.8736842105264]], "isOverall": false, "label": "donations-list-1", "isController": false}, {"data": [[1.68602454E12, 981.9025641025643], [1.68602436E12, 1031.5628140703518], [1.68602406E12, 966.6899999999997], [1.68602466E12, 1235.4337349397595], [1.68602448E12, 1005.5249999999996], [1.68602418E12, 1086.55], [1.6860243E12, 1090.0063291139238], [1.68602412E12, 1050.015], [1.6860246E12, 1102.965034965035], [1.68602442E12, 1035.8249999999998], [1.68602424E12, 1161.5804195804192], [1.68602472E12, 907.6458333333331]], "isOverall": false, "label": "donations-list-2", "isController": false}, {"data": [[1.68602454E12, 216.46927374301674], [1.68602448E12, 209.24719101123603], [1.68602418E12, 208.55944055944067], [1.6860243E12, 210.57500000000002], [1.6860246E12, 210.61494252873567], [1.68602424E12, 207.7961783439491], [1.68602436E12, 209.00999999999996], [1.68602406E12, 207.14000000000004], [1.68602466E12, 209.22727272727275], [1.686024E12, 213.77], [1.68602412E12, 209.69499999999994], [1.68602442E12, 207.13450292397664], [1.68602472E12, 215.90000000000006]], "isOverall": false, "label": "users-list-0", "isController": false}, {"data": [[1.68602454E12, 981.6755319148938], [1.68602448E12, 970.514285714286], [1.68602418E12, 1123.5], [1.6860243E12, 1161.1600000000003], [1.6860246E12, 998.169491525424], [1.68602424E12, 1127.5057471264367], [1.68602436E12, 1132.2949999999998], [1.68602406E12, 1064.0899999999986], [1.68602466E12, 1154.4824120603018], [1.686024E12, 1149.5800000000004], [1.68602412E12, 1428.5850000000007], [1.68602442E12, 1173.3540372670811], [1.68602472E12, 909.3199999999999]], "isOverall": false, "label": "users-list-1", "isController": false}, {"data": [[1.68602454E12, 2233.016216216215], [1.68602436E12, 2422.519999999999], [1.68602406E12, 1929.8899999999996], [1.68602466E12, 2692.1871657754014], [1.68602448E12, 2241.0846560846558], [1.68602418E12, 2325.979057591622], [1.6860243E12, 2464.419689119172], [1.68602412E12, 2698.09], [1.6860246E12, 2319.5683453237416], [1.68602442E12, 2393.745], [1.68602424E12, 2615.275862068967], [1.68602472E12, 2055.4500000000003]], "isOverall": false, "label": "report-generate", "isController": false}, {"data": [[1.68602454E12, 206.13775510204079], [1.68602448E12, 199.8814432989691], [1.68602418E12, 195.64885496183211], [1.6860243E12, 199.40000000000006], [1.6860246E12, 202.81909547738684], [1.68602424E12, 197.68000000000004], [1.68602436E12, 199.63535911602213], [1.68602406E12, 199.1049999999999], [1.68602466E12, 196.50000000000006], [1.686024E12, 199.22000000000003], [1.68602412E12, 200.42011834319527], [1.68602442E12, 196.96153846153842], [1.68602472E12, 201.0416666666667]], "isOverall": false, "label": "resources-update", "isController": false}, {"data": [[1.68602454E12, 213.385], [1.68602448E12, 213.45], [1.68602418E12, 208.29999999999998], [1.6860243E12, 214.17999999999998], [1.6860246E12, 214.48989898989907], [1.68602424E12, 209.41], [1.68602436E12, 212.7333333333333], [1.68602406E12, 208.5406976744186], [1.68602466E12, 227.48630136986304], [1.686024E12, 212.19999999999996], [1.68602412E12, 214.67187499999994], [1.68602442E12, 215.45999999999984], [1.68602472E12, 210.99999999999997]], "isOverall": false, "label": "company_detail-0", "isController": false}, {"data": [[1.68602454E12, 884.2649999999995], [1.68602448E12, 909.6149999999993], [1.68602418E12, 1108.1400000000006], [1.6860243E12, 960.7299270072989], [1.6860246E12, 1112.4410256410254], [1.68602424E12, 1060.8749999999995], [1.68602436E12, 1042.5644171779136], [1.68602406E12, 847.3012820512819], [1.68602466E12, 994.3913043478259], [1.686024E12, 759.6565656565657], [1.68602412E12, 909.8551724137938], [1.68602442E12, 874.9849999999999], [1.68602472E12, 880.4210526315793]], "isOverall": false, "label": "company_detail-1", "isController": false}, {"data": [[1.68602454E12, 203.24999999999994], [1.68602448E12, 199.28176795580114], [1.68602418E12, 198.4247787610619], [1.6860243E12, 199.51999999999998], [1.6860246E12, 204.98412698412707], [1.68602424E12, 197.48936170212772], [1.68602436E12, 199.585], [1.68602406E12, 199.84999999999997], [1.68602466E12, 201.09999999999997], [1.686024E12, 200.69000000000003], [1.68602412E12, 198.12060301507537], [1.68602442E12, 199.61594202898556], [1.68602472E12, 206.63636363636377]], "isOverall": false, "label": "users-delete", "isController": false}, {"data": [[1.68602454E12, 201.70499999999984], [1.68602448E12, 200.25499999999988], [1.68602418E12, 199.5900000000001], [1.6860243E12, 203.39354838709679], [1.6860246E12, 204.23232323232315], [1.68602424E12, 199.46499999999997], [1.68602436E12, 199.7586206896552], [1.68602406E12, 195.88202247191012], [1.68602466E12, 210.4630872483222], [1.686024E12, 202.17], [1.68602412E12, 201.75409836065575], [1.68602442E12, 203.03500000000003], [1.68602472E12, 200.83870967741936]], "isOverall": false, "label": "register_company", "isController": false}, {"data": [[1.68602454E12, 903.9000000000002], [1.68602448E12, 913.0400000000001], [1.68602418E12, 1121.4549999999997], [1.6860243E12, 976.142857142857], [1.6860246E12, 1107.0315789473684], [1.68602424E12, 1081.8030303030296], [1.68602436E12, 1052.4201183431942], [1.68602406E12, 827.9290322580648], [1.68602466E12, 1032.1629629629633], [1.686024E12, 786.0500000000002], [1.68602412E12, 954.0060606060607], [1.68602442E12, 892.9999999999999], [1.68602472E12, 863.2857142857142]], "isOverall": false, "label": "company_detail-2", "isController": false}, {"data": [[1.68602454E12, 200.32124352331587], [1.68602436E12, 201.59499999999994], [1.68602406E12, 201.05500000000006], [1.68602466E12, 199.2366863905324], [1.68602448E12, 198.18592964824134], [1.68602418E12, 198.83499999999987], [1.6860243E12, 198.80246913580245], [1.68602412E12, 202.61999999999995], [1.6860246E12, 204.24113475177296], [1.68602442E12, 198.48500000000007], [1.68602424E12, 197.38405797101453], [1.68602472E12, 207.6020408163266]], "isOverall": false, "label": "binnacle-create", "isController": false}, {"data": [[1.68602454E12, 201.01499999999993], [1.68602448E12, 202.71500000000012], [1.68602418E12, 199.04999999999993], [1.6860243E12, 202.21465968586392], [1.6860246E12, 201.24623115577893], [1.68602424E12, 200.4700000000001], [1.68602436E12, 199.19819819819827], [1.68602406E12, 197.56000000000003], [1.68602466E12, 207.60335195530746], [1.686024E12, 200.83999999999997], [1.68602412E12, 196.5], [1.68602442E12, 200.96464646464634], [1.68602472E12, 197.3461538461539]], "isOverall": false, "label": "announcements-update", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68602472E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 194.0, "minX": 1.686024E12, "maxY": 1492.015, "series": [{"data": [[1.68602454E12, 202.915343915344], [1.68602448E12, 200.38418079096047], [1.68602418E12, 198.92920353982296], [1.6860243E12, 199.20500000000007], [1.6860246E12, 201.6968085106383], [1.68602424E12, 200.79144385026748], [1.68602436E12, 200.04999999999998], [1.68602406E12, 200.345], [1.68602466E12, 201.5849999999999], [1.686024E12, 203.54999999999995], [1.68602412E12, 201.06000000000003], [1.68602442E12, 197.6780821917809], [1.68602472E12, 202.3939393939394]], "isOverall": false, "label": "users-create", "isController": false}, {"data": [[1.68602454E12, 210.60512820512815], [1.68602436E12, 212.5175879396985], [1.68602406E12, 213.22999999999996], [1.68602466E12, 213.7831325301205], [1.68602448E12, 210.56000000000006], [1.68602418E12, 208.25999999999996], [1.6860243E12, 210.54430379746842], [1.68602412E12, 217.08500000000004], [1.6860246E12, 213.93006993006992], [1.68602442E12, 208.1599999999999], [1.68602424E12, 212.43356643356643], [1.68602472E12, 218.08333333333334]], "isOverall": false, "label": "donations-list", "isController": false}, {"data": [[1.68602454E12, 216.27411167512693], [1.68602448E12, 210.468085106383], [1.68602418E12, 207.8699186991869], [1.6860243E12, 210.64], [1.6860246E12, 213.5867346938776], [1.68602424E12, 207.905], [1.68602436E12, 209.85263157894732], [1.68602406E12, 207.815], [1.68602466E12, 211.52499999999998], [1.686024E12, 221.38000000000002], [1.68602412E12, 208.65536723163842], [1.68602442E12, 207.5348837209302], [1.68602472E12, 211.25252525252523]], "isOverall": false, "label": "resources-list", "isController": false}, {"data": [[1.68602454E12, 202.08000000000004], [1.68602448E12, 200.53999999999996], [1.68602418E12, 198.3750000000001], [1.6860243E12, 201.74809160305347], [1.6860246E12, 203.00529100529099], [1.68602424E12, 204.1161616161617], [1.68602436E12, 202.67836257309943], [1.68602406E12, 197.70059880239518], [1.68602466E12, 214.94814814814816], [1.686024E12, 201.64705882352942], [1.68602412E12, 209.72121212121215], [1.68602442E12, 201.38000000000002], [1.68602472E12, 200.6]], "isOverall": false, "label": "edit_company", "isController": false}, {"data": [[1.68602454E12, 1002.8770053475938], [1.68602436E12, 1098.6249999999998], [1.68602406E12, 844.9249999999998], [1.68602466E12, 1237.357541899441], [1.68602448E12, 1013.4591836734701], [1.68602418E12, 1060.939698492462], [1.6860243E12, 1112.3922651933703], [1.68602412E12, 1168.6150000000007], [1.6860246E12, 1077.7318840579712], [1.68602442E12, 1077.5049999999992], [1.68602424E12, 1159.316666666666], [1.68602472E12, 914.88]], "isOverall": false, "label": "report-generate-1", "isController": false}, {"data": [[1.68602454E12, 1012.7459459459457], [1.68602436E12, 1110.7549999999994], [1.68602406E12, 873.2600000000001], [1.68602466E12, 1237.695187165776], [1.68602448E12, 1014.746031746032], [1.68602418E12, 1077.5706806282726], [1.6860243E12, 1152.9585492227975], [1.68602412E12, 1316.3600000000006], [1.6860246E12, 1053.2086330935244], [1.68602442E12, 1105.115], [1.68602424E12, 1190.0172413793105], [1.68602472E12, 917.8000000000001]], "isOverall": false, "label": "report-generate-2", "isController": false}, {"data": [[1.68602454E12, 213.54255319148925], [1.68602436E12, 212.64], [1.68602406E12, 211.37999999999985], [1.68602466E12, 210.65882352941182], [1.68602448E12, 213.1105527638191], [1.68602418E12, 208.8399999999999], [1.6860243E12, 212.2916666666667], [1.68602412E12, 212.78499999999997], [1.6860246E12, 211.51388888888894], [1.68602442E12, 210.48999999999995], [1.68602424E12, 210.09090909090915], [1.68602472E12, 221.4040404040404]], "isOverall": false, "label": "report-generate-0", "isController": false}, {"data": [[1.68602454E12, 204.19895287958104], [1.68602448E12, 197.03208556149735], [1.68602418E12, 197.75892857142856], [1.6860243E12, 198.7949999999999], [1.6860246E12, 202.01047120418852], [1.68602424E12, 198.40740740740753], [1.68602436E12, 198.41206030150767], [1.68602406E12, 198.50500000000008], [1.68602466E12, 199.15500000000003], [1.686024E12, 200.79], [1.68602412E12, 198.50753768844214], [1.68602442E12, 196.58333333333343], [1.68602472E12, 203.49494949494945]], "isOverall": false, "label": "logout", "isController": false}, {"data": [[1.68602454E12, 214.4873096446702], [1.68602448E12, 210.98461538461535], [1.68602418E12, 206.9295774647888], [1.6860243E12, 210.22500000000002], [1.6860246E12, 217.2261306532663], [1.68602424E12, 209.00499999999988], [1.68602436E12, 208.03954802259886], [1.68602406E12, 205.95], [1.68602466E12, 209.12500000000003], [1.686024E12, 204.55000000000004], [1.68602412E12, 209.8227848101266], [1.68602442E12, 211.88636363636365], [1.68602472E12, 217.30851063829786]], "isOverall": false, "label": "categories-list-0", "isController": false}, {"data": [[1.68602454E12, 877.2929292929293], [1.68602448E12, 865.0355329949239], [1.68602418E12, 937.5939393939393], [1.6860243E12, 971.5800000000004], [1.6860246E12, 937.6999999999998], [1.68602424E12, 975.2600000000003], [1.68602436E12, 1119.8362573099412], [1.68602406E12, 741.5250000000004], [1.68602466E12, 955.6834170854271], [1.686024E12, 876.84], [1.68602412E12, 1115.9407407407414], [1.68602442E12, 1072.4477611940306], [1.68602472E12, 920.0842105263159]], "isOverall": false, "label": "categories-list-1", "isController": false}, {"data": [[1.68602454E12, 867.5527638190956], [1.68602448E12, 859.7085427135678], [1.68602418E12, 917.75], [1.6860243E12, 966.2599999999998], [1.6860246E12, 959.3749999999999], [1.68602424E12, 966.5250000000002], [1.68602436E12, 1142.5947712418304], [1.68602406E12, 765.4950000000006], [1.68602466E12, 919.6482412060299], [1.686024E12, 884.64], [1.68602412E12, 1118.024193548387], [1.68602442E12, 1099.4362416107385], [1.68602472E12, 931.1578947368419]], "isOverall": false, "label": "categories-list-2", "isController": false}, {"data": [[1.68602454E12, 214.10499999999982], [1.68602448E12, 212.79500000000002], [1.68602418E12, 209.28061224489795], [1.6860243E12, 211.52000000000004], [1.6860246E12, 214.12500000000003], [1.68602424E12, 209.80499999999998], [1.68602436E12, 214.02564102564108], [1.68602406E12, 209.90000000000003], [1.68602466E12, 213.05181347150264], [1.686024E12, 207.80999999999995], [1.68602412E12, 211.23076923076928], [1.68602442E12, 208.65573770491804], [1.68602472E12, 218.34939759036146]], "isOverall": false, "label": "announcements-categories", "isController": false}, {"data": [[1.68602454E12, 203.60000000000002], [1.68602448E12, 199.42999999999998], [1.68602418E12, 197.70000000000002], [1.6860243E12, 201.58399999999995], [1.6860246E12, 204.79032258064512], [1.68602424E12, 200.64974619289342], [1.68602436E12, 200.3820224719101], [1.68602406E12, 199.21637426900577], [1.68602466E12, 207.90579710144928], [1.686024E12, 198.33333333333334], [1.68602412E12, 202.72189349112423], [1.68602442E12, 199.70499999999993], [1.68602472E12, 203.56962025316454]], "isOverall": false, "label": "delete_company", "isController": false}, {"data": [[1.68602454E12, 213.365], [1.68602448E12, 213.44500000000002], [1.68602418E12, 208.29499999999996], [1.6860243E12, 214.33834586466162], [1.6860246E12, 213.32105263157902], [1.68602424E12, 209.45959595959584], [1.68602436E12, 212.63313609467463], [1.68602406E12, 210.2709677419354], [1.68602466E12, 231.19999999999996], [1.686024E12, 211.23749999999995], [1.68602412E12, 212.58181818181816], [1.68602442E12, 215.455], [1.68602472E12, 210.15476190476195]], "isOverall": false, "label": "company_detail", "isController": false}, {"data": [[1.68602454E12, 203.49740932642501], [1.68602436E12, 204.2462311557788], [1.68602406E12, 205.32499999999993], [1.68602466E12, 204.72189349112423], [1.68602448E12, 201.94472361809045], [1.68602418E12, 197.61500000000007], [1.6860243E12, 200.69374999999997], [1.68602412E12, 203.33], [1.6860246E12, 201.25174825174835], [1.68602442E12, 198.76000000000005], [1.68602424E12, 200.1914893617021], [1.68602472E12, 211.30208333333331]], "isOverall": false, "label": "donation-create", "isController": false}, {"data": [[1.68602454E12, 895.071794871795], [1.68602448E12, 891.5107526881721], [1.68602418E12, 986.0090909090907], [1.6860243E12, 1064.249999999999], [1.6860246E12, 957.2653061224487], [1.68602424E12, 1028.757575757576], [1.68602436E12, 1072.776649746193], [1.68602406E12, 794.3150000000002], [1.68602466E12, 1016.3149999999997], [1.686024E12, 725.9399999999996], [1.68602412E12, 1238.4270833333335], [1.68602442E12, 1101.3888888888882], [1.68602472E12, 867.6969696969694]], "isOverall": false, "label": "resources-list-1", "isController": false}, {"data": [[1.68602454E12, 881.5228426395944], [1.68602448E12, 884.3031914893614], [1.68602418E12, 960.0162601626013], [1.6860243E12, 1025.8350000000005], [1.6860246E12, 965.6887755102036], [1.68602424E12, 980.8600000000008], [1.68602436E12, 1082.863157894737], [1.68602406E12, 758.2799999999999], [1.68602466E12, 987.6599999999997], [1.686024E12, 779.2899999999995], [1.68602412E12, 1183.2485875706216], [1.68602442E12, 1097.8294573643411], [1.68602472E12, 909.4444444444442]], "isOverall": false, "label": "resources-list-2", "isController": false}, {"data": [[1.68602454E12, 216.17368421052646], [1.68602448E12, 210.83957219251334], [1.68602418E12, 208.57142857142856], [1.6860243E12, 210.64], [1.6860246E12, 213.75647668393793], [1.68602424E12, 208.29100529100523], [1.68602436E12, 209.94974874371854], [1.68602406E12, 207.815], [1.68602466E12, 211.52499999999998], [1.686024E12, 221.38000000000002], [1.68602412E12, 207.80904522613065], [1.68602442E12, 207.2213740458016], [1.68602472E12, 211.25252525252523]], "isOverall": false, "label": "resources-list-0", "isController": false}, {"data": [[1.68602454E12, 986.2359550561794], [1.68602448E12, 994.883977900553], [1.68602418E12, 1175.0608108108104], [1.6860243E12, 1182.1809045226125], [1.6860246E12, 1032.5000000000002], [1.68602424E12, 1146.37908496732], [1.68602436E12, 1160.4449999999997], [1.68602406E12, 1106.7900000000002], [1.68602466E12, 1186.5736040609138], [1.686024E12, 1169.3899999999996], [1.68602412E12, 1485.4499999999998], [1.68602442E12, 1153.1818181818185], [1.68602472E12, 922.9799999999998]], "isOverall": false, "label": "login-1", "isController": false}, {"data": [[1.68602454E12, 212.49720670391068], [1.68602448E12, 210.06779661016944], [1.68602418E12, 206.4723926380369], [1.6860243E12, 210.1306532663316], [1.6860246E12, 210.75776397515523], [1.68602424E12, 209.5434782608696], [1.68602436E12, 214.8900000000001], [1.68602406E12, 207.69], [1.68602466E12, 212.54081632653052], [1.686024E12, 208.79000000000002], [1.68602412E12, 209.02000000000012], [1.68602442E12, 207.1336898395722], [1.68602472E12, 217.7599999999999]], "isOverall": false, "label": "login-0", "isController": false}, {"data": [[1.68602454E12, 206.99999999999994], [1.68602448E12, 200.9100000000001], [1.68602418E12, 200.82872928176795], [1.6860243E12, 201.12000000000003], [1.6860246E12, 205.61499999999992], [1.68602424E12, 197.5399999999999], [1.68602436E12, 200.86713286713288], [1.68602406E12, 197.51], [1.68602466E12, 202.0150753768844], [1.686024E12, 199.90000000000003], [1.68602412E12, 200.29411764705884], [1.68602442E12, 199.17088607594937], [1.68602472E12, 205.20987654320987]], "isOverall": false, "label": "categories-update", "isController": false}, {"data": [[1.68602454E12, 201.26499999999993], [1.68602448E12, 203.15499999999994], [1.68602418E12, 200.10999999999993], [1.6860243E12, 203.18518518518516], [1.6860246E12, 202.62814070351763], [1.68602424E12, 199.9999999999999], [1.68602436E12, 198.0088495575221], [1.68602406E12, 198.57000000000008], [1.68602466E12, 210.0395480225989], [1.686024E12, 204.04999999999998], [1.68602412E12, 200.34999999999997], [1.68602442E12, 200.11616161616158], [1.68602472E12, 210.05882352941182]], "isOverall": false, "label": "announcements-delete", "isController": false}, {"data": [[1.68602454E12, 209.08500000000004], [1.68602448E12, 214.71499999999995], [1.68602418E12, 209.58499999999998], [1.6860243E12, 212.84491978609628], [1.6860246E12, 217.4773869346734], [1.68602424E12, 208.57500000000007], [1.68602436E12, 210.99130434782606], [1.68602406E12, 208.53500000000003], [1.68602466E12, 225.2183908045977], [1.686024E12, 215.70999999999995], [1.68602412E12, 208.54999999999993], [1.68602442E12, 213.19696969696972], [1.68602472E12, 220.96000000000004]], "isOverall": false, "label": "announcementProjects-list-0", "isController": false}, {"data": [[1.68602454E12, 887.8800000000003], [1.68602448E12, 903.2799999999997], [1.68602418E12, 1070.4050000000002], [1.6860243E12, 973.7118644067799], [1.6860246E12, 1054.3216080402012], [1.68602424E12, 1060.8850000000002], [1.68602436E12, 1167.838709677419], [1.68602406E12, 935.4307692307697], [1.68602466E12, 931.9629629629629], [1.686024E12, 746.0999999999998], [1.68602412E12, 959.4857142857142], [1.68602442E12, 928.3366834170853], [1.68602472E12, 872.6129032258066]], "isOverall": false, "label": "announcementProjects-list-1", "isController": false}, {"data": [[1.68602454E12, 902.2449999999999], [1.68602448E12, 920.3349999999998], [1.68602418E12, 1075.229999999999], [1.6860243E12, 957.514792899408], [1.6860246E12, 1088.5454545454552], [1.68602424E12, 1057.1450000000004], [1.68602436E12, 1157.9924242424242], [1.68602406E12, 883.4426229508197], [1.68602466E12, 935.3397435897436], [1.686024E12, 718.1400000000002], [1.68602412E12, 940.025641025641], [1.68602442E12, 936.5979899497489], [1.68602472E12, 867.9420289855071]], "isOverall": false, "label": "announcementProjects-list-2", "isController": false}, {"data": [[1.68602454E12, 206.1167512690356], [1.68602448E12, 199.82474226804132], [1.68602418E12, 197.3014705882353], [1.6860243E12, 200.46], [1.6860246E12, 204.44723618090447], [1.68602424E12, 197.44], [1.68602436E12, 198.64999999999995], [1.68602406E12, 198.57499999999996], [1.68602466E12, 198.7700000000001], [1.686024E12, 197.24000000000004], [1.68602412E12, 199.44512195121956], [1.68602442E12, 200.33076923076922], [1.68602472E12, 205.94791666666666]], "isOverall": false, "label": "resources-delete", "isController": false}, {"data": [[1.68602454E12, 877.5150000000001], [1.68602448E12, 876.0049999999997], [1.68602418E12, 1015.9000000000002], [1.6860243E12, 970.7680412371133], [1.6860246E12, 1010.8399999999999], [1.68602424E12, 1021.3399999999999], [1.68602436E12, 1301.0000000000007], [1.68602406E12, 1026.62], [1.68602466E12, 902.1475409836063], [1.686024E12, 1150.2900000000004], [1.68602412E12, 1114.5299999999997], [1.68602442E12, 1015.4444444444445], [1.68602472E12, 896.0909090909092]], "isOverall": false, "label": "announcements-list-2", "isController": false}, {"data": [[1.68602454E12, 216.56999999999996], [1.68602448E12, 220.77999999999994], [1.68602418E12, 213.47448979591826], [1.6860243E12, 213.62500000000006], [1.6860246E12, 222.01999999999998], [1.68602424E12, 232.70000000000005], [1.68602436E12, 209.77777777777774], [1.68602406E12, 208.44000000000003], [1.68602466E12, 215.7277486910995], [1.686024E12, 207.01999999999995], [1.68602412E12, 208.45192307692312], [1.68602442E12, 214.82513661202185], [1.68602472E12, 216.77586206896558]], "isOverall": false, "label": "announcements-list-0", "isController": false}, {"data": [[1.68602454E12, 880.835], [1.68602448E12, 881.0200000000003], [1.68602418E12, 931.9540816326524], [1.6860243E12, 991.3500000000005], [1.6860246E12, 974.51], [1.68602424E12, 1007.7900000000004], [1.68602436E12, 1270.0854700854704], [1.68602406E12, 957.4099999999997], [1.68602466E12, 904.3212435233157], [1.686024E12, 1228.51], [1.68602412E12, 1144.1826923076924], [1.68602442E12, 1080.6502732240438], [1.68602472E12, 898.819277108434]], "isOverall": false, "label": "announcements-categories-2", "isController": false}, {"data": [[1.68602454E12, 892.73], [1.68602448E12, 886.5500000000001], [1.68602418E12, 983.2110552763819], [1.6860243E12, 970.7121212121214], [1.6860246E12, 999.875], [1.68602424E12, 1000.6199999999997], [1.68602436E12, 1305.7090909090914], [1.68602406E12, 1013.9899999999998], [1.68602466E12, 913.0952380952385], [1.686024E12, 1264.4600000000005], [1.68602412E12, 1133.841584158416], [1.68602442E12, 1064.3437500000002], [1.68602472E12, 942.7833333333333]], "isOverall": false, "label": "announcements-list-1", "isController": false}, {"data": [[1.68602454E12, 870.33], [1.68602448E12, 883.4500000000002], [1.68602418E12, 924.7789473684205], [1.6860243E12, 973.1449999999998], [1.6860246E12, 968.2199999999996], [1.68602424E12, 991.4749999999993], [1.68602436E12, 1226.8661417322835], [1.68602406E12, 874.9849999999998], [1.68602466E12, 913.0812182741115], [1.686024E12, 1069.05], [1.68602412E12, 1198.7818181818182], [1.68602442E12, 1111.1734104046236], [1.68602472E12, 927.8734177215191]], "isOverall": false, "label": "announcements-categories-1", "isController": false}, {"data": [[1.68602454E12, 214.15075376884423], [1.68602448E12, 212.87000000000003], [1.68602418E12, 209.3582887700535], [1.6860243E12, 211.52000000000004], [1.6860246E12, 214.12500000000003], [1.68602424E12, 209.80499999999998], [1.68602436E12, 213.1870503597122], [1.68602406E12, 209.90000000000003], [1.68602466E12, 212.98989898989902], [1.686024E12, 207.80999999999995], [1.68602412E12, 210.9469026548673], [1.68602442E12, 208.53086419753083], [1.68602472E12, 218.8461538461539]], "isOverall": false, "label": "announcements-categories-0", "isController": false}, {"data": [[1.68602454E12, 202.24607329842925], [1.68602436E12, 199.61499999999995], [1.68602406E12, 203.56], [1.68602466E12, 201.41071428571422], [1.68602448E12, 200.05025125628143], [1.68602418E12, 198.1], [1.6860243E12, 200.94478527607365], [1.68602412E12, 202.6150000000001], [1.6860246E12, 200.62237762237757], [1.68602442E12, 199.00000000000003], [1.68602424E12, 197.84671532846716], [1.68602472E12, 209.14141414141423]], "isOverall": false, "label": "binnacle-update", "isController": false}, {"data": [[1.68602454E12, 203.04000000000002], [1.68602448E12, 204.6800000000001], [1.68602418E12, 200.08], [1.6860243E12, 204.452380952381], [1.6860246E12, 204.9848484848486], [1.68602424E12, 200.60500000000002], [1.68602436E12, 198.15037593984965], [1.68602406E12, 203.86263736263732], [1.68602466E12, 212.6052631578948], [1.686024E12, 201.30999999999997], [1.68602412E12, 212.7542372881356], [1.68602442E12, 204.9748743718593], [1.68602472E12, 201.83870967741933]], "isOverall": false, "label": "announcementProjects-apply", "isController": false}, {"data": [[1.68602454E12, 1024.5340909090912], [1.68602448E12, 1010.960674157303], [1.68602418E12, 1154.4363636363641], [1.6860243E12, 1188.3517587939693], [1.6860246E12, 1041.8148148148146], [1.68602424E12, 1177.808823529411], [1.68602436E12, 1167.5499999999997], [1.68602406E12, 1055.4874371859296], [1.68602466E12, 1219.5743589743581], [1.686024E12, 1072.9200000000005], [1.68602412E12, 1492.015], [1.68602442E12, 1155.0687830687832], [1.68602472E12, 916.8899999999998]], "isOverall": false, "label": "Home-2", "isController": false}, {"data": [[1.68602454E12, 209.08500000000004], [1.68602448E12, 214.71499999999995], [1.68602418E12, 209.58499999999998], [1.6860243E12, 212.60946745562134], [1.6860246E12, 217.51010101010104], [1.68602424E12, 208.5750000000001], [1.68602436E12, 211.37121212121204], [1.68602406E12, 208.27322404371583], [1.68602466E12, 226.58333333333334], [1.686024E12, 215.70999999999992], [1.68602412E12, 208.95726495726495], [1.68602442E12, 213.30150753768837], [1.68602472E12, 218.84057971014488]], "isOverall": false, "label": "announcementProjects-list", "isController": false}, {"data": [[1.68602454E12, 200.7323232323232], [1.68602448E12, 200.2349999999999], [1.68602418E12, 199.805], [1.6860243E12, 201.36718750000003], [1.6860246E12, 199.688622754491], [1.68602424E12, 200.98863636363615], [1.68602436E12, 201.34693877551027], [1.68602406E12, 200.60891089108912], [1.68602466E12, 204.64335664335667], [1.686024E12, 194.0], [1.68602412E12, 205.25888324873094], [1.68602442E12, 202.11499999999992], [1.68602472E12, 209.3586956521739]], "isOverall": false, "label": "user-update", "isController": false}, {"data": [[1.68602454E12, 213.20224719101125], [1.68602448E12, 209.10497237569052], [1.68602418E12, 206.56756756756758], [1.6860243E12, 210.1306532663316], [1.6860246E12, 210.5178571428572], [1.68602424E12, 209.15032679738567], [1.68602436E12, 214.89000000000013], [1.68602406E12, 207.69], [1.68602466E12, 212.4822335025381], [1.686024E12, 208.79000000000002], [1.68602412E12, 209.02000000000012], [1.68602442E12, 207.49431818181822], [1.68602472E12, 217.7599999999999]], "isOverall": false, "label": "login", "isController": false}, {"data": [[1.68602454E12, 202.738219895288], [1.68602436E12, 200.47000000000006], [1.68602406E12, 202.34999999999997], [1.68602466E12, 199.84523809523805], [1.68602448E12, 200.7889447236181], [1.68602418E12, 198.54000000000002], [1.6860243E12, 200.51219512195124], [1.68602412E12, 200.45499999999996], [1.6860246E12, 202.46853146853158], [1.68602442E12, 197.25], [1.68602424E12, 198.86029411764707], [1.68602472E12, 206.89898989898992]], "isOverall": false, "label": "binnacle-delete", "isController": false}, {"data": [[1.68602454E12, 215.3695652173912], [1.68602448E12, 208.5537634408602], [1.68602418E12, 207.35789473684207], [1.6860243E12, 210.81443298969077], [1.6860246E12, 208.3496503496504], [1.68602424E12, 208.9137931034483], [1.68602436E12, 214.52999999999986], [1.68602406E12, 213.44000000000003], [1.68602466E12, 210.91978609625664], [1.686024E12, 361.76], [1.68602412E12, 213.33499999999998], [1.68602442E12, 208.2000000000001], [1.68602472E12, 215.11999999999995]], "isOverall": false, "label": "Home-0", "isController": false}, {"data": [[1.68602454E12, 1010.7318435754183], [1.68602448E12, 1016.2651933701655], [1.68602418E12, 1119.093406593407], [1.6860243E12, 1162.10101010101], [1.6860246E12, 1038.4697986577182], [1.68602424E12, 1168.9416666666662], [1.68602436E12, 1154.835], [1.68602406E12, 954.195], [1.68602466E12, 1234.7886597938148], [1.686024E12, 978.8999999999999], [1.68602412E12, 1426.9999999999998], [1.68602442E12, 1145.5482233502541], [1.68602472E12, 936.8800000000001]], "isOverall": false, "label": "Home-1", "isController": false}, {"data": [[1.68602454E12, 201.97765363128494], [1.68602448E12, 197.74719101123605], [1.68602418E12, 197.52777777777777], [1.6860243E12, 200.68999999999997], [1.6860246E12, 200.03508771929822], [1.68602424E12, 199.09615384615373], [1.68602436E12, 199.46499999999995], [1.68602406E12, 199.35500000000005], [1.68602466E12, 201.01015228426394], [1.686024E12, 200.24000000000004], [1.68602412E12, 196.70000000000005], [1.68602442E12, 196.86857142857136], [1.68602472E12, 203.01]], "isOverall": false, "label": "register_user", "isController": false}, {"data": [[1.68602454E12, 205.14795918367346], [1.68602448E12, 203.60638297872345], [1.68602418E12, 197.23015873015882], [1.6860243E12, 201.39000000000001], [1.6860246E12, 203.48743718592974], [1.68602424E12, 200.785], [1.68602436E12, 199.20430107526875], [1.68602406E12, 200.1149999999999], [1.68602466E12, 199.63500000000013], [1.686024E12, 201.85999999999996], [1.68602412E12, 200.04597701149424], [1.68602442E12, 197.16030534351142], [1.68602472E12, 204.34375000000009]], "isOverall": false, "label": "resources-create", "isController": false}, {"data": [[1.68602454E12, 216.56999999999996], [1.68602448E12, 220.77999999999994], [1.68602418E12, 213.41500000000002], [1.6860243E12, 213.01546391752584], [1.6860246E12, 222.01999999999998], [1.68602424E12, 232.70000000000005], [1.68602436E12, 211.57407407407408], [1.68602406E12, 208.44000000000003], [1.68602466E12, 216.18579234972682], [1.686024E12, 207.01999999999995], [1.68602412E12, 208.37000000000006], [1.68602442E12, 214.1767676767676], [1.68602472E12, 215.37878787878788]], "isOverall": false, "label": "announcements-list", "isController": false}, {"data": [[1.68602454E12, 203.16931216931226], [1.68602448E12, 200.20555555555558], [1.68602418E12, 197.23214285714292], [1.6860243E12, 197.695], [1.6860246E12, 204.4308510638298], [1.68602424E12, 198.12234042553186], [1.68602436E12, 199.00500000000002], [1.68602406E12, 198.78499999999994], [1.68602466E12, 199.73499999999996], [1.686024E12, 198.08000000000004], [1.68602412E12, 198.01999999999998], [1.68602442E12, 196.5244755244754], [1.68602472E12, 200.54545454545453]], "isOverall": false, "label": "users-update", "isController": false}, {"data": [[1.68602454E12, 207.14572864321622], [1.68602448E12, 202.25125628140717], [1.68602418E12, 204.20994475138124], [1.6860243E12, 200.41499999999982], [1.6860246E12, 207.67], [1.68602424E12, 196.25000000000003], [1.68602436E12, 198.97260273972609], [1.68602406E12, 197.48499999999996], [1.68602466E12, 200.1608040201005], [1.686024E12, 200.32999999999998], [1.68602412E12, 197.99159663865547], [1.68602442E12, 197.7628205128205], [1.68602472E12, 204.75581395348829]], "isOverall": false, "label": "categories-create", "isController": false}, {"data": [[1.68602454E12, 216.21875], [1.68602448E12, 209.58100558659208], [1.68602418E12, 209.25663716814174], [1.6860243E12, 210.57500000000002], [1.6860246E12, 210.43406593406604], [1.68602424E12, 207.48663101604276], [1.68602436E12, 209.00999999999996], [1.68602406E12, 207.13000000000005], [1.68602466E12, 209.11499999999987], [1.686024E12, 213.75999999999993], [1.68602412E12, 209.69499999999994], [1.68602442E12, 206.32653061224485], [1.68602472E12, 215.88]], "isOverall": false, "label": "users-list", "isController": false}, {"data": [[1.68602454E12, 216.6704545454545], [1.68602448E12, 208.07303370786522], [1.68602418E12, 206.78181818181812], [1.6860243E12, 210.79899497487432], [1.6860246E12, 207.73456790123464], [1.68602424E12, 209.27941176470594], [1.68602436E12, 214.52999999999986], [1.68602406E12, 213.44000000000003], [1.68602466E12, 210.9025641025641], [1.686024E12, 361.76], [1.68602412E12, 213.33499999999995], [1.68602442E12, 208.17460317460325], [1.68602472E12, 215.11999999999995]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[1.68602454E12, 969.8697916666663], [1.68602448E12, 953.9553072625702], [1.68602418E12, 1100.2212389380531], [1.6860243E12, 1148.5299999999995], [1.6860246E12, 981.6483516483518], [1.68602424E12, 1107.6524064171122], [1.68602436E12, 1109.1349999999993], [1.68602406E12, 1005.0049999999989], [1.68602466E12, 1111.4350000000006], [1.686024E12, 1217.9700000000003], [1.68602412E12, 1366.9050000000002], [1.68602442E12, 1153.102040816326], [1.68602472E12, 896.6400000000001]], "isOverall": false, "label": "users-list-2", "isController": false}, {"data": [[1.68602454E12, 212.6550000000001], [1.68602448E12, 212.46499999999992], [1.68602418E12, 207.67], [1.6860243E12, 212.47619047619057], [1.6860246E12, 212.89247311827955], [1.68602424E12, 210.17857142857147], [1.68602436E12, 209.53370786516857], [1.68602406E12, 212.18232044198902], [1.68602466E12, 220.51111111111103], [1.686024E12, 202.78571428571433], [1.68602412E12, 218.08474576271192], [1.68602442E12, 212.945], [1.68602472E12, 220.5731707317073]], "isOverall": false, "label": "user_detail-0", "isController": false}, {"data": [[1.68602454E12, 208.70351758793961], [1.68602448E12, 199.1350000000001], [1.68602418E12, 199.7322404371586], [1.6860243E12, 199.08000000000004], [1.6860246E12, 205.85000000000002], [1.68602424E12, 199.23999999999998], [1.68602436E12, 199.81428571428577], [1.68602406E12, 197.94000000000003], [1.68602466E12, 203.43718592964825], [1.686024E12, 198.42999999999992], [1.68602412E12, 200.8632478632478], [1.68602442E12, 198.13043478260872], [1.68602472E12, 207.79999999999987]], "isOverall": false, "label": "categories-delete", "isController": false}, {"data": [[1.68602454E12, 925.6130653266329], [1.68602448E12, 940.3250000000004], [1.68602418E12, 1120.0349999999999], [1.6860243E12, 1030.75], [1.6860246E12, 1115.04469273743], [1.68602424E12, 1098.5797872340427], [1.68602436E12, 985.5677083333329], [1.68602406E12, 928.2894736842102], [1.68602466E12, 1114.4890510948899], [1.686024E12, 797.7368421052631], [1.68602412E12, 990.2146596858643], [1.68602442E12, 905.5600000000002], [1.68602472E12, 896.8977272727273]], "isOverall": false, "label": "user_detail-1", "isController": false}, {"data": [[1.68602454E12, 935.6934673366833], [1.68602448E12, 951.8149999999994], [1.68602418E12, 1112.8300000000008], [1.6860243E12, 1029.8372093023258], [1.6860246E12, 1107.2994011976045], [1.68602424E12, 1112.8932584269671], [1.68602436E12, 1000.865284974093], [1.68602406E12, 989.1167512690353], [1.68602466E12, 1174.0845070422533], [1.686024E12, 755.8333333333334], [1.68602412E12, 1015.9492385786805], [1.68602442E12, 931.7650000000001], [1.68602472E12, 874.252631578947]], "isOverall": false, "label": "user_detail-2", "isController": false}, {"data": [[1.68602454E12, 205.0899999999999], [1.68602448E12, 203.28000000000003], [1.68602418E12, 200.69999999999996], [1.6860243E12, 203.6373056994819], [1.6860246E12, 203.92999999999995], [1.68602424E12, 198.465], [1.68602436E12, 201.4495412844036], [1.68602406E12, 200.28999999999994], [1.68602466E12, 208.5879120879122], [1.686024E12, 204.20000000000002], [1.68602412E12, 201.43000000000004], [1.68602442E12, 206.02020202020202], [1.68602472E12, 206.02040816326527]], "isOverall": false, "label": "announcements-create", "isController": false}, {"data": [[1.68602454E12, 212.72864321608048], [1.68602448E12, 212.4649999999999], [1.68602418E12, 207.67], [1.6860243E12, 212.41085271317831], [1.6860246E12, 213.18562874251506], [1.68602424E12, 209.70786516853937], [1.68602436E12, 210.02590673575136], [1.68602406E12, 209.21319796954324], [1.68602466E12, 219.774647887324], [1.686024E12, 203.5], [1.68602412E12, 218.71573604060916], [1.68602442E12, 212.945], [1.68602472E12, 219.3894736842105]], "isOverall": false, "label": "user_detail", "isController": false}, {"data": [[1.68602454E12, 214.37185929648246], [1.68602448E12, 211.1457286432161], [1.68602418E12, 207.48863636363626], [1.6860243E12, 210.22500000000002], [1.6860246E12, 217.1599999999999], [1.68602424E12, 209.00499999999988], [1.68602436E12, 208.3464052287582], [1.68602406E12, 205.95], [1.68602466E12, 209.2060301507538], [1.686024E12, 204.55000000000004], [1.68602412E12, 209.8225806451613], [1.68602442E12, 210.93288590604027], [1.68602472E12, 217.05263157894737]], "isOverall": false, "label": "categories-list", "isController": false}, {"data": [[1.68602454E12, 210.66161616161617], [1.68602436E12, 212.57070707070707], [1.68602406E12, 213.0541871921182], [1.68602466E12, 213.13194444444446], [1.68602448E12, 210.56000000000006], [1.68602418E12, 208.25999999999996], [1.6860243E12, 211.0839694656489], [1.68602412E12, 217.3248730964468], [1.6860246E12, 214.2424242424242], [1.68602442E12, 208.1599999999999], [1.68602424E12, 211.66081871345034], [1.68602472E12, 218.62365591397855]], "isOverall": false, "label": "donations-list-0", "isController": false}, {"data": [[1.68602454E12, 995.1212121212124], [1.68602436E12, 1028.7939698492462], [1.68602406E12, 1037.4499999999987], [1.68602466E12, 1207.6242038216558], [1.68602448E12, 988.2650000000001], [1.68602418E12, 1085.3899999999994], [1.6860243E12, 1073.7482014388488], [1.68602412E12, 1022.0499999999996], [1.6860246E12, 1136.4400000000003], [1.68602442E12, 998.2499999999998], [1.68602424E12, 1127.3209876543215], [1.68602472E12, 897.8736842105264]], "isOverall": false, "label": "donations-list-1", "isController": false}, {"data": [[1.68602454E12, 981.3948717948718], [1.68602436E12, 1031.3366834170856], [1.68602406E12, 966.6549999999994], [1.68602466E12, 1234.8493975903605], [1.68602448E12, 1004.9650000000001], [1.68602418E12, 1086.2849999999996], [1.6860243E12, 1089.886075949368], [1.68602412E12, 1049.7699999999998], [1.6860246E12, 1102.587412587412], [1.68602442E12, 1035.2], [1.68602424E12, 1161.2377622377614], [1.68602472E12, 906.7187500000003]], "isOverall": false, "label": "donations-list-2", "isController": false}, {"data": [[1.68602454E12, 216.46927374301674], [1.68602448E12, 209.24719101123603], [1.68602418E12, 208.55944055944067], [1.6860243E12, 210.57500000000002], [1.6860246E12, 210.5919540229885], [1.68602424E12, 207.78343949044586], [1.68602436E12, 209.00999999999996], [1.68602406E12, 207.13000000000005], [1.68602466E12, 209.2171717171717], [1.686024E12, 213.75999999999993], [1.68602412E12, 209.69499999999994], [1.68602442E12, 207.12865497076024], [1.68602472E12, 215.88]], "isOverall": false, "label": "users-list-0", "isController": false}, {"data": [[1.68602454E12, 981.6755319148938], [1.68602448E12, 970.514285714286], [1.68602418E12, 1123.5], [1.6860243E12, 1161.1600000000003], [1.6860246E12, 998.169491525424], [1.68602424E12, 1127.5057471264367], [1.68602436E12, 1132.2949999999998], [1.68602406E12, 1064.0899999999986], [1.68602466E12, 1154.4824120603018], [1.686024E12, 1149.5800000000004], [1.68602412E12, 1428.5850000000007], [1.68602442E12, 1173.3478260869567], [1.68602472E12, 909.3199999999999]], "isOverall": false, "label": "users-list-1", "isController": false}, {"data": [[1.68602454E12, 213.76756756756748], [1.68602436E12, 212.64], [1.68602406E12, 211.37999999999988], [1.68602466E12, 211.860962566845], [1.68602448E12, 212.92063492063494], [1.68602418E12, 208.74345549738212], [1.6860243E12, 211.46113989637306], [1.68602412E12, 212.78499999999997], [1.6860246E12, 210.07913669064754], [1.68602442E12, 210.48999999999995], [1.68602424E12, 211.0603448275862], [1.68602472E12, 221.36000000000004]], "isOverall": false, "label": "report-generate", "isController": false}, {"data": [[1.68602454E12, 206.13775510204079], [1.68602448E12, 199.8814432989691], [1.68602418E12, 195.64885496183211], [1.6860243E12, 199.40000000000006], [1.6860246E12, 202.81909547738684], [1.68602424E12, 197.68000000000004], [1.68602436E12, 199.63535911602213], [1.68602406E12, 199.1049999999999], [1.68602466E12, 196.50000000000006], [1.686024E12, 199.22000000000003], [1.68602412E12, 200.42011834319527], [1.68602442E12, 196.96153846153842], [1.68602472E12, 201.0416666666667]], "isOverall": false, "label": "resources-update", "isController": false}, {"data": [[1.68602454E12, 213.365], [1.68602448E12, 213.44500000000002], [1.68602418E12, 208.29499999999996], [1.6860243E12, 214.1733333333333], [1.6860246E12, 214.48989898989907], [1.68602424E12, 209.3999999999999], [1.68602436E12, 212.72666666666663], [1.68602406E12, 208.5406976744186], [1.68602466E12, 227.4794520547945], [1.686024E12, 212.19999999999996], [1.68602412E12, 214.67187499999994], [1.68602442E12, 215.455], [1.68602472E12, 210.99999999999997]], "isOverall": false, "label": "company_detail-0", "isController": false}, {"data": [[1.68602454E12, 884.2649999999995], [1.68602448E12, 909.6149999999993], [1.68602418E12, 1108.1400000000006], [1.6860243E12, 960.7299270072989], [1.6860246E12, 1112.4410256410254], [1.68602424E12, 1060.8749999999995], [1.68602436E12, 1042.5644171779136], [1.68602406E12, 847.3012820512819], [1.68602466E12, 994.3913043478259], [1.686024E12, 759.6565656565657], [1.68602412E12, 909.8551724137938], [1.68602442E12, 874.98], [1.68602472E12, 880.4210526315793]], "isOverall": false, "label": "company_detail-1", "isController": false}, {"data": [[1.68602454E12, 203.24999999999994], [1.68602448E12, 199.28176795580114], [1.68602418E12, 198.4247787610619], [1.6860243E12, 199.51500000000007], [1.6860246E12, 204.98412698412707], [1.68602424E12, 197.48936170212772], [1.68602436E12, 199.585], [1.68602406E12, 199.84999999999997], [1.68602466E12, 201.095], [1.686024E12, 200.69000000000003], [1.68602412E12, 198.12060301507537], [1.68602442E12, 199.61594202898556], [1.68602472E12, 206.63636363636377]], "isOverall": false, "label": "users-delete", "isController": false}, {"data": [[1.68602454E12, 201.70499999999984], [1.68602448E12, 200.25499999999988], [1.68602418E12, 199.5900000000001], [1.6860243E12, 203.39354838709679], [1.6860246E12, 204.23232323232315], [1.68602424E12, 199.46499999999997], [1.68602436E12, 199.7586206896552], [1.68602406E12, 195.88202247191012], [1.68602466E12, 210.4630872483222], [1.686024E12, 202.17], [1.68602412E12, 201.75409836065575], [1.68602442E12, 203.03500000000003], [1.68602472E12, 200.83870967741936]], "isOverall": false, "label": "register_company", "isController": false}, {"data": [[1.68602454E12, 903.3800000000003], [1.68602448E12, 912.2249999999997], [1.68602418E12, 1121.1800000000003], [1.6860243E12, 976.0150375939852], [1.6860246E12, 1106.457894736842], [1.68602424E12, 1081.3333333333342], [1.68602436E12, 1052.2781065088757], [1.68602406E12, 827.793548387097], [1.68602466E12, 1030.9481481481473], [1.686024E12, 785.7250000000003], [1.68602412E12, 953.7636363636366], [1.68602442E12, 892.4049999999997], [1.68602472E12, 862.5238095238097]], "isOverall": false, "label": "company_detail-2", "isController": false}, {"data": [[1.68602454E12, 200.32124352331587], [1.68602436E12, 201.59499999999994], [1.68602406E12, 201.05500000000006], [1.68602466E12, 199.2366863905324], [1.68602448E12, 198.18592964824134], [1.68602418E12, 198.83499999999987], [1.6860243E12, 198.80246913580245], [1.68602412E12, 202.61999999999995], [1.6860246E12, 204.24113475177296], [1.68602442E12, 198.48500000000007], [1.68602424E12, 197.38405797101453], [1.68602472E12, 207.6020408163266]], "isOverall": false, "label": "binnacle-create", "isController": false}, {"data": [[1.68602454E12, 201.01499999999993], [1.68602448E12, 202.71500000000012], [1.68602418E12, 199.04999999999993], [1.6860243E12, 202.21465968586392], [1.6860246E12, 201.24623115577893], [1.68602424E12, 200.4700000000001], [1.68602436E12, 199.19819819819827], [1.68602406E12, 197.56000000000003], [1.68602466E12, 207.60335195530746], [1.686024E12, 200.83999999999997], [1.68602412E12, 196.5], [1.68602442E12, 200.96464646464634], [1.68602472E12, 197.3461538461539]], "isOverall": false, "label": "announcements-update", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68602472E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.686024E12, "maxY": 124.78999999999999, "series": [{"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.9600000000000009], [1.6860246E12, 0.14361702127659576], [1.68602424E12, 1.8930481283422456], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 1.5400000000000003], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "users-create", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602436E12, 0.10552763819095476], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.68602412E12, 0.19500000000000015], [1.6860246E12, 0.0], [1.68602442E12, 0.0], [1.68602424E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "donations-list", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.0], [1.68602424E12, 0.34499999999999986], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.2400000000000001], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "resources-list", "isController": false}, {"data": [[1.68602454E12, 0.4499999999999999], [1.68602448E12, 0.6299999999999999], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.2592592592592593], [1.68602424E12, 0.0], [1.68602436E12, 1.6491228070175437], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 3.642424242424243], [1.68602442E12, 1.4399999999999997], [1.68602472E12, 0.0]], "isOverall": false, "label": "edit_company", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602436E12, 3.544999999999998], [1.68602406E12, 10.81], [1.68602466E12, 0.5195530726256983], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 2.2928176795580115], [1.68602412E12, 0.15999999999999998], [1.6860246E12, 0.0], [1.68602442E12, 0.0], [1.68602424E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "report-generate-1", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602436E12, 0.8], [1.68602406E12, 5.259999999999999], [1.68602466E12, 0.1764705882352941], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 1.5803108808290152], [1.68602412E12, 0.0], [1.6860246E12, 0.0], [1.68602442E12, 0.0], [1.68602424E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "report-generate-2", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.4850000000000003], [1.68602466E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.2500000000000001], [1.68602412E12, 0.0], [1.6860246E12, 0.0], [1.68602442E12, 0.0], [1.68602424E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "report-generate-0", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.0], [1.68602424E12, 0.07407407407407406], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.20499999999999993], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "logout", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.1901408450704225], [1.6860243E12, 0.0], [1.6860246E12, 0.11055276381909546], [1.68602424E12, 0.2500000000000001], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.07999999999999999], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "categories-list-0", "isController": false}, {"data": [[1.68602454E12, 0.3787878787878788], [1.68602448E12, 0.16243654822335024], [1.68602418E12, 0.5090909090909091], [1.6860243E12, 0.0], [1.6860246E12, 0.86], [1.68602424E12, 2.175], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 1.5527638190954784], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "categories-list-1", "isController": false}, {"data": [[1.68602454E12, 0.45226130653266333], [1.68602448E12, 0.0], [1.68602418E12, 0.22727272727272727], [1.6860243E12, 0.0], [1.6860246E12, 2.5100000000000002], [1.68602424E12, 0.47500000000000026], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.14070351758793975], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "categories-list-2", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.06499999999999999], [1.68602418E12, 0.07142857142857141], [1.6860243E12, 0.0], [1.6860246E12, 0.0], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0466321243523316], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "announcements-categories", "isController": false}, {"data": [[1.68602454E12, 0.049999999999999996], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.07526881720430105], [1.68602424E12, 0.0], [1.68602436E12, 0.12359550561797752], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.6568047337278108], [1.68602442E12, 0.17499999999999996], [1.68602472E12, 0.0]], "isOverall": false, "label": "delete_company", "isController": false}, {"data": [[1.68602454E12, 0.15], [1.68602448E12, 0.2899999999999999], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.0], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.812121212121212], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "company_detail", "isController": false}, {"data": [[1.68602454E12, 0.04663212435233159], [1.68602436E12, 2.0603015075376887], [1.68602406E12, 3.2199999999999998], [1.68602466E12, 0.1834319526627219], [1.68602448E12, 0.04522613065326631], [1.68602418E12, 0.0], [1.6860243E12, 0.84375], [1.68602412E12, 0.14000000000000004], [1.6860246E12, 0.0], [1.68602442E12, 0.15000000000000002], [1.68602424E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "donation-create", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 1.465], [1.6860246E12, 0.326530612244898], [1.68602424E12, 5.363636363636364], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 3.2600000000000007], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "resources-list-1", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.19500000000000015], [1.6860246E12, 0.47959183673469385], [1.68602424E12, 0.9600000000000009], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 1.1849999999999994], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "resources-list-2", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.0], [1.68602424E12, 0.36507936507936495], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.2400000000000001], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "resources-list-0", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 3.180904522613065], [1.6860246E12, 0.0], [1.68602424E12, 0.6078431372549019], [1.68602436E12, 0.6649999999999999], [1.68602406E12, 0.7500000000000003], [1.68602466E12, 1.2030456852791873], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "login-1", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 1.9497487437185943], [1.6860246E12, 0.0], [1.68602424E12, 2.731884057971014], [1.68602436E12, 0.3300000000000001], [1.68602406E12, 0.8050000000000003], [1.68602466E12, 0.46428571428571436], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "login-0", "isController": false}, {"data": [[1.68602454E12, 0.1306532663316583], [1.68602448E12, 0.45], [1.68602418E12, 0.8121546961325966], [1.6860243E12, 0.0], [1.6860246E12, 0.3199999999999999], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "categories-update", "isController": false}, {"data": [[1.68602454E12, 0.07999999999999999], [1.68602448E12, 0.9900000000000002], [1.68602418E12, 0.3050000000000001], [1.6860243E12, 0.0], [1.6860246E12, 0.07537688442211053], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.22727272727272735], [1.68602472E12, 0.0]], "isOverall": false, "label": "announcements-delete", "isController": false}, {"data": [[1.68602454E12, 0.15], [1.68602448E12, 0.1799999999999999], [1.68602418E12, 0.5399999999999999], [1.6860243E12, 0.0], [1.6860246E12, 0.18592964824120603], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.69], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "announcementProjects-list-0", "isController": false}, {"data": [[1.68602454E12, 5.4], [1.68602448E12, 4.764999999999998], [1.68602418E12, 3.114999999999998], [1.6860243E12, 0.0], [1.6860246E12, 1.974874371859296], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 1.342857142857143], [1.68602442E12, 7.030150753768844], [1.68602472E12, 0.0]], "isOverall": false, "label": "announcementProjects-list-1", "isController": false}, {"data": [[1.68602454E12, 0.7900000000000001], [1.68602448E12, 1.935000000000001], [1.68602418E12, 0.44000000000000034], [1.6860243E12, 0.0], [1.6860246E12, 0.9848484848484852], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.3418803418803419], [1.68602442E12, 1.251256281407035], [1.68602472E12, 0.0]], "isOverall": false, "label": "announcementProjects-list-2", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.33088235294117646], [1.6860243E12, 0.0], [1.6860246E12, 0.11055276381909546], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "resources-delete", "isController": false}, {"data": [[1.68602454E12, 0.3], [1.68602448E12, 3.19], [1.68602418E12, 1.4699999999999998], [1.6860243E12, 0.0], [1.6860246E12, 1.5049999999999997], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 1.01010101010101], [1.68602472E12, 0.0]], "isOverall": false, "label": "announcements-list-2", "isController": false}, {"data": [[1.68602454E12, 1.06], [1.68602448E12, 1.6500000000000004], [1.68602418E12, 2.372448979591837], [1.6860243E12, 0.0], [1.6860246E12, 1.7749999999999997], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.24083769633507837], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 2.174863387978142], [1.68602472E12, 0.0]], "isOverall": false, "label": "announcements-list-0", "isController": false}, {"data": [[1.68602454E12, 0.76], [1.68602448E12, 0.69], [1.68602418E12, 4.831632653061224], [1.6860243E12, 0.0], [1.6860246E12, 0.6049999999999994], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.34715025906735764], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.3551912568306011], [1.68602472E12, 0.0]], "isOverall": false, "label": "announcements-categories-2", "isController": false}, {"data": [[1.68602454E12, 2.910000000000001], [1.68602448E12, 0.7250000000000003], [1.68602418E12, 3.3618090452261304], [1.6860243E12, 0.0], [1.6860246E12, 3.5549999999999997], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 2.557291666666667], [1.68602472E12, 0.0]], "isOverall": false, "label": "announcements-list-1", "isController": false}, {"data": [[1.68602454E12, 2.5300000000000002], [1.68602448E12, 3.0249999999999995], [1.68602418E12, 4.568421052631579], [1.6860243E12, 0.0], [1.6860246E12, 3.9000000000000004], [1.68602424E12, 0.385], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.5685279187817259], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "announcements-categories-1", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.06499999999999999], [1.68602418E12, 0.07486631016042777], [1.6860243E12, 0.0], [1.6860246E12, 0.0], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.045454545454545456], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "announcements-categories-0", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602436E12, 0.33499999999999996], [1.68602406E12, 0.9949999999999997], [1.68602466E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.04907975460122698], [1.68602412E12, 0.0], [1.6860246E12, 0.0], [1.68602442E12, 0.0], [1.68602424E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "binnacle-update", "isController": false}, {"data": [[1.68602454E12, 1.0799999999999996], [1.68602448E12, 1.17], [1.68602418E12, 0.63], [1.6860243E12, 0.0], [1.6860246E12, 0.4595959595959595], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 7.118644067796611], [1.68602442E12, 3.391959798994974], [1.68602472E12, 0.0]], "isOverall": false, "label": "announcementProjects-apply", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 2.4974874371859292], [1.6860246E12, 0.0], [1.68602424E12, 0.45588235294117646], [1.68602436E12, 0.905], [1.68602406E12, 0.5929648241206035], [1.68602466E12, 1.2000000000000004], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "Home-2", "isController": false}, {"data": [[1.68602454E12, 0.15], [1.68602448E12, 0.1799999999999999], [1.68602418E12, 0.5399999999999999], [1.6860243E12, 0.0], [1.6860246E12, 0.18686868686868688], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.5897435897435898], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "announcementProjects-list", "isController": false}, {"data": [[1.68602454E12, 0.4141414141414138], [1.68602448E12, 0.5799999999999998], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.07185628742514974], [1.68602424E12, 0.0], [1.68602436E12, 1.9132653061224487], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 1.4568527918781722], [1.68602442E12, 0.625], [1.68602472E12, 0.0]], "isOverall": false, "label": "user-update", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 1.9497487437185943], [1.6860246E12, 0.0], [1.68602424E12, 2.464052287581699], [1.68602436E12, 0.3300000000000001], [1.68602406E12, 0.8050000000000003], [1.68602466E12, 0.4619289340101522], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "login", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602436E12, 0.33999999999999997], [1.68602406E12, 2.01], [1.68602466E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.054878048780487805], [1.68602412E12, 0.0], [1.6860246E12, 0.0], [1.68602442E12, 0.0], [1.68602424E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "binnacle-delete", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 2.139175257731958], [1.6860246E12, 0.0], [1.68602424E12, 0.24137931034482762], [1.68602436E12, 0.9300000000000005], [1.68602406E12, 4.265000000000004], [1.68602466E12, 0.9625668449197862], [1.686024E12, 37.919999999999995], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "Home-0", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 3.277777777777779], [1.6860246E12, 0.0], [1.68602424E12, 0.27499999999999997], [1.68602436E12, 0.49], [1.68602406E12, 3.870000000000002], [1.68602466E12, 0.9845360824742266], [1.686024E12, 124.78999999999999], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "Home-1", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.7849999999999997], [1.6860246E12, 0.0], [1.68602424E12, 1.5320512820512817], [1.68602436E12, 0.17499999999999996], [1.68602406E12, 0.0], [1.68602466E12, 0.5583756345177667], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "register_user", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.11499999999999992], [1.6860246E12, 0.3969849246231155], [1.68602424E12, 1.7999999999999996], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.6150000000000001], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "resources-create", "isController": false}, {"data": [[1.68602454E12, 1.06], [1.68602448E12, 1.6500000000000004], [1.68602418E12, 2.325], [1.6860243E12, 0.0], [1.6860246E12, 1.7749999999999997], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.25136612021857907], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 2.0101010101010104], [1.68602472E12, 0.0]], "isOverall": false, "label": "announcements-list", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.0], [1.68602424E12, 0.04787234042553191], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.17000000000000007], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "users-update", "isController": false}, {"data": [[1.68602454E12, 1.020100502512563], [1.68602448E12, 0.6331658291457286], [1.68602418E12, 3.3370165745856353], [1.6860243E12, 0.0], [1.6860246E12, 0.7950000000000003], [1.68602424E12, 0.21499999999999989], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.5477386934673364], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "categories-create", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.135], [1.6860246E12, 0.0], [1.68602424E12, 0.08556149732620322], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "users-list", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 2.0854271356783913], [1.6860246E12, 0.0], [1.68602424E12, 0.20588235294117646], [1.68602436E12, 0.9300000000000005], [1.68602406E12, 4.265000000000003], [1.68602466E12, 0.923076923076923], [1.686024E12, 37.919999999999995], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 1.3], [1.6860246E12, 0.0], [1.68602424E12, 4.192513368983957], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 2.0650000000000004], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "users-list-2", "isController": false}, {"data": [[1.68602454E12, 0.07999999999999999], [1.68602448E12, 0.2749999999999999], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.0], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 1.1073446327683618], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "user_detail-0", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.12499999999999999], [1.68602418E12, 0.4207650273224044], [1.6860243E12, 0.0], [1.6860246E12, 0.0], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "categories-delete", "isController": false}, {"data": [[1.68602454E12, 0.8341708542713572], [1.68602448E12, 1.2599999999999998], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 1.055865921787709], [1.68602424E12, 0.0], [1.68602436E12, 2.8906249999999996], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 5.303664921465971], [1.68602442E12, 1.87], [1.68602472E12, 0.0]], "isOverall": false, "label": "user_detail-1", "isController": false}, {"data": [[1.68602454E12, 0.31658291457286425], [1.68602448E12, 0.16999999999999993], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.0], [1.68602424E12, 0.0], [1.68602436E12, 0.9222797927461137], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.7563451776649747], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "user_detail-2", "isController": false}, {"data": [[1.68602454E12, 1.5949999999999995], [1.68602448E12, 0.9000000000000002], [1.68602418E12, 2.4049999999999994], [1.6860243E12, 0.0], [1.6860246E12, 0.7700000000000001], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.09999999999999999], [1.68602442E12, 2.53030303030303], [1.68602472E12, 0.0]], "isOverall": false, "label": "announcements-create", "isController": false}, {"data": [[1.68602454E12, 0.08040201005025124], [1.68602448E12, 0.2749999999999999], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.0], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.9949238578680203], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "user_detail", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.15340909090909094], [1.6860243E12, 0.0], [1.6860246E12, 0.10999999999999999], [1.68602424E12, 0.2500000000000001], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.08040201005025124], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "categories-list", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602436E12, 0.10606060606060605], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.68602412E12, 0.19796954314720827], [1.6860246E12, 0.0], [1.68602442E12, 0.0], [1.68602424E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "donations-list-0", "isController": false}, {"data": [[1.68602454E12, 0.4191919191919193], [1.68602436E12, 5.703517587939696], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.68602448E12, 0.40499999999999986], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.68602412E12, 1.2250000000000005], [1.6860246E12, 0.0], [1.68602442E12, 0.5750000000000002], [1.68602424E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "donations-list-1", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602436E12, 1.9447236180904532], [1.68602406E12, 1.1500000000000001], [1.68602466E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.68602412E12, 0.0], [1.6860246E12, 0.0], [1.68602442E12, 0.0], [1.68602424E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "donations-list-2", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.135], [1.6860246E12, 0.0], [1.68602424E12, 0.10191082802547771], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "users-list-0", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 1.465], [1.6860246E12, 0.0], [1.68602424E12, 3.9597701149425286], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 3.718592964824121], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "users-list-1", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.4850000000000003], [1.68602466E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.2176165803108808], [1.68602412E12, 0.0], [1.6860246E12, 0.0], [1.68602442E12, 0.0], [1.68602424E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "report-generate", "isController": false}, {"data": [[1.68602454E12, 0.2142857142857143], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.20100502512562818], [1.68602424E12, 0.13], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "resources-update", "isController": false}, {"data": [[1.68602454E12, 0.15], [1.68602448E12, 0.2899999999999999], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.0], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 1.0468749999999998], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "company_detail-0", "isController": false}, {"data": [[1.68602454E12, 1.8100000000000005], [1.68602448E12, 2.184999999999999], [1.68602418E12, 0.4150000000000001], [1.6860243E12, 0.0], [1.6860246E12, 0.14871794871794863], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 12.13103448275862], [1.68602442E12, 3.579999999999999], [1.68602472E12, 0.0]], "isOverall": false, "label": "company_detail-1", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.0], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.06999999999999997], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "users-delete", "isController": false}, {"data": [[1.68602454E12, 0.04499999999999999], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.11616161616161608], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 1.0000000000000004], [1.68602442E12, 0.5399999999999999], [1.68602472E12, 0.0]], "isOverall": false, "label": "register_company", "isController": false}, {"data": [[1.68602454E12, 0.31000000000000005], [1.68602448E12, 0.3050000000000002], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.37368421052631595], [1.68602424E12, 0.0], [1.68602436E12, 0.16568047337278105], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 7.309090909090908], [1.68602442E12, 1.02], [1.68602472E12, 0.0]], "isOverall": false, "label": "company_detail-2", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602436E12, 0.049999999999999996], [1.68602406E12, 0.835], [1.68602466E12, 0.0], [1.68602448E12, 0.0], [1.68602418E12, 0.0], [1.6860243E12, 0.32098765432098764], [1.68602412E12, 0.0], [1.6860246E12, 0.0], [1.68602442E12, 0.0], [1.68602424E12, 0.0], [1.68602472E12, 0.0]], "isOverall": false, "label": "binnacle-create", "isController": false}, {"data": [[1.68602454E12, 0.0], [1.68602448E12, 0.36999999999999994], [1.68602418E12, 0.0], [1.6860243E12, 0.0], [1.6860246E12, 0.2010050251256281], [1.68602424E12, 0.0], [1.68602436E12, 0.0], [1.68602406E12, 0.0], [1.68602466E12, 0.0], [1.686024E12, 0.0], [1.68602412E12, 0.0], [1.68602442E12, 0.3888888888888889], [1.68602472E12, 0.0]], "isOverall": false, "label": "announcements-update", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68602472E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 180.0, "minX": 1.686024E12, "maxY": 7597.0, "series": [{"data": [[1.68602454E12, 3021.0], [1.68602448E12, 2866.0], [1.68602418E12, 3397.0], [1.6860243E12, 3279.0], [1.6860246E12, 3373.0], [1.68602424E12, 7597.0], [1.68602436E12, 3577.0], [1.68602406E12, 3088.0], [1.68602466E12, 3389.0], [1.686024E12, 3393.0], [1.68602412E12, 4460.0], [1.68602442E12, 6543.0], [1.68602472E12, 2718.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.68602454E12, 1961.0], [1.68602448E12, 1988.0], [1.68602418E12, 2161.0], [1.6860243E12, 2178.0], [1.6860246E12, 2093.0], [1.68602424E12, 2152.0], [1.68602436E12, 2263.0], [1.68602406E12, 1879.0], [1.68602466E12, 2094.0], [1.686024E12, 1840.8000000000002], [1.68602412E12, 2318.5], [1.68602442E12, 2177.0], [1.68602472E12, 1956.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.68602454E12, 2463.0699999999997], [1.68602448E12, 2475.7999999999993], [1.68602418E12, 2807.7999999999993], [1.6860243E12, 2767.34], [1.6860246E12, 3012.6800000000003], [1.68602424E12, 2878.550000000001], [1.68602436E12, 3017.7299999999996], [1.68602406E12, 2582.3500000000004], [1.68602466E12, 3005.0], [1.686024E12, 2908.1400000000003], [1.68602412E12, 3339.8500000000095], [1.68602442E12, 2787.2000000000007], [1.68602472E12, 2333.0299999999997]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.68602454E12, 2182.0], [1.68602448E12, 2181.0], [1.68602418E12, 2455.0], [1.6860243E12, 2421.8499999999985], [1.6860246E12, 2360.0], [1.68602424E12, 2562.0], [1.68602436E12, 2657.0], [1.68602406E12, 2221.75], [1.68602466E12, 2585.0], [1.686024E12, 2395.8999999999996], [1.68602412E12, 2811.0], [1.68602442E12, 2461.0], [1.68602472E12, 2079.1499999999996]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.68602454E12, 181.0], [1.68602448E12, 181.0], [1.68602418E12, 182.0], [1.6860243E12, 181.0], [1.6860246E12, 180.0], [1.68602424E12, 181.0], [1.68602436E12, 181.0], [1.68602406E12, 180.0], [1.68602466E12, 180.0], [1.686024E12, 181.0], [1.68602412E12, 181.0], [1.68602442E12, 180.0], [1.68602472E12, 183.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.68602454E12, 370.5], [1.68602448E12, 349.0], [1.68602418E12, 722.0], [1.6860243E12, 604.5], [1.6860246E12, 309.0], [1.68602424E12, 257.0], [1.68602436E12, 552.5], [1.68602406E12, 337.5], [1.68602466E12, 490.0], [1.686024E12, 413.0], [1.68602412E12, 594.0], [1.68602442E12, 578.0], [1.68602472E12, 712.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68602472E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 165.0, "minX": 24.0, "maxY": 1749.0, "series": [{"data": [[24.0, 1123.0], [43.0, 417.0], [107.0, 709.5], [112.0, 1749.0], [118.0, 226.5], [124.0, 1446.0], [127.0, 1688.0], [131.0, 1372.0], [139.0, 1520.0], [137.0, 1496.0], [140.0, 1486.5], [142.0, 1387.5], [138.0, 1548.0], [136.0, 1373.0], [146.0, 1408.5], [150.0, 1095.5], [148.0, 1231.0], [144.0, 1372.0], [149.0, 1302.0], [151.0, 1260.0], [155.0, 941.0], [153.0, 1085.5], [152.0, 1207.5], [156.0, 1384.0], [154.0, 1366.0], [157.0, 1065.0], [158.0, 1104.5], [159.0, 1001.0], [160.0, 1018.5], [166.0, 1096.0], [161.0, 230.0], [165.0, 1114.0], [167.0, 1211.5], [164.0, 1091.0], [162.0, 1188.0], [163.0, 1123.0], [168.0, 1015.5], [173.0, 1178.0], [175.0, 804.0], [170.0, 1122.5], [169.0, 1182.0], [174.0, 281.0], [172.0, 1031.5], [171.0, 1039.5], [183.0, 999.0], [181.0, 1101.0], [180.0, 1002.0], [182.0, 903.0], [177.0, 890.5], [179.0, 963.0], [178.0, 1030.5], [176.0, 1207.5], [190.0, 895.5], [188.0, 997.5], [191.0, 885.5], [189.0, 895.0], [186.0, 983.0], [187.0, 1070.5], [184.0, 879.0], [185.0, 1184.0], [199.0, 797.5], [193.0, 912.0], [195.0, 371.0], [192.0, 857.0], [194.0, 232.0], [198.0, 696.5], [196.0, 834.0], [197.0, 891.0], [205.0, 894.5], [204.0, 903.0], [200.0, 807.5], [206.0, 882.5], [207.0, 684.0], [202.0, 811.5], [203.0, 848.0], [201.0, 302.0], [209.0, 596.0], [211.0, 253.5], [210.0, 786.0], [208.0, 724.0], [212.0, 830.0], [214.0, 701.0], [215.0, 805.0], [213.0, 797.0], [221.0, 289.0], [216.0, 246.5], [223.0, 655.0], [222.0, 779.5], [220.0, 241.0], [219.0, 323.5], [217.0, 261.0], [218.0, 887.0], [227.0, 253.0], [225.0, 292.0], [229.0, 246.0], [231.0, 653.0], [224.0, 438.5], [226.0, 622.5], [228.0, 257.0], [230.0, 546.5], [239.0, 223.0], [233.0, 292.0], [237.0, 309.5], [236.0, 234.0], [238.0, 235.0], [234.0, 249.0], [235.0, 239.0], [232.0, 231.5], [241.0, 275.0], [242.0, 240.0], [245.0, 256.0], [243.0, 253.0], [246.0, 233.5], [247.0, 233.0], [244.0, 239.0], [240.0, 230.5], [251.0, 662.0], [252.0, 236.0], [248.0, 210.0], [255.0, 215.0], [254.0, 305.5], [249.0, 236.0], [250.0, 232.5], [253.0, 220.0], [270.0, 228.0], [264.0, 211.0], [267.0, 215.0], [265.0, 229.0], [266.0, 217.0], [271.0, 226.0], [256.0, 257.0], [257.0, 222.0], [260.0, 226.0], [262.0, 273.0], [261.0, 221.0], [268.0, 213.5], [259.0, 227.0], [258.0, 217.0], [269.0, 230.5], [263.0, 217.0], [285.0, 211.0], [280.0, 209.0], [279.0, 222.0], [276.0, 220.5], [278.0, 229.0], [287.0, 210.0], [272.0, 229.5], [286.0, 213.0], [273.0, 227.0], [274.0, 218.0], [275.0, 219.0], [281.0, 219.5], [283.0, 221.0], [282.0, 362.0], [294.0, 207.0], [292.0, 209.5], [298.0, 207.0], [290.0, 217.0], [291.0, 213.0], [324.0, 203.0], [323.0, 207.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[166.0, 201.5], [255.0, 165.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 324.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 157.0, "minX": 24.0, "maxY": 668.5, "series": [{"data": [[24.0, 357.5], [43.0, 417.0], [107.0, 456.5], [112.0, 619.0], [118.0, 210.0], [124.0, 215.0], [127.0, 211.0], [131.0, 222.0], [139.0, 219.0], [137.0, 222.0], [140.0, 216.0], [142.0, 214.0], [138.0, 213.0], [136.0, 244.0], [146.0, 223.0], [150.0, 217.5], [148.0, 211.0], [144.0, 208.5], [149.0, 214.5], [151.0, 222.0], [155.0, 212.0], [153.0, 216.5], [152.0, 215.0], [156.0, 214.5], [154.0, 218.0], [157.0, 216.0], [158.0, 208.0], [159.0, 213.0], [160.0, 668.5], [166.0, 215.0], [161.0, 212.0], [165.0, 208.0], [167.0, 210.5], [164.0, 212.0], [162.0, 218.5], [163.0, 214.0], [168.0, 216.0], [173.0, 214.0], [175.0, 210.0], [170.0, 213.0], [169.0, 214.0], [174.0, 209.0], [172.0, 213.0], [171.0, 215.0], [183.0, 211.0], [181.0, 213.0], [180.0, 212.5], [182.0, 213.0], [177.0, 210.0], [179.0, 213.0], [178.0, 218.5], [176.0, 207.0], [190.0, 210.0], [188.0, 211.0], [191.0, 215.0], [189.0, 213.0], [186.0, 210.0], [187.0, 215.0], [184.0, 210.0], [185.0, 211.0], [199.0, 211.0], [193.0, 211.0], [195.0, 209.0], [192.0, 214.0], [194.0, 209.0], [198.0, 210.0], [196.0, 214.0], [197.0, 211.0], [205.0, 214.0], [204.0, 217.0], [200.0, 212.0], [206.0, 213.0], [207.0, 210.0], [202.0, 210.0], [203.0, 212.0], [201.0, 209.0], [209.0, 209.0], [211.0, 211.0], [210.0, 218.0], [208.0, 216.0], [212.0, 214.0], [214.0, 214.0], [215.0, 212.0], [213.0, 210.0], [221.0, 209.0], [216.0, 209.0], [223.0, 215.0], [222.0, 210.0], [220.0, 211.0], [219.0, 214.0], [217.0, 209.0], [218.0, 214.0], [227.0, 209.0], [225.0, 211.0], [229.0, 210.0], [231.0, 218.0], [224.0, 214.0], [226.0, 213.0], [228.0, 210.0], [230.0, 214.0], [239.0, 209.0], [233.0, 211.0], [237.0, 214.0], [236.0, 210.0], [238.0, 211.0], [234.0, 209.0], [235.0, 209.0], [232.0, 207.0], [241.0, 210.0], [242.0, 212.0], [245.0, 208.0], [243.0, 209.0], [246.0, 209.0], [247.0, 210.0], [244.0, 212.0], [240.0, 210.0], [251.0, 208.0], [252.0, 211.0], [248.0, 204.0], [255.0, 207.0], [254.0, 214.0], [249.0, 208.0], [250.0, 209.0], [253.0, 210.0], [270.0, 212.0], [264.0, 204.0], [267.0, 206.0], [265.0, 209.0], [266.0, 206.0], [271.0, 209.0], [256.0, 209.5], [257.0, 209.0], [260.0, 207.0], [262.0, 213.5], [261.0, 208.0], [268.0, 205.0], [259.0, 207.0], [258.0, 206.0], [269.0, 207.5], [263.0, 208.0], [285.0, 206.0], [280.0, 203.0], [279.0, 206.0], [276.0, 209.0], [278.0, 212.0], [287.0, 205.0], [272.0, 210.0], [286.0, 204.0], [273.0, 210.0], [274.0, 206.0], [275.0, 210.0], [281.0, 207.0], [283.0, 207.0], [282.0, 310.5], [294.0, 202.0], [292.0, 203.5], [298.0, 202.0], [290.0, 209.0], [291.0, 206.0], [324.0, 200.0], [323.0, 202.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[166.0, 157.0], [255.0, 165.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 324.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 90.6, "minX": 1.686024E12, "maxY": 227.41666666666666, "series": [{"data": [[1.68602454E12, 226.45], [1.68602448E12, 226.16666666666666], [1.68602418E12, 204.43333333333334], [1.6860243E12, 208.98333333333332], [1.6860246E12, 211.25], [1.68602424E12, 208.63333333333333], [1.68602436E12, 200.61666666666667], [1.68602406E12, 227.41666666666666], [1.68602466E12, 208.13333333333333], [1.686024E12, 90.6], [1.68602412E12, 191.31666666666666], [1.68602442E12, 207.95], [1.68602472E12, 98.96666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68602472E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.686024E12, "maxY": 77.8, "series": [{"data": [[1.68602454E12, 77.36666666666666], [1.68602448E12, 77.13333333333334], [1.68602418E12, 70.4], [1.6860243E12, 72.46666666666667], [1.6860246E12, 71.5], [1.68602424E12, 70.36666666666666], [1.68602436E12, 68.7], [1.68602406E12, 77.8], [1.68602466E12, 71.76666666666667], [1.686024E12, 29.533333333333335], [1.68602412E12, 66.13333333333334], [1.68602442E12, 72.33333333333333], [1.68602472E12, 36.233333333333334]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.68602454E12, 38.56666666666667], [1.68602448E12, 38.7], [1.68602418E12, 35.55], [1.6860243E12, 35.916666666666664], [1.6860246E12, 36.03333333333333], [1.68602424E12, 34.983333333333334], [1.68602436E12, 34.55], [1.68602406E12, 39.266666666666666], [1.68602466E12, 35.65], [1.686024E12, 15.7], [1.68602412E12, 32.93333333333333], [1.68602442E12, 36.06666666666667], [1.68602472E12, 16.966666666666665]], "isOverall": false, "label": "301", "isController": false}, {"data": [[1.68602454E12, 35.733333333333334], [1.68602448E12, 35.583333333333336], [1.68602418E12, 32.85], [1.6860243E12, 32.5], [1.6860246E12, 33.05], [1.68602424E12, 32.7], [1.68602436E12, 31.383333333333333], [1.68602406E12, 35.666666666666664], [1.68602466E12, 32.516666666666666], [1.686024E12, 13.633333333333333], [1.68602412E12, 29.65], [1.68602442E12, 33.03333333333333], [1.68602472E12, 15.9]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.68602406E12, 0.03333333333333333], [1.68602418E12, 0.016666666666666666]], "isOverall": false, "label": "502", "isController": false}, {"data": [[1.68602454E12, 74.86666666666666], [1.68602448E12, 74.56666666666666], [1.68602418E12, 65.51666666666667], [1.6860243E12, 68.81666666666666], [1.6860246E12, 70.5], [1.68602424E12, 70.51666666666667], [1.68602436E12, 65.5], [1.68602406E12, 75.0], [1.68602466E12, 68.71666666666667], [1.686024E12, 28.816666666666666], [1.68602412E12, 62.18333333333333], [1.68602442E12, 66.55], [1.68602472E12, 32.5]], "isOverall": false, "label": "307", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68602472E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.686024E12, "maxY": 3.3833333333333333, "series": [{"data": [[1.68602454E12, 2.933333333333333], [1.68602448E12, 2.966666666666667], [1.68602418E12, 2.75], [1.6860243E12, 3.316666666666667], [1.6860246E12, 2.7], [1.68602424E12, 2.2666666666666666], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.316666666666667], [1.68602466E12, 3.25], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.3333333333333335], [1.68602442E12, 3.15], [1.68602472E12, 1.6666666666666667]], "isOverall": false, "label": "Home-2-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.316666666666667], [1.6860243E12, 3.3], [1.6860246E12, 3.3333333333333335], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 1.8333333333333333], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.15], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.6833333333333333], [1.68602442E12, 3.2], [1.68602472E12, 1.0]], "isOverall": false, "label": "announcements-list-1-success", "isController": false}, {"data": [[1.68602454E12, 3.283333333333333], [1.68602448E12, 3.25], [1.68602418E12, 2.3666666666666667], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.316666666666667], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 2.95], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.3333333333333335], [1.686024E12, 1.6666666666666667], [1.68602412E12, 2.6333333333333333], [1.68602442E12, 2.2], [1.68602472E12, 1.5666666666666667]], "isOverall": false, "label": "categories-list-0-success", "isController": false}, {"data": [[1.68602454E12, 3.316666666666667], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.0166666666666666], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.3333333333333335], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 2.3833333333333333], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.316666666666667], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.9833333333333334], [1.68602442E12, 2.6333333333333333], [1.68602472E12, 1.35]], "isOverall": false, "label": "categories-update-success", "isController": false}, {"data": [[1.68602454E12, 3.1333333333333333], [1.68602448E12, 2.9166666666666665], [1.68602418E12, 2.1], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 2.95], [1.68602424E12, 2.9], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.316666666666667], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.3333333333333335], [1.68602442E12, 2.683333333333333], [1.68602472E12, 1.6666666666666667]], "isOverall": false, "label": "users-list-1-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 3.1166666666666667], [1.6860246E12, 3.316666666666667], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 1.9166666666666667], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 2.9], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.6666666666666667], [1.68602442E12, 3.3], [1.68602472E12, 0.8333333333333334]], "isOverall": false, "label": "announcementProjects-list-0-success", "isController": false}, {"data": [[1.68602454E12, 3.216666666666667], [1.68602436E12, 3.316666666666667], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 2.816666666666667], [1.68602448E12, 3.316666666666667], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.6666666666666665], [1.68602412E12, 3.3333333333333335], [1.6860246E12, 2.3833333333333333], [1.68602442E12, 3.3333333333333335], [1.68602424E12, 2.35], [1.68602472E12, 1.6]], "isOverall": false, "label": "donation-create-success", "isController": false}, {"data": [[1.68602406E12, 0.016666666666666666]], "isOverall": false, "label": "Home-failure", "isController": false}, {"data": [[1.68602454E12, 3.283333333333333], [1.68602448E12, 3.1333333333333333], [1.68602418E12, 2.05], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.2666666666666666], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 3.1666666666666665], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.3333333333333335], [1.686024E12, 1.6666666666666667], [1.68602412E12, 2.95], [1.68602442E12, 2.15], [1.68602472E12, 1.65]], "isOverall": false, "label": "resources-list-success", "isController": false}, {"data": [[1.68602454E12, 3.316666666666667], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.1166666666666667], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.3333333333333335], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 2.316666666666667], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.3], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.8833333333333333], [1.68602442E12, 2.7], [1.68602472E12, 1.3]], "isOverall": false, "label": "announcements-categories-0-success", "isController": false}, {"data": [[1.68602454E12, 3.316666666666667], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.15], [1.6860246E12, 2.783333333333333], [1.68602424E12, 2.966666666666667], [1.68602436E12, 3.216666666666667], [1.68602406E12, 3.283333333333333], [1.68602466E12, 2.3666666666666667], [1.686024E12, 0.1], [1.68602412E12, 3.283333333333333], [1.68602442E12, 3.3333333333333335], [1.68602472E12, 1.5833333333333333]], "isOverall": false, "label": "user_detail-2-success", "isController": false}, {"data": [[1.68602454E12, 3.066666666666667], [1.68602448E12, 3.1], [1.68602418E12, 3.1666666666666665], [1.6860243E12, 3.2333333333333334], [1.6860246E12, 2.3833333333333333], [1.68602424E12, 1.9333333333333333], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.1166666666666667], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.3333333333333335], [1.68602442E12, 3.3333333333333335], [1.68602472E12, 1.6666666666666667]], "isOverall": false, "label": "Home-0-success", "isController": false}, {"data": [[1.68602454E12, 3.283333333333333], [1.68602448E12, 3.2333333333333334], [1.68602418E12, 2.2666666666666666], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.316666666666667], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 3.0], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.3333333333333335], [1.686024E12, 1.6666666666666667], [1.68602412E12, 2.7333333333333334], [1.68602442E12, 2.1666666666666665], [1.68602472E12, 1.6]], "isOverall": false, "label": "resources-delete-success", "isController": false}, {"data": [[1.68602454E12, 3.1333333333333333], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 2.8333333333333335], [1.68602448E12, 3.316666666666667], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.8], [1.68602412E12, 3.3333333333333335], [1.6860246E12, 2.4], [1.68602442E12, 3.3333333333333335], [1.68602424E12, 2.2], [1.68602472E12, 1.65]], "isOverall": false, "label": "report-generate-0-success", "isController": false}, {"data": [[1.68602454E12, 3.0833333333333335], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.1166666666666667], [1.68602448E12, 3.15], [1.68602418E12, 3.183333333333333], [1.6860243E12, 3.216666666666667], [1.68602412E12, 3.3333333333333335], [1.6860246E12, 2.316666666666667], [1.68602442E12, 3.3333333333333335], [1.68602424E12, 1.9333333333333333], [1.68602472E12, 1.6666666666666667]], "isOverall": false, "label": "report-generate-2-success", "isController": false}, {"data": [[1.68602454E12, 3.2], [1.68602448E12, 2.9833333333333334], [1.68602418E12, 1.8833333333333333], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.033333333333333], [1.68602424E12, 3.1166666666666667], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.3333333333333335], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.3333333333333335], [1.68602442E12, 2.45], [1.68602472E12, 1.6666666666666667]], "isOverall": false, "label": "users-list-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.816666666666667], [1.6860246E12, 3.3], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 2.2], [1.68602406E12, 3.05], [1.68602466E12, 2.6], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.95], [1.68602442E12, 3.316666666666667], [1.68602472E12, 1.15]], "isOverall": false, "label": "announcementProjects-list-2-success", "isController": false}, {"data": [[1.68602454E12, 3.2], [1.68602448E12, 3.0166666666666666], [1.68602418E12, 1.8833333333333333], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.15], [1.68602424E12, 3.1333333333333333], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.3333333333333335], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.316666666666667], [1.68602442E12, 2.3], [1.68602472E12, 1.65]], "isOverall": false, "label": "users-delete-success", "isController": false}, {"data": [[1.68602454E12, 2.933333333333333], [1.68602448E12, 2.966666666666667], [1.68602418E12, 2.75], [1.6860243E12, 3.316666666666667], [1.6860246E12, 2.7], [1.68602424E12, 2.2666666666666666], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.316666666666667], [1.68602466E12, 3.25], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.3333333333333335], [1.68602442E12, 3.15], [1.68602472E12, 1.6666666666666667]], "isOverall": false, "label": "Home-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.2666666666666666], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.3333333333333335], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 1.95], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.216666666666667], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.7333333333333334], [1.68602442E12, 3.05], [1.68602472E12, 1.3833333333333333]], "isOverall": false, "label": "announcements-categories-success", "isController": false}, {"data": [[1.68602454E12, 3.316666666666667], [1.68602448E12, 3.316666666666667], [1.68602418E12, 2.933333333333333], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.3333333333333335], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 2.55], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.316666666666667], [1.686024E12, 1.6666666666666667], [1.68602412E12, 2.066666666666667], [1.68602442E12, 2.4833333333333334], [1.68602472E12, 1.5833333333333333]], "isOverall": false, "label": "categories-list-2-success", "isController": false}, {"data": [[1.68602454E12, 2.9833333333333334], [1.68602448E12, 2.95], [1.68602418E12, 2.716666666666667], [1.6860243E12, 3.316666666666667], [1.6860246E12, 2.683333333333333], [1.68602424E12, 2.3], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.2666666666666666], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.3333333333333335], [1.68602442E12, 3.1166666666666667], [1.68602472E12, 1.6666666666666667]], "isOverall": false, "label": "login-0-success", "isController": false}, {"data": [[1.68602454E12, 3.183333333333333], [1.68602448E12, 3.1166666666666667], [1.68602418E12, 1.85], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.183333333333333], [1.68602424E12, 3.15], [1.68602436E12, 3.316666666666667], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.3333333333333335], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.316666666666667], [1.68602442E12, 2.2], [1.68602472E12, 1.65]], "isOverall": false, "label": "logout-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 3.15], [1.6860246E12, 3.316666666666667], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 1.8833333333333333], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 2.95], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.6666666666666667], [1.68602442E12, 3.3], [1.68602472E12, 0.85]], "isOverall": false, "label": "announcements-delete-success", "isController": false}, {"data": [[1.68602454E12, 3.25], [1.68602436E12, 3.316666666666667], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 2.7666666666666666], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.6333333333333333], [1.68602412E12, 3.3333333333333335], [1.6860246E12, 2.3833333333333333], [1.68602442E12, 3.3333333333333335], [1.68602424E12, 2.3833333333333333], [1.68602472E12, 1.6]], "isOverall": false, "label": "donations-list-success", "isController": false}, {"data": [[1.68602454E12, 3.2666666666666666], [1.68602448E12, 3.1333333333333333], [1.68602418E12, 2.1], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.316666666666667], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 3.1], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.3333333333333335], [1.686024E12, 1.6666666666666667], [1.68602412E12, 2.9], [1.68602442E12, 2.183333333333333], [1.68602472E12, 1.6]], "isOverall": false, "label": "resources-create-success", "isController": false}, {"data": [[1.68602454E12, 3.316666666666667], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.05], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.3333333333333335], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 2.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.316666666666667], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.95], [1.68602442E12, 2.683333333333333], [1.68602472E12, 1.3333333333333333]], "isOverall": false, "label": "categories-delete-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.0833333333333335], [1.6860246E12, 3.1], [1.68602424E12, 3.283333333333333], [1.68602436E12, 2.966666666666667], [1.68602406E12, 2.85], [1.68602466E12, 2.3], [1.686024E12, 1.0], [1.68602412E12, 2.816666666666667], [1.68602442E12, 3.3333333333333335], [1.68602472E12, 1.3166666666666667]], "isOverall": false, "label": "delete_company-success", "isController": false}, {"data": [[1.68602454E12, 3.15], [1.68602448E12, 2.95], [1.68602418E12, 1.8833333333333333], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.1333333333333333], [1.68602424E12, 3.1166666666666667], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.3333333333333335], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.3333333333333335], [1.68602442E12, 2.433333333333333], [1.68602472E12, 1.65]], "isOverall": false, "label": "users-create-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 3.2333333333333334], [1.6860246E12, 3.3333333333333335], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 1.8], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.05], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.6666666666666667], [1.68602442E12, 3.3], [1.68602472E12, 1.1]], "isOverall": false, "label": "announcements-list-success", "isController": false}, {"data": [[1.68602454E12, 3.25], [1.68602448E12, 3.1], [1.68602418E12, 1.8333333333333333], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.2666666666666666], [1.68602424E12, 3.3], [1.68602436E12, 3.283333333333333], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.3333333333333335], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.2], [1.68602442E12, 2.1], [1.68602472E12, 1.65]], "isOverall": false, "label": "resources-list-1-success", "isController": false}, {"data": [[1.68602418E12, 0.016666666666666666]], "isOverall": false, "label": "logout-failure", "isController": false}, {"data": [[1.68602454E12, 3.216666666666667], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 2.816666666666667], [1.68602448E12, 3.316666666666667], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.7], [1.68602412E12, 3.3333333333333335], [1.6860246E12, 2.35], [1.68602442E12, 3.3333333333333335], [1.68602424E12, 2.3], [1.68602472E12, 1.6333333333333333]], "isOverall": false, "label": "binnacle-create-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.1], [1.6860246E12, 3.1], [1.68602424E12, 3.2666666666666666], [1.68602436E12, 2.966666666666667], [1.68602406E12, 3.0166666666666666], [1.68602466E12, 2.25], [1.686024E12, 0.7], [1.68602412E12, 2.95], [1.68602442E12, 3.3333333333333335], [1.68602472E12, 1.3666666666666667]], "isOverall": false, "label": "user_detail-0-success", "isController": false}, {"data": [[1.68602454E12, 3.3], [1.68602436E12, 3.316666666666667], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 2.6166666666666667], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.316666666666667], [1.68602412E12, 3.3333333333333335], [1.6860246E12, 2.5], [1.68602442E12, 3.3333333333333335], [1.68602424E12, 2.7], [1.68602472E12, 1.5833333333333333]], "isOverall": false, "label": "donations-list-1-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.2666666666666666], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.3333333333333335], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 1.95], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.216666666666667], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.7333333333333334], [1.68602442E12, 3.05], [1.68602472E12, 1.3833333333333333]], "isOverall": false, "label": "announcements-categories-2-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.283333333333333], [1.6860246E12, 3.25], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 2.716666666666667], [1.68602406E12, 2.6], [1.68602466E12, 2.3], [1.686024E12, 1.65], [1.68602412E12, 2.4166666666666665], [1.68602442E12, 3.3333333333333335], [1.68602472E12, 1.2666666666666666]], "isOverall": false, "label": "company_detail-1-success", "isController": false}, {"data": [[1.68602454E12, 2.966666666666667], [1.68602448E12, 3.0166666666666666], [1.68602418E12, 2.466666666666667], [1.6860243E12, 3.316666666666667], [1.6860246E12, 2.8], [1.68602424E12, 2.55], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.283333333333333], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.3333333333333335], [1.68602442E12, 2.933333333333333], [1.68602472E12, 1.6666666666666667]], "isOverall": false, "label": "login-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.2666666666666666], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.3333333333333335], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 1.95], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.183333333333333], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.7333333333333334], [1.68602442E12, 3.05], [1.68602472E12, 0.9666666666666667]], "isOverall": false, "label": "announcements-list-0-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 3.183333333333333], [1.6860246E12, 3.316666666666667], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 1.85], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 2.9833333333333334], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.6666666666666667], [1.68602442E12, 3.3], [1.68602472E12, 0.8666666666666667]], "isOverall": false, "label": "announcements-update-success", "isController": false}, {"data": [[1.68602454E12, 3.183333333333333], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 2.8], [1.68602448E12, 3.316666666666667], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.7333333333333334], [1.68602412E12, 3.3333333333333335], [1.6860246E12, 2.3833333333333333], [1.68602442E12, 3.3333333333333335], [1.68602424E12, 2.2666666666666666], [1.68602472E12, 1.65]], "isOverall": false, "label": "binnacle-delete-success", "isController": false}, {"data": [[1.68602454E12, 3.25], [1.68602436E12, 3.316666666666667], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 2.7666666666666666], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.6333333333333333], [1.68602412E12, 3.3333333333333335], [1.6860246E12, 2.3833333333333333], [1.68602442E12, 3.3333333333333335], [1.68602424E12, 2.3833333333333333], [1.68602472E12, 1.6]], "isOverall": false, "label": "donations-list-2-success", "isController": false}, {"data": [[1.68602406E12, 0.016666666666666666]], "isOverall": false, "label": "Home-1-failure", "isController": false}, {"data": [[1.68602454E12, 2.9833333333333334], [1.68602448E12, 2.966666666666667], [1.68602418E12, 2.4], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 2.85], [1.68602424E12, 2.6], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.283333333333333], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.3333333333333335], [1.68602442E12, 2.9166666666666665], [1.68602472E12, 1.6666666666666667]], "isOverall": false, "label": "register_user-success", "isController": false}, {"data": [[1.68602454E12, 2.9833333333333334], [1.68602448E12, 3.0166666666666666], [1.68602418E12, 3.033333333333333], [1.6860243E12, 3.3], [1.6860246E12, 2.4833333333333334], [1.68602424E12, 2.0], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.316666666666667], [1.68602466E12, 3.2333333333333334], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.3333333333333335], [1.68602442E12, 3.283333333333333], [1.68602472E12, 1.6666666666666667]], "isOverall": false, "label": "Home-1-success", "isController": false}, {"data": [[1.68602454E12, 3.2], [1.68602448E12, 2.9833333333333334], [1.68602418E12, 1.8833333333333333], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.033333333333333], [1.68602424E12, 3.1166666666666667], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.3333333333333335], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.3333333333333335], [1.68602442E12, 2.45], [1.68602472E12, 1.6666666666666667]], "isOverall": false, "label": "users-list-2-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.1666666666666665], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.3333333333333335], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 2.1166666666666667], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.283333333333333], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.8333333333333333], [1.68602442E12, 2.8833333333333333], [1.68602472E12, 1.3166666666666667]], "isOverall": false, "label": "announcements-categories-1-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.183333333333333], [1.6860246E12, 3.15], [1.68602424E12, 3.3], [1.68602436E12, 2.85], [1.68602406E12, 2.783333333333333], [1.68602466E12, 2.25], [1.686024E12, 1.1333333333333333], [1.68602412E12, 2.75], [1.68602442E12, 3.3333333333333335], [1.68602472E12, 1.3333333333333333]], "isOverall": false, "label": "edit_company-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.95], [1.6860246E12, 3.316666666666667], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 2.066666666666667], [1.68602406E12, 3.25], [1.68602466E12, 2.7], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.75], [1.68602442E12, 3.316666666666667], [1.68602472E12, 1.0333333333333334]], "isOverall": false, "label": "announcementProjects-list-1-success", "isController": false}, {"data": [[1.68602454E12, 2.9833333333333334], [1.68602448E12, 2.966666666666667], [1.68602418E12, 2.3833333333333333], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 2.9], [1.68602424E12, 2.6166666666666667], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.3], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.3333333333333335], [1.68602442E12, 2.85], [1.68602472E12, 1.6666666666666667]], "isOverall": false, "label": "users-list-0-success", "isController": false}, {"data": [[1.68602454E12, 3.1166666666666667], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 2.9833333333333334], [1.68602448E12, 3.2666666666666666], [1.68602418E12, 3.316666666666667], [1.6860243E12, 3.0166666666666666], [1.68602412E12, 3.3333333333333335], [1.6860246E12, 2.3], [1.68602442E12, 3.3333333333333335], [1.68602424E12, 2.0], [1.68602472E12, 1.6666666666666667]], "isOverall": false, "label": "report-generate-1-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 3.216666666666667], [1.6860246E12, 3.3333333333333335], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 1.8166666666666667], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.033333333333333], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.6666666666666667], [1.68602442E12, 3.3], [1.68602472E12, 0.8166666666666667]], "isOverall": false, "label": "announcements-create-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.816666666666667], [1.6860246E12, 3.3], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 2.2], [1.68602406E12, 3.05], [1.68602466E12, 2.6], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.95], [1.68602442E12, 3.316666666666667], [1.68602472E12, 1.15]], "isOverall": false, "label": "announcementProjects-list-success", "isController": false}, {"data": [[1.68602454E12, 3.1666666666666665], [1.68602448E12, 3.1166666666666667], [1.68602418E12, 1.8666666666666667], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.216666666666667], [1.68602424E12, 3.15], [1.68602436E12, 3.316666666666667], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.3333333333333335], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.316666666666667], [1.68602442E12, 2.183333333333333], [1.68602472E12, 1.65]], "isOverall": false, "label": "resources-list-0-success", "isController": false}, {"data": [[1.68602454E12, 3.3], [1.68602448E12, 3.283333333333333], [1.68602418E12, 2.75], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.3333333333333335], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 2.85], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.316666666666667], [1.686024E12, 1.6666666666666667], [1.68602412E12, 2.25], [1.68602442E12, 2.2333333333333334], [1.68602472E12, 1.5833333333333333]], "isOverall": false, "label": "categories-list-1-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.5], [1.6860246E12, 3.3], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 2.5], [1.68602406E12, 2.8666666666666667], [1.68602466E12, 2.433333333333333], [1.686024E12, 1.6666666666666667], [1.68602412E12, 2.1333333333333333], [1.68602442E12, 3.3333333333333335], [1.68602472E12, 1.0833333333333333]], "isOverall": false, "label": "company_detail-0-success", "isController": false}, {"data": [[1.68602454E12, 3.183333333333333], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 2.8], [1.68602448E12, 3.316666666666667], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.716666666666667], [1.68602412E12, 3.3333333333333335], [1.6860246E12, 2.3833333333333333], [1.68602442E12, 3.3333333333333335], [1.68602424E12, 2.283333333333333], [1.68602472E12, 1.65]], "isOverall": false, "label": "binnacle-update-success", "isController": false}, {"data": [[1.68602454E12, 2.966666666666667], [1.68602448E12, 3.0166666666666666], [1.68602418E12, 2.466666666666667], [1.6860243E12, 3.316666666666667], [1.6860246E12, 2.8], [1.68602424E12, 2.55], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.283333333333333], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.3333333333333335], [1.68602442E12, 2.933333333333333], [1.68602472E12, 1.6666666666666667]], "isOverall": false, "label": "login-1-success", "isController": false}, {"data": [[1.68602454E12, 3.316666666666667], [1.68602448E12, 3.316666666666667], [1.68602418E12, 2.933333333333333], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.3333333333333335], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 2.55], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.316666666666667], [1.686024E12, 1.6666666666666667], [1.68602412E12, 2.066666666666667], [1.68602442E12, 2.4833333333333334], [1.68602472E12, 1.5833333333333333]], "isOverall": false, "label": "categories-list-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.216666666666667], [1.6860246E12, 3.1666666666666665], [1.68602424E12, 3.3], [1.68602436E12, 2.816666666666667], [1.68602406E12, 2.5833333333333335], [1.68602466E12, 2.25], [1.686024E12, 1.3333333333333333], [1.68602412E12, 2.75], [1.68602442E12, 3.3333333333333335], [1.68602472E12, 1.4]], "isOverall": false, "label": "company_detail-success", "isController": false}, {"data": [[1.68602454E12, 3.316666666666667], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.15], [1.6860246E12, 2.783333333333333], [1.68602424E12, 2.966666666666667], [1.68602436E12, 3.216666666666667], [1.68602406E12, 3.283333333333333], [1.68602466E12, 2.3666666666666667], [1.686024E12, 0.1], [1.68602412E12, 3.283333333333333], [1.68602442E12, 3.3333333333333335], [1.68602472E12, 1.5833333333333333]], "isOverall": false, "label": "user_detail-success", "isController": false}, {"data": [[1.68602454E12, 3.283333333333333], [1.68602448E12, 3.1333333333333333], [1.68602418E12, 2.05], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.2666666666666666], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 3.1666666666666665], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.3333333333333335], [1.686024E12, 1.6666666666666667], [1.68602412E12, 2.95], [1.68602442E12, 2.15], [1.68602472E12, 1.65]], "isOverall": false, "label": "resources-list-2-success", "isController": false}, {"data": [[1.68602454E12, 3.2666666666666666], [1.68602448E12, 3.2333333333333334], [1.68602418E12, 2.183333333333333], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.316666666666667], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 3.0166666666666666], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.3333333333333335], [1.686024E12, 1.6666666666666667], [1.68602412E12, 2.816666666666667], [1.68602442E12, 2.1666666666666665], [1.68602472E12, 1.6]], "isOverall": false, "label": "resources-update-success", "isController": false}, {"data": [[1.68602454E12, 3.316666666666667], [1.68602448E12, 3.316666666666667], [1.68602418E12, 3.0166666666666666], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.3333333333333335], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 2.433333333333333], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.316666666666667], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.9833333333333334], [1.68602442E12, 2.6], [1.68602472E12, 1.4333333333333333]], "isOverall": false, "label": "categories-create-success", "isController": false}, {"data": [[1.68602454E12, 3.316666666666667], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.0], [1.6860246E12, 2.9833333333333334], [1.68602424E12, 3.1333333333333333], [1.68602436E12, 3.2], [1.68602406E12, 3.1666666666666665], [1.68602466E12, 2.283333333333333], [1.686024E12, 0.31666666666666665], [1.68602412E12, 3.183333333333333], [1.68602442E12, 3.3333333333333335], [1.68602472E12, 1.4666666666666666]], "isOverall": false, "label": "user_detail-1-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.216666666666667], [1.6860246E12, 3.1666666666666665], [1.68602424E12, 3.3], [1.68602436E12, 2.816666666666667], [1.68602406E12, 2.5833333333333335], [1.68602466E12, 2.25], [1.686024E12, 1.3333333333333333], [1.68602412E12, 2.75], [1.68602442E12, 3.3333333333333335], [1.68602472E12, 1.4]], "isOverall": false, "label": "company_detail-2-success", "isController": false}, {"data": [[1.68602454E12, 3.3], [1.68602436E12, 3.3], [1.68602406E12, 3.3833333333333333], [1.68602466E12, 2.4], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.183333333333333], [1.68602412E12, 3.283333333333333], [1.6860246E12, 2.75], [1.68602442E12, 3.3333333333333335], [1.68602424E12, 2.85], [1.68602472E12, 1.55]], "isOverall": false, "label": "donations-list-0-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.8], [1.6860246E12, 3.3], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 2.216666666666667], [1.68602406E12, 3.033333333333333], [1.68602466E12, 2.533333333333333], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.9666666666666666], [1.68602442E12, 3.316666666666667], [1.68602472E12, 1.0333333333333334]], "isOverall": false, "label": "announcementProjects-apply-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 3.2333333333333334], [1.6860246E12, 3.3333333333333335], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 1.8], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.05], [1.686024E12, 1.6666666666666667], [1.68602412E12, 1.6666666666666667], [1.68602442E12, 3.3], [1.68602472E12, 1.1]], "isOverall": false, "label": "announcements-list-2-success", "isController": false}, {"data": [[1.68602454E12, 3.15], [1.68602448E12, 3.0], [1.68602418E12, 1.8666666666666667], [1.6860243E12, 3.3333333333333335], [1.6860246E12, 3.1333333333333333], [1.68602424E12, 3.1333333333333333], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.3333333333333335], [1.686024E12, 1.6666666666666667], [1.68602412E12, 3.3333333333333335], [1.68602442E12, 2.3833333333333333], [1.68602472E12, 1.65]], "isOverall": false, "label": "users-update-success", "isController": false}, {"data": [[1.68602454E12, 3.3333333333333335], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.5833333333333335], [1.6860246E12, 3.3], [1.68602424E12, 3.3333333333333335], [1.68602436E12, 2.4166666666666665], [1.68602406E12, 2.966666666666667], [1.68602466E12, 2.4833333333333334], [1.686024E12, 1.6666666666666667], [1.68602412E12, 2.033333333333333], [1.68602442E12, 3.3333333333333335], [1.68602472E12, 1.0333333333333334]], "isOverall": false, "label": "register_company-success", "isController": false}, {"data": [[1.68602454E12, 3.3], [1.68602448E12, 3.3333333333333335], [1.68602418E12, 3.3333333333333335], [1.6860243E12, 2.1333333333333333], [1.6860246E12, 2.783333333333333], [1.68602424E12, 2.933333333333333], [1.68602436E12, 3.2666666666666666], [1.68602406E12, 3.3666666666666667], [1.68602466E12, 2.3833333333333333], [1.686024E12, 0.016666666666666666], [1.68602412E12, 3.283333333333333], [1.68602442E12, 3.3333333333333335], [1.68602472E12, 1.5333333333333334]], "isOverall": false, "label": "user-update-success", "isController": false}, {"data": [[1.68602454E12, 3.0833333333333335], [1.68602436E12, 3.3333333333333335], [1.68602406E12, 3.3333333333333335], [1.68602466E12, 3.1166666666666667], [1.68602448E12, 3.15], [1.68602418E12, 3.183333333333333], [1.6860243E12, 3.216666666666667], [1.68602412E12, 3.3333333333333335], [1.6860246E12, 2.316666666666667], [1.68602442E12, 3.3333333333333335], [1.68602424E12, 1.9333333333333333], [1.68602472E12, 1.6666666666666667]], "isOverall": false, "label": "report-generate-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68602472E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.686024E12, "maxY": 227.73333333333332, "series": [{"data": [[1.68602454E12, 226.53333333333333], [1.68602448E12, 225.98333333333332], [1.68602418E12, 204.31666666666666], [1.6860243E12, 209.7], [1.6860246E12, 211.08333333333334], [1.68602424E12, 208.56666666666666], [1.68602436E12, 200.13333333333333], [1.68602406E12, 227.73333333333332], [1.68602466E12, 208.65], [1.686024E12, 87.68333333333334], [1.68602412E12, 190.9], [1.68602442E12, 207.98333333333332], [1.68602472E12, 101.6]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.68602406E12, 0.03333333333333333], [1.68602418E12, 0.016666666666666666]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68602472E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
