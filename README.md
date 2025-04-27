![github-submission-banner](https://github.com/user-attachments/assets/a1493b84-e4e2-456e-a791-ce35ee2bcf2f)

# SlothState

> Turn User Actions into Smarter Interfaces.

---

## 📌 Problem Statement
 
**PS 5: Power Productivity with Screenpipe**

---

## 🎯 Objective

Our project solves the challenge of understanding and improving user experience on websites and landing pages-a common pain point for product teams, marketers, and designers. Traditional analytics tools provide raw numbers (like page views or bounce rates) but fail to reveal *why* users abandon forms, miss key features, or get frustrated.

**Real-world use case:**
A SaaS startup launches a new landing page and wants to boost signups. With our tool, they can automatically capture every user interaction-clicks, scrolls, form entries, and more. The system analyzes this behavioral data using LLM API callings and delivers clear, actionable insights:

- “Most users abandon the signup form at the password step.”
- “Mobile users rage-click on the pricing toggle.”
- “Highlighting the CTA button could increase conversions.”

**Who it serves:**

- Product managers and designers seeking to optimize UX
- Marketers aiming to increase conversions
- Founders and growth teams who want to quickly identify and fix friction points without hiring analytics experts

**Value provided:**

- **Actionable recommendations** instead of overwhelming dashboards
- **Faster iteration:** Teams can spot and resolve usability issues in hours, not weeks
- **Higher conversions and happier users:** By fixing what matters most, businesses see real improvements in engagement and revenue

In short, our project empowers anyone to turn user behavior into smarter, more effective digital experiences.

---

## 🧠 Team & Approach

### Team Name:  
`DC`

### Team Members:  
- Harshit Mathur 
- Tanay 
- Ayush Barnwal  

### Your Approach:  

*Why we chose this problem:*
- Noticed developers frequently struggle with manual, error-prone setup of dependency files, slowing onboarding and increasing inconsistencies.
- Saw that teams often lack visibility into where and why users get stuck, as traditional analytics only provide surface-level metrics.
- Wanted to bridge the gap by combining real-time user interaction tracking with intelligent automation, so teams can both understand and resolve issues as they happen.

*Key challenges we addressed:*
- Needed to capture and interpret large volumes of user interaction data without overwhelming our analysis or missing important signals.
- Focused on filtering and aggregating data to highlight only the most meaningful patterns for actionable insights.
- Ensured automated actions, like setting up dependency files, were reliable and adapted to different user environments.
- Leveraged advanced UI automation to handle manual tasks, while integrating a tracking system for transparency and auditability.
- Balanced delivering deep insights with maintaining efficiency, by developing strategies to summarize and prioritize recommendations for users of all technical backgrounds.

*Any pivots, brainstorms, or breakthroughs during hacking:*
- Initially considered focusing only on analytics, but realized that insights alone weren’t enough without the ability to act on them.
- Shifted to integrating automation, allowing the system to not only identify issues but also assist in resolving them.
- Experimented with various methods for capturing user interactions, finding that combining high-fidelity tracking with intelligent automation yielded the best results.
- Brainstormed ways to maximize transparency and trust, ensuring every automated action could be traced and reviewed.
- Adopted a holistic approach that integrates real-time insights with proactive automation, enabling a solution that both reveals and removes friction from the user journey.

---

## 🛠️ Tech Stack

### Core Technologies Used:
Frontend:
React, TypeScript, Tailwind CSS, screenpipe

Backend:
Node.js, Express.js

Database:
Firebase Firestore

APIs:
Groq API, Terminator, Firebase, custom REST APIs (Express)

Hosting:
Vercel (frontend)

### Sponsor Technologies Used (if any):
- [✅] **Groq:** _How you used Groq_  
- [ ] **Monad:** _Your blockchain implementation_  
- [ ] **Fluvio:** _Real-time data handling_  
- [ ] **Base:** _AgentKit / OnchainKit / Smart Wallet usage_  
- [✅] **Screenpipe:** _Screen-based analytics or workflows_  
- [ ] **Stellar:** _Payments, identity, or token usage_
*(Mark with ✅ if completed)*
---

## ✨ Key Features

Here are the *most important features of this project*:

---

### *1. AI-Powered User Behavior Analysis*
- The system automatically captures every user interaction-clicks, scrolls, form entries, and navigation events-on your website or landing page.
- Uses advanced AI models to analyze this data, identifying patterns, bottlenecks, and friction points that traditional analytics often miss.

### *2. Actionable, Personalized UI Recommendations*
- Instead of just numbers or charts, the platform delivers clear, actionable suggestions for UI/UX improvements (e.g., “Move the CTA button higher,” or “Simplify form step 3”).
- Recommendations are tailored to real user behavior, enabling data-driven design decisions and rapid iteration.

### *3. Friction Point Detection*
- Automatically detects where users get stuck, abandon forms, or rage-click-helping teams quickly spot and fix usability issues that hurt conversions.

### *4. Real-Time and On-Demand Insights*
- Teams can generate new insights on demand or at regular intervals, ensuring the dashboard always reflects the latest user behavior and trends.

### *5. Metrics Overview and Trend Analysis*
- Provides daily metrics such as sessions, conversions, average session duration, bounce rate, and conversion rate-all calculated from actual user events.
- Includes trend analysis and change tracking to highlight improvements or regressions over time.

### *6. Secure, Privacy-First Data Handling*
- All user data is anonymized and protected by strict security rules, ensuring only authorized users can access analytics and insights.

### *7. Seamless Integration and Deployment*
- Easily integrates with any landing page or web app. The dashboard is deployed on Vercel for rapid, scalable access.

### *8. 24-Hour Cooldown for Resource Efficiency*
- Insight and metrics generation can be triggered by users but is limited to once per 24 hours, balancing freshness with cost and performance.

### *9. Automated Dependency & Library Management*
- Terminator handles installation, updates, and compatibility checks for all project dependencies (React, Firebase, etc.), ensuring smooth operation without manual setup.

### *10. Designed for Non-Technical Users*
- The dashboard and insights are presented in clear, plain language-no data science expertise required-empowering product teams, marketers, and designers to optimize UX independently.

---

## 📽️ Demo & Deliverables

- **Demo Video Link:** [https://drive.google.com/file/d/1uYKO58R-bc6bpQEX4iHPS3aF0wyDpEWK/view?usp=drive_link](https://drive.google.com/file/d/1uYKO58R-bc6bpQEX4iHPS3aF0wyDpEWK/view?usp=drive_link)

---

## ✅ Tasks & Bonus Checklist

- [✅] **All members of the team completed the mandatory task - Followed at least 2 of our social channels and filled the form** (Details in Participant Manual)  
- [✅] **All members of the team completed Bonus Task 1 - Sharing of Badges and filled the form (2 points)**  (Details in Participant Manual)
- [✅] **All members of the team completed Bonus Task 2 - Signing up for Sprint.dev and filled the form (3 points)**  (Details in Participant Manual)

*(Mark with ✅ if completed)*

---

---

## How to Run the Project

### **Requirements**
- **Node.js** (v18 or later)
- **npm** (comes with Node.js)
- **Groq API Key** (get from [Groq Console](https://console.groq.com/docs/quickstart))
- **Firebase Project** (Firestore + Authentication enabled)

---

### **API Keys & Environment Setup**

#### 1. **Groq API Key**
- Sign up at [Groq Console](https://console.groq.com/docs/quickstart)
- Generate and copy your API key

#### 2. **Firebase Config**
- In Firebase Console, go to Project Settings → General → Your apps → Firebase SDK snippet (Config)
- Copy your config values

#### 3. **.env Files**

**In `/frontend/.env`:**
```
# User tracking server URL
VITE_SERVER_BACKEND_URL=http://localhost:4000

# Firebase configuration
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

**In `/backend/.env`:**
```
PORT=4000
GROQ_API_KEY=

# Firebase service account configuration
FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_CLIENT_X509_CERT_URL=
FIREBASE_UNIVERSE_DOMAIN=
```

---

### **Local Setup**

```sh
# Clone the repo
git clone https://github.com/Col-Asy/SlothState.git

# Install frontend dependencies
cd ./SlothState/frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

---

### **Running the Project**

#### **Start the Backend**
```sh
cd ./backend
npm run dev
```
- Starts the Node.js/Express backend (default: http://localhost:4000)

#### **Start the Frontend**
```sh
cd ./frontend
npm run dev
```
- Starts the React frontend (default: http://localhost:8080)

---
## 🧬 Future Scope

**📈 More Integrations**  
- Add support for additional analytics platforms (e.g., Google Analytics, Mixpanel, Segment) to unify behavioral data from multiple sources.
- Integrate with popular web frameworks and CMSs (WordPress, Shopify, Wix) for one-click setup.
- Enable plug-and-play integration with marketing, CRM, and A/B testing tools for richer insights and automated optimization.

**🛡️ Security Enhancements**  
- Implement advanced data encryption both at rest and in transit.
- Add role-based access controls and audit logs for enterprise-grade security.
- Offer privacy dashboards and user consent management to comply with GDPR, CCPA, and other global standards.
- Integrate anomaly detection to identify and block suspicious or malicious user activity in real time.

**🌐 Localization / Broader Accessibility**  
- Support multiple languages for both the dashboard and AI-generated insights, making the platform accessible to a global audience.
- Enhance accessibility for users with disabilities by following WCAG guidelines and providing keyboard navigation, screen reader support, and high-contrast modes.
- Build region-specific analytics and recommendations, adapting insights to cultural and behavioral differences.

**🚀 Additional Ideas**  
- Real-time collaboration features for teams to annotate and discuss insights.
- Mobile app for on-the-go analytics and notifications.
- Customizable dashboards and exportable reports for sharing insights with stakeholders.
- Deeper AI-driven personalization, suggesting not just UI changes but content and feature recommendations tailored to user segments.

---

## 📎 Resources / Credits

**APIs & Datasets Used:**  
- **Groq API:** For fast and scalable AI-driven insights and natural language analysis  
- **Firebase Firestore & Authentication:** For secure, real-time data storage and user management  
- **Terminator:** For setting up dependency files in user's local system

**Open Source Libraries & Tools:**  
- **React** – Frontend UI framework  
- **TypeScript** – Type-safe JavaScript for both frontend and backend  
- **Express.js** – Node.js backend framework  
- **Tailwind CSS** – Utility-first CSS framework for styling  
- **Vercel** – Frontend hosting and deployment  
- **Postman** – API testing and development  
- **Lucide Icons** – For UI icons  
- **date-fns** – For date/time utilities  
- **Firebase Admin SDK** – Backend integration with Firebase  
- **dotenv** – Environment variable management

**Acknowledgements:**  
- Thanks to the **Groq team** for providing developer access and outstanding AI infrastructure.
- Special thanks to **Firebase** for their robust developer platform.
- Appreciation to the open source community for the libraries and tools that made rapid prototyping possible.
- Special mention to team Screenpipe for letting us know how much more we have to develop in the field of desktop automation
- Gratitude to all hackathon mentors, judges, and fellow participants for their feedback and inspiration.

---

## 🏁 Final Words

Participating in this hackathon has been an intense, rewarding, and truly transformative journey. From the very first brainstorming session, our team was driven by the desire to solve a real user pain point and to push our technical skills beyond their comfort zone. Like many hackathon teams, we faced our share of challenges-tight deadlines, unexpected bugs, and the constant need to prioritize what really mattered for our MVP. There were late nights, moments of doubt, and plenty of rapid learning as we navigated new APIs and frameworks on the fly.

One of the biggest lessons we learned was the power of adaptability and teamwork. Collaborating closely, sharing quick wins and setbacks, and keeping our focus on the end user made all the difference. We also realized how important it is to embrace the struggle-every error and every “aha!” moment became a stepping stone to deeper understanding and better solutions. The hackathon mindset-building fast, learning constantly, and iterating with purpose-has left a lasting impact on how we approach software development.

A special shoutout goes to **Divanshu from the organising team**, who was incredibly generous with his time and expertise. His guidance helped us integrate screenpipe's terminator smoothly and debug tricky edge cases, and we truly couldn’t have shipped our dependency automation feature without his help.

Looking back, the most fun moments were those little victories: seeing our first AI-generated insight appear on the dashboard, watching real user interactions flow into our analytics in real time, and demoing the finished product to mentors and friends. While we’re proud of what we built, we’re even more grateful for the growth, connections, and inspiration this experience has brought us.

To anyone considering their first hackathon: jump in! Every challenge is a chance to learn, create, and connect. We can’t wait to see where this project-and the skills we’ve gained-will take us next

---
