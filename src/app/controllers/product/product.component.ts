import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';
import {CategoryService} from '../../services/category.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {ProductRequestParameters} from '../../models/product-request-parameters';
import {KeywordService} from '../../services/keyword.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  productsForCategory$: any;
  productsForScroll$: any;
  products: Product[];
  productRequestParameters: ProductRequestParameters = {
    categoryId: 0,
    pageNumber: 1,
    keywords: []
  };

  keywords$: any;
  category$: any;

  shoppingCart$: any;
  shoppingCart: Product[];

  flTopButton: boolean;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private shoppingCartService: ShoppingCartService,
              private keywordService: KeywordService) {
  }

  ngOnInit(): void {
    this.getShoppingCartProduct();
    this.getSelectedCategory();
    this.getSelectedKeywords();
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.productsForCategory$.unsubscribe();
    this.productsForScroll$.unsubscribe();

    this.category$.unsubscribe();
    this.shoppingCart$.unsubscribe();
    this.keywords$.unsubscribe();
  }

  getProducts() {
    this.productService.getProducts({
      categoryId: this.productRequestParameters.categoryId,
      pageNumber: 1,
      keywords: []
    }).subscribe(products => {
      this.products = products;
      this.keywordService.selectionKeywords(this.products);

      this.productRequestParameters.pageNumber = 2;
    });

    this.productsForCategory$ = this.productService.productsForCategory$
      .subscribe(products => {
        this.products = products;
        this.keywordService.selectionKeywords(this.products);

        this.productRequestParameters.pageNumber = 2;
      });

    this.productsForScroll$ = this.productService.productsForScroll$
      .subscribe(products => {
        this.products = this.products.concat(products);
        this.keywordService.selectionKeywords(this.products);

        this.productRequestParameters.pageNumber += 1;
      });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let pos: number = document.documentElement.scrollTop + document.documentElement.offsetHeight;
    let max: number = document.documentElement.scrollHeight;

    if ((max - pos) < 2000) {
      this.productService.productsTermsForScroll.next(this.productRequestParameters);
    }

    if (pos > 3000) {
      this.flTopButton = true;
    } else {
      this.flTopButton = false;
    }
  }

  scrollToTop() {
    document.documentElement.scrollTop = 0;
  }

  getSelectedCategory() {
    if (this.categoryService.getSelectedCategory()) {
      this.productRequestParameters.categoryId = this.categoryService.getSelectedCategory().id;
    }

    this.category$ = this.categoryService.selectedCategoryEvent
      .subscribe(category => {
        document.documentElement.scrollTop = 0;
        this.productRequestParameters.categoryId = category.id;
        this.productRequestParameters.pageNumber = 1;
        this.productRequestParameters.keywords = [];

        this.productService.productsTermsForCategory.next(this.productRequestParameters);
      });
  }

  addProductToCart(product: Product) {
    this.shoppingCartService.addProductCart(product);
  }

  deleteProductToCart(product: Product) {
    this.shoppingCartService.deleteProductCart(product);
  }

  getShoppingCartProduct() {
    this.shoppingCart = this.shoppingCartService.order.products;
    this.shoppingCart$ = this.shoppingCartService.shoppingCartEvent
      .subscribe(products => {
        this.shoppingCart = products;
      });
  }

  showButton(product: Product) {
    return this.shoppingCart.find(x => +x.id === +product.id);
  }

  getSelectedKeywords() {
    this.productRequestParameters.keywords = this.keywordService.selectedKeywords;
    this.keywords$ = this.keywordService.selectedKeywordsEvent
      .subscribe(keywords => {
        this.productRequestParameters.keywords = keywords;
      });
  }
}
