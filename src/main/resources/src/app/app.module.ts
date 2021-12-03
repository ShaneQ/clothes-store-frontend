import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, ApplicationRef, DoBootstrap, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { LandingComponent } from './pre-login/landing/landing.component';
import { BaseComponent } from './base/base.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FooterComponent } from './footer/footer.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountNavComponent } from './partials/account-nav/account-nav.component';
import { HeadComponent } from './partials/head/head.component';
import { DropdownCatalogComponent } from './partials/dropdown-catalog/dropdown-catalog.component';
import { DropdownHomeComponent } from './partials/dropdown-home/dropdown-home.component';
import { DropdownPagesComponent } from './partials/dropdown-pages/dropdown-pages.component';
import { NewsletterHorizontalComponent } from './partials/modal/newsletter-horizontal/newsletter-horizontal.component';
import { NewsletterPasswordResetComponent } from './partials/modal/newsletter-password-reset/newsletter-password-reset.component';
import { ProductComponent } from './partials/modal/product/product.component';
import { SearchComponent } from './partials/modal/search/search.component';
import { ShoppingCartComponent } from './partials/modal/shopping-cart/shopping-cart.component';
import { SideBarComponent } from './partials/modal/side-bar/side-bar.component';
import { SizeChartComponent } from './partials/modal/size-chart/size-chart.component';
import { WaitListComponent } from './partials/modal/wait-list/wait-list.component';
import { PromoComponent } from './partials/promo/promo.component';
import { NavbarLandingComponent } from './pre-login/navbar-landing/navbar-landing.component';
import { ShopCategoriesComponent } from './shop-categories/shop-categories.component';
import { ShopLoadMoreComponent } from './shop-load-more/shop-load-more.component';
import { ShopComponent } from './shop/shop.component';
import { ShopFilterComponent } from './shop-filter/shop-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import { ProfileComponent } from './profile/profile.component';
import {IconsModule} from './icons/icons.module';
import { MemberNotificationSlowDownComponent } from './modal/member-notification-slow-down/member-notification-slow-down.component';
import { BookingSummaryComponent } from './modal/booking-summary/booking-summary.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductCarouselComponent } from './product-carousel/product-carousel.component';
import {NgxGalleryModule} from "@kolkov/ngx-gallery";
import {initializeKeycloak} from "./init/keycloak-init.factory";
import {CarouselModule} from "ngx-bootstrap/carousel";
import { ContentComponent } from './pre-login/content/content.component';
import { MyAccountOrderComponent } from './my-account-order/my-account-order.component';
import { MyAccountBaseComponent } from './my-account-base/my-account-base.component';
import { MyAccountOrdersComponent } from './my-account-orders/my-account-orders.component';
import { MyAccountNavbarComponent } from './my-account-navbar/my-account-navbar.component';
import { MyAccountPersonalInfoComponent } from './my-account-personal-info/my-account-personal-info.component';
import {NgxSpinnerModule} from "ngx-spinner";
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    ProductCardComponent,
    HomeComponent,
    LandingComponent,
    BaseComponent,
    ProductDetailsComponent,
    FooterComponent,
    NoPageFoundComponent,
    HeaderComponent,
    NavbarComponent,
    AccountNavComponent,
    HeadComponent,
    DropdownCatalogComponent,
    DropdownHomeComponent,
    DropdownPagesComponent,
    NewsletterHorizontalComponent,
    NewsletterPasswordResetComponent,
    ProductComponent,
    SearchComponent,
    ShoppingCartComponent,
    SideBarComponent,
    SizeChartComponent,
    WaitListComponent,
    PromoComponent,
    NavbarLandingComponent,
    ShopCategoriesComponent,
    ShopLoadMoreComponent,
    ShopComponent,
    ShopFilterComponent,
    ProfileComponent,
    MemberNotificationSlowDownComponent,
    BookingSummaryComponent,
    ProductCarouselComponent,
    ContentComponent,
    MyAccountOrderComponent,
    MyAccountBaseComponent,
    MyAccountOrdersComponent,
    MyAccountNavbarComponent,
    MyAccountPersonalInfoComponent,
    RegistrationComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgxGalleryModule,
        AppRoutingModule,
        RouterModule,
        BrowserAnimationsModule,
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        KeycloakAngularModule,
        IconsModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        CarouselModule,
        NgxSpinnerModule
    ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent, BookingSummaryComponent],

})
export class AppModule  {

}
