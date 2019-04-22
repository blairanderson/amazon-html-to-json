import { expect } from "chai";
const { describe, it } = global;
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const opts = { encoding: "utf-8" };

describe("parsers", () => {
  fs.readdirSync(path.join(__dirname, "fixtures")).forEach(func => {
    describe(func, () => {
      fs.readdirSync(path.join(__dirname, "fixtures", func)).forEach(
        fixture => {
          it(`should properly parse ${func}/${fixture}`, done => {
            fs.readFile(
              path.join(__dirname, "fixtures", func, fixture),
              opts,
              (err, testData) => {
                const { parse, expectation } = require(`../src/${func}.js`);
                const context = cheerio.load(testData);
                const result = parse(context);
                expect(result).to.deep.equal(expectation[fixture]);
                done();
              }
            );
          });
        }
      );
    });
  });
});

describe("index.js", () => {
  it("should properly return the default values", done => {
    const { parse } = require(`../src/index.js`);
    expect(parse(cheerio.load("<html></html>"))).to.deep.equal({
      buybox: {
        amazon: false,
        merchantLink: {
          fba: false,
          href: "",
          text: ""
        },
        price: {
          our_price: 0,
          currency: ""
        }
      },
      brand: {
        text: "",
        href: undefined
      },
      media: {
        images: {
          count: 0,
          thumbnails: []
        },
        videos: {
          count: 0,
          thumbnails: []
        }
      },
      reviews: {
        text: "Zero Customer Reviews",
        count: 0,
        rating: "Not Applicable",
        ratingAverage: 0
      },
      bullets: {
        count: 0,
        averageLength: 0,
        data: []
      },
      aplus: {
        modules: 0,
        module_sort: []
      },
      replacementWidget: {
        asin: null,
        link: null,
        text: null
      },
      variations: {
        exists: false,
        totalCombinations: 1,
        data: {
          style: [],
          color: [],
          size: []
        }
      },
      breadcrumbs: []
    });

    fs.readFile(
      path.join(__dirname, "fixtures", "aplus", "aplus.html"),
      opts,
      (err, testData) => {
        const { parse } = require(`../src/index.js`);
        const context = cheerio.load(testData);
        const result = parse(context);
        expect(result).to.deep.equal({
          buybox: {
            amazon: false,
            merchantLink: {
              fba: false,
              href:
                "/gp/help/seller/at-a-glance.html/ref=dp_merchant_link?ie=UTF8&seller=A2990QACDKO657",
              text: "Franko Lighting"
            },
            price: {
              currency: "$12.95",
              our_price: 12.95
            }
          },
          brand: {
            href:
              "/GE-Lighting/b/ref=bl_dp_s_web_2592442011?ie=UTF8&node=2592442011&field-lbr_brands_browse-bin=GE+Lighting",
            text: "GE Lighting"
          },
          media: {
            images: {
              count: 0,
              thumbnails: []
            },
            videos: {
              count: 0,
              thumbnails: []
            }
          },
          reviews: {
            text: "Zero Customer Reviews",
            count: 0,
            rating: "Not Applicable",
            ratingAverage: 0
          },
          replacementWidget: {
            asin: "B001T25YWW",
            link:
              "https://www.amazon.com/GE-Lighting-72269-GE132-MV-N-Fluorescent/dp/B001T25YWW/ref=dp_ob_image_hi",
            text:
              "GE Lighting 72269 GE132-MV-N 120/277-Volt Multi-Volt ProLine Electronic Fluorescent T8 Instant Start Ballast 1 F32T8 Lamp"
          },
          bullets: {
            averageLength: 86.4,
            count: 5,
            data: [
              {
                characterCount: 64,
                text:
                  "Standard Instant Start T8 Ballast will accept up to 1 F32T8 lamp"
              },
              {
                characterCount: 51,
                text: "Low profile housing and lightweight for portability"
              },
              {
                characterCount: 146,
                text:
                  "Runs quietly with most 120-volt applications, less than 10-Percent Total Harmonic Distortion (THD). less than 20-Percent with other approved lamps"
              },
              {
                characterCount: 93,
                text:
                  "High performance instant start electronic ballast is for all general fluorescent applications"
              },
              {
                characterCount: 78,
                text:
                  "Mounting dimensions: 8.9-Inch L x 1.1-Inch W, Mounting slot set 0.3-Inch apart"
              }
            ]
          },
          aplus: {
            modules: 4,
            module_sort: [
              "aplus-module-1",
              "aplus-module-9",
              "aplus-module-5",
              "aplus-module-5"
            ]
          },
          variations: {
            exists: false,
            totalCombinations: 1,
            data: {
              style: [],
              color: [],
              size: []
            }
          },
          breadcrumbs: [
            {
              href:
                "/Tools-and-Home-Improvement/b/ref=dp_bc_aui_C_1?ie=UTF8&node=228013",
              index: 0,
              title: "Tools & Home Improvement"
            },
            {
              href:
                "/Electrical-Equipment-and-Light-Bulbs/b/ref=dp_bc_aui_C_2?ie=UTF8&node=495266",
              index: 1,
              title: "Electrical"
            },
            {
              href:
                "/Electrical-Ballasts/b/ref=dp_bc_aui_C_3?ie=UTF8&node=5789850011",
              index: 2,
              title: "Ballasts"
            }
          ]
        });
        done();
      }
    );
  });
});
