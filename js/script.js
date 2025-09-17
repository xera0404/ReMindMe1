<script type="text/javascript">
    // Ask user to allow notification access
    if ("Notification" in window) {
      Notification.requestPermission().then(function (permission) {
        if (Notification.permission !== "granted"){
          alert("Please allow notification access!");
        }
      });
    }

    var timeoutIds = []; // 

    function addReminder(Subject, description, dateTimeString, timeoutId){
  var tableBody = document.getElementById('reminderTableBody');
  var row = tableBody.insertRow();
  var titleCell = row.insertCell(0);
  var descriptionCell = row.insertCell(1);
  var dateTimeCell = row.insertCell(2);
  var actionCell = row.insertCell(3);

  titleCell.innerHTML = Subject; // ✅ fixed
  descriptionCell.innerHTML = description;
  dateTimeCell.innerHTML = dateTimeString;
  actionCell.innerHTML = '<button onclick="deleteReminder(this);">Delete</button>';

  row.dataset.timeoutId = timeoutId;
}

function scheduleReminder() {
  var Subject = document.getElementById("Subject").value.trim();
  var description = document.getElementById("description").value.trim();
  var date = document.getElementById("date").value;
  var time = document.getElementById("time").value;

  if (!Subject || !description || !date || !time) {
    alert("Please fill in all fields!");
    return;
  }

  var dateTimeString = date + " " + time;
  var scheduledTime = new Date(dateTimeString);
  var currentTime = new Date();
  var timeDifference = scheduledTime - currentTime;

  if (timeDifference > 0) {
    var timeoutId = setTimeout(function(){
      document.getElementById("notificationSound").play();
      new Notification(Subject, {
        body: description,
        requireInteraction: true,
      });
    }, timeDifference);

    timeoutIds.push(timeoutId);
    addReminder(Subject, description, dateTimeString, timeoutId);

  } else {
    alert("The scheduled time is in the past!");
  }
}

function deleteReminder(button){
  var row = button.closest("tr");
  var timeoutId = row.dataset.timeoutId;

  clearTimeout(Number(timeoutId)); // ✅ fixed

  row.remove();
}
  </script>