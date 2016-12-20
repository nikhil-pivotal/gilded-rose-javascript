describe("Gilded Rose", function () {

    // it("should check basic numeric equality", function () {
    //     // update_quality();
    //     // expect(1).toEqual(1);
    // });

    describe("Quality checks", function () {
        beforeEach(function () {
            resetItems();
        });

        xit("should decrease the quality of +5 Dexterity Vest by 1 after a day", function () {
            var originalQuality = items[0].quality;

            // Elapse a day
            update_quality();

            // check quality
            expect(items[0].quality).toEqual((originalQuality - 1));
        });

        xit("should decrement the quality of Conjured Mana Cake by 2 once the sell-in date is below 0", function () {
            var originalQuality = items[5].quality;

            // Elapse 4 days to push the sell-in date below zero
            for (var i = 0; i < 4; i++) {
                update_quality();
            }

            // Check that the sell-in date is below zero
            expect(items[5].sell_in).toEqual(-1);

            // check that quality is now down by 5 (goes down by 1 for each of the 4 days and an additional 1 for the negative sell-in)
            expect(items[5].quality).toEqual(originalQuality - 5);
        });

        xit("Aged Brie should increase in quality with each passing day", function () {
            var originalQuality = items[1].quality;

            // A day has passed...
            update_quality();

            // Check that quality has increased.
            expect(items[1].quality).toBeGreaterThan(originalQuality);
        });

        xit("should check that Sulfuras does not decrease in quality as days pass", function () {
            var originalQuality = items[3].quality;

            // Elapse 10 days
            for (var i = 0; i < 10; i++) {
                update_quality();
            }

            // Confirm that quality hasn't changed.
            expect(items[3].quality).toEqual(originalQuality);
        })

        /*
         "Backstage passes", like aged brie,
         increases in quality as it's sell_in value decreases;
         quality increases by 2 when there are less than 10 days
         and by 3 when there are 5 days or less
         but quality drops to 0 after the concert
         */
        it("Should decrement quality for Back stage passes as per the specs", function () {
            var backStage = items[4];
            var originalQuality = backStage.quality;

            // Quality should increase as sell_in decreases.
            update_quality();

            expect(backStage.quality).toBeGreaterThan(originalQuality);

            // Quality increases by 2 when there are 10 days or less

            // Let 5 more days go by to leave 9 sell-in days.
            for (var i = 0; i < 5; i++) {
                update_quality();
            }

            // Check the sell-in is 10 (or less)
            expect(backStage.sell_in).toEqual(9);

            // Check that quality has increased by 5 + 2*1 = 7;
            expect(backStage.quality).toEqual((originalQuality + 5 + 2));

            // Elapse one more day
            update_quality();

            // Quality should go up by 2
            expect(backStage.quality).toEqual((originalQuality + 5 + 2 + 2));

            // Elapse 4 more days.
            for (var i = 0; i < 4; i++) {
                update_quality();
            }

            // 4 more days remaining
            expect(backStage.sell_in).toEqual(4);

            // Quality should go up by 3 on the last day
            expect(backStage.quality).toEqual((originalQuality + 5 + 2 + 2 + (3 * 2) + 3));

            // Here comes James Blunt
            for (var i = 0; i < 5; i++) {
                update_quality();
            }

            // Quality should be zero
            expect(backStage.quality).toEqual(0);
        });

    });


});
