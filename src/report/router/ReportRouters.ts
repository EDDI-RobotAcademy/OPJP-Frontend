import PurchaseTrendAnalysisPage from "../pages/purchaseTrendAnalysis/PurchaseTrendAnalysisPage.vue";
import CustomerChurnPredictionPage from "../pages/customerChurnPrediction/CustomerChurnPredictionPage.vue";

const ReportRoutes = [
    {
        path: '/report/purchase-trend-analysis',
        name: 'PurchaseTrendAnalysisPage',
        component: PurchaseTrendAnalysisPage,
    },
    {
        path: '/report/customer-churn-prediction',
        name: 'CustomerChurnPredictionPage',
        component: CustomerChurnPredictionPage,
    },
]

export default ReportRoutes