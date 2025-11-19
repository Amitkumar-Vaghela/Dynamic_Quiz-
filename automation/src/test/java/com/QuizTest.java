package com.quiz;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.*;
import org.testng.annotations.*;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

public class QuizTest {

    WebDriver driver;
    WebDriverWait wait;

    @BeforeClass
    public void setup() {
        // UPDATE THIS PATH:
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\Amit\\chromedriver\\chromedriver.exe");

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, java.time.Duration.ofSeconds(10));
    }

    @Test
    public void runQuizAutomation() throws Exception {
        String url = "http://localhost:5500/index.html";
        driver.get(url);

        wait.until(ExpectedConditions.elementToBeClickable(By.id("startBtn"))).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("questionText")));

        for (int i = 0; i < 20; i++) {
            try {
                WebElement opt = wait.until(ExpectedConditions.elementToBeClickable(
                        By.cssSelector("#optionsForm input[type='radio']")
                ));
                opt.click();
            } catch (Exception ignored) {}

            try {
                WebElement next = driver.findElement(By.id("nextBtn"));
                if (next.isDisplayed()) {
                    next.click();
                    Thread.sleep(300);
                    continue;
                }
            } catch (Exception ignored) {}

            try {
                WebElement submit = driver.findElement(By.id("submitBtn"));
                if (submit.isDisplayed()) {
                    submit.click();
                    break;
                }
            } catch (Exception ignored) {}

            if (driver.findElements(By.id("scoreSummary")).size() > 0) break;
        }

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("scoreSummary")));
        System.out.println("RESULT: " + driver.findElement(By.id("scoreSummary")).getText());
    }

    @AfterClass
    public void teardown() {
        driver.quit();
    }
}
