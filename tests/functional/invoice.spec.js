const { test } = require("@japa/runner");

test.group("Invoice API", (group) => {
  // test("an invoice can be generated and saved with its details", async ({ client, expect }) => {
  //   // const response = await client.post().json({
  //   //   // customer_id: ""
  //   // });
  // });

  test("an invoice must have a title", async ({ client, expect }) => { 
    const response = await client.post().json({
      customer_id: 1,
      expiring_at: "2022-07-25",
      invoice_details: [
        {
          description: "Water reading - 5 units",
          total_cost: 190
        }
      ]
    });

    console.log(response)
  });
  // test("an invoice must have an expiry date", async ({ client, expect }) => { });
  // test("an invoice must have a customer", async ({ client, expect }) => { });
  // test("an invoice must have details", async ({ client, expect }) => { });
});
