from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Inicjalizacja przeglądarki (przykład dla Chrome)
driver = webdriver.Chrome()  # Upewnij się, że chromedriver znajduje się w PATH lub podaj pełną ścieżkę

try:
    # Otwórz stronę x-kom
    driver.get("https://www.x-kom.pl")

    # Daj stronie chwilę na załadowanie (możesz zastosować WebDriverWait dla lepszej kontroli)
    time.sleep(10)

    # Znajdź pole wyszukiwania – tutaj przykład użycia selektora CSS wyszukującego input z typem "search"
    search_input = driver.find_element(By.CSS_SELECTOR, "input[type='szukaj']")

    # Kliknij w pole wyszukiwania (opcjonalne, zależy od implementacji strony)
    search_input.click()

    # Wpisz frazę do wyszukania (np. "laptop")
    search_input.send_keys("laptop")

    # Zatwierdź wyszukiwanie (np. wciskając Enter)
    search_input.send_keys(Keys.RETURN)

    # Opcjonalnie: poczekaj chwilę, aby zobaczyć wyniki
    time.sleep(15)

finally:
    # Zamknij przeglądarkę
    driver.quit()
