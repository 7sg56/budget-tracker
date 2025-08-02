export const BASE_URL = "http://localhost:8000"; // DEVELOPMENT

//utils/apiPaths.js
export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        PROFILE: "/api/auth/profile",
    },
    HOME: {
        GET_DATA: "/api/home",
    },
    INCOME: {
        ADD_INCOME: "/api/income/add",
        GET_ALL_INCOME: "/api/income",
        DELETE_INCOME: (incomeId) => `/api/income/${incomeId}`,
        DOWNLOAD_INCOME: `/api/income/download`,
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/expense/add",
        GET_ALL_EXPENSE: "/api/expense",
        DELETE_EXPENSE: (expenseId) => `/api/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: `/api/expense/download`,
    }
};