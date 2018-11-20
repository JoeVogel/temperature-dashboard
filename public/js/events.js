$(document).ready(function () {

  // INDEX

  $('#search').on('click', function () {

    let mac = $('#device').val();
    let startDate = $('#date-from').val();
    let endDate = $('#date-to').val();

    $.ajax({
      url: window.location.origin + '/measure?mac=' + mac + '&startDate=' + startDate + '&endDate=' + endDate,
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {

        generateCharts(data);

      },
      failure: function (err) {
        console.log(err);
      }
    });


  });

  // ---------

});

function generateCharts(data) {

  let humData = [];
  let tempData = [];

  data.forEach(element => {
    humData.push({
      x: element.date,
      y: element.humidity
    });
    tempData.push({
      x: element.date,
      y: element.temperature
    });
  });


  $("#chart-area").show();
}