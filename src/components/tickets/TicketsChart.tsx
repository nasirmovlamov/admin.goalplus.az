import React from "react";
import { format } from "date-fns";
import { ChartData, ChartOptions } from "chart.js";
import Chart from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);
interface ResponseItem {
  id: string;
  sharedId: string | null;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  schoolName: string | null;
  ticketTypeId: number;
  payment: string | null;
  attendancePeriod: number;
  hasWolt: boolean;
  creationDate: string;
}

interface ChartDataPoint {
  x: string;
  y: number;
}

const extractChartData = (response: any[]): ChartData => {
  const ticketCounts: any = {}; // Object to store ticket counts for each hour
  response.forEach((item) => {
    const creationDate = new Date(item.creationDate);
    const hour = creationDate.getHours();

    if (ticketCounts[hour]) {
      ticketCounts[hour] += 1;
    } else {
      ticketCounts[hour] = 1;
    }
  });
  const labels = Object.keys(ticketCounts)
    .sort((a: any, b: any) => a - b)
    .map((hour) => `${hour}:00`);

  return {
    datasets: [
      {
        label: "Sold",
        data: Object.keys(ticketCounts)
          .sort((a: any, b: any) => a - b)
          .map((hour) => ({
            y: ticketCounts[hour],
            x: hour,
          })) as any,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
};
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Tickets Sold During Hours",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Hours",
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 24,
      },
    },
    y: {
      title: {
        display: true,
        text: "Tickets Sold",
      },
    },
  },
};

const AttendanceChart = ({ data }: any) => {
  const chartData: any = extractChartData(data);

  return <Line options={options as any} data={chartData} />;
};

export default AttendanceChart;
