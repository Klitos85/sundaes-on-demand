import { render, screen } from "@testing-library/react";
import Options from "../Options";

describe("Option", () => {
  it("should display image from server", async() => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    const altTexts = scoopImages.map((element) => element.alt);
    expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });
});
