# Assignment Report

**Project Title:** Dynamic Quiz Application with Timer + Selenium Automation

---

**SECTION 0 (Mandatory Information)**

- **Name:** Amit Vaghela
- **College:** Parul University
- **Roll Number:** 2203031050777
- **Assignment Option:** Option 1 — Dynamic Quiz Application with Timer + Selenium Automation
- **GitHub Link:** https://github.com/Amitkumar-Vaghela/Dynamic_Quiz

---

## 1. Project Objective

To develop an interactive, timed quiz frontend using `HTML`, `CSS` and `JavaScript`, and to create an automation suite using `Selenium WebDriver` (Java) with `TestNG` and `Maven` to perform end-to-end testing of the quiz flows and capture verification artifacts.

## 2. Introduction

Assessments and quizzes are widely used in education to measure learning outcomes. A dynamic quiz (one that loads or generates questions at runtime, supports difficulty/category filtering and enforces a per-question timer) improves engagement and supports varied evaluation strategies. Browser automation using Selenium provides a reliable way to verify the correctness of the quiz flow across multiple runs, capture screenshots for evidence, and speed up regression testing.

This project combines a lightweight interactive frontend and a Selenium-based automated test that validates the entire user journey from start to results.

## 3. Technologies Used

- Frontend: `HTML5`, `CSS3`, `JavaScript`, `Chart.js`
- Automation & Tests: `Java`, `Selenium WebDriver`, `TestNG`, `Maven`
- Tools: Chrome + ChromeDriver, IDE (VS Code / IntelliJ), `mvn` CLI

## 4. Complete Project Structure

```
DynamicQuizAutomation
├── frontend
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── automation
│   ├── pom.xml
│   └── src
│       └── test
│           └── java
│               └── com
│                   └── quiz
│                       └── QuizTest.java
│
├── result_page.png
└── README.md
```

## 5. Explanation of Frontend Files

- `index.html`
  - Main entry page of the quiz system. Contains structural elements for the start screen, question container, options list, timer display, navigation buttons (`Next`, `Submit`, `Retry`), and a result container for displaying the score and chart area.
  - References external scripts (e.g., `Chart.js`) and local assets (`styles.css`, `app.js`).

- `styles.css`
  - Styles the UI elements for clear layout, readable typography, responsive behavior, and visual feedback (selected option highlight, correct/incorrect states, timer emphasis).
  - Ensures the result chart and controls remain accessible on different screen sizes.

- `app.js`
  - Implements the quiz logic: loading or generating questions dynamically, rendering question and options into the DOM, starting and managing per-question timers, handling user input, scoring, navigation, and building the result analysis using `Chart.js`.
  - Responsible for local state management (current question index, selected answers, computed score) and UI updates.

> Note: The above is a description of responsibilities — the actual implementation of these files is present in the project tree and should not be duplicated in the report.

## 6. Explanation of Automation Folder

- `pom.xml`
  - Maven configuration file for the automation project. Declares dependencies such as `selenium-java`, `testng`, and optionally `webdrivermanager` for driver management. May also include plugins for surefire/test execution and Java compiler level.

- `automation/src/test/java/com/quiz/QuizTest.java`
  - TestNG test class that uses Selenium WebDriver to perform end-to-end automation of the quiz flow.
  - Typical responsibilities:
    - Test setup: initialize `WebDriver` (ChromeDriver), configure implicit/explicit waits, set window size.
    - Execution: navigate to the frontend root URL (e.g., `http://localhost:5500`), start quiz, select answers (either deterministic or random for each question), handle `Next` and `Submit` interactions, and wait for result display.
    - Validation: assert that UI transitions occur as expected, confirm score element presence, and record results.
    - Teardown: take a screenshot named `result_page.png`, log outputs, and quit the driver.

## 7. TESTING SECTION

### A. Manual Test Cases

| ID | Test Case | Steps | Expected Result |
|----|-----------|-------|-----------------|
| TC-01 | Start Quiz | Open the site and click `Start Quiz` | Quiz begins and first question shows with timer visible |
| TC-02 | Select Answer | Click on an answer option | Option is selected visually; selection stored |
| TC-03 | Next Button | Click `Next` | Next question loads; timer resets |
| TC-04 | Submit Button | Click `Submit` on final question | Final score displayed; result chart rendered |
| TC-05 | Timer Expiry | Allow timer to reach zero | Auto-move to next question or end quiz as implemented |
| TC-06 | Retry Flow | Click `Retry` after results | Quiz restarts from first question |
| TC-07 | Filters | Select difficulty/category and start | Quiz uses filtered questions |

### B. Automation Test Cases

| ID | Test Case | Steps | Expected Result |
|----|-----------|-------|-----------------|
| ATC-01 | Launch and Start | Use WebDriver to open URL and click `Start` | Quiz begins; first question visible |
| ATC-02 | Auto-answer & Next | For each question, select an answer and click `Next` | Questions advance until final question |
| ATC-03 | Timer behavior | Wait for timer expiry on a question | Quiz auto-advances or behaves as implemented |
| ATC-04 | Submit & Screenshot | Click `Submit` and capture screenshot | Score shown; `result_page.png` saved |

### C. Expected vs Actual Results

- Prepare a results table during test execution. Example format:

