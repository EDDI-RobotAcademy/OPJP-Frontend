import BarChart from "@/d3plot/components/barchart/BarChart/vue";
import PieChart from "@/d3plot/components/PieChart/PieChart.vue";

const D3PlotRoutes = [
    {
        path: '/d3plot/bar-chart',
        name: 'BarChart',
        component: BarChart,
    },
    {
        path: '/d3plot/pie-chart',
        name: 'PieChart',
        component: PieChart,
    },
]

export default D3PlotRoutes