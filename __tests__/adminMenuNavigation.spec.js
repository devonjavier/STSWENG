// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('AdminMenuNavigation', function() {
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    if (driver){
      await driver.quit();
    }
  })
  it('AdminMenuNavigation', async function() {
    await driver.get("https://stsweng-eight.vercel.app/Admin/Login")
    await driver.manage().window().maximize()
    await driver.wait(until.elementLocated(By.id("username")), 10000);
    await driver.findElement(By.id("username")).click()
    await driver.sleep(500)
    await driver.findElement(By.id("username")).sendKeys("Devon")
    await driver.wait(until.elementLocated(By.id("password")), 10000);
    await driver.findElement(By.id("password")).click()
    await driver.sleep(500)
    await driver.findElement(By.id("password")).sendKeys("javier")
    await driver.findElement(By.css(".py-3")).click()
    await driver.sleep(7000)
    await driver.findElement(By.linkText("Calendar Reservations")).click()
    await driver.sleep(2000)
    await driver.findElement(By.linkText("View all Reservations")).click()
    await driver.sleep(5000)
    await driver.findElement(By.linkText("Edit Calendar")).click()
    await driver.sleep(2000)
    await driver.findElement(By.css(".react-calendar__tile:nth-child(33)")).click()
    await driver.sleep(500)
    await driver.findElement(By.css(".react-calendar__tile:nth-child(34) > abbr")).click()
    await driver.sleep(500)
    await driver.findElement(By.css(".react-calendar__tile:nth-child(35)")).click()
    await driver.sleep(500)
    await driver.findElement(By.css(".react-calendar__tile:nth-child(5)")).click()
    await driver.sleep(500)
    await driver.findElement(By.css(".react-calendar__tile:nth-child(34) > abbr")).click()
    await driver.sleep(500)
    await driver.findElement(By.css(".highlight")).click()
    await driver.sleep(2000)
    await driver.findElement(By.linkText("Edit Equipment")).click()
    await driver.sleep(2000)
    await driver.findElement(By.linkText("Add Equipment")).click()
    await driver.sleep(2000)
    await driver.findElement(By.css(".text-left")).click()
    await driver.sleep(2000)
    await driver.findElement(By.linkText("Services")).click()
    await driver.sleep(3000)
    await driver.findElement(By.linkText("FAQs")).click()
    await driver.sleep(2000)
    await driver.findElement(By.linkText("Log out")).click()
    await driver.sleep(3000)
  })
})
