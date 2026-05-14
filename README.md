# OpenSpec | Premium OpenAPI & Swagger Explorer

**OpenSpec** is a high-performance, professional-grade web application designed to parse, validate, and explore OpenAPI (3.x) and Swagger (2.0) specifications with precision. 

Built for QA engineers, developers, and security analysts, OpenSpec transforms complex API definitions into a readable, searchable, and interactive dashboard in seconds.

🚀 **Live Demo:** [openspec.vercel.app](https://openspec.vercel.app/)

---

## ✨ Key Features

### 🔍 Advanced Exploration
- **Tag-Based Grouping**: Automatically organizes hundreds of endpoints into logical, collapsible folder categories (e.g., `repos`, `issues`, `users`).
- **Global Search**: Instantly filter endpoints and schemas by path, method, name, or tag.
- **Recursive Schema Tables**: Professional property rendering (Name, Type, Required, Description) consistent with industry standards established by tools like Redoc and Swagger UI.

### 🛠 Professional QA Utility
- **Debug Console**: Real-time logging of the fetch, parse, and dereference lifecycle.
- **Performance Metrics**: Step-by-step timing (+Xms) to analyze the scale and complexity of large specifications.
- **Contract Validation**: Automated **Spec Quality Report** (Linter) that audits specifications for missing documentation, safety gaps (missing error responses), and industry best practices.
- **Download & Export**: Export full quality findings as a **CSV report** for integration with Jira, Confluence, or internal audit documentation.
- **Precision Auditing**: Clearly highlights required fields, enums, and nested data structures with a real-time filtered issue list.

---

### 🏆 Real-World Impact: The Petstore Audit
During validation of the official [Petstore Swagger 2.0 spec](https://petstore.swagger.io/v2/swagger.json), OpenSpec identified **missing success responses** on core endpoints. For example, `POST /pet` defines only a `405` response, and `DELETE /pet/{petId}` defines only `400` and `404`. No success response of any kind is present in the underlying specification.

Standard documentation viewers silently paper over these gaps. **OpenSpec surfaces them as contract errors**, providing the evidence engineers need for complete test coverage and accurate code generation.

---

### 🌐 High-Scale Support
- **YAML & JSON Support**: Native handling of both formats via robust internal conversion.
- **CORS-Safe Proxying**: Server-side proxying ensures you can analyze specifications from any domain without CORS errors.
- **Industry Examples**: One-click analysis of massive specs like **Cloudflare**, **GitHub**, **Stripe**, and **OpenAI**.

---

## 🎨 Design Philosophy
OpenSpec features a premium **Glassmorphism UI** optimized for modern browsers.
- **Vibrant Dark Mode**: Sleek, high-contrast interface for reduced eye strain.
- **Micro-Animations**: Powered by `framer-motion` for smooth, interactive transitions.
- **Responsive Layout**: Designed to be fully functional on desktops, tablets, and mobile devices.

---

## 🛠 Tech Stack
- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Styling**: Vanilla CSS Modules (Glassmorphism & CSS Variables)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Spec Parsing**: [@readme/openapi-parser](https://github.com/readmeio/openapi-parser) & [js-yaml](https://github.com/nodeca/js-yaml)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/joshchamo/OpenSpec.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License
This project is licensed under the MIT License.

---

Developed with ❤️ for the QA & Developer Community.
