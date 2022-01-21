Feature: User login
  @ignore
  Scenario: Login failed
    Given user opens login page
    When user logins as "non existing user"
    Then there is incorrect credential error