const createPolygon = require("./NewPolygon");
test("Returns zone created! for create new zone", () => {
    expect(createPolygon()).toBe("zone created!");
});