import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Lang = "en" | "ar";

interface Translations {
  [key: string]: { en: string; ar: string };
}

const translations: Translations = {
  // Nav
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.about": { en: "About", ar: "حول المشروع" },
  "nav.calculator": { en: "Calculator", ar: "الحاسبة" },
  "nav.signin": { en: "Sign In", ar: "تسجيل الدخول" },
  "nav.getstarted": { en: "Get Started", ar: "ابدأ الآن" },

  // Hero
  "hero.badge": { en: "Smart Solar Energy Platform", ar: "منصة الطاقة الشمسية الذكية" },
  "hero.title1": { en: "Power Your Future", ar: "اصنع مستقبلك" },
  "hero.title2": { en: "With Solar Energy", ar: "بالطاقة الشمسية" },
  "hero.desc": {
    en: "SHAMS helps you understand the financial and environmental benefits of solar energy with our smart calculator tailored for Saudi Arabia.",
    ar: "شمس تساعدك على فهم الفوائد المالية والبيئية للطاقة الشمسية من خلال حاسبتنا الذكية المصممة خصيصاً للمملكة العربية السعودية.",
  },
  "hero.cta": { en: "Calculate Your Savings", ar: "احسب توفيرك" },
  "hero.learn": { en: "Learn More", ar: "اعرف المزيد" },

  // Features
  "features.badge": { en: "Why SHAMS?", ar: "لماذا شمس؟" },
  "features.title": { en: "Smart Solar", ar: "حلول شمسية" },
  "features.title2": { en: "Solutions", ar: "ذكية" },
  "features.desc": { en: "Everything you need to make an informed decision about solar energy.", ar: "كل ما تحتاجه لاتخاذ قرار مستنير بشأن الطاقة الشمسية." },
  "features.cta": { en: "Try the Calculator", ar: "جرّب الحاسبة" },

  "feature.instant.title": { en: "Instant Estimates", ar: "تقديرات فورية" },
  "feature.instant.desc": { en: "Get solar panel recommendations in seconds based on your electricity usage.", ar: "احصل على توصيات الألواح الشمسية في ثوانٍ بناءً على استهلاكك للكهرباء." },
  "feature.accurate.title": { en: "Accurate Data", ar: "بيانات دقيقة" },
  "feature.accurate.desc": { en: "Calculations based on real Saudi peak sun hours and current energy tariffs.", ar: "حسابات مبنية على ساعات الذروة الشمسية الفعلية في السعودية." },
  "feature.cost.title": { en: "Cost Analysis", ar: "تحليل التكاليف" },
  "feature.cost.desc": { en: "See installation costs, monthly savings, and payback period at a glance.", ar: "اطلع على تكاليف التركيب والتوفير الشهري وفترة الاسترداد." },
  "feature.eco.title": { en: "Eco Impact", ar: "الأثر البيئي" },
  "feature.eco.desc": { en: "Track your potential CO₂ reduction and environmental contribution.", ar: "تتبع إمكانية تقليل انبعاثات الكربون ومساهمتك البيئية." },

  // Stats
  "stats.cities": { en: "Saudi Cities", ar: "مدينة سعودية" },
  "stats.sunhours": { en: "Peak Sun Hours", ar: "ساعات ذروة شمسية" },
  "stats.savings": { en: "Bill Savings", ar: "توفير الفاتورة" },
  "stats.users": { en: "Happy Users", ar: "مستخدم سعيد" },

  // CTA
  "cta.title": { en: "Ready to Go Solar?", ar: "مستعد للتحول للطاقة الشمسية؟" },
  "cta.desc": { en: "Join thousands of Saudi residents making the switch to clean, affordable solar energy.", ar: "انضم لآلاف السكان السعوديين الذين يتحولون إلى طاقة شمسية نظيفة وبأسعار معقولة." },
  "cta.button": { en: "Start Calculating", ar: "ابدأ الحساب" },

  // About
  "about.badge": { en: "About the Project", ar: "عن المشروع" },
  "about.title": { en: "About", ar: "عن" },
  "about.desc": { en: "A graduation project dedicated to promoting solar energy awareness and helping Saudi residents make informed decisions about solar power.", ar: "مشروع تخرج مخصص لنشر الوعي بالطاقة الشمسية ومساعدة سكان المملكة في اتخاذ قرارات مستنيرة." },
  "about.what": { en: "What is", ar: "ما هو" },
  "about.whatDesc": { en: "SHAMS (Smart Home Alternative-energy Management System) is a platform that simplifies solar energy planning for residents of Saudi Arabia. Our smart calculator estimates your energy needs and provides personalized recommendations.", ar: "شمس (نظام إدارة الطاقة البديلة للمنزل الذكي) هو منصة تبسط تخطيط الطاقة الشمسية لسكان المملكة العربية السعودية." },
  "about.whatDesc2": { en: "By entering your monthly electricity bill and selecting your city, users receive detailed estimates including the number of solar panels needed, installation costs, expected monthly savings, payback period, and environmental impact.", ar: "من خلال إدخال فاتورة الكهرباء الشهرية واختيار مدينتك، يحصل المستخدمون على تقديرات تفصيلية." },
  "about.tryCta": { en: "Try the Calculator", ar: "جرّب الحاسبة" },
  "about.purpose": { en: "Our", ar: "أهدافنا" },
  "about.purpose2": { en: "Purpose", ar: "" },
  "about.mission": { en: "Our Mission", ar: "مهمتنا" },
  "about.missionDesc": { en: "Make solar energy accessible and understandable for every household in Saudi Arabia through smart technology.", ar: "جعل الطاقة الشمسية متاحة ومفهومة لكل منزل في المملكة." },
  "about.who": { en: "Who It's For", ar: "لمن هذا؟" },
  "about.whoDesc": { en: "Homeowners, businesses, and anyone curious about reducing their electricity costs with solar power.", ar: "أصحاب المنازل والشركات وأي شخص يرغب في تقليل تكاليف الكهرباء." },
  "about.vision": { en: "Vision 2030", ar: "رؤية 2030" },
  "about.visionDesc": { en: "Aligned with Saudi Vision 2030's goal of increasing renewable energy adoption across the Kingdom.", ar: "متوافق مع أهداف رؤية 2030 في زيادة اعتماد الطاقة المتجددة." },

  // Login
  "login.welcome": { en: "Welcome Back", ar: "أهلاً بعودتك" },
  "login.subtitle": { en: "Sign in to your SHAMS account", ar: "سجل الدخول إلى حسابك في شمس" },
  "login.username": { en: "Username", ar: "اسم المستخدم" },
  "login.usernamePh": { en: "Enter your username", ar: "أدخل اسم المستخدم" },
  "login.password": { en: "Password", ar: "كلمة المرور" },
  "login.passwordPh": { en: "Enter your password", ar: "أدخل كلمة المرور" },
  "login.submit": { en: "Sign In", ar: "تسجيل الدخول" },
  "login.noAccount": { en: "Don't have an account?", ar: "ليس لديك حساب؟" },
  "login.createAccount": { en: "Create Account", ar: "إنشاء حساب" },
  "login.usernameReq": { en: "Username is required", ar: "اسم المستخدم مطلوب" },
  "login.passwordReq": { en: "Password is required", ar: "كلمة المرور مطلوبة" },
  "login.passwordMin": { en: "Password must be at least 6 characters", ar: "يجب أن تكون كلمة المرور 6 أحرف على الأقل" },
  "login.success": { en: "Login successful! Welcome back.", ar: "تم تسجيل الدخول بنجاح! أهلاً بعودتك." },

  // Signup
  "signup.title": { en: "Create Account", ar: "إنشاء حساب" },
  "signup.subtitle": { en: "Join SHAMS and start saving with solar", ar: "انضم إلى شمس وابدأ التوفير بالطاقة الشمسية" },
  "signup.name": { en: "Full Name", ar: "الاسم الكامل" },
  "signup.namePh": { en: "e.g. Mohammed Al-Harbi", ar: "مثال: محمد الحربي" },
  "signup.email": { en: "Email Address", ar: "البريد الإلكتروني" },
  "signup.emailPh": { en: "e.g. mohammed@example.com", ar: "مثال: mohammed@example.com" },
  "signup.password": { en: "Password", ar: "كلمة المرور" },
  "signup.passwordPh": { en: "At least 6 characters", ar: "6 أحرف على الأقل" },
  "signup.confirm": { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
  "signup.confirmPh": { en: "Re-enter your password", ar: "أعد إدخال كلمة المرور" },
  "signup.submit": { en: "Create Account", ar: "إنشاء حساب" },
  "signup.hasAccount": { en: "Already have an account?", ar: "لديك حساب بالفعل؟" },
  "signup.signin": { en: "Sign In", ar: "تسجيل الدخول" },
  "signup.nameReq": { en: "Full name is required", ar: "الاسم الكامل مطلوب" },
  "signup.emailReq": { en: "Email is required", ar: "البريد الإلكتروني مطلوب" },
  "signup.emailInvalid": { en: "Please enter a valid email address", ar: "يرجى إدخال بريد إلكتروني صحيح" },
  "signup.passwordReq": { en: "Password is required", ar: "كلمة المرور مطلوبة" },
  "signup.passwordMin": { en: "Password must be at least 6 characters", ar: "يجب أن تكون كلمة المرور 6 أحرف على الأقل" },
  "signup.confirmReq": { en: "Please confirm your password", ar: "يرجى تأكيد كلمة المرور" },
  "signup.mismatch": { en: "Passwords do not match", ar: "كلمات المرور غير متطابقة" },
  "signup.success": { en: "Account created successfully! Welcome to SHAMS.", ar: "تم إنشاء الحساب بنجاح! أهلاً بك في شمس." },

  // Calculator
  "calc.title": { en: "Solar", ar: "الحاسبة" },
  "calc.title2": { en: "Calculator", ar: "الشمسية" },
  "calc.desc": { en: "Enter your details below to get a personalized solar energy estimate for your home.", ar: "أدخل بياناتك أدناه للحصول على تقدير مخصص للطاقة الشمسية لمنزلك." },
  "calc.bill": { en: "Monthly Electricity Bill (SAR)", ar: "فاتورة الكهرباء الشهرية (ريال)" },
  "calc.billPh": { en: "e.g. 500", ar: "مثال: 500" },
  "calc.city": { en: "Select Your City", ar: "اختر مدينتك" },
  "calc.cityPh": { en: "Choose a city...", ar: "اختر مدينة..." },
  "calc.photo": { en: "Location Photo (Optional)", ar: "صورة الموقع (اختياري)" },
  "calc.photoDesc": { en: "Take a photo of your roof or installation area for reference.", ar: "التقط صورة لسطح منزلك أو منطقة التركيب." },
  "calc.takePhoto": { en: "Take Photo", ar: "التقط صورة" },
  "calc.uploadPhoto": { en: "Upload Photo", ar: "ارفع صورة" },
  "calc.capture": { en: "Capture", ar: "التقاط" },
  "calc.cancel": { en: "Cancel", ar: "إلغاء" },
  "calc.calculate": { en: "Calculate Now", ar: "احسب الآن" },
  "calc.results": { en: "Your Solar", ar: "تقديرك" },
  "calc.results2": { en: "Estimate", ar: "الشمسي" },
  "calc.consumption": { en: "Monthly Consumption", ar: "الاستهلاك الشهري" },
  "calc.panels": { en: "Panels Needed", ar: "الألواح المطلوبة" },
  "calc.cost": { en: "Installation Cost", ar: "تكلفة التركيب" },
  "calc.savings": { en: "Monthly Savings", ar: "التوفير الشهري" },
  "calc.payback": { en: "Payback Period", ar: "فترة الاسترداد" },
  "calc.co2": { en: "CO₂ Reduction", ar: "تقليل الكربون" },
  "calc.locationPhoto": { en: "Your Location Photo", ar: "صورة موقعك" },

  // Footer
  "footer.desc": { en: "Solar Energy Calculation", ar: "حساب الطاقة الشمسية" },
  "footer.copyright": { en: "© 2026 SHAMS. Graduation Project.", ar: "© 2026 شمس. مشروع تخرج." },
  "footer.gradProject": { en: "© 2026 SHAMS — Graduation Project", ar: "© 2026 شمس — مشروع تخرج" },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  const t = useCallback(
    (key: string) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang] || entry.en || key;
    },
    [lang]
  );

  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      <div dir={dir} className={lang === "ar" ? "font-heading" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
