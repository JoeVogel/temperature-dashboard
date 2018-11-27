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

    //Need to avoid propagation (call to /?)
    return false;

  });


  // ---------

});

function formatDate(dateString) {
  var date = new Date(dateString),
    day = date.getDate().toString().padStart(2, '0'),
    month = (date.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
    year = date.getFullYear(),
    hour = date.getHours().toString().padStart(2, '0'),
    minute = date.getMinutes().toString().padStart(2, '0');
  return day + "/" + month + "/" + year + ' ' + hour + ':' + minute;
}

function generateCharts(data) {

  let humData = [];
  let tempData = [];
  let dateData = [];

  for (var i in data) {
    humData[i] = data[i].humidity;
    tempData[i] = data[i].temperature;
    dateData[i] = formatDate(data[i].date);
  }

  Highcharts.chart('chart-element', {
    chart: {
      scrollablePlotArea: {
        minWidth: 700
      }
    },

    title: {
      text: 'Umidade vs Temperatura'
    },

    subtitle: {
      text: 'Clique na legenda para ocultar / mostrar a série de dados'
    },

    xAxis: {
      alignTicks: true,
      gridLineWidth: 1,
      // categories: dateData,
      labels: {
        align: 'left',
        x: 3,
        y: -3
      }
    },

    yAxis: [{ // left y axis
      title: {
        text: 'Umidade (%)'
      },
      labels: {
        format: '{value}',
        style: {
          fontSize: '10px'
        }
      }
    }, { // right y axis
      title: {
        text: "Temperatura (°C)"
      },
      labels: {
        format: '{value}',
        style: {
          fontSize: '10px'
        }
      },
      opposite: true,
      gridLineWidth: 0
      // showFirstLabel: false
    }],

    legend: {
      align: 'left',
      verticalAlign: 'top',
      borderWidth: 0
    },

    tooltip: {
      shared: true,
      crosshairs: true
    },

    plotOptions: {
      series: {
        cursor: 'pointer',
        marker: {
          lineWidth: 1
        }
      }
    },

    series: [{
      name: 'Umidade',
      lineWidth: 4,
      marker: {
        radius: 4
      },
      data: humData,
      tooltip: {
        valueSuffix: ' %'
      }
    }, {
      name: 'Temperatura',
      data: tempData,
      color: '#ff5959',
      yAxis: 1,
      tooltip: {
        valueSuffix: ' °C'
      }
    }, {
      name: 'Data',
      // lineWidth: 4,
      // marker: {
      //   radius: 4
      // },
      data: dateData,
    }]
  });

  $("#chart-area").show();
}