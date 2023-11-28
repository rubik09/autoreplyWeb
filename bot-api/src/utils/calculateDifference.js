export default (arr1, arr2) => {
    const resultArray = JSON.parse(JSON.stringify(arr1));

    arr2.forEach(obj2 => {
        const matchingObj = resultArray.find(obj1 => obj1.activity === obj2.activity);

        if (matchingObj) {
            matchingObj.count -= obj2.count;
        } else {
            resultArray.push({...obj2, count: -obj2.count});
        }
    });

    return resultArray.filter(obj => obj.count >= 0);
}
