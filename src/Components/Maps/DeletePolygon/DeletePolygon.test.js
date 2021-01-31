const deletePolygon = require("./DeletePolygon");
test("Returns zone deleted for deleting a zone", () => {
    expect(createPolygon()).toBe("zone deleted");
});