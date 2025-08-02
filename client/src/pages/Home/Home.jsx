import React, { useState, useEffect } from 'react';
import HomeLayout from '../../components/layouts/HomeLayout';
import { useUserAuth } from '../../hooks/useUserAuth.js';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { IoMdCard } from 'react-icons/io';
import { LuWalletMinimal, LuHandCoins } from 'react-icons/lu';
import InfoCards from '../../components/Cards/InfoCards.jsx';
import RecentTransactions from '../../components/Dashboard/RecentTransactions.jsx';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions.jsx';
import RecentIncome from '../../components/Dashboard/RecentIncome.jsx';
import FinanceOverview from '../../components/Dashboard/FinanceOverview.jsx';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses.jsx';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart.jsx';
import { addThousandsSeparator } from '../../utils/helper.js';

export default function Home() {
    useUserAuth();

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [_, setLoading] = useState(false);

    useEffect(() => {
        const loadDashboardData = async () => {
            setLoading(true);

            try {
                const response = await axiosInstance.get(
                    `${API_PATHS.HOME.GET_DATA}`
                );

                if (response.data) {
                    setDashboardData(response.data);
                    console.log("Dashboard data:", response.data);
                    console.log("Recent transactions:", response.data.recentTransactions);
                    console.log("Last 30 days income:", response.data.last30DaysIncome);
                }
            } catch (error) {
                console.log("Something went wrong", error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    return (
    <HomeLayout activeMenu="Dashboard">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InfoCards
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
          />

          <InfoCards
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          />

          <InfoCards
            icon={<LuHandCoins />}
            label="Total Expenses"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            gradient="bg-gradient-to-br from-red-500 to-red-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Recent Transactions - Takes 2 columns on medium+ screens */}
          <div className="md:col-span-2">
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onSeeMore={() => navigate("/expense")}
            />
          </div>

          {/* Finance Overview - Takes 1 column, aligns next to Recent Transactions */}
          <div className="md:col-span-1">
            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />
          </div>

          {/* Second row - Expense and Income components */}
          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <RecentIncome
            transactions={dashboardData?.last30DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last30DaysIncome?.transactions?.slice(0,4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />

          {/* Last 30 Days Expenses - Full width on its own row */}
          <div className="md:col-span-3">
            <Last30DaysExpenses
              data={dashboardData?.last30DaysExpenses?.transactions || []}
            />
          </div>
        </div>
      </div>
    </HomeLayout>
    );
}