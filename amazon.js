const express = require("express");
const router = express.Router();

router.get("/:val", async (query, host) => {
  //console.log(query, host);
  const searchQuery = query.params.val.replace(/%20/gi, "+");
  //console.log(searchQuery);
  const searchRes = await (
    await fetch(`https://www.amazon.in/s?k=${searchQuery}`)
  ).text();

  var all_product = searchRes.split('<div class="a-section a-spacing-base">');
  //console.log(all_product.length);
  var i,
    result = [];
  for (i = 0; i < all_product.length; i++) {
    try {
      //console.log(all_product[i]);
      var product_link =
        "https://www.amazon.in" +
        all_product[i]
          .split(
            '<a class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal" target="_blank" href="'
          )[1]
          .split('"')[0];
      if (product_link.includes("?")) {
        product_link = product_link.split("?")[0];
      }
      //  console.log(product_link);
      if (!product_link.includes("/gp/slredirect/")) {
        if (product_link != "https://www.amazon.in/sspa/click") {
          //console.log(all_product[i].split('<span class="a-size-base-plus a-color-base a-text-normal">')[1].split("</span>")[0])
          /* Not including sponsered products */
          //console.log(all_product[0])
          result.push({
            name:
            all_product[i]
                .split(
                  '<span class="a-size-base-plus a-color-base a-text-normal">'
                )[1]
                .split("</span>")[0]
            ,
            image: all_product[i]
              .split('src="')[1]
              .split('"')[0]
              .replace("_AC_UY218_.jpg", "_SL1000_.jpg"),
            price: parseFloat(
              all_product[i]
                .split(
                  '<span class="a-price" data-a-size="xl" data-a-color="base"><span class="a-offscreen">'
                )[1]
                .split("</span>")[0]
                .replace(/,/g, "")
                .replace("₹", "")
                .trim()
            ),
            original_price: parseFloat(
              all_product[i]
                .split(
                  '<span class="a-price a-text-price" data-a-size="b" data-a-strike="true" data-a-color="secondary"><span class="a-offscreen">'
                )[1]
                .split("</span>")[0]
                .replace(/,/g, "")
                .replace("₹", "")
                .trim()
            ),
            product_link,
            //query_url: product_link.replace("www.amazon.in", host + "/product"),
          });
        }
      }
    } catch (err) {
      console.log("some error");
    }
  }
  //console.log(result);

  var y = JSON.stringify(
    {
      status: true,
      total_result: result.length,
      query: searchQuery,
      fetch_from: `https://www.amazon.in/s?k=${searchQuery}`,
      result,
    },
    null,
    2
  );
  host.send(y);
});

module.exports = router;
