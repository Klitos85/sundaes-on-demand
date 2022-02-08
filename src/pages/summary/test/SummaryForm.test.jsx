import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

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

    fireEvent.click(termsConditionsCheckbox);

    expect(confirmOrderButton).toBeEnabled();

    fireEvent.click(termsConditionsCheckbox);

    expect(confirmOrderButton).toBeDisabled();
  });
});
