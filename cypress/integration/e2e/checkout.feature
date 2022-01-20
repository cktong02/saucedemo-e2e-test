Feature: Checkout products
  Scenario: Login
    Given user opens login page
    When user logins as "standard user"
    Then user lands on product page
  
  Scenario: Sort product items by price
    Given user is in product items page
    And there are product items
    When user sorts items by price high to low
    Then each item is "more" expensive than following item

  Scenario: Add products to basket
    Given user is in product items page
    And basket is empty
    When user adds the cheapest & costliest products to basket
    Then user sees 2 items in basket
    When user opens basket
    Then user lands on cart page
    