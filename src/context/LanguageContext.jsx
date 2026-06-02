import {
    createContext,
    useState,
    useEffect,
} from "react";

export const LanguageContext =
    createContext();

const translations = {
    en: {

        goalCreate: "Create Goal",
        goalType: "Goal Type",
        daily: "Daily",
        count: "Count",
        time: "Time",
        target: "Target",
        saveGoal: "Save Goal",

        // Navbar
        dashboard: "Dashboard",
        goals: "Goals",
        archive: "Archive",
        categories: "Categories",
        settings: "Settings",

        // Dashboard
        newGoal: "New Goal",
        createGoal: "Create your first goal to start tracking progress.",
        createGoalButton: "Create Goal",
        noGoalsYet: "No goals yet.",
        viewGoals: "View Goals",
        viewArchive: "View Archive",
        totalGoals: "Total Goals",
        completedGoals: "Completed Goals",
        xp: "XP",
        streak: "Streak",
        progress: "Progress",
        recentlyCompleted: "Recently Completed",

        // Goals page
        allGoals: "All Goals",
        searchGoals: "Search Goals",
        noGoalsFound: "No goals found",

        sortBy: "Sort By",
        newest: "Newest",
        category: "Category",

        all: "All",
        active: "Active",
        completed: "Completed",
        paused: "Paused",

        deleteGoal: "Delete Goal",

        confirmDelete: "Are you sure you want to delete this goal?",

        cancel: "Cancel",

        // Goal card
        details: "Details",
        edit: "Edit",
        pause: "Pause",
        resume: "Resume",
        complete: "Complete",
        delete: "Delete",
        status: "Status",
        addProgress: "+ Progress",

        // Goal details
        goalDetails: "Goal Details",
        title: "Title",
        notes: "Notes",
        saveChanges: "Save Changes",
        categoryLabel: "Category",
        type: "Type",
        created: "Created",
        logs: "Progress Logs",
        noLogs: "No logs yet.",
        date: "Date",
        amount: "Amount",

        // Categories page
        activeGoals: "Active",
        completedLabel: "Completed",

        // Settings page
        language: "Language",
        theme: "Theme",
        english: "English",
        persian: "Persian",
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
    },

    fa: {

        goalCreate: "هدف را ایجاد کنید",
        goalType: "نوع هدف",
        daily: "روزانه",
        count: "شمارش",
        time: "زمان",
        target: "تعداد",
        saveGoal: "ذخیره هدف",

        // Navbar
        dashboard: "داشبورد",
        goals: "اهداف",
        archive: "آرشیو",
        categories: "دسته بندی ها",
        settings: "تنظیمات",

        // Dashboard
        newGoal: "هدف جدید",
        createGoal: "اولین هدف خود را ایجاد کنید.",
        createGoalButton: "ایجاد هدف",
        noGoalsYet: "هنوز هدفی وجود ندارد.",
        viewGoals: "مشاهده اهداف",
        viewArchive: "مشاهده آرشیو",
        totalGoals: "کل اهداف",
        completedGoals: "اهداف تکمیل شده",
        xp: "امتیاز",
        streak: "رکورد",
        progress: "پیشرفت",
        recentlyCompleted: "تکمیل شده‌های اخیر",

        // Goals page
        allGoals: "همه اهداف",
        searchGoals: "جستجوی اهداف",
        noGoalsFound: "هدفی یافت نشد",

        sortBy: "مرتب سازی بر اساس",
        newest: "جدیدترین",
        category: "دسته بندی",

        all: "همه",
        active: "فعال",
        completed: "تکمیل شده",
        paused: "متوقف شده",

        deleteGoal: "حذف هدف",

        confirmDelete: "آیا از حذف این هدف مطمئن هستید؟",

        cancel: "لغو",

        // Goal card
        details: "جزئیات",
        edit: "ویرایش",
        pause: "توقف",
        resume: "ادامه",
        complete: "تکمیل",
        delete: "حذف",
        status: "وضعیت",
        addProgress: "+ پیشرفت",

        // Goal details
        goalDetails: "جزئیات هدف",
        title: "عنوان",
        notes: "یادداشت‌ها",
        saveChanges: "ذخیره تغییرات",
        categoryLabel: "دسته بندی",
        type: "نوع",
        created: "ساخته شده",
        logs: "سوابق پیشرفت",
        noLogs: "هنوز سابقه‌ای وجود ندارد.",
        date: "تاریخ",
        amount: "مقدار",

        // Categories page
        activeGoals: "فعال",
        completedLabel: "تکمیل شده",

        // Settings page
        language: "زبان",
        theme: "تم",
        english: "انگلیسی",
        persian: "فارسی",
        darkMode: "حالت تیره",
        lightMode: "حالت روشن",
    },
};

export default function LanguageProvider({
    children,
}) {
    const [language, setLanguage] =
        useState(
            localStorage.getItem(
                "language"
            ) || "en"
        );

    useEffect(() => {
        localStorage.setItem(
            "language",
            language
        );

        document.documentElement.dir =
            language === "fa"
                ? "rtl"
                : "ltr";
    }, [language]);

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t:
                    translations[
                        language
                    ],
                }}
            >
                {children}
        </LanguageContext.Provider>
    );
}