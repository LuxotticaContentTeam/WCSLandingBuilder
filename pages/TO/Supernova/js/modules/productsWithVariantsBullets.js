const productsManager = {
  init: function () {
    function ct_loadSelectedViewAllURLMidProducts() {
      /* Get URL from selected category */
      var ct_mainURL = document
        .querySelector(".ct_midProducts_carousel .ct_category.ct_selected")
        .getAttribute("ct_category_URL");
      var ct_mainDataElementID =
        "X_" +
        document
          .querySelector(".ct_midProducts_carousel .ct_category.ct_selected")
          .getAttribute("ct_category") +
        "_Carousel";

      /* Update all View all URL's */
      var viewAllLinks = document.querySelectorAll(
        ".ct_midProducts_carousel .ct_carousel_view_all"
      );
      viewAllLinks.forEach(function (link) {
        link.setAttribute("href", ct_mainURL);
        link.setAttribute("data-element-id", ct_mainDataElementID);
      });
    }

    function ct_category_swapMidProducts() {
      /* Updates the style of selected category */
      $(".ct_midProducts_carousel .ct_category").removeClass("ct_selected");
      $(this).addClass("ct_selected");

      /* Hides old carousel tiles */
      $(".ct_midProducts_carousel .swiper-slide").remove();

      /* Get searchTerm from clicked category and populate the carousel */
      var ct_selected_category = $(this).attr("ct_category");
      ct_populate_category_carouselMidProducts(ct_selected_category);

      /* Get products value from local storage */
      const storedValue = localStorage.getItem(ct_selected_category);
      if (this.classList.contains("ct_clicked")) {
        const retrievedObject = JSON.parse(storedValue);
        console.log(retrievedObject);
      } else {
        ct_populate_category_carouselMidProducts(ct_selected_category);
      }
      this.classList.add("ct_clicked");

      /* Get URL and data-element-id from clicked category and update view all data */
      var ct_viewAllURL = $(this).attr("ct_category_URL");
      var ct_viewAllDataElementID =
        "X_" + $(this).attr("ct_category") + "_Carousel";
      $(".ct_midProducts_carousel .ct_carousel_view_all").each(function () {
        $(this).attr("href", ct_viewAllURL);
        $(this).attr("data-element-id", ct_viewAllDataElementID);
      });
    }

    function ct_category_carouselMidProducts() {
      /* Creates the carousel */
      var ct_categoryCarouselMidProducts = new Swiper(
        ".ct_midProducts_carousel .ct_category_carousel",
        {
          slidesPerView: "1.5",
          centeredSlides: true,
          spaceBetween: 16,
          initialSlide: 4,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            1024: {
              slidesPerView: "3.5",
            },
          },
        }
      );
    }

    function ct_checkDiscountMidProducts() {
      /* Check if Product is on discount, if not hides the discount percentage and full price */
      var ct_discountElements = document.querySelectorAll(".ct_discount");
      ct_discountElements.forEach(function (discountElement) {
        if (discountElement.textContent === "NaN% Off") {
          discountElement.style.display = "none";
          var ct_listPriceElement =
            discountElement.parentNode.querySelector(".ct_list_price");
          if (ct_listPriceElement) {
            ct_listPriceElement.style.display = "none";
          }
        }
      });
    }

    /* Both functions manage the image on mouse enter and mouse leave */
    function ct_hoverProductMidProducts() {
      var ct_imgPath = this.querySelector("img").getAttribute("src");
      var ct_updatedImgPath = ct_imgPath.replace("shad__fr", "shad__qt");
      this.querySelector("img").setAttribute("src", ct_updatedImgPath);
    }
    function ct_unHoverProductMidProducts() {
      var ct_imgPath = this.querySelector("img").getAttribute("src");
      var ct_updatedImgPath = ct_imgPath.replace("shad__qt", "shad__fr");
      this.querySelector("img").setAttribute("src", ct_updatedImgPath);
    }

    function ct_populate_category_carouselMidProducts(
      ct_searchTermMidProducts,
      ct_dataElementID
    ) {
      /* Set the data-element-id of carousel tiles */
      var ct_dataElementID = "X_ProductCarousel_LP";

      var productsJsonUrl = `../data/${ct_searchTermMidProducts}.json`;
      var variantJsonUrl = `../data/${ct_searchTermMidProducts}Variants.json`;

      /* Funzione per eseguire il fetch di un JSON */
      function fetchJSON(url) {
        return fetch(url)
          .then((response) => response.json())
          .catch((error) => {
            console.error("Errore nel caricamento JSON:", error);
          });
      }

      fetchJSON(productsJsonUrl).then((productsJson) => {
        fetchJSON(variantJsonUrl).then((variantsJson) => {
          var products = productsJson.products.products.product;

          /* Push categorized data to local storage */
          if (ct_searchTermMidProducts == "Categoria1") {
            localStorage.setItem("Categoria1", JSON.stringify(products));
          }
          if (ct_searchTermMidProducts == "Categoria2") {
            localStorage.setItem("Categoria2", JSON.stringify(products));
          }

          for (var i = products.length - 1; i >= 0; i--) {
            /* Aggiungi le varianti a ciascun prodotto */
            const variantsKey = "variants" + i; // L'indice di posizionamento parte da 0
            const variants = variantsJson[variantsKey] || [];
            products[i].variants = variants;

            var ct_cc_url = products[i].pdpURL;
            var ct_cc_upc = products[i].upc;
            var ct_cc_brand = products[i].brand;
            var ct_cc_productName = products[i].productName
              .substring(1)
              .split("_")[0];
            var ct_cc_listPrice = products[i].listPrice.replace("$ 0", "");
            var ct_cc_price = products[i].price;
            var ct_cc_discountPercentage = Math.floor(
              ((100 -
                (parseInt(ct_cc_price.replace("$ ", "")) /
                  parseInt(ct_cc_listPrice.replace("$ ", ""))) *
                  100) /
                5) *
                5
            );

            var ct_categoryCarousel = document.querySelector(
              ".ct_midProducts_carousel .ct_category_carousel .swiper-wrapper"
            );

            var ct_slide = document.createElement("a");
            ct_slide.classList.add(
              "swiper-slide",
              "ct_slide",
              "ct_productImage"
            );
            ct_slide.href = ct_cc_url;
            ct_slide.setAttribute("data-element-id", ct_dataElementID);
            ct_slide.setAttribute("data-description", ct_cc_upc);
            ct_slide.setAttribute("aria-label", "Shop " + ct_cc_productName);

            var ct_description_above = document.createElement("div");
            ct_description_above.classList.add("ct_description");

            var ct_brand = document.createElement("p");
            ct_brand.classList.add("ct_brand");
            ct_brand.textContent = ct_cc_brand;
            ct_description_above.appendChild(ct_brand);

            var ct_name = document.createElement("p");
            ct_name.classList.add("ct_name");
            ct_name.textContent = ct_cc_productName;
            ct_description_above.appendChild(ct_name);

            var ct_box = document.createElement("div");
            ct_box.classList.add("ct_box");
            var ct_img = document.createElement("img");
            ct_img.src =
              "https://assets.lenscrafters.com/is/image/LensCrafters/" +
              ct_cc_upc +
              "__STD__shad__fr.png?imwidth=1024";
            ct_img.alt = "";
            ct_box.appendChild(ct_img);
            ct_slide.appendChild(ct_box);

            var ct_description = document.createElement("div");
            ct_description.classList.add("ct_description");

            var ct_variant_name = document.createElement("p");
            ct_variant_name.classList.add("ct_variant_name");

            var ct_variants = document.createElement("ul");
            ct_variants.classList.add("ct_variants");

            var lastUrlSlashIndex = ct_cc_url.lastIndexOf("/");
            var mainUrlPart = ct_cc_url.substring(0, lastUrlSlashIndex);

            // Iteriamo sulle varianti del prodotto
            products[i].variants.forEach((variant, index) => {
              if (variant) {
                ct_description_above.appendChild(ct_variant_name);
                ct_description.appendChild(ct_variants);

                const ct_variantEl = document.createElement("li");
                ct_variants.appendChild(ct_variantEl);

                const ct_variantBullet = document.createElement("a");
                ct_variantBullet.href = "#";
                ct_variantBullet.classList.add("variant-bullet");
                ct_variantBullet.style.backgroundColor = variant.bulletColor;
                ct_variantEl.appendChild(ct_variantBullet);

                // Aggiungiamo la classe "active" all'elemento quando index è 0 (il primo elemento)
                if (index === 0) {
                  ct_variantBullet.classList.add("active");
                  ct_variant_name.textContent = variant.variantColor;
                }

                ct_variantBullet.addEventListener("click", function (event) {
                  event.preventDefault();

                  const currentSlideEl = this.closest(".swiper-slide");
                  const lastActiveColorBullet = currentSlideEl.querySelector(
                    ".variant-bullet.active"
                  );
                  const currentVariantNameEl =
                    currentSlideEl.querySelector(".ct_variant_name");

                  currentVariantNameEl.textContent = variant.variantColor;

                  if (lastActiveColorBullet) {
                    lastActiveColorBullet.classList.remove("active");
                  }

                  this.classList.add("active");

                  currentSlideEl.href = mainUrlPart + "/" + variant.upc;
                  const currentImg =
                    currentSlideEl.querySelector(".ct_box>img");
                  currentImg.src =
                    "https://assets.lenscrafters.com/is/image/LensCrafters/" +
                    variant.upc +
                    "__STD__shad__fr.png?imwidth=1024";
                });
              }
            });

            var ct_priceMobHide = document.createElement("div");
            ct_priceMobHide.classList.add("ct_price", "ct_price_mob_hide");
            var ct_fromMob = document.createElement("p");
            ct_fromMob.classList.add("ct_from");
            ct_fromMob.textContent = "From";
            var ct_listPrice = document.createElement("p");
            ct_listPrice.classList.add("ct_list_price");
            ct_listPrice.textContent = "$" + ct_cc_listPrice;
            var ct_discountedPrice = document.createElement("p");
            ct_discountedPrice.classList.add("ct_discounted_price");
            ct_discountedPrice.textContent = "$" + ct_cc_price;
            var ct_discount = document.createElement("p");
            ct_discount.classList.add("ct_discount");
            ct_discount.textContent = ct_cc_discountPercentage + "% Off";
            ct_priceMobHide.appendChild(ct_fromMob);
            ct_priceMobHide.appendChild(ct_listPrice);
            ct_priceMobHide.appendChild(ct_discountedPrice);
            ct_priceMobHide.appendChild(ct_discount);
            ct_description.appendChild(ct_priceMobHide);

            var ct_priceDeskHide = document.createElement("div");
            ct_priceDeskHide.classList.add("ct_price", "cb_d-lg-none");
            var ct_fromDesk = document.createElement("p");
            ct_fromDesk.classList.add("ct_from");
            ct_fromDesk.textContent = "Frame only";
            var ct_discountedPriceDesk = document.createElement("p");
            ct_discountedPriceDesk.classList.add("ct_discounted_price");
            ct_discountedPriceDesk.textContent = "$" + ct_cc_price;
            ct_priceDeskHide.appendChild(ct_fromDesk);
            ct_priceDeskHide.appendChild(ct_discountedPriceDesk);
            ct_description.appendChild(ct_priceDeskHide);

            ct_slide.appendChild(ct_description);
            ct_categoryCarousel.prepend(ct_slide);
            ct_box.prepend(ct_description_above);
          }

          ct_checkDiscountMidProducts();
          ct_category_carouselMidProducts();
        });
      });
    }

    function ct_init() {
      /* Compiles View All URL on load */
      ct_loadSelectedViewAllURLMidProducts();

      /* Manage the swap between categories */
      var ct_categoriesMidProducts = document.querySelectorAll(
        ".ct_midProducts_carousel .ct_category"
      );
      ct_categoriesMidProducts.forEach(function (categoryMidproducts) {
        categoryMidproducts.addEventListener(
          "click",
          ct_category_swapMidProducts
        );
      });

      /* Hover products animation */
      $(document).on(
        "mouseenter",
        ".ct_category_carousel_module .ct_slide .ct_box",
        ct_hoverProductMidProducts
      );
      $(document).on(
        "mouseleave",
        ".ct_category_carousel_module .ct_slide .ct_box",
        ct_unHoverProductMidProducts
      );

      /* Populate products and create carousel */
      var ct_searchTermMidProducts = "Categoria1";
      ct_populate_category_carouselMidProducts(ct_searchTermMidProducts);

      var ct_categoriesMidProducts = document.querySelectorAll(
        ".ct_midProducts_carousel .ct_category"
      );
    }

    ct_init();
  },
};

export default productsManager;
