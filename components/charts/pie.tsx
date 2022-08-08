import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ITypes } from "../../pages/dashboard/manager";


export default function PieChart(props: {
  types: ITypes[];
  title?: string;
}) {
  const { types, title } = props;

  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      height: (9 / 16 * 100) + '%' // 16:9 ratio
    },
    title: {
      text: title,
    },
    // subtitle: {
    //   text: ` ${title?.replace("Type", "Total")} : ${types?.reduce(
    //     (acc: number, cur: number) => acc + cur.amount,
    //     0
    //   )} `,
    //   align: "right",
    // },
    credits: {
        position:{
            align: "left"
        }
    },
    tooltip: {
      pointFormat:
        "Percentage: <b>{point.percentage:.1f}%</b> <br> Total:<b>{point.y}</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          connectorColor: "silver",
        },
      },
    },
    series: [
      {
        type: "pie",
        data: types.map(({name, amount})=>{
            return {name: name, y: amount}
        })
      
      },
    ],
  };

  return (
    <HighchartsReact
      options={options}
      highcharts={Highcharts}
    ></HighchartsReact>
  );
}
