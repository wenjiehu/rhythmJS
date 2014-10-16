QUnit.test("test isArray()", function(assert) {
    expect(2);

    assert.ok($.isArray([]), "Passed!");
    assert.ok(!$.isArray({}), "Passed!");
});