import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

describe("Order Entry page", () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  it("should handle errors for scoops and topping routes", async () => {
    render(<OrderEntry />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");

      expect(alerts).toHaveLength(2);
    });
  });
});
