import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function LineChart(props: { increase: any }) {
  const { increase } = props;
  console.log("set increase:", increase.teacher)

  const options: Highcharts.Options = {
    chart: {
      type: "line",
    },
    title: {
      text: "",
    },

    yAxis: {
      title: {
        text: "Increment",
      },
    },

    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
        {
            name: 'Student',
            data: increase.student,
        },
        {
            name: 'Course',
            data:  increase.course,
        },
        {
            name: 'Teacher',
            data:  increase.teacher,
        },
      
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <HighchartsReact
      options={options}
      highcharts={Highcharts}
    ></HighchartsReact>
  );
}
