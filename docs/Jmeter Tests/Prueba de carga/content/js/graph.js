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
        data: {"result": {"minY": 1.0, "minX": 100.0, "maxY": 88.0, "series": [{"data": [[300.0, 12.0], [200.0, 35.0], [100.0, 52.0], [400.0, 1.0]], "isOverall": false, "label": "users-create", "isController": false}, {"data": [[2300.0, 22.0], [2200.0, 2.0], [2400.0, 8.0], [2500.0, 17.0], [2600.0, 31.0], [2700.0, 12.0], [2800.0, 4.0], [2900.0, 4.0]], "isOverall": false, "label": "donations-list", "isController": false}, {"data": [[2100.0, 10.0], [2300.0, 3.0], [2200.0, 6.0], [2400.0, 2.0], [1400.0, 1.0], [1500.0, 8.0], [1600.0, 17.0], [1700.0, 16.0], [1800.0, 9.0], [1900.0, 12.0], [2000.0, 16.0]], "isOverall": false, "label": "resources-list", "isController": false}, {"data": [[200.0, 44.0], [100.0, 56.0]], "isOverall": false, "label": "edit_company", "isController": false}, {"data": [[1100.0, 24.0], [600.0, 1.0], [700.0, 2.0], [800.0, 5.0], [400.0, 2.0], [200.0, 2.0], [900.0, 18.0], [1000.0, 46.0]], "isOverall": false, "label": "report-generate-1", "isController": false}, {"data": [[1100.0, 13.0], [600.0, 3.0], [300.0, 1.0], [700.0, 9.0], [800.0, 2.0], [400.0, 5.0], [200.0, 7.0], [900.0, 21.0], [1000.0, 39.0]], "isOverall": false, "label": "report-generate-2", "isController": false}, {"data": [[100.0, 19.0], [200.0, 81.0]], "isOverall": false, "label": "report-generate-0", "isController": false}, {"data": [[300.0, 5.0], [200.0, 38.0], [100.0, 57.0]], "isOverall": false, "label": "logout", "isController": false}, {"data": [[200.0, 83.0], [100.0, 17.0]], "isOverall": false, "label": "categories-list-0", "isController": false}, {"data": [[1100.0, 14.0], [1200.0, 4.0], [1300.0, 5.0], [800.0, 5.0], [900.0, 27.0], [1000.0, 45.0]], "isOverall": false, "label": "categories-list-1", "isController": false}, {"data": [[1100.0, 20.0], [1200.0, 27.0], [1300.0, 13.0], [1400.0, 2.0], [900.0, 5.0], [1000.0, 33.0]], "isOverall": false, "label": "categories-list-2", "isController": false}, {"data": [[2300.0, 4.0], [2400.0, 13.0], [2500.0, 17.0], [2600.0, 30.0], [2700.0, 14.0], [2800.0, 3.0], [2900.0, 12.0], [3000.0, 4.0], [3100.0, 1.0], [3500.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "announcements-categories", "isController": false}, {"data": [[100.0, 49.0], [200.0, 51.0]], "isOverall": false, "label": "delete_company", "isController": false}, {"data": [[2100.0, 3.0], [2300.0, 9.0], [2200.0, 6.0], [2400.0, 10.0], [2500.0, 21.0], [2600.0, 21.0], [2800.0, 9.0], [2700.0, 11.0], [2900.0, 2.0], [1200.0, 1.0], [1600.0, 2.0], [1800.0, 1.0], [1900.0, 3.0], [2000.0, 1.0]], "isOverall": false, "label": "company_detail", "isController": false}, {"data": [[200.0, 39.0], [100.0, 61.0]], "isOverall": false, "label": "donation-create", "isController": false}, {"data": [[1100.0, 3.0], [1200.0, 1.0], [600.0, 20.0], [1300.0, 2.0], [700.0, 17.0], [800.0, 23.0], [900.0, 14.0], [500.0, 12.0], [1000.0, 8.0]], "isOverall": false, "label": "resources-list-1", "isController": false}, {"data": [[1100.0, 2.0], [600.0, 14.0], [700.0, 11.0], [800.0, 24.0], [900.0, 20.0], [500.0, 6.0], [1000.0, 23.0]], "isOverall": false, "label": "resources-list-2", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [200.0, 77.0], [100.0, 19.0]], "isOverall": false, "label": "resources-list-0", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1300.0, 5.0], [1400.0, 16.0], [1500.0, 29.0], [1600.0, 30.0], [1700.0, 11.0], [1800.0, 3.0], [1900.0, 3.0], [2000.0, 1.0]], "isOverall": false, "label": "login-1", "isController": false}, {"data": [[300.0, 2.0], [100.0, 20.0], [200.0, 78.0]], "isOverall": false, "label": "login-0", "isController": false}, {"data": [[100.0, 61.0], [200.0, 39.0]], "isOverall": false, "label": "categories-update", "isController": false}, {"data": [[300.0, 2.0], [200.0, 53.0], [100.0, 45.0]], "isOverall": false, "label": "announcements-delete", "isController": false}, {"data": [[300.0, 5.0], [200.0, 74.0], [100.0, 21.0]], "isOverall": false, "label": "announcementProjects-list-0", "isController": false}, {"data": [[1100.0, 12.0], [1200.0, 10.0], [600.0, 16.0], [1300.0, 3.0], [700.0, 17.0], [800.0, 13.0], [400.0, 2.0], [900.0, 7.0], [1000.0, 8.0], [500.0, 12.0]], "isOverall": false, "label": "announcementProjects-list-1", "isController": false}, {"data": [[1100.0, 9.0], [600.0, 17.0], [1200.0, 7.0], [1300.0, 2.0], [700.0, 10.0], [800.0, 23.0], [400.0, 2.0], [900.0, 13.0], [1000.0, 6.0], [500.0, 11.0]], "isOverall": false, "label": "announcementProjects-list-2", "isController": false}, {"data": [[100.0, 48.0], [200.0, 52.0]], "isOverall": false, "label": "resources-delete", "isController": false}, {"data": [[1100.0, 13.0], [1200.0, 33.0], [1300.0, 22.0], [1400.0, 17.0], [700.0, 1.0], [800.0, 4.0], [900.0, 1.0], [1000.0, 9.0]], "isOverall": false, "label": "announcements-list-2", "isController": false}, {"data": [[200.0, 78.0], [100.0, 22.0]], "isOverall": false, "label": "announcements-list-0", "isController": false}, {"data": [[1100.0, 21.0], [2300.0, 1.0], [1200.0, 21.0], [1300.0, 27.0], [1400.0, 16.0], [1500.0, 1.0], [1700.0, 1.0], [900.0, 2.0], [1000.0, 10.0]], "isOverall": false, "label": "announcements-categories-2", "isController": false}, {"data": [[1100.0, 17.0], [1200.0, 23.0], [1300.0, 34.0], [1400.0, 16.0], [1500.0, 4.0], [1600.0, 4.0], [1000.0, 2.0]], "isOverall": false, "label": "announcements-list-1", "isController": false}, {"data": [[1100.0, 32.0], [2300.0, 1.0], [1200.0, 33.0], [1300.0, 14.0], [1400.0, 4.0], [900.0, 1.0], [1000.0, 15.0]], "isOverall": false, "label": "announcements-categories-1", "isController": false}, {"data": [[200.0, 80.0], [100.0, 20.0]], "isOverall": false, "label": "announcements-categories-0", "isController": false}, {"data": [[100.0, 58.0], [200.0, 42.0]], "isOverall": false, "label": "binnacle-update", "isController": false}, {"data": [[100.0, 51.0], [200.0, 49.0]], "isOverall": false, "label": "announcementProjects-apply", "isController": false}, {"data": [[2100.0, 3.0], [600.0, 2.0], [700.0, 1.0], [800.0, 2.0], [900.0, 1.0], [1000.0, 5.0], [1100.0, 3.0], [1200.0, 4.0], [1300.0, 3.0], [1400.0, 7.0], [1500.0, 22.0], [400.0, 1.0], [1600.0, 17.0], [1700.0, 13.0], [1800.0, 4.0], [1900.0, 2.0], [500.0, 3.0], [2000.0, 7.0]], "isOverall": false, "label": "Home-2", "isController": false}, {"data": [[2100.0, 6.0], [2300.0, 9.0], [2200.0, 7.0], [2400.0, 7.0], [2500.0, 2.0], [2600.0, 3.0], [2800.0, 1.0], [1200.0, 2.0], [1300.0, 2.0], [1400.0, 5.0], [1500.0, 11.0], [1600.0, 7.0], [1700.0, 10.0], [1800.0, 12.0], [1900.0, 8.0], [2000.0, 8.0]], "isOverall": false, "label": "announcementProjects-list", "isController": false}, {"data": [[300.0, 1.0], [200.0, 42.0], [100.0, 57.0]], "isOverall": false, "label": "user-update", "isController": false}, {"data": [[2100.0, 4.0], [2200.0, 2.0], [1300.0, 1.0], [1500.0, 5.0], [1600.0, 10.0], [1700.0, 31.0], [1800.0, 30.0], [1900.0, 12.0], [2000.0, 5.0]], "isOverall": false, "label": "login", "isController": false}, {"data": [[300.0, 1.0], [200.0, 38.0], [100.0, 61.0]], "isOverall": false, "label": "binnacle-delete", "isController": false}, {"data": [[300.0, 24.0], [400.0, 25.0], [200.0, 51.0]], "isOverall": false, "label": "Home-0", "isController": false}, {"data": [[2100.0, 1.0], [600.0, 16.0], [700.0, 6.0], [800.0, 9.0], [900.0, 8.0], [1000.0, 6.0], [1100.0, 10.0], [1200.0, 15.0], [1300.0, 9.0], [1400.0, 6.0], [1500.0, 1.0], [1600.0, 4.0], [1700.0, 7.0], [1900.0, 2.0]], "isOverall": false, "label": "Home-1", "isController": false}, {"data": [[300.0, 7.0], [100.0, 50.0], [200.0, 42.0], [400.0, 1.0]], "isOverall": false, "label": "register_user", "isController": false}, {"data": [[300.0, 1.0], [200.0, 29.0], [100.0, 70.0]], "isOverall": false, "label": "resources-create", "isController": false}, {"data": [[2300.0, 2.0], [2200.0, 3.0], [2400.0, 5.0], [2500.0, 9.0], [2600.0, 8.0], [2800.0, 25.0], [2700.0, 20.0], [2900.0, 12.0], [3000.0, 9.0], [3100.0, 4.0], [3200.0, 2.0], [1900.0, 1.0]], "isOverall": false, "label": "announcements-list", "isController": false}, {"data": [[300.0, 10.0], [700.0, 1.0], [200.0, 46.0], [100.0, 43.0]], "isOverall": false, "label": "users-update", "isController": false}, {"data": [[100.0, 65.0], [200.0, 35.0]], "isOverall": false, "label": "categories-create", "isController": false}, {"data": [[2300.0, 2.0], [2400.0, 3.0], [2500.0, 6.0], [2600.0, 4.0], [2800.0, 38.0], [2700.0, 14.0], [2900.0, 22.0], [3000.0, 5.0], [3100.0, 2.0], [3200.0, 2.0], [3400.0, 2.0]], "isOverall": false, "label": "users-list", "isController": false}, {"data": [[1400.0, 1.0], [1500.0, 3.0], [1600.0, 1.0], [1700.0, 2.0], [1900.0, 3.0], [2000.0, 1.0], [2200.0, 3.0], [2300.0, 4.0], [2400.0, 7.0], [2500.0, 3.0], [2600.0, 3.0], [2800.0, 5.0], [2700.0, 4.0], [2900.0, 7.0], [3000.0, 9.0], [3100.0, 6.0], [3200.0, 7.0], [3300.0, 3.0], [3400.0, 3.0], [3500.0, 7.0], [3600.0, 7.0], [3700.0, 3.0], [3800.0, 3.0], [3900.0, 2.0], [4000.0, 2.0], [4100.0, 1.0]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[1100.0, 16.0], [1200.0, 26.0], [1300.0, 38.0], [1400.0, 6.0], [1500.0, 2.0], [1600.0, 1.0], [800.0, 2.0], [900.0, 4.0], [1000.0, 5.0]], "isOverall": false, "label": "users-list-2", "isController": false}, {"data": [[200.0, 88.0], [100.0, 12.0]], "isOverall": false, "label": "user_detail-0", "isController": false}, {"data": [[200.0, 35.0], [100.0, 65.0]], "isOverall": false, "label": "categories-delete", "isController": false}, {"data": [[1100.0, 16.0], [1200.0, 41.0], [1300.0, 17.0], [900.0, 5.0], [1000.0, 21.0]], "isOverall": false, "label": "user_detail-1", "isController": false}, {"data": [[1100.0, 17.0], [1200.0, 44.0], [1300.0, 27.0], [900.0, 3.0], [1000.0, 9.0]], "isOverall": false, "label": "user_detail-2", "isController": false}, {"data": [[100.0, 42.0], [200.0, 58.0]], "isOverall": false, "label": "announcements-create", "isController": false}, {"data": [[2300.0, 2.0], [2200.0, 3.0], [2400.0, 9.0], [2500.0, 22.0], [2600.0, 31.0], [2700.0, 24.0], [2800.0, 9.0]], "isOverall": false, "label": "user_detail", "isController": false}, {"data": [[2100.0, 10.0], [2200.0, 15.0], [2300.0, 20.0], [2400.0, 16.0], [2500.0, 15.0], [2600.0, 12.0], [2700.0, 8.0], [2800.0, 2.0], [2000.0, 2.0]], "isOverall": false, "label": "categories-list", "isController": false}, {"data": [[300.0, 1.0], [200.0, 83.0], [100.0, 16.0]], "isOverall": false, "label": "donations-list-0", "isController": false}, {"data": [[1100.0, 27.0], [1200.0, 43.0], [1300.0, 13.0], [1400.0, 2.0], [900.0, 1.0], [1000.0, 14.0]], "isOverall": false, "label": "donations-list-1", "isController": false}, {"data": [[1100.0, 33.0], [1200.0, 23.0], [1300.0, 7.0], [1400.0, 2.0], [900.0, 3.0], [1000.0, 32.0]], "isOverall": false, "label": "donations-list-2", "isController": false}, {"data": [[300.0, 7.0], [200.0, 67.0], [100.0, 26.0]], "isOverall": false, "label": "users-list-0", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 27.0], [1300.0, 39.0], [1400.0, 12.0], [1500.0, 14.0], [1600.0, 3.0], [1000.0, 3.0]], "isOverall": false, "label": "users-list-1", "isController": false}, {"data": [[2100.0, 22.0], [2300.0, 29.0], [2200.0, 14.0], [1100.0, 3.0], [2400.0, 8.0], [600.0, 2.0], [2500.0, 1.0], [1400.0, 1.0], [1500.0, 5.0], [800.0, 2.0], [1900.0, 5.0], [2000.0, 8.0]], "isOverall": false, "label": "report-generate", "isController": false}, {"data": [[200.0, 51.0], [100.0, 49.0]], "isOverall": false, "label": "resources-update", "isController": false}, {"data": [[300.0, 1.0], [200.0, 87.0], [100.0, 12.0]], "isOverall": false, "label": "company_detail-0", "isController": false}, {"data": [[1100.0, 22.0], [600.0, 6.0], [1200.0, 27.0], [1300.0, 12.0], [700.0, 2.0], [1400.0, 2.0], [400.0, 1.0], [800.0, 7.0], [900.0, 7.0], [1000.0, 14.0]], "isOverall": false, "label": "company_detail-1", "isController": false}, {"data": [[300.0, 3.0], [100.0, 56.0], [200.0, 41.0]], "isOverall": false, "label": "users-delete", "isController": false}, {"data": [[200.0, 54.0], [100.0, 46.0]], "isOverall": false, "label": "register_company", "isController": false}, {"data": [[1100.0, 25.0], [600.0, 1.0], [1200.0, 38.0], [1300.0, 17.0], [700.0, 1.0], [1400.0, 1.0], [800.0, 2.0], [900.0, 3.0], [1000.0, 12.0]], "isOverall": false, "label": "company_detail-2", "isController": false}, {"data": [[100.0, 58.0], [200.0, 42.0]], "isOverall": false, "label": "binnacle-create", "isController": false}, {"data": [[100.0, 47.0], [200.0, 53.0]], "isOverall": false, "label": "announcements-update", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 4100.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 1371.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1.500ms"], [2, "Requests having \nresponse time > 1.500ms"], [3, "Requests in error"]], "maxY": 3521.0, "series": [{"data": [[0.0, 3521.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 2108.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1.500ms", "isController": false}, {"data": [[2.0, 1371.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1.500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 86.42066869300916, "minX": 1.6860225E12, "maxY": 100.0, "series": [{"data": [[1.68602256E12, 86.42066869300916], [1.6860225E12, 100.0]], "isOverall": false, "label": "Prueba de carga", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68602256E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 187.66666666666666, "minX": 1.0, "maxY": 2972.9500000000003, "series": [{"data": [[100.0, 221.9399999999999]], "isOverall": false, "label": "users-create", "isController": false}, {"data": [[100.0, 221.9399999999999]], "isOverall": false, "label": "users-create-Aggregated", "isController": false}, {"data": [[74.0, 2425.5], [91.0, 2321.0], [90.0, 2355.0], [88.0, 2372.3333333333335], [92.0, 2323.0], [99.0, 2359.0], [98.0, 2382.75], [96.0, 2299.0], [100.0, 2637.1000000000004], [53.0, 2325.0], [55.0, 2374.0]], "isOverall": false, "label": "donations-list", "isController": false}, {"data": [[97.70000000000002, 2581.390000000001]], "isOverall": false, "label": "donations-list-Aggregated", "isController": false}, {"data": [[100.0, 1902.3600000000006]], "isOverall": false, "label": "resources-list", "isController": false}, {"data": [[100.0, 1902.3600000000006]], "isOverall": false, "label": "resources-list-Aggregated", "isController": false}, {"data": [[100.0, 201.89999999999998]], "isOverall": false, "label": "edit_company", "isController": false}, {"data": [[100.0, 201.89999999999998]], "isOverall": false, "label": "edit_company-Aggregated", "isController": false}, {"data": [[2.0, 224.0], [3.0, 411.0], [4.0, 422.0], [7.0, 703.3333333333334], [8.0, 984.0], [9.0, 896.0], [11.0, 918.0], [12.0, 873.0], [13.0, 884.0], [15.0, 1035.0], [16.0, 1072.0], [18.0, 1151.0], [33.0, 1127.0], [32.0, 1078.8571428571427], [35.0, 1060.0], [34.0, 1062.0], [37.0, 1043.0], [36.0, 1034.0], [39.0, 973.0], [38.0, 1046.0], [41.0, 1017.0], [40.0, 1196.0], [43.0, 1101.5], [44.0, 1012.0], [49.0, 1001.8], [51.0, 895.0], [50.0, 901.0], [53.0, 1128.0], [52.0, 1166.0], [55.0, 1143.0], [54.0, 1158.0], [56.0, 1029.0], [63.0, 1065.0], [62.0, 990.8333333333334], [64.0, 976.0], [75.0, 1074.0], [74.0, 1054.3000000000002], [79.0, 990.0], [78.0, 1062.0], [77.0, 1068.0], [76.0, 1078.0], [83.0, 1069.0], [82.0, 1098.0], [81.0, 1100.0], [80.0, 984.0], [84.0, 1082.0], [91.0, 1047.0], [90.0, 1053.0], [88.0, 1066.75], [92.0, 1093.0], [99.0, 1138.0], [98.0, 1137.0], [97.0, 1149.0], [96.0, 1132.5], [100.0, 1174.0], [1.0, 232.0]], "isOverall": false, "label": "report-generate-1", "isController": false}, {"data": [[52.310000000000024, 1013.97]], "isOverall": false, "label": "report-generate-1-Aggregated", "isController": false}, {"data": [[2.0, 220.0], [3.0, 237.0], [4.0, 215.0], [7.0, 216.66666666666666], [8.0, 400.0], [9.0, 476.0], [11.0, 442.5], [12.0, 488.0], [13.0, 403.0], [15.0, 710.5], [16.0, 713.0], [18.0, 706.0], [33.0, 905.0], [32.0, 826.5], [35.0, 914.0], [34.0, 984.0], [37.0, 916.0], [36.0, 913.0], [39.0, 986.0], [38.0, 905.0], [41.0, 1111.0], [40.0, 985.0], [43.0, 1013.0], [44.0, 1102.0], [49.0, 1091.8], [51.0, 1013.0], [50.0, 1020.0], [53.0, 1098.0], [52.0, 1091.0], [55.0, 1019.0], [54.0, 1018.0], [56.0, 1098.0], [63.0, 1008.0], [62.0, 1035.3333333333333], [64.0, 1026.0], [75.0, 1012.0], [74.0, 1036.5], [79.0, 979.0], [78.0, 997.0], [77.0, 1002.0], [76.0, 1008.0], [83.0, 1108.0], [82.0, 1089.0], [81.0, 1008.0], [80.0, 904.0], [84.0, 1093.0], [91.0, 1094.0], [90.0, 1036.5], [88.0, 1046.75], [92.0, 1007.0], [99.0, 1012.0], [98.0, 1097.0], [97.0, 1198.0], [96.0, 1024.75], [100.0, 1009.0], [1.0, 212.0]], "isOverall": false, "label": "report-generate-2", "isController": false}, {"data": [[52.310000000000024, 894.5299999999997]], "isOverall": false, "label": "report-generate-2-Aggregated", "isController": false}, {"data": [[2.0, 199.0], [3.0, 204.0], [4.0, 200.0], [7.0, 222.33333333333334], [8.0, 203.0], [9.0, 204.0], [11.0, 215.0], [12.0, 212.0], [13.0, 201.0], [15.0, 215.5], [16.0, 224.0], [18.0, 205.0], [33.0, 231.0], [32.0, 203.21428571428572], [35.0, 203.0], [34.0, 219.0], [37.0, 211.0], [36.0, 224.0], [39.0, 197.0], [38.0, 213.0], [41.0, 219.0], [40.0, 211.0], [43.0, 218.0], [44.0, 203.0], [49.0, 216.8], [51.0, 217.0], [50.0, 226.0], [53.0, 233.0], [52.0, 201.0], [55.0, 214.0], [54.0, 212.0], [56.0, 240.0], [63.0, 199.0], [62.0, 203.33333333333334], [64.0, 208.0], [75.0, 204.0], [74.0, 209.9], [79.0, 195.0], [78.0, 206.0], [77.0, 205.0], [76.0, 196.0], [83.0, 204.0], [82.0, 201.0], [81.0, 227.0], [80.0, 196.0], [84.0, 214.0], [91.0, 201.0], [90.0, 207.0], [88.0, 211.5], [92.0, 237.0], [99.0, 236.0], [98.0, 223.0], [97.0, 234.0], [96.0, 203.75], [100.0, 199.0], [1.0, 207.0]], "isOverall": false, "label": "report-generate-0", "isController": false}, {"data": [[52.310000000000024, 210.10000000000002]], "isOverall": false, "label": "report-generate-0-Aggregated", "isController": false}, {"data": [[100.0, 210.57]], "isOverall": false, "label": "logout", "isController": false}, {"data": [[100.0, 210.57]], "isOverall": false, "label": "logout-Aggregated", "isController": false}, {"data": [[100.0, 213.80000000000004]], "isOverall": false, "label": "categories-list-0", "isController": false}, {"data": [[100.0, 213.80000000000004]], "isOverall": false, "label": "categories-list-0-Aggregated", "isController": false}, {"data": [[100.0, 1053.4900000000007]], "isOverall": false, "label": "categories-list-1", "isController": false}, {"data": [[100.0, 1053.4900000000007]], "isOverall": false, "label": "categories-list-1-Aggregated", "isController": false}, {"data": [[100.0, 1162.1499999999999]], "isOverall": false, "label": "categories-list-2", "isController": false}, {"data": [[100.0, 1162.1499999999999]], "isOverall": false, "label": "categories-list-2-Aggregated", "isController": false}, {"data": [[100.0, 2700.4500000000016]], "isOverall": false, "label": "announcements-categories", "isController": false}, {"data": [[100.0, 2700.4500000000016]], "isOverall": false, "label": "announcements-categories-Aggregated", "isController": false}, {"data": [[100.0, 203.36999999999995]], "isOverall": false, "label": "delete_company", "isController": false}, {"data": [[100.0, 203.36999999999995]], "isOverall": false, "label": "delete_company-Aggregated", "isController": false}, {"data": [[100.0, 2526.85]], "isOverall": false, "label": "company_detail", "isController": false}, {"data": [[100.0, 2526.85]], "isOverall": false, "label": "company_detail-Aggregated", "isController": false}, {"data": [[78.0, 187.66666666666666], [88.0, 195.66666666666666], [97.0, 199.0], [96.0, 207.0], [49.0, 199.0], [100.0, 202.22666666666666], [62.0, 193.0]], "isOverall": false, "label": "donation-create", "isController": false}, {"data": [[96.41999999999999, 201.24000000000004]], "isOverall": false, "label": "donation-create-Aggregated", "isController": false}, {"data": [[100.0, 814.9199999999997]], "isOverall": false, "label": "resources-list-1", "isController": false}, {"data": [[100.0, 814.9199999999997]], "isOverall": false, "label": "resources-list-1-Aggregated", "isController": false}, {"data": [[100.0, 868.7799999999997]], "isOverall": false, "label": "resources-list-2", "isController": false}, {"data": [[100.0, 868.7799999999997]], "isOverall": false, "label": "resources-list-2-Aggregated", "isController": false}, {"data": [[100.0, 218.55999999999997]], "isOverall": false, "label": "resources-list-0", "isController": false}, {"data": [[100.0, 218.55999999999997]], "isOverall": false, "label": "resources-list-0-Aggregated", "isController": false}, {"data": [[100.0, 1612.6099999999997]], "isOverall": false, "label": "login-1", "isController": false}, {"data": [[100.0, 1612.6099999999997]], "isOverall": false, "label": "login-1-Aggregated", "isController": false}, {"data": [[100.0, 214.45999999999998]], "isOverall": false, "label": "login-0", "isController": false}, {"data": [[100.0, 214.45999999999998]], "isOverall": false, "label": "login-0-Aggregated", "isController": false}, {"data": [[100.0, 200.44000000000003]], "isOverall": false, "label": "categories-update", "isController": false}, {"data": [[100.0, 200.44000000000003]], "isOverall": false, "label": "categories-update-Aggregated", "isController": false}, {"data": [[100.0, 209.37]], "isOverall": false, "label": "announcements-delete", "isController": false}, {"data": [[100.0, 209.37]], "isOverall": false, "label": "announcements-delete-Aggregated", "isController": false}, {"data": [[100.0, 219.85999999999996]], "isOverall": false, "label": "announcementProjects-list-0", "isController": false}, {"data": [[100.0, 219.85999999999996]], "isOverall": false, "label": "announcementProjects-list-0-Aggregated", "isController": false}, {"data": [[100.0, 878.6800000000003]], "isOverall": false, "label": "announcementProjects-list-1", "isController": false}, {"data": [[100.0, 878.6800000000003]], "isOverall": false, "label": "announcementProjects-list-1-Aggregated", "isController": false}, {"data": [[100.0, 857.2799999999999]], "isOverall": false, "label": "announcementProjects-list-2", "isController": false}, {"data": [[100.0, 857.2799999999999]], "isOverall": false, "label": "announcementProjects-list-2-Aggregated", "isController": false}, {"data": [[100.0, 202.26000000000002]], "isOverall": false, "label": "resources-delete", "isController": false}, {"data": [[100.0, 202.26000000000002]], "isOverall": false, "label": "resources-delete-Aggregated", "isController": false}, {"data": [[100.0, 1242.47]], "isOverall": false, "label": "announcements-list-2", "isController": false}, {"data": [[100.0, 1242.47]], "isOverall": false, "label": "announcements-list-2-Aggregated", "isController": false}, {"data": [[100.0, 211.8599999999999]], "isOverall": false, "label": "announcements-list-0", "isController": false}, {"data": [[100.0, 211.8599999999999]], "isOverall": false, "label": "announcements-list-0-Aggregated", "isController": false}, {"data": [[100.0, 1273.0900000000004]], "isOverall": false, "label": "announcements-categories-2", "isController": false}, {"data": [[100.0, 1273.0900000000004]], "isOverall": false, "label": "announcements-categories-2-Aggregated", "isController": false}, {"data": [[100.0, 1336.5000000000002]], "isOverall": false, "label": "announcements-list-1", "isController": false}, {"data": [[100.0, 1336.5000000000002]], "isOverall": false, "label": "announcements-list-1-Aggregated", "isController": false}, {"data": [[100.0, 1216.3699999999994]], "isOverall": false, "label": "announcements-categories-1", "isController": false}, {"data": [[100.0, 1216.3699999999994]], "isOverall": false, "label": "announcements-categories-1-Aggregated", "isController": false}, {"data": [[100.0, 210.91000000000003]], "isOverall": false, "label": "announcements-categories-0", "isController": false}, {"data": [[100.0, 210.91000000000003]], "isOverall": false, "label": "announcements-categories-0-Aggregated", "isController": false}, {"data": [[34.0, 192.5], [78.0, 194.33333333333334], [88.0, 194.5], [97.0, 199.0], [96.0, 199.66666666666666], [49.0, 203.5], [100.0, 204.55737704918033], [62.0, 202.66666666666666]], "isOverall": false, "label": "binnacle-update", "isController": false}, {"data": [[93.28000000000002, 201.68000000000004]], "isOverall": false, "label": "binnacle-update-Aggregated", "isController": false}, {"data": [[100.0, 203.61999999999998]], "isOverall": false, "label": "announcementProjects-apply", "isController": false}, {"data": [[100.0, 203.61999999999998]], "isOverall": false, "label": "announcementProjects-apply-Aggregated", "isController": false}, {"data": [[100.0, 1509.7400000000002]], "isOverall": false, "label": "Home-2", "isController": false}, {"data": [[100.0, 1509.7400000000002]], "isOverall": false, "label": "Home-2-Aggregated", "isController": false}, {"data": [[100.0, 1955.9499999999998]], "isOverall": false, "label": "announcementProjects-list", "isController": false}, {"data": [[100.0, 1955.9499999999998]], "isOverall": false, "label": "announcementProjects-list-Aggregated", "isController": false}, {"data": [[100.0, 201.51000000000008]], "isOverall": false, "label": "user-update", "isController": false}, {"data": [[100.0, 201.51000000000008]], "isOverall": false, "label": "user-update-Aggregated", "isController": false}, {"data": [[100.0, 1827.1400000000006]], "isOverall": false, "label": "login", "isController": false}, {"data": [[100.0, 1827.1400000000006]], "isOverall": false, "label": "login-Aggregated", "isController": false}, {"data": [[32.0, 195.0], [34.0, 198.5], [74.0, 198.0], [79.0, 386.0], [78.0, 197.0], [88.0, 192.33333333333331], [97.0, 200.42857142857142], [96.0, 195.25], [49.0, 194.0], [100.0, 202.62962962962956]], "isOverall": false, "label": "binnacle-delete", "isController": false}, {"data": [[91.24999999999999, 201.29000000000005]], "isOverall": false, "label": "binnacle-delete-Aggregated", "isController": false}, {"data": [[100.0, 325.4699999999999]], "isOverall": false, "label": "Home-0", "isController": false}, {"data": [[100.0, 325.4699999999999]], "isOverall": false, "label": "Home-0-Aggregated", "isController": false}, {"data": [[100.0, 1136.31]], "isOverall": false, "label": "Home-1", "isController": false}, {"data": [[100.0, 1136.31]], "isOverall": false, "label": "Home-1-Aggregated", "isController": false}, {"data": [[100.0, 214.78]], "isOverall": false, "label": "register_user", "isController": false}, {"data": [[100.0, 214.78]], "isOverall": false, "label": "register_user-Aggregated", "isController": false}, {"data": [[100.0, 200.28]], "isOverall": false, "label": "resources-create", "isController": false}, {"data": [[100.0, 200.28]], "isOverall": false, "label": "resources-create-Aggregated", "isController": false}, {"data": [[100.0, 2790.92]], "isOverall": false, "label": "announcements-list", "isController": false}, {"data": [[100.0, 2790.92]], "isOverall": false, "label": "announcements-list-Aggregated", "isController": false}, {"data": [[100.0, 223.29999999999998]], "isOverall": false, "label": "users-update", "isController": false}, {"data": [[100.0, 223.29999999999998]], "isOverall": false, "label": "users-update-Aggregated", "isController": false}, {"data": [[100.0, 199.3399999999999]], "isOverall": false, "label": "categories-create", "isController": false}, {"data": [[100.0, 199.3399999999999]], "isOverall": false, "label": "categories-create-Aggregated", "isController": false}, {"data": [[100.0, 2840.85]], "isOverall": false, "label": "users-list", "isController": false}, {"data": [[100.0, 2840.85]], "isOverall": false, "label": "users-list-Aggregated", "isController": false}, {"data": [[100.0, 2972.9500000000003]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[100.0, 2972.9500000000003]], "isOverall": false, "label": "Home-Aggregated", "isController": false}, {"data": [[100.0, 1261.2800000000002]], "isOverall": false, "label": "users-list-2", "isController": false}, {"data": [[100.0, 1261.2800000000002]], "isOverall": false, "label": "users-list-2-Aggregated", "isController": false}, {"data": [[100.0, 215.84000000000006]], "isOverall": false, "label": "user_detail-0", "isController": false}, {"data": [[100.0, 215.84000000000006]], "isOverall": false, "label": "user_detail-0-Aggregated", "isController": false}, {"data": [[100.0, 201.43999999999994]], "isOverall": false, "label": "categories-delete", "isController": false}, {"data": [[100.0, 201.43999999999994]], "isOverall": false, "label": "categories-delete-Aggregated", "isController": false}, {"data": [[100.0, 1200.7600000000002]], "isOverall": false, "label": "user_detail-1", "isController": false}, {"data": [[100.0, 1200.7600000000002]], "isOverall": false, "label": "user_detail-1-Aggregated", "isController": false}, {"data": [[100.0, 1237.4500000000003]], "isOverall": false, "label": "user_detail-2", "isController": false}, {"data": [[100.0, 1237.4500000000003]], "isOverall": false, "label": "user_detail-2-Aggregated", "isController": false}, {"data": [[100.0, 206.43000000000004]], "isOverall": false, "label": "announcements-create", "isController": false}, {"data": [[100.0, 206.43000000000004]], "isOverall": false, "label": "announcements-create-Aggregated", "isController": false}, {"data": [[100.0, 2654.019999999998]], "isOverall": false, "label": "user_detail", "isController": false}, {"data": [[100.0, 2654.019999999998]], "isOverall": false, "label": "user_detail-Aggregated", "isController": false}, {"data": [[100.0, 2429.64]], "isOverall": false, "label": "categories-list", "isController": false}, {"data": [[100.0, 2429.64]], "isOverall": false, "label": "categories-list-Aggregated", "isController": false}, {"data": [[74.0, 213.0], [91.0, 203.0], [90.0, 224.0], [88.0, 222.33333333333334], [92.0, 197.0], [99.0, 218.33333333333334], [98.0, 212.5], [96.0, 207.66666666666666], [100.0, 212.5625], [53.0, 225.0], [55.0, 220.0]], "isOverall": false, "label": "donations-list-0", "isController": false}, {"data": [[97.70000000000002, 212.95]], "isOverall": false, "label": "donations-list-0-Aggregated", "isController": false}, {"data": [[74.0, 1117.5], [91.0, 1110.0], [90.0, 1120.0], [88.0, 1092.6666666666667], [92.0, 1031.0], [99.0, 1041.6666666666667], [98.0, 1093.5], [96.0, 1034.3333333333333], [100.0, 1244.2375], [53.0, 1086.0], [55.0, 1045.0]], "isOverall": false, "label": "donations-list-1", "isController": false}, {"data": [[97.70000000000002, 1210.46]], "isOverall": false, "label": "donations-list-1-Aggregated", "isController": false}, {"data": [[74.0, 1095.0], [91.0, 1008.0], [90.0, 1011.0], [88.0, 1057.3333333333333], [92.0, 1095.0], [99.0, 1098.0], [98.0, 1076.75], [96.0, 1057.0], [100.0, 1180.2124999999999], [53.0, 1014.0], [55.0, 1109.0]], "isOverall": false, "label": "donations-list-2", "isController": false}, {"data": [[97.70000000000002, 1157.8799999999999]], "isOverall": false, "label": "donations-list-2-Aggregated", "isController": false}, {"data": [[100.0, 218.42999999999998]], "isOverall": false, "label": "users-list-0", "isController": false}, {"data": [[100.0, 218.42999999999998]], "isOverall": false, "label": "users-list-0-Aggregated", "isController": false}, {"data": [[100.0, 1361.0800000000004]], "isOverall": false, "label": "users-list-1", "isController": false}, {"data": [[100.0, 1361.0800000000004]], "isOverall": false, "label": "users-list-1-Aggregated", "isController": false}, {"data": [[2.0, 643.0], [3.0, 852.0], [4.0, 837.0], [7.0, 1142.6666666666667], [8.0, 1588.0], [9.0, 1576.0], [11.0, 1575.5], [12.0, 1573.0], [13.0, 1488.0], [15.0, 1961.5], [16.0, 2009.0], [18.0, 2062.0], [33.0, 2264.0], [32.0, 2108.6428571428573], [35.0, 2177.0], [34.0, 2265.0], [37.0, 2170.0], [36.0, 2171.0], [39.0, 2156.0], [38.0, 2164.0], [41.0, 2347.0], [40.0, 2392.0], [43.0, 2332.5], [44.0, 2317.0], [49.0, 2310.6], [51.0, 2125.0], [50.0, 2147.0], [53.0, 2459.0], [52.0, 2459.0], [55.0, 2376.0], [54.0, 2388.0], [56.0, 2367.0], [63.0, 2272.0], [62.0, 2229.5], [64.0, 2210.0], [75.0, 2290.0], [74.0, 2300.7999999999997], [79.0, 2164.0], [78.0, 2266.0], [77.0, 2275.0], [76.0, 2282.0], [83.0, 2381.0], [82.0, 2388.0], [81.0, 2335.0], [80.0, 2085.0], [84.0, 2389.0], [91.0, 2342.0], [90.0, 2296.5], [88.0, 2325.0], [92.0, 2337.0], [99.0, 2386.0], [98.0, 2457.0], [97.0, 2581.0], [96.0, 2361.0], [100.0, 2382.0], [1.0, 651.0]], "isOverall": false, "label": "report-generate", "isController": false}, {"data": [[52.310000000000024, 2118.7]], "isOverall": false, "label": "report-generate-Aggregated", "isController": false}, {"data": [[100.0, 201.20000000000002]], "isOverall": false, "label": "resources-update", "isController": false}, {"data": [[100.0, 201.20000000000002]], "isOverall": false, "label": "resources-update-Aggregated", "isController": false}, {"data": [[100.0, 214.57000000000008]], "isOverall": false, "label": "company_detail-0", "isController": false}, {"data": [[100.0, 214.57000000000008]], "isOverall": false, "label": "company_detail-0-Aggregated", "isController": false}, {"data": [[100.0, 1125.4199999999996]], "isOverall": false, "label": "company_detail-1", "isController": false}, {"data": [[100.0, 1125.4199999999996]], "isOverall": false, "label": "company_detail-1-Aggregated", "isController": false}, {"data": [[100.0, 206.89]], "isOverall": false, "label": "users-delete", "isController": false}, {"data": [[100.0, 206.89]], "isOverall": false, "label": "users-delete-Aggregated", "isController": false}, {"data": [[100.0, 204.19999999999993]], "isOverall": false, "label": "register_company", "isController": false}, {"data": [[100.0, 204.19999999999993]], "isOverall": false, "label": "register_company-Aggregated", "isController": false}, {"data": [[100.0, 1186.8199999999997]], "isOverall": false, "label": "company_detail-2", "isController": false}, {"data": [[100.0, 1186.8199999999997]], "isOverall": false, "label": "company_detail-2-Aggregated", "isController": false}, {"data": [[74.0, 204.0], [88.0, 197.875], [97.0, 195.6], [96.0, 197.1818181818182], [49.0, 196.75], [100.0, 202.42028985507244]], "isOverall": false, "label": "binnacle-create", "isController": false}, {"data": [[95.63000000000001, 200.96000000000004]], "isOverall": false, "label": "binnacle-create-Aggregated", "isController": false}, {"data": [[100.0, 204.90000000000006]], "isOverall": false, "label": "announcements-update", "isController": false}, {"data": [[100.0, 204.90000000000006]], "isOverall": false, "label": "announcements-update-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 7094.666666666667, "minX": 1.6860225E12, "maxY": 155958.8, "series": [{"data": [[1.68602256E12, 51747.86666666667], [1.6860225E12, 155958.8]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.68602256E12, 7094.666666666667], [1.6860225E12, 21337.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68602256E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 199.3399999999999, "minX": 1.6860225E12, "maxY": 2972.9500000000003, "series": [{"data": [[1.6860225E12, 221.9399999999999]], "isOverall": false, "label": "users-create", "isController": false}, {"data": [[1.68602256E12, 2581.390000000001]], "isOverall": false, "label": "donations-list", "isController": false}, {"data": [[1.6860225E12, 1902.3600000000006]], "isOverall": false, "label": "resources-list", "isController": false}, {"data": [[1.68602256E12, 205.61111111111114], [1.6860225E12, 201.08536585365854]], "isOverall": false, "label": "edit_company", "isController": false}, {"data": [[1.68602256E12, 1013.97]], "isOverall": false, "label": "report-generate-1", "isController": false}, {"data": [[1.68602256E12, 894.5299999999997]], "isOverall": false, "label": "report-generate-2", "isController": false}, {"data": [[1.68602256E12, 210.10000000000002]], "isOverall": false, "label": "report-generate-0", "isController": false}, {"data": [[1.6860225E12, 210.57]], "isOverall": false, "label": "logout", "isController": false}, {"data": [[1.6860225E12, 213.80000000000004]], "isOverall": false, "label": "categories-list-0", "isController": false}, {"data": [[1.6860225E12, 1053.4900000000007]], "isOverall": false, "label": "categories-list-1", "isController": false}, {"data": [[1.6860225E12, 1162.1499999999999]], "isOverall": false, "label": "categories-list-2", "isController": false}, {"data": [[1.6860225E12, 2700.4500000000016]], "isOverall": false, "label": "announcements-categories", "isController": false}, {"data": [[1.68602256E12, 202.2], [1.6860225E12, 203.75999999999996]], "isOverall": false, "label": "delete_company", "isController": false}, {"data": [[1.68602256E12, 2560.214285714286], [1.6860225E12, 2521.418604651163]], "isOverall": false, "label": "company_detail", "isController": false}, {"data": [[1.68602256E12, 201.24000000000004]], "isOverall": false, "label": "donation-create", "isController": false}, {"data": [[1.6860225E12, 814.9199999999997]], "isOverall": false, "label": "resources-list-1", "isController": false}, {"data": [[1.6860225E12, 868.7799999999997]], "isOverall": false, "label": "resources-list-2", "isController": false}, {"data": [[1.6860225E12, 218.55999999999997]], "isOverall": false, "label": "resources-list-0", "isController": false}, {"data": [[1.6860225E12, 1612.6099999999997]], "isOverall": false, "label": "login-1", "isController": false}, {"data": [[1.6860225E12, 214.45999999999998]], "isOverall": false, "label": "login-0", "isController": false}, {"data": [[1.6860225E12, 200.44000000000003]], "isOverall": false, "label": "categories-update", "isController": false}, {"data": [[1.6860225E12, 209.37]], "isOverall": false, "label": "announcements-delete", "isController": false}, {"data": [[1.6860225E12, 219.85999999999996]], "isOverall": false, "label": "announcementProjects-list-0", "isController": false}, {"data": [[1.6860225E12, 878.6800000000003]], "isOverall": false, "label": "announcementProjects-list-1", "isController": false}, {"data": [[1.6860225E12, 857.2799999999999]], "isOverall": false, "label": "announcementProjects-list-2", "isController": false}, {"data": [[1.6860225E12, 202.26000000000002]], "isOverall": false, "label": "resources-delete", "isController": false}, {"data": [[1.6860225E12, 1242.47]], "isOverall": false, "label": "announcements-list-2", "isController": false}, {"data": [[1.6860225E12, 211.8599999999999]], "isOverall": false, "label": "announcements-list-0", "isController": false}, {"data": [[1.6860225E12, 1273.0900000000004]], "isOverall": false, "label": "announcements-categories-2", "isController": false}, {"data": [[1.6860225E12, 1336.5000000000002]], "isOverall": false, "label": "announcements-list-1", "isController": false}, {"data": [[1.6860225E12, 1216.3699999999994]], "isOverall": false, "label": "announcements-categories-1", "isController": false}, {"data": [[1.6860225E12, 210.91000000000003]], "isOverall": false, "label": "announcements-categories-0", "isController": false}, {"data": [[1.68602256E12, 201.68000000000004]], "isOverall": false, "label": "binnacle-update", "isController": false}, {"data": [[1.6860225E12, 203.61999999999998]], "isOverall": false, "label": "announcementProjects-apply", "isController": false}, {"data": [[1.6860225E12, 1509.7400000000002]], "isOverall": false, "label": "Home-2", "isController": false}, {"data": [[1.6860225E12, 1955.9499999999998]], "isOverall": false, "label": "announcementProjects-list", "isController": false}, {"data": [[1.68602256E12, 201.29032258064515], [1.6860225E12, 204.42857142857142]], "isOverall": false, "label": "user-update", "isController": false}, {"data": [[1.6860225E12, 1827.1400000000006]], "isOverall": false, "label": "login", "isController": false}, {"data": [[1.68602256E12, 201.29000000000005]], "isOverall": false, "label": "binnacle-delete", "isController": false}, {"data": [[1.6860225E12, 325.4699999999999]], "isOverall": false, "label": "Home-0", "isController": false}, {"data": [[1.6860225E12, 1136.31]], "isOverall": false, "label": "Home-1", "isController": false}, {"data": [[1.6860225E12, 214.78]], "isOverall": false, "label": "register_user", "isController": false}, {"data": [[1.6860225E12, 200.28]], "isOverall": false, "label": "resources-create", "isController": false}, {"data": [[1.6860225E12, 2790.92]], "isOverall": false, "label": "announcements-list", "isController": false}, {"data": [[1.6860225E12, 223.29999999999998]], "isOverall": false, "label": "users-update", "isController": false}, {"data": [[1.6860225E12, 199.3399999999999]], "isOverall": false, "label": "categories-create", "isController": false}, {"data": [[1.6860225E12, 2840.85]], "isOverall": false, "label": "users-list", "isController": false}, {"data": [[1.6860225E12, 2972.9500000000003]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[1.6860225E12, 1261.2800000000002]], "isOverall": false, "label": "users-list-2", "isController": false}, {"data": [[1.68602256E12, 218.80769230769232], [1.6860225E12, 214.79729729729732]], "isOverall": false, "label": "user_detail-0", "isController": false}, {"data": [[1.6860225E12, 201.43999999999994]], "isOverall": false, "label": "categories-delete", "isController": false}, {"data": [[1.68602256E12, 1213.5], [1.6860225E12, 1171.033333333333]], "isOverall": false, "label": "user_detail-1", "isController": false}, {"data": [[1.68602256E12, 1248.2934782608688], [1.6860225E12, 1112.75]], "isOverall": false, "label": "user_detail-2", "isController": false}, {"data": [[1.6860225E12, 206.43000000000004]], "isOverall": false, "label": "announcements-create", "isController": false}, {"data": [[1.68602256E12, 2656.66304347826], [1.6860225E12, 2623.625]], "isOverall": false, "label": "user_detail", "isController": false}, {"data": [[1.6860225E12, 2429.64]], "isOverall": false, "label": "categories-list", "isController": false}, {"data": [[1.68602256E12, 213.14432989690718], [1.6860225E12, 206.66666666666666]], "isOverall": false, "label": "donations-list-0", "isController": false}, {"data": [[1.68602256E12, 1210.46]], "isOverall": false, "label": "donations-list-1", "isController": false}, {"data": [[1.68602256E12, 1157.8799999999999]], "isOverall": false, "label": "donations-list-2", "isController": false}, {"data": [[1.6860225E12, 218.42999999999998]], "isOverall": false, "label": "users-list-0", "isController": false}, {"data": [[1.6860225E12, 1361.0800000000004]], "isOverall": false, "label": "users-list-1", "isController": false}, {"data": [[1.68602256E12, 2118.7]], "isOverall": false, "label": "report-generate", "isController": false}, {"data": [[1.6860225E12, 201.20000000000002]], "isOverall": false, "label": "resources-update", "isController": false}, {"data": [[1.6860225E12, 214.57000000000008]], "isOverall": false, "label": "company_detail-0", "isController": false}, {"data": [[1.68602256E12, 1168.25], [1.6860225E12, 1123.6354166666663]], "isOverall": false, "label": "company_detail-1", "isController": false}, {"data": [[1.6860225E12, 206.89]], "isOverall": false, "label": "users-delete", "isController": false}, {"data": [[1.6860225E12, 204.19999999999993]], "isOverall": false, "label": "register_company", "isController": false}, {"data": [[1.68602256E12, 1237.142857142857], [1.6860225E12, 1178.6279069767436]], "isOverall": false, "label": "company_detail-2", "isController": false}, {"data": [[1.68602256E12, 200.96000000000004]], "isOverall": false, "label": "binnacle-create", "isController": false}, {"data": [[1.6860225E12, 204.90000000000006]], "isOverall": false, "label": "announcements-update", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68602256E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 199.3399999999999, "minX": 1.6860225E12, "maxY": 1611.9400000000005, "series": [{"data": [[1.6860225E12, 221.9399999999999]], "isOverall": false, "label": "users-create", "isController": false}, {"data": [[1.68602256E12, 212.9300000000001]], "isOverall": false, "label": "donations-list", "isController": false}, {"data": [[1.6860225E12, 218.55999999999997]], "isOverall": false, "label": "resources-list", "isController": false}, {"data": [[1.68602256E12, 205.61111111111114], [1.6860225E12, 201.08536585365854]], "isOverall": false, "label": "edit_company", "isController": false}, {"data": [[1.68602256E12, 1013.97]], "isOverall": false, "label": "report-generate-1", "isController": false}, {"data": [[1.68602256E12, 894.4500000000004]], "isOverall": false, "label": "report-generate-2", "isController": false}, {"data": [[1.68602256E12, 210.10000000000002]], "isOverall": false, "label": "report-generate-0", "isController": false}, {"data": [[1.6860225E12, 210.57]], "isOverall": false, "label": "logout", "isController": false}, {"data": [[1.6860225E12, 213.79000000000008]], "isOverall": false, "label": "categories-list-0", "isController": false}, {"data": [[1.6860225E12, 1053.4900000000007]], "isOverall": false, "label": "categories-list-1", "isController": false}, {"data": [[1.6860225E12, 1161.6200000000003]], "isOverall": false, "label": "categories-list-2", "isController": false}, {"data": [[1.6860225E12, 210.91000000000003]], "isOverall": false, "label": "announcements-categories", "isController": false}, {"data": [[1.68602256E12, 202.2], [1.6860225E12, 203.75999999999996]], "isOverall": false, "label": "delete_company", "isController": false}, {"data": [[1.68602256E12, 214.35714285714283], [1.6860225E12, 214.60465116279073]], "isOverall": false, "label": "company_detail", "isController": false}, {"data": [[1.68602256E12, 201.24000000000004]], "isOverall": false, "label": "donation-create", "isController": false}, {"data": [[1.6860225E12, 814.9199999999997]], "isOverall": false, "label": "resources-list-1", "isController": false}, {"data": [[1.6860225E12, 868.0800000000002]], "isOverall": false, "label": "resources-list-2", "isController": false}, {"data": [[1.6860225E12, 218.55999999999997]], "isOverall": false, "label": "resources-list-0", "isController": false}, {"data": [[1.6860225E12, 1611.9400000000005]], "isOverall": false, "label": "login-1", "isController": false}, {"data": [[1.6860225E12, 214.45999999999998]], "isOverall": false, "label": "login-0", "isController": false}, {"data": [[1.6860225E12, 200.44000000000003]], "isOverall": false, "label": "categories-update", "isController": false}, {"data": [[1.6860225E12, 209.37]], "isOverall": false, "label": "announcements-delete", "isController": false}, {"data": [[1.6860225E12, 219.85999999999996]], "isOverall": false, "label": "announcementProjects-list-0", "isController": false}, {"data": [[1.6860225E12, 878.6700000000002]], "isOverall": false, "label": "announcementProjects-list-1", "isController": false}, {"data": [[1.6860225E12, 856.3100000000001]], "isOverall": false, "label": "announcementProjects-list-2", "isController": false}, {"data": [[1.6860225E12, 202.26000000000002]], "isOverall": false, "label": "resources-delete", "isController": false}, {"data": [[1.6860225E12, 1241.6799999999998]], "isOverall": false, "label": "announcements-list-2", "isController": false}, {"data": [[1.6860225E12, 211.85000000000008]], "isOverall": false, "label": "announcements-list-0", "isController": false}, {"data": [[1.6860225E12, 1272.4299999999998]], "isOverall": false, "label": "announcements-categories-2", "isController": false}, {"data": [[1.6860225E12, 1336.5000000000002]], "isOverall": false, "label": "announcements-list-1", "isController": false}, {"data": [[1.6860225E12, 1216.3699999999994]], "isOverall": false, "label": "announcements-categories-1", "isController": false}, {"data": [[1.6860225E12, 210.91000000000003]], "isOverall": false, "label": "announcements-categories-0", "isController": false}, {"data": [[1.68602256E12, 201.68000000000004]], "isOverall": false, "label": "binnacle-update", "isController": false}, {"data": [[1.6860225E12, 203.61999999999998]], "isOverall": false, "label": "announcementProjects-apply", "isController": false}, {"data": [[1.6860225E12, 1509.1000000000001]], "isOverall": false, "label": "Home-2", "isController": false}, {"data": [[1.6860225E12, 219.85999999999996]], "isOverall": false, "label": "announcementProjects-list", "isController": false}, {"data": [[1.68602256E12, 201.29032258064515], [1.6860225E12, 204.42857142857142]], "isOverall": false, "label": "user-update", "isController": false}, {"data": [[1.6860225E12, 214.45999999999998]], "isOverall": false, "label": "login", "isController": false}, {"data": [[1.68602256E12, 201.29000000000005]], "isOverall": false, "label": "binnacle-delete", "isController": false}, {"data": [[1.6860225E12, 325.46000000000004]], "isOverall": false, "label": "Home-0", "isController": false}, {"data": [[1.6860225E12, 1136.31]], "isOverall": false, "label": "Home-1", "isController": false}, {"data": [[1.6860225E12, 214.78]], "isOverall": false, "label": "register_user", "isController": false}, {"data": [[1.6860225E12, 200.28]], "isOverall": false, "label": "resources-create", "isController": false}, {"data": [[1.6860225E12, 211.85000000000002]], "isOverall": false, "label": "announcements-list", "isController": false}, {"data": [[1.6860225E12, 223.29999999999998]], "isOverall": false, "label": "users-update", "isController": false}, {"data": [[1.6860225E12, 199.3399999999999]], "isOverall": false, "label": "categories-create", "isController": false}, {"data": [[1.6860225E12, 218.42999999999998]], "isOverall": false, "label": "users-list", "isController": false}, {"data": [[1.6860225E12, 325.46000000000004]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[1.6860225E12, 1260.6599999999996]], "isOverall": false, "label": "users-list-2", "isController": false}, {"data": [[1.68602256E12, 218.80769230769232], [1.6860225E12, 214.7837837837838]], "isOverall": false, "label": "user_detail-0", "isController": false}, {"data": [[1.6860225E12, 201.43999999999994]], "isOverall": false, "label": "categories-delete", "isController": false}, {"data": [[1.68602256E12, 1213.5], [1.6860225E12, 1171.033333333333]], "isOverall": false, "label": "user_detail-1", "isController": false}, {"data": [[1.68602256E12, 1248.2499999999995], [1.6860225E12, 1112.75]], "isOverall": false, "label": "user_detail-2", "isController": false}, {"data": [[1.6860225E12, 206.43000000000004]], "isOverall": false, "label": "announcements-create", "isController": false}, {"data": [[1.68602256E12, 215.02173913043484], [1.6860225E12, 225.125]], "isOverall": false, "label": "user_detail", "isController": false}, {"data": [[1.6860225E12, 213.79000000000008]], "isOverall": false, "label": "categories-list", "isController": false}, {"data": [[1.68602256E12, 213.12371134020623], [1.6860225E12, 206.66666666666666]], "isOverall": false, "label": "donations-list-0", "isController": false}, {"data": [[1.68602256E12, 1210.46]], "isOverall": false, "label": "donations-list-1", "isController": false}, {"data": [[1.68602256E12, 1157.8000000000002]], "isOverall": false, "label": "donations-list-2", "isController": false}, {"data": [[1.6860225E12, 218.42999999999998]], "isOverall": false, "label": "users-list-0", "isController": false}, {"data": [[1.6860225E12, 1361.0800000000004]], "isOverall": false, "label": "users-list-1", "isController": false}, {"data": [[1.68602256E12, 210.10000000000002]], "isOverall": false, "label": "report-generate", "isController": false}, {"data": [[1.6860225E12, 201.20000000000002]], "isOverall": false, "label": "resources-update", "isController": false}, {"data": [[1.6860225E12, 214.57000000000008]], "isOverall": false, "label": "company_detail-0", "isController": false}, {"data": [[1.68602256E12, 1168.25], [1.6860225E12, 1123.6354166666663]], "isOverall": false, "label": "company_detail-1", "isController": false}, {"data": [[1.6860225E12, 206.89]], "isOverall": false, "label": "users-delete", "isController": false}, {"data": [[1.6860225E12, 204.19999999999993]], "isOverall": false, "label": "register_company", "isController": false}, {"data": [[1.68602256E12, 1236.8571428571431], [1.6860225E12, 1178.2209302325584]], "isOverall": false, "label": "company_detail-2", "isController": false}, {"data": [[1.68602256E12, 200.96000000000004]], "isOverall": false, "label": "binnacle-create", "isController": false}, {"data": [[1.6860225E12, 204.90000000000006]], "isOverall": false, "label": "announcements-update", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68602256E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.6860225E12, "maxY": 109.94, "series": [{"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "users-create", "isController": false}, {"data": [[1.68602256E12, 0.0]], "isOverall": false, "label": "donations-list", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "resources-list", "isController": false}, {"data": [[1.68602256E12, 0.0], [1.6860225E12, 0.0]], "isOverall": false, "label": "edit_company", "isController": false}, {"data": [[1.68602256E12, 0.0]], "isOverall": false, "label": "report-generate-1", "isController": false}, {"data": [[1.68602256E12, 0.0]], "isOverall": false, "label": "report-generate-2", "isController": false}, {"data": [[1.68602256E12, 0.0]], "isOverall": false, "label": "report-generate-0", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "logout", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "categories-list-0", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "categories-list-1", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "categories-list-2", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "announcements-categories", "isController": false}, {"data": [[1.68602256E12, 0.0], [1.6860225E12, 0.0]], "isOverall": false, "label": "delete_company", "isController": false}, {"data": [[1.68602256E12, 0.0], [1.6860225E12, 0.0]], "isOverall": false, "label": "company_detail", "isController": false}, {"data": [[1.68602256E12, 0.0]], "isOverall": false, "label": "donation-create", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "resources-list-1", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "resources-list-2", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "resources-list-0", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "login-1", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "login-0", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "categories-update", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "announcements-delete", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "announcementProjects-list-0", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "announcementProjects-list-1", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "announcementProjects-list-2", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "resources-delete", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "announcements-list-2", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "announcements-list-0", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "announcements-categories-2", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "announcements-list-1", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "announcements-categories-1", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "announcements-categories-0", "isController": false}, {"data": [[1.68602256E12, 0.0]], "isOverall": false, "label": "binnacle-update", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "announcementProjects-apply", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "Home-2", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "announcementProjects-list", "isController": false}, {"data": [[1.68602256E12, 0.0], [1.6860225E12, 0.0]], "isOverall": false, "label": "user-update", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "login", "isController": false}, {"data": [[1.68602256E12, 0.0]], "isOverall": false, "label": "binnacle-delete", "isController": false}, {"data": [[1.6860225E12, 24.14]], "isOverall": false, "label": "Home-0", "isController": false}, {"data": [[1.6860225E12, 109.94]], "isOverall": false, "label": "Home-1", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "register_user", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "resources-create", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "announcements-list", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "users-update", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "categories-create", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "users-list", "isController": false}, {"data": [[1.6860225E12, 24.14]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "users-list-2", "isController": false}, {"data": [[1.68602256E12, 0.0], [1.6860225E12, 0.0]], "isOverall": false, "label": "user_detail-0", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "categories-delete", "isController": false}, {"data": [[1.68602256E12, 0.0], [1.6860225E12, 0.0]], "isOverall": false, "label": "user_detail-1", "isController": false}, {"data": [[1.68602256E12, 0.0], [1.6860225E12, 0.0]], "isOverall": false, "label": "user_detail-2", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "announcements-create", "isController": false}, {"data": [[1.68602256E12, 0.0], [1.6860225E12, 0.0]], "isOverall": false, "label": "user_detail", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "categories-list", "isController": false}, {"data": [[1.68602256E12, 0.0], [1.6860225E12, 0.0]], "isOverall": false, "label": "donations-list-0", "isController": false}, {"data": [[1.68602256E12, 0.0]], "isOverall": false, "label": "donations-list-1", "isController": false}, {"data": [[1.68602256E12, 0.0]], "isOverall": false, "label": "donations-list-2", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "users-list-0", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "users-list-1", "isController": false}, {"data": [[1.68602256E12, 0.0]], "isOverall": false, "label": "report-generate", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "resources-update", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "company_detail-0", "isController": false}, {"data": [[1.68602256E12, 0.0], [1.6860225E12, 0.0]], "isOverall": false, "label": "company_detail-1", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "users-delete", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "register_company", "isController": false}, {"data": [[1.68602256E12, 0.0], [1.6860225E12, 0.0]], "isOverall": false, "label": "company_detail-2", "isController": false}, {"data": [[1.68602256E12, 0.0]], "isOverall": false, "label": "binnacle-create", "isController": false}, {"data": [[1.6860225E12, 0.0]], "isOverall": false, "label": "announcements-update", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68602256E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 182.0, "minX": 1.6860225E12, "maxY": 4186.0, "series": [{"data": [[1.68602256E12, 2965.0], [1.6860225E12, 4186.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.68602256E12, 2483.8], [1.6860225E12, 2353.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.68602256E12, 2819.08], [1.6860225E12, 3145.479999999993]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.68602256E12, 2663.0], [1.6860225E12, 2750.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.68602256E12, 184.0], [1.6860225E12, 182.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.68602256E12, 973.0], [1.6860225E12, 368.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68602256E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 206.5, "minX": 63.0, "maxY": 1699.0, "series": [{"data": [[63.0, 713.0], [67.0, 381.0], [103.0, 630.0], [109.0, 1304.0], [110.0, 1070.5], [121.0, 1363.0], [129.0, 1115.0], [132.0, 1008.0], [142.0, 1595.0], [141.0, 1255.0], [150.0, 1175.0], [148.0, 1069.5], [154.0, 1370.0], [156.0, 1369.5], [164.0, 873.5], [172.0, 1699.0], [171.0, 1162.0], [183.0, 1191.0], [181.0, 1223.0], [188.0, 235.0], [184.0, 956.5], [189.0, 1096.0], [193.0, 233.0], [192.0, 250.0], [200.0, 1504.5], [206.0, 208.5], [212.0, 224.0], [222.0, 213.5], [218.0, 225.0], [231.0, 223.0], [225.0, 216.0], [234.0, 226.5], [247.0, 210.0], [245.0, 228.0], [244.0, 210.0], [270.0, 233.5], [318.0, 206.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 318.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 205.0, "minX": 63.0, "maxY": 1204.0, "series": [{"data": [[63.0, 221.0], [67.0, 381.0], [103.0, 518.0], [109.0, 1103.0], [110.0, 884.5], [121.0, 1204.0], [129.0, 262.0], [132.0, 214.5], [142.0, 272.5], [141.0, 242.0], [150.0, 216.0], [148.0, 225.5], [154.0, 286.5], [156.0, 226.0], [164.0, 217.5], [172.0, 236.5], [171.0, 219.0], [183.0, 214.0], [181.0, 219.0], [188.0, 209.0], [184.0, 213.0], [189.0, 217.0], [193.0, 213.0], [192.0, 216.0], [200.0, 211.0], [206.0, 205.0], [212.0, 211.0], [222.0, 209.0], [218.0, 211.0], [231.0, 213.0], [225.0, 208.0], [234.0, 209.0], [247.0, 207.0], [245.0, 211.0], [244.0, 205.0], [270.0, 209.0], [318.0, 205.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 318.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 24.616666666666667, "minX": 1.6860225E12, "maxY": 92.05, "series": [{"data": [[1.68602256E12, 24.616666666666667], [1.6860225E12, 92.05]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68602256E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 3.716666666666667, "minX": 1.6860225E12, "maxY": 29.8, "series": [{"data": [[1.68602256E12, 10.2], [1.6860225E12, 29.8]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.68602256E12, 3.716666666666667], [1.6860225E12, 16.283333333333335]], "isOverall": false, "label": "301", "isController": false}, {"data": [[1.68602256E12, 4.566666666666666], [1.6860225E12, 13.766666666666667]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.68602256E12, 8.933333333333334], [1.6860225E12, 29.4]], "isOverall": false, "label": "307", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68602256E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.05, "minX": 1.6860225E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "Home-2-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "announcements-list-1-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "categories-list-0-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "categories-update-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "users-list-1-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "announcementProjects-list-0-success", "isController": false}, {"data": [[1.68602256E12, 1.6666666666666667]], "isOverall": false, "label": "donation-create-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "resources-list-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "announcements-categories-0-success", "isController": false}, {"data": [[1.68602256E12, 1.5333333333333334], [1.6860225E12, 0.13333333333333333]], "isOverall": false, "label": "user_detail-2-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "Home-0-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "resources-delete-success", "isController": false}, {"data": [[1.68602256E12, 1.6666666666666667]], "isOverall": false, "label": "report-generate-0-success", "isController": false}, {"data": [[1.68602256E12, 1.6666666666666667]], "isOverall": false, "label": "report-generate-2-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "users-list-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "announcementProjects-list-2-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "users-delete-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "Home-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "announcements-categories-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "categories-list-2-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "login-0-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "logout-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "announcements-delete-success", "isController": false}, {"data": [[1.68602256E12, 1.6666666666666667]], "isOverall": false, "label": "donations-list-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "resources-create-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "categories-delete-success", "isController": false}, {"data": [[1.68602256E12, 0.4166666666666667], [1.6860225E12, 1.25]], "isOverall": false, "label": "delete_company-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "users-create-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "announcements-list-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "resources-list-1-success", "isController": false}, {"data": [[1.68602256E12, 1.6666666666666667]], "isOverall": false, "label": "binnacle-create-success", "isController": false}, {"data": [[1.68602256E12, 0.43333333333333335], [1.6860225E12, 1.2333333333333334]], "isOverall": false, "label": "user_detail-0-success", "isController": false}, {"data": [[1.68602256E12, 1.6666666666666667]], "isOverall": false, "label": "donations-list-1-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "announcements-categories-2-success", "isController": false}, {"data": [[1.68602256E12, 0.06666666666666667], [1.6860225E12, 1.6]], "isOverall": false, "label": "company_detail-1-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "login-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "announcements-list-0-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "announcements-update-success", "isController": false}, {"data": [[1.68602256E12, 1.6666666666666667]], "isOverall": false, "label": "binnacle-delete-success", "isController": false}, {"data": [[1.68602256E12, 1.6666666666666667]], "isOverall": false, "label": "donations-list-2-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "register_user-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "Home-1-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "users-list-2-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "announcements-categories-1-success", "isController": false}, {"data": [[1.68602256E12, 0.3], [1.6860225E12, 1.3666666666666667]], "isOverall": false, "label": "edit_company-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "announcementProjects-list-1-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "users-list-0-success", "isController": false}, {"data": [[1.68602256E12, 1.6666666666666667]], "isOverall": false, "label": "report-generate-1-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "announcements-create-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "announcementProjects-list-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "resources-list-0-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "categories-list-1-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "company_detail-0-success", "isController": false}, {"data": [[1.68602256E12, 1.6666666666666667]], "isOverall": false, "label": "binnacle-update-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "login-1-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "categories-list-success", "isController": false}, {"data": [[1.68602256E12, 0.23333333333333334], [1.6860225E12, 1.4333333333333333]], "isOverall": false, "label": "company_detail-success", "isController": false}, {"data": [[1.68602256E12, 1.5333333333333334], [1.6860225E12, 0.13333333333333333]], "isOverall": false, "label": "user_detail-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "resources-list-2-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "resources-update-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "categories-create-success", "isController": false}, {"data": [[1.68602256E12, 1.1666666666666667], [1.6860225E12, 0.5]], "isOverall": false, "label": "user_detail-1-success", "isController": false}, {"data": [[1.68602256E12, 0.23333333333333334], [1.6860225E12, 1.4333333333333333]], "isOverall": false, "label": "company_detail-2-success", "isController": false}, {"data": [[1.68602256E12, 1.6166666666666667], [1.6860225E12, 0.05]], "isOverall": false, "label": "donations-list-0-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "announcementProjects-apply-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "announcements-list-2-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "users-update-success", "isController": false}, {"data": [[1.6860225E12, 1.6666666666666667]], "isOverall": false, "label": "register_company-success", "isController": false}, {"data": [[1.68602256E12, 1.55], [1.6860225E12, 0.11666666666666667]], "isOverall": false, "label": "user-update-success", "isController": false}, {"data": [[1.68602256E12, 1.6666666666666667]], "isOverall": false, "label": "report-generate-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68602256E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 27.416666666666668, "minX": 1.6860225E12, "maxY": 89.25, "series": [{"data": [[1.68602256E12, 27.416666666666668], [1.6860225E12, 89.25]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68602256E12, "title": "Total Transactions Per Second"}},
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
