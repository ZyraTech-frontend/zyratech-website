import re

with open('src/pages/admin/dashboards/RegularAdminDashboard.jsx', 'r') as f:
    content = f.read()

# 1. Add imports
old_imports = "import jobsService from '../../../services/jobsService';"
new_imports = """import jobsService from '../../../services/jobsService';
import dashboardService from '../../../services/dashboardService';
import FinancialCard from '../../../components/admin/dashboard/FinancialCard';
import ChartCard from '../../../components/admin/dashboard/ChartCard';
import RevenueBreakdownCard from '../../../components/admin/dashboard/RevenueBreakdownCard';"""
content = content.replace(old_imports, new_imports)

# 2. Add state  
old_state = "    const [jobsData, setJobsData] = useState([]);"
new_state = """    const [jobsData, setJobsData] = useState([]);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);"""
content = content.replace(old_state, new_state)

# 3. Add fetch function
fetch_fn = """    // Fetch dashboard data (revenue, charts, etc)
    const fetchDashboardData = async () => {
        try {
            setError(null);
            const data = await dashboardService.getDashboardData();
            setDashboardData(data);
        } catch (err) {
            console.error('[RegularAdminDashboard] Error fetching data:', err);
            setError('Failed to load revenue data');
        } finally {
            setLoading(false);
        }
    };

"""
idx = content.find("    useEffect(() => {")
content = content[:idx] + fetch_fn + content[idx:]

# 4. Add fetchDashboardData call
old_ue = "    useEffect(() => {\n        // Fetch jobs from backend"
new_ue = "    useEffect(() => {\n        // Fetch dashboard data\n        fetchDashboardData();\n\n        // Fetch jobs from backend"
content = content.replace(old_ue, new_ue)

# 5. Update refresh
old_refresh = """    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1500);
    };"""
new_refresh = """    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchDashboardData();
        setTimeout(() => setIsRefreshing(false), 1500);
    };"""
content = content.replace(old_refresh, new_refresh)

with open('src/pages/admin/dashboards/RegularAdminDashboard.jsx', 'w') as f:
    f.write(content)
print("Updated!")
