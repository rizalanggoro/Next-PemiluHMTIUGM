import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface InterfaceComponentChart {
  lables: Array<string>;
  data: Array<number>;
  backgroundColor: Array<string>;
  borderColor: Array<string>;
}

export const ComponentChart = (params: InterfaceComponentChart) => {
  return (
    <Doughnut
      options={{}}
      data={{
        labels: params.lables,
        datasets: [
          {
            data: params.data,
            backgroundColor: params.backgroundColor,
            borderColor: params.borderColor,
            borderWidth: 1.32,
          },
        ],
      }}
    />
  );
};
