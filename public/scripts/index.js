// DOM elements
const logoutNavElement = document.querySelector('#logout-link');
const loginNavElement = document.querySelector('#login-link');
const dashboardElement = document.querySelector("#dashboardSignedIn");
const userTimeElement = document.querySelector('#userInfo');
const userDetailsElement = document.querySelector('#user-details');
const signedOutMessageElement = document.querySelector('#signedOutMessage');
const tableDetailElement = document.querySelector('#table-detail');
// Table reading element
const tableBPMElement = document.getElementById('table-bpmValue');
const tableSPO2Element = document.getElementById('table-spo2Value');
const tableRMSSDElement = document.getElementById('table-rmssdValue');
const tableSDNNElement = document.getElementById('table-sdnnValue');
const tableRRElement = document.getElementById('table-rrValue');
const tableQRSElement = document.getElementById('table-qrsValue');
// Table status element
const tableBPMStatus = document.getElementById('table-bpmStatus');
const tableSPO2Status = document.getElementById('table-spo2Status');
const tableRMSSDStatus = document.getElementById('table-rmssdStatus');
const tableSDNNStatus = document.getElementById('table-sdnnStatus');
const tableRRStatus = document.getElementById('table-rrStatus');
const tableQRSStatus = document.getElementById('table-qrsStatus');
// buttons
const buttonReviewMore = document.getElementById('btn-load-more');
const buttonViewData = document.getElementById('btn-view-data');
const buttonHideData = document.getElementById('btn-hide-data');
const buttonDeleteData = document.getElementById('btn-delete-data-confirm');
const buttonResetTableData = document.getElementById('dtn-delete-table');
// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
    if (user) {
        function getJsDate(epochTime){
            return new Date(epochTime);
        }
        // convert time to YYYY/MM/DD HH:MM:SS
        function getLastRecordTime(epochTime){
            var epochDate = new Date(epochTime);
            var dateTime = epochDate.getFullYear() + "/" +
                ("00" + (epochDate.getMonth() + 1)).slice(-2) + "/" +
                ("00" + epochDate.getDate()).slice(-2) + " " +
                ("00" + epochDate.getHours()).slice(-2) + ":" +
                ("00" + epochDate.getMinutes()).slice(-2) + ":" +
                ("00" + epochDate.getSeconds()).slice(-2);
            return dateTime;
        }

        function plotValues(chart, timestamp, value){
            var x = getJsDate(timestamp).getTime();
            var y = Number (value);
            if(chart.series[0].data.length > 30) {
                chart.series[0].addPoint([x, y], true, true, true);
            } else {
                chart.series[0].addPoint([x, y], true, false, true);
            }
        }

        logoutNavElement.style.display = 'block';
        loginNavElement.style.display = 'none';
        signedOutMessageElement.style.display ='none';
        dashboardElement.style.display = 'block';
        userTimeElement.style.display ='block';
        userDetailsElement.innerHTML = user.email;
        tableDetailElement.style.display = 'none';
        // get user UID to get data from database
        var uid = user.uid;
        // Database paths (with user UID)
        var dbPathBtn1 = 'UsersData/' + uid.toString() + '/outputs/status/1';
        var dbPathBtn2 = 'UsersData/' + uid.toString() + '/outputs/status/2';
        var dbPathDuration = 'UsersData/' + uid.toString() + '/outputs/status/3';
        var dbPathData = 'UsersData/' + uid.toString() + '/data';
        var dbGraphData = 'UsersData/' + uid.toString() + '/graph';

        const welcomeUserSpan = document.getElementById('time-status');
        welcomeUserSpan.textContent = new Date().toLocaleString();
        function updateTime(){
            welcomeUserSpan.textContent = new Date().toLocaleString();
        }
        updateTime();
        setInterval(updateTime, 1000);
        //////// Button 1 ////////
        var monitorState = document.getElementById('monitor-state');
        var dbBtn1 = firebase.database().ref().child(dbPathBtn1);
        var monitorSwitch = document.getElementById('monitor-switch');

        dbBtn1.on('value', snap => {
            if(snap.val() === 1){
                monitorSwitch.checked = true;
                monitorState.innerText = 'ON';
            }
            else{
                monitorSwitch.checked = false;
                monitorState.innerText = 'OFF';
            }
        });
        monitorSwitch.addEventListener("click", function(){
            if(monitorSwitch.checked){
                firebase.database().ref().child(dbPathBtn1).set(1);
            }
            else{
                firebase.database().ref().child(dbPathBtn1).set(0);
            }
        });


        ////////  Button 2 ////////
        var alarmState = document.getElementById('alarm-state');
        var dbBtn2 = firebase.database().ref().child(dbPathBtn2);
        var alarmSwitch = document.getElementById('alarm-switch');

        dbBtn2.on('value', snap => {
            if(snap.val() === 1){
                alarmState.innerText = 'ON';
                alarmSwitch.checked = true;
            }
            else{
                alarmState.innerText = 'OFF';
                alarmSwitch.checked = false;
            }
        });

        alarmSwitch.addEventListener("click", function(){
            if(alarmSwitch.checked){
                firebase.database().ref().child(dbPathBtn2).set(1);
            }
            else{
                firebase.database().ref().child(dbPathBtn2).set(0);
            }
        });

        //////// Duration drop down list - Update selected value from database ////////
        var selectDuration = document.getElementById("select");
        var selectionDuration = firebase.database().ref().child(dbPathDuration);
        selectionDuration.on('value', snap => {
            if(snap.val() === 3000){
                selectDuration.value = '3';
            }
            else if(snap.val() === 4000){
                selectDuration.value = '4';
            }
            else if(snap.val() === 5000){
                selectDuration.value = '5';
            }
        });

        selectDuration.addEventListener("change", function(){
            if(selectDuration.value === '3')
                firebase.database().ref().child(dbPathDuration).set(3000);
            else if (selectDuration.value === '4')
                firebase.database().ref().child(dbPathDuration).set(4000);
            else if (selectDuration.value === '5')
                firebase.database().ref().child(dbPathDuration).set(5000);
        });

        // Sensor and Data Reading from the database
        var dbDataReading = firebase.database().ref(dbPathData);
        // Get the latest readings and display on cards
        dbDataReading.limitToLast(1).on('child_added', snapshot =>{
            var jsonData = snapshot.toJSON(); // example: {bpm: 88, qrsAvg: 0, rmssd: 0, sdnn:0, timestamp:1698836003770}
            var bpmData = jsonData.bpm;
            var qrsData = jsonData.qrsAvg;
            var rmssdData = jsonData.rmssd;
            var rrData = jsonData.rrAvg;
            var sdnnData = jsonData.sdnn;
            var spo2Data = jsonData.spo;
            // var timestamp = jsonData.timestamp;
            // Update DOM elements
            tableBPMElement.innerHTML = bpmData;
            if (bpmData > 140){
                tableBPMStatus.innerHTML = 'Intense heart rate';
                tableBPMStatus.style.backgroundColor = '#ffcccb';
            } else if (bpmData <= 140 && bpmData > 0){
                tableBPMStatus.innerHTML = 'Within normal resting rate';
                tableBPMStatus.style.backgroundColor = '#90ee90';
            } else{
                tableBPMStatus.innerHTML = 'Measuring in progress';
                tableBPMStatus.style.backgroundColor = '#d6d6d6';
            }

            tableQRSElement.innerHTML = qrsData;
            if (qrsData > 150){
                tableQRSStatus.innerHTML = 'Broad complexes';
                tableQRSStatus.style.backgroundColor = '#ffcccb';
            } else if(qrsData < 50 && qrsData > 0){
                tableQRSStatus.innerHTML = 'Narrow complexes';
                tableQRSStatus.style.backgroundColor = '#ADD8E6';
            } else if(qrsData >= 50 && qrsData <= 150){
                tableQRSStatus.innerHTML = 'Normal complexes';
                tableQRSStatus.style.backgroundColor = '#90ee90';
            } else {
                tableQRSStatus.innerHTML = 'Measuring in progress';
                tableQRSStatus.style.backgroundColor = '#d6d6d6';
            }

            tableRMSSDElement.innerHTML = rmssdData;
            if (rmssdData < 10 && rmssdData > 0){
                tableRMSSDStatus.innerHTML = 'Unhealthy score';
                tableRMSSDStatus.style.backgroundColor = '#ffcccb';
            } else if(rmssdData >= 10){
                tableRMSSDStatus.innerHTML = 'Within normal HRV range';
                tableRMSSDStatus.style.backgroundColor = '#90ee90';
            } else{
                tableRMSSDStatus.innerHTML = 'Measuring in progress';
                tableRMSSDStatus.style.backgroundColor = '#d6d6d6';
            }

            tableRRElement.innerHTML = rrData;
            if (rrData > 1500){
                tableRRStatus.innerHTML = 'Abnormal';
                tableRRStatus.style.backgroundColor = '#ffcccb';
            } else if(rrData > 0 && rrData <= 1500){
                tableRRStatus.innerHTML = 'Within normal range';
                tableRRStatus.style.backgroundColor = '#90ee90';
            } else{
                tableRRStatus.innerHTML = 'Measuring in progress';
                tableRRStatus.style.backgroundColor = '#d6d6d6';
            }

            tableSDNNElement.innerHTML = sdnnData;
            if (sdnnData < 10 && sdnnData > 0){
                tableSDNNStatus.innerHTML = 'Unhealthy';
                tableSDNNStatus.style.backgroundColor = '#ffcccb';
            } else if (sdnnData >= 10 ) {
                tableSDNNStatus.innerHTML = 'Within normal range';
                tableSDNNStatus.style.backgroundColor = '#90ee90';
            } else{
                tableSDNNStatus.innerHTML = 'Measuring in progress';
                tableSDNNStatus.style.backgroundColor = '#d6d6d6';
            }

            tableSPO2Element.innerHTML = spo2Data + ' %';
            if (spo2Data < 90 && spo2Data > 0){
                tableSPO2Status.innerHTML = 'Low Oxygen Level';
                tableSPO2Status.style.backgroundColor = '#ffcccb';
            }else if(spo2Data >= 90){
                tableSPO2Status.innerHTML = 'Normal oxygen level ';
                tableSPO2Status.style.backgroundColor = '#90ee90';
            }
            else{
                tableSPO2Status.innerHTML = 'Measuring in progress';
                tableSPO2Status.style.backgroundColor = '#d6d6d6';
            }
        });

        //////// Chart Handling ////////
        chartQRS = createQRSChart();
        chartRMSSD = createRMSSDChart();
        chartSDNN = createSDNNChart();

        dbDataReading.orderByKey().limitToLast(30).on('child_added', snapshot =>{
            var jsonData = snapshot.toJSON();
            // Save values on variables
            var qrsData = jsonData.qrsAvg;
            var rmssdData = jsonData.rmssd;
            var sdnnData = jsonData.sdnn;
            var timestamp = jsonData.timestamp;
            // Plot the values on charts
            plotValues(chartQRS, timestamp, qrsData);
            plotValues(chartRMSSD, timestamp, rmssdData);
            plotValues(chartSDNN, timestamp, sdnnData);
        });

        var dbGraphReading = firebase.database().ref(dbGraphData);
        chartECG = createECGChart();
        chartPPG = createPPGChart();
        dbGraphReading.orderByKey().limitToLast(30).on('child_added', snapshot =>{
            var jsonData = snapshot.toJSON();
            // Save values on variables
            var ecgData = jsonData.ecgValue;
            var ppgDate = jsonData.ppgValue;
            var timestamp = jsonData.timestamp;
            // Plot the values on charts
            plotValues(chartECG, timestamp, ecgData);
            plotValues(chartPPG, timestamp, ppgDate);
        });

        const dataPerPage = 10; // Number of items to display per page
        // saves the pushID of the last readings displayed on the table
        var firebaseID;
        var deletedRows = [];
        var deletedRowsToAdd = 10; // Number of rows to add at a time
        buttonResetTableData.addEventListener('click',()=>{
            var tableRows = $('#table-body tr');
            var numRows = tableRows.length;
            // Remove excess rows if the table has more than 10 rows
            if (numRows > 10) {
                var rowsToRemove = numRows - 10;
                for (var i = numRows - 1; i >= numRows - rowsToRemove; i--) {
                    deletedRows.push(tableRows[i].outerHTML);
                    $(tableRows[i]).remove();
                }
            }
        });

        // Function to add deleted rows back to the table
        function addDeletedRows() {
            var tableBody = $('#table-body');
            // Add deleted rows back to the table body
            // Add a specific number of deleted rows at a time
            var rowsToAddCount = Math.min(deletedRowsToAdd, deletedRows.length);
            for (var i = deletedRows.length - 1; i >= deletedRows.length - deletedRowsToAdd; i--) {
                tableBody.append(deletedRows[i]);
            }
            // Remove the added rows from the deletedRows array
            deletedRows.splice(deletedRows.length - rowsToAddCount, rowsToAddCount);
        }

        function createPage(){
            // Clear the table body
            var firstData = true;
            dbDataReading.orderByKey().limitToLast(dataPerPage).on('child_added', snapshot =>{
                if(snapshot.exists()){
                    var dataTable = snapshot.toJSON();
                    var bpmTable = dataTable.bpm;
                    var qrsTable = dataTable.qrsAvg;
                    var rmssdTable = dataTable.rmssd;
                    var rrTable = dataTable.rrAvg;
                    var sdnnTable = dataTable.sdnn;
                    var timestampTable = dataTable.timestamp;
                    var spo2Table = dataTable.spo;
                    var tableContent = '';
                    tableContent += '<tr>';
                    tableContent += '<td>' + getLastRecordTime(timestampTable) + '</td>';
                    tableContent += '<td>' + bpmTable + '</td>';
                    tableContent += '<td>' + rmssdTable + '</td>';
                    tableContent += '<td>' + sdnnTable + '</td>';
                    tableContent += '<td>' + rrTable + '</td>';
                    tableContent += '<td>' + qrsTable + '</td>';
                    tableContent += '<td>' + spo2Table + '</td>';
                    tableContent += '</tr>';
                    $('#table-body').prepend(tableContent);
                    if(firstData){
                        firebaseID = snapshot.key;
                        firstData = false;
                    }
                }
            });
        }

        // Append readings to table
        function getNewRecordToTable(){
            var dataList = []; // saves list of readings returned by the snapshot (oldest-->newest)
            var reverseData = []; // the same as previous, but reversed (newest--> oldest)
            if(deletedRows.length === 0){
                dbDataReading.orderByKey().limitToLast(dataPerPage).endAt(String(firebaseID)).once('value', function(snapshot) {
                    // Convert the snapshot to JSON
                    if (snapshot.exists()) {
                        var firstRun = true;
                        snapshot.forEach(element => {
                            // Get the last pushID (it's the first on the snapshot oldest data --> newest data)
                            if (firstRun){
                                firebaseID = element.key
                                firstRun = false;
                            }
                            var dataTable = element.toJSON();
                            dataList.push(dataTable); // create a list with all data
                        });
                        reverseData = dataList.reverse(); // reverse the order of the list (newest data --> oldest data)
                        var firstTime = true;
                        // loop through all elements of the list and append to table (newest elements first)
                        reverseData.forEach(element =>{
                            if (firstTime){ // ignore first reading (it's already on the table from the previous query)
                                firstTime = false;
                            }
                            else{ //append the new readings to the table
                                var bpmTable = element.bpm;
                                var qrsTable = element.qrsAvg;
                                var rmssdTable = element.rmssd;
                                var rrTable = element.rrAvg;
                                var sdnnTable = element.sdnn;
                                var timestampTable = element.timestamp;
                                var spo2Table = element.spo;
                                var tableContent = '';
                                tableContent += '<tr>';
                                tableContent += '<td>' + getLastRecordTime(timestampTable) + '</td>';
                                tableContent += '<td>' + bpmTable + '</td>';
                                tableContent += '<td>' + rmssdTable + '</td>';
                                tableContent += '<td>' + sdnnTable + '</td>';
                                tableContent += '<td>' + rrTable + '</td>';
                                tableContent += '<td>' + qrsTable + '</td>';
                                tableContent += '<td>' + spo2Table + '</td>';
                                tableContent += '</tr>';
                                $('#table-body').append(tableContent);
                            }
                        });
                    }
                });
            }else{
                addDeletedRows();
            }
        }

        createPage();

        buttonReviewMore.addEventListener('click', (e) =>{
            getNewRecordToTable();
        });

        buttonDeleteData.addEventListener('click', (e) =>{
            // delete data (readings)
            dbDataReading.remove();
            window.location.reload();
        });

        buttonViewData.addEventListener('click', (e) =>{
            tableDetailElement.style.display = 'block';
            buttonViewData.style.display = 'none';
            buttonHideData.style.display = 'inline-block';
            buttonReviewMore.style.display = 'inline-block';
        });

        buttonHideData.addEventListener('click', (e) =>{
            tableDetailElement.style.display = 'none';
            buttonViewData.style.display = 'inline-block';
            buttonHideData.style.display = 'none';
        });
    }
    else{
        // toggle UI elements
        logoutNavElement.style.display = 'none';
        loginNavElement.style.display = 'block';
        signedOutMessageElement.style.display ='block';
        dashboardElement.style.display = 'none';
        userTimeElement.style.display = 'none';
    }
}