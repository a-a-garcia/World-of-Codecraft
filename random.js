var search = function(nums, target) {
    let start = 0; // initialize start at 0
    let end = nums.length -1; // end at array's length -1.

    while (start <= end) {
        let mid = Math.floor((start + end) / 2); // midpoint between start and end points.
        if (nums[mid] === target) { //start looking for inputted number. 7 in this case.
            return mid  // nums[3] = 5 which != 7, which doesnt return true
        } else if (nums[mid] < target) { // because arr[mid] = 5, & 5<7, this evals to true. start = 4.
            start = mid + 1 // if we know the mid point of the array is LESS than the thing we're looking for, why would we start looking at the beginning again? 
            // starting from whatever mid is plus 1 -> 3 + 1 + 6 (mid + 1 + end) all / 2 = 5. arr[5] = 8 != 7.
        } else { // because arr[5] != 7, we don't return true. need an else statement for when we've gone too far.
            end = mid - 1 //  if we know the midpoint of the array is GREATER than the num we're looking for, why would we look past this point again? 
            //starting from whatever mid is minus one -> 5 - 1 = 4.
        }
    }
    return -1
}


console.log(search([1, 2, 4, 5, 7, 8, 9], 7));