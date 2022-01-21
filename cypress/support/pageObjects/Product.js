// const config = Cypress.config();

const sortCriteria = {
    nameAToZ: 'az',
    nameZToA: 'za',
    priceLowToHigh: 'lohi',
    priceHighToLow: 'hilo',
}

export class Product {
    get productItems() {
        return cy.get('.inventory_item');
    }

    get sortSelector() {
        return cy.get('[data-test=product_sort_container]');
    }

    get itemPrices() {
        return cy.get('.inventory_item_price');
    }

    get cartBadge() {
        return cy.get('.shopping_cart_badge');
    }

    get addToCartButtons() {
        return cy.get('button.btn_inventory');
    }

    isCurrentPage() {
        return cy.url().then(url => {
            return url.endsWith(Cypress.config().pageUrl.product);
        });
    }

    navigate() {
        cy.visit(Cypress.config().pageUrl.product);
        return this;
    }

    hasProductItems() {
        this.productItems.should('have.length.of.at.least', 2);
        return this;
    }

    sortItemsByPriceHighToLow() {
        this.sortSelector.select(sortCriteria.priceHighToLow);
        return this;
    }

    hasEmptyBasket() {
        this.cartBadge.should('not.exist');
    }

    addFirstItemToBasket() {
        this.addToCartButtons.first().click();
    }

    addLastItemToBasket() {
        this.addToCartButtons.last().click();
    }

    openBasket() {
        this.cartBadge.click();
    }
}

export default new Product();