| ID | Expected Result | Actual Result | Status | Notes |
|----|-----------------|---------------|--------|-------|
| TC-01 | Quiz begins on click | (fill after run) | PASS/FAIL | (comments) |
| ATC-04 | Screenshot saved at `result_page.png` | (fill after run) | PASS/FAIL | (path/permissions) |

> Fill the "Actual Result" and "Status" columns while performing tests.

### D. Steps to Execute the Frontend Server

**Option 1 — Python (quick static server):**
```powershell
cd frontend
python -m http.server 5500
# Then open: http://localhost:5500
```

**Option 2 — Node `http-server` (if Node.js available):**
```powershell
cd frontend
npx http-server -p 5500
# Then open: http://localhost:5500
```

**Notes:** Ensure `index.html` is located in the `frontend` folder and the server serves from that directory.

### E. Steps to Execute Selenium Automation

**Prerequisites:**
- `JAVA_HOME` points to a valid JDK directory
- `mvn` (Maven) installed and available in `PATH`
- Chrome browser installed and ChromeDriver available (matching Chrome version). Optionally, include `webdrivermanager` in `pom.xml` to auto-download drivers.

**Run tests:**
```powershell
cd automation
mvn test
```

**IDE Run:**
- Open `automation` as a Maven project in IntelliJ or VS Code (with Java/TestNG support) and run `QuizTest` directly.

### F. Observations (to record during runs)

- Browser launching latency and DOM readiness times.
- Timer synchronization and whether explicit waits are needed in automation.
- Locator stability (prefer `id` attributes or `data-test` attributes for reliable tests).
- Any flakiness due to asynchronous frontend updates.

### G. Errors Faced & Fixes (common items to document)

- `mvn` not found: Add Maven to `PATH` or install Maven.
- `JAVA_HOME` missing or pointing to JRE: Install JDK and set `JAVA_HOME`.
- ChromeDriver mismatch: Download ChromeDriver matching Chrome or use `webdrivermanager`.
- ElementNotFound in Selenium: Improve selectors, add explicit waits (WebDriverWait) for visibility/clickability.
- Screenshot write failures: Ensure write permissions and correct output path.

> Record the exact errors and the commands or code changes used to fix them for submission.

## 8. SCREENSHOTS SECTION (Placeholders)

1. **Project folder structure screenshot**

   Insert Screenshot Here

2. **Frontend running (`http://localhost:5500`)**

   Insert Screenshot Here

3. **Quiz running (question view)**

   Insert Screenshot Here

4. **Result page (score + chart)**

   Insert Screenshot Here

5. **Selenium test running in VS Code / IntelliJ**

   Insert Screenshot Here

6. **Console output (Maven / TestNG logs)**

   Insert Screenshot Here

7. **`result_page.png` artifact screenshot**

   Insert Screenshot Here

> Replace each placeholder with the actual image in the final PDF or attach images in the repository and embed links.

## 9. AUTOMATION EXPLANATION (Conceptual)

- How Selenium launches Chrome
  - The automation initializes a `ChromeDriver` instance (or WebDriver manager) that starts a real Chrome browser process and connects to it via the WebDriver protocol. The driver receives commands from the test code (navigate, click, execute script) and performs them in the browser context.

- How elements are located
  - Tests locate DOM elements using selectors:
    - Prefer `id` attributes for buttons and interactive elements.
    - Use `data-*` attributes specifically added for testing when needed.
    - CSS selectors and XPath are fallbacks when simpler locators are not available.
  - Use explicit waits (e.g., WebDriverWait) for element presence or clickability to avoid timing issues.

- How automation navigates the quiz
  - Sequence:
    1. Navigate to `http://localhost:5500`.
    2. Click the `Start` button to open the first question.
    3. For each question, select an option and click `Next`. If testing timer expiry, wait for timer to reach zero or observe auto-advance.
    4. After final question, click `Submit` and wait for result display.

- How script handles `Next` / `Submit` buttons
  - The script finds the button elements and calls `click()` on them.
  - Before clicking, the test uses waits to ensure the button is visible and enabled.
  - After clicking `Next`, tests wait for the question container to update (e.g., new question text or new index).

- How screenshot (`result_page.png`) is saved
  - After the result page is visible, the test calls WebDriver's screenshot function and saves the image to the configured path (commonly project root or `target/screenshots`). The filename used in this project is `result_page.png` (adjust path in code if needed).

## 10. CONCLUSION

- What I learned from frontend:
  - Building a single-page quiz app with dynamic data rendering in JS, styling for usability, and integrating a charting library to visualize results.
  - Managing state for timed interactions and ensuring accessible UI updates.

- What I learned from automation:
  - End-to-end test design with Selenium: launching browsers, locating elements, synchronizing with frontend state, and capturing artifacts.
  - Importance of environment setup: `JAVA_HOME`, Maven, and driver compatibility.

- How this project meets assignment requirements:
  - The project implements a timed dynamic quiz with user flows and result analysis; the automation verifies the full flow and captures evidence (screenshots/logs), fulfilling the assignment objective.

---

## Appendix / Next Steps

- To embed screenshots into this report, add image files to the project and replace the "Insert Screenshot Here" placeholders with Markdown image links like `![Project Structure](path/to/image.png)`.
- If you want, I can:
  - Embed provided screenshots into this `REPORT.md` and commit them;
  - Convert this `REPORT.md` to `REPORT.pdf` and add it to the repository;
  - Create an `automation/README.md` describing driver setup and `mvn` commands more specifically.


---

*End of report.*
