import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("Confirm order button", () => {
  it("should be disabled by default", () => {
    render(<SummaryForm />);

    const confirmOrderButton = screen.getByRole("button", {
      name: /confirm order/i,
    });

    expect(confirmOrderButton).toBeDisabled();
  });
});

describe("Terms and Conditions checkbox", () => {
  it("should be disabled by default", () => {
    render(<SummaryForm />);

    const termsConditionsCheckbox = screen.getByRole("checkbox", {
      name: /i agree to terms and conditions/i,
    });

    expect(termsConditionsCheckbox).not.toBeChecked();
  });

  it("should enabled and disabled the Confirm order button", () => {
    render(<SummaryForm />);

    const confirmOrderButton = screen.getByRole("button", {
      name: /confirm order/i,
    });
    const termsConditionsCheckbox = screen.getByRole("checkbox", {
      name: /i agree to terms and conditions/i,
    });

    userEvent.click(termsConditionsCheckbox);

    expect(confirmOrderButton).toBeEnabled();

    userEvent.click(termsConditionsCheckbox);

    expect(confirmOrderButton).toBeDisabled();
  });
});

describe("popover", () => {
  it("should responds to hover", async() => {
    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    const termsAndConditionsLabel = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditionsLabel);

    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    userEvent.unhover(termsAndConditionsLabel);
    await waitForElementToBeRemoved(() => screen.queryByText(
      /no ice cream will actually be delivered/i
    ));
  });
});